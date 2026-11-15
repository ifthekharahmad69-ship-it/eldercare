/**
 * Medicine Data Utilities
 * Loads medicine data from public/medicines.json and provides search functions.
 */

let medicinesCache = null;
let loadingPromise = null;

/**
 * Load medicines data from public/medicines.json
 * Caches the result so subsequent calls are instant.
 */
export async function loadMedicines() {
  if (medicinesCache) return medicinesCache;

  if (loadingPromise) return loadingPromise;

  loadingPromise = fetch('/medicines.json')
    .then((res) => {
      if (!res.ok) throw new Error(`Failed to load medicines: ${res.status}`);
      return res.json();
    })
    .then((data) => {
      medicinesCache = data;
      loadingPromise = null;
      return data;
    })
    .catch((err) => {
      loadingPromise = null;
      console.error('Error loading medicines:', err);
      return [];
    });

  return loadingPromise;
}

/**
 * Search medicines by name with efficient string matching.
 * Returns top `limit` results matching the query.
 */
export function searchMedicines(medicines, query, limit = 20) {
  if (!query || !medicines || medicines.length === 0) return [];

  const normalizedQuery = query.toLowerCase().trim();
  if (normalizedQuery.length < 2) return [];

  const startsWithResults = [];
  const containsResults = [];

  for (let i = 0; i < medicines.length; i++) {
    const med = medicines[i];
    const name = med.name.toLowerCase();

    if (name.startsWith(normalizedQuery)) {
      startsWithResults.push(med);
      if (startsWithResults.length >= limit) break;
    } else if (name.includes(normalizedQuery)) {
      containsResults.push(med);
    }
  }

  // Prioritize startsWith matches, then contains matches
  const combined = [...startsWithResults, ...containsResults];
  return combined.slice(0, limit);
}

/**
 * Get medicine details by exact name (case-insensitive).
 */
export function getMedicineByName(medicines, name) {
  if (!name || !medicines) return null;

  const normalizedName = name.toLowerCase().trim();
  return medicines.find((med) => med.name.toLowerCase() === normalizedName) || null;
}

/**
 * Get medicine details by ID.
 */
export function getMedicineById(medicines, id) {
  if (!id || !medicines) return null;
  return medicines.find((med) => med.id === id) || null;
}
