import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const Navbar = ({ authenticate, setAuthenticate }) => {
  const navigate = useNavigate();
  const menuList = [
    '일기쓰기',
    '나의일기',
    '친구목록',
    '마이페이지',
    '로그아웃',
  ];
  let [width, setWidth] = useState(0);
  return (
    <div>
      <div className='side-menu' style={{ width: width }}>
        <button className='closebtn' onClick={() => setWidth(0)}>
          &times;
        </button>
        <div className='side-menu-list' id='menu-list'>
          {menuList.map((menu, index) => (
            <button key={index}>{menu}</button>
          ))}
        </div>
      </div>
      <div className='nav-header'>
        <div className='burger-menu hide'>
          <FontAwesomeIcon icon={faBars} onClick={() => setWidth(250)} />
        </div>
        {authenticate ? (
          <div onClick={() => setAuthenticate(false)}>
            <FontAwesomeIcon icon={faUser} />
            <span>로그아웃에헤헹</span>
          </div>
        ) : (
          <div onClick={() => navigate('/')}>
            <FontAwesomeIcon icon={faUser} />
            <span>로그인하러가기</span>
          </div>
        )}
      </div>
      <div className='nav-logo'>
        <Link to='/'>
          <img
            width={100}
            src='https://littledeep.com/wp-content/uploads/2019/03/google_logo_download_thumbnail.png'
          />
        </Link>
      </div>
      <div className='nav-menu-area'>
        <ul className='menu'>
          {menuList.map((menu, index) => (
            <li key={index}>
              <a href='#'>{menu}</a>
            </li>
          ))}
        </ul>
      </div>

      {/* <div>
      <div className="menu-area">
        <ul className="menu-list">
          {menulist.map(menu => <li>{menu}</li>)}
        </ul>
      </div>
      <div>
      <div className="nav-header">
        
            <div onClick={()=> navigate("/")}>
            <FontAwesomeIcon icon={faUser}/>
            <span>로그아웃*</span>
            </div>
        
       </div>
      </div>
    </div> */}
    </div>
  );
};

export default Navbar;
