import React from 'react';
import ReactDOM from 'react-dom';
import RateReview from './RateReview/RateReview.jsx'
import StarRatings from './RateReview/RateReview.jsx'


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
          <br></br>
          <div className="section">YOUR OUTFITS</div>
          <br></br>
        </div>
        <div>
          <br></br>
          <div className="section">QUESTION AND ANSWERS</div>
          <br></br>
        </div>
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