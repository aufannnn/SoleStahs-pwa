import useFetch from './useFetch'
import { brandService } from '../services/brandService'

export function useBrands() {
  return useFetch(() => brandService.getAll(), [])
}

export function useBrandDetail(id) {
  return useFetch(() => brandService.getById(id), [id])
}