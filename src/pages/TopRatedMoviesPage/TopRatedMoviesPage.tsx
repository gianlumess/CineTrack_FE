import { useEffect, useState } from "react";
import Mynavbar from "../../components/Navbar/Mynavbar";
import { Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "./TopRatedMoviesPage.module.scss";

const TopRatedMoviesPage = () => {
  const token: string = localStorage.getItem("token");
  const [movies, setMovies] = useState<any[]>([]);
  const [page, setPage] = useState(1);

  const getTopRatedMoviesFetch = async (token: string, page = 1) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/movies/top_rated?page=${page}`, {
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

  const loadMoreMovies = () => {
    const nextPage = page + 1;
    setPage(nextPage);

    getTopRatedMoviesFetch(token, nextPage);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const loadPreviousMovies = () => {
    if (page > 1) {
      const previousPage = page - 1;
      setPage(previousPage);
      getTopRatedMoviesFetch(token, previousPage);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    getTopRatedMoviesFetch(token, 1);
  }, [token]);

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
        <div className="d-flex justify-content-between">
          {page > 1 && <button onClick={loadPreviousMovies}>Precedenti</button>}
          <button onClick={loadMoreMovies}>Successivi</button>
        </div>
      </Container>
    </>
  );
};

export default TopRatedMoviesPage;
