import { useState } from 'react'
import AppShell, { type ScreenId } from '../components/AppShell'
import DemoRoleSelector from '../components/DemoRoleSelector'
import { useDemoState } from '../state/DemoStateContext'
import type { FormKind } from '../domain/types'
import FormsListPage from '../features/forms/FormsListPage'
import FormEditorPage from '../features/forms/FormEditorPage'

const screenDetails: Record<
  ScreenId,
  { title: string; subtitle: string; icon: string; message: string }
> = {
  overview: {
    title: 'Tổng quan',
    subtitle: 'Theo dõi tình trạng nộp báo cáo theo kỳ.',
    icon: '▦',
    message:
      'Khung dashboard sẽ được bổ sung ở đợt tiếp theo. Hiện chưa có số liệu nghiệp vụ trong màn hình này.',
  },
  forms: {
    title: 'Danh sách biểu mẫu',
    subtitle: 'Tạo biểu mẫu mới hoặc tiếp tục bản nháp trong phiên demo.',
    icon: '▤',
    message: 'Danh sách biểu mẫu đang được chuẩn bị.',
  },
  editor: {
    title: 'Nhập / sửa biểu mẫu',
    subtitle: 'Nhập dữ liệu giả lập, kiểm tra trường và lưu trong phiên demo.',
    icon: '＋',
    message:
      'Chọn một trong hai loại biểu mẫu để bắt đầu.',
  },
  approvals: {
    title: 'Chờ duyệt',
    subtitle: 'Khu vực khung cho vai trò người duyệt.',
    icon: '✓',
    message:
      'Danh sách chờ duyệt và thao tác duyệt / trả lại chưa được nối với dữ liệu.',
  },
  detail: {
    title: 'Chi tiết bản ghi',
    subtitle: 'Khu vực khung để xem một bản ghi biểu mẫu.',
    icon: '⌕',
    message:
      'Chi tiết, lý do trả lại và trạng thái khóa bản ghi chưa được triển khai.',
  },
}

function App() {
  const [activeScreen, setActiveScreen] = useState<ScreenId>('overview')
  const [selectedForm, setSelectedForm] = useState<FormKind | null>(null)
  const [editingRecordId, setEditingRecordId] = useState<string | undefined>()
  const { role, setRole } = useDemoState()
  const screen = screenDetails[activeScreen]

  const navigateTo = (nextScreen: ScreenId) => {
    setActiveScreen(nextScreen)
    if (nextScreen !== 'editor') {
      setSelectedForm(null)
      setEditingRecordId(undefined)
    }
  }

  const createForm = (kind: FormKind) => {
    setSelectedForm(kind)
    setEditingRecordId(undefined)
    setActiveScreen('editor')
  }

  const openDraft = (kind: FormKind, recordId: string) => {
    setSelectedForm(kind)
    setEditingRecordId(recordId)
    setActiveScreen('editor')
  }

  const returnToForms = () => {
    setSelectedForm(null)
    setEditingRecordId(undefined)
    setActiveScreen('forms')
  }

  const pageBody =
    activeScreen === 'forms' ? (
      <FormsListPage onCreate={createForm} onOpenDraft={openDraft} />
    ) : activeScreen === 'editor' ? (
      <FormEditorPage
        kind={selectedForm}
        recordId={editingRecordId}
        onChoose={setSelectedForm}
        onCancel={returnToForms}
      />
    ) : (
      <section className="workspace-card" aria-labelledby="workspace-title">
        <div className="empty-state">
          <div className="empty-state__icon" aria-hidden="true">
            {screen.icon}
          </div>
          <p className="card-kicker">KHUNG GIAO DIỆN</p>
          <h2 id="workspace-title">{screen.title}</h2>
          <p className="empty-state__message">{screen.message}</p>
          <span className="coming-soon-tag">Chưa có xử lý nghiệp vụ</span>
        </div>
      </section>
    )

  return (
    <AppShell
      activeScreen={activeScreen}
      onNavigate={navigateTo}
      roleSelector={<DemoRoleSelector value={role} onChange={setRole} />}
    >
      <main className="page-content">
        <div className="page-heading">
          <div>
            <p className="eyebrow">CỔNG NHẬP LIỆU · BAN QUẢN LÝ TTTM</p>
            <h1>{screen.title}</h1>
            <p className="page-subtitle">{screen.subtitle}</p>
          </div>
          <span className="stage-chip">
            <span className="stage-chip__dot" aria-hidden="true" />
            Đợt 2 · Biểu mẫu demo
          </span>
        </div>

        <section className="assumption-notice" aria-label="Thông tin giả định">
          <span className="assumption-notice__mark" aria-hidden="true">
            i
          </span>
          <div>
            <strong>Giả định phục vụ demo, chờ VCR xác nhận</strong>
            <p>
              Vai trò, dữ liệu và luồng minh họa chưa phải quy trình chính thức.
              Bản mẫu chỉ dùng dữ liệu giả và không kết nối hệ thống VCR.
            </p>
          </div>
        </section>

        {pageBody}

        <p className="role-context">
          Đang xem với vai trò demo: <strong>{role}</strong>. Bộ chọn này không
          phải đăng nhập hay phân quyền thật.
        </p>
      </main>
    </AppShell>
  )
}

export default App
