import { useEffect, useState } from "react";
import Mynavbar from "../../components/Navbar/Mynavbar";
import { Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "./TrendingSeriesPage.module.scss";
import { Iseries } from "../../interfaces/SeriesInterface";
import { ChevronLeft, ChevronRight } from "react-bootstrap-icons";

const TrendingSeriesPage = () => {
  const token: string = localStorage.getItem("token");
  const [movies, setMovies] = useState<Iseries[]>([]);
  const [page, setPage] = useState(1);

  const getPopularSeriesFetch = async (token: string, page = 1) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/series/trending?page=${page}`, {
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

    getPopularSeriesFetch(token, nextPage);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const loadPreviousMovies = () => {
    if (page > 1) {
      const previousPage = page - 1;
      setPage(previousPage);
      getPopularSeriesFetch(token, previousPage);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    getPopularSeriesFetch(token, 1);
  }, [token]);

  return (
    <>
      <Mynavbar />
      <Container>
        <section className="my-3 d-flex flex-column">
          <Row className="gx-2 gy-2">
            {movies.map((series) => (
              <Col xs={12} sm={6} md={4} lg={3} xxl={2} key={series.id}>
                <Link to={`/series-detail/${series.id}`}>
                  <Card className="text-center bg-dark text-light border-0">
                    <Card.Img
                      className={`${styles.seriesCard__cardImage}`}
                      variant="top"
                      src={`https://image.tmdb.org/t/p/w500${series.poster_path}`}
                      alt={series.name}
                    />
                    <Card.Body>
                      <Card.Title>{series.name}</Card.Title>
                    </Card.Body>
                  </Card>
                </Link>
              </Col>
            ))}
          </Row>
        </section>
        <div className="d-flex justify-content-center align-items-center">
          <div className="d-flex align-items-center">
            <ChevronLeft
              onClick={page > 1 ? loadPreviousMovies : undefined}
              style={{ cursor: page > 1 ? "pointer" : "not-allowed", opacity: page > 1 ? 1 : 0.5, fontSize: "2rem" }}
            >
              Precedenti
            </ChevronLeft>
          </div>

          <div className="mx-3 d-flex align-items-center">
            <ChevronRight onClick={loadMoreMovies} style={{ cursor: "pointer", fontSize: "2rem" }}>
              Successivi
            </ChevronRight>
          </div>
        </div>
      </Container>
    </>
  );
};

export default TrendingSeriesPage;
