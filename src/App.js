import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

import Home from './Home'
import Products from './Products'
import About from './About'

class App extends Component {
  constructor (props) {
    super(props)
    // Categories
    this.loadCategories = this.loadCategories.bind(this)
    this.deleteCategory = this.deleteCategory.bind(this)
    this.addCategory = this.addCategory.bind(this)
    this.editCategory = this.editCategory.bind(this)
    // Products
    this.addProduct = this.addProduct.bind(this)
    this.state = {
      categories: []
    }
  }
  loadCategories () {
    this.props.api.loadCategories()
      .then(res => {
        this.setState({
          categories: res.data
        })
      })
  }
  addCategory (name) {
    this.props.api.addCategory(name)
      .then(res => {
        this.loadCategories()
      })
  }
  editCategory (name) {
    this.props.api.editCategory(name)
      .then(res => {
        this.loadCategories()
      })
  }
  deleteCategory (id) {
    this.props.api.deleteCategory(id)
      .then(res => {
        this.loadCategories()
      })
  }
  addProduct (product) {
    this.props.api.addProduct(product)
  }
  componentDidMount () {
    this.loadCategories()
  }
  render () {
    return (
      <Router>
        <div>
          <nav className='navbar navbar-expand-lg navbar-dark bg-dark mb-5'>
            <a href='/' className='navbar-brand'>Productis</a>
            <button className='navbar-toggler' type='button' data-toggle='collapse' data-target='#navabarMenu' aria-controls='navabarMenu' aria-expanded='false' aria-label='Toggle navigation'>
              <span className='navbar-toggler-icon' />
            </button>
            <div className='collapse navbar-collapse' id='navabarMenu'>
              <ul className='navbar-nav'>
                <li className='nav-item'>
                  <Link className='nav-link' to='/'>Home</Link>
                </li>
                <li className='nav-item dropdown'>
                  <a className='nav-link dropdown-toggle' href='' id='navbarDropdown' role='button' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>
                    Products
                  </a>
                  <div className='dropdown-menu' aria-labelledby='navbarDropdown'>
                    <Link className='dropdown-item' to='/products'>List</Link>
                    <Link className='dropdown-item' to='/products/new'>New</Link>
                  </div>
                </li>
                <li className='nav-item'>
                  <Link className='nav-link' to='/about'>About</Link>
                </li>
              </ul>
            </div>
          </nav>
          <div className='container-fluid'>
            <Route exact path='/' component={Home} />
            <Route path='/products' render={(props) => {
              return (<Products
                {...props}
                loadCategories={this.loadCategories}
                addCategory={this.addCategory}
                editCategory={this.editCategory}
                categories={this.state.categories}
                deleteCategory={this.deleteCategory}
                addProduct={this.addProduct}
              />)
            }} />
            <Route exact path='/about' component={About} />
          </div>
        </div>
      </Router>
    )
  }
}

export default App
