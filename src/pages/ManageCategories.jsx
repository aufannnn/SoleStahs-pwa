import { useState } from 'react'
import { useCategories } from '../hooks/useCategories'
import { categoryService } from '../services/categoryService'
import AdminTabs from '../components/AdminTabs'
import { Loading, ErrorView, Empty } from '../components/StatusView'

export default function ManageCategories({ onSwitch }) {
  const { data, loading, error, refetch } = useCategories()
  const [newName, setNewName] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [editName, setEditName] = useState('')
  const [busy, setBusy] = useState(false)
  const [formError, setFormError] = useState(null)

  // jalankan aksi (tambah/edit/hapus), lalu muat ulang list
  const run = async (action) => {
    setBusy(true)
    setFormError(null)
    try {
      await action()
      await refetch()
      return true
    } catch (err) {
      setFormError(err.message)
      return false
    } finally {
      setBusy(false)
    }
  }

  const handleAdd = async (e) => {
    e.preventDefault()
    if (!newName.trim()) return
    const ok = await run(() => categoryService.create(newName.trim()))
    if (ok) setNewName('')
  }

  const startEdit = (category) => {
    setEditingId(category.id)
    setEditName(category.name)
    setFormError(null)
  }

  const handleSave = async (id) => {
    if (!editName.trim()) return
    const ok = await run(() => categoryService.update(id, editName.trim()))
    if (ok) setEditingId(null)
  }

  const handleDelete = async (category) => {
    const count = category.sneakers?.[0]?.count ?? 0
    const warning = count > 0 ? `\n${count} sneakers akan jadi tanpa kategori.` : ''
    if (!window.confirm(`Hapus kategori "${category.name}"?${warning}`)) return
    await run(() => categoryService.remove(category.id))
  }

  return (
    <div className="page">
      <h2 className="page-title">Kelola Kategori</h2>
      <AdminTabs active="manageCategories" onChange={onSwitch} />

      <form className="inline-form" onSubmit={handleAdd}>
        <input
          placeholder="Nama kategori baru"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
        <button className="btn" type="submit" disabled={busy || !newName.trim()}>
          Tambah
        </button>
      </form>

      {formError && <p className="form-error">{formError}</p>}

      <div className="section">
        {loading && <Loading />}
        {error && <ErrorView message={error} onRetry={refetch} />}
        {!loading && !error && data?.length === 0 && <Empty text="Belum ada kategori." />}

        <ul className="list">
          {data?.map((c) => (
            <li key={c.id} className="manage-item">
              {editingId === c.id ? (
                // mode edit: nama jadi input
                <>
                  <input
                    className="inline-input"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    autoFocus
                  />
                  <div className="manage-actions">
                    <button className="btn-small" onClick={() => handleSave(c.id)} disabled={busy}>
                      Simpan
                    </button>
                    <button className="btn-small" onClick={() => setEditingId(null)}>
                      Batal
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="list-text">
                    <h3>{c.name}</h3>
                    <p>{c.sneakers?.[0]?.count ?? 0} sneakers</p>
                  </div>
                  <div className="manage-actions">
                    <button className="btn-small" onClick={() => startEdit(c)}>
                      Edit
                    </button>
                    <button
                      className="btn-small btn-danger"
                      onClick={() => handleDelete(c)}
                      disabled={busy}
                    >
                      Hapus
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}