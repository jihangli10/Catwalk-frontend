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

    let loseNulls = [];
    noDupes.forEach(item => {
      if (parent[item] || select[item]) {
        loseNulls.push(item);
      }
    });

    this.setState({
      commonFeatures: loseNulls,
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


  render() {
    let common = this.state.commonCharacteristics;
    let p = this.props.pReviews.characteristics;
    let s = this.props.sReviews.characteristics;

    let features = this.state.commonFeatures;
    let pFeat = this.state.pFeatures;
    let sFeat = this.state.sFeatures;

    if (!this.state.hasLoaded) {
      return null;
    } else {
      return(
        <div className="tableContInner">
          <table className="modalTable">
              <tbody id="content">
                  <tr>
                    <th className="left-col">{this.props.parentProd.name}</th>
                    <th className="center-col"></th>
                    <th className="right-col">{this.props.selectProd.name}</th>
                  </tr>
          {features.map((feat, i) => {
            return(
              <tr className="tableRow" key={i}>
                <td className="left-col-inner">{(pFeat[feat] && pFeat[feat] !== null) ? pFeat[feat] : ''}</td>
                <td className="center-col">{feat}</td>
                <td className="right-col-inner">{(sFeat[feat] && sFeat[feat] !== null) ? sFeat[feat] : ''}</td>
              </tr>
            )
          })}
          {common.map((char, i) => {
            return(
              <tr className="tableRow" key={i}>
                <td className="left-col-inner">{(p[char] && p[char].value !== null) ? parseInt(p[char].value).toFixed(0) : ''}</td>
                <td className="center-col">{char}</td>
                <td className="right-col-inner">{(s[char] && s[char].value !== null) ? parseInt(s[char].value).toFixed(0) : ''}</td>
              </tr>
            )
          })}
            </tbody>
          </table>
        </div>


     );
    }


  }
}

export default ModalTableRows;