import React from 'react';
import ReactDOM from 'react-dom';
<<<<<<< HEAD
import QandA from './QandA/QandA.jsx';
=======
import axios from 'axios';
import RelatedPO from './RelatedPO/RelatedPO.jsx';
>>>>>>> de9841a1c9b4096706ba6545cf708124a9882ebc
import RateReview from './RateReview/RateReview.jsx'
import StarRatings from './RateReview/StarRatings.jsx'


// States
  // Products
  // Current Product



// Product - Overview
  // Image Gallery
  // Product Informationn
  // Style selector
  // add to Cart

// Related Products and Your Outfit
  // Related Products
  // Your Outfit

// Questions & Answers
  // Search Bar
  // View Questions
  // Asking Question
  // Answering a Question

// Ratings & Reviews
  // Write a new Review
  // Review List
  // Sorting
  // Rating Breakdown
  // Product Breakdown


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
        "updated_at": "2021-02-23T19:24:34.674Z"
    }
  };
  this.updateCurrentProduct = this.updateCurrentProduct.bind(this);
  }

  updateCurrentProduct(target) {
    return axios.get('/products', {params: {id: target}})
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
        </div>
        <div>
          <br></br>
          <div className="section">CATEGORY</div>
          <br></br>
        </div>
        <div>
          <br></br>
          <div className="section">RELATED PRODUCTS</div>
          <br></br>
        </div>
        <div>
          <RelatedPO updateProd={this.updateCurrentProduct} currProd={this.state.currentProduct} />
          <br></br>
          <div className="section">YOUR OUTFIT</div>
          <br></br>
        </div>

        <QandA />

        <div>
          <br></br>
          <div className="section">RATINGS &amp; REVIEWS</div>
          <br></br>
          <RateReview />
        </div>
      </div>
    );
  }
}

export default App;