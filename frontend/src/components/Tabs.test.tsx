import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Tabs } from './Tabs'

describe('Tabs', () => {
  it('renders the students tab label in French', () => {
    render(<Tabs activeTab="students" onChange={vi.fn()} language="fr" />)
    expect(screen.getByRole('button', { name: 'Élèves' })).toBeInTheDocument()
  })

  it('renders the students tab label in English', () => {
    render(<Tabs activeTab="students" onChange={vi.fn()} language="en" />)
    expect(screen.getByRole('button', { name: 'Students' })).toBeInTheDocument()
  })

  it('calls onChange when the tab is clicked', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<Tabs activeTab="students" onChange={onChange} language="fr" />)

    await user.click(screen.getByRole('button', { name: 'Élèves' }))
    expect(onChange).toHaveBeenCalledWith('students')
  })
})