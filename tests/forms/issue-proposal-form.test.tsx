import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import IssueProposalForm from '../../src/features/issue-proposals/IssueProposalForm'
import FormsListPage from '../../src/features/forms/FormsListPage'
import { DemoStateProvider, getLocalDateISO } from '../../src/state/DemoStateContext'
import type { IssueProposalDraft } from '../../src/domain/types'

const validProposal: IssueProposalDraft = {
  centerId: 'center-c',
  issueType: 'Thiết bị',
  description: 'Mô tả giả lập cho kiểm thử biểu mẫu.',
  priority: 'Thường',
  desiredResolutionDate: '2099-01-01',
  notes: '',
  attachmentName: '',
}

function renderIssueForm() {
  return render(
    <DemoStateProvider>
      <IssueProposalForm />
      <FormsListPage onCreate={() => undefined} onOpenDraft={() => undefined} />
    </DemoStateProvider>,
  )
}

function fillIssueProposal(proposal: IssueProposalDraft = validProposal) {
  fireEvent.change(screen.getByLabelText('Tên TTTM'), {
    target: { value: proposal.centerId },
  })
  fireEvent.change(screen.getByLabelText('Loại vấn đề'), {
    target: { value: proposal.issueType },
  })
  fireEvent.change(screen.getByLabelText('Mô tả vấn đề'), {
    target: { value: proposal.description },
  })
  fireEvent.change(screen.getByLabelText('Mức ưu tiên'), {
    target: { value: proposal.priority },
  })
  fireEvent.change(screen.getByLabelText('Ngày mong muốn xử lý'), {
    target: { value: proposal.desiredResolutionDate },
  })
}

describe('Đề xuất xử lý vấn đề', () => {
  afterEach(() => {
    cleanup()
    vi.unstubAllGlobals()
  })

  it('TC01: chấp nhận dữ liệu hợp lệ, lưu bản ghi Chờ duyệt và ngày gửi vào danh sách', async () => {
    renderIssueForm()
    fillIssueProposal()

    fireEvent.click(screen.getByRole('button', { name: 'Gửi duyệt' }))

    expect(
      await screen.findByText(/đã chuyển sang trạng thái Chờ duyệt/i),
    ).toBeTruthy()
    const submittedAt = (screen.getByLabelText('Ngày gửi') as HTMLInputElement).value
    expect(submittedAt).toMatch(/^\d{4}-\d{2}-\d{2}$/)

    const recordRow = Array.from(document.querySelectorAll<HTMLElement>('article.record-row'))
      .find((row) => row.textContent?.includes('Thiết bị'))
    expect(recordRow?.textContent).toContain('Chờ duyệt')
    expect(recordRow?.textContent).toContain(`Ngày gửi ${submittedAt}`)
    expect(screen.getByText('3 bản ghi')).toBeTruthy()
  })

  it('TC02: báo lỗi tiếng Việt, không gửi dữ liệu thiếu nhưng vẫn lưu được nháp không ngày gửi', async () => {
    renderIssueForm()
    fireEvent.click(screen.getByRole('button', { name: 'Gửi duyệt' }))

    expect(await screen.findByText('Vui lòng chọn TTTM.')).toBeTruthy()
    expect(screen.getByText('Vui lòng nhập loại vấn đề.')).toBeTruthy()
    expect(screen.getByText('Vui lòng nhập mô tả vấn đề.')).toBeTruthy()
    expect(screen.getByText('Vui lòng chọn mức ưu tiên.')).toBeTruthy()
    expect(screen.getByText('2 bản ghi')).toBeTruthy()

    fireEvent.click(screen.getByRole('button', { name: 'Lưu nháp' }))
    expect(await screen.findByText(/đã lưu nháp trong phiên demo/i)).toBeTruthy()
    expect((screen.getByLabelText('Ngày gửi') as HTMLInputElement).value).toBe('')
    expect(screen.getByText('Nháp')).toBeTruthy()
    expect(screen.getByText('3 bản ghi')).toBeTruthy()
  })

  it('TC05: không lưu ngày trước ngày gửi nhưng chấp nhận cùng ngày qua state', async () => {
    renderIssueForm()
    const submittedAt = getLocalDateISO()
    const previousDate = new Date(submittedAt + 'T00:00:00')
    previousDate.setDate(previousDate.getDate() - 1)
    const yesterday = getLocalDateISO(previousDate)

    fillIssueProposal({ ...validProposal, desiredResolutionDate: yesterday })
    fireEvent.click(screen.getByRole('button', { name: 'Gửi duyệt' }))

    expect(
      await screen.findByText('Ngày mong muốn xử lý không được trước ngày gửi.'),
    ).toBeTruthy()
    expect(screen.getByText('2 bản ghi')).toBeTruthy()
    expect((screen.getByLabelText('Ngày gửi') as HTMLInputElement).value).toBe('')

    fireEvent.change(screen.getByLabelText('Ngày mong muốn xử lý'), {
      target: { value: submittedAt },
    })
    fireEvent.click(screen.getByRole('button', { name: 'Gửi duyệt' }))

    expect(
      await screen.findByText(/đã chuyển sang trạng thái Chờ duyệt/i),
    ).toBeTruthy()
    expect((screen.getByLabelText('Ngày gửi') as HTMLInputElement).value).toBe(
      submittedAt,
    )
    expect(screen.getByText('3 bản ghi')).toBeTruthy()
    const recordRow = Array.from(document.querySelectorAll<HTMLElement>('article.record-row'))
      .find((row) => row.textContent?.includes('Thiết bị'))
    expect(recordRow?.textContent).toContain('Chờ duyệt')
    expect(recordRow?.textContent).toContain('Ngày gửi ' + submittedAt)
  })

  it('chỉ xem trước ảnh cục bộ đã chọn', async () => {
    vi.stubGlobal('URL', {
      createObjectURL: vi.fn(() => 'blob:demo-image'),
      revokeObjectURL: vi.fn(),
    })
    renderIssueForm()
    const image = new File(['ảnh giả lập'], 'minh-hoa.png', { type: 'image/png' })
    fireEvent.change(screen.getByLabelText('Hình ảnh đính kèm (không bắt buộc)'), {
      target: { files: [image] },
    })

    const preview = await screen.findByAltText('Ảnh xem trước minh-hoa.png')
    expect(preview.getAttribute('src')).toBe('blob:demo-image')
  })
})
