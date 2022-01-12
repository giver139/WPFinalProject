import React, {useState, useRef} from 'react';
import {Button, Input} from 'antd';
import Title from '../components/Title';
import Username from '../components/Username';
import ConfirmButton from '../components/ConfirmButton';
import Homepage from './Homepage';
import {registerApi} from '../api';
import { InternalServerError, UsernameAlreadyExistsError } from '../error';
import InternalPreviewGroup from 'antd/lib/image/PreviewGroup';

const Registerpage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [registered, setRegistered] = useState(false);
  const bodyRef = useRef(null);

  const myStyle = {
    backgroundImage: "url('https://pic.52112.com/180317/180317_143/n4SNygWU7T_small.jpg')",
    backgroundSize: 'cover',
    height: '675px',
  };

  const handleOnClick = async () => {
    if(username !== "" && password !== "" && nickname !== "") {
      try {
        const {user} = await registerApi({username, password, nickname});
        setRegistered(true);
      } catch(error) {
        if(error instanceof UsernameAlreadyExistsError) {
          alert("This Username is Already Used!!!");
        }

        else if(error instanceof InternalServerError) {
          console.log("Internal Server Error!!");
        }
      }
    }
  }

  if(registered) {
    return (<Homepage></Homepage>);
  }

  else {
    return ( 
      <div className='Registerpage' style = {myStyle}>
        <Title>
          <h1>註冊帳號</h1>
        </Title>
        <Username>
          <Input placeholder='your account'
          onChange={(e) => {setUsername(e.target.value)}}></Input>
        </Username>
        <Username>
          <Input placeholder='your password'
          onChange={(e) => {setPassword(e.target.value)}} type='password'></Input>
        </Username>
        <Username>
          <Input placeholder='your nickname'
          onChange={(e) => {setNickname(e.target.value)}}></Input>
        </Username> 
        <ConfirmButton>
          <Button onClick={handleOnClick}>確認</Button>
        </ConfirmButton> 
      </div>
    )
  }
}

export default Registerpage;
