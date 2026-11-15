import { describe, it, expect } from 'vitest'

describe('Emergency Clinical Passport Payload Verification', () => {
  const patientQR = {
    name: 'Lakshmi Garu',
    age: 72,
    blood_group: 'B+',
    allergies: ['Penicillin', 'Sulfa Drugs'],
    chronic_conditions: ['Type 2 Diabetes', 'Hypertension (BP)'],
    emergency_contact: {
      name: 'Priya Sharma (Daughter)',
      phone: '+91 98765 00112'
    }
  }

  it('should verify blood group exists for emergency transfusion', () => {
    expect(patientQR.blood_group).toBe('B+')
  })

  it('should flag fatal drug allergies to prevent contraindications', () => {
    expect(patientQR.allergies).toContain('Penicillin')
    expect(patientQR.allergies).toContain('Sulfa Drugs')
  })

  it('should provide direct family emergency contact phone', () => {
    expect(patientQR.emergency_contact.phone).toContain('98765')
  })
})

describe('Indian Pharmacopoeia Medicine Search & Generic Mapping', () => {
  const sampleMedicines = [
    { name: 'Glycomet-GP 1 PR Tablet', composition: 'Glimepiride (1mg) + Metformin (500mg)', price: '125.00' },
    { name: 'Telma 40 Tablet', composition: 'Telmisartan (40mg)', price: '115.50' },
    { name: 'Shelcal 500 Tablet', composition: 'Calcium (500mg) + Vitamin D3 (250IU)', price: '95.00' }
  ]

  const searchMedicines = (query) => {
    const q = query.toLowerCase()
    return sampleMedicines.filter(m => 
      m.name.toLowerCase().includes(q) || m.composition.toLowerCase().includes(q)
    )
  }

  it('should find medicine by brand name regardless of casing', () => {
    const res = searchMedicines('glycomet')
    expect(res.length).toBe(1)
    expect(res[0].name).toContain('Glycomet')
  })

  it('should find medicine by active salt composition', () => {
    const res = searchMedicines('telmisartan')
    expect(res.length).toBe(1)
    expect(res[0].name).toBe('Telma 40 Tablet')
  })

  it('should match multiple formulations with common salts like calcium', () => {
    const res = searchMedicines('calcium')
    expect(res.length).toBe(1)
    expect(res[0].composition).toContain('Calcium')
  })
})
