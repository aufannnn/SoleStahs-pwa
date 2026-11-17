import { useSneakers } from '../hooks/useSneakers'
import SneakerCard from '../components/SneakerCard'
import { Loading, ErrorView, Empty } from '../components/StatusView'
import { getFavorites } from '../utils/favorites'

export default function Favorites({ onOpenSneaker }) {
  const { data, loading, error, refetch } = useSneakers()
  const favIds = getFavorites()
  const favorites = (data || []).filter((s) => favIds.includes(s.id))

  return (
    <div className="page">
      <h2 className="page-title">Favorit</h2>

      {loading && <Loading />}
      {error && <ErrorView message={error} onRetry={refetch} />}
      {!loading && !error && favorites.length === 0 && (
        <Empty text="Belum ada favorit. Tap ♡ di halaman detail sneakers." />
      )}

      <div className="grid">
        {favorites.map((s) => (
          <SneakerCard key={s.id} sneaker={s} onClick={onOpenSneaker} />
        ))}
      </div>
    </div>
  )
}