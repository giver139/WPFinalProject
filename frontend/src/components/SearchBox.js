import styled from "styled-components";

const SearchBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    Input.placeholder{
      text-align: center;
    }

    Input{
      width: 400px;
      height: 40px;
      margin: 10px;
      margin-right: 20px;
      font-size: 20px;
      font-family: 思源宋體;
    }
`;

export default SearchBox;