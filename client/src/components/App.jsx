import React from 'react';
import ReactDOM from 'react-dom';
import RelatedPO from './RelatedPO/RelatedPO.jsx';

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
  }

  render() {

    return (
      <div>
        <div>
          <h1>Main Page</h1>
        </div>
        <div>
          <h1>Product - Overview</h1>
        </div>
        <div>
          <RelatedPO currProd={this.state.currentProduct} />
        </div>
        <div>
          <h1>Questions and Answers</h1>
        </div>
        <div>
          <h1>Ratings and Reviews</h1>
        </div>
      </div>
    );
  }
}

export default App;