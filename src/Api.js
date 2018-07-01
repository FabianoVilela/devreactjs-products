import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3001/'
})

const apis = {
  loadCategories: () => api.get('categories'),
  addCategory: (name) => api.post('categories/', {name}),
  deleteCategory: (id) => api.delete('categories/' + id)
}

export default apis
