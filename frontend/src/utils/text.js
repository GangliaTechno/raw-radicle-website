export const stripHtml = (value) => String(value || '').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()

export const toNumber = (value, fallback = 0) => {
  const parsed = Number.parseFloat(String(value ?? '').replace(/[^\d.]/g, ''))
  return Number.isFinite(parsed) ? parsed : fallback
}
