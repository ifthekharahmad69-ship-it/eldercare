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
    const newProfile = {
      id: 'elderly_' + Date.now(),
      phone: data.phone,
      passcode: data.passcode,
      name: data.name,
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

  // Login with phone + passcode
  const login = async (phone, passcode) => {
    setLoading(true)
    try {
      const { data: dbUser, error } = await supabase
        .from(TABLES.PROFILES)
        .select('*')
        .eq('phone', phone)
        .eq('passcode', passcode)
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

    // Check if demo user
    if (phone === '9876543210' && passcode === '1234') {
      setUser(defaultElderlyProfile)
      setProfile(defaultElderlyProfile)
      setLoading(false)
      return { success: true, user: defaultElderlyProfile }
    }

    // Check saved in local storage
    const saved = localStorage.getItem('eldercare_profile')
    if (saved) {
      const parsed = JSON.parse(saved)
      if (parsed.phone === phone && parsed.passcode === passcode) {
        setUser(parsed)
        setProfile(parsed)
        setLoading(false)
        return { success: true, user: parsed }
      }
    }

    setLoading(false)
    return { success: false, error: 'Invalid phone number or 4-digit passcode' }
  }

  // Login as Caretaker or Family Member with access code
  const loginAsFamily = async (accessCode) => {
    setLoading(true)
    try {
      const { data: access, error } = await supabase
        .from(TABLES.FAMILY_ACCESS)
        .select('*, profiles(*)')
        .eq('access_code', accessCode.trim().toUpperCase())
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
        return { success: true, user: familyUser }
      }
    } catch (err) {
      console.warn('Supabase family access query fallback:', err)
    }

    // Demo family & role codes check
    const code = accessCode.trim().toUpperCase()
    if (code === 'SEVA99') {
      const familyUser = {
        id: 'family-demo-01',
        name: 'Priya Sharma (Daughter / Remote Caregiver)',
        role: 'family',
        access_code: 'SEVA99',
        elderly_id: defaultElderlyProfile.id,
        elderly_profile: defaultElderlyProfile
      }
      setUser(familyUser)
      setProfile(defaultElderlyProfile)
      setLoading(false)
      return { success: true, user: familyUser, redirect: '/family-access' }
    }

    if (code === 'ASHA26') {
      const ashaUser = {
        id: 'asha-demo-01',
        name: 'Savitri Devi (ASHA Health Worker)',
        role: 'asha',
        access_code: 'ASHA26',
        elderly_id: defaultElderlyProfile.id,
        elderly_profile: defaultElderlyProfile
      }
      setUser(ashaUser)
      setProfile(defaultElderlyProfile)
      setLoading(false)
      return { success: true, user: ashaUser, redirect: '/asha-worker' }
    }

    if (code === 'CARE24') {
      const careUser = {
        id: 'care-demo-01',
        name: 'Ramesh Kumar (Village Caregiver)',
        role: 'caretaker',
        access_code: 'CARE24',
        elderly_id: defaultElderlyProfile.id,
        elderly_profile: defaultElderlyProfile
      }
      setUser(careUser)
      setProfile(defaultElderlyProfile)
      setLoading(false)
      return { success: true, user: careUser, redirect: '/medications' }
    }

    setLoading(false)
    return { success: false, error: 'Invalid access code. (Try: SEVA99, ASHA26, or CARE24)' }
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
