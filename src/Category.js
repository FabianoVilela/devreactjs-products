import React, { Component } from 'react'

class Category extends Component {
  render () {
    return <h2>Category {this.props.match.params.id}</h2>
  }
}

export default Category
