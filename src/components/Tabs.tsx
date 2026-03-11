type TabKey = 'dashboard' | 'students'

type TabsProps = {
  activeTab: TabKey
  onChange: (tab: TabKey) => void
}

const tabStyles = (isActive: boolean) =>
  `rounded-xl px-4 py-2 text-sm font-semibold transition duration-300 ${
    isActive
      ? 'bg-cyan-400/15 text-cyan-200 shadow-[0_0_18px_rgba(34,211,238,0.22)]'
      : 'bg-slate-900/35 text-slate-300 hover:bg-slate-800/45 hover:text-cyan-200'
  }`

export function Tabs({ activeTab, onChange }: TabsProps) {
  return (
    <nav className="flex flex-wrap gap-2">
      <button className={tabStyles(activeTab === 'dashboard')} onClick={() => onChange('dashboard')}>
        Tableau de bord
      </button>
      <button className={tabStyles(activeTab === 'students')} onClick={() => onChange('students')}>
        Élèves
      </button>
    </nav>
  )
}

export type { TabKey }
