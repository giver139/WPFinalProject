import Title from "../components/Title";
import ConfirmButton from "../components/ConfirmButton";
import { Button } from "antd";
import { useState, useEffect } from "react";
import BoardPage from "./Boardpage";
import Gamepage from "./Gamepage";
import { leaveRoomApi, startGameApi } from "../api";
import { PlayerNumberUnmatchError, InternalServerError, RequireLoginError } from "../error";
import { useWebsocket, ConnectionState, WebSocketState } from '../useWebsocket';
import "./button.css"
import Homepage from "./Homepage";

const MyRoompage = ({username, roomID, host, roomInfo}) => {

  const [startGame, setStartGame] = useState(false);
  const [leave, setLeave] = useState(false);
  const [player1, setPlayer1] = useState('');
  const [player2, setPlayer2] = useState('');
  const [gameId, setGameId] = useState(0);
  const [firstPlayer, setFirstPlayer] = useState(-1);
  const [roomPlayers, setRoomPlayers] = useState(roomInfo.players);

  const handleJoinRoom = (newUser) => {
    setRoomPlayers((oldRoomPlayers) => [...oldRoomPlayers, newUser]);
  };

  const handleLeaveRoom = (leftUser) => {
    setRoomPlayers((oldRoomPlayers) => oldRoomPlayers.filter((name) => name !== leftUser));
  };

  useEffect(() => {
    setPlayer1(() => roomPlayers[0] ?? '');
    setPlayer2(() => roomPlayers[1] ?? '');
  }, [roomPlayers]);

  const handleStartGame = (game) => {
    setPlayer1(game.players[0])
    setPlayer2(game.players[1])
    setGameId(game.gameId);
    setFirstPlayer(game.players[game.currentPlayer]);
    setStartGame(true);
  }

  const {state, sendConnectionState} = useWebsocket({handleJoinRoom, handleLeaveRoom, handleStartGame});

  useEffect(() => {
    if (state === WebSocketState.OPEN) {
      sendConnectionState(ConnectionState.ROOM,roomID);
    }
  }, [state]);

  const myStyle = {
    backgroundImage: "url('https://pic.52112.com/180317/180317_143/n4SNygWU7T_small.jpg')",
    backgroundSize: 'contain',
    height: '720px',
  };

  const handleOnStart = async () => {
    try {
      if(username === player1) {
        const {game} = await startGameApi(roomID);
      }
      else {
        alert("You are not the Host Player!!!")
      }
    } catch(error) {
      if(error instanceof PlayerNumberUnmatchError) {
        alert("Player Number is not 2!!!")
      }
      else if(error instanceof RequireLoginError) {
        alert("Please Log In Again!!!");
      }
    }
  }

  const handleOnLeave = async () => {
    try {
      await leaveRoomApi(roomID);
      setLeave(true);

    } catch(error) {
      if(error instanceof InternalServerError) {
        console.log("Internal Server Error!!");
      }
      else if(error instanceof RequireLoginError) {
        alert("Please Log In Again!!!");
      }
    } 
  }

  if(startGame) {
    return (
      <BoardPage username={username} player1={player1} player2={player2} roomID={roomID} gameId={gameId} firstPlayer={firstPlayer}></BoardPage>
    )
  }

  else if(leave) {
    return (
      <Gamepage username={username} roomID={roomID}></Gamepage>
    )
  }

  else { 
    return (
      <div className="roomspage" style={myStyle}>
        <Title>
          <h1>{player1}的房間</h1>
        </Title>
        <Title>
          <h2>Room ID: {roomID}</h2>
        </Title>
        <Title>
          <h2>Room Players: {roomPlayers.join(', ')}</h2>
        </Title>
        <ConfirmButton>
          <Button onClick={handleOnStart}>開始遊戲</Button>
          <Button onClick={handleOnLeave}>離開房間</Button>
        </ConfirmButton>
      </div>
    )
  }
};

export default MyRoompage;
