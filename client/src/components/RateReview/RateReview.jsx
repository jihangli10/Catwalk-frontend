import React from 'react';
import StarRatings from './StarRatings';
import ReviewsBar from './ReviewsBar';
import AverageRating from './AverageRating';
import ReviewsSliders from './ReviewsSliders';
import ReviewList from './ReviewList';

class RateReviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    reviews: []
    }
  }

  render() {

    return (

      <div id="ratingreviewcontainer" className="row">
        <div className="rrstats break-column">
          <div>
            <AverageRating /><StarRatings />
          </div>

          <div id="bar-section">
          <ReviewsBar />
          </div>

            <div id="slide-section">
            <ReviewsSliders />
            </div>

        </div>
        <div className="gap">
        </div>


        <div className="reviewlist">
          <ReviewList />
        </div>

      </div>

    );
  }
}

export default RateReviews;