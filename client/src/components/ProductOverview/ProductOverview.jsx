import React from 'react';
import QuantityDrop from './QuantityDrop'
import SizeDrop from './SizeDrop'
import StyleList from './StyleList'
import AddCart from './AddCart'
import dummyData from './dummyData.js'
import axios from 'axios'

class ProductOverview extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentValue: 0,
      selectedSize: '',
      selectedQuantity: '',
      currentQuantity: [],
      maxLimit: 0,
      data: dummyData,
      isDisabled: true,
      selectedStyle: '',
      isError: false,
      inStock: true,
      styleData: [],
      isLoading: true,
      currentProductStyle: '',
      currentProductName: '',
      currentProductCategory: '',
      currentPrice: '',
      currentDescription: '',
      currentImage:'',
      currentSizeQuantityList: {}
    }
  }

  sendLink () {
    console.log('is clicked');
    //send to the Ratings and Review Module
    // var value = this.state;
    // console.log(value);
  }

  componentDidMount() {
    this.getDataandStyle();
  }

  getDataandStyle() {
    axios.get('/products')
      .then(product => {
        var data = product.data
        return data;
      })
      .then(result => {
        let id = result[0].id;
        let extras = 'styles';
        axios.get('/products', {params: {id, extras}} )
          .then(newStyles => {

            this.setState({
              productData: result,
              currentProductStyle: newStyles.data,
              isLoading: false,
              currentProductName: result[0].name,
              currentProductCategory: result[0].category,
              currentPrice: result[0].default_price,
              currentDescription: result[0].description,
              currentImage: newStyles.data.results[0].photos[0].url,
              currentSizeQuantityList: newStyles.data.results[0].skus
            })
          })
          .catch(err => {
            console.log(err);
          })
      })
      .catch(err => {
        console.log(err);
      })

      // getCurrentStyles() {
//   let id = this.props.current.data.id;
//   let extras = 'styles';
//   axios.get('/products', {params: {id, extras}})
//     .then(newStyles => {
//       this.setState({
//         currentStyle: newStyles.data
//       });
//     })
// }
  }

  handleSizeChange(query) {
    console.log(query.target);
    console.log(query.target.childNodes[query.target.selectedIndex].getAttribute('id'));
    let skuValue = this.state.currentSizeQuantityList;
    let quantityValue;
    let storage = [];
    if(query.target.childNodes[query.target.selectedIndex].getAttribute('id') === '0') {
      //do nothing
      quantityValue = 0;
    } else {
     quantityValue = skuValue[query.target.childNodes[query.target.selectedIndex].getAttribute('id')].quantity;

    if(quantityValue > 15) {
      for(let i = 1; i <= 15; i++) {
        storage.push(i);
      }
    } else {
      for(let i = 1; i <= quantityValue; i++) {
        storage.push(i);
      }
    }
  }
    //console.log(skuValue[query.target.className].size)

    if(query.target.value === 'Select Size') {
      this.setState({ selectedSize: query.target.value, isDisabled: true, selectedQuantity: '--' })
    } else if(quantityValue === 0) {
      this.setState({ selectedSize: query.target.value, isDisabled: true, selectedQuantity:'--', inStock: false })
    } else {
      this.setState({ selectedSize: query.target.value, isDisabled: false, selectedQuantity: '1', currentQuantity: [...storage] })
    }
  }



  handleAddCart() {

    if(this.state.selectedSize === 'Select Size' || this.state.selectedSize === '') {
      console.log('should not pass here add cart')
      this.setState({ isError: true })
      //create some sort of error message
    } else {
      console.log('pass here add cart')
      this.setState({ isError: false })
      //setState to a storage unit that shows the list of the item.
    }
  }

  handleQuantityChange(query) {
    this.setState({ selectedQuantity: query.target.value })
  }

  handleSelectedQuantity(query) {
    var temp = this.state.currentSizeQuantityList;
    console.log('pass handled')
    var quantityValue = temp[query.target.value].quantity;
    var storage = [];
    for(let i = 1; i <= quantityValue; i++) {
      storage.push(i);
    }
    this.setState({ currentQuantity: [...storage] })
  }

  render() {
    if(this.state.isLoading) {
      return (
        <div>Please Wait...</div>
      )
    } else {
    return (
      <div className='gridContainer'>

        <div className='leftSide'>
          <img src={this.state.currentImage} className='mainImage'></img>
        </div><br></br>

      <div className='rightSide'>
        <i class='fa fa-star-o'></i>
        <i class='fa fa-star-o'></i>
        <i class='fa fa-star-o'></i>
        <i class='fa fa-star-o'></i>
        <i class='fa fa-star-o'></i>
        <div className= "someDisplay" onClick={this.sendLink}> Read All {this.state.currentValue} reviews </div>

        <div><h3>{this.state.currentProductCategory}</h3></div>
        <div><h2>{this.state.currentProductName}</h2></div>
        <div><h2>{this.state.currentPrice}</h2></div>
        <div><StyleList
          currentProductStyle={this.state.currentProductStyle}
        /></div>
        <br></br>
        <div className='dropdownContainer'>
            {console.log('Check')}
            {console.log(this.state.productData)}
            {console.log(this.state.currentProductStyle)}
            {console.log(this.state.currentQuantity)}
        <SizeDrop
          selectedSize = {this.state.selectedSize}
          handleSizeChange = {this.handleSizeChange.bind(this)}
          currentSizeQuantityList = {this.state.currentSizeQuantityList}
          handleSelectedQuantity = {this.handleSelectedQuantity.bind(this)}
        />
        <QuantityDrop
            selectedQuantity = {this.state.selectedQuantity}
            handleQuantityChange = {this.handleQuantityChange.bind(this)}
            isDisabled = {this.state.isDisabled}
            currentQuantity = {this.state.currentQuantity}
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
      <br></br>
        <div className ='bottomSide'><br></br>{this.state.currentDescription}</div>
    </div>
    );
  }
}
}

export default ProductOverview;