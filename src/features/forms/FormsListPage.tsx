import { useDemoState } from '../../state/DemoStateContext'
import type { FormKind, RecordStatus } from '../../domain/types'

interface FormsListPageProps {
  onCreate: (kind: FormKind) => void
  onOpenDraft: (kind: FormKind, recordId: string) => void
}

interface FormTypeChooserProps {
  onChoose: (kind: FormKind) => void
}

function FormTypeChooser({ onChoose }: FormTypeChooserProps) {
  const formTypes: Array<{ kind: FormKind; title: string; description: string }> = [
    {
      kind: 'operational-report',
      title: 'Báo cáo vận hành định kỳ',
      description: 'Nhập báo cáo theo TTTM, tháng và hạng mục.',
    },
    {
      kind: 'issue-proposal',
      title: 'Đề xuất xử lý vấn đề',
      description: 'Ghi nhận vấn đề và mức ưu tiên xử lý.',
    },
  ]

  return (
    <section className="workspace-card form-chooser" aria-labelledby="form-chooser-title">
      <div className="form-page-heading">
        <div>
          <p className="card-kicker">TẠO MỚI</p>
          <h2 id="form-chooser-title">Chọn loại biểu mẫu</h2>
          <p>Chỉ có hai biểu mẫu trong phạm vi bản mẫu này.</p>
        </div>
      </div>
      <div className="form-type-grid">
        {formTypes.map((form, index) => (
          <article className="form-type-card" key={form.kind}>
            <span className="form-preview-card__icon" aria-hidden="true">
              0{index + 1}
            </span>
            <div className="form-type-card__body">
              <h3>{form.title}</h3>
              <p>{form.description}</p>
              <button
                className="button button--secondary"
                type="button"
                onClick={() => onChoose(form.kind)}
              >
                Chọn biểu mẫu
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

function statusDescription(status: RecordStatus): string {
  if (status === 'Chờ duyệt') {
    return 'Trạng thái mẫu; thao tác duyệt và trả lại thuộc đợt sau.'
  }
  if (status === 'Đã duyệt') {
    return 'Trạng thái seed minh họa; hành vi khóa chưa triển khai.'
  }
  if (status === 'Cần sửa') {
    return 'Trạng thái mẫu; luồng trả lại chưa triển khai.'
  }
  return 'Bản nháp trong phiên demo.'
}

function statusClass(status: RecordStatus): string {
  if (status === 'Đã duyệt') return 'approved'
  if (status === 'Chờ duyệt') return 'pending'
  if (status === 'Cần sửa') return 'returned'
  return 'draft'
}

function FormsListPage({ onCreate, onOpenDraft }: FormsListPageProps) {
  const { centers, operationalReports, issueProposals, role } = useDemoState()
  const canEnter = role === 'Nhân viên TTTM'
  const allRecords = [
    ...operationalReports.map((record) => ({
      id: record.id,
      kind: 'operational-report' as const,
      title: 'Báo cáo vận hành định kỳ',
      detail: `${record.reportMonth} · ${record.category || 'Chưa có hạng mục'}`,
      centerName:
        centers.find((center) => center.id === record.centerId)?.name ??
        'TTTM chưa xác định',
      status: record.status,
      submittedAt: record.submittedAt,
      demoLabel: record.demoLabel,
    })),
    ...issueProposals.map((record) => ({
      id: record.id,
      kind: 'issue-proposal' as const,
      title: 'Đề xuất xử lý vấn đề',
      detail: record.issueType || 'Chưa có loại vấn đề',
      centerName:
        centers.find((center) => center.id === record.centerId)?.name ??
        'TTTM chưa xác định',
      status: record.status,
      submittedAt: record.submittedAt,
      demoLabel: record.demoLabel,
    })),
  ]

  return (
    <section className="workspace-card forms-page-card" aria-labelledby="forms-list-title">
      <div className="form-page-heading">
        <div>
          <p className="card-kicker">BIỂU MẪU DEMO</p>
          <h2 id="forms-list-title">Danh sách biểu mẫu</h2>
          <p>Chọn một biểu mẫu để tạo nháp hoặc xem bản ghi trong phiên.</p>
        </div>
        {!canEnter && (
          <span className="role-readonly-tag">Vai trò hiện tại chỉ xem</span>
        )}
      </div>

      <div className="form-type-grid">
        <article className="form-type-card">
          <span className="form-preview-card__icon" aria-hidden="true">
            01
          </span>
          <div className="form-type-card__body">
            <p className="card-kicker">BÁO CÁO</p>
            <h3>Báo cáo vận hành định kỳ</h3>
            <p>TTTM, tháng, hạng mục và số lượng công việc.</p>
            <button
              className="button button--secondary"
              type="button"
              onClick={() => onCreate('operational-report')}
              disabled={!canEnter}
            >
              Tạo báo cáo
            </button>
          </div>
        </article>
        <article className="form-type-card">
          <span className="form-preview-card__icon" aria-hidden="true">
            02
          </span>
          <div className="form-type-card__body">
            <p className="card-kicker">ĐỀ XUẤT</p>
            <h3>Đề xuất xử lý vấn đề</h3>
            <p>Mô tả vấn đề, mức ưu tiên và ngày mong muốn xử lý.</p>
            <button
              className="button button--secondary"
              type="button"
              onClick={() => onCreate('issue-proposal')}
              disabled={!canEnter}
            >
              Tạo đề xuất
            </button>
          </div>
        </article>
      </div>

      <div className="record-list-heading">
        <div>
          <h3>Bản ghi trong phiên demo</h3>
          <p>Seed và bản ghi mới đều là dữ liệu giả, chỉ tồn tại trong phiên này.</p>
        </div>
        <span className="record-count">{allRecords.length} bản ghi</span>
      </div>

      {allRecords.length === 0 ? (
        <div className="record-empty-state">
          <p>Chưa có bản ghi nào trong phiên demo.</p>
          <span>Chọn một trong hai biểu mẫu phía trên để bắt đầu.</span>
        </div>
      ) : (
        <div className="record-list">
          {allRecords.map((record) => (
            <article className="record-row" key={record.id}>
              <div className="record-row__main">
                <div className="record-row__title-line">
                  <h4>{record.title}</h4>
                  <span className={`status-pill status-pill--${statusClass(record.status)}`}>
                    {record.status}
                  </span>
                </div>
                <p>
                  {record.centerName} <span aria-hidden="true">·</span> {record.detail}
                  {record.submittedAt ? ` · Ngày gửi ${record.submittedAt}` : ''}
                </p>
                <small>{record.demoLabel}</small>
                <span className="record-row__status-note">
                  {statusDescription(record.status)}
                </span>
              </div>
              {canEnter && record.status === 'Nháp' && (
                <button
                  className="button button--quiet"
                  type="button"
                  onClick={() => onOpenDraft(record.kind, record.id)}
                >
                  Mở bản nháp
                </button>
              )}
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

export { FormTypeChooser }
export default FormsListPage
