import { useBrandDetail } from '../hooks/useBrands'
import SneakerCard from '../components/SneakerCard'
import { Loading, ErrorView, Empty } from '../components/StatusView'
import { brandInfo } from '../utils/format'
import BrandLogo from '../components/BrandLogo'

export default function BrandDetail({ id, onOpenSneaker }) {
  const { data, loading, error, refetch } = useBrandDetail(id)

  if (loading) return <Loading />
  if (error) return <ErrorView message={error} onRetry={refetch} />
  if (!data) return null

  return (
    <div className="page">
      <section className="brand-hero">
        <BrandLogo brand={data} className="brand-logo" />
        <h2 className="page-title">{data.name}</h2>
        <p className="muted">{brandInfo(data)}</p>
        <p className="brand-desc">{data.description}</p>
      </section>

      <h3 className="section-title">Koleksi ({data.sneakers.length})</h3>
      {data.sneakers.length === 0 && <Empty text="Belum ada sneakers dari brand ini." />}

      <div className="grid">
        {data.sneakers.map((s) => (
          <SneakerCard key={s.id} sneaker={s} brandName={data.name} onClick={onOpenSneaker} />
        ))}
      </div>
    </div>
  )
}