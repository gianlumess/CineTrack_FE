import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { SeriesCredits, SeriesDetails } from "../../interfaces/SeriesInterface";
import {
  setSeriesCreditsAction,
  setSeriesDetailsAction,
  setSimilarSeriesAction,
} from "../../redux/actions/seriesActions";
import { AppDispatch, RootState } from "../../redux/store/store";
import { NewCommentDTO, UserSeries, UserSeriesDTO } from "../../interfaces/UserInterfaces";
import {
  getMyCommentAction,
  getMyRatingAction,
  getSeriesInListAction,
  getSeriesInListFetch,
} from "../../redux/actions/userActions";
import Mynavbar from "../../components/Navbar/Mynavbar";
import { Button, Col, Container, Image, Row } from "react-bootstrap";
import StarRating from "../../components/StarRating/StarRating";
import styles from "./SeriesDetailPage.module.scss";
import CastCard from "../../components/CastCard/CastCard";
import MovieCard from "../../components/MovieCard/MovieCard";

const SeriesDetailPage = () => {
  const token = localStorage.getItem("token");
  const dispatch: AppDispatch = useDispatch();
  const [error, setError] = useState("");
  const [comment, setComment] = useState("");
  const { seriesId } = useParams<{ seriesId: string }>();
  const userInfo = useSelector((state: RootState) => state.user.user);
  const seriesDetails = useSelector((state: RootState) => state.series.seriesDetails);
  const seriesCredits = useSelector((state: RootState) => state.series.seriesCredits);
  const similarSeries = useSelector((state: RootState) => state.series.similarSeries);
  const myComment = useSelector((state: RootState) => state.user.myComment);

  const getSeriesDetailsFetch = async (token: string) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/series/${seriesId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const seriesData: SeriesDetails = await response.json();
        dispatch(setSeriesDetailsAction(seriesData));
      } else {
        const erroMessage = await response.json();
        setError(erroMessage.message || "errore nel recuperare i dati della serie TV");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getSeriesCreditsFetch = async (token: string) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/series/${seriesId}/credits`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const seriesData: SeriesCredits = await response.json();
        dispatch(setSeriesCreditsAction(seriesData));
      } else {
        const erroMessage = await response.json();
        setError(erroMessage.message || "errore nel recuperare i crediti della serie TV");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const saveSeriesInListFetch = async (token: string, series: UserSeriesDTO) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/user_series`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(series),
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
      } else {
        const errorMessage = await response.json();
        setError(errorMessage.message || "errore nel salvare la serie nella tua lista");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getSimilarSeriesFetch = async (token: string) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/series/${seriesId}/similar`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        dispatch(setSimilarSeriesAction(data.results));
      } else {
        const erroMessage = await response.json();
        setError(erroMessage.message || "errore nel recuperare i dati delle serie");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getMyCommentFetch = async (token: string) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/comments/me/${seriesId}`, {
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
      const response = await fetch(`${import.meta.env.VITE_API_URL}/ratings/me/${seriesId}`, {
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
      const response = await fetch(`${import.meta.env.VITE_API_URL}/comments/me/${seriesId}`, {
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
    if (token) {
      getSeriesDetailsFetch(token);
      getSeriesCreditsFetch(token);
      getSimilarSeriesFetch(token);
      getMyCommentFetch(token);
      getMyRatingFetch(token);
    }
  }, []);

  return (
    <>
      <Mynavbar />
      <Row
        style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w1280${seriesDetails?.backdrop_path})` }}
        className={styles.seriesDetails__topBanner}
      >
        <Col md={3}>
          <Image
            className={styles.seriesDetails__topBanner__posterImage}
            src={`https://image.tmdb.org/t/p/w500${seriesDetails?.poster_path}`}
          ></Image>
        </Col>

        <Col md={6} className={styles.seriesDetails__topBanner__mainInfoSection}>
          <h1 className="mb-0">{seriesDetails?.name}</h1>

          <div className={styles.seriesDetails__topBanner__mainInfoSection__genreTag}>
            {seriesDetails?.genres.map((genre) => (
              <span key={genre.id}>{genre.name}</span>
            ))}
          </div>
          <p>{seriesDetails?.overview}</p>
        </Col>
        <Col md={3} className="d-flex flex-column justify-content-end">
          <Button
            onClick={() => {
              const showStatus = "WATCHED";
              saveSeriesInListFetch(token, { showStatus, seriesId });
            }}
            className="mb-3 ms-auto"
          >
            GIA' VISTO
          </Button>
          <Button
            onClick={() => {
              const showStatus = "TO_WATCH";
              saveSeriesInListFetch(token, { showStatus, seriesId });
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
              <span className="d-block">{seriesCredits?.crew[0].name}</span>
            </p>
            <p>
              <strong>Titolo originale</strong>
              <span className="d-block">{seriesDetails?.original_name}</span>
            </p>
            <p>
              <strong>Lingua originale</strong>
              <span className="d-block">{seriesDetails?.original_language}</span>
            </p>
            <p>
              <strong>Stato</strong>
              <span className="d-block">{seriesDetails?.status}</span>
            </p>
            <p>
              <strong>Durata episodio</strong>
              <span className="d-block">{seriesDetails?.episode_run_time} min</span>
            </p>
            <p>
              <strong>Numero Stagioni</strong>
              <span className="d-block">{seriesDetails?.number_of_seasons}</span>
            </p>
            <p>
              <strong>Numero episodi</strong>
              <span className="d-block">{seriesDetails?.number_of_episodes}</span>
            </p>
          </Col>
          <Col md={9}>
            <h2>CAST</h2>
            {seriesCredits && <CastCard content={seriesCredits} />}
            <h2 className="mt-2">Serie consigliate</h2>
            {similarSeries && <MovieCard content={similarSeries} />}
            <h2>Lascia la tua valutazione</h2>
            <StarRating getMyRatingFetch={getMyRatingFetch} />
            {/* box per lasciare un commento */}
            <div className={styles.seriesDetails__commentSection}>
              <textarea
                className={styles.seriesDetails__commentSection__comment}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Lascia un commento..."
              />
              <button className={styles.seriesDetails__commentSection__submitButton} onClick={handleCommentSubmit}>
                Invia Commento
              </button>
            </div>
            {/* sezione per visualizzare il proprio commento viasualizzabile solo se esiste il commento */}
            {myComment && (
              <div className={styles.seriesDetails__commentBox}>
                <div className={styles.seriesDetails__commentBox__commentHeader}>
                  <img
                    src={userInfo.avatar}
                    alt={`${userInfo.username}'s profile`}
                    className={styles.seriesDetails__commentBox__profilePicture}
                  />
                  <div className={styles.seriesDetails__commentBox__userInfo}>
                    <span className={styles.seriesDetails__commentBox__userInfo__username}>{userInfo.username}</span>
                    <span className={styles.seriesDetails__commentBox__userInfo__date}>
                      {new Date(myComment.dateComment).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <div className={styles.seriesDetails__commentContent}>{myComment.content}</div>
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default SeriesDetailPage;
