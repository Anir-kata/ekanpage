import { useMemo, useState } from 'react'
import { AddStudentForm } from './components/AddStudentForm'
import { StudentList } from './components/StudentList'
import { Tabs, type TabKey } from './components/Tabs'
import { mockStudents } from './data/mockStudents'
import type { Student } from './types/student'

function App() {
  const [activeTab, setActiveTab] = useState<TabKey>('dashboard')
  const [students, setStudents] = useState<Student[]>(mockStudents)

  const totalSessions = useMemo(
    () => students.reduce((acc, student) => acc + student.sessionsDone, 0),
    [students],
  )

  const addStudent = (student: Student) => {
    setStudents((prev) => [student, ...prev])
    setActiveTab('students')
  }

  return (
    <main className="mx-auto min-h-screen w-full max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <header className="rounded-3xl bg-slate-900 p-6 text-white shadow-xl">
        <p className="text-sm font-medium text-slate-300">Prof de mathematiques | Fullstack junior</p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight">Pilotage de mes eleves</h1>
        <p className="mt-3 max-w-2xl text-sm text-slate-200">
          Base React + Tailwind pour suivre tes eleves, organiser tes seances et apprendre a coder proprement.
        </p>
      </header>

      <section className="mt-6 rounded-2xl bg-slate-100 p-4 ring-1 ring-slate-200">
        <Tabs activeTab={activeTab} onChange={setActiveTab} />
      </section>

      {activeTab === 'dashboard' && (
        <section className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <article className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
            <p className="text-sm text-slate-500">Nombre d eleves</p>
            <p className="mt-2 text-3xl font-extrabold text-slate-900">{students.length}</p>
          </article>
          <article className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
            <p className="text-sm text-slate-500">Seances realisees</p>
            <p className="mt-2 text-3xl font-extrabold text-slate-900">{totalSessions}</p>
          </article>
          <article className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
            <p className="text-sm text-slate-500">Prochaine etape</p>
            <p className="mt-2 text-base font-semibold text-slate-900">Ajouter fiches de suivi par eleve</p>
          </article>
        </section>
      )}

      {activeTab === 'students' && (
        <section className="mt-6">
          <StudentList students={students} />
        </section>
      )}

      {activeTab === 'add' && (
        <section className="mt-6">
          <AddStudentForm onAddStudent={addStudent} />
        </section>
      )}
    </main>
  )
}

export default App
