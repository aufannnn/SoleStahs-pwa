// "Jepang · Sejak 1949" (bagian yang kosong tidak ditampilkan)
export function brandInfo(brand) {
  return [brand.country, brand.founded_year && `Sejak ${brand.founded_year}`]
    .filter(Boolean)
    .join(' · ')
}

// Harga di database pakai USD (harga retail resmi)
export function formatPrice(value) {
  if (value === null || value === undefined) return 'Harga belum tersedia'
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(Number(value))
}

// "2025-05-24" -> "24 Mei 2025"
export function formatDate(value) {
  if (!value) return '-'
  return new Date(value).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}