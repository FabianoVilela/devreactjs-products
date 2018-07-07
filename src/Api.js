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
  addProduct: (product) => api.post('products/', product),
  loadProducts: (id) => api.get('/products?category=' + id),
  getProduct: (id) => api.get('/products/' + id),
  deleteProduct: (id) => api.delete('products/' + id),
  editProduct: (product) => api.put('products/' + product.id, product)
}

export default apis
