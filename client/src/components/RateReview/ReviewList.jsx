import React from 'react';
import reviews from '../../data/reviews';
import ReviewListItem from './ReviewListItem';
import axios from 'axios';

class ReviewList extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    if (this.props.displayReviews.length === 0) {
      return '';
    }
    if (this.props.reviews.length === 0) {
      return '';
    }

    return (
      <div>

        <form><strong>{this.props.reviews.length} reviews sorted by:</strong>
          <select name='sort' defaultValue={this.props.sort} onChange={this.props.onChange}>
            <option defaultValue>Relevant</option>
            <option>Helpful</option>
            <option>Newest</option>
          </select>
          <noscript><input type="submit" value="Submit" /></noscript>
        </form>

        <div className="reviewlist">
          <br></br>
          <br></br>
          <div id="reviewListTiles">
            <ul className="no-bullets">
              {console.log('DISPLAY REVIEWS AT REVIEW LIST ITEMS', this.props.displayReviews)}
              {this.props.displayReviews.map(review => (
                <li key={review.review_id} className="listrow">
                  <ReviewListItem reviewListItem={review} />
                </li>
              ))}
            </ul>
          </div>
        </div>


        <div id="question-button-row">
          <button style={{ display: this.props.reviews.length >= this.props.numberDisplayed ? "inline" : "none" }} onClick={this.props.onClickAddMore}>MORE REVIEWS</button>&nbsp;&nbsp;
         <button key={'reviews' + this.props.reviews.length} style={{ display: this.props.reviews.length !== 0 ? "inline" : "none" }} onClick={this.props.onAddReviewClick}>ADD REVIEWS</button>
          {this.props.isOpen ? (<AddNewReview key={this.props.currProd.id} onAddReviewClick={this.props.onAddReviewClick} currProd={this.props.currentProduct} metaData={this.props.metaData} />) : null}
        </div>


      </div>
    );
  }
}

export default ReviewList;