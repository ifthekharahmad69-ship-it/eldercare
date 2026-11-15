import { describe, it, expect } from 'vitest'

describe('Medication Adherence Calculation Engine', () => {
  const calculateAdherence = (meds) => {
    const total = meds.reduce((acc, m) => acc + (m.timing?.length || 1), 0)
    const taken = meds.reduce((acc, m) => {
      const t = m.taken_today || {}
      return acc + Object.values(t).filter(Boolean).length
    }, 0)
    return total > 0 ? Math.round((taken / total) * 100) : 100
  }

  it('should return 100% adherence when no medicines scheduled', () => {
    expect(calculateAdherence([])).toBe(100)
  })

  it('should calculate 33% adherence for 1 of 3 doses taken', () => {
    const meds = [
      { id: '1', timing: ['8:00 AM'], taken_today: { '8:00 AM': true } },
      { id: '2', timing: ['1:00 PM'], taken_today: { '1:00 PM': false } },
      { id: '3', timing: ['8:00 PM'], taken_today: { '8:00 PM': false } }
    ]
    expect(calculateAdherence(meds)).toBe(33)
  })

  it('should dynamically update to 67% when afternoon dose taken', () => {
    const meds = [
      { id: '1', timing: ['8:00 AM'], taken_today: { '8:00 AM': true } },
      { id: '2', timing: ['1:00 PM'], taken_today: { '1:00 PM': true } },
      { id: '3', timing: ['8:00 PM'], taken_today: { '8:00 PM': false } }
    ]
    expect(calculateAdherence(meds)).toBe(67)
  })

  it('should reach 100% when all doses completed', () => {
    const meds = [
      { id: '1', timing: ['8:00 AM'], taken_today: { '8:00 AM': true } },
      { id: '2', timing: ['1:00 PM'], taken_today: { '1:00 PM': true } },
      { id: '3', timing: ['8:00 PM'], taken_today: { '8:00 PM': true } }
    ]
    expect(calculateAdherence(meds)).toBe(100)
  })
})
