/**
 * Security & Cryptography Utilities for ElderCare AI
 * Follows OWASP recommendations for client-side sanitization and credential handling.
 */

const SALT = 'eldercare_salt_v1_2026';

/**
 * Hash PIN or passcode using SHA-256 with salt
 * Prevents storing plaintext credentials in local storage or transit
 */
export async function hashPasscode(pin) {
  if (!pin) return '';
  try {
    const encoder = new TextEncoder();
    const data = encoder.encode(pin + SALT);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
  } catch {
    // Fallback simple hash for environments without Web Crypto
    let hash = 0;
    const str = pin + SALT;
    for (let i = 0; i < str.length; i++) {
      hash = (hash << 5) - hash + str.charCodeAt(i);
      hash |= 0;
    }
    return 'h_' + Math.abs(hash);
  }
}

/**
 * Sanitize text input to eliminate XSS injection vectors
 */
export function sanitizeInput(input) {
  if (typeof input !== 'string') return input;
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

/**
 * Rate Limiter for brute-force prevention on 4-digit PIN authentication
 */
const ATTEMPT_LIMIT = 5;
const LOCKOUT_DURATION_MS = 30000; // 30 seconds

export function recordFailedAttempt(phone) {
  const key = `ratelimit_${phone || 'global'}`;
  try {
    const record = JSON.parse(localStorage.getItem(key) || '{"attempts":0,"lockout":0}');
    const now = Date.now();

    if (now < record.lockout) {
      return { isLocked: true, remainingMs: record.lockout - now };
    }

    const attempts = record.attempts + 1;
    let lockout = 0;
    if (attempts >= ATTEMPT_LIMIT) {
      lockout = now + LOCKOUT_DURATION_MS;
    }

    localStorage.setItem(key, JSON.stringify({ attempts, lockout }));
    return { isLocked: attempts >= ATTEMPT_LIMIT, remainingMs: lockout > now ? lockout - now : 0 };
  } catch {
    return { isLocked: false, remainingMs: 0 };
  }
}

export function resetFailedAttempts(phone) {
  const key = `ratelimit_${phone || 'global'}`;
  try {
    localStorage.removeItem(key);
  } catch {}
}

export function isAccountLocked(phone) {
  const key = `ratelimit_${phone || 'global'}`;
  try {
    const record = JSON.parse(localStorage.getItem(key) || '{"attempts":0,"lockout":0}');
    const now = Date.now();
    if (record.lockout && now < record.lockout) {
      return { isLocked: true, remainingSec: Math.ceil((record.lockout - now) / 1000) };
    }
    return { isLocked: false, remainingSec: 0 };
  } catch {
    return { isLocked: false, remainingSec: 0 };
  }
}
