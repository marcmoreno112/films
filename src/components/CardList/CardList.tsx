import { FilmData } from "../../types";
import Card from "../Card/Card";
import CardListStyled from "./CardListStyled";

interface CardListProps {
  films: FilmData[];
}

const CardList = ({ films }: CardListProps): React.ReactElement => {
  return (
    <CardListStyled>
      {films.map((film, index) => (
        <Card
          film={film}
          key={film.id}
          isLazy={index === 0 ? "eager" : "lazy"}
        ></Card>
      ))}
    </CardListStyled>
  );
};

export default CardList;
