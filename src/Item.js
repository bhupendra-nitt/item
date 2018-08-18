import React from 'react';

const Item = (props) => {
  const { shouldRender, addItem, value, name, handleValueChange, handleNameChange, error } = props;
  if(shouldRender) {
    return (
      <div>
        <input value={name} onChange={(e) => handleNameChange(e.target.value)}/>
        <input value={value} onChange={(e) => handleValueChange(e.target.value)}/>
        {
          error && <div className='error'>{error}</div>
        }
        {!error && <button onClick={addItem}> Add</button>}
      </div>
    );
  }
  return null;
};

export default Item;