import { useEffect, useState } from "react";
import Mynavbar from "../../components/Navbar/Mynavbar";
import { useDispatch } from "react-redux";
import { UserDataResponse } from "../../interfaces/UserInterfaces";
import { saveUserDataAction } from "../../redux/actions/userActions";
import { useNavigate } from "react-router-dom";
import MovieCard from "../../components/MovieCard/MovieCard";
import HeroBanner from "../../components/HeroBanner/HeroBanner";
import { Container } from "react-bootstrap";
import { setTrendingMoviesAction } from "../../redux/actions/moviesActions";
import { setTrendingSeriesAction } from "../../redux/actions/seriesActions";

const EsploraPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");

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

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      getUserDataFetch(token);
      getPopularMoviesFetch(token);
      getPopularSeriesFetch(token);
    } else {
      navigate("/login");
    }
  });

  return (
    <>
      <Mynavbar />
      <HeroBanner />
      <Container>
        <MovieCard />
      </Container>
    </>
  );
};

export default EsploraPage;
