type TabKey = 'dashboard' | 'students' | 'add'

type TabsProps = {
  activeTab: TabKey
  onChange: (tab: TabKey) => void
}

const tabStyles = (isActive: boolean) =>
  `rounded-xl border px-4 py-2 text-sm font-semibold transition duration-300 ${
    isActive
      ? 'border-cyan-300/60 bg-cyan-400/15 text-cyan-200 shadow-[0_0_22px_rgba(34,211,238,0.3)]'
      : 'border-slate-500/40 bg-slate-900/40 text-slate-300 hover:border-cyan-400/40 hover:text-cyan-200'
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
