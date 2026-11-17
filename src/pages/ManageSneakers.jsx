import { useState } from 'react'
import { useSneakers } from '../hooks/useSneakers'
import { sneakerService } from '../services/sneakerService'
import AdminTabs from '../components/AdminTabs'
import { Loading, ErrorView, Empty } from '../components/StatusView'
import { formatPrice } from '../utils/format'

export default function ManageSneakers({ onAdd, onEdit, onSwitch }) {
  const { data, loading, error, refetch } = useSneakers()
  const [deletingId, setDeletingId] = useState(null)

  const handleDelete = async (sneaker) => {
    const ok = window.confirm(`Hapus "${sneaker.name}"?`)
    if (!ok) return

    setDeletingId(sneaker.id)
    try {
      await sneakerService.remove(sneaker.id)
      await refetch()
    } catch (err) {
      alert(`Gagal menghapus: ${err.message}`)
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <div className="page">
      <h2 className="page-title">Kelola Sneakers</h2>
      <AdminTabs active="manage" onChange={onSwitch} />

      <button className="btn btn-block" onClick={onAdd}>
        + Tambah Sneaker
      </button>

      <div className="section">
        {loading && <Loading />}
        {error && <ErrorView message={error} onRetry={refetch} />}
        {!loading && !error && data?.length === 0 && <Empty text="Belum ada sneakers." />}

        <ul className="list">
          {data?.map((s) => (
            <li key={s.id} className="manage-item">
              <div className="list-text">
                <h3>{s.name}</h3>
                <p>
                  {s.brands?.name || '-'} · {formatPrice(s.price)}
                </p>
              </div>
              <div className="manage-actions">
                <button className="btn-small" onClick={() => onEdit(s.id)}>
                  Edit
                </button>
                <button
                  className="btn-small btn-danger"
                  onClick={() => handleDelete(s)}
                  disabled={deletingId === s.id}
                >
                  {deletingId === s.id ? '...' : 'Hapus'}
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}