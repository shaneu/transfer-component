import React from 'react';

const Operations = ({ moveToLeft, moveToRight, leftActive, rightActive }) => (
  <div className="transfer__buttons">
    <button onClick={moveToRight} id="right" disabled={!rightActive}>
      >
    </button>
    <button onClick={moveToLeft} id="left" disabled={!leftActive}>
      {'<'}
    </button>
  </div>
);

export default Operations;
