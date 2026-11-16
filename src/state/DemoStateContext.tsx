import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from 'react'
import {
  DEMO_DATA_LABEL,
  type DemoRole,
  type FormActionResult,
  type IssueProposalDraft,
  type IssueProposalRecord,
  type OperationalReportDraft,
  type OperationalReportRecord,
} from '../domain/types'
import {
  validateIssueProposal,
  validateOperationalReport,
} from '../domain/validation'
import {
  DEMO_CENTERS,
  INITIAL_ISSUE_PROPOSALS,
  INITIAL_OPERATIONAL_REPORTS,
} from '../data/seed'

interface DemoStateContextValue {
  centers: typeof DEMO_CENTERS
  operationalReports: OperationalReportRecord[]
  issueProposals: IssueProposalRecord[]
  role: DemoRole
  setRole: (role: DemoRole) => void
  saveOperationalDraft: (
    draft: OperationalReportDraft,
    recordId?: string,
  ) => FormActionResult
  submitOperationalReport: (
    draft: OperationalReportDraft,
    recordId?: string,
  ) => FormActionResult
  saveIssueDraft: (
    draft: IssueProposalDraft,
    recordId?: string,
  ) => FormActionResult
  submitIssueProposal: (
    draft: IssueProposalDraft,
    recordId?: string,
  ) => FormActionResult
}

const DemoStateContext = createContext<DemoStateContextValue | undefined>(
  undefined,
)

function makeRecordId(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}

export function getLocalDateISO(date = new Date()): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function toNullableNumber(value: string): number | null {
  if (value.trim() === '') return null
  const numberValue = Number(value)
  return Number.isFinite(numberValue) ? numberValue : null
}

function toOperationalRecord(
  draft: OperationalReportDraft,
  id: string,
  status: OperationalReportRecord['status'],
  submittedAt: string | null,
): OperationalReportRecord {
  return {
    id,
    centerId: draft.centerId,
    reportMonth: draft.reportMonth,
    category: draft.category.trim(),
    requiredCount: toNullableNumber(draft.requiredCount),
    completedCount: toNullableNumber(draft.completedCount),
    notes: draft.notes,
    submittedAt,
    status,
    demoLabel: DEMO_DATA_LABEL,
  }
}

function toIssueRecord(
  draft: IssueProposalDraft,
  id: string,
  status: IssueProposalRecord['status'],
  submittedAt: string | null,
): IssueProposalRecord {
  return {
    id,
    centerId: draft.centerId,
    issueType: draft.issueType.trim(),
    description: draft.description.trim(),
    priority: draft.priority,
    desiredResolutionDate: draft.desiredResolutionDate,
    notes: draft.notes,
    attachmentName: draft.attachmentName,
    submittedAt,
    status,
    demoLabel: DEMO_DATA_LABEL,
  }
}

function upsert<T extends { id: string }>(items: T[], item: T): T[] {
  const existingIndex = items.findIndex((candidate) => candidate.id === item.id)
  if (existingIndex < 0) return [...items, item]
  return items.map((candidate) => (candidate.id === item.id ? item : candidate))
}

export function DemoStateProvider({ children }: { children: ReactNode }) {
  const [operationalReports, setOperationalReports] = useState(() =>
    INITIAL_OPERATIONAL_REPORTS.map((report) => ({ ...report })),
  )
  const [issueProposals, setIssueProposals] = useState(() =>
    INITIAL_ISSUE_PROPOSALS.map((proposal) => ({ ...proposal })),
  )
  const [role, setRole] = useState<DemoRole>('Nhân viên TTTM')

  const saveOperationalDraft = (
    draft: OperationalReportDraft,
    recordId?: string,
  ): FormActionResult => {
    const existing = recordId
      ? operationalReports.find((report) => report.id === recordId)
      : undefined
    if (existing && existing.status !== 'Nháp') {
      return {
        ok: false,
        errors: { form: 'Chỉ có thể sửa bản ghi đang ở trạng thái Nháp trong đợt này.' },
      }
    }
    const errors = validateOperationalReport(draft, {
      mode: 'draft',
      existingReports: operationalReports,
      editingRecordId: recordId,
    })
    if (Object.keys(errors).length > 0) return { ok: false, errors }

    const id = recordId ?? makeRecordId('report')
    const record = toOperationalRecord(draft, id, 'Nháp', null)
    setOperationalReports((current) => upsert(current, record))
    return { ok: true, recordId: id, submittedAt: null }
  }

  const submitOperationalReport = (
    draft: OperationalReportDraft,
    recordId?: string,
  ): FormActionResult => {
    const existing = recordId
      ? operationalReports.find((report) => report.id === recordId)
      : undefined
    if (existing && existing.status !== 'Nháp') {
      return {
        ok: false,
        errors: { form: 'Chỉ có thể gửi bản ghi đang ở trạng thái Nháp trong đợt này.' },
      }
    }
    const errors = validateOperationalReport(draft, {
      mode: 'submit',
      existingReports: operationalReports,
      editingRecordId: recordId,
    })
    if (Object.keys(errors).length > 0) return { ok: false, errors }

    const id = recordId ?? makeRecordId('report')
    const submittedAt = getLocalDateISO()
    const record = toOperationalRecord(draft, id, 'Chờ duyệt', submittedAt)
    setOperationalReports((current) => upsert(current, record))
    return { ok: true, recordId: id, submittedAt }
  }

  const saveIssueDraft = (
    draft: IssueProposalDraft,
    recordId?: string,
  ): FormActionResult => {
    const existing = recordId
      ? issueProposals.find((proposal) => proposal.id === recordId)
      : undefined
    if (existing && existing.status !== 'Nháp') {
      return {
        ok: false,
        errors: { form: 'Chỉ có thể sửa bản ghi đang ở trạng thái Nháp trong đợt này.' },
      }
    }
    const errors = validateIssueProposal(draft, { mode: 'draft' })
    if (Object.keys(errors).length > 0) return { ok: false, errors }

    const id = recordId ?? makeRecordId('issue')
    const record = toIssueRecord(draft, id, 'Nháp', null)
    setIssueProposals((current) => upsert(current, record))
    return { ok: true, recordId: id, submittedAt: null }
  }

  const submitIssueProposal = (
    draft: IssueProposalDraft,
    recordId?: string,
  ): FormActionResult => {
    const existing = recordId
      ? issueProposals.find((proposal) => proposal.id === recordId)
      : undefined
    if (existing && existing.status !== 'Nháp') {
      return {
        ok: false,
        errors: { form: 'Chỉ có thể gửi bản ghi đang ở trạng thái Nháp trong đợt này.' },
      }
    }
    const submittedAt = getLocalDateISO()
    const errors = validateIssueProposal(draft, { mode: 'submit', submittedAt })
    if (Object.keys(errors).length > 0) return { ok: false, errors }

    const id = recordId ?? makeRecordId('issue')
    const record = toIssueRecord(draft, id, 'Chờ duyệt', submittedAt)
    setIssueProposals((current) => upsert(current, record))
    return { ok: true, recordId: id, submittedAt }
  }

  const value: DemoStateContextValue = {
    centers: DEMO_CENTERS,
    operationalReports,
    issueProposals,
    role,
    setRole,
    saveOperationalDraft,
    submitOperationalReport,
    saveIssueDraft,
    submitIssueProposal,
  }

  return (
    <DemoStateContext.Provider value={value}>
      {children}
    </DemoStateContext.Provider>
  )
}

export function useDemoState(): DemoStateContextValue {
  const context = useContext(DemoStateContext)
  if (!context) {
    throw new Error('useDemoState phải được dùng bên trong DemoStateProvider.')
  }
  return context
}
