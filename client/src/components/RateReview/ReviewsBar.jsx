import React from 'react';

class ReviewsBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    reviews: []
    }
  }

  render() {

    return (

          <div>
            <span className="row">100% of reviews recommend this product</span>
            <br></br>
            <div className="row"><div className="bar-text">5 stars</div><div className="bar-container"><div className="bar-5"></div></div></div>
            <div className="row"><div className="bar-text">4 stars</div><div className="bar-container"><div className="bar-4"></div></div></div>
            <div className="row"><div className="bar-text">3 stars</div><div className="bar-container"><div className="bar-3"></div></div></div>
            <div className="row"><div className="bar-text">2 stars</div><div className="bar-container"><div className="bar-2"></div></div></div>
            <div className="row"><div className="bar-text">1 star</div><div className="bar-container"><div className="bar-1"></div></div></div>
          </div>
    );
  }
}

export default ReviewsBar;