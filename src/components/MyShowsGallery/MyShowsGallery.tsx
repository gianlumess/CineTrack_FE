import { Col, Image, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { UserMovie, UserSeries } from "../../interfaces/UserInterfaces";
import { useEffect, useState } from "react";
import { MovieDetails } from "../../interfaces/MoviesInterface";

import { SeriesDetails } from "../../interfaces/SeriesInterface";

interface MyshowsGalleryProps {
  shows: UserMovie[] | UserSeries[];
}
const MyShowsGallery: React.FC<MyshowsGalleryProps> = ({ shows }) => {
  const [showDetails, setShowDetails] = useState<(MovieDetails | SeriesDetails)[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const token: string = localStorage.getItem("token");

  useEffect(() => {
    const fetchShowDetails = async () => {
      setIsLoading(true);
      setError(null);
      const fetchedDetails: (MovieDetails | SeriesDetails)[] = [];

      for (const show of shows) {
        try {
          if ((show as UserMovie).movieId !== undefined) {
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
              setError(errorMessage.message || "Errore nel recuperare i dati del film");
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
              setError(errorMessage.message || "Errore nel recuperare i dati della serie TV");
            }
          }
        } catch (error) {
          console.error("Errore durante la fetch dei dettagli dello show:", error);
          setError("Si è verificato un errore durante la fetch dei dettagli dello show.");
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
      {/* {this.state.isLoading && <Spinner animation="border" role="status" variant="currentColor"></Spinner>} */}
      <Row className="gx-2 gy-2">
        {showDetails.map((show) => (
          <Col xs={12} sm={6} md={4} lg={3} xxl={2} key={show.id}>
            <Link to={show.title ? `/movie-detail/${show.id}` : `/series-detail/${show.id}`}>
              <Image
                className="img-fluid w-100 poster-show"
                src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
                alt={show.title || show.name}
              />
            </Link>
          </Col>
        ))}
      </Row>
    </section>
  );
};

export default MyShowsGallery;
