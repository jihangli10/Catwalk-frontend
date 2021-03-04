import React from 'react';
import axios from 'axios';
import StarRatings from './StarRatings';
import ReviewsBar from './ReviewsBar';
import AverageRating from './AverageRating';
import ReviewsSliders from './ReviewsSliders';
import ReviewListSort from './ReviewListSort';

class RateReviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: [],
      currentReview: {}
    }
  }
  componentDidMount() {
    return axios.get('/reviews', { params: { product_id: this.props.currProd.id } })
      .then(data => {
        // console.log(data.data.results)
        this.setState({
          reviews: data.data.results,
          currentReview: data.data.results[0]
        })
        // 19091 HAS NO REVIEWS
        // 19093 HAS 2 REVIEWS
        // 19191 HAS 5 REVIEWS
        // 19090 HAS A RESPONSE

      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {

    return (
      <div>
        <button key={'reviews' + this.state.reviews.length} style={{ display: this.state.reviews.length === 0 ? "block" : "none" }} >ADD REVIEWS</button>
        <div style={{ display: this.state.reviews.length !== 0 ? "block" : "none" }}>

          <div id="ratingreviewcontainer" className="row">

            <div className="rrstats break-column">
              <div>
                <AverageRating key={'avgRaiting' + this.state.reviews.length} avgReviews={this.state.reviews} avgCurrent={this.state.currentReview} /><StarRatings />
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


            <div className="reviewListSort" >
              <ReviewListSort key={'reviews' + this.state.reviews.length}
                reviewListSort={this.state.reviews} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default RateReviews;