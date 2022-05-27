import React, { useRef, useState } from 'react';
import FriendList from '../component/FriendList';

const Friends = () => {
    const [friend, setFriend] = useState()
    
    const onDel = (userName) => {
      setFriend(friend.filter(friend => friend.userName !== userName))
    }
  return (
    <div>
      <div>
        <FriendList  friend={friend} onDel={onDel}/>
      </div>
    </div>
  );
}

export default Friends;
