import React, {useState} from 'react';
import {Button, Input} from 'antd';
import Title from '../components/Title';
import Register from '../components/Register';
import LogIn from '../components/LogIn';
import Registerpage from './Registerpage';

const Homepage = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [registered, setRegistered] = useState(false);
  const [username, setUsername] = useState("");

  const RegisterOnClick = () => {
    setRegistered(true);
  }

  const myStyle = {
    backgroundImage: "url('https://pic.52112.com/180317/180317_143/n4SNygWU7T_small.jpg')",
    backgroundSize: 'cover',
    height: '675px',
  };

  return (
    <div className='homepage' style={myStyle}>
      <Title>
        <h1>暗棋遊戲</h1>
      </Title>
      <Register>
        <Button onClick={RegisterOnClick}>Register</Button>
        {registered ? <Registerpage/> : <Homepage/>}
      </Register>
      <LogIn>
        <Button>Log in</Button>
      </LogIn>
    </div>
  );
};

export default Homepage;