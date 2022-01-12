import Title from "../components/Title";
import {Input, Button} from "antd";
import Username from '../components/Username';
import {useState} from "react";
import ConfirmButton from '../components/ConfirmButton';
import {joinRoomApi} from '../api'
import BoardPage from "./Boardpage";
import Gamepage from "./Gamepage";

const AllRoomspage = ({username}) => {

  const myStyle = {
    backgroundImage: "url('https://pic.52112.com/180317/180317_143/n4SNygWU7T_small.jpg')",
    backgroundSize: 'cover',
    height: '675px',
  };

  const [roomId, setRoomId] = useState(0);
  const [reverse, setReverse] = useState(false);
  const [idCorrect, setIdCorrect] = useState(false);
  const [player1, setPlayer1] = useState('');
  const [player2, setPlayer2] = useState('');

  const handleOnClick = async () => {
    if(roomId !== "") {
      try {
        const {room} = await joinRoomApi(roomId);
        setIdCorrect(true);
        setPlayer1(room.players[0])
        setPlayer2(room.players[1])
      } catch(error) {
        // handle error
      }
    }
  }

  const handleOnReverse = () => {
    setReverse(true);
  }

  if(idCorrect) {
    return (
      <BoardPage username={username} player1={player1} player2={player2} roomID={roomId}></BoardPage>
    )
  }

  else if(reverse) {
    return (
      <Gamepage username={username}></Gamepage>
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
            <Button onClick={handleOnReverse}>返回</Button>
        </ConfirmButton>
      </div>
    )
  }
};

export default AllRoomspage;
