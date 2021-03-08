import React from 'react';
import QuantityDrop from './QuantityDrop'
import SizeDrop from './SizeDrop'
import StyleList from './StyleList'
import AddCart from './AddCart'
import dummyData from './dummyData.js'
import axios from 'axios'
import CartStorage from './CartStorage'
import ImageModal from './ImageModal'
import MiniCarouselStyle from './MiniCarouselStyle'

import StarRatings from '../RateReview/StarRatings'

class ProductOverview extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentValue: 0,
      selectedSize: '',
      selectedQuantity: '',
      currentQuantity: [],
      maxLimit: 0,
      isDisabled: true,
      selectedStyle: '',
      isError: false,
      inStock: true,
      styleData: [],
      isLoading: true,
      currentProduct: '',
      currentProductStyle: '',
      currentProductName: '',
      currentProductCategory: '',
      currentPrice: '',
      currentSalePrice: '',
      currentDescription: '',
      currentImage:'',
      currentSizeQuantityList: {},
      cartStorage: [],
      cartStorageSize: [],
      currentStyleId: '',
      currentActive: '',
      showExpandedImage: false,
      activeIndex: 0,
      indexCurrent: 0,
      indexBox: [],
      indexStart: 0,
      indexEnd: 0
    }
  }

  sendLink () {
    //send to the Ratings and Review Module
    // var value = this.state;
    // console.log(value);
  }

  componentDidUpdate(prevProps) {
    if(this.props.currentProduct !== prevProps.currentProduct) {
      this.getDataandStyle();
    }
  }

  componentDidMount() {
    this.getDataandStyle();
  }

  getDataandStyle() {
      let id = this.props.currentProduct.id;
      axios.get(`/products/${id}/styles`)
         .then(newStyles => {
            this.setState({
             currentProductStyle: newStyles.data,
             isLoading: false,
             currentProductName: this.props.currentProduct.name,
             currentProductCategory: this.props.currentProduct.category,
             currentPrice: newStyles.data.results[0].original_price,
             currentSalePrice: newStyles.data.results[0].sale_price,
             currentDescription: this.props.currentProduct.description,
             currentImage: newStyles.data.results[0].photos[0].url,
             currentSizeQuantityList: newStyles.data.results[0].skus,
             currentStyleName: newStyles.data.results[0].name,
             selectedQuantity: '',
             selectedSize: '',
             isDisabled: true,
             inStock: true,
             currentStyleId: newStyles.data.results[0].styles_id,
             currentActive: newStyles.data.results[0].styles_id,
             imageZoomed: false,
             mouseX: '',
             mouseY: '',
             activeIndex: 0,
             indexBox: newStyles.data.results.slice(0, 4),
             indexStart: 0,
             indexEnd: 3
           })
        })
         .catch(err => {
          console.log(err);
        })
  }

  handleSizeChange(query) {
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
      this.setState({ selectedSize: query.target.value, isDisabled: true, selectedQuantity: '--', inStock: true })
    } else if(quantityValue === 0) {
      this.setState({ selectedSize: query.target.value, isDisabled: true, selectedQuantity:'--', inStock: false })
    } else {
      this.setState({
        selectedSize: query.target.value,
        isDisabled: false,
        selectedQuantity: '1',
        currentQuantity: [...storage], inStock: true })
    }
  }



  handleAddCart() {

    if(this.state.selectedSize === 'Select Size' || this.state.selectedSize === '') {
      this.setState({ isError: true })
      //create some sort of error message
    } else {
      console.log('hit here')
      this.setState({
        isError: false,
        cartStorage: [...this.state.cartStorage, {
          currentProductStyle: this.state.currentProductStyle,
          currentPrice: this.state.currentPrice,
          currentName: this.state.currentName,
          currentProductName: this.state.currentProductName,
          currentImage: this.state.currentImage,
        }],
        cartStorageSize: this.state.cartStorage.length+1
      })
      //setState to a storage unit that shows the list of the item.
    }
  }

  handleQuantityChange(query) {
    this.setState({ selectedQuantity: query.target.value })
  }

  modalMode () {
    console.log('it hits here')
  }

  handlePrevSlide () {
    let index = this.state.activeIndex
    let slides = this.state.currentProductStyle.results.length
    if(index < 1) {
      index = slides;
    }
    index--;
    this.setState({
      activeIndex: index,
      currentImage: this.state.currentProductStyle.results[index].photos[0].url
    })
  }

  handleMiniPrevSlide () {
    this.setState({
      indexBox: this.state.currentProductStyle.results.slice(this.state.indexStart-1, this.state.indexEnd),
      indexStart: this.state.indexStart - 1,
      indexEnd: this.state.indexEnd - 1
    })
  }

  handleNextSlide () {
    let index = this.state.activeIndex;
    let slides = this.state.currentProductStyle.results.length;
    if(index === slides) {
      index = -1;
    }
    index++;
    this.setState({
      activeIndex: index,
      currentImage: this.state.currentProductStyle.results[index].photos[0].url
    })
  }

  handleMiniNextSlide () {
    this.setState({
      indexBox: this.state.currentProductStyle.results.slice(this.state.indexStart+1, this.state.indexEnd+2),
      indexStart: this.state.indexStart + 1,
      indexEnd: this.state.indexEnd + 1
    })
  }

  handleStyle(id) {
    let storedProductStyle;
    for(let i = 0; i < this.state.currentProductStyle.results.length; i++) {
      if(this.state.currentProductStyle.results[i].style_id === id) {
        storedProductStyle = this.state.currentProductStyle.results[i];
        break;
      }
    }

    this.setState({
      currentImage: storedProductStyle.photos[0].url,
      currentSizeQuantityList: storedProductStyle.skus,
      currentStyleName: storedProductStyle.name,
      currentStyleId: storedProductStyle.style_id,
      currentPrice: storedProductStyle.original_price,
      currentSalePrice: storedProductStyle.sale_price,
      currentActive: id
    });

  }

  handleImageModal () {
    console.log('Booyah')
    this.setState({ showExpandedImage: true})
  }

  onClose () {
    this.setState({ showExpandedImage: !this.state.showExpandedImage})
  }

  handleSelectedQuantity(query) {
    var temp = this.state.currentSizeQuantityList;
    var quantityValue = temp[query.target.value].quantity;
    var storage = [];
    for(let i = 1; i <= quantityValue; i++) {
      storage.push(i);
    }
    this.setState({ currentQuantity: [...storage] })
  }

  imageZoomIn () {
    this.setState({
      imageZoomed: true
    })
  }

  imageZoomOut () {
    this.setState({
      imageZoomed: false
    })
  }

  handleMouseMove (e) {
    //console.log('check')
    const {
      top: offsetTop,
      left: offsetLeft
    } = e.target.getBoundingClientRect()


    const x = ((e.pageX - offsetLeft) / e.target.width) * 50;
    const y = ((e.pageY - offsetTop) / e.target.height) * 50;

    this.setState({
      mouseX: x,
      mouseY: y
    })
  }

  handleMiniStyle (id) {
    let storedProductStyle;
    for(let i = 0; i < this.state.indexBox.length; i++) {
      if(this.state.indexBox[i].style_id === id) {
        storedProductStyle = this.state.currentProductStyle.results[i];
        break;
      }
    }

    if(storedProductStyle === undefined) {

    } else {

    this.setState({
      currentImage: storedProductStyle.photos[0].url,
      currentSizeQuantityList: storedProductStyle.skus,
      currentStyleName: storedProductStyle.name,
      currentStyleId: storedProductStyle.style_id,
      currentPrice: storedProductStyle.original_price,
      currentSalePrice: storedProductStyle.sale_price,
      currentActive: id
    });
  }
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
          <div className='imageDiv'>
          <img onClick={this.handleImageModal.bind(this)} src={this.state.currentImage} className='mainImage'></img>

          <ImageModal
              showExpandedImage = {this.state.showExpandedImage}
              currentImage = {this.state.currentImage}
              currentProductStyle = {this.state.currentProductStyle}
              onClose = {this.onClose.bind(this)}
              handlePrevSlide = {this.handlePrevSlide.bind(this)}
              handleNextSlide = {this.handleNextSlide.bind(this)}
              activeIndex = {this.state.activeIndex}
              imageZoomed = {this.state.imageZoomed}
              imageZoomIn = {this.imageZoomIn.bind(this)}
              imageZoomOut = {this.imageZoomOut.bind(this)}
              handleMouseMove = {this.handleMouseMove.bind(this)}
              mouseX = {this.state.mouseX}
              mouseY = {this.state.mouseY}
            />
          </div>

        </div><br></br>
      <div className='styleCarousel'>

        <div className='styleMiniGrid'>
        <div className='styleMiniLeft' onClick={this.state.indexStart === 0 ? null :this.handleMiniPrevSlide.bind(this)}>
        {this.state.indexStart === 0 ? null : <i className='fas fa-chevron-left'></i>}
      </div>
        {this.state.currentActive === undefined ? this.setState({ currentActive: this.state.currentProductStyle.results[0].style_id }) : null}
        <div className='styleMiniGridImage'>
        {this.state.indexBox.map(element => {
          return (
            <MiniCarouselStyle
              element = {element}
              isActive = {this.state.currentActive === element.style_id}
              handleMiniStyle = {this.handleMiniStyle.bind(this, element.style_id)}
            />
          )
        })}

        </div>
        <div className='styleMiniRight' onClick={this.state.indexEnd === this.state.currentProductStyle.results.length-1 ? null : this.handleMiniNextSlide.bind(this)}>
        {this.state.indexEnd === this.state.currentProductStyle.results.length-1 ? null : <i className='fas fa-chevron-right'></i>}
        </div>
        </div>


      </div>
      <div className='rightSide'>
        <div className='miniContainer2'>
        <div>
        <StarRatings
          rating='3'
        />
        </div>
        <div className='someDisplay'><a href='#test'>Read All {this.state.currentValue} reviews</a></div>
        </div>
        <div><h3>{this.state.currentProductCategory}</h3></div>
        <div><h2>{this.state.currentProductName}</h2></div>
        <div><h3>{this.state.currentStyleName}</h3></div>
        <div><h2>${this.state.currentPrice}</h2></div>
        <div>
        <div className='styleGrid'>
          {this.state.currentActive === undefined ? this.setState({ currentActive: this.state.currentProductStyle.results[0].style_id }) : null}
          {this.state.currentProductStyle.results.map(element => {
            return(<StyleList
              element = {element}
              isActive = {this.state.currentActive === element.style_id}
              handleStyle={this.handleStyle.bind(this, element.style_id)}
            />)
          })}
          </div>
            {/* <StyleList
          currentProductStyle={this.state.currentProductStyle}
          selectedStyle={this.state.selectedStyle}
          handleStyle={this.handleStyle.bind(this)}
          currentStyleId={this.state.currentStyleId}
        /> */}
        </div>
        <br></br>
        <div className='dropdownContainer'>
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
        <div className='cartContainer'>
        <AddCart
          handleAddCart = {this.handleAddCart.bind(this)}
          inStock = {this.state.inStock}
          isCartMade = {this.state.isCartMade}
        />
        <CartStorage
          modalMode = {this.modalMode.bind(this)}
          cartStorageSize = {this.state.cartStorageSize}
        />
        </div>
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

//<a id="test">Jump to Review List</a>
//<a href="#test">We clicked here</a>


export default ProductOverview;