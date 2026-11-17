import SneakerImage from './SneakerImage'
import { formatPrice } from '../utils/format'

export default function SneakerCard({ sneaker, brandName, onClick }) {
  return (
    <button className="card" onClick={() => onClick(sneaker.id)}>
      <div className="card-img">
        <SneakerImage src={sneaker.image_url} alt={sneaker.name} />
      </div>
      <div className="card-body">
        <p className="card-brand">{brandName || sneaker.brands?.name}</p>
        <h3 className="card-name">{sneaker.name}</h3>
        <p className="card-color">{sneaker.colorway}</p>
        <p className="card-price">{formatPrice(sneaker.price)}</p>
      </div>
    </button>
  )
}