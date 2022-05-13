import React from 'react';
import FriendItem from './FriendItem';

const FriendList = ({ friend, onDel }) => {
  return (
    <ul>
      {friend.map((item) => (
        <FriendItem key={item.userName} item={item} onDel={onDel} />
      ))}
    </ul>
  );
};

export default FriendList;
