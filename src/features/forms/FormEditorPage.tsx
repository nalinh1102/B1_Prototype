import { FormTypeChooser } from './FormsListPage'
import OperationalReportForm from '../operational-reports/OperationalReportForm'
import IssueProposalForm from '../issue-proposals/IssueProposalForm'
import type { FormKind } from '../../domain/types'

interface FormEditorPageProps {
  kind: FormKind | null
  recordId?: string
  onChoose: (kind: FormKind) => void
  onCancel: () => void
}

function FormEditorPage({ kind, recordId, onChoose, onCancel }: FormEditorPageProps) {
  if (!kind) return <FormTypeChooser onChoose={onChoose} />

  if (kind === 'operational-report') {
    return <OperationalReportForm recordId={recordId} onCancel={onCancel} />
  }

  return <IssueProposalForm recordId={recordId} onCancel={onCancel} />
}

export default FormEditorPage
