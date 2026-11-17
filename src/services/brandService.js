import { apiClient } from '../config/api'

export const brandService = {
  async getAll() {
    const res = await apiClient.get('/brands')
    return res.data
  },

  async getById(id) {
    const res = await apiClient.get(`/brands/${id}`)
    return res.data
  },

  async create(payload) {
    const res = await apiClient.post('/brands', payload)
    return res.data
  },

  async update(id, payload) {
    const res = await apiClient.put(`/brands/${id}`, payload)
    return res.data
  },

  async remove(id) {
    const res = await apiClient.delete(`/brands/${id}`)
    return res.data
  },
}