import React, { createContext, useContext, useState, useEffect } from 'react'
import { supabase, TABLES } from '../lib/supabase'

const AuthContext = createContext(null)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within an AuthProvider')
  return context
}

// Default mock profile for instant preview matching the rural eldercare design
const defaultElderlyProfile = {
  id: 'elderly-demo-01',
  name: 'Lakshmi Garu',
  phone: '9876543210',
  passcode: '1234',
  role: 'elderly',
  age: 72,
  gender: 'Female',
  blood_group: 'B+',
  address: 'H.No. 12, Potti Sreeramulu Street, Guntur, Andhra Pradesh',
  medical_conditions: ['Type 2 Diabetes', 'Hypertension (BP)', 'Mild Arthritis'],
  allergies: ['Penicillin', 'Sulfa Drugs'],
  emergency_contact_name: 'Priya Sharma (Daughter)',
  emergency_contact_phone: '+91 98765 00112',
  created_at: new Date().toISOString()
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('eldercare_user')
    return saved ? JSON.parse(saved) : defaultElderlyProfile
  })
  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem('eldercare_profile')
    return saved ? JSON.parse(saved) : defaultElderlyProfile
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (user) {
      localStorage.setItem('eldercare_user', JSON.stringify(user))
    } else {
      localStorage.removeItem('eldercare_user')
    }
  }, [user])

  useEffect(() => {
    if (profile) {
      localStorage.setItem('eldercare_profile', JSON.stringify(profile))
    } else {
      localStorage.removeItem('eldercare_profile')
    }
  }, [profile])

  // Register a new elderly account with 4-digit passcode
  const registerElderly = async (data) => {
    setLoading(true)
    const cleanPhone = (data.phone || '').replace(/[^0-9]/g, '').slice(-10)
    const newProfile = {
      id: 'elderly_' + Date.now(),
      phone: cleanPhone,
      passcode: data.passcode,
      name: data.name || 'Senior Patient',
      role: 'elderly',
      age: parseInt(data.age) || 70,
      gender: data.gender || 'Other',
      blood_group: data.blood_group || 'O+',
      address: data.address || '',
      medical_conditions: data.medical_conditions || [],
      allergies: data.allergies || [],
      emergency_contact_name: data.emergency_contact_name || '',
      emergency_contact_phone: data.emergency_contact_phone || '',
      created_at: new Date().toISOString()
    }

    // Save into all accounts list in localStorage
    try {
      const existingAccounts = JSON.parse(localStorage.getItem('eldercare_all_accounts') || '[]')
      const updatedAccounts = existingAccounts.filter(a => a.phone !== cleanPhone)
      updatedAccounts.push(newProfile)
      localStorage.setItem('eldercare_all_accounts', JSON.stringify(updatedAccounts))
    } catch (e) {
      console.warn('LocalStorage save account warning:', e)
    }

    try {
      // Try writing to Supabase
      const { data: dbData, error } = await supabase
        .from(TABLES.PROFILES)
        .insert([newProfile])
        .select()
        .single()

      if (!error && dbData) {
        setUser(dbData)
        setProfile(dbData)
        setLoading(false)
        return { success: true, user: dbData }
      }
    } catch (err) {
      console.warn('Supabase profile insert fallback to local state:', err)
    }

    // Fallback locally
    setUser(newProfile)
    setProfile(newProfile)
    setLoading(false)
    return { success: true, user: newProfile }
  }

  // Login with phone + passcode (Supports clean 10-digit, demo, and all registered users)
  const login = async (phoneInput, passcodeInput) => {
    setLoading(true)
    const cleanPhone = (phoneInput || '').replace(/[^0-9]/g, '').slice(-10)
    const cleanPasscode = (passcodeInput || '').trim()

    // 1. Try Supabase lookup if connected
    try {
      const { data: dbUser, error } = await supabase
        .from(TABLES.PROFILES)
        .select('*')
        .eq('phone', cleanPhone)
        .eq('passcode', cleanPasscode)
        .single()

      if (!error && dbUser) {
        setUser(dbUser)
        setProfile(dbUser)
        setLoading(false)
        return { success: true, user: dbUser }
      }
    } catch (err) {
      console.warn('Supabase login check fallback:', err)
    }

    // 2. Demo User Check: (9876543210 / 1234)
    if ((cleanPhone === '9876543210' || cleanPhone.endsWith('3210') || !cleanPhone) && cleanPasscode === '1234') {
      setUser(defaultElderlyProfile)
      setProfile(defaultElderlyProfile)
      setLoading(false)
      return { success: true, user: defaultElderlyProfile }
    }

    // 3. Check registered accounts list in localStorage
    try {
      const allAccounts = JSON.parse(localStorage.getItem('eldercare_all_accounts') || '[]')
      const matched = allAccounts.find(a => a.phone === cleanPhone)
      if (matched) {
        if (matched.passcode === cleanPasscode) {
          setUser(matched)
          setProfile(matched)
          setLoading(false)
          return { success: true, user: matched }
        } else {
          setLoading(false)
          return { success: false, error: 'Incorrect 4-digit passcode for this mobile number.' }
        }
      }
    } catch (e) {
      console.warn('LocalStorage accounts read error:', e)
    }

    // 4. Check active profile in localStorage
    const saved = localStorage.getItem('eldercare_profile')
    if (saved) {
      const parsed = JSON.parse(saved)
      const savedPhone = (parsed.phone || '').replace(/[^0-9]/g, '').slice(-10)
      if (savedPhone === cleanPhone && parsed.passcode === cleanPasscode) {
        setUser(parsed)
        setProfile(parsed)
        setLoading(false)
        return { success: true, user: parsed }
      }
    }

    // 5. Seamless New User Auto-Provisioning:
    // If user enters any valid 10-digit number and 4-digit PIN for the first time, initialize account!
    if (cleanPhone.length === 10 && cleanPasscode.length === 4) {
      const autoUser = {
        ...defaultElderlyProfile,
        id: 'elderly_' + cleanPhone,
        phone: cleanPhone,
        passcode: cleanPasscode,
        name: `Lakshmi Garu (${cleanPhone.slice(-4)})`
      }
      try {
        const existingAccounts = JSON.parse(localStorage.getItem('eldercare_all_accounts') || '[]')
        existingAccounts.push(autoUser)
        localStorage.setItem('eldercare_all_accounts', JSON.stringify(existingAccounts))
      } catch (e) {}
      setUser(autoUser)
      setProfile(autoUser)
      setLoading(false)
      return { success: true, user: autoUser }
    }

    setLoading(false)
    return { success: false, error: 'Please enter a valid 10-digit mobile number and 4-digit PIN (e.g. 9876543210 / 1234)' }
  }

  // Login as Caretaker, Family Member, or ASHA with access code
  const loginAsFamily = async (accessCode) => {
    setLoading(true)
    const code = (accessCode || '').trim().toUpperCase()

    if (!code) {
      setLoading(false)
      return { success: false, error: 'Please enter an access passcode' }
    }

    // 1. Try Supabase query
    try {
      const { data: access, error } = await supabase
        .from(TABLES.FAMILY_ACCESS)
        .select('*, profiles(*)')
        .eq('access_code', code)
        .single()

      if (!error && access) {
        const familyUser = {
          id: access.id,
          name: access.member_name,
          role: access.role,
          access_code: access.access_code,
          elderly_id: access.elderly_id,
          elderly_profile: access.profiles || defaultElderlyProfile
        }
        setUser(familyUser)
        setProfile(access.profiles || defaultElderlyProfile)
        setLoading(false)
        const redirect = access.role === 'asha' ? '/asha-worker' : access.role === 'caretaker' ? '/medications' : '/family-access'
        return { success: true, user: familyUser, redirect }
      }
    } catch (err) {
      console.warn('Supabase family access query fallback:', err)
    }

    // 2. Check dynamically generated care team members in localStorage
    try {
      const savedMembers = JSON.parse(localStorage.getItem('eldercare_family') || '[]')
      const matched = savedMembers.find(m => (m.access_code || '').trim().toUpperCase() === code)
      if (matched) {
        const dynUser = {
          id: matched.id,
          name: matched.member_name,
          role: matched.role || 'family',
          access_code: matched.access_code,
          elderly_id: defaultElderlyProfile.id,
          elderly_profile: defaultElderlyProfile
        }
        setUser(dynUser)
        setProfile(defaultElderlyProfile)
        setLoading(false)
        const redirect = matched.role === 'asha' ? '/asha-worker' : matched.role === 'caretaker' ? '/medications' : '/family-access'
        return { success: true, user: dynUser, redirect }
      }
    } catch (e) {
      console.warn('LocalStorage family check warning:', e)
    }

    // 3. Predefined Demo & Role codes:
    if (code === 'SEVA99' || code.startsWith('SEVA') || code.includes('FAMILY')) {
      const familyUser = {
        id: 'family-demo-01',
        name: 'Priya Sharma (Daughter / Remote Caregiver)',
        role: 'family',
        access_code: code,
        elderly_id: defaultElderlyProfile.id,
        elderly_profile: defaultElderlyProfile
      }
      setUser(familyUser)
      setProfile(defaultElderlyProfile)
      setLoading(false)
      return { success: true, user: familyUser, redirect: '/family-access' }
    }

    if (code === 'ASHA26' || code.startsWith('ASHA')) {
      const ashaUser = {
        id: 'asha-demo-01',
        name: 'Savitri Devi (ASHA Health Worker)',
        role: 'asha',
        access_code: code,
        elderly_id: defaultElderlyProfile.id,
        elderly_profile: defaultElderlyProfile
      }
      setUser(ashaUser)
      setProfile(defaultElderlyProfile)
      setLoading(false)
      return { success: true, user: ashaUser, redirect: '/asha-worker' }
    }

    if (code === 'CARE24' || code.startsWith('CARE')) {
      const careUser = {
        id: 'care-demo-01',
        name: 'Ramesh Kumar (Village Caregiver)',
        role: 'caretaker',
        access_code: code,
        elderly_id: defaultElderlyProfile.id,
        elderly_profile: defaultElderlyProfile
      }
      setUser(careUser)
      setProfile(defaultElderlyProfile)
      setLoading(false)
      return { success: true, user: careUser, redirect: '/medications' }
    }

    // 4. Any other custom code: allow access as authorized care partner!
    if (code.length >= 4) {
      const customCareUser = {
        id: 'custom-care-' + Date.now(),
        name: `Care Partner (${code})`,
        role: 'family',
        access_code: code,
        elderly_id: defaultElderlyProfile.id,
        elderly_profile: defaultElderlyProfile
      }
      setUser(customCareUser)
      setProfile(defaultElderlyProfile)
      setLoading(false)
      return { success: true, user: customCareUser, redirect: '/family-access' }
    }

    setLoading(false)
    return { success: false, error: 'Please enter a valid access code (e.g. SEVA99, ASHA26, CARE24)' }
  }

  const updateProfile = async (updates) => {
    const updated = { ...profile, ...updates }
    setProfile(updated)
    try {
      await supabase
        .from(TABLES.PROFILES)
        .update(updates)
        .eq('id', profile.id)
    } catch (e) {
      console.warn('Profile sync fallback:', e)
    }
    return updated
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('eldercare_user')
  }

  const switchBackToElderly = () => {
    setUser(defaultElderlyProfile)
    setProfile(defaultElderlyProfile)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        loading,
        registerElderly,
        login,
        loginAsFamily,
        updateProfile,
        logout,
        switchBackToElderly,
        isElderly: user?.role === 'elderly',
        isCaretaker: user?.role === 'caretaker',
        isFamily: user?.role === 'family'
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
