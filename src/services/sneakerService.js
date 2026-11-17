import { apiClient } from '../config/api'

export const sneakerService = {
  async getAll(params = {}) {
    const res = await apiClient.get('/sneakers', { params })
    return res.data
  },

  async getById(id) {
    const res = await apiClient.get(`/sneakers/${id}`)
    return res.data
  },

  async create(payload) {
    const res = await apiClient.post('/sneakers', payload)
    return res.data
  },

  async update(id, payload) {
    const res = await apiClient.put(`/sneakers/${id}`, payload)
    return res.data
  },

  async remove(id) {
    const res = await apiClient.delete(`/sneakers/${id}`)
    return res.data
  },
}