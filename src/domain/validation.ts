import type {
  IssueProposalDraft,
  IssueProposalRecord,
  OperationalReportDraft,
  OperationalReportRecord,
  ValidationErrors,
} from './types'

type ValidationMode = 'draft' | 'submit'

interface OperationalReportValidationOptions {
  mode: ValidationMode
  existingReports: readonly OperationalReportRecord[]
  editingRecordId?: string
}

interface IssueProposalValidationOptions {
  mode: ValidationMode
  submittedAt?: string
}

function hasValue(value: string): boolean {
  return value.trim().length > 0
}

function isNonNegativeInteger(value: string): boolean {
  if (!hasValue(value)) return false
  const parsed = Number(value)
  return Number.isSafeInteger(parsed) && parsed >= 0
}

function normalizedCategory(category: string): string {
  return category.trim().toLocaleLowerCase('vi-VN')
}

function isDuplicateOperationalReport(
  draft: OperationalReportDraft,
  existingReports: readonly OperationalReportRecord[],
  editingRecordId?: string,
): boolean {
  if (!draft.centerId || !draft.reportMonth || !hasValue(draft.category)) {
    return false
  }

  const categoryKey = normalizedCategory(draft.category)
  return existingReports.some(
    (report) =>
      report.id !== editingRecordId &&
      report.centerId === draft.centerId &&
      report.reportMonth === draft.reportMonth &&
      normalizedCategory(report.category) === categoryKey,
  )
}

export function validateOperationalReport(
  draft: OperationalReportDraft,
  options: OperationalReportValidationOptions,
): ValidationErrors {
  const errors: ValidationErrors = {}

  if (isDuplicateOperationalReport(draft, options.existingReports, options.editingRecordId)) {
    errors.category = 'TTTM này đã có báo cáo cho tháng và hạng mục đã chọn.'
  }

  if (options.mode === 'draft') return errors

  if (!hasValue(draft.centerId)) errors.centerId = 'Vui lòng chọn TTTM.'
  if (!hasValue(draft.reportMonth)) {
    errors.reportMonth = 'Vui lòng chọn tháng báo cáo.'
  }
  if (!hasValue(draft.category)) {
    errors.category = 'Vui lòng nhập hạng mục báo cáo.'
  }
  if (!isNonNegativeInteger(draft.requiredCount)) {
    errors.requiredCount = 'Số việc cần hoàn thành phải là số nguyên không âm.'
  }
  if (!isNonNegativeInteger(draft.completedCount)) {
    errors.completedCount = 'Số việc đã hoàn thành phải là số nguyên không âm.'
  }

  const requiredCount = Number(draft.requiredCount)
  const completedCount = Number(draft.completedCount)
  if (
    isNonNegativeInteger(draft.requiredCount) &&
    isNonNegativeInteger(draft.completedCount) &&
    completedCount > requiredCount
  ) {
    errors.completedCount =
      'Số việc đã hoàn thành không được lớn hơn số việc cần hoàn thành.'
  }

  return errors
}

export function validateIssueProposal(
  draft: IssueProposalDraft,
  options: IssueProposalValidationOptions,
): ValidationErrors {
  if (options.mode === 'draft') return {}

  const errors: ValidationErrors = {}
  if (!hasValue(draft.centerId)) errors.centerId = 'Vui lòng chọn TTTM.'
  if (!hasValue(draft.issueType)) errors.issueType = 'Vui lòng nhập loại vấn đề.'
  if (!hasValue(draft.description)) {
    errors.description = 'Vui lòng nhập mô tả vấn đề.'
  }
  if (!['Thấp', 'Thường', 'Cao'].includes(draft.priority)) {
    errors.priority = 'Vui lòng chọn mức ưu tiên.'
  }

  if (
    hasValue(draft.desiredResolutionDate) &&
    options.submittedAt &&
    draft.desiredResolutionDate < options.submittedAt
  ) {
    errors.desiredResolutionDate =
      'Ngày mong muốn xử lý không được trước ngày gửi.'
  }

  return errors
}

export function operationalRecordToDraft(
  record: OperationalReportRecord,
): OperationalReportDraft {
  return {
    centerId: record.centerId,
    reportMonth: record.reportMonth,
    category: record.category,
    requiredCount: record.requiredCount === null ? '' : String(record.requiredCount),
    completedCount:
      record.completedCount === null ? '' : String(record.completedCount),
    notes: record.notes,
  }
}

export function issueRecordToDraft(
  record: IssueProposalRecord,
): IssueProposalDraft {
  return {
    centerId: record.centerId,
    issueType: record.issueType,
    description: record.description,
    priority: record.priority,
    desiredResolutionDate: record.desiredResolutionDate,
    notes: record.notes,
    attachmentName: record.attachmentName,
  }
}
