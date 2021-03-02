import React from 'react';
import QuantityDrop from './QuantityDrop'
import SizeDrop from './SizeDrop'
import StyleList from './StyleList'
import AddCart from './AddCart'
import dummyData from './dummyData.js'

class ProductOverview extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentValue: 0,
      selectedSize: '',
      selectedQuantity: '',
      data: dummyData,
      isDisabled: true,
      selectedStyle: '',
      isError: false,
      inStock: true,
      styleData: [],
      productData: [],
      isLoading: true
    }
  }

  sendLink () {
    console.log('is clicked');
    //send to the Ratings and Review Module
    // var value = this.state;
    // console.log(value);
  }

  componentDidMount() {

  }

  handleSizeChange(query) {

    if(query.target.value === 'Select Size') {
      this.setState({ selectedSize: query.target.value, isDisabled: true, selectedQuantity: '--' })
    } else {
      this.setState({ selectedSize: query.target.value, isDisabled: false, selectedQuantity: '1' })
    }
  }

  handleQuantityChange(query) {

      this.setState({ selectedQuantity: query.target.value })

  }

  handleAddCart() {
    if(selectedSize = 'Select Size') {
      this.setState({ isError: true })
      //create some sort of error message
    } else {
      this.setState({ isError: false })
      //setState to a storage unit that shows the list of the item.
    }
  }

  render() {
    return (
      <div className='gridContainer'>

        <div className='leftSide'>
        Hello I am testing this <br></br>
          Image placeholder</div><br></br>

      <div className='rightSide'>
        <i class='fa fa-star-o'></i>
        <i class='fa fa-star-o'></i>
        <i class='fa fa-star-o'></i>
        <i class='fa fa-star-o'></i>
        <i class='fa fa-star-o'></i>
        <div className= "someDisplay" onClick={this.sendLink}> Read All {this.state.currentValue} reviews </div>

        <div><h3>Product Category</h3></div>
        <div><h2>Cool Product Name/Title Insert Here</h2></div>
        <div><h2>$99999.00</h2></div>
        <div><StyleList /></div>
        <br></br>
        <div className='dropdownContainer'>
            {console.log(this.state.data)}
        <SizeDrop
          selectedSize = {this.state.selectedSize}
          handleSizeChange = {this.handleSizeChange.bind(this)}
        />
        <QuantityDrop
            selectedQuantity = {this.state.selectedQuantity}
            handleQuantityChange = {this.handleQuantityChange.bind(this)}
            isDisabled = {this.state.isDisabled}
        />
        </div>
        <br></br>
        <AddCart
          handleAddCart = {this.handleAddCart.bind(this)}
          inStock = {this.state.inStock}
        />
        { this.state.isError ? <div>Please select size</div> : null}
        <br></br>
        <br></br>
      </div>
        <div className ='bottomSide'>Free form Text Product talking about this product that is blank and it doesn't exist unless its willed to existence maybe, maybe not</div>
    </div>
    );
  }
}

export default ProductOverview;