import { describe, expect, it } from 'vitest'
import {
  fromInputDateTimeValue,
  toApiDateTime,
  toInputDateTimeValue,
  toUiDateTime,
} from './dateTime'

describe('toInputDateTimeValue', () => {
  it('replaces the space separator with a T (datetime-local format)', () => {
    expect(toInputDateTimeValue('2026-09-11 10:00')).toBe('2026-09-11T10:00')
  })

  it('returns the value unchanged when it already uses T', () => {
    expect(toInputDateTimeValue('2026-09-11T10:00')).toBe('2026-09-11T10:00')
  })
})

describe('fromInputDateTimeValue', () => {
  it('replaces the T separator with a space', () => {
    expect(fromInputDateTimeValue('2026-09-11T10:00')).toBe('2026-09-11 10:00')
  })

  it('returns the value unchanged when it already uses a space', () => {
    expect(fromInputDateTimeValue('2026-09-11 10:00')).toBe('2026-09-11 10:00')
  })
})

describe('toUiDateTime', () => {
  it('returns an empty string for null or undefined input', () => {
    expect(toUiDateTime(null)).toBe('')
    expect(toUiDateTime('')).toBe('')
  })

  it('formats an ISO string into a UI date-time', () => {
    expect(toUiDateTime('2026-09-11T10:05:00.000Z')).toMatch(/^2026-\d{2}-\d{2} \d{2}:\d{2}$/)
  })

  it('returns the raw value when the input cannot be parsed', () => {
    expect(toUiDateTime('not-a-date')).toBe('not-a-date')
  })
})

describe('toApiDateTime', () => {
  it('converts a UI date-time string to an ISO string', () => {
    const result = toApiDateTime('2026-09-11 10:00')
    expect(result).toBeDefined()
    expect(new Date(result as string).toISOString()).toBe(result)
  })

  it('returns undefined for invalid input', () => {
    expect(toApiDateTime('')).toBeUndefined()
    expect(toApiDateTime('invalid')).toBeUndefined()
  })
})