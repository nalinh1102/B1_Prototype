import {
  DEMO_DATA_LABEL,
  type DemoCenter,
  type IssueProposalRecord,
  type OperationalReportRecord,
} from '../domain/types'

export const DEMO_CENTERS: DemoCenter[] = [
  { id: 'center-a', name: 'TTTM Mẫu A', demoLabel: DEMO_DATA_LABEL },
  { id: 'center-b', name: 'TTTM Mẫu B', demoLabel: DEMO_DATA_LABEL },
  { id: 'center-c', name: 'TTTM Mẫu C', demoLabel: DEMO_DATA_LABEL },
]

export const INITIAL_OPERATIONAL_REPORTS: OperationalReportRecord[] = [
  {
    id: 'report-a-2026-11',
    centerId: 'center-a',
    reportMonth: '2026-11',
    category: 'Vận hành chung',
    requiredCount: 12,
    completedCount: 11,
    notes: 'Bản ghi giả lập để hiển thị trạng thái mẫu.',
    submittedAt: '2026-11-12',
    status: 'Đã duyệt',
    demoLabel: DEMO_DATA_LABEL,
  },
  {
    id: 'report-b-2026-11',
    centerId: 'center-b',
    reportMonth: '2026-11',
    category: 'Vận hành chung',
    requiredCount: 10,
    completedCount: 7,
    notes: 'Bản ghi giả lập để hiển thị trạng thái mẫu.',
    submittedAt: '2026-11-12',
    status: 'Chờ duyệt',
    demoLabel: DEMO_DATA_LABEL,
  },
]

export const INITIAL_ISSUE_PROPOSALS: IssueProposalRecord[] = []
