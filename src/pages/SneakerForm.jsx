import { useEffect, useState } from 'react'
import { useBrands } from '../hooks/useBrands'
import { useCategories } from '../hooks/useCategories'
import { sneakerService } from '../services/sneakerService'
import { Loading } from '../components/StatusView'

const EMPTY_FORM = {
  name: '',
  brand_id: '',
  colorway: '',
  sizes: '',
  category_id: '',
  price: '',
  release_date: '',
  image_url: '',
  description: '',
}

// id kosong = mode tambah, id ada = mode edit
export default function SneakerForm({ id, onDone }) {
  const isEdit = Boolean(id)
  const brands = useBrands()
  const categories = useCategories()
  const [form, setForm] = useState(EMPTY_FORM)
  const [loadingData, setLoadingData] = useState(isEdit)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)

  // kalau mode edit, isi form pakai data lama
  useEffect(() => {
    if (!isEdit) return
    sneakerService
      .getById(id)
      .then((data) => {
        setForm({
          name: data.name || '',
          brand_id: data.brand_id || '',
          colorway: data.colorway || '',
          sizes: data.sizes || '',
          category_id: data.category_id || '',
          price: data.price ?? '',
          release_date: data.release_date || '',
          image_url: data.image_url || '',
          description: data.description || '',
        })
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoadingData(false))
  }, [id, isEdit])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name.trim()) {
      setError('Nama sneaker wajib diisi')
      return
    }

    // string kosong dikirim sebagai null, harga diubah ke angka
    const payload = {
      ...form,
      name: form.name.trim(),
      price: form.price === '' ? null : Number(form.price),
    }
    for (const key in payload) {
      if (payload[key] === '') payload[key] = null
    }

    setSaving(true)
    setError(null)
    try {
      if (isEdit) {
        await sneakerService.update(id, payload)
      } else {
        await sneakerService.create(payload)
      }
      onDone()
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  if (loadingData) return <Loading />

  return (
    <div className="page">
      <h2 className="page-title">{isEdit ? 'Edit Sneaker' : 'Tambah Sneaker'}</h2>

      <form className="form" onSubmit={handleSubmit}>
        <label>
          Nama *
          <input name="name" value={form.name} onChange={handleChange} required />
        </label>

        <label>
          Brand
          <select name="brand_id" value={form.brand_id} onChange={handleChange}>
            <option value="">- Pilih brand -</option>
            {brands.data?.map((b) => (
              <option key={b.id} value={b.id}>
                {b.name}
              </option>
            ))}
          </select>
        </label>

        <label>
          Colorway
          <input name="colorway" value={form.colorway} onChange={handleChange} />
        </label>

        <label>
          Ukuran Tersedia
          <input
            name="sizes"
            placeholder="Contoh: 39, 40, 41, 42"
            value={form.sizes}
            onChange={handleChange}
          />
        </label>

        <label>
          Kategori
          <select name="category_id" value={form.category_id} onChange={handleChange}>
            <option value="">- Pilih kategori -</option>
            {categories.data?.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </label>

        <label>
          Harga (USD)
          <input
            name="price"
            type="number"
            min="0"
            step="1"
            value={form.price}
            onChange={handleChange}
          />
        </label>

        <label>
          Tanggal Rilis
          <input name="release_date" type="date" value={form.release_date} onChange={handleChange} />
        </label>

        <label>
          URL Gambar
          <input name="image_url" type="url" value={form.image_url} onChange={handleChange} />
        </label>

        <label>
          Deskripsi
          <textarea name="description" rows="4" value={form.description} onChange={handleChange} />
        </label>

        {error && <p className="form-error">{error}</p>}

        <button className="btn btn-block" type="submit" disabled={saving}>
          {saving ? 'Menyimpan...' : 'Simpan'}
        </button>
      </form>
    </div>
  )
}