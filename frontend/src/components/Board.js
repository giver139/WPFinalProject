import styled from "styled-components";

const Board = styled.div`
    display: grid;
    align-items: center;
    justify-content: center;
    width: 600px;
    height: 100px;
    grid-template-rows: repeat(4, 75px);
    grid-template-columns: repeat(8, 75px);
    grid-auto-flow: column;
    margin-left: 460px;
`;

export default Board;