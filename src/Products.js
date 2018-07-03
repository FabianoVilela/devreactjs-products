import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'

import ProductsHome from './ProductsHome'
import Category from './Category'
import ProductNew from './ProductsNew'

class Products extends Component {
  constructor (props) {
    super(props)
    this.state = {
      currentCategory: ''
    }
    this.handleNewCategory = this.handleNewCategory.bind(this)
    this.handleEditCategory = this.handleEditCategory.bind(this)
    this.renderCategory = this.renderCategory.bind(this)
    this.editCategory = this.editCategory.bind(this)
    this.cancelEdit = this.cancelEdit.bind(this)
  }
  componentDidMount () {
    this.props.loadCategories()
  }
  editCategory (category) {
    this.setState({
      currentCategory: category.id
    })
  }
  cancelEdit (category) {
    this.setState({
      currentCategory: ''
    })
  }
  renderCategory (category) {
    return (
      <li key={category.id} className={this.state.currentCategory === category.id ? 'list-group-item active' : 'list-group-item'} >
        { this.state.currentCategory === category.id && 
          <div className='input-group'>
            <input
              type='text'
              className='form-control'
              defaultValue={category.name}
              onKeyUp={this.handleEditCategory}
              ref={'category-' + category.id}
            />
            <div className='input-group-append'>
              <div className='input-group-text'>
                <i className='material-icons custom-button cancel' onClick={() => this.cancelEdit()}>cancel</i>
              </div>
            </div>
          </div>
        }
        { this.state.currentCategory !== category.id && 
          <div>
            <Link to={`/products/category/${category.id}`}>{category.name}</Link>
            <i className='material-icons custom-button delete' onClick={() => this.props.deleteCategory(category.id)}>delete</i>
            <i className='material-icons custom-button edit' onClick={() => this.editCategory(category)}>edit</i>
          </div>
        }
      </li>
    )
  }
  handleNewCategory (key) {
    if (key.keyCode === 13) {
      const name = this.refs.category.value
      this.props.addCategory(name)
      this.refs.category.value = ''
    }
  }
  handleEditCategory (key) {
    if (key.keyCode === 13) {
      this.props.editCategory({
        id: this.state.currentCategory,
        name: this.refs['category-' + this.state.currentCategory].value
      })
      this.setState({currentCategory: ''})
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
            <input className='form-control' type='text' ref='category' placeholder='New category' onKeyUp={this.handleNewCategory} />
          </div>
          <ul className='list-group mt-4'>{categories.map(this.renderCategory)}</ul>
        </div>
        <div className='col-md-9'>
          <h1>Products</h1>
          <Route exact path={match.url} component={ProductsHome} />
          <Route exact path={match.url + '/new'} render={(props) => {
            return (<ProductNew
              {...props}
              categories={categories}
              addProduct={this.props.addProduct}
            />)
          }} />
          <Route path={match.url + '/category/:id'} component={Category} />
        </div>
      </div>
    )
  }
}

export default Products
