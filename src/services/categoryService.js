import { apiClient } from '../config/api'

export const categoryService = {
  async getAll() {
    const res = await apiClient.get('/categories')
    return res.data
  },

  async create(name) {
    const res = await apiClient.post('/categories', { name })
    return res.data
  },

  async update(id, name) {
    const res = await apiClient.put(`/categories/${id}`, { name })
    return res.data
  },

  async remove(id) {
    const res = await apiClient.delete(`/categories/${id}`)
    return res.data
  },
}