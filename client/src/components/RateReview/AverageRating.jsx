import React from 'react';
import StarRatings from './StarRatings';
import reviews from '../../data/reviews';



class AverageRating extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    average: 3.25
    }
  }

  render() {

    return (
            <div>
            <span className="average">{this.state.average}&nbsp;</span>
            <StarRatings rating={this.state.average} />
            </div>
    );
  }
}

export default AverageRating;