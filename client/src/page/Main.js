import React from 'react';
import Navbar from '../component/Navbar';
import main from '../image/main.svg'

const Main = () => {
  return (
    <div>
      <Navbar/>
      <img src={main} alt="main-image"></img>
    </div>
  );
}

export default Main;
