import React from 'react';
import StarRatings from './StarRatings';
import reviews from '../../data/reviews';



class AverageRating extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    average: 0
    }
    this.getAverage=this.getAverage.bind(this);
  }

    getAverage() {
      // console.log('this.props.avgReviews', this.props.avgReviews)
    let sumRating = 0;
    for (var i = 0; i < this.props.avgReviews.length; i++) {
      sumRating += this.props.avgReviews[i].rating
    }
    // console.log('sumRating', sumRating)
    this.setState({ average: (Math.round(sumRating /this.props.avgReviews.length * 4) / 4).toFixed(2)})
  }

  componentDidMount() {
    this.getAverage();
  }


  render() {
    if (this.props.avgReviews.length === 0) {
      return '';
    }
    return (

            <div>
            <span className="average">{this.state.average}&nbsp;</span>
        <StarRatings rating={this.state.average} />
            </div>
    );
  }
}

export default AverageRating;