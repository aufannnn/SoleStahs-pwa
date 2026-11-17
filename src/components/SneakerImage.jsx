import { useState } from 'react'

// Tampilkan gambar, kalau kosong / gagal load tampilkan placeholder
export default function SneakerImage({ src, alt }) {
  const [failed, setFailed] = useState(false)

  if (!src || failed) {
    return (
      <div className="img-placeholder">
        <span>{alt?.charAt(0) || 'S'}</span>
      </div>
    )
  }

  return <img src={src} alt={alt} loading="lazy" onError={() => setFailed(true)} />
}