import React, { Component } from "react";

import ProductList from "./ProductList";

class Products extends Component {
  state = {
    state: this.props,
  };

  render(){
    return (
      <>
          <ProductList
            productId = {this.props.productId}
            title = {this.props.title}
            about = {this.props.about}
            link = {this.props.link}
            categories = {this.props.categories}
            productType = {this.props.productType}
            discount = {this.props.discount}
            country = {this.props.country}
          />
      </>
    )
  }

}

export default Products;
