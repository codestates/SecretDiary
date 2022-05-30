import { useRef, useState, useEffect, useContext} from "react";
import AuthContext from '../context/AuthProvider';
import axios from 'axios';
import React from "react";
import { useNavigate } from "react-router-dom";

const {
  NODE_ENV,
  // REACT_APP_API_DOMAIN,
  // REACT_APP_EC2_HTTP,
  // REACT_APP_EC2_HTTPS,
} = process.env;
// export const url =
//   NODE_ENV === 'development' ? REACT_APP_EC2_HTTP : REACT_APP_API_DOMAIN;

const url =
  process.env.NODE_ENV === 'production'
    ? 'https://client.secretdiary.org'
    : 'https://server.secretdiary.org';

const Login = ({handleResponseSuccess, setIsLogin, setAuthenticate}) => {
  const navigate = useNavigate();
  
  console.log('ENV?', NODE_ENV);
  console.log('url?', url);
  const { setAuth } = useContext(AuthContext);
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg('');
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("login user function issue")
    setAuthenticate(true);
    navigate("/")

    try {
      const response = await axios.post(
        `${url}/signup`,
        JSON.stringify({ user, pwd }),

        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      );
      console.log(JSON.stringify({ user, pwd }));
      console.log(JSON.stringify(response?.data));
      console.log(JSON.stringify(response));
      
      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;
      setAuth({ user, pwd, roles, accessToken });
      console.log('user?',{user})
      setUser('');
      setPwd('');
      setSuccess(true);
      setIsLogin(true)
      handleResponseSuccess()
    } catch (err) {
      if (!err?.response) {
        setErrMsg('No Server Response');
      } else if (err.response?.status === 400) {
        setErrMsg('Missing Username or Password');
      } else if (err.response?.status === 401) {
        setErrMsg('Unauthorized');
      } else {
        setErrMsg('Login Failed');
      }
      errRef.current.focus();
    }
  };

  return (
    <>
      {success ? (
        <section>
          <h1>You are logged in!</h1>
          <br />
          <p>
            <a href='/main'>Go to Home</a>
          </p>
        </section>
      ) : (
        <section>
          <p
            ref={errRef}
            className={errMsg ? 'errmsg' : 'offscreen'}
            aria-live='assertive'
          >
            {errMsg}
          </p>
          <h1>Sign In</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor='username'>Username:</label>
            <input
              type='text'
              id='username'
              ref={userRef}
              autoComplete='off'
              onChange={(e) => setUser(e.target.value)}
              value={user}
              required
            />

            <label htmlFor='password'>Password:</label>
            <input
              type='password'
              id='password'
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              required
            />
            <button>Sign In</button>
          </form>
          <p>
            Need an Account?
            <br />
            <span className='line'>
              {/*put router link here*/}
              <a href='/signup'>Sign Up</a>
            </span>
          </p>
        </section>
      )}
    </>
  );
};

export default Login;
