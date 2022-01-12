import React, {useState} from 'react';
import {Button, Input} from 'antd';
import Title from '../components/Title';
import Username from '../components/Username';
import ConfirmButton from '../components/ConfirmButton';
import {loginApi} from '../api';
import Gamepage from './Gamepage';

const LogInpage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const myStyle = {
    backgroundImage: "url('https://pic.52112.com/180317/180317_143/n4SNygWU7T_small.jpg')",
    backgroundSize: 'cover',
    height: '675px',
  };

  const [loggedIn, setLoggedIn] = useState(false);

  const handleOnClick = async () => {
    if(username !== "" && password !== "") {
      try {
        const {user} = await loginApi({username, password});
        setLoggedIn(true);
      } catch(error) {
        // handle error
      }
    }
  }

  if(loggedIn) {
    return (
      <Gamepage></Gamepage>
    )
  }

  else  {
    return (
      <div className='LogInpage' style = {myStyle}>
        <Title>
          <h1>登入帳號</h1>
        </Title>
        <Username>
          <Input placeholder='your account' onChange={(event) => {setUsername(() => event.target.value);}}></Input>
        </Username>
        <Username>
          <Input placeholder='your password' onChange={(event) => {setPassword(() => event.target.value);}} type='password'></Input>
        </Username>
        <ConfirmButton>
          <Button onClick={handleOnClick}>確認</Button>
        </ConfirmButton> 
      </div>
    )
  }
}

export default LogInpage;
