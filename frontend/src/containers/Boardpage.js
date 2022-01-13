import Board from "../components/Board";
import cover from "../chessPieces/cover.png";
import { useState, useEffect } from "react";
import { useWebsocket, ConnectionState, WebSocketState } from '../useWebsocket';
import bc from "../chessPieces/bc.png";
import bg from "../chessPieces/bg.png";
import bk from "../chessPieces/bk.png";
import bm from "../chessPieces/bm.png";
import bn from "../chessPieces/bn.png";
import bp from "../chessPieces/bp.png";
import br from "../chessPieces/br.png";
import rc from "../chessPieces/rc.png";
import rg from "../chessPieces/rg.png";
import rk from "../chessPieces/rk.png";
import rm from "../chessPieces/rm.png";
import rn from "../chessPieces/rn.png";
import rp from "../chessPieces/rp.png";
import rr from "../chessPieces/rr.png";
import empty from "../chessPieces/empty.png";
import "./Select.css";
import { firstClickApi, secondClickApi } from "../api";
import { InvalidDestinationSelectionError, InvalidSourceSelectionError, NoPossibleDestinationError, RequireLoginError, InternalServerError, NotYourTurnError } from "../error";

const chessImage = [bk, bg, bm, br, bn, bc, bp, rk, rg, rm, rr, rn, rc, rp, cover, empty];

const BoardPage = ({username, player1, player2, roomID, gameId}) => {

  const [source, setSource] = useState(-1);

  const myStyle = {
    backgroundImage: "url('https://pic.52112.com/180317/180317_143/n4SNygWU7T_small.jpg')",
    backgroundSize: 'cover',
    height: '675px',
  };

  const blocks = {
    height: '75px',
    width: '75px',
    border: '2px solid black',
    alignItems: 'center',
    alignSelf: 'center',
  }

  function SelectThis(thisElement) {
    thisElement.classList.add("selected");
  }

  function UnSelectThis(thisElement) {
    thisElement.classList.remove("selected");
  }

  const [board, setBoard] = useState(new Array(32).fill(14));
  const [firstClicked, setFirstClicked] = useState(false);
  const [nowPlayer, setNowPlayer] = useState(player1);
  const [player1Color, setPlayer1Color] = useState("red");
  const [player2Color, setPlayer2Color] = useState("black");
  const [won, setWon] = useState(false);

  const handleMakeMove = (game, move) => {
    setBoard(game.board)
  }

  const {state, sendConnectionState} = useWebsocket({handleMakeMove});
  useEffect(() => {
    if (state === WebSocketState.OPEN) {
      sendConnectionState(ConnectionState.GAME, gameId);
    }
  }, [state]);

  const handleOnClick = async (index, event) => {
    try {
      if(!firstClicked) {
        console.log('game = ', gameId)
        const {moves} = await firstClickApi(gameId, index);
        console.log('first clicked!!') 
        setFirstClicked(true);
        setSource(index);
        SelectThis(event.target);
      }
      else {
        await secondClickApi(gameId, source, index);
        console.log('second clicked!!')
        setFirstClicked(false);
        setSource(-1);
        UnSelectThis(event.target);
      }
    } catch(error) {
      if(error instanceof InvalidDestinationSelectionError) {
        alert('Not a valid Destination!!!');
      }

      else if(error instanceof InvalidSourceSelectionError) {
        alert('Not a valid Source!!!');
      }

      else if(error instanceof NoPossibleDestinationError) {
        alert('No Possible Destination!!!');
      }

      else if(error instanceof RequireLoginError) {
        alert("Please Log In Again!!!");
      }

      else if(error instanceof InternalServerError) {
        console.log("Internal Server Error!!");
      }

      else if(error instanceof NotYourTurnError) {
        console.log("Not Your Turn!!!")
      }
    }
  }

  const test = {
    margin: '3px',
  }

  console.log(board);
  return (
    <div className="Boardpage" style={myStyle}>
      <h3>Unrated Game</h3>
      <h3>{player1} vs {player2}</h3>
      <h3>Room ID: {roomID}</h3>
      <h3>It's {nowPlayer}'s turn</h3>
      <h3>{player1}: <img src = {rk}/>,   {player2}: <img src={bk}/></h3>
      <Board>{board.map((chess_id, index) => (<div style = {blocks} key={index*100+chess_id}>
      <img src = {chessImage[chess_id]} onClick={(event) => {handleOnClick(index, event);}} style={test}/>
      </div>))}</Board>
    </div>
  )
}

export default BoardPage;
