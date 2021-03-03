import React from 'react';
import reviews from '../../data/reviews';
import ImageComponent from './ImageComponent'


class ReviewListImages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: props.photos
    };
  }

  render() {

    return (
      <div>
        <div id="reviewListImages">

            {this.state.photos.map(photo => (
              <div key={photo.id}>
              <ImageComponent photo={photo} />
              </div>
            ))}

        </div>
      </div>
    );
  }
}

export default ReviewListImages;