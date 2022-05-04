import React from 'react';

const FriendItem = ({ item, onDel }) => {
  const userName = item;
  return (
    <li>
      <div>
        <strong>{userName}</strong>
        <button onClick={() => onDel(userName)}>팔로우 취소</button>
      </div>
    </li>
  );
};

export default FriendItem;
