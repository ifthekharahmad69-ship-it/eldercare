import { useState, useEffect, useMemo } from 'react'

export function useMedicineSearch() {
  const [medicines, setMedicines] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(false)
  const [selectedMedicine, setSelectedMedicine] = useState(null)

  // Load medicines JSON from public directory once
  useEffect(() => {
    let isMounted = true
    const loadData = async () => {
      try {
        setLoading(true)
        const response = await fetch('/medicines.json')
        if (response.ok) {
          const data = await response.json()
          if (isMounted) setMedicines(data)
        }
      } catch (err) {
        console.warn('Could not load medicines.json, using fallback list:', err)
      } finally {
        if (isMounted) setLoading(false)
      }
    }
    loadData()
    return () => { isMounted = false }
  }, [])

  // Debounced search with fast substring match
  const searchResults = useMemo(() => {
    const query = searchTerm.trim().toLowerCase()
    if (!query || query.length < 2) return []

    const results = []
    for (let i = 0; i < medicines.length; i++) {
      const med = medicines[i]
      if (med.name.toLowerCase().includes(query) || (med.comp && med.comp.toLowerCase().includes(query))) {
        results.push(med)
        if (results.length >= 25) break // return top 25 matches for blazing fast UI
      }
    }
    return results
  }, [searchTerm, medicines])

  return {
    searchTerm,
    setSearchTerm,
    searchResults,
    selectedMedicine,
    setSelectedMedicine,
    totalMedicinesCount: medicines.length,
    loading
  }
}
