import React from 'react';
import ReactDOM from 'react-dom';
import QandA from './QandA/QandA.jsx';
import axios from 'axios';
import RelatedPO from './RelatedPO/RelatedPO.jsx';
import RateReview from './RateReview/RateReview.jsx'
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
        "id": 19131,
        "campus": "hr-rfe",
        "name": "Alberto Romper",
        "slogan": "Voluptatibus sunt neque repellendus.",
        "description": "Dolor deleniti blanditiis fugit et aut quisquam eius provident. Quasi labore vel ipsum numquam mollitia et. Accusamus asperiores a nisi.",
        "category": "Romper",
        "default_price": "826.00",
        "created_at": "2021-02-23T19:24:34.674Z",
        "updated_at": "2021-02-23T19:24:34.674Z"
    }
  };
  this.updateCurrentProduct = this.updateCurrentProduct.bind(this);
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
      <div>
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

        <QandA />

        <div>
          <br></br>
          <a id='test'></a>
          <div className="section">RATINGS &amp; REVIEWS</div>
          <br></br>
          <RateReview updateProd={this.updateCurrentProduct} currProd={this.state.currentProduct} />
        </div>
      </div>
    );
  }
}

export default App;