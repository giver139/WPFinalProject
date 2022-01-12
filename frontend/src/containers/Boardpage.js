import Board from "../components/Board";
import cover from "../chessPieces/cover.png";
import { useState } from "react";
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
import { firstClickApi, secondClickApi } from "../api";

const chessImage = [bk, bg, bm, br, bn, bc, bp, rk, rg, rm, rr, rn, rc, rp, cover, cover];

const BoardPage = ({username, player1, player2, roomID, source, moves, gameId}) => {

  const myStyle = {
    backgroundImage: "url('https://pic.52112.com/180317/180317_143/n4SNygWU7T_small.jpg')",
    backgroundSize: 'cover',
    height: '675px',
  };

  const blocks = {
    height: '75px',
    width: '75px',
    border: '2px solid',
  }
  
  const pictures = {
    display: 'flex',
    alignSelf: 'center',
  }

  const [board, setBoard] = useState(new Array(32).fill(14));
  const [firstClicked, setFirstClicked] = useState(false)

  const handleOnClick = async () => {
    try {
      if(firstClicked) {
        const {destination} = await secondClickApi(gameId, source, moves);
        setFirstClicked(false);
      }
      else {
        const {moves} = await firstClickApi(gameId, source); 
        setFirstClicked(true)
      }
    } catch(error) {

    }
  }

  console.log(board);
  return (
    <div className="Boardpage" style={myStyle}>
      <h3>Unrated Game</h3>
      <h3>{player1} vs {player2}</h3>
      <h3>Room ID: {roomID}</h3>
      <Board>{board.map((chess_id,index) => (<div style = {blocks} key={index*100+chess_id}>
      <img src = {chessImage[chess_id]} style={pictures} onClick={handleOnClick}/>
      </div>))}</Board>
    </div>
  )
}

export default BoardPage;
