import React from 'react';
import ReactDOM from 'react-dom';

class ModalTableRows extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      commonCharacteristics: [],
      hasLoaded: false
    }
    this.getCommonCharacteristics = this.getCommonCharacteristics.bind(this);
  }

  componentDidMount() {
    this.getCommonCharacteristics();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.selectedProd !== this.props.selectedProd) {
      this.getCommonCharacteristics();
    }
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