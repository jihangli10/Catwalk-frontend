import React from 'react';

class ReviewsSliders extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: []
    }
  }

  sliderfunc() {
    var slider = document.getElementById("size");
    var output = document.getElementById("demo");
    output.innerHTML = slider.value; // Display the default slider value
    // test for change
    // Update the current slider value (each time you drag the slider handle)
    slider.oninput = function () {
      output.innerHTML = this.value;
    }
  }


  render() {

    let meta = this.props.characteristics;
    let myBarSize = meta.Size ? { width: Math.round((meta.Size.value / 5 * 100)) + '%' } : { width: '0%' }
    let myBarLength = meta.Length ? { width: Math.round((meta.Length.value / 5 * 100)) + '%' } : { width: '0%' }
    let myBarWidth = meta.Width ? { width: Math.round((meta.Width.value / 5 * 100)) + '%' } : { width: '0%' }
    let myBarFit = meta.Fit ? { width: Math.round((meta.Fit.value / 5 * 100)) + '%' } : { width: '0%' }
    let myBarComfort = meta.Comfort ? { width: Math.round((meta.Comfort.value / 5 * 100)) + '%' } : { width: '0%' }
    let myBarQuality = meta.Quality ? { width: Math.round((meta.Quality.value / 5 * 100)) + '%' } : { width: '0%' }
    return (
      <div>
        <div className="row responseText"><strong>Characteristics</strong></div>
        <div>
          <div className="scaleText" style={{ display: meta.Size ? "block" : "none" }}>SIZE
          <div id="myProgress">
            <div style={myBarSize} id="myBar"><i className="fas fa-caret-down fa-3x"></i></div>
          </div>
          <table className="tableScale"><tbody>
            <tr><td className="tdL">Too Small</td><td className="tdC">Perfect</td><td className="tdR">Too Big</td></tr>
          </tbody></table>
          </div>
          <br></br>
          <div className="scaleText" style={{ display: meta.Length ? "block" : "none" }}>LENGTH
          <div id="myProgress">
            <div style={myBarLength} id="myBar"><i className="fas fa-caret-down fa-3x"></i></div>
          </div>
          <table className="tableScale"><tbody>
            <tr><td className="tdL">Too Short</td><td className="tdC">Perfect</td><td className="tdR">Too Long</td></tr>
          </tbody></table>
          </div>
          <br></br>
          <div className="scaleText" style={{ display: meta.Width ? "block" : "none" }}>WIDTH
          <div id="myProgress">
            <div style={myBarWidth} id="myBar"><i className="fas fa-caret-down fa-3x"></i></div>
          </div>
          <table className="tableScale"><tbody>
            <tr><td className="tdL">Too Narrow</td><td className="tdC">Perfect</td><td className="tdR">Too Wide</td></tr>
          </tbody></table>
          </div>
          <br></br>
          <div className="scaleText" style={{ display: meta.Fit ? "block" : "none" }}>FIT
          <div id="myProgress">
            <div style={myBarFit} id="myBar"><i className="fas fa-caret-down fa-3x"></i></div>
          </div>
          <table className="tableScale"><tbody>
            <tr><td className="tdL">Bad</td><td className="tdC"></td><td className="tdR">Good</td></tr>
          </tbody></table>
          </div>
          <br></br>
          <div className="scaleText" style={{ display: meta.Comfort ? "block" : "none" }}>COMFORT
          <div id="myProgress">
            <div style={myBarComfort} id="myBar"><i className="fas fa-caret-down fa-3x"></i></div>
          </div>
          <table className="tableScale"><tbody>
            <tr><td className="tdL">Uncomfortable</td><td className="tdC"></td><td className="tdR">Comfortable</td></tr>
          </tbody></table>
          </div>
          <br></br>
          <div className="scaleText" style={{ display: meta.Comfort ? "block" : "none" }}>QUALITY
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

export default ReviewsSliders;