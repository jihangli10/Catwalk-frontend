import React from 'react';
import axios from 'axios';
import StarRatings from './StarRatings';
import AverageRating from './AverageRating';
import RatingBreakdown from './RatingBreakdown';
import ReviewsSliders from './ReviewsSliders';
import ReviewListSort from './ReviewListSort';

// import RateReviewMeta from './RateReviewMeta';

class RateReviews extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div>
        <button key={'reviews' + this.props.rateReviews.length} style={{ display: this.props.rateReviews.length === 0 ? "block" : "none" }} >ADD REVIEWS</button>
        <div style={{ display: this.props.rateReviews.length !== 0 ? "block" : "none" }}>

          <div id="ratingreviewcontainer" className="row">

            <div className="rrstats break-column">
              <div>
                <AverageRating key={'avgRaiting' + this.props.rateReviews.length} avgReviews={this.props.rateReviews} /><StarRatings />
              </div>

              <div id="bar-section">
                <RatingBreakdown
                  key={'reviews' + this.props.rateReviews.length}
                  ratingBreakdowns={this.props.rateReviews}
                  reviews={this.props.reviews}
                  filter={this.props.filter}
                  onToggleFunc={this.props.onToggleClick}
                  onClearAllFunc={this.props.onClearAllClick}
                />
              </div>

              <div id="slide-section">
                <ReviewsSliders
                characteristics={this.props.metaData}
                key={'metaData' + this.props.metaData.length}/>
              </div>

            </div>
            <div className="gap">
            </div>


            <div className="reviewListSort" >
              <ReviewListSort key={'reviews' + this.props.rateReviews.length}
                reviewListSort={this.props.rateReviews} reviewProduct={this.props.reviewProd} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default RateReviews;