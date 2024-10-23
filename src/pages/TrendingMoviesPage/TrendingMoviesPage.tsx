import { useState } from "react";
import { useDispatch } from "react-redux";
import Mynavbar from "../../components/Navbar/Mynavbar";
import { Card, Col, Container, Row } from "react-bootstrap";
import MyShowsGallery from "../../components/MyShowsGallery/MyShowsGallery";
import { Link } from "react-router-dom";
import styles from "./TrendingMoviesPage.module.scss";

const TrendingMoviesPage = () => {
  const token: string = localStorage.getItem("token");
  const [movies, setMovies] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();

  const loadMoreMovies = () => {
    const nextPage = page + 1;
    setPage(nextPage);

    const getPopularMoviesFetch = async (token: string, page = 1) => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/movies/trending?page=${page}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setMovies(data.results);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getPopularMoviesFetch(token, nextPage);
  };

  return (
    <>
      <Mynavbar />
      <Container>
        <section className="my-3 d-flex flex-column">
          <Row className="gx-2 gy-2">
            {movies.map((movie) => (
              <Col xs={12} sm={6} md={4} lg={3} xxl={2} key={movie.id}>
                <Link to={`/movie-detail/${movie.id}`}>
                  <Card className="text-center bg-dark text-light border-0">
                    <Card.Img
                      className={`${styles.movieCard__cardImage}`}
                      variant="top"
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={movie.title || movie.name}
                    />
                    <Card.Body>
                      <Card.Title>{movie.title}</Card.Title>
                    </Card.Body>
                  </Card>
                </Link>
              </Col>
            ))}
          </Row>
        </section>
        <button onClick={loadMoreMovies}>Successivi</button>
      </Container>
    </>
  );
};

export default TrendingMoviesPage;
