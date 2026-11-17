import { useBrands } from '../hooks/useBrands'
import { Loading, ErrorView, Empty } from '../components/StatusView'
import { brandInfo } from '../utils/format'
import BrandLogo from '../components/BrandLogo'

export default function Brands({ onOpenBrand }) {
  const { data, loading, error, refetch } = useBrands()

  return (
    <div className="page">
      <h2 className="page-title">Brands</h2>

      {loading && <Loading />}
      {error && <ErrorView message={error} onRetry={refetch} />}
      {!loading && !error && data?.length === 0 && <Empty text="Belum ada brand." />}

      <ul className="list">
        {data?.map((b) => (
          <li key={b.id}>
            <button className="list-item" onClick={() => onOpenBrand(b.id)}>
              <BrandLogo brand={b} className="list-avatar" />
              <div className="list-text">
                <h3>{b.name}</h3>
                <p>{brandInfo(b)}</p>
              </div>
              <span className="list-count">{b.sneakers?.[0]?.count ?? 0} item</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}