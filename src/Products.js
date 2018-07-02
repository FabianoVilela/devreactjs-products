import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'

import ProductsHome from './ProductsHome'
import Category from './Category'

class Products extends Component {
  constructor (props) {
    super(props)
    this.handlerNewCategory = this.handlerNewCategory.bind(this)
    this.renderCategory = this.renderCategory.bind(this)
  }
  componentDidMount () {
    this.props.loadCategories()
  }
  renderCategory (category) {
    return (
      <li key={category.id} className='list-group-item'>
        <Link to={`/products/category/${category.id}`}>{category.name}</Link>
        <i className='material-icons float-right delete-button' onClick={() => this.props.deleteCategory(category.id)}>delete</i>
      </li>
    )
  }
  handlerNewCategory (key) {
    if (key.keyCode === 13) {
      const name = this.refs.category.value
      this.props.addCategory(name)
      this.refs.category.value = ''
    }
  }
  render () {
    const { match, categories } = this.props
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
