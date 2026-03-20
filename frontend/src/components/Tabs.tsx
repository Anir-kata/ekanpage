type TabKey = 'dashboard' | 'students'

type TabsProps = {
  activeTab: TabKey
  onChange: (tab: TabKey) => void
  language: 'fr' | 'en'
}

const tabStyles = (isActive: boolean) =>
  `tab-pill rounded-xl px-4 py-2 text-sm font-semibold transition-[transform,background-color,color,box-shadow] duration-150 ${
    isActive
      ? 'bg-cyan-400/15 text-cyan-200 shadow-[0_0_18px_rgba(34,211,238,0.22)]'
      : 'bg-slate-900/35 text-slate-300 hover:bg-slate-800/45 hover:text-cyan-200'
  }`

export function Tabs({ activeTab, onChange, language }: TabsProps) {
  const labels =
    language === 'fr'
      ? { dashboard: 'Tableau de bord', students: 'Élèves' }
      : { dashboard: 'Dashboard', students: 'Students' }

  return (
    <nav className="flex flex-wrap gap-2">
      <button className={tabStyles(activeTab === 'dashboard')} onClick={() => onChange('dashboard')}>
        {labels.dashboard}
      </button>
      <button className={tabStyles(activeTab === 'students')} onClick={() => onChange('students')}>
        {labels.students}
      </button>
    </nav>
  )
}

export type { TabKey }
