import React from 'react';
import reviews from '../../data/reviews';
import ReviewListItems from './ReviewListItems';
import axios from 'axios';

class ReviewList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
     currentReview: {},
    //  isOpen: false,
     display: 5,
     displayReviews: [],
    };
    // this.getReviewBody = this.getReviewBody.bind(this);
    // this.toggleReviewBody = this.toggleReviewBody.bind(this);
    // this.handleDisplay = this.handleDisplay.bind(this);
    // this.handleDisplayLess = this.handleDisplayLess.bind(this);
  }

  handleDisplay () {
    // if (this.props.reviews.length - this.state.display <= 2) {
    //   this.setState({ display: reviews.length })
    //   this.setState({ displayReviews: this.state.reviews.slice(0, this.state.display) });
    // }
    // this.setState( (prevState) => {
    //   return {
    //     display: prevState.dispay + 2,
    //     displayReviews: this.state.reviews.slice(0, this.state.display)
    //   }
    // })
    this.setState({
      displayReviews: this.props.reviewList,
      currentReview: this.props.reviewList[0]
    })
  }
  // handleDisplayLess() {
  //   if (reviews.length - this.state.display <= 2) {
  //     return;
  //   }
  //   this.setState((prevState) => {
  //     return { display: prevState.dispay - 2,
  //       displayReviews: this.state.reviews.slice(0, this.state.display)
  //      }
  //   })
  // }

  // componentDidMount() {
  //   return axios.get('/reviews', { params: { product_id: 19090 } })
  //     .then(data => {
  //       this.setState({
  //         reviews: data.data.results
  //       })
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  //     this.handleDisplay();
  // }

  render() {


    return (
      <div className="reviewlist">
        <div><strong>248 reviews sorted by: relevance</strong></div>
        <br></br>
        <br></br>
        <div id="reviewListTiles">
          <ul className="no-bullets">
            {this.props.reviewList.map(review => (
              <li key={review.review_id} className="listrow">
                <ReviewListItems reviewListItem={review} />
                <br></br>
                <br></br>
              </li>
            ))}
            </ul>
        </div>
      </div>
    );
  }
}

export default ReviewList;