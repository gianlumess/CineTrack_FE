import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  setMovieCreditsAction,
  setMovieDetailsAction,
  setSimilarMoviesAction,
} from "../../redux/actions/moviesActions";
import { MovieCredits, MovieDetails } from "../../interfaces/MoviesInterface";
import { useEffect, useState } from "react";
import { RootState } from "../../redux/store/store";
import styles from "./MovieDetailPage.module.scss";
import { Button, Col, Container, Image, Row } from "react-bootstrap";
import Mynavbar from "../../components/Navbar/Mynavbar";
import CastCard from "../../components/CastCard/CastCard";
import { UserMovie, UserMovieDTO } from "../../interfaces/UserInterfaces";
import { getMoviesInListAction } from "../../redux/actions/userActions";

const MovieDetailPage = () => {
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const { movieId } = useParams<{ movieId: string }>();
  const movieDetails = useSelector((state: RootState) => state.movies.movieDetails);
  const movieCredits = useSelector((state: RootState) => state.movies.movieCredits);

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

  const getMovieCreditsFetch = async (token: string) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/movies/${movieId}/credits`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const movieData: MovieCredits = await response.json();
        dispatch(setMovieCreditsAction(movieData));
      } else {
        const erroMessage = await response.json();
        setError(erroMessage.message || "errore nel recuperare i crediti del film");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const saveMovieInListFetch = async (token: string, movie: UserMovieDTO) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/user_movies`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(movie),
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
      } else {
        const errorMessage = await response.json();
        setError(errorMessage.message || "errore nel salvare il film nella tua lista");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getSimilarMoviesFetch = async (token: string) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/movies/${movieId}/similar`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        dispatch(setSimilarMoviesAction(data.results));
      } else {
        const erroMessage = await response.json();
        setError(erroMessage.message || "errore nel recuperare i dati dei film");
      }
    } catch (error) {
      console.log(error);
    }
  };

  /*  const getMoviesInListFetch = async (token: string) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/user_movies/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const movieData: UserMovie[] = await response.json();
        dispatch(getMoviesInListAction(movieData));
      } else {
        const erroMessage = await response.json();
        setError(erroMessage.message || "errore nel recuperare i crediti del film");
      }
    } catch (error) {
      console.log(error);
    }
  }; */

  useEffect(() => {
    if (token) {
      getMovieDetailsFetch(token);
      getMovieCreditsFetch(token);
      getSimilarMoviesFetch(token);
    }
  }, []);

  return (
    <>
      <Mynavbar />
      <Row
        style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w1280${movieDetails?.backdrop_path})` }}
        className={styles.movieDetails__topBanner}
      >
        <Col md={3}>
          <Image
            className={styles.movieDetails__topBanner__posterImage}
            src={`https://image.tmdb.org/t/p/w500${movieDetails?.poster_path}`}
          ></Image>
        </Col>

        <Col md={6} className={styles.movieDetails__topBanner__mainInfoSection}>
          <h1 className="mb-0">{movieDetails?.title}</h1>

          <div className={styles.movieDetails__topBanner__mainInfoSection__genreTag}>
            {movieDetails?.genres.map((genre) => (
              <span key={genre.id}>{genre.name}</span>
            ))}
          </div>
          <p>{movieDetails?.overview}</p>
        </Col>
        <Col md={3} className="d-flex flex-column justify-content-end">
          <Button
            onClick={() => {
              const showStatus = "WATCHED";
              saveMovieInListFetch(token, { showStatus, movieId });
            }}
            className="mb-3 ms-auto"
          >
            GIA' VISTO
          </Button>
          <Button
            onClick={() => {
              const showStatus = "TO_WATCH";
              saveMovieInListFetch(token, { showStatus, movieId });
            }}
            className="ms-auto "
          >
            AGGIUNGI ALLA LISTA DA VEDERE
          </Button>
        </Col>
      </Row>

      <Container>
        <Row className="mt-5">
          <Col md={3}>
            <p>
              <strong>Regista</strong>
              <span className="d-block">{movieCredits?.crew[0].name}</span>
            </p>
            <p>
              <strong>Titolo originale</strong>
              <span className="d-block">{movieDetails?.original_title}</span>
            </p>
            <p>
              <strong>Lingua originale</strong>
              <span className="d-block">{movieDetails?.original_language}</span>
            </p>
            <p>
              <strong>Stato</strong>
              <span className="d-block">{movieDetails?.status}</span>
            </p>
            <p>
              <strong>Durata</strong>
              <span className="d-block">{movieDetails?.runtime} min</span>
            </p>
            <p>
              <strong>Budget</strong>
              <span className="d-block">${movieDetails?.budget.toLocaleString("it-IT")}</span>
            </p>
            <p>
              <strong>Incasso</strong>
              <span className="d-block">${movieDetails?.revenue.toLocaleString("it-IT")}</span>
            </p>
          </Col>
          <Col md={9}>
            <h2>CAST</h2>
            {movieCredits && <CastCard content={movieCredits} />}
            <h2 className="mt-2">Film consigliati</h2>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default MovieDetailPage;
