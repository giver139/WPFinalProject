import Board from "../components/Board";

const BoardPage = () => {

  const myStyle = {
    backgroundImage: "url('https://pic.52112.com/180317/180317_143/n4SNygWU7T_small.jpg')",
    backgroundSize: 'cover',
    height: '675px',
  };

  const blocks = {
    height: '75px',
    width: '75px',
  }

  const verticalAxis = ["1", "2", "3", "4"];
  const horizontalAxis = ["a", "b", "c", "d", "e", "f", "i", "j"];

  let board = [];;
  for(let i = 0; i < horizontalAxis.length; i++) {
    for(let j = verticalAxis.length - 1; j >= 0; j--) {
      board.push(<div style = {blocks}>{horizontalAxis[i]} {verticalAxis[j]}</div>)
    }
  }

  return (
    <div className="Boardpage" style={myStyle}>
      <Board>{board}</Board>
    </div>
  )
}

export default BoardPage;