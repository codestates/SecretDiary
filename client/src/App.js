import { Routes, Route } from 'react-router-dom';
import Login from './page/Login';
import Main from './page/Main';
import Diary from './page/Diary';
import Friends from './page/Friends';
import Signup from './page/Signup';
import Mypage from './page/Mypage';
import Mydiary from './page/Mydiary';
import './App.css';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/main' element={<Main />} />
        <Route path='/diary' element={<Diary />} />
        <Route path='/friends' element={<Friends />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/mypage' element={<Mypage />} />
        <Route path='/mydiary' element={<Mydiary />} />
      </Routes>
    </div>
  );
}

export default App;
