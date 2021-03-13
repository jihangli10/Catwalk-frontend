import React from 'react';
import ReactDOM from 'react-dom';
import QandA from './QandA/QandA.jsx';
import axios from 'axios';
import RelatedPO from './RelatedPO/RelatedPO.jsx';
import RateReview from './RateReview/RateReview.jsx'
import RateReviewData from './RateReview/RateReviewData.jsx'
import Track from '../Track.jsx';
import Star000 from './RateReview/Star000.jsx'
import Star025 from './RateReview/Star025.jsx'
import Star050 from './RateReview/Star050.jsx'
import Star075 from './RateReview/Star075.jsx'
import Star100 from './RateReview/Star100.jsx'
import products from '../data/products'
import reviews from '../data/reviews'
import StarRatings from './RateReview/StarRatings.jsx'
import ProductOverview from './ProductOverview/ProductOverview'
import Header from './Header/Header';
class App extends React.Component {
  constructor(props) {+
    super(props);
    this.state = {
      products: [],
      metaData: {},
      currentProduct: {
        "id": 19783,
        "campus": "hr-rfe",
        "name": "Alberto Romper",
        "slogan": "Voluptatibus sunt neque repellendus.",
        "description": "Dolor deleniti blanditiis fugit et aut quisquam eius provident. Quasi labore vel ipsum numquam mollitia et. Accusamus asperiores a nisi.",
        "category": "Romper",
        "default_price": "826.00",
        "created_at": "2021-02-23T19:24:34.674Z",
        "updated_at": "2021-02-23T19:24:34.674Z",
        "features": [
          {
            "feature": "Sustainably Sourced",
            "value": null
          },
          {
            "feature": "Green Leaf Certified",
            "value": null
          },
          {
            "feature": "Cut",
            "value": "\"Skinny\""
          }
        ]
      }
    };
    this.updateCurrentProduct = this.updateCurrentProduct.bind(this);
    this.getReviewMeta = this.getReviewMeta.bind(this);
  }
  componentDidMount() {
    this.updateCurrentProduct(this.state.currentProduct.id);
  }
  updateCurrentProduct(target) {
    return axios.get(`/products/${target}`)
      .then(product => {
        this.setState({
          currentProduct: product.data
        }, () => {
          this.getReviewMeta(this.state.currentProduct.id)
        })
      })
      .catch(err => console.log('ERROR GETTING PRODS: ++++++++++', err));
  }
  getReviewMeta(id) {
    axios.get('/reviews/meta', { params: { product_id: id } })
      .then((results) => {
        this.setState({
          metaData: results.data
        })
      })
  }
  render() {
    return (
      <div style={this.state.blurBackground ? { background: 'black' } : null}>
        <Track moduleName={"Header"}>
        <div>
          <Header />
        </div>
        </Track>
        <Track moduleName={"ProductOverivew"}>
        <div>
          <ProductOverview
            currentProduct={this.state.currentProduct}
          />
        </div>
        <div>
          <br></br>
          <br></br>
        </div>
        </Track>
        <Track moduleName={"RelatedProductOutfit"}>
        <div>
          <RelatedPO updateProd={this.updateCurrentProduct} parentReviews={this.state.metaData} currProd={this.state.currentProduct} />
        </div>
        </Track>
        <Track moduleName={"QuestionsAndAnswers"}>
        <QandA updateProd={this.updateCurrentProduct} currentProduct={this.state.currentProduct} />
        </Track>
        <Track moduleName={"RatingsAndReviews"}>
        <div>
          <br></br>
          <a id='test'></a>
          <div className="section">RATINGS &amp; REVIEWS</div>
          <br></br>
          <RateReviewData key={'product' + this.state.currentProduct.description.length} metaData={this.state.metaData.characteristics} currProd={this.state.currentProduct} />
        </div>
        </Track>
      </div>
    );
  }
}
export default App;