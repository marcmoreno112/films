import { useEffect, useState } from "react";
import useFilms from "../../hooks/useFilms/useFilms";
import titles from "../../utils/titles";
import SearchPageStyled from "./SearchPageStyled";
import { FilmData } from "../../types";
import Search from "../../components/Search/Search";
import { useAppDispatch, useAppSelector } from "../../store";
import Detail from "../../components/Detail/Detail";
import SearchPageCardList from "../../components/SearchPageCardList/SearchPageCardList";
import ScrollToTopButton from "../../components/ScrollToTopButton/ScrollToTopButton";

const SearchPage = (): React.ReactElement => {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);

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

  const dispatch = useAppDispatch();

  const { getFilteredFilms, getNowPlayingFilms } = useFilms();

  const [films, setFilms] = useState<FilmData[]>([]);

  const [searchNotFound, setSearchNotFound] = useState(false);

  const [fetchError, setFetchError] = useState("");

  const { titleText, detailFilm } = useAppSelector((state) => state.filmsState);

  useEffect(() => {
    (async () => {
      try {
        let fetchData;

        if (titleText === "") {
          fetchData = await getNowPlayingFilms();
        } else {
          fetchData = await getFilteredFilms(titleText);
        }

        if (!fetchData) {
          return;
        }

        setSearchNotFound(fetchData.results.length === 0);
        setFilms(fetchData.results);
      } catch (error) {
        const apiKey = import.meta.env.VITE_API_KEY;

        if (error instanceof Error) {
          setFetchError(titles.fetchError);

          // eslint-disable-next-line no-console
          !apiKey && console.error(titles.emptyApiKey);
        }
      }
    })();
  }, [getNowPlayingFilms, getFilteredFilms, titleText, dispatch]);

  return (
    <SearchPageStyled>
      <Search />

      {showTopButton && <ScrollToTopButton actionOnClick={goToTop} />}

      {Object.keys(detailFilm).length > 0 && <Detail film={detailFilm} />}

      {titleText === "" && (
        <img
          src="images/now-playing.svg"
          alt={titles.nowPlaying}
          width={350}
          height={250}
          className="now-playing"
        />
      )}

      {fetchError ? (
        <h2>{fetchError}</h2>
      ) : searchNotFound ? (
        <h2>{titles.searchNotFound}</h2>
      ) : (
        <SearchPageCardList films={films} />
      )}
    </SearchPageStyled>
  );
};

export default SearchPage;
