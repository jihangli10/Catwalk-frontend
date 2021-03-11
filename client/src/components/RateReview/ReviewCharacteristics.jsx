import React from 'react';

class ReviewCharacteristics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  // sliderfunc() {
  //   var slider = document.getElementById("size");
  //   var output = document.getElementById("demo");
  //   output.innerHTML = slider.value; // Display the default slider value
  //   // test for change
  //   // Update the current slider value (each time you drag the slider handle)
  //   slider.oninput = function () {
  //     output.innerHTML = this.value;
  //   }
  // }

  render() {
    if (this.props.metaData === undefined) {
      return '';
    }

    let myBarSize = this.props.metaData.Size ? { width: Math.round((this.props.metaData.Size.value / 5 * 100)) + '%' } : { width: '0%' }
    let myBarLength = this.props.metaData.Length ? { width: Math.round((this.props.metaData.Length.value / 5 * 100)) + '%' } : { width: '0%' }
    let myBarWidth = this.props.metaData.Width ? { width: Math.round((this.props.metaData.Width.value / 5 * 100)) + '%' } : { width: '0%' }
    let myBarFit = this.props.metaData.Fit ? { width: Math.round((this.props.metaData.Fit.value / 5 * 100)) + '%' } : { width: '0%' }
    let myBarComfort = this.props.metaData.Comfort ? { width: Math.round((this.props.metaData.Comfort.value / 5 * 100)) + '%' } : { width: '0%' }
    let myBarQuality = this.props.metaData.Quality ? { width: Math.round((this.props.metaData.Quality.value / 5 * 100)) + '%' } : { width: '0%' }
    return (
      <div>
        <div className="row responseText"><strong>Characteristics</strong></div>
        <div>
          <div className="scaleText" style={{ display: this.props.metaData.Size ? "block" : "none" }}>SIZE
          <div id="myProgress">
            <div style={myBarSize} id="myBar"><i className="fas fa-caret-down fa-3x"></i></div>
          </div>
          <table className="tableScale"><tbody>
            <tr><td className="tdL">Too Small</td><td className="tdC">Perfect</td><td className="tdR">Too Big</td></tr>
          </tbody></table>
          </div>
          <br></br>
          <div className="scaleText" style={{ display: this.props.metaData.Length ? "block" : "none" }}>LENGTH
          <div id="myProgress">
            <div style={myBarLength} id="myBar"><i className="fas fa-caret-down fa-3x"></i></div>
          </div>
          <table className="tableScale"><tbody>
            <tr><td className="tdL">Too Short</td><td className="tdC">Perfect</td><td className="tdR">Too Long</td></tr>
          </tbody></table>
          </div>
          <br></br>
          <div className="scaleText" style={{ display: this.props.metaData.Width ? "block" : "none" }}>WIDTH
          <div id="myProgress">
            <div style={myBarWidth} id="myBar"><i className="fas fa-caret-down fa-3x"></i></div>
          </div>
          <table className="tableScale"><tbody>
            <tr><td className="tdL">Too Narrow</td><td className="tdC">Perfect</td><td className="tdR">Too Wide</td></tr>
          </tbody></table>
          </div>
          <br></br>
          <div className="scaleText" style={{ display: this.props.metaData.Fit ? "block" : "none" }}>FIT
          <div id="myProgress">
            <div style={myBarFit} id="myBar"><i className="fas fa-caret-down fa-3x"></i></div>
          </div>
          <table className="tableScale"><tbody>
            <tr><td className="tdL">Bad</td><td className="tdC"></td><td className="tdR">Good</td></tr>
          </tbody></table>
          </div>
          <br></br>
          <div className="scaleText" style={{ display: this.props.metaData.Comfort ? "block" : "none" }}>COMFORT
          <div id="myProgress">
            <div style={myBarComfort} id="myBar"><i className="fas fa-caret-down fa-3x"></i></div>
          </div>
          <table className="tableScale"><tbody>
            <tr><td className="tdL">Uncomfortable</td><td className="tdC"></td><td className="tdR">Comfortable</td></tr>
          </tbody></table>
          </div>
          <br></br>
          <div className="scaleText" style={{ display: this.props.metaData.Comfort ? "block" : "none" }}>QUALITY
          <div id="myProgress">
            <div style={myBarQuality} id="myBar"><i className="fas fa-caret-down fa-3x"></i></div>
          </div>
          <table className="tableScale"><tbody>
            <tr><td className="tdL">Poor</td><td className="tdC"></td><td className="tdR">Good</td></tr>
          </tbody></table>
          </div>

        </div>


      </div>
    );
  }
}

export default ReviewCharacteristics;