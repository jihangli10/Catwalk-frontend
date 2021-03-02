import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class RelatedModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      parentProdStyles: this.props.parentStyle,
      selectedProdStyles: this.props.selectedStyle,
    }
  }


  render() {
    if (!this.props.show) {
      return null;
    } else {
      return(
        <div className="relModal" id="modal">
          <div className="modalToggle">
            <img onClick={this.props.handleClose} className="toggle-button" src="https://img.icons8.com/plumpy/24/000000/macos-close.png"/>
            <div id="modalHeader">
              COMPARING
            </div>
          </div>
          <div className="tableCont">
            <table className="modalTable">
              <tbody id="content">
                  <tr>
                      <th className="left-col">{this.props.parentProd.name}</th>
                      <th className="center-col"></th>
                      <th className="right-col">{this.props.selected.name}</th>
                  </tr>
                  <tr>
                      <th className="left-col">{this.props.parentProd.id}</th>
                      <th className="center-col"></th>
                      <th className="right-col">{this.props.selected.id}</th>
                  </tr>
              </tbody>
            </table>
          </div>
        </div>
      );
    }
  }
}

export default RelatedModal;