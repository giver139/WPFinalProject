import React, {useState, useRef} from 'react';
import {Button, Input} from 'antd';
import CreateRoom from '../components/Createroom';
import JoinRoom from '../components/Joinroom';
import Title from '../components/Title';
import MyRoompage from './MyRoompage';
import AllRoomspage from './AllRoomspage';

const Gamepage = () => {

  const myStyle = {
    backgroundImage: "url('https://pic.52112.com/180317/180317_143/n4SNygWU7T_small.jpg')",
    backgroundSize: 'cover',
    height: '675px',
  };

  const [joined, setJoined] = useState(false);
  const [created, setCreated] = useState(false);

  const handleOnJoin = () => {
    setJoined(true);
  }

  const handleOnCreate = () => {
    setCreated(true);
  }

  if(created) {
    return (
      <MyRoompage></MyRoompage>
    )
  }

  else if(joined) {
    return (
      <AllRoomspage></AllRoomspage>
    )
  }

  else {
    return (
      <div className='Gamepage' style = {myStyle}>
        <Title>
          <h1>開始遊戲</h1>
        </Title>
        <CreateRoom>
          <Button onClick={handleOnCreate}>創建房間</Button>
        </CreateRoom>
        <JoinRoom>
          <Button onClick={handleOnJoin}>加入房間</Button>
        </JoinRoom>
      </div>
    )
  }
}

export default Gamepage;