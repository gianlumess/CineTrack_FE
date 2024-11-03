import { Col, Image, Row, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { UserMovie, UserSeries } from "../../interfaces/UserInterfaces";
import { useEffect, useState } from "react";
import { MovieDetails } from "../../interfaces/MoviesInterface";

import { SeriesDetails } from "../../interfaces/SeriesInterface";
import styles from "./MyShowGallery.module.scss";

interface MyshowsGalleryProps {
  shows: UserMovie[] | UserSeries[];
}
const MyShowsGallery: React.FC<MyshowsGalleryProps> = ({ shows }) => {
  const [showDetails, setShowDetails] = useState<(MovieDetails | SeriesDetails)[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const token: string | null = localStorage.getItem("token");

  useEffect(() => {
    const fetchShowDetails = async () => {
      setIsLoading(true);

      const fetchedDetails: (MovieDetails | SeriesDetails)[] = [];

      for (const show of shows) {
        try {
          if ("movieId" in show) {
            // Fetch per i dettagli del film
            const movieId = show.movieId;
            const response = await fetch(`${import.meta.env.VITE_API_URL}/movies/${movieId}`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });

            if (response.ok) {
              const movieData: MovieDetails = await response.json();
              fetchedDetails.push(movieData);
            } else {
              const errorMessage = await response.json();
              console.log(errorMessage.message || "Errore nel recuperare i dati del film");
            }
          } else {
            // Fetch per i dettagli della serie TV
            const seriesId = show.seriesId;
            const response = await fetch(`${import.meta.env.VITE_API_URL}/series/${seriesId}`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });

            if (response.ok) {
              const seriesData: SeriesDetails = await response.json();
              fetchedDetails.push(seriesData);
            } else {
              const errorMessage = await response.json();
              console.log(errorMessage.message || "Errore nel recuperare i dati della serie TV");
            }
          }
        } catch (error) {
          console.error("Errore durante la fetch dei dettagli dello show:", error);
          console.log("Si è verificato un errore durante la fetch dei dettagli dello show.");
        }
      }

      setShowDetails(fetchedDetails);
      setIsLoading(false);
    };

    if (shows.length > 0) {
      fetchShowDetails();
    }
  }, [shows, token]);
  return (
    <section className="my-3 d-flex flex-column">
      {isLoading ? (
        <Spinner animation="border" role="status" variant="primary" />
      ) : (
        <Row className="gx-2 gy-2">
          {showDetails.map((show) => {
            if ("title" in show) {
              // se show è un oggetto di tipo MovieDetails
              return (
                <Col xs={12} sm={6} md={4} lg={3} xxl={2} key={show.id}>
                  <Link to={`/movie-detail/${show.id}`}>
                    <Image
                      className={`${styles.card} img-fluid w-100 `}
                      src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
                      alt={show.title}
                    />
                  </Link>
                </Col>
              );
            } else if ("name" in show) {
              // se show è un oggetto di tipo SeriesDetails
              return (
                <Col xs={12} sm={6} md={4} lg={3} xxl={2} key={show.id}>
                  <Link to={`/series-detail/${show.id}`}>
                    <Image
                      className={`${styles.card} img-fluid w-100 `}
                      src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
                      alt={show.name}
                    />
                  </Link>
                </Col>
              );
            } else {
              return null;
            }
          })}
        </Row>
      )}
    </section>
  );
};

export default MyShowsGallery;
