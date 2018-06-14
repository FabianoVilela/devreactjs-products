import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

import Home from './Home'
import Products from './Products'
import About from './About'

class App extends Component {
  render () {
    return (
      <Router>
        <div>
          <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
            <a href='/' className='navbar-brand'>Productis</a>
            <button className='navbar-toggler' type='button' data-toggle='collapse' data-target='#navabarMenu' aria-controls='navabarMenu' aria-expanded='false' aria-label='Toggle navigation'>
              <span className='navbar-toggler-icon' />
            </button>
            <div className='collapse navbar-collapse' id='navabarMenu'>
              <ul className='navbar-nav'>
                <li className='nav-item'>
                  <Link className='nav-link' to='/'>Home</Link>
                </li>
                <li className='nav-item'>
                  <Link className='nav-link' to='/products'>Products</Link>
                </li>
                <li className='nav-item'>
                  <Link className='nav-link' to='/about'>About</Link>
                </li>
              </ul>
            </div>
          </nav>
          <div className='container'>
            <Route exact path='/' component={Home} />
            <Route path='/products' component={Products} />
            <Route exact path='/about' component={About} />
          </div>
        </div>
      </Router>
    )
  }
}

export default App
