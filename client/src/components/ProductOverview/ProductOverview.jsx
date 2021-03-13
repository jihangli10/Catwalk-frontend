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
import CreateFeatures from '../RelatedPO/CreateFeatures'

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
      currentSlogan: '',
      currentImage:'',
      currentSizeQuantityList: {},
      cartStorage: [],
      cartStorageSize: 0,
      currentStyleId: '',
      currentActive: '',
      showExpandedImage: false,
      activeIndex: 0,
      indexCurrent: 0,
      indexBox: [],
      indexStart: 0,
      indexEnd: 3,
      starAverage: 0,
      isClicked: false,
      currentZoomImage: '',
      currentSku: 0
    }
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
      return axios.get(`/products/${id}/styles`)
         .then(newStyles => {
           return axios.get('/reviews', { params: { product_id: id, count: 1000 } })
            .then(addedData => {
              let sumRating = 0;
              for (var i = 0; i < addedData.data.results.length; i++) {
                sumRating += addedData.data.results[i].rating
             }
              return axios.get('/cart')
                .then((result) => {
                  this.setState({
                    currentProductStyle: newStyles.data,
                    isLoading: false,
                    currentProductName: this.props.currentProduct.name,
                    currentProductCategory: this.props.currentProduct.category,
                    currentPrice: newStyles.data.results[0].original_price,
                    currentSalePrice: newStyles.data.results[0].sale_price,
                    currentSlogan: this.props.currentProduct.slogan,
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
                    indexEnd: 3,
                    starAverage: (Math.round(sumRating /addedData.data.results.length * 4) / 4).toFixed(2),
                    reviewAmount: addedData.data.results.length,
                    currentZoomImage: newStyles.data.results[0].photos[0].url,
                    isExpanded: false,
                    cartStorageSize: result.data.length
                })
              })
            })

        })
         .catch(err => {
          console.log(err);
        })
  }

  handleSizeChange(query) {
    let skuValue = this.state.currentSizeQuantityList;
    let trueSkuValue = query.target.childNodes[query.target.selectedIndex].getAttribute('id');
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

    if(query.target.value === 'Select Size') {
      this.setState({ selectedSize: query.target.value, isDisabled: true, selectedQuantity: '--', inStock: true })
    } else if(quantityValue === 0) {
      this.setState({ selectedSize: query.target.value, isDisabled: true, selectedQuantity:'--', inStock: false })
    } else {
      this.setState({
        selectedSize: query.target.value,
        isDisabled: false,
        selectedQuantity: '1',
        currentQuantity: [...storage], inStock: true,
        currentSku: trueSkuValue
      })
    }
  }

  cartModal () {
    //creates an axio get request and sets state with all the data stored in cart
    //it also creates a modal from the get request and setState to a list of data in state.
  }

  forceUpdate () {
    this.getDataandStyle();
  }

  getCartResult () {
    axios.get('/cart')
      .then((result) => {
        this.setState({ cartStorageSize: result.length })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  handleAddCart() {

    if(this.state.selectedSize === 'Select Size' || this.state.selectedSize === '') {
      this.setState({ isError: true })
      //create some sort of error message
    } else {
      //make an axios post call to store in the data
      let bodyInfo = {
        "sku_id": this.state.currentSku
      }
      return axios.post('/cart', bodyInfo)
        .then((res) => {
          console.log('it was successfully stored')
          this.forceUpdate();
        })
        .catch(err => {
          console.log(err);
        })
      // this.setState({
      //   isError: false,
      //   cartStorage: [...this.state.cartStorage, {
      //     currentProductStyle: this.state.currentProductStyle,
      //     currentPrice: this.state.currentPrice,
      //     currentName: this.state.currentName,
      //     currentProductName: this.state.currentProductName,
      //     currentImage: this.state.currentImage,
      //   }],
      //   cartStorageSize: this.state.cartStorage.length+1
      // })
      //setState to a storage unit that shows the list of the item.
    }
  }

  handleQuantityChange(query) {
    this.setState({ selectedQuantity: query.target.value })
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
      currentZoomImage: this.state.currentProductStyle.results[index].photos[0].url
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
      currentZoomImage: this.state.currentProductStyle.results[index].photos[0].url
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
    let currentIndex;
    for(let i = 0; i < this.state.currentProductStyle.results.length; i++) {
      if(this.state.currentProductStyle.results[i].style_id === id) {
        storedProductStyle = this.state.currentProductStyle.results[i];
        currentIndex = i;
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
      currentActive: id,
      activeIndex: currentIndex
    });

  }


  handleImageModal () {
    this.setState({ showExpandedImage: true, isClicked: true, currentZoomImage: this.state.currentImage})
  }

  onClose () {
    this.setState({ showExpandedImage: !this.state.showExpandedImage, isClicked: false, currentImage: this.state.currentZoomImage})
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

  handleExpandedImage () {
    this.setState({ isExpanded: !this.state.isExpanded })
  }

  handleMiniStyle (id) {
    let storedProductStyle;
    let currentIndex;
    for(let i = 0; i < this.state.indexBox.length; i++) {
      if(this.state.indexBox[i].style_id === id) {
        storedProductStyle = this.state.currentProductStyle.results[i];
        currentIndex = i;
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
      currentActive: id,
      activeIndex: currentIndex
    });
  }
}

  render() {

    let stylePrice = this.state.currentSalePrice ? this.state.currentSalePrice : this.state.currentPrice;

    if(this.state.isLoading) {
      return (
        <div>Please Wait...</div>
      )
    } else {
    return (
      <div >
      <div className='gridContainer'>

        <div className={this.state.isExpanded ? 'expandImage' : 'leftSide'}>

          <div className='imageDiv'>
          <img onClick={this.state.isExpanded ? this.handleImageModal.bind(this) : null} src={this.state.currentImage} className={this.state.isExpanded ?  'hoverMainImage':'mainImage'}></img>
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
              currentZoomImage = {this.state.currentZoomImage}
            />
          </div>

        </div><br></br>
        <div className={this.state.isExpanded ? 'expandView' :'nonExpandView'} onClick={this.handleExpandedImage.bind(this)}>{this.state.isExpanded ? <i className="fas fa-expand" style={{position:'relative', zIndex:'100', background:'transparent', color:'white', marginTop: '5px', marginLeft: '10px'}}></i> : <i className="fas fa-expand" style={{position:'relative', zIndex:'100', background:'transparent', color:'white', marginTop: '5px'}}></i>}</div>
      <div className='styleCarousel'>

        <div className='styleMiniGrid'>
        <div className='styleMiniLeft' onClick={this.state.indexStart === 0 ? null :this.handleMiniPrevSlide.bind(this)}>
        {this.state.indexStart === 0 ? null : <i className='fas overview-fas overview-fa-chevron-up fa-chevron-up'></i>}
      </div>
        {/* {this.state.currentActive === undefined ? this.setCurrentActive() : null} */}
        <div className='styleMiniGridImage'>
        {this.state.indexBox.map(element => {
          let value;
          if(this.state.currentActive === undefined) {
            value = this.state.currentProductStyle.results[0].style_id;
          } else {
            value = this.state.currentActive;
          }
          return (
            <MiniCarouselStyle
              element = {element}
              isActive = {value === element.style_id}
              handleMiniStyle = {this.handleMiniStyle.bind(this, element.style_id)}
              key = {element.style_id}
            />
          )
        })}

        </div>
        <div className='styleMiniRight' onClick={this.state.indexEnd >= this.state.currentProductStyle.results.length-1 ? null : this.handleMiniNextSlide.bind(this)}>
        {this.state.indexEnd >= this.state.currentProductStyle.results.length-1 ? null : <i className='fas overview-fas overview-fa-chevron-down fa-chevron-down'></i>}
        </div>
        </div>


      </div>
      <div className={this.state.isExpanded ? 'rightSide2' : 'rightSide'}>
        <div className='miniContainer2'>
        <div>
        <StarRatings
          rating={this.state.starAverage}
        />
        </div>
        <div className='someDisplay'><a href='#test' style={{ textDecoration: 'none'}}>Read All {this.state.reviewAmount} reviews</a></div>
        </div>
        <div className='productCategory'>{this.state.currentProductCategory.toUpperCase()}</div>
        <div className='productName'>{this.state.currentProductName}</div>

        <div className='pricePoint'>${stylePrice} <span className={this.state.currentSalePrice ? 'sale': 'noSale'}>${this.state.currentPrice}</span></div><br></br>
        <div className='bottomMiddle2'>
        <div className='styleNameContainer'><span className='styleMain'>STYLE &gt;</span> <span className='currentStyleName'>{this.state.currentStyleName.toUpperCase()}</span></div>
        <div className='styleGrid'>
          {/* {this.state.currentActive === undefined ? this.setState({ currentActive: this.state.currentProductStyle.results[0].style_id }) : null} */}
          {/* need to refactor the above */}

          {this.state.currentProductStyle.results.map(element => {
            let value;
            if(this.state.currentActive === undefined) {
              value = this.state.currentProductStyle.results[0].style_id;
            } else {
              value = this.state.currentActive;
            }

            return(<StyleList
              element = {element}
              isActive = {value === element.style_id}
              handleStyle={this.handleStyle.bind(this, element.style_id)}
              key={element.style_id}
            />)
          })}
            </div>


        </div>
        <br></br>
        <div className='bottomMiddle'>
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
          cartModal = {this.cartModal.bind(this)}
          cartStorageSize = {this.state.cartStorageSize}
        />
        </div>
        { this.state.isError ? <div>Please select size</div> : null}
        <br></br>
        <br></br>
      </div>
      </div>
      <br></br>
        <div className ='bottomSide'><br></br><div className='sloganName'>{this.state.currentSlogan}</div><br></br>{this.state.currentDescription}</div>
        <div className='bottomRightSide'>
          <CreateFeatures
            product = {this.props.currentProduct}
          />

        </div>
    </div>
    </div>
    );
  }
}
}

//<a id="test">Jump to Review List</a>
//<a href="#test">We clicked here</a>


export default ProductOverview;