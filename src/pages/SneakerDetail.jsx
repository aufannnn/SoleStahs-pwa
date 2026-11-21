import { useState } from 'react'
import { useSneakerDetail } from '../hooks/useSneakers'
import SneakerImage from '../components/SneakerImage'
import { Loading, ErrorView } from '../components/StatusView'
import { formatPrice, formatDate } from '../utils/format'
import { isFavorite, toggleFavorite } from '../utils/favorites'

export default function SneakerDetail({ id, onOpenBrand }) {
  const { data, loading, error, refetch } = useSneakerDetail(id)
  const [fav, setFav] = useState(isFavorite(id))

  if (loading) return <Loading />
  if (error) return <ErrorView message={error} onRetry={refetch} />
  if (!data) return null

  const handleFav = () => {
    toggleFavorite(id)
    setFav(!fav)
  }

  return (
    <div className="detail">
      <div className="detail-img">
        <SneakerImage src={data.image_url} alt={data.name} />
      </div>

      <div className="detail-body">
        {data.brands && (
          <button className="detail-brand" onClick={() => onOpenBrand(data.brands.id)}>
            {data.brands.name}
          </button>
        )}
        <h2 className="detail-name">{data.name}</h2>
        <p className="detail-price">{formatPrice(data.price)}</p>

        <table className="spec">
          <tbody>
            <tr>
              <td>Colorway</td>
              <td>{data.colorway || '-'}</td>
            </tr>
            <tr>
              <td>Kategori</td>
              <td>{data.categories?.name || '-'}</td>
            </tr>
            <tr>
              <td>Ukuran</td>
              <td>
                {data.sizes ? (
                  <div className="sizes">
                    {data.sizes.split(',').map((s) => s.trim()).filter(Boolean).map((s) => (
                      <span key={s} className="size-chip">
                        {s}
                      </span>
                    ))}
                  </div>
                ) : (
                  '-'
                )}
              </td>
            </tr>
            <tr>
              <td>Tanggal Rilis</td>
              <td>{formatDate(data.release_date)}</td>
            </tr>
          </tbody>
        </table>

        <h3 className="detail-sub">Deskripsi</h3>
        <p className="detail-desc">{data.description || 'Belum ada deskripsi.'}</p>

        <button className={`btn btn-block ${fav ? 'btn-outline' : ''}`} onClick={handleFav}>
          {fav ? '♥ Hapus dari Favorit' : '♡ Tambah ke Favorit'}
        </button>
      </div>
    </div>
  )
}