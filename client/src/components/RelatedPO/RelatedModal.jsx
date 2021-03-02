import React from 'react';
import ReactDOM from 'react-dom';


class RelatedModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

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
          <div>
            <table className="modalTable">
              <tbody id="content">
                  <tr>
                      <th>{this.props.parentProd.name}</th>
                      <th>{this.props.selected.name}</th>
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