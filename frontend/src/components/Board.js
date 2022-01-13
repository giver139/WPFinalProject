import styled from "styled-components";

const Board = styled.div`
    display: grid;
    width: 600px;
    height: 300px;
    grid-template-rows: repeat(4, 75px);
    grid-template-columns: repeat(8, 75px);
    grid-auto-flow: column;
`;

export default Board;