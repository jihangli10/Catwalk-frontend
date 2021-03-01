import React from 'react';
import ReactDOM from 'react-dom';
import RateReview from './RateReview/RateReview.jsx'
import Star000 from './RateReview/Star000.jsx'
import Star025 from './RateReview/Star025.jsx'
import Star050 from './RateReview/Star050.jsx'
import Star075 from './RateReview/Star075.jsx'
import Star100 from './RateReview/Star100.jsx'
import StarRatings from './RateReview/StarRatings'
import products from '../data/products'
import reviews from '../data/reviews'


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: products,
      currentProduct: products[0]
    }
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