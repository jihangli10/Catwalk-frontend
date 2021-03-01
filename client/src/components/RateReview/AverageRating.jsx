import React from 'react';
import StarRatings from './StarRatings'



class AverageRating extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    average: 0
    }
  }

  render() {

    return (

            <span className="average">3.25&nbsp;</span>

    );
  }
}

export default AverageRating;