import React from 'react';
import parse from 'html-react-parser';
import Star000 from './Star000.jsx';
import Star025 from './Star025.jsx';
import Star050 from './Star050.jsx';
import Star075 from './Star075.jsx';
import Star100 from './Star100.jsx';

class StarRatings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      starRatings: {

        '0.00': <div><Star000 /><Star000 /><Star000 /><Star000 /><Star000 /></div>,
        '0.25': <div><Star025 /><Star000 /><Star000 /><Star000 /><Star000 /></div>,
        '0.50': <div><Star050 /><Star000 /><Star000 /><Star000 /><Star000 /></div>,
        '0.75': <div><Star075 /><Star000 /><Star000 /><Star000 /><Star000 /></div>,
        '1.00': <div><Star100 /><Star000 /><Star000 /><Star000 /><Star000 /></div>,
        '1.25': <div><Star100 /><Star025 /><Star000 /><Star000 /><Star000 /></div>,
        '1.50': <div><Star100 /><Star050 /><Star000 /><Star000 /><Star000 /></div>,
        '1.75': <div><Star100 /><Star075 /><Star000 /><Star000 /><Star000 /></div>,
        '2.00': <div><Star100 /><Star100 /><Star000 /><Star000 /><Star000 /></div>,
        '2.25': <div><Star100 /><Star100 /><Star025 /><Star000 /><Star000 /></div>,
        '2.50': <div><Star100 /><Star100 /><Star050 /><Star000 /><Star000 /></div>,
        '2.75': <div><Star100 /><Star100 /><Star075 /><Star000 /><Star000 /></div>,
        '3.00': <div><Star100 /><Star100 /><Star100 /><Star000 /><Star000 /></div>,
        '3.25': <div><Star100 /><Star100 /><Star100 /><Star025 /><Star000 /></div>,
        '3.50': <div><Star100 /><Star100 /><Star100 /><Star050 /><Star000 /></div>,
        '3.75': <div><Star100 /><Star100 /><Star100 /><Star075 /><Star000 /></div>,
        '4.00': <div><Star100 /><Star100 /><Star100 /><Star100 /><Star000 /></div>,
        '4.25': <div><Star100 /><Star100 /><Star100 /><Star100 /><Star025 /></div>,
        '4.50': <div><Star100 /><Star100 /><Star100 /><Star100 /><Star050 /></div>,
        '4.75': <div><Star100 /><Star100 /><Star100 /><Star100 /><Star075 /></div>,
        '5.00': <div><Star100 /><Star100 /><Star100 /><Star100 /><Star100 /></div>
      }
    }
  }

  // rounds number to nearest number
  roundToNearestQuarter(number) {
    return (Math.round(number * 4) / 4).toFixed(2);
  }


  render() {

    return (
      <span>{this.state.starRatings[(Math.round(this.props.rating * 4) / 4).toFixed(2)]}</span>
    );
  }
}

export default StarRatings;