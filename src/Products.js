import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'

import ProductsHome from './ProductsHome'
import Category from './Category'
import ProductNew from './ProductsNew'
import ProductEdit from './ProductEdit'

class Products extends Component {
  constructor (props) {
    super(props)
    this.state = {
      currentCategory: '',
      categoryId: null
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
      currentCategory: category.id,
      categoryId: category.id
    })
  }
  cancelEdit (category) {
    this.setState({
      currentCategory: ''
    })
  }
  renderCategory (category) {
    return (
      <Link key={category.id} to={`/products/category/${category.id}`}
        onClick={() => this.setState({categoryId: category.id})}
        className={this.state.categoryId === category.id ? 'list-group-item list-group-item-action active' : 'list-group-item list-group-item-action'}>
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
            {category.name}
            <i className='material-icons custom-button delete' onClick={() => this.props.deleteCategory(category.id)}>delete</i>
            <i className='material-icons custom-button edit' onClick={() => this.editCategory(category)}>edit</i>
          </div>
        }
      </Link>
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
    const { match, categories, products } = this.props

    return (
      <div className='row'>
        <div className='col-md-3'>
          <h3>Categories</h3>
          <div className='form-group'>
            <label>Add category</label>
            <input className='form-control' type='text' ref='category' placeholder='New category' onKeyUp={this.handleNewCategory} />
          </div>
          <div className='list-group mt-4'>{categories.map(this.renderCategory)}</div>
        </div>
        <div className='col-md-9'>
          <h1>Products</h1>
          <Route exact path={match.url} component={ProductsHome} />
          <Route path={match.url + '/edit/:id'} render={(props) => {
            return (<ProductEdit
              {...props}
              categories={categories}
              editProduct={this.props.editProduct}
              getProduct={this.props.getProduct}
            />)
          }} />
          <Route exact path={match.url + '/new'} render={(props) => {
            return (<ProductNew
              {...props}
              categories={categories}
              addProduct={this.props.addProduct}
            />)
          }} />
          <Route path={match.url + '/category/:id'}
            render={(props) => {
              return <Category {...props}
                loadProducts={this.props.loadProducts}
                // getProduct={this.props.getProduct}
                deleteProduct={this.props.deleteProduct}
                products={products} />
            }} />
        </div>
      </div>
    )
  }
}

export default Products
