import React from 'react';

class RatingBreakdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sumRatingBreakdown: { '1': 0, '2': 0, '3': 0, '4': 0, '5': 0 },
      pctRatingBreakdown: { '1': 0, '2': 0, '3': 0, '4': 0, '5': 0 },
      countRecommendations: 0
    }
    this.getSumRatingBreakdown=this.getSumRatingBreakdown.bind(this)
  }

  getSumRatingBreakdown() {
    let sumRatingBreakdown = { '1': 0, '2': 0, '3': 0, '4': 0, '5': 0 };
    let pctRatingBreakdown = { '1': "0%", '2': "0%", '3': "0%", '4': "0%", '5': "0%" };
    let countRecommendations = 0;
    for (var i = 0; i < this.props.reviews.length; i++) {
      sumRatingBreakdown[this.props.reviews[i].rating] = sumRatingBreakdown[this.props.reviews[i].rating] + 1;
      if (this.props.reviews[i].recommend === true) {
        countRecommendations += 1;
      }
    }
    for (i in pctRatingBreakdown) {
      if (sumRatingBreakdown[i] === 0) {
        pctRatingBreakdown[i];
      } else {
        pctRatingBreakdown[i] = (sumRatingBreakdown[i] / this.props.reviews.length) * 100
      }
    }
    this.setState({
      sumRatingBreakdown: sumRatingBreakdown,
      pctRatingBreakdown: pctRatingBreakdown,
      countRecommendations: countRecommendations
    })
  }

  componentDidMount() {
    this.setState(this.getSumRatingBreakdown())
  }

  render() {
    if (this.props.reviews.length === 0) {
      return '';
    }

    let pctStyle5 = { width: this.state.pctRatingBreakdown['5'] + '%' }
    let pctStyle4 = { width: this.state.pctRatingBreakdown['4'] + '%' }
    let pctStyle3 = { width: this.state.pctRatingBreakdown['3'] + '%' }
    let pctStyle2 = { width: this.state.pctRatingBreakdown['2'] + '%' }
    let pctStyle1 = { width: this.state.pctRatingBreakdown['1'] + '%' }
    let pctRecommended = Math.round(this.state.countRecommendations / this.props.reviews.length * 100) + '%'

    return (

      <div>
        <div className="row responseText"><strong>Rating Breakdown</strong></div>
        <div className="ratingBreakdown" style={{ display: this.props.filter.length !== 0 ? "block" : "none" }}>
          <em >filtered by:&nbsp;</em>
            {this.props.filter.map(filter => (
              <span key={filter}>{filter}&nbsp;stars&nbsp;&nbsp;</span>
            ))}
          <div className="clearAll" onClick={() => this.props.onClearAll()} ><em>clear all</em></div>
        </div>
        <div className="row"><div className="bar-text">5 stars</div><div className="bar-container" onClick={() => this.props.onToggle(5)}><div className="bar-5" style={pctStyle5}></div></div><div className="bar-text floatRight">{this.state.sumRatingBreakdown['5']}</div></div>
        <div className="row"><div className="bar-text">4 stars</div><div className="bar-container" onClick={() => this.props.onToggle(4)}><div className="bar-4" style={pctStyle4}></div></div><div className="bar-text floatRight">{this.state.sumRatingBreakdown['4']}</div></div>
        <div className="row"><div className="bar-text">3 stars</div><div className="bar-container" onClick={() => this.props.onToggle(3)}><div className="bar-3" style={pctStyle3}></div></div><div className="bar-text floatRight">{this.state.sumRatingBreakdown['3']}</div></div>
        <div className="row"><div className="bar-text">2 stars</div><div className="bar-container" onClick={() => this.props.onToggle(2)}><div className="bar-2" style={pctStyle2}></div></div><div className="bar-text floatRight">{this.state.sumRatingBreakdown['2']}</div></div>
        <div className="row"><div className="bar-text">1 star</div><div className="bar-container" onClick={() => this.props.onToggle(1)}><div className="bar-1" style={pctStyle1}></div></div><div className="bar-text floatRight">{this.state.sumRatingBreakdown['1']}</div></div>
        <br></br>
        <div className="recommend" style={{ display: this.state.countRecommendations !== 0 ? "block" : "none" }}>{pctRecommended}&nbsp;Recommend this Product!!</div>
      </div>
    );
  }
}

export default RatingBreakdown;