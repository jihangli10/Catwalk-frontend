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
        <div className="relModal"></div>

      );
    }

  }
}

export default RelatedModal;