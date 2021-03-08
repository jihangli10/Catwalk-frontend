import React from 'react';

var CartStorage = ({ modalMode, cartStorageSize }) => (
  <div className='cartImage'>
    <button onClick={modalMode}>
      <div className='miniContainer'>
        <i className="fas overview-fas fa-shopping-cart"></i>

        {cartStorageSize}
      </div></button>
  </div>
)

export default CartStorage