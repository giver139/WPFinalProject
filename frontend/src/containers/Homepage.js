import React, {useState} from 'react';
import {Button, Input} from 'antd';
import Title from '../components/Title';
import Register from '../components/Register';
import LogIn from '../components/LogIn';
import Registerpage from './Registerpage';
import LogInpage from './LogInpage';

const Homepage = () => {
  const [registered, setRegistered] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const handleRegistered = () => {
    setRegistered(true);
  };

  const handleLoggedIn = () => {
    setLoggedIn(true);
  }

  const myStyle = {
    backgroundImage: "url('https://pic.52112.com/180317/180317_143/n4SNygWU7T_small.jpg')",
    backgroundSize: 'cover',
    height: '675px',
  };

  if(registered) {
    return (<Registerpage></Registerpage>)
  }
  else if(loggedIn) {
    return (<LogInpage></LogInpage>)
  }
  
  else {
    return (  
    <div className='homepage' style={myStyle}>
    <Title>
      <h1>暗棋遊戲</h1>
    </Title>
    <Register>
      <Button onClick={handleRegistered}>註冊</Button>
    </Register>
    <LogIn>
      <Button onClick={handleLoggedIn}>登入</Button>
    </LogIn>
  </div>)
  };
};

export default Homepage;
