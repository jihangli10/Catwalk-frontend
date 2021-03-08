import React from 'react';
import ReactDOM from 'react-dom';
import YourOutfitCard from './YourOutfitCard.jsx';
import RelatedProdCard from './RelatedProdCard.jsx';
import axios from 'axios';
import RelatedModal from './RelatedModal.jsx';
import AddOutfitCard from './AddOutfitCard.jsx';
import ls from 'local-storage';



class RelatedPO extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      relatedProducts: null,
      showModal: false,
      productCard: null,
      productCardStyle: null,
      parentProductStyle: null,
      selectedReviews: null,
      parentReviews: null,
      outfits: [],
      average: 0,
      relatedProductsindex: 0,
      outfitsindex: 0,
      relatedProductsHideNext: false,
      outfitsHideNext: false,
      relatedProductsHidePrev: false,
      outfitsHidePrev: false
    }
    this.getRelatedProducts = this.getRelatedProducts.bind(this);
    this.handleActionButtonClick = this.handleActionButtonClick.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
    this.getParentStyles = this.getParentStyles.bind(this);
    this.getReviewMeta = this.getReviewMeta.bind(this);
    this.createOutfitObject = this.createOutfitObject.bind(this);
    this.handleAddOutfit = this.handleAddOutfit.bind(this);
    this.handleRemoveOutfit = this.handleRemoveOutfit.bind(this);
    this.getAverage = this.getAverage.bind(this);
    this.handleCarouselNext = this.handleCarouselNext.bind(this);
    this.handleCarouselPrev = this.handleCarouselPrev.bind(this);
    this.checkCarouselState = this.checkCarouselState.bind(this);
    window.addEventListener('resize', () => {
      this.checkCarouselState('outfits');
      this.checkCarouselState('relatedProducts');
    })
  }

  componentDidMount() {
    this.getRelatedProducts();
    this.getParentStyles(this.props.currProd.id);
    this.getReviewMeta(this.props.currProd.id);
    this.setState({
      outfits: ls.get('outfits') || []
    }, () => this.checkCarouselState('outfits'))
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.outfits.length !== prevState.outfits.length) {
      this.checkCarouselState('outfits');
    } else if (prevProps.currProd.id !== this.props.currProd.id) {
      this.checkCarouselState('relatedProducts');
    }
  }


  handleActionButtonClick(productCard, productStyle, selectReviews) {
    this.setState({
      showModal: !this.state.showModal,
      productCard: productCard,
      productCardStyle: productStyle,
      selectedReviews: selectReviews
    })
  }

  handleModalClose(e) {
    e.preventDefault();
    this.setState({
      showModal: false
    })
  }

  getParentStyles(id) {
    let extras = 'styles';
    axios.get(`/products/${id}/${extras}`)
      .then(newStyles => {
        this.setState({
          parentProductStyle: newStyles.data
        });
      })
      .catch((error) => console.log('ERROR getting styles: ', error));
  }


  getRelatedProducts() {
    let id = this.props.currProd.id;
    if (this.state.showModal) {
      this.setState({
        showModal: false
      });
    }
    return axios.get(`/products/${id}/related`)
      .then(related => {
        let elimDupes = new Set(related.data);
        let newRelated = [...elimDupes];
        let relatedProds = newRelated.map(product => {
          return axios.get(`/products/${product}`);
        })
        Promise.all(relatedProds)
          .then(results => {
            this.setState({
              relatedProducts: results,
              relatedProductsindex: 0
            }, () => {
              this.checkCarouselState('relatedProducts');
              document.querySelector('.relatedProducts-track').style.transform = "translateX(0px)";
          });
          })
          .catch(error => console.log('ERROR with Promise.all', error));
      })
      .catch(error => console.log('ERROR retrieving data', error));
  }

  getReviewMeta(id) {
    axios.get('/reviews/meta', {params: {product_id: id}})
      .then((results) => {
        this.setState({
          parentReviews: results.data
        }, () => this.getAverage());
      })
  }

  getAverage() {
    let reviews = this.state.parentReviews.ratings;
    let sum = 0;
    let count = 0;
    for (let i in reviews) {
      sum += (parseInt(i) * parseInt(reviews[i]));
      count += parseInt(reviews[i]);
    }
    this.setState({
      average: (Math.round(sum / count * 4) / 4).toFixed(2)
    })
  }

  createOutfitObject() {
    let outfitObj = {};
    let defaultStyle = this.state.parentProductStyle.results[0];
    outfitObj.id = this.props.currProd.id;
    outfitObj.name = this.props.currProd.name;
    outfitObj.category = this.props.currProd.category.toUpperCase();
    outfitObj.image = defaultStyle.photos[0].url;
    outfitObj.original_price = defaultStyle.original_price;
    outfitObj.sale_price = defaultStyle.sale_price;
    this.setState({
      outfits: this.state.outfits.concat(outfitObj)
    }, () => {
      ls.set('outfits', this.state.outfits);
      this.checkCarouselState('outfits');
    });
  }

  handleAddOutfit() {
    let id = this.props.currProd.id;
    let outfitIds = this.state.outfits.map(outfit => outfit.id);
    if (outfitIds.includes(id)) {
      return;
    }
    this.createOutfitObject();
  }

  handleRemoveOutfit(id) {
    let newOutfits = this.state.outfits.filter(outfit => {
      return outfit.id !== id;
    })
    this.setState({
      outfits: newOutfits
    }, () => {
      ls.set('outfits', this.state.outfits);
      if (this.state.outfitsindex > 0) {
        this.setState({
          outfitsindex: this.state.outfitsindex - 1,
          outfitsHidePrev: true
        }, () => {
          let track = document.querySelector(`.outfits-track`);
          track.style.transform = this.state.outindex > 1 ? "translateX(" + (this.state.outindex - 1) * (252.22) + "px)" : "translateX(0px)";
          this.checkCarouselState('outfits');
        })
      }
    });
  }

  checkCarouselState(list) {
    let cards;
    if (list === 'outfits') {
      cards = 252.22 + (this.state[list].length * 257);
    } else {
      cards = 252.22 + ((this.state[list].length - 1) * 257);
    }
    let doc = document.body.clientWidth;
    let hideNext = `${list}HideNext`;
    let hidePrev = `${list}HidePrev`;
    if (cards > doc) {
      this.setState({
        [hideNext]: false,
        [hidePrev]: true
      });
    } else {
      this.setState({
        [hidePrev]: true,
        [hideNext]: true
      })
    }
  }

  handleCarouselNext(e) {
    let doc = document.body.clientWidth;
    let name = e.target.classList[0];
    let state = `${name}index`;
    let prev = `${name}HidePrev`;
    let next = `${name}HideNext`;
    let track = document.querySelector(`.${name}-track`);
    this.setState({
      [state]: this.state[state] + 1
    }, () => {
      let index = this.state[state];
      let totalCards = name === 'outfits' ? this.state.outfits.length + 1 : this.state.relatedProducts.length;
      let screenRatio = Math.floor(doc / 256);
      let offset = index === 1 ? "translateX(" + index * -(252.22) + "px)" : "translateX(" + index * -(256.66) + "px)";
      track.style.transform = offset;
      if (index >= totalCards - screenRatio) {
        this.setState({
          [prev]: false,
          [next]: true
        })
      }
    })
  }

  handleCarouselPrev(e) {
    let name = e.target.classList[0];
    let state = `${name}index`;
    let prev = `${name}HidePrev`;
    let next = `${name}HideNext`;
    let track = document.querySelector(`.${name}-track`);
    console.log(track);
    this.setState({
      [state]: this.state[state] - 1
    }, () => {
      let index = this.state[state];
      track.style.transform = index === 1 ? "translateX(" + index * -(252.22) + "px)" : "translateX(" + index * -(256.66) + "px)";
      if (this.state[state] === 0) {
        this.setState({
          [prev]: true,
          [next]: false
        })
      }
    })
  }

  render() {

    if (!this.state.relatedProducts) {

      return(
        <div></div>
      );

    } else {

      return(
        <div>
          <div>
            <br></br>
            <div className="section">RELATED PRODUCTS</div>
            <br></br>
          </div>
            <div className="modalCont">
              <RelatedModal selected={this.state.productCard} parentProd={this.props.currProd} handleClose={this.handleModalClose} parentStyle={this.state.parentProductStyle} selectedStyle={this.state.productCardStyle} show={this.state.showModal} parentReview={this.state.parentReviews} selectReview={this.state.selectedReviews} />
            </div>
          <div className="relCont">
            <div className="relatedCarousel">
              <div className="relatedProducts-track">
              {this.state.relatedProducts.map((product, i) => {
                return <RelatedProdCard getStyles={this.getParentStyles} handleActionClick={this.handleActionButtonClick} getRelated={this.getRelatedProducts} selectedStyle={this.state.productCardStyle} show={this.state.showModal} update={this.props.updateProd} key={i} parentProduct={this.props.currProd} current={product}/>
              })}
              </div>
              <div className="nav-card">
                <button onClick={this.handleCarouselPrev} className={this.state.relatedProductsHidePrev ? "hide relatedProducts prev-rel-card" : "relatedProducts show prev-rel-card"}><span  className="relatedProducts fas fa-chevron-left fa-2x"></span></button>
                <button onClick={this.handleCarouselNext} className={this.state.relatedProductsHideNext ? "hide relatedProducts next-rel-card" : "relatedProducts show next-rel-card"}><i className="relatedProducts fas fa-chevron-right fa-2x"></i></button>
            </div>
            </div>
          </div>
            <br></br>
            <div className="section">YOUR OUTFIT</div>
            <br></br>
          <div className="outCont">
            <div className="outfitCarousel">
              <div className="outfits-track">
                <AddOutfitCard handleClick={this.handleAddOutfit} />
                {this.state.outfits.map((outfit, key) => {
                  return <YourOutfitCard  remove={this.handleRemoveOutfit} key={key} outfit={outfit} avg={this.state.average} />
                })}
              </div>
                <div className="nav-card">
                  <button onClick={this.handleCarouselPrev} className={this.state.outfitsHidePrev ? "hide outfits prev-out-card" : "outfits show prev-out-card"}><i className="outfits fas fa-chevron-left fa-2x"></i></button>
                  <button onClick={this.handleCarouselNext} className={this.state.outfitsHideNext ? "hide outfits next-out-card" : "outfits show next-out-card"}><i className="outfits show fas fa-chevron-right fa-2x"></i></button>
              </div>
            </div>
          </div>
        </div>
      );
    }


  }
}


export default RelatedPO;


