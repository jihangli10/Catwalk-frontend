import React from "react";

class ImageComponent extends React.Component {
  constructor(props) {
    super(props);
  this.state = {
    isOpen: false,
    photo: props.photo
  };
  this.handleShowDialog = this.handleShowDialog.bind(this);
}

  handleShowDialog() {
    this.setState({ isOpen: !this.state.isOpen });
    console.log("clicked");
  };

  render() {
    return (
      <div >
        <img
          className="imgContainer imgReview"
          src={this.state.photo.url}
          onClick={this.handleShowDialog}
          alt="no image"
        />
        {this.state.isOpen && (
          <dialog
            className="dialogNew"
            open
            onClick={this.handleShowDialog}
          >
            <img
              className="image imgReview"
              src={this.state.photo.url}
              onClick={this.handleShowDialog}
              alt={this.state.photo.id}
            />
            <form method="dialog">
              <button>Close</button>
            </form>
          </dialog>
        )}
      </div>
    );
  }
}

export default ImageComponent;