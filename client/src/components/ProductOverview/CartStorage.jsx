import React from 'react';

var CartStorage = ({ cartModal, cartStorageSize }) => (
  <div className='cartImage'>
    <button onClick={cartModal}>
      <div className='miniContainer'>
        <i className="fas overview-fas fa-shopping-cart"></i>

        {cartStorageSize}
      </div></button>
  </div>
)

export default CartStorage