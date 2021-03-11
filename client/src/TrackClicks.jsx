import React from 'react';

const TrackClicks = WrappedComponent => {
  return class Click extends React.Component {
    onClick() {
      console.log('clicked')
    }

    render() {
        return (
            <WrappedComponent
                onClick={this.onClick.bind(this)}
            />
        );
    }
  };
};

export default TrackClicks;