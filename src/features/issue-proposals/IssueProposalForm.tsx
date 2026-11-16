import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react'
import { useDemoState } from '../../state/DemoStateContext'
import { issueRecordToDraft } from '../../domain/validation'
import type {
  IssueProposalDraft,
  ValidationErrors,
} from '../../domain/types'

interface IssueProposalFormProps {
  recordId?: string
  onCancel?: () => void
}

const EMPTY_DRAFT: IssueProposalDraft = {
  centerId: '',
  issueType: '',
  description: '',
  priority: '',
  desiredResolutionDate: '',
  notes: '',
  attachmentName: '',
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null
  return (
    <p className="field-error" id={id} role="alert">
      {message}
    </p>
  )
}

function IssueProposalForm({ recordId, onCancel }: IssueProposalFormProps) {
  const { centers, issueProposals, role, saveIssueDraft, submitIssueProposal } =
    useDemoState()
  const existing = issueProposals.find((proposal) => proposal.id === recordId)
  const [draft, setDraft] = useState<IssueProposalDraft>(() =>
    existing ? issueRecordToDraft(existing) : { ...EMPTY_DRAFT },
  )
  const [activeRecordId, setActiveRecordId] = useState(recordId)
  const [submittedAt, setSubmittedAt] = useState(existing?.submittedAt ?? '')
  const [isSubmitted, setIsSubmitted] = useState(existing?.status === 'Chờ duyệt')
  const [errors, setErrors] = useState<ValidationErrors>({})
  const [message, setMessage] = useState('')
  const [messageKind, setMessageKind] = useState<'success' | 'error' | ''>('')
  const [previewUrl, setPreviewUrl] = useState('')

  useEffect(
    () => () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl)
    },
    [previewUrl],
  )

  const updateField = (field: keyof IssueProposalDraft, value: string) => {
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

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) {
      setDraft((current) => ({ ...current, attachmentName: '' }))
      setPreviewUrl('')
      return
    }

    setDraft((current) => ({ ...current, attachmentName: file.name }))
    setPreviewUrl(URL.createObjectURL(file))
  }

  const handleSaveDraft = () => {
    const result = saveIssueDraft(draft, activeRecordId)
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
    const result = submitIssueProposal(draft, activeRecordId)
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
      'Đề xuất đã chuyển sang trạng thái Chờ duyệt trong phiên demo. Thao tác duyệt và trả lại chưa triển khai.',
    )
    setMessageKind('success')
  }

  if (role !== 'Nhân viên TTTM') {
    return (
      <section className="form-page-card">
        <div className="form-page-heading">
          <div>
            <p className="card-kicker">ĐỀ XUẤT VẤN ĐỀ</p>
            <h2>Đề xuất xử lý vấn đề</h2>
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
          <h2>Đề xuất xử lý vấn đề</h2>
          <p>Thông tin đề xuất được lưu trong bộ nhớ của phiên demo.</p>
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

      {errors.form && <FieldError id="issue-form-error" message={errors.form} />}

      <form className="business-form" onSubmit={handleSubmit} noValidate>
        <div className="form-grid">
          <div className="form-field">
            <label htmlFor="issue-center">Tên TTTM</label>
            <select
              id="issue-center"
              value={draft.centerId}
              onChange={(event) => updateField('centerId', event.target.value)}
              disabled={isSubmitted}
              aria-invalid={Boolean(errors.centerId)}
              aria-describedby={errors.centerId ? 'issue-center-error' : undefined}
            >
              <option value="">Chọn TTTM</option>
              {centers.map((center) => (
                <option key={center.id} value={center.id}>
                  {center.name}
                </option>
              ))}
            </select>
            <FieldError id="issue-center-error" message={errors.centerId} />
          </div>

          <div className="form-field">
            <label htmlFor="issue-submitted-at">Ngày gửi</label>
            <input
              id="issue-submitted-at"
              type="date"
              value={submittedAt}
              readOnly
              aria-readonly="true"
            />
            <p className="field-hint">
              Ngày gửi được ghi nhận khi chọn Gửi duyệt.
            </p>
          </div>

          <div className="form-field">
            <label htmlFor="issue-type">Loại vấn đề</label>
            <input
              id="issue-type"
              type="text"
              value={draft.issueType}
              onChange={(event) => updateField('issueType', event.target.value)}
              placeholder="Nhập loại vấn đề"
              disabled={isSubmitted}
              aria-invalid={Boolean(errors.issueType)}
              aria-describedby={errors.issueType ? 'issue-type-error' : undefined}
            />
            <FieldError id="issue-type-error" message={errors.issueType} />
          </div>

          <div className="form-field">
            <label htmlFor="issue-priority">Mức ưu tiên</label>
            <select
              id="issue-priority"
              value={draft.priority}
              onChange={(event) =>
                updateField('priority', event.target.value as IssueProposalDraft['priority'])
              }
              disabled={isSubmitted}
              aria-invalid={Boolean(errors.priority)}
              aria-describedby={errors.priority ? 'issue-priority-error' : undefined}
            >
              <option value="">Chọn mức ưu tiên</option>
              <option value="Thấp">Thấp</option>
              <option value="Thường">Thường</option>
              <option value="Cao">Cao</option>
            </select>
            <FieldError id="issue-priority-error" message={errors.priority} />
          </div>

          <div className="form-field form-field--wide">
            <label htmlFor="issue-description">Mô tả vấn đề</label>
            <textarea
              id="issue-description"
              rows={4}
              value={draft.description}
              onChange={(event) => updateField('description', event.target.value)}
              placeholder="Mô tả vấn đề cần xử lý"
              disabled={isSubmitted}
              aria-invalid={Boolean(errors.description)}
              aria-describedby={
                errors.description ? 'issue-description-error' : undefined
              }
            />
            <FieldError
              id="issue-description-error"
              message={errors.description}
            />
          </div>

          <div className="form-field">
            <label htmlFor="issue-desired-date">Ngày mong muốn xử lý</label>
            <input
              id="issue-desired-date"
              type="date"
              value={draft.desiredResolutionDate}
              onChange={(event) =>
                updateField('desiredResolutionDate', event.target.value)
              }
              disabled={isSubmitted}
              aria-invalid={Boolean(errors.desiredResolutionDate)}
              aria-describedby={
                errors.desiredResolutionDate ? 'issue-desired-date-error' : undefined
              }
            />
            <FieldError
              id="issue-desired-date-error"
              message={errors.desiredResolutionDate}
            />
          </div>

          <div className="form-field">
            <label htmlFor="issue-attachment">Hình ảnh đính kèm (không bắt buộc)</label>
            <input
              id="issue-attachment"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              disabled={isSubmitted}
            />
            <p className="field-hint">
              Ảnh chỉ được xem trước cục bộ; không tải lên máy chủ.
            </p>
            {draft.attachmentName && (
              <p className="attachment-name">Đã chọn: {draft.attachmentName}</p>
            )}
            {previewUrl && (
              <img
                className="attachment-preview"
                src={previewUrl}
                alt={`Ảnh xem trước ${draft.attachmentName}`}
              />
            )}
          </div>

          <div className="form-field form-field--wide">
            <label htmlFor="issue-notes">Ghi chú</label>
            <textarea
              id="issue-notes"
              rows={3}
              value={draft.notes}
              onChange={(event) => updateField('notes', event.target.value)}
              placeholder="Thông tin bổ sung (nếu có)"
              disabled={isSubmitted}
            />
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

export default IssueProposalForm
