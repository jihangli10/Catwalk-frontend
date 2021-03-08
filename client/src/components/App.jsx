import React from 'react';
import ReactDOM from 'react-dom';
import QandA from './QandA/QandA.jsx';
import axios from 'axios';
import RelatedPO from './RelatedPO/RelatedPO.jsx';
import RateReview from './RateReview/RateReview.jsx'
import RateReviewData from './RateReview/RateReviewData.jsx'
import Star000 from './RateReview/Star000.jsx'
import Star025 from './RateReview/Star025.jsx'
import Star050 from './RateReview/Star050.jsx'
import Star075 from './RateReview/Star075.jsx'
import Star100 from './RateReview/Star100.jsx'
import products from '../data/products'
import reviews from '../data/reviews'
import StarRatings from './RateReview/StarRatings.jsx'
import ProductOverview from './ProductOverview/ProductOverview'


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products:[],
      currentProduct: {
        "id": 19378,
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
  }

  componentDidMount() {
    this.updateCurrentProduct(this.state.currentProduct.id);
  }

  updateCurrentProduct(target) {
    return axios.get(`/products/${target}`)
      .then(product => {
        this.setState({
          currentProduct: product.data
        })
      })
  }



  render() {

    return (
      <div style={this.state.blurBackground ? {background: 'black'}: null}>
        <div>
          <h1>Main Page</h1>
          <ProductOverview
            currentProduct = {this.state.currentProduct}
          />
        </div>
        <div>
          <br></br>
          <div className="section">CATEGORY</div>
          <br></br>
        </div>
        <div>
          <RelatedPO updateProd={this.updateCurrentProduct} currProd={this.state.currentProduct} />
        </div>

        <QandA updateProd={this.updateCurrentProduct} currentProduct={this.state.currentProduct}/>

        <div>
          <br></br>
          <a id='test'></a>
          <div className="section">RATINGS &amp; REVIEWS</div>
          <br></br>
          <RateReviewData key={'product' + this.state.currentProduct.description.length} updateProd={this.updateCurrentProduct} currProd={this.state.currentProduct} />
        </div>
      </div>
    );
  }
}

export default App;