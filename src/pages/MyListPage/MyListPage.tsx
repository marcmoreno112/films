import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import { changeTitleTextActionCreator } from "../../store/films/filmsSlice";
import titles from "../../utils/titles";
import MyListPageStyled from "./MyListPageStyled";
import MyListCardList from "../../components/MyListCardList/MyListCardList";
import ScrollToTopButton from "../../components/ScrollToTopButton/ScrollToTopButton";

const MyListPage = (): React.ReactElement => {
  const { filmsRated } = useAppSelector((state) => state.filmsState);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const changeTitleTextAction = changeTitleTextActionCreator("");

    dispatch(changeTitleTextAction);
  }, [dispatch]);

  const [showTopButton, setShowTopButton] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      window.scrollY > 400 ? setShowTopButton(true) : setShowTopButton(false);
    });
  }, []);

  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <MyListPageStyled>
      <h1 className="page-title">{titles.myList}</h1>

      {showTopButton && <ScrollToTopButton actionOnClick={goToTop} />}

      {filmsRated.length === 0 && (
        <h2 className="no-rated-films-message">{titles.emptyMylist}</h2>
      )}

      <MyListCardList films={filmsRated} />
    </MyListPageStyled>
  );
};

export default MyListPage;
