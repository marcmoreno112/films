import { styled } from "styled-components";

const MyListPageCardStyled = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 15px;
  font-size: 1.5rem;
  color: ${(props) => props.theme.colors.primary};
  border-bottom: 1px solid;
  padding: 10px;

  .card {
    &-image {
      object-fit: contain;
    }
  }
`;

export default MyListPageCardStyled;
