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
      relindex: 0,
      outindex: 0,
      relatedProductsHide: false,
      outfitsHide: false

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
              relatedProducts: results
            });
          })
          .then(() => this.checkCarouselState('relatedProducts'))
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
      this.checkCarouselState('outfits');
    });
  }

  checkCarouselState(list) {
    let cards;
    if (list === 'outfits') {
      cards = 252.22 + (this.state[list].length * 256.66);
    } else {
      cards = 252.22 + ((this.state[list].length - 1) * 256.66);
    }
    let doc = document.body.clientWidth;
    let state = `${list}Hide`
    console.log('C: ', cards);
    console.log('D: ', doc);
    if (cards > doc) {
      this.setState({
        [state]: false
      })
    } else {
      this.setState({
        [state]: true
      })
    }
  }




  handleCarouselNext(e) {
    let doc = document.body.clientWidth;
    let name = e.target.classList[0];
    let state = `${name}index`;
    let prev = document.querySelector(`.prev-${name}-card`);
    let next = document.querySelector(`.next-${name}-card`);
    let track = document.querySelector(`.${name}-track`);
    this.setState({
      [state]: this.state[state] + 1
    }, () => {
      prev.classList.add('show');
      let index = this.state[state];
      let totalCards = name === 'out' ? this.state.outfits.length + 1 : this.state.relatedProducts.length;
      let screenRatio = Math.floor(doc / 256);
      let offset = index === 1 ? "translateX(" + index * -(252.22) + "px)" : "translateX(" + index * -(256.66) + "px)";
      track.style.transform = offset;
      if (index >= totalCards - screenRatio) {
        next.classList.add('hide');
      }

    })
  }

  handleCarouselPrev(e) {
    let name = e.target.classList[0];
    let state = `${name}index`;
    let prev = document.querySelector(`.prev-${name}-card`);
    let next = document.querySelector(`.next-${name}-card`);
    let track = document.querySelector(`.${name}-track`);
    this.setState({
      [state]: this.state[state] - 1
    }, () => {
      next.classList.remove('hide');
      let index = this.state[state];
      track.style.transform = index === 1 ? "translateX(" + index * -(252.22) + "px)" : "translateX(" + index * -(256.66) + "px)";
      if (this.state[state] === 0) {
        prev.classList.remove("show");
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
              <div className="rel-track">
              {this.state.relatedProducts.map((product, i) => {
                return <RelatedProdCard getStyles={this.getParentStyles} handleActionClick={this.handleActionButtonClick} getRelated={this.getRelatedProducts} selectedStyle={this.state.productCardStyle} show={this.state.showModal} update={this.props.updateProd} key={i} parentProduct={this.props.currProd} current={product}/>
              })}
              </div>
              <div className="nav-card">
                <button onClick={this.handleCarouselPrev} className="rel prev-rel-card"><span  className="rel fas fa-chevron-left fa-2x"></span></button>
                <button onClick={this.handleCarouselNext} className={this.state.relatedProductsHide ? "hide rel next-rel-card" : "rel next-rel-card"}><i className="rel fas fa-chevron-right fa-2x"></i></button>
            </div>
            </div>
          </div>
            <br></br>
            <div className="section">YOUR OUTFIT</div>
            <br></br>
          <div className="outCont">
            <div className="outfitCarousel">
              <div className="out-track">
                <AddOutfitCard handleClick={this.handleAddOutfit} />
                {this.state.outfits.map((outfit, key) => {
                  return <YourOutfitCard  remove={this.handleRemoveOutfit} key={key} outfit={outfit} avg={this.state.average} />
                })}
              </div>
                <div className="nav-card">
                  <button onClick={this.handleCarouselPrev} className="out prev-out-card"><i className="out fas fa-chevron-left fa-2x"></i></button>
                  <button onClick={this.handleCarouselNext} className={this.state.outfitsHide ? "hide out next-out-card" : "out next-out-card"}><i className="out show fas fa-chevron-right fa-2x"></i></button>
              </div>
            </div>
          </div>
        </div>
      );
    }


  }
}


export default RelatedPO;


