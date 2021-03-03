import React from 'react';
import axios from 'axios';
import StarRatings from './StarRatings';
import ReviewsBar from './ReviewsBar';
import AverageRating from './AverageRating';
import ReviewsSliders from './ReviewsSliders';
import ReviewList from './ReviewList';

class RateReviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    reviews: [],
    currentReview: {}
    }
  }
  componentDidMount() {
    return axios.get('/reviews', { params: { product_id: 19090 } })
      .then(data => {
       // console.log(data.data.results)
        this.setState({
          reviews: data.data.results,
          currentReview: data.data.results[0]
        })
        //console.log('this.state.currentReview', this.state.currentReview)
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {

    return (

      <div id="ratingreviewcontainer" className="row">
        <div className="rrstats break-column">
          <div>
            <AverageRating key={'avgRaiting' + this.state.reviews.length} avgReviews={this.state.reviews} avgCurrent={this.state.currentReview}/><StarRatings />
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
          <ReviewList key={'reviews' + this.state.reviews.length}
          reviewList={this.state.reviews}/>
        </div>

      </div>

    );
  }
}

export default RateReviews;