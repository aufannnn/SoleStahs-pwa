import { useEffect, useState } from 'react'
import { brandService } from '../services/brandService'
import { Loading } from '../components/StatusView'

const EMPTY_FORM = {
  name: '',
  country: '',
  founded_year: '',
  logo_url: '',
  description: '',
}

// id kosong = mode tambah, id ada = mode edit
export default function BrandForm({ id, onDone }) {
  const isEdit = Boolean(id)
  const [form, setForm] = useState(EMPTY_FORM)
  const [loadingData, setLoadingData] = useState(isEdit)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)

  // kalau mode edit, isi form pakai data lama
  useEffect(() => {
    if (!isEdit) return
    brandService
      .getById(id)
      .then((data) => {
        setForm({
          name: data.name || '',
          country: data.country || '',
          founded_year: data.founded_year ?? '',
          logo_url: data.logo_url || '',
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
      setError('Nama brand wajib diisi')
      return
    }

    // string kosong dikirim sebagai null, tahun diubah ke angka
    const payload = {
      ...form,
      name: form.name.trim(),
      founded_year: form.founded_year === '' ? null : Number(form.founded_year),
    }
    for (const key in payload) {
      if (payload[key] === '') payload[key] = null
    }

    setSaving(true)
    setError(null)
    try {
      if (isEdit) {
        await brandService.update(id, payload)
      } else {
        await brandService.create(payload)
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
      <h2 className="page-title">{isEdit ? 'Edit Brand' : 'Tambah Brand'}</h2>

      <form className="form" onSubmit={handleSubmit}>
        <label>
          Nama *
          <input name="name" value={form.name} onChange={handleChange} required />
        </label>

        <label>
          Negara
          <input name="country" value={form.country} onChange={handleChange} />
        </label>

        <label>
          Tahun Berdiri
          <input
            name="founded_year"
            type="number"
            min="1800"
            max="2100"
            value={form.founded_year}
            onChange={handleChange}
          />
        </label>

        <label>
          URL Logo
          <input name="logo_url" type="url" value={form.logo_url} onChange={handleChange} />
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