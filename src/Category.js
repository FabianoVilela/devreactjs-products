import React, {
  Component
} from 'react'
import { Link } from 'react-router-dom'

class Category extends Component {
  constructor (props) {
    super(props)
    this.loadProducts = this.loadProducts.bind(this)
    this.renderProducts = this.renderProducts.bind(this)
    this.state = {
      products: [],
      category: null,
      id: null
    }
  }
  loadProducts (id) {
    this.props.loadProducts(id)
  }
  componentDidMount () {
    let id = this.props.match.params.id
    this.setState({ id: id })
    this.loadProducts(id)
  }
  componentWillReceiveProps (newProps) {
    let id = newProps.match.params.id
    if (id !== this.state.id) {
      this.loadProducts(id)
      this.setState({ id: id })
    }
  }
  renderProducts (product) {
    return (
      <li key={product.id}>
        {product.name}
        <i className='material-icons custom-button delete' onClick={() =>
          this.props.deleteProduct(product.id)
            .then(res => this.loadProducts(this.state.id))
        }>delete
        </i>
        <Link to={'/products/edit/' + product.id}>
          <i className='material-icons custom-button edit'>edit</i>
        </Link>
      </li>
    )
  }
  render () {
    return (
      <ul>{this.props.products.map(this.renderProducts)}</ul>
    )
  }
}

export default Category
