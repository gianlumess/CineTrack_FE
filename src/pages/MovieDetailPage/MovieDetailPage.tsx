import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { setMovieDetailsAction } from "../../redux/actions/moviesActions";
import { MovieDetails } from "../../interfaces/MoviesInterface";
import { useEffect, useState } from "react";

const MovieDetailPage = () => {
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const { movieId } = useParams<{ movieId: string }>();

  const getMovieDetailsFetch = async (token: string) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/movies/${movieId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const movieData: MovieDetails = await response.json();
        dispatch(setMovieDetailsAction(movieData));
      } else {
        const erroMessage = await response.json();
        setError(erroMessage.message || "errore nel recuperare i dati del film");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (token) {
      getMovieDetailsFetch(token);
    }
  }, []);

  return <h1>MOVIE DETAIL</h1>;
};

export default MovieDetailPage;
