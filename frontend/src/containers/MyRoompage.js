import Title from "../components/Title";

const MyRoompage = () => {

  const myStyle = {
    backgroundImage: "url('https://pic.52112.com/180317/180317_143/n4SNygWU7T_small.jpg')",
    backgroundSize: 'cover',
    height: '675px',
  };
  
  return (
    <div className="roomspage" style={myStyle}>
      <Title>我的房間</Title>
    </div>
  )
};

export default MyRoompage;