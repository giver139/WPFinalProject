import React, {useState, useRef} from 'react';
import {Button, Input} from 'antd';
import CreateRoom from '../components/Createroom';
import JoinRoom from '../components/Joinroom';

const Gamepage = () => {

  const myStyle = {
    backgroundImage: "url('https://pic.52112.com/180317/180317_143/n4SNygWU7T_small.jpg')",
    backgroundSize: 'cover',
    height: '675px',
  };

  return (
    <div className='Gamepage' style = {myStyle}>
      <Title>
        <h1>開始遊戲</h1>
      </Title>
      <CreateRoom>
        <Button>創建房間</Button>
      </CreateRoom>
      <JoinRoom>
        <Button>加入房間</Button>
      </JoinRoom>
    </div>
  )
}

export default Gamepage;