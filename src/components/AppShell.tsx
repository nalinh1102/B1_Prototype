import type { ReactNode } from 'react'

export type ScreenId = 'overview' | 'forms' | 'editor' | 'approvals' | 'detail'

const navigationItems: Array<{ id: ScreenId; label: string; icon: string }> = [
  { id: 'overview', label: 'Tổng quan', icon: '▦' },
  { id: 'forms', label: 'Danh sách biểu mẫu', icon: '▤' },
  { id: 'editor', label: 'Nhập / sửa biểu mẫu', icon: '＋' },
  { id: 'approvals', label: 'Chờ duyệt', icon: '✓' },
  { id: 'detail', label: 'Chi tiết bản ghi', icon: '⌕' },
]

interface AppShellProps {
  activeScreen: ScreenId
  onNavigate: (screen: ScreenId) => void
  roleSelector: ReactNode
  children: ReactNode
}

function AppShell({
  activeScreen,
  onNavigate,
  roleSelector,
  children,
}: AppShellProps) {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand-lockup">
          <div className="brand-mark" aria-hidden="true">
            B1
          </div>
          <div>
            <p className="brand-overline">BẢN MẪU CỤC BỘ</p>
            <p className="brand-name">Cổng nhập liệu</p>
            <p className="brand-description">Ban quản lý TTTM</p>
          </div>
        </div>

        <div className="sidebar-divider" />
        <p className="sidebar-section-label">ĐIỀU HƯỚNG</p>
        <nav className="main-navigation" aria-label="Điều hướng chính">
          {navigationItems.map((item) => {
            const isActive = item.id === activeScreen

            return (
              <button
                className={`navigation-item${isActive ? ' is-active' : ''}`}
                type="button"
                key={item.id}
                aria-current={isActive ? 'page' : undefined}
                onClick={() => onNavigate(item.id)}
              >
                <span className="navigation-item__icon" aria-hidden="true">
                  {item.icon}
                </span>
                <span>{item.label}</span>
                {isActive && <span className="navigation-item__marker" />}
              </button>
            )
          })}
        </nav>

        <div className="sidebar-footer">
          <span className="connection-indicator" aria-hidden="true" />
          <div>
            <strong>Đang chạy cục bộ</strong>
            <span>Không kết nối hệ thống VCR</span>
          </div>
        </div>
      </aside>

      <div className="main-column">
        <header className="topbar">
          <div className="topbar__context">
            <span className="topbar__dot" aria-hidden="true" />
            B1 <span className="topbar__slash">/</span> Bản mẫu nhập liệu
          </div>
          <div className="topbar__controls">{roleSelector}</div>
        </header>
        {children}
      </div>
    </div>
  )
}

export default AppShell
