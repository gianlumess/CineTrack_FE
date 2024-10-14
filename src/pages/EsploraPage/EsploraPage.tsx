import { useEffect, useState } from "react";
import Mynavbar from "../../components/Navbar/Mynavbar";
import { useDispatch, useSelector } from "react-redux";
import { UserDataResponse } from "../../interfaces/UserInterfaces";
import { saveUserDataAction } from "../../redux/actions/userActions";
import { useNavigate } from "react-router-dom";
import MovieCard from "../../components/MovieCard/MovieCard";
import HeroBanner from "../../components/HeroBanner/HeroBanner";
import { Container } from "react-bootstrap";
import { setTopRatedMoviesAction, setTrendingMoviesAction } from "../../redux/actions/moviesActions";
import { setTopRatedSeriesAction, setTrendingSeriesAction } from "../../redux/actions/seriesActions";
import { RootState } from "../../redux/store/store";

const EsploraPage = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const trendingMovies = useSelector((state: RootState) => state.movies.trendingMovies);
  const topRatedMovies = useSelector((state: RootState) => state.movies.topRatedMovies);
  const trendingSeries = useSelector((state: RootState) => state.series.trendingSeries);
  const topRatedSeries = useSelector((state: RootState) => state.series.topRatedSeries);

  const getUserDataFetch = async (token: string) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const userData: UserDataResponse = await response.json();
        //INSERIRE DISPATCH PER AGGIORNARE I DATI UTENTE NELLO STORE
        dispatch(saveUserDataAction(userData));
      } else {
        const errorMessage = await response.json();
        setError(errorMessage.message || "errore nel recuperare i dati dell'utente");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getPopularMoviesFetch = async (token: string) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/movies/trending`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        dispatch(setTrendingMoviesAction(data.results));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getPopularSeriesFetch = async (token: string) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/series/trending`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        dispatch(setTrendingSeriesAction(data.results));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getTopRatedMoviesFetch = async (token: string) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/movies/top_rated`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        dispatch(setTopRatedMoviesAction(data.results));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getTopRatedSeriesFetch = async (token: string) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/series/top_rated`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        dispatch(setTopRatedSeriesAction(data.results));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (token) {
      getUserDataFetch(token);
      getPopularMoviesFetch(token);
      getPopularSeriesFetch(token);
      getTopRatedMoviesFetch(token);
      getTopRatedSeriesFetch(token);
    } else {
      navigate("/login");
    }
  }, [token]);

  return (
    <>
      <Mynavbar />
      <HeroBanner />
      <Container>
        <h2 className="mb-4 d-inline-block">Film di tendenza</h2>
        <MovieCard content={trendingMovies} />
        <h2 className="mb-4 d-inline-block">Film più votati</h2>
        <MovieCard content={topRatedMovies} />
        <h2 className="mb-4 d-inline-block">Serie di tendenza</h2>
        <MovieCard content={trendingSeries} />
        <h2 className="mb-4 d-inline-block">Serie più votate</h2>
        <MovieCard content={topRatedSeries} />
      </Container>
    </>
  );
};

export default EsploraPage;
