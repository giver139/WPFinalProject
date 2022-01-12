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

  const horizontalAxis = ["1", "2", "3", "4", "5", "6", "7", "8"];
  const verticalAxis = ["a", "b", "c", "d"];

  let board = [];;
  for(let i = 0; i < verticalAxis.length; i++) {
    for(let j = 0; j < horizontalAxis.length; j++) {
      board.push(<div style = {blocks}>{verticalAxis[i]}{horizontalAxis[j]}</div>)
    }
  }

  return (
    <div className="Boardpage" style={myStyle}>
      <Board>{board}</Board>
    </div>
  )
}

export default BoardPage;