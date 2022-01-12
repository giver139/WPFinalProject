import Title from "../components/Title";
import {Input, Button} from "antd";
import Username from '../components/Username';
import {useState} from "react";
import ConfirmButton from '../components/ConfirmButton';
import {joinRoomApi} from '../api'
import BoardPage from "./Boardpage";

const AllRoomspage = () => {

  const myStyle = {
    backgroundImage: "url('https://pic.52112.com/180317/180317_143/n4SNygWU7T_small.jpg')",
    backgroundSize: 'cover',
    height: '675px',
  };

  const [roomId, setRoomId] = useState(0);
  const [idCorrect, setIdCorrect] = useState(false);

  const handleOnClick = async () => {
    if(roomId !== "") {
      try {
        const {room} = await joinRoomApi(roomId);
        setIdCorrect(true);
      } catch(error) {
        // handle error
      }
    }
  }

  if(idCorrect) {
    return (
      <BoardPage></BoardPage>
    )
  }

  else {
    return (
      <div className="roomspage" style={myStyle}>
        <Title>
          <h1>加入房間</h1>
        </Title>
        <Username>
          <Input placeholder="room ID" onChange={(event) => {setRoomId(() => event.target.value);}}></Input>
        </Username>
        <ConfirmButton>
            <Button onClick={handleOnClick}>確認</Button>
        </ConfirmButton>
      </div>
    )
  }
};

export default AllRoomspage;