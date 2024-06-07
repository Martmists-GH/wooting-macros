import { SystemEventAction } from '../../../../types'
import ClipboardForm from './ClipboardForm'
import EmptyForm from './EmptyForm'
import OpenEventForm from './OpenEventForm'
import OsShortcutForm from './OsShortcutForm'

interface Props {
  selectedElement: SystemEventAction
  selectedElementId: number
}

export default function SystemEventActionForm({
  selectedElement,
  selectedElementId
}: Props) {
  switch (selectedElement.data.type) {
    case 'Open':
      return (
        <OpenEventForm
          selectedElementId={selectedElementId}
          selectedElement={selectedElement}
        />
      )
    case 'Volume':
      return <EmptyForm />
    case 'Clipboard':
      if (selectedElement.data.action.type === 'PasteUserDefinedString') {
        return (
          <ClipboardForm
            selectedElementId={selectedElementId}
            selectedElement={selectedElement}
          />
        )
      } else {
        return <EmptyForm />
      }
    case 'OsShortcut':
      return (
        <OsShortcutForm
          selectedElementId={selectedElementId}
          selectedElement={selectedElement}
        />
      )
    default:
      return <EmptyForm />
  }
}
