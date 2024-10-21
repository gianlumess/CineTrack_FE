import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import Mynavbar from "../../components/Navbar/Mynavbar";
import { Col, Container, Image, Row } from "react-bootstrap";
import MyShowsGallery from "../../components/MyShowsGallery/MyShowsGallery";
import { Link } from "react-router-dom";

const SearchPage = () => {
  const searchedMovies = useSelector((state: RootState) => state.movies.searchedMovies);
  const searchedSeries = useSelector((state: RootState) => state.series.searchedSeries);
  return (
    <>
      <Mynavbar />
      <Container>
        <h1>Ricerca per:</h1>
        <h3>Movies:</h3>
        <section className="my-3 d-flex flex-column">
          <Row className="gx-2 gy-2">
            {searchedMovies.map((movie) => (
              <Col xs={12} sm={6} md={4} lg={3} xxl={2} key={movie.id}>
                <Link to={`/movie-detail/${movie.id}`}>
                  <Image
                    className="img-fluid w-100 poster-movie"
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                  />
                </Link>
              </Col>
            ))}
          </Row>
        </section>
        <h3>Series:</h3>
        <section className="my-3 d-flex flex-column">
          <Row className="gx-2 gy-2">
            {searchedSeries.map((series) => (
              <Col xs={12} sm={6} md={4} lg={3} xxl={2} key={series.id}>
                <Link to={`/series-detail/${series.id}`}>
                  <Image
                    className="img-fluid w-100 poster-series"
                    src={`https://image.tmdb.org/t/p/w500${series.poster_path}`}
                    alt={series.name}
                  />
                </Link>
              </Col>
            ))}
          </Row>
        </section>
      </Container>
    </>
  );
};

export default SearchPage;
