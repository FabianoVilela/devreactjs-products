import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3001/'
})

const apis = {
  // Categories
  loadCategories: () => api.get('categories'),
  addCategory: (name) => api.post('categories/', {name}),
  deleteCategory: (id) => api.delete('categories/' + id),
  editCategory: (category) => api.put('categories/' + category.id, category),
  // Products
  addProduct: (product) => api.post('products/', product)
}

export default apis
