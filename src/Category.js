import React, {
  Component
} from 'react'
import axios from 'axios'

class Category extends Component {
  constructor (props) {
    super(props)
    this.loadProducts = this.loadProducts.bind(this)
    this.state = {
      products: []
    }
  }
  loadProducts (id) {
    axios.get(`http://localhost:3001/products?category=${id}`)
      .then(res => {
        this.setState({
          products: res.data
        })
      })
  }
  componentDidMount () {
    let id = this.props.match.params.id
    this.loadProducts(id)
  }
  componentWillReceiveProps (newProps) {
    let id = newProps.match.params.id
    this.loadProducts(id)
  }
  renderProducts (product) {
    return (
      <li key={product.id}>{product.name}</li>
    )
  }
  render () {
    return ( 
      <ul>{this.state.products.map(this.renderProducts)}</ul>
    )
  }
}

export default Category
