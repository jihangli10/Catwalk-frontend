import React from 'react';
import reviews from '../../data/reviews';
import ReviewListItem from './ReviewListItem';
import axios from 'axios';

class ReviewList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: 0
    };
    this.handleDisplay=this.handleDisplay.bind(this)
  }

  componentDidMount() {
    if (this.props.reviewList.length <= 2) {
      this.setState({
        display: this.props.reviewList.length
      })
  } else {
      this.setState({
        display: 2
      })
  }
  }

  handleDisplay () {
    this.setState(prevState => ({
      display: prevState.display + 2
    }))
  }

  // button Add More if displayReviews.length === this.props.reviewList.length




  render() {
    var displayReviews = this.props.reviewList.slice(0, this.state.display)
    var revListLength = this.props.reviewList.length
    if (this.props.reviewList.length === 0) {
      return '';
    }
    return (

      <div className="reviewlist">
        <br></br>
        <br></br>
        <div id="reviewListTiles">
          <ul className="no-bullets">
            {displayReviews.map(review => (
              <li key={review.review_id} className="listrow">
                <ReviewListItem reviewListItem={review} />
              </li>
            ))}
            </ul>
          <button style={{ display: revListLength > this.state.display && revListLength > 2 ? "block" : "none" }} onClick={this.handleDisplay}>MORE REVIEWS</button>

        </div>
      </div>
    );
  }
}

export default ReviewList;