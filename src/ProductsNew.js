import React, { Component } from 'react'

class Products extends Component {
  constructor (props) {
    super(props)

    this.handleNewProduct = this.handleNewProduct.bind(this)
  }
  handleNewProduct () {
    const products = {
      category: this.refs.category.value,
      name: this.refs.product.value
    }
    this.props.addProduct(products)
  }
  render () {
    const { categories } = this.props
    return (
      <div>
        <div className='form-group'>
          <label htmlFor='category'>Category</label>
          <select className='form-control' id='category' ref='category'>
            <option />
            {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>
        <div className='form-group'>
          <label htmlFor='name'>Name</label>
          <input className='form-control' id='name' ref='product' />
        </div>
        <div className='form-group'>
          <button className='btn btn-secondary btn-lg float-right' onClick={this.handleNewProduct}>
            <i className='material-icons'>save</i> Save
          </button>
        </div>
      </div>
    )
  }
}

export default Products
