import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { setMovieCreditsAction, setMovieDetailsAction } from "../../redux/actions/moviesActions";
import { MovieCredits, MovieDetails } from "../../interfaces/MoviesInterface";
import { useEffect, useState } from "react";
import { RootState } from "../../redux/store/store";
import styles from "./MovieDetailPage.module.scss";
import { Button, Col, Container, Image, Row } from "react-bootstrap";
import Mynavbar from "../../components/Navbar/Mynavbar";

const MovieDetailPage = () => {
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const { movieId } = useParams<{ movieId: string }>();
  const movieDetails = useSelector((state: RootState) => state.movies.movieDetails);

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

  useEffect(() => {
    if (token) {
      getMovieDetailsFetch(token);
      getMovieCreditsFetch(token);
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
          <Button className="mb-3 ms-auto">GIA' VISTO</Button>
          <Button className="ms-auto ">AGGIUNGI ALLA LISTA DA VEDERE</Button>
        </Col>
      </Row>

      <Container>
        <Row>
          <Col md={3}></Col>
          <Col md={9}>
            <h2>CAST</h2>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default MovieDetailPage;
