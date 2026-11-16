import { DEMO_ROLES, type DemoRole } from '../domain/types'

interface DemoRoleSelectorProps {
  value: DemoRole
  onChange: (role: DemoRole) => void
}

function DemoRoleSelector({ value, onChange }: DemoRoleSelectorProps) {
  return (
    <label className="role-selector">
      <span className="role-selector__label">Vai trò demo</span>
      <select
        aria-label="Chọn vai trò demo"
        value={value}
        onChange={(event) => onChange(event.target.value as DemoRole)}
      >
        {DEMO_ROLES.map((role) => (
          <option key={role} value={role}>
            {role}
          </option>
        ))}
      </select>
      <span className="role-selector__hint">Chỉ dùng để minh họa</span>
    </label>
  )
}

export default DemoRoleSelector
