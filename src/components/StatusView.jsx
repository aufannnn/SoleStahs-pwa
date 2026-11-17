// Komponen kecil buat loading, error, dan data kosong
export function Loading() {
  return (
    <div className="status">
      <div className="spinner" />
      <p>Loading...</p>
    </div>
  )
}

export function ErrorView({ message, onRetry }) {
  return (
    <div className="status">
      <p>Gagal memuat data: {message}</p>
      {onRetry && (
        <button className="btn" onClick={onRetry}>
          Coba Lagi
        </button>
      )}
    </div>
  )
}

export function Empty({ text }) {
  return (
    <div className="status">
      <p>{text}</p>
    </div>
  )
}