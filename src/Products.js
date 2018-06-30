import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import axios from 'axios'

import ProductsHome from './ProductsHome'
import Category from './Category'

class Products extends Component {
  constructor (props) {
    super(props)
    this.handlerNewCategory = this.handlerNewCategory.bind(this)
    this.loadCategories = this.loadCategories.bind(this)
    this.state = {
      categories: []
    }
  }
  componentDidMount () {
    this.loadCategories()
  }
  loadCategories () {
    axios
      .get('http://localhost:3001/categories')
      .then(res => {
        this.setState({
          categories: res.data
        })
      })
  }
  renderCategory (category) {
    return (
      <li key={category.id} className='list-group-item'>
        <Link to={`/products/category/${category.id}`}>{category.name}</Link>
      </li>
    )
  }
  setActive () {
    return 'active'
  }
  handlerNewCategory (key) {
    if (key.keyCode === 13) {
      axios
        .post('http://localhost:3001/categories',
          {
            name: this.refs.category.value
          })
        .then(res => {
          this.loadCategories()
          this.refs.category.value = ''
        })
    }
  }
  render () {
    const { match } = this.props
    const { categories } = this.state
    return (
      <div className='row'>
        <div className='col-md-3'>
          <h3>Categories</h3>
          <div className='form-group'>
            <label>Add category</label>
            <input className='form-control' type='text' ref='category' placeholder='New category' onKeyUp={this.handlerNewCategory} />
          </div>
          <ul className='list-group'>{categories.map(this.renderCategory)}</ul>
        </div>
        <div className='col-md-9'>
          <h1>Products</h1>
          <Route exact path={match.url} component={ProductsHome} />
          <Route path={match.url + '/category/:id'} component={Category} />
        </div>
      </div>
    )
  }
}

export default Products
