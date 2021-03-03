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
        <h2>Modal Window</h2>
        <div className="ModalContent">{this.props.children}</div>
        <div className="modalCloseBtn">
          <button onClick={this.props.handleClose} className="toggle-button" >
            close
          </button>
        </div>
      </div>
      );
    }

  }
}

export default RelatedModal;