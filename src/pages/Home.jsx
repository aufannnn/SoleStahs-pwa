import { useSneakers } from '../hooks/useSneakers'
import { useBrands } from '../hooks/useBrands'
import SneakerCard from '../components/SneakerCard'
import { Loading, ErrorView } from '../components/StatusView'

export default function Home({ onOpenSneaker, onOpenBrand, onGoTo }) {
  const sneakers = useSneakers()
  const brands = useBrands()

  const newIn = sneakers.data?.slice(0, 4) || []

  return (
    <div className="page">
      <section className="hero">
        <p className="hero-sub">New Season</p>
        <h2 className="hero-title">Find Your Next Pair</h2>
        <p className="hero-text">Katalog sneakers dari berbagai brand favorit, semua di satu tempat.</p>
        <button className="btn btn-light" onClick={() => onGoTo('catalog')}>
          Shop All
        </button>
      </section>

      <section className="section">
        <div className="section-head">
          <h2 className="section-title">New In</h2>
          <button className="link" onClick={() => onGoTo('catalog')}>
            Lihat semua
          </button>
        </div>
        {sneakers.loading && <Loading />}
        {sneakers.error && <ErrorView message={sneakers.error} onRetry={sneakers.refetch} />}
        <div className="grid">
          {newIn.map((s) => (
            <SneakerCard key={s.id} sneaker={s} onClick={onOpenSneaker} />
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <h2 className="section-title">Shop by Brand</h2>
        </div>
        <div className="chips">
          {brands.data?.map((b) => (
            <button key={b.id} className="chip" onClick={() => onOpenBrand(b.id)}>
              {b.name}
            </button>
          ))}
        </div>
      </section>
    </div>
  )
}