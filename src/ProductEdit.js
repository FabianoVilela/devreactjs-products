import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

class ProductEdit extends Component {
  constructor (props) {
    super(props)
    this.handleEditProduct = this.handleEditProduct.bind(this)
    this.state = {
      redirect: false
    }
  }
  componentDidMount () {
    let id = this.props.match.params.id
    this.props.getProduct(id)
      .then(res => {
        this.refs.product.value = res.data.name
        this.refs.category.value = res.data.category
      })
  }
  handleEditProduct () {
    const product = {
      id: this.props.match.params.id,
      category: this.refs.category.value,
      name: this.refs.product.value
    }
    this.props.editProduct(product)
      .then((res) => this.setState({redirect: '/products/category/' + product.category}))
  }
  render () {
    const { categories } = this.props
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }
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
          <button className='btn btn-secondary btn-lg float-right' onClick={this.handleEditProduct}>
            <i className='material-icons'>save</i> Save
          </button>
        </div>
      </div>
    )
  }
}

export default ProductEdit
