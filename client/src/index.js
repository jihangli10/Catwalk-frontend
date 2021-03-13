import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';
import TrackClicks from './TrackClicks.jsx';


ReactDOM.render(React.createElement(TrackClicks(App)), document.getElementById('app'));