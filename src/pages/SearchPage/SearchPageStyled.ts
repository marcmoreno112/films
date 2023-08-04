import { styled } from "styled-components";

const SearchPageStyled = styled.main`
  width: 100%;
  padding-top: 300px;

  .page-title {
    font-size: 1.8rem;
    color: ${(props) => props.theme.colors.primary};
    padding-bottom: 30px;
  }
`;

export default SearchPageStyled;
