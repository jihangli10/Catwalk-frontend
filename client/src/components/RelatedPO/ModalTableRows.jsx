import React from 'react';
import ReactDOM from 'react-dom';

class ModalTableRows extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      commonCharacteristics: [],
      commonFeatures: [],
      pFeatures: {},
      sFeatures: {},
      hasLoaded: false
    }
    this.getCommonCharacteristics = this.getCommonCharacteristics.bind(this);
    this.getCommonFeatures = this.getCommonFeatures.bind(this);
    this.determineFeatureVal = this.determineFeatureVal.bind(this);
  }

  componentDidMount() {
    this.getCommonCharacteristics();
    this.getCommonFeatures();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.selectProd !== this.props.selectProd) {
      this.getCommonCharacteristics();
      this.getCommonFeatures();
    }
  }

  getCommonFeatures() {
    let p = this.props.parentProd.features;
    let s = this.props.selectProd.features;

    let parent = p.reduce((acc, item) => {
      acc[item.feature] = item.value ? item.value.slice(1, item.value.length - 1) : item.value;
      return acc;
    }, {});

    let select = s.reduce((acc, item) => {
      acc[item.feature] = item.value ? item.value.slice(1, item.value.length - 1) : item.value;
      return acc;
    }, {});

    let pFeatures = Object.keys(parent);
    let sFeatures = Object.keys(select);
    let combined = pFeatures.concat(sFeatures);
    let noDupes = new Set(combined);
    noDupes = [...noDupes];

    this.setState({
      commonFeatures: noDupes,
      pFeatures: parent,
      sFeatures: select
    });
  }


  getCommonCharacteristics() {
    let parent = Object.keys(this.props.pReviews.characteristics);
    let select = Object.keys(this.props.sReviews.characteristics);
    let combined = parent.concat(select);
    let noDupes = new Set(combined);
    noDupes = [...noDupes];
    this.setState({
      commonCharacteristics: noDupes,
      hasLoaded: true
    })
  }

  determineFeatureVal(obj, key, check) {
    let val;
    if (obj[key] && obj[key] !== null) {
      val = obj[key];
    } else if (obj[key] === null) {
      val = check;
    } else {
      val = '';
    }
    return val;
  }


  render() {
    let common = this.state.commonCharacteristics;
    let p = this.props.pReviews.characteristics;
    let s = this.props.sReviews.characteristics;

    let features = this.state.commonFeatures;
    let pFeat = this.state.pFeatures;
    let sFeat = this.state.sFeatures;
    let check = <img style={{height: '14px', width: '14px'}} src="https://img.icons8.com/metro/26/000000/checkmark.png"/>;

    if (!this.state.hasLoaded) {
      return null;
    } else {
      return(
        <div>
            <div className="modalProductNames">
              <div className="leftName">{this.props.parentProd.name}</div>
              <div className="rightName">{this.props.selectProd.name}</div>
            </div>
          <div className="tableContInner">
            <table className="modalTable">
                <tbody id="content">
            {features.map((feat, i) => {
              let parent = this.determineFeatureVal(pFeat, feat, check);
              let selected = this.determineFeatureVal(sFeat, feat, check);
              return(
                <tr className="tableRow" key={i}>
                  <td className="left-col-inner">{parent}</td>
                  <td className="center-col">{feat}</td>
                  <td className="right-col-inner">{selected}</td>
                </tr>
              )
            })}
            {common.map((char, i) => {
              return(
                <tr className="tableRow" key={i}>
                  <td className="left-col-inner">{(p[char] && p[char].value !== null) ? (Math.round(parseFloat(p[char].value) * 4) / 4).toFixed(2) : ''}</td>
                  <td className="center-col">{char}</td>
                  <td className="right-col-inner">{(s[char] && s[char].value !== null) ? (Math.round(parseFloat(s[char].value) * 4) / 4).toFixed(2) : ''}</td>
                </tr>
              )
            })}
              </tbody>
            </table>
          </div>
        </div>


     );
    }


  }
}

export default ModalTableRows;