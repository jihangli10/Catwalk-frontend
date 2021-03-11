import React from 'react';
import axios from 'axios';
import StarRatings from './StarRatings';
import AverageRating from './AverageRating';
import RatingBreakdown from './RatingBreakdown';
import ReviewCharacteristics from './ReviewCharacteristics';
import ReviewList from './ReviewList';
import AddNewReview from './AddNewReview';

// import RateReviewMeta from './RateReviewMeta';

class RateReviews extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div>
        <button key={'reviews' + this.props.displayReviews.length} style={{ display: this.props.displayReviews.length === 0 ? "block" : "none" }} >ADD REVIEWS</button>
        <div style={{ display: this.props.displayReviews.length !== 0 ? "block" : "none" }}>

          <div id="ratingreviewcontainer" className="row">

            <div className="rrstats break-column">
              <div>
                <AverageRating key={'avgRaiting' + this.props.reviews.length} reviews={this.props.reviews} /><StarRatings />
              </div>

               <div id="bar-section">
                <RatingBreakdown
                  key={'reviews' + this.props.reviews.length}
                  ratingBreakdowns={this.props.reviews}
                  reviews={this.props.reviews}
                  filter={this.props.filter}
                  onToggle={this.props.onToggle}
                  onClearAll={this.props.onClearAll}
                />
              </div>

              <div id="slide-section">
                <ReviewCharacteristics
                metaData={this.props.metaData}
                />
              </div>

            </div>
            <div className="gap">
            </div>


            <div className="reviewListSort" >
              <ReviewList
                onToggle={this.props.onToggle}
                onClearAll={this.props.onClearAll}
                sortByHelpful={this.props.sortByHelpful}
                sortByRelative={this.props.sortByRelative}
                sortByNewest={this.props.sortByNewest}
                onChange={this.props.onChange}
                onClickAddMore={this.props.onClickAddMore}
                onAddReviewClick={this.props.onAddReviewClick}
                reviews={this.props.reviews}
                filter={this.props.filter}
                displayReviews={this.props.displayReviews}
                sort={this.props.sort}
                numberDisplayed={this.props.numberDisplayed}
                isOpen={this.props.isOpen}
                metaData={this.props.metaData}
                currProd={this.props.currProd}

                />
            </div>


          </div>
        </div>
      </div>
    );
  }
}

export default RateReviews;