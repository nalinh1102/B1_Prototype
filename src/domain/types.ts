export const DEMO_DATA_LABEL = 'Giả định phục vụ demo, chờ VCR xác nhận'

export const DEMO_ROLES = [
  'Nhân viên TTTM',
  'Người duyệt',
  'Người theo dõi',
] as const

export type DemoRole = (typeof DEMO_ROLES)[number]
export type RecordStatus = 'Nháp' | 'Chờ duyệt' | 'Cần sửa' | 'Đã duyệt'
export type IssuePriority = 'Thấp' | 'Thường' | 'Cao'
export type FormKind = 'operational-report' | 'issue-proposal'

export interface DemoCenter {
  id: string
  name: string
  demoLabel: string
}

export interface OperationalReportDraft {
  centerId: string
  reportMonth: string
  category: string
  requiredCount: string
  completedCount: string
  notes: string
}

export interface OperationalReportRecord {
  id: string
  centerId: string
  reportMonth: string
  category: string
  requiredCount: number | null
  completedCount: number | null
  notes: string
  submittedAt: string | null
  status: RecordStatus
  demoLabel: string
}

export interface IssueProposalDraft {
  centerId: string
  issueType: string
  description: string
  priority: IssuePriority | ''
  desiredResolutionDate: string
  notes: string
  attachmentName: string
}

export interface IssueProposalRecord {
  id: string
  centerId: string
  issueType: string
  description: string
  priority: IssuePriority | ''
  desiredResolutionDate: string
  notes: string
  attachmentName: string
  submittedAt: string | null
  status: RecordStatus
  demoLabel: string
}

export type ValidationErrors = Record<string, string>

export type FormActionResult =
  | { ok: true; recordId: string; submittedAt: string | null }
  | { ok: false; errors: ValidationErrors }
