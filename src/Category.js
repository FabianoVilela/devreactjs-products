import React, {
  Component
} from 'react'

class Category extends Component {
  constructor (props) {
    super(props)
    this.loadProducts = this.loadProducts.bind(this)
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
      <li key={product.id}>{product.name}</li>
    )
  }
  render () {
    return (
      <ul>{this.props.products.map(this.renderProducts)}</ul>
    )
  }
}

export default Category
