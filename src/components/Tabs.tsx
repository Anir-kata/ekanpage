type TabKey = 'dashboard' | 'students' | 'add'

type TabsProps = {
  activeTab: TabKey
  onChange: (tab: TabKey) => void
}

const tabStyles = (isActive: boolean) =>
  `rounded-full px-4 py-2 text-sm font-semibold transition ${
    isActive
      ? 'bg-slate-900 text-white shadow-lg'
      : 'bg-white text-slate-700 hover:bg-slate-100'
  }`

export function Tabs({ activeTab, onChange }: TabsProps) {
  return (
    <nav className="flex flex-wrap gap-2">
      <button className={tabStyles(activeTab === 'dashboard')} onClick={() => onChange('dashboard')}>
        Tableau de bord
      </button>
      <button className={tabStyles(activeTab === 'students')} onClick={() => onChange('students')}>
        Eleves
      </button>
      <button className={tabStyles(activeTab === 'add')} onClick={() => onChange('add')}>
        Ajouter un eleve
      </button>
    </nav>
  )
}

export type { TabKey }
