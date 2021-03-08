import React from 'react';
import StarRatings from '.././RateReview/StarRatings.jsx';


let POAvgRating = (props) => {

    if (props.average === 0) {
      return null;
    }
    return (
      <div>
        <StarRatings rating={props.average} />
      </div>
    );
}

export default POAvgRating;