import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  setMovieCreditsAction,
  setMovieDetailsAction,
  setSimilarMoviesAction,
} from "../../redux/actions/moviesActions";
import { MovieCredits, MovieDetails } from "../../interfaces/MoviesInterface";
import { useEffect, useState } from "react";
import { AppDispatch, RootState } from "../../redux/store/store";
import styles from "./MovieDetailPage.module.scss";
import { Button, Col, Container, Image, Row } from "react-bootstrap";
import Mynavbar from "../../components/Navbar/Mynavbar";
import CastCard from "../../components/CastCard/CastCard";
import { NewCommentDTO, UserMovie, UserMovieDTO } from "../../interfaces/UserInterfaces";
import {
  deleteMovieFromListFetch,
  getMoviesInListAction,
  getMoviesInListFetch,
  getMyCommentAction,
  getMyRatingAction,
} from "../../redux/actions/userActions";
import MovieCard from "../../components/MovieCard/MovieCard";
import StarRating from "../../components/StarRating/StarRating";

const MovieDetailPage = () => {
  const token = localStorage.getItem("token");
  const dispatch: AppDispatch = useDispatch();
  const [error, setError] = useState("");
  const [comment, setComment] = useState("");
  const { movieId } = useParams<{ movieId: string }>();
  const userInfo = useSelector((state: RootState) => state.user.user);
  const moviesList = useSelector((state: RootState) => state.user.moviesList);
  const movieDetails = useSelector((state: RootState) => state.movies.movieDetails);
  const movieCredits = useSelector((state: RootState) => state.movies.movieCredits);
  const similarMovies = useSelector((state: RootState) => state.movies.similarMovies);
  const myComment = useSelector((state: RootState) => state.user.myComment);

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
          "Content-Type": "application/json",
        },
        body: JSON.stringify(movie),
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        dispatch(getMoviesInListFetch(token));
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

  const getMyCommentFetch = async (token: string) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/comments/me/${movieId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        dispatch(getMyCommentAction(data));
      } else {
        const erroMessage = await response.json();
        setError(erroMessage.message || "errore nel recuperare il commento");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getMyRatingFetch = async (token: string) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/ratings/me/${movieId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        dispatch(getMyRatingAction(data));
      } else {
        const erroMessage = await response.json();
        setError(erroMessage.message || "errore nel recuperare la valutazione");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const saveCommentFetch = async (token: string, rating: NewCommentDTO) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/comments/me/${movieId}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(rating),
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        await getMyCommentFetch(token);
      } else {
        const errorMessage = await response.json();
        setError(errorMessage.message || "errore nel salvare il commento");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleCommentSubmit = () => {
    const newComment: NewCommentDTO = {
      content: comment,
    };
    saveCommentFetch(token, newComment);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    if (token) {
      getMovieDetailsFetch(token);
      getMovieCreditsFetch(token);
      getSimilarMoviesFetch(token);
      getMyCommentFetch(token);
      getMyRatingFetch(token);
    }
  }, [movieId]);

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

          <div className={`${styles.movieDetails__topBanner__mainInfoSection__genreTag} text-accent`}>
            {movieDetails?.genres.map((genre) => (
              <span key={genre.id}>{genre.name}</span>
            ))}
          </div>
          <p>{movieDetails?.overview}</p>
        </Col>
        <Col md={3} className="d-flex flex-column justify-content-end">
          {moviesList.some((movie) => movie.movieId.toString() === movieId) ? (
            <Button
              variant="danger"
              onClick={() => {
                deleteMovieFromListFetch(token, movieId, dispatch);
              }}
              className="mb-3 ms-auto"
            >
              RIMUOVI DALLA LISTA
            </Button>
          ) : (
            <>
              <Button
                variant="secondary"
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
            </>
          )}
        </Col>
      </Row>

      <Container>
        <Row className="mt-5">
          <Col md={3}>
            <p>
              <strong>Regista</strong>
              <span className="d-block">
                {movieCredits?.crew && movieCredits.crew.length > 0 ? movieCredits.crew[0].name : "Sconosciuto"}
              </span>
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

            {similarMovies.length > 0 && (
              <>
                <h2 className="mt-2">Film consigliati</h2>
                <MovieCard content={similarMovies} />
              </>
            )}
            <h2>Lascia la tua valutazione</h2>
            <StarRating getMyRatingFetch={getMyRatingFetch} />
            {/* box per lasciare un commento */}
            <div className={styles.movieDetails__commentSection}>
              <textarea
                className={`${styles.movieDetails__commentSection__comment} bg-dark text-light`}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Lascia un commento..."
              />
              <Button className={styles.movieDetails__commentSection__submitButton} onClick={handleCommentSubmit}>
                Invia Commento
              </Button>
            </div>
            {/* sezione per visualizzare il proprio commento viasualizzabile solo se esiste il commento */}
            {myComment && (
              <div className={`${styles.movieDetails__commentBox} bg-dark text-liht`}>
                <div className={styles.movieDetails__commentBox__commentHeader}>
                  <img
                    src={userInfo.avatar}
                    alt={`${userInfo.username}'s profile`}
                    className={styles.movieDetails__commentBox__profilePicture}
                  />
                  <div className={styles.movieDetails__commentBox__userInfo}>
                    <span className={styles.movieDetails__commentBox__userInfo__username}>{userInfo.username}</span>
                    <span className={`${styles.movieDetails__commentBox__userInfo__date} lead`}>
                      {new Date(myComment.dateComment).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <div className={styles.movieDetails__commentBox__commentContent}>{myComment.content}</div>
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default MovieDetailPage;
