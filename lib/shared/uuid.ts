// Cryptographically secure UUID v4 generator
export function uuidv4(): string {
  // Prefer Node.js crypto.randomUUID if available
  if (typeof globalThis.crypto?.randomUUID === 'function') {
    return globalThis.crypto.randomUUID();
  }
  // Fallback: Use crypto.getRandomValues if available (browser/older Node)
  if (typeof globalThis.crypto?.getRandomValues === 'function') {
    const bytes = new Uint8Array(16);
    globalThis.crypto.getRandomValues(bytes);
    // Per RFC 4122 section 4.4
    bytes[6] = (bytes[6] & 0x0f) | 0x40; // Version 4
    bytes[8] = (bytes[8] & 0x3f) | 0x80; // Variant 10
    const hex = Array.from(bytes, b => b.toString(16).padStart(2, '0')).join('');
    return (
      hex.slice(0, 8) + '-' +
      hex.slice(8, 12) + '-' +
      hex.slice(12, 16) + '-' +
      hex.slice(16, 20) + '-' +
      hex.slice(20)
    );
  }
  // Last resort: throw error (should not happen in modern environments)
  throw new Error('No secure random UUID implementation available');
}
