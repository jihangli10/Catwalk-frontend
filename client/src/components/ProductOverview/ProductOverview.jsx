import React from 'react';
import QuantityDrop from './QuantityDrop'

class ProductOverview extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentValue: 0
    }
  }

  sendLink () {
    console.log('is clicked');
    //send to the Ratings and Review Module
    return;
  }

  render() {
    return (
      <div> Hello I am testing this <br></br>
      <div>Image placeholder</div><br></br>

        <i class='fa fa-star-o'></i>
        <i class='fa fa-star-o'></i>
        <i class='fa fa-star-o'></i>
        <i class='fa fa-star-o'></i>
        <i class='fa fa-star-o'></i>
        <div className= "someDisplay" onClick={this.sendLink}> Read All {this.state.currentValue} reviews</div>

        <div><h3>Product Category</h3></div>
        <div><h2>Cool Product Name/Title Insert Here</h2></div>

        <div>select size</div>
        <div className = "someDisplay">Select Quantity</div>
        <div>---------------</div>

        <div>Free form Text Product talking about this product that is blank and it doesn't exist unless its willed to existence maybe, maybe not</div>
      </div>
    );
  }
}

export default ProductOverview;