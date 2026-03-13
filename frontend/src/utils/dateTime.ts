const pad = (value: number): string => String(value).padStart(2, '0')

const parseDateLike = (value: string): Date | null => {
  if (!value.trim()) return null

  const normalized = value.includes(' ') ? value.replace(' ', 'T') : value
  const date = new Date(normalized)
  return Number.isNaN(date.getTime()) ? null : date
}

const formatUiDate = (date: Date): string =>
  `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}`

export const toInputDateTimeValue = (value: string): string => value.replace(' ', 'T')

export const fromInputDateTimeValue = (value: string): string => value.replace('T', ' ')

export const toUiDateTime = (value: string | null): string => {
  if (!value) return ''
  const date = parseDateLike(value)
  return date ? formatUiDate(date) : value
}

export const toApiDateTime = (value: string): string | undefined => {
  const date = parseDateLike(value)
  return date ? date.toISOString() : undefined
}
