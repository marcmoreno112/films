import { styled } from "styled-components";

const HeaderStyled = styled.header`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  top: 0;
  padding: 20px;
  position: fixed;
  min-height: 260px;

  .logo {
    object-fit: contain;
    width: auto;
    max-height: 260px;
  }
`;

export default HeaderStyled;
