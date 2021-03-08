import React from 'react';
import reviews from '../../data/reviews';
import StarRatings from './StarRatings';
import ImageComponent from './ReviewListImages';
import ReviewListImages from './ReviewListImages';
import RatingHelpful from './RatingHelpful';

class ReviewListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
    this.getReviewBody = this.getReviewBody.bind(this);
    this.toggleReviewBody = this.toggleReviewBody.bind(this);
  }

  toggleReviewBody() {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen
    }));
  }

  getReviewBody(string) {
    if (this.state.isOpen) {
      return string;
    }
    return string.substring(0, 250);
  }


  render() {
    var review = this.props.reviewListItem;

    return (

      <div id="reviewListTiles">
        <div key={review.review_id}>
          <span className="floatRight"> <i className="fas fa-user-check qanda-fa-user-check"></i>&nbsp; {review.reviewer_name},&nbsp;{(new Date(review.date).toDateString().slice(4))} </span><StarRatings
            className="floatLeft listStars" rating={review.rating} />
          <br></br>
          <div className="reviewSummary"><strong>{review.summary.substring(0, 60)}</strong></div>
          <div>
            {this.getReviewBody(review.body)}
            <div className="readMore" style={{ display: review.body.length > 250 ? "block" : "none" }} onClick={this.toggleReviewBody}>
              {this.state.isOpen ? ' ... less' : ' ... more'}
            </div>
            <div className="recommend" style={{ display: review.recommend ? "block" : "none" }}>&#10003; I recommend this product</div>
            <div className="response" style={{ display: review.response ? "block" : "none" }}><span className="responseText"><strong>Response: </strong><br></br>{review.response}</span></div>
          </div>
          <ReviewListImages
            photos={review.photos}
             />
          <br></br><br></br>
        </div>
        <RatingHelpful helpfulness={review.helpfulness} reviewID={review.review_id} />
        <br></br>
      </div>
    );
  }
}

export default ReviewListItem;