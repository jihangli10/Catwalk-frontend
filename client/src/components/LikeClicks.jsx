import React from 'react';

class Like extends React.Component {

  state = {
    like: 0
  }

  handleLikeChange = () => {
    this.setState(prevState => ({
      like: prevState.like + 1
    }))
  }

  render() {
    return (
      <div onClick={this.handleLikeChange}>{this.state.like}</div>
 }
}
