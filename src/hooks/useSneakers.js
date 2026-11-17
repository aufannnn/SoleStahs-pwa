import useFetch from './useFetch'
import { sneakerService } from '../services/sneakerService'

export function useSneakers() {
  return useFetch(() => sneakerService.getAll(), [])
}

export function useSneakerDetail(id) {
  return useFetch(() => sneakerService.getById(id), [id])
}