import { React, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// import { url } from '../util/getUrl';

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

const Signup = () => {
  const [user, setUser] = useState('');
  const [userName, setUserName] = useState('');
  const [pwd, setPwd] = useState('');
  const [verPwd, setVerPwd] = useState('');
  const history = useNavigate();

  const signup = () => {
    console.log('ENV?', NODE_ENV);
    console.log('url?', url);

    if (user === '') {
      window.alert('잘못된 유저이름 형식입니다.');
      return;
    } else if (pwd === verPwd) {
      axios
        .post(`${url}/signup`, {
          user: user,
          userName: userName,
          password: pwd,
        })
        .then(() => {
          history('/');
        })
        .catch((e) => console.error(e));
    }
  };
  const cancle = () => {
    history('/page/Login');
  };
  return (
    <div>
      <Container>
        <Box>
          <Text>회원가입</Text>
          <SignupInput
            value={user}
            placeholder='이메일을 입력하세요'
            onChange={(e) => setUser(e.target.value)}
          />
          <SignupInput
            value={userName}
            placeholder='닉네임을 입력하세요'
            onChange={(e) => setUserName(e.target.value)}
          />
          <SignupInput
            value={pwd}
            placeholder='비밀번호를 입력하세요'
            type='password'
            onChange={(e) => setPwd(e.target.value)}
          />
          <SignupInput
            value={verPwd}
            placeholder='비밀번호를 한번 더 입력해주세요'
            type='password'
            onChange={(e) => setVerPwd(e.target.value)}
          />
          <SignupButton onClick={signup}>회원가입</SignupButton>
          <SignupButton onClick={cancle}>취소</SignupButton>
        </Box>
      </Container>
    </div>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
`;

const Box = styled.div`
  margin-top: 70px;
  margin-bottom: 70px;
  align-items: flex-first;
  border: 1px solid black;
  z-index: 10;
`;

const Text = styled.p`
  font-size: 16pt;
  font-weight: bold;
  margin: 5px;
  border: 1px solid black;
`;

const SignupInput = styled.input`
  width: 340px;
  height: 48px;
  border: 1px solid black;
  padding: 16px;
  margin: 5px;
  box-sizing: border-box;
  font-size: 16px;
  background-color: yellow;
`;

const SignupButton = styled.button`
  width: 340px;
  height: 48px;
  border: 1px solid black;
  padding: auto;
  font-size: 16px;
  font-weight: bold;
  :hover {
    cursor: pointer;
  }
`;

export default Signup;
