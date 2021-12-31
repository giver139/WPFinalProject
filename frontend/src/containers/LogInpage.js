import React, {useState} from 'react';
import {Button, Input} from 'antd';
import Title from '../components/Title';
import Username from '../components/Username';
import ConfirmButton from '../components/ConfirmButton';

const LogInpage = () => {

  const myStyle = {
    backgroundImage: "url('https://pic.52112.com/180317/180317_143/n4SNygWU7T_small.jpg')",
    backgroundSize: 'cover',
    height: '675px',
  };

  return (
    <div className='LogInpage' style = {myStyle}>
      <Title>
        <h1>登入帳號</h1>
      </Title>
      <Username>
        <Input placeholder='your account'></Input>
      </Username>
      <Username>
        <Input placeholder='your password'></Input>
      </Username>
      <ConfirmButton>
        <Button>確認</Button>
      </ConfirmButton> 
    </div>
  )
}

export default LogInpage;