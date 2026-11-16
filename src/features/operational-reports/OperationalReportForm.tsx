import { useState, type FormEvent } from 'react'
import { useDemoState } from '../../state/DemoStateContext'
import { operationalRecordToDraft } from '../../domain/validation'
import type {
  OperationalReportDraft,
  ValidationErrors,
} from '../../domain/types'

interface OperationalReportFormProps {
  recordId?: string
  onCancel?: () => void
}

const EMPTY_DRAFT: OperationalReportDraft = {
  centerId: '',
  reportMonth: '2026-11',
  category: '',
  requiredCount: '',
  completedCount: '',
  notes: '',
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null
  return (
    <p className="field-error" id={id} role="alert">
      {message}
    </p>
  )
}

function OperationalReportForm({
  recordId,
  onCancel,
}: OperationalReportFormProps) {
  const { centers, operationalReports, role, saveOperationalDraft, submitOperationalReport } =
    useDemoState()
  const existing = operationalReports.find((report) => report.id === recordId)
  const [draft, setDraft] = useState<OperationalReportDraft>(() =>
    existing ? operationalRecordToDraft(existing) : { ...EMPTY_DRAFT },
  )
  const [activeRecordId, setActiveRecordId] = useState(recordId)
  const [submittedAt, setSubmittedAt] = useState(existing?.submittedAt ?? '')
  const [isSubmitted, setIsSubmitted] = useState(existing?.status === 'Chờ duyệt')
  const [errors, setErrors] = useState<ValidationErrors>({})
  const [message, setMessage] = useState('')
  const [messageKind, setMessageKind] = useState<'success' | 'error' | ''>('')

  const updateField = (field: keyof OperationalReportDraft, value: string) => {
    setDraft((current) => ({ ...current, [field]: value }))
    setErrors((current) => {
      const next = { ...current }
      delete next[field]
      delete next.form
      return next
    })
    setMessage('')
    setMessageKind('')
  }

  const handleSaveDraft = () => {
    const result = saveOperationalDraft(draft, activeRecordId)
    if (!result.ok) {
      setErrors(result.errors)
      setMessage('Chưa thể lưu nháp. Vui lòng kiểm tra thông tin được đánh dấu.')
      setMessageKind('error')
      return
    }

    setActiveRecordId(result.recordId)
    setErrors({})
    setMessage('Đã lưu nháp trong phiên demo. Ngày gửi chưa được ghi nhận.')
    setMessageKind('success')
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const result = submitOperationalReport(draft, activeRecordId)
    if (!result.ok) {
      setErrors(result.errors)
      setMessage('Chưa thể gửi biểu mẫu. Vui lòng kiểm tra thông tin được đánh dấu.')
      setMessageKind('error')
      return
    }

    setActiveRecordId(result.recordId)
    setSubmittedAt(result.submittedAt ?? '')
    setIsSubmitted(true)
    setErrors({})
    setMessage(
      'Báo cáo đã chuyển sang trạng thái Chờ duyệt trong phiên demo. Thao tác duyệt và trả lại chưa triển khai.',
    )
    setMessageKind('success')
  }

  if (role !== 'Nhân viên TTTM') {
    return (
      <section className="form-page-card">
        <div className="form-page-heading">
          <div>
            <p className="card-kicker">BÁO CÁO VẬN HÀNH</p>
            <h2>Báo cáo vận hành định kỳ</h2>
          </div>
        </div>
        <p className="form-unavailable" role="status">
          Chọn vai trò Nhân viên TTTM để nhập biểu mẫu trong bản demo. Đây chỉ là
          mô phỏng giao diện, không phải phân quyền thật.
        </p>
      </section>
    )
  }

  return (
    <section className="form-page-card">
      <div className="form-page-heading">
        <div>
          <p className="card-kicker">BIỂU MẪU DEMO</p>
          <h2>Báo cáo vận hành định kỳ</h2>
          <p>Thông tin báo cáo được lưu trong bộ nhớ của phiên demo.</p>
        </div>
        {onCancel && (
          <button className="button button--quiet" type="button" onClick={onCancel}>
            Quay lại danh sách
          </button>
        )}
      </div>

      {message && (
        <div
          className={`form-notice form-notice--${messageKind}`}
          role={messageKind === 'error' ? 'alert' : 'status'}
        >
          {message}
        </div>
      )}

      {errors.form && <FieldError id="report-form-error" message={errors.form} />}

      <form className="business-form" onSubmit={handleSubmit} noValidate>
        <div className="form-grid">
          <div className="form-field">
            <label htmlFor="report-center">Tên TTTM</label>
            <select
              id="report-center"
              value={draft.centerId}
              onChange={(event) => updateField('centerId', event.target.value)}
              disabled={isSubmitted}
              aria-invalid={Boolean(errors.centerId)}
              aria-describedby={errors.centerId ? 'report-center-error' : undefined}
            >
              <option value="">Chọn TTTM</option>
              {centers.map((center) => (
                <option key={center.id} value={center.id}>
                  {center.name}
                </option>
              ))}
            </select>
            <FieldError id="report-center-error" message={errors.centerId} />
          </div>

          <div className="form-field">
            <label htmlFor="report-month">Tháng báo cáo</label>
            <input
              id="report-month"
              type="month"
              value={draft.reportMonth}
              onChange={(event) => updateField('reportMonth', event.target.value)}
              disabled={isSubmitted}
              aria-invalid={Boolean(errors.reportMonth)}
              aria-describedby={errors.reportMonth ? 'report-month-error' : undefined}
            />
            <FieldError id="report-month-error" message={errors.reportMonth} />
          </div>

          <div className="form-field form-field--wide">
            <label htmlFor="report-category">Hạng mục báo cáo</label>
            <input
              id="report-category"
              type="text"
              value={draft.category}
              onChange={(event) => updateField('category', event.target.value)}
              placeholder="Ví dụ: Vận hành chung"
              disabled={isSubmitted}
              aria-invalid={Boolean(errors.category)}
              aria-describedby={errors.category ? 'report-category-error' : undefined}
            />
            <FieldError id="report-category-error" message={errors.category} />
          </div>

          <div className="form-field">
            <label htmlFor="report-required-count">Số việc cần hoàn thành</label>
            <input
              id="report-required-count"
              type="number"
              inputMode="numeric"
              value={draft.requiredCount}
              onChange={(event) => updateField('requiredCount', event.target.value)}
              placeholder="Nhập số nguyên không âm"
              disabled={isSubmitted}
              aria-invalid={Boolean(errors.requiredCount)}
              aria-describedby={
                errors.requiredCount ? 'report-required-count-error' : undefined
              }
            />
            <FieldError
              id="report-required-count-error"
              message={errors.requiredCount}
            />
          </div>

          <div className="form-field">
            <label htmlFor="report-completed-count">Số việc đã hoàn thành</label>
            <input
              id="report-completed-count"
              type="number"
              inputMode="numeric"
              value={draft.completedCount}
              onChange={(event) => updateField('completedCount', event.target.value)}
              placeholder="Nhập số nguyên không âm"
              disabled={isSubmitted}
              aria-invalid={Boolean(errors.completedCount)}
              aria-describedby={
                errors.completedCount ? 'report-completed-count-error' : undefined
              }
            />
            <FieldError
              id="report-completed-count-error"
              message={errors.completedCount}
            />
          </div>

          <div className="form-field form-field--wide">
            <label htmlFor="report-notes">Ghi chú</label>
            <textarea
              id="report-notes"
              rows={3}
              value={draft.notes}
              onChange={(event) => updateField('notes', event.target.value)}
              placeholder="Thông tin bổ sung (nếu có)"
              disabled={isSubmitted}
            />
          </div>

          <div className="form-field form-field--wide">
            <label htmlFor="report-submitted-at">Ngày gửi</label>
            <input
              id="report-submitted-at"
              type="date"
              value={submittedAt}
              readOnly
              aria-readonly="true"
            />
            <p className="field-hint">
              Ngày gửi chỉ được ghi nhận khi chọn Gửi duyệt; lưu nháp không ghi ngày.
            </p>
          </div>
        </div>

        <div className="form-actions">
          <button
            className="button button--secondary"
            type="button"
            onClick={handleSaveDraft}
            disabled={isSubmitted}
          >
            Lưu nháp
          </button>
          <button className="button button--primary" type="submit" disabled={isSubmitted}>
            Gửi duyệt
          </button>
        </div>
      </form>
    </section>
  )
}

export default OperationalReportForm
