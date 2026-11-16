import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import OperationalReportForm from '../../src/features/operational-reports/OperationalReportForm'
import FormsListPage from '../../src/features/forms/FormsListPage'
import { INITIAL_OPERATIONAL_REPORTS } from '../../src/data/seed'
import { DemoStateProvider } from '../../src/state/DemoStateContext'
import { validateOperationalReport } from '../../src/domain/validation'
import type { OperationalReportDraft } from '../../src/domain/types'

const validReport: OperationalReportDraft = {
  centerId: 'center-c',
  reportMonth: '2026-11',
  category: 'Hạng mục kiểm thử',
  requiredCount: '8',
  completedCount: '6',
  notes: '',
}

afterEach(() => cleanup())

function renderReportForm() {
  return render(
    <DemoStateProvider>
      <OperationalReportForm />
      <FormsListPage onCreate={() => undefined} onOpenDraft={() => undefined} />
    </DemoStateProvider>,
  )
}

function fillOperationalReport(report: OperationalReportDraft = validReport) {
  fireEvent.change(screen.getByLabelText('Tên TTTM'), {
    target: { value: report.centerId },
  })
  fireEvent.change(screen.getByLabelText('Tháng báo cáo'), {
    target: { value: report.reportMonth },
  })
  fireEvent.change(screen.getByLabelText('Hạng mục báo cáo'), {
    target: { value: report.category },
  })
  fireEvent.change(screen.getByLabelText('Số việc cần hoàn thành'), {
    target: { value: report.requiredCount },
  })
  fireEvent.change(screen.getByLabelText('Số việc đã hoàn thành'), {
    target: { value: report.completedCount },
  })
}

describe('Báo cáo vận hành định kỳ', () => {
  it('TC01: chấp nhận dữ liệu hợp lệ, lưu bản ghi Chờ duyệt và ngày gửi vào danh sách', async () => {
    renderReportForm()
    fillOperationalReport()

    fireEvent.click(screen.getByRole('button', { name: 'Gửi duyệt' }))

    expect(
      await screen.findByText(/đã chuyển sang trạng thái Chờ duyệt/i),
    ).toBeTruthy()
    const submittedAt = (screen.getByLabelText('Ngày gửi') as HTMLInputElement).value
    expect(submittedAt).toMatch(/^\d{4}-\d{2}-\d{2}$/)

    const recordRow = screen
      .getByText(/2026-11 · Hạng mục kiểm thử/)
      .closest('article.record-row')
    expect(recordRow?.textContent).toContain('Chờ duyệt')
    expect(recordRow?.textContent).toContain(`Ngày gửi ${submittedAt}`)
    expect(screen.getByText('3 bản ghi')).toBeTruthy()
  })

  it('TC02: bỏ trống trường bắt buộc thì không gửi, nhưng vẫn lưu được nháp không có ngày gửi', async () => {
    renderReportForm()
    expect((screen.getByLabelText('Tháng báo cáo') as HTMLInputElement).value).toBe(
      '2026-11',
    )
    // EMPTY_DRAFT intentionally defaults to 2026-11; clear it to exercise the required-field rule.
    fireEvent.change(screen.getByLabelText('Tháng báo cáo'), {
      target: { value: '' },
    })
    fireEvent.click(screen.getByRole('button', { name: 'Gửi duyệt' }))

    expect(await screen.findByText('Vui lòng chọn TTTM.')).toBeTruthy()
    expect(screen.getByText('Vui lòng chọn tháng báo cáo.')).toBeTruthy()
    expect(screen.getByText('Vui lòng nhập hạng mục báo cáo.')).toBeTruthy()
    expect(screen.getByText('2 bản ghi')).toBeTruthy()

    fireEvent.click(screen.getByRole('button', { name: 'Lưu nháp' }))
    expect(await screen.findByText(/đã lưu nháp trong phiên demo/i)).toBeTruthy()
    expect((screen.getByLabelText('Ngày gửi') as HTMLInputElement).value).toBe('')
    expect(screen.getByText('Nháp')).toBeTruthy()
    expect(screen.getByText('3 bản ghi')).toBeTruthy()
  })

  it('TC03: số âm bị từ chối và không tạo bản ghi', () => {
    renderReportForm()
    fillOperationalReport({ ...validReport, requiredCount: '-1' })
    fireEvent.click(screen.getByRole('button', { name: 'Gửi duyệt' }))

    expect(
      screen.getByText('Số việc cần hoàn thành phải là số nguyên không âm.'),
    ).toBeTruthy()
    expect(screen.getByText('2 bản ghi')).toBeTruthy()
  })

  it('TC04: số hoàn thành vượt số cần làm bị từ chối và không tạo bản ghi', () => {
    renderReportForm()
    fillOperationalReport({ ...validReport, requiredCount: '3', completedCount: '4' })
    fireEvent.click(screen.getByRole('button', { name: 'Gửi duyệt' }))

    expect(
      screen.getByText('Số việc đã hoàn thành không được lớn hơn số việc cần hoàn thành.'),
    ).toBeTruthy()
    expect(screen.getByText('2 bản ghi')).toBeTruthy()
  })

  it('TC-DUP: chặn lưu/gửi trùng; chỉ loại trừ chính bản ghi đang sửa', () => {
    renderReportForm()
    const duplicateDraft: OperationalReportDraft = {
      ...validReport,
      centerId: 'center-a',
      category: 'Vận hành chung',
    }
    fillOperationalReport(duplicateDraft)

    fireEvent.click(screen.getByRole('button', { name: 'Lưu nháp' }))
    expect(
      screen.getByText('TTTM này đã có báo cáo cho tháng và hạng mục đã chọn.'),
    ).toBeTruthy()
    expect(screen.getByText('2 bản ghi')).toBeTruthy()

    fireEvent.click(screen.getByRole('button', { name: 'Gửi duyệt' }))
    expect(
      screen.getByText('TTTM này đã có báo cáo cho tháng và hạng mục đã chọn.'),
    ).toBeTruthy()
    expect(screen.getByText('2 bản ghi')).toBeTruthy()

    const editingErrors = validateOperationalReport(duplicateDraft, {
      mode: 'draft',
      existingReports: INITIAL_OPERATIONAL_REPORTS,
      editingRecordId: 'report-a-2026-11',
    })
    expect(editingErrors).toEqual({})
  })

  it('TC-DUP: cập nhật bản nháp của chính mình không tạo bản ghi thứ hai', () => {
    renderReportForm()
    fillOperationalReport(validReport)
    fireEvent.click(screen.getByRole('button', { name: 'Lưu nháp' }))
    expect(screen.getByText('3 bản ghi')).toBeTruthy()

    fireEvent.change(screen.getByLabelText('Ghi chú'), {
      target: { value: 'Đã cập nhật nháp.' },
    })
    fireEvent.click(screen.getByRole('button', { name: 'Lưu nháp' }))

    expect(screen.getByText(/đã lưu nháp trong phiên demo/i)).toBeTruthy()
    expect((screen.getByLabelText('Ghi chú') as HTMLTextAreaElement).value).toBe(
      'Đã cập nhật nháp.',
    )
    expect(screen.getByText('3 bản ghi')).toBeTruthy()
  })
})
