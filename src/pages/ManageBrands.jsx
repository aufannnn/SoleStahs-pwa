import { useState } from 'react'
import { useBrands } from '../hooks/useBrands'
import { brandService } from '../services/brandService'
import AdminTabs from '../components/AdminTabs'
import { Loading, ErrorView, Empty } from '../components/StatusView'

export default function ManageBrands({ onAdd, onEdit, onSwitch }) {
  const { data, loading, error, refetch } = useBrands()
  const [deletingId, setDeletingId] = useState(null)

  const handleDelete = async (brand) => {
    const count = brand.sneakers?.[0]?.count ?? 0
    const warning =
      count > 0 ? `\n${count} sneakers dari brand ini juga akan IKUT TERHAPUS permanen.` : ''
    const ok = window.confirm(`Hapus brand "${brand.name}"?${warning}`)
    if (!ok) return

    setDeletingId(brand.id)
    try {
      await brandService.remove(brand.id)
      await refetch()
    } catch (err) {
      alert(`Gagal menghapus: ${err.message}`)
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <div className="page">
      <h2 className="page-title">Kelola Brand</h2>
      <AdminTabs active="manageBrands" onChange={onSwitch} />

      <button className="btn btn-block" onClick={onAdd}>
        + Tambah Brand
      </button>

      <div className="section">
        {loading && <Loading />}
        {error && <ErrorView message={error} onRetry={refetch} />}
        {!loading && !error && data?.length === 0 && <Empty text="Belum ada brand." />}

        <ul className="list">
          {data?.map((b) => (
            <li key={b.id} className="manage-item">
              <div className="list-text">
                <h3>{b.name}</h3>
                <p>{b.sneakers?.[0]?.count ?? 0} sneakers</p>
              </div>
              <div className="manage-actions">
                <button className="btn-small" onClick={() => onEdit(b.id)}>
                  Edit
                </button>
                <button
                  className="btn-small btn-danger"
                  onClick={() => handleDelete(b)}
                  disabled={deletingId === b.id}
                >
                  {deletingId === b.id ? '...' : 'Hapus'}
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}