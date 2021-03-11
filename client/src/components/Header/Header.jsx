import React from 'react';
import HeaderSearch from './HeaderSearch';

class Header extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return(

      <div className="projectCatHeader">
        <div className="logoText">PROJECT CATWALK</div>
        <div className="header-search">
         <HeaderSearch />
        </div>
      </div>
    )
  }

}


export default Header;


