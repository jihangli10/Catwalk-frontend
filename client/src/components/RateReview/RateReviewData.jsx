import React from 'react';
import axios from 'axios';
import RateReview from './RateReview';
// 19091 HAS NO REVIEWS
// 19093 HAS 2 REVIEWS
// 19191 HAS 5 REVIEWS
// 19090 HAS A RESPONSE

class RateReviewData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: [],
      currentReview: {}
      // reviewFilter - array of selected stars
      // filter reviews if reviewFilter includes individual review rating

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
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {

    return (
      <div>
        <RateReview
          key={'reviews' + this.state.reviews.length}
          reviews={this.state.reviews}
          currentReview={this.state.currentReview}
        />

      </div>
    );
  }
}

export default RateReviewData;