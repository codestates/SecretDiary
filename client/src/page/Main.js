import React from 'react';

import main from '../image/main.svg'
import {  useState } from 'react';
const Main = () => {
  let [authenticate, setAuthenticate] = useState(false);
  return (
    <div>
      
      <img src={main} alt="main-image" authenticate={authenticate} setAuthenticate={setAuthenticate} ></img>
    </div>
  );
}

export default Main;
