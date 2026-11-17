import { useMemo, useState } from 'react'
import { useSneakers } from '../hooks/useSneakers'
import SneakerCard from '../components/SneakerCard'
import { Loading, ErrorView, Empty } from '../components/StatusView'

export default function Catalog({ onOpenSneaker }) {
  const { data, loading, error, refetch } = useSneakers()
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [sort, setSort] = useState('newest')

  // ambil daftar kategori unik dari data
  const categories = useMemo(() => {
    const list = (data || []).map((s) => s.categories?.name).filter(Boolean)
    return ['All', ...new Set(list)]
  }, [data])

  // filter + sort dilakukan di sisi client
  const shown = useMemo(() => {
    let list = [...(data || [])]
    if (search) {
      const q = search.toLowerCase()
      list = list.filter(
        (s) => s.name.toLowerCase().includes(q) || s.brands?.name.toLowerCase().includes(q)
      )
    }
    if (category !== 'All') list = list.filter((s) => s.categories?.name === category)
    // sneakers yang harganya kosong ditaruh paling bawah
    const price = (s, empty) => (s.price === null ? empty : Number(s.price))
    if (sort === 'low') list.sort((a, b) => price(a, Infinity) - price(b, Infinity))
    if (sort === 'high') list.sort((a, b) => price(b, -1) - price(a, -1))
    return list
  }, [data, search, category, sort])

  return (
    <div className="page">
      <h2 className="page-title">Shoes</h2>

      <input
        className="search"
        type="search"
        placeholder="Cari sneakers atau brand..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="chips">
        {categories.map((c) => (
          <button
            key={c}
            className={`chip ${category === c ? 'active' : ''}`}
            onClick={() => setCategory(c)}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="toolbar">
        <span>{shown.length} produk</span>
        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="newest">Terbaru</option>
          <option value="low">Harga: Rendah - Tinggi</option>
          <option value="high">Harga: Tinggi - Rendah</option>
        </select>
      </div>

      {loading && <Loading />}
      {error && <ErrorView message={error} onRetry={refetch} />}
      {!loading && !error && shown.length === 0 && <Empty text="Sneakers tidak ditemukan." />}

      <div className="grid">
        {shown.map((s) => (
          <SneakerCard key={s.id} sneaker={s} onClick={onOpenSneaker} />
        ))}
      </div>
    </div>
  )
}