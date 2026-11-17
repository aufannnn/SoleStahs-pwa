import { useState } from 'react'

// Tampilkan logo brand dari logo_url.
// Kalau logo_url kosong / gambar gagal dimuat, tampilkan huruf depan nama brand.
export default function BrandLogo({ brand, className }) {
  const [failed, setFailed] = useState(false)

  if (brand.logo_url && !failed) {
    return (
      <div className={`${className} has-logo`}>
        <img src={brand.logo_url} alt={brand.name} onError={() => setFailed(true)} />
      </div>
    )
  }

  return <div className={className}>{brand.name.charAt(0)}</div>
}