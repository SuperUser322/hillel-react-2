import React, { Component } from "react";

class ProductsList extends Component {
  state = {
    state: this.props,
  };

  render(){
    return (
              <div className="card" id={this.props.productId}>
                <p>Title: {this.props.title}</p>
                {this.props.link !== '' && <img src={this.props.link} alt={this.props.title} />}
                <p>Product Id:{this.props.productId}</p>
                {this.props.about !== '' && <p>About : {this.props.about}</p>}
                <p>Categories: </p>
                {this.props.categories.map(category => (
                  <div key={category} >{category}</div>
                ))}
                <p>Product type: {this.props.productType}</p>
                {this.props.discount !== false && <p>Dicount: true</p>}
                <p>Country: {this.props.country}</p>
              </div>

    )
  }
}

export default ProductsList;
