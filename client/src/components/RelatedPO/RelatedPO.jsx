import React from 'react';
import ReactDOM from 'react-dom';
import YourOutfitCard from './YourOutfitCard.jsx';
import RelatedProdCard from './RelatedProdCard.jsx';
import axios from 'axios';
import RelatedModal from './RelatedModal.jsx';
import AddOutfitCard from './AddOutfitCard.jsx';



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
      outfits: []

    }
    this.getRelatedProducts = this.getRelatedProducts.bind(this);
    this.handleActionButtonClick = this.handleActionButtonClick.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
    this.getParentStyles = this.getParentStyles.bind(this);
    this.getReviewMeta = this.getReviewMeta.bind(this);
    this.createOutfitObject = this.createOutfitObject.bind(this);
    this.handleAddOutfit = this.handleAddOutfit.bind(this);
    this.handleRemoveOutfit = this.handleRemoveOutfit.bind(this);
  }

  componentDidMount() {
    this.getRelatedProducts();
    this.getParentStyles(this.props.currProd.id);
    this.getReviewMeta(this.props.currProd.id);
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
    console.log('click');
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
    let extras = 'related';
    if (this.state.showModal) {
      this.setState({
        showModal: false
      });
    }
    return axios.get(`/products/${id}/${extras}`)
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
          .catch(error => console.log('ERROR with Promise.all', error));
      })
      .catch(error => console.log('ERROR retrieving data', error));
  }

  getReviewMeta(id) {
    axios.get('/reviews/meta', {params: {product_id: id}})
      .then((results) => {
        this.setState({
          parentReviews: results.data
        })
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
    });
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
        <div className="relatedCont">
          <div className="modalCont">
            <RelatedModal selected={this.state.productCard} parentProd={this.props.currProd} handleClose={this.handleModalClose} parentStyle={this.state.parentProductStyle} selectedStyle={this.state.productCardStyle} show={this.state.showModal} parentReview={this.state.parentReviews} selectReview={this.state.selectedReviews} />
          </div>
          <div className="relatedCarousel">
            {this.state.relatedProducts.map((product, i) => {
              return <RelatedProdCard getStyles={this.getParentStyles} handleActionClick={this.handleActionButtonClick} getRelated={this.getRelatedProducts} show={this.state.showModal} update={this.props.updateProd} key={i} parentProduct={this.props.currProd} current={product}/>
            })}
          </div>
        </div>
        <br></br>
          <div className="section">YOUR OUTFIT</div>
        <br></br>
        <div className="outfitCont">
          <div className="outfitCarousel">
              <AddOutfitCard handleClick={this.handleAddOutfit} />
              {this.state.outfits.map((outfit, key) => {
                return <YourOutfitCard remove={this.handleRemoveOutfit} key={key} outfit={outfit}/>
              })}
          </div>
        </div>
      </div>
      );
    }


  }
}


export default RelatedPO;


