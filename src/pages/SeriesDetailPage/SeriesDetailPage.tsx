import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { SeriesCredits, SeriesDetails } from "../../interfaces/SeriesInterface";
import {
  setSeriesCreditsAction,
  setSeriesDetailsAction,
  setSimilarSeriesAction,
} from "../../redux/actions/seriesActions";
import { AppDispatch, RootState } from "../../redux/store/store";
import { NewCommentDTO, UserSeriesDTO } from "../../interfaces/UserInterfaces";
import {
  deleteSeriesFromListFetch,
  getMyCommentAction,
  getMyRatingAction,
  getSeriesInListFetch,
} from "../../redux/actions/userActions";
import Mynavbar from "../../components/Navbar/Mynavbar";
import { Button, Col, Container, Image, Row } from "react-bootstrap";
import StarRating from "../../components/StarRating/StarRating";
import styles from "./SeriesDetailPage.module.scss";
import CastCard from "../../components/CastCard/CastCard";
import MovieCard from "../../components/MovieCard/MovieCard";

const SeriesDetailPage = () => {
  const token = localStorage.getItem("token")!;
  const dispatch: AppDispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [comment, setComment] = useState("");
  const { seriesId } = useParams<{ seriesId: string }>();
  const userInfo = useSelector((state: RootState) => state.user.user);
  const seriesList = useSelector((state: RootState) => state.user.seriesList);
  const seriesDetails = useSelector((state: RootState) => state.series.seriesDetails);
  const seriesCredits = useSelector((state: RootState) => state.series.seriesCredits);
  const similarSeries = useSelector((state: RootState) => state.series.similarSeries);
  const myComment = useSelector((state: RootState) => state.user.myComment);

  const getSeriesDetailsFetch = useCallback(
    async (token: string) => {
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
          console.log(erroMessage.message || "errore nel recuperare i dati della serie TV");
        }
      } catch (error) {
        console.log(error);
      }
    },
    [seriesId, dispatch]
  );

  const getSeriesCreditsFetch = useCallback(
    async (token: string) => {
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
          console.log(erroMessage.message || "errore nel recuperare i crediti della serie TV");
        }
      } catch (error) {
        console.log(error);
      }
    },
    [seriesId, dispatch]
  );

  const saveSeriesInListFetch = async (token: string, series: UserSeriesDTO) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/user_series`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(series),
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        await dispatch(getSeriesInListFetch(token));
      } else {
        const errorMessage = await response.json();
        console.log(errorMessage.message || "errore nel salvare la serie nella tua lista");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getSimilarSeriesFetch = useCallback(
    async (token: string) => {
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
          console.log(erroMessage.message || "errore nel recuperare i dati delle serie");
        }
      } catch (error) {
        console.log(error);
      }
    },
    [seriesId, dispatch]
  );

  const getMyCommentFetch = useCallback(
    async (token: string) => {
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
          console.log(erroMessage.message || "errore nel recuperare il commento");
        }
      } catch (error) {
        console.log(error);
      }
    },
    [seriesId, dispatch]
  );

  const getMyRatingFetch = useCallback(
    async (token: string) => {
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
          console.log(erroMessage.message || "errore nel recuperare la valutazione");
        }
      } catch (error) {
        console.log(error);
      }
    },
    [seriesId, dispatch]
  );

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
        console.log(errorMessage.message || "errore nel salvare il commento");
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
    setIsLoading(true);
    dispatch(getMyCommentAction(null));

    Promise.all([
      getSeriesDetailsFetch(token),
      getSeriesCreditsFetch(token),
      getSimilarSeriesFetch(token),
      getMyCommentFetch(token),
      getMyRatingFetch(token),
    ])
      .then(() => {
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, [
    seriesId,
    dispatch,
    getMyCommentFetch,
    getMyRatingFetch,
    getSeriesCreditsFetch,
    getSeriesDetailsFetch,
    getSimilarSeriesFetch,
    token,
  ]);

  return (
    <>
      {!isLoading && seriesDetails && (
        <>
          <Mynavbar />

          <Row
            style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w1280${seriesDetails?.backdrop_path})` }}
            className={styles.seriesDetails__topBanner}
          >
            <Col md={3}>
              <Image
                className={styles.seriesDetails__topBanner__posterImage}
                src={
                  seriesDetails?.poster_path
                    ? `https://image.tmdb.org/t/p/w500${seriesDetails?.poster_path}`
                    : "https://via.placeholder.com/500x750?text=No+Image+Available"
                }
              ></Image>
            </Col>

            <Col md={6} className={styles.seriesDetails__topBanner__mainInfoSection}>
              <h1 className="mb-0">{`${seriesDetails?.name} (${new Date(
                seriesDetails.first_air_date
              ).getFullYear()}) `}</h1>

              <div className={`${styles.seriesDetails__topBanner__mainInfoSection__genreTag} text-accent`}>
                {seriesDetails?.genres.map((genre) => (
                  <span key={genre.id}>{genre.name}</span>
                ))}
              </div>
              <p>{seriesDetails?.overview}</p>
            </Col>
            <Col md={3} className="d-flex flex-column justify-content-end">
              {seriesList.some((series) => series.seriesId.toString() === seriesId) ? (
                <Button
                  variant="danger"
                  onClick={() => {
                    if (seriesId) deleteSeriesFromListFetch(token, seriesId, dispatch);
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
                      if (seriesId) {
                        const showStatus = "WATCHED";
                        saveSeriesInListFetch(token, { showStatus, seriesId });
                      }
                    }}
                    className="mb-3 ms-auto"
                  >
                    GIA' VISTO
                  </Button>
                  <Button
                    onClick={() => {
                      if (seriesId) {
                        const showStatus = "TO_WATCH";
                        saveSeriesInListFetch(token, { showStatus, seriesId });
                      }
                    }}
                    className={`ms-auto ${styles.seriesDetails__topBanner__primaryButton}`}
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
                    {seriesCredits?.crew && seriesCredits.crew.length > 0 ? seriesCredits.crew[0].name : "Sconosciuto"}
                  </span>
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

                {similarSeries && (
                  <>
                    <h2 className="mt-2">Serie consigliate</h2>
                    <MovieCard content={similarSeries} />
                  </>
                )}
                <h2>Lascia la tua valutazione</h2>
                <StarRating getMyRatingFetch={getMyRatingFetch} />
                {/* box per lasciare un commento */}
                <div className={styles.seriesDetails__commentSection}>
                  <textarea
                    className={`${styles.seriesDetails__commentSection__comment} bg-dark text-light`}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Lascia un commento..."
                  />
                  <Button className={styles.seriesDetails__commentSection__submitButton} onClick={handleCommentSubmit}>
                    Invia Commento
                  </Button>
                </div>
                {/* sezione per visualizzare il proprio commento viasualizzabile solo se esiste il commento */}
                {myComment && (
                  <div className={`${styles.seriesDetails__commentBox} bg-dark text-light`}>
                    <div className={styles.seriesDetails__commentBox__commentHeader}>
                      <img
                        src={userInfo.avatar}
                        alt={`${userInfo.username}'s profile`}
                        className={styles.seriesDetails__commentBox__profilePicture}
                      />
                      <div className={styles.seriesDetails__commentBox__userInfo}>
                        <span className={styles.seriesDetails__commentBox__userInfo__username}>
                          {userInfo.username}
                        </span>
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
      )}
    </>
  );
};

export default SeriesDetailPage;
