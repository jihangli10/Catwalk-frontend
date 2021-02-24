import React from 'react';
import ReactDOM from 'react-dom';

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
      currentProduct: {}
    };
  }

  render() {

    return (
      <div>
      <h1>Main Page</h1>
      </div>
      <div>
      <h1>Product - Overview</h1>
      </div>
      <div>
      <h1>Related Products and Your Outfits</h1>
      </div>
      <div>
      <h1>Questions and Answers</h1>
      </div>
      <div>
      <h1>Ratings and Reviews</h1>
      </div>
    );
  }
}

export default App;