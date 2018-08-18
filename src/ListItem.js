import React from 'react';

const ListItem = ({ listitem }) => {
  return (
    <tr className='item-container'>
      <td>{listitem.name}</td>
      <td>{listitem.amount}</td>
    </tr>
  )
};

export default ListItem;
