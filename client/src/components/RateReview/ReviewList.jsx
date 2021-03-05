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
    this.handleDisplay = this.handleDisplay.bind(this)
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

  handleDisplay() {
    this.setState(prevState => ({
      display: prevState.display + 2
    }))
    this.props.onGetCurrentDisplay(this.state.display  + 2);
  }

  // handlePassDisplay() {

  // }

  render() {
    var displayReviews = this.props.reviewList.slice(0, this.state.display)
    var revListLength = this.props.reviewList.length
    if (this.props.reviewList.length === 0) {
      return '';
    }
    return (

      <div className="reviewlist">
        {console.log('revListLength',revListLength, 'this.state.display', this.state.display)}
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

        </div>
      </div>
    );
  }
}

export default ReviewList;