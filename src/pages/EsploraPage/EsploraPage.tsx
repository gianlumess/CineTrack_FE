import { useCallback, useEffect } from "react";
import Mynavbar from "../../components/Navbar/Mynavbar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import MovieCard from "../../components/MovieCard/MovieCard";
import HeroBanner from "../../components/HeroBanner/HeroBanner";
import { Container } from "react-bootstrap";
import { setTopRatedMoviesAction, setTrendingMoviesAction } from "../../redux/actions/moviesActions";
import { setTopRatedSeriesAction, setTrendingSeriesAction } from "../../redux/actions/seriesActions";
import { RootState } from "../../redux/store/store";

const EsploraPage = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const trendingMovies = useSelector((state: RootState) => state.movies.trendingMovies);
  const topRatedMovies = useSelector((state: RootState) => state.movies.topRatedMovies);
  const trendingSeries = useSelector((state: RootState) => state.series.trendingSeries);
  const topRatedSeries = useSelector((state: RootState) => state.series.topRatedSeries);

  const getPopularMoviesFetch = useCallback(
    async (token: string) => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/movies/trending`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          dispatch(setTrendingMoviesAction(data.results));
        }
      } catch (error) {
        console.log(error);
      }
    },
    [dispatch]
  );

  const getPopularSeriesFetch = useCallback(
    async (token: string) => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/series/trending`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          dispatch(setTrendingSeriesAction(data.results));
        }
      } catch (error) {
        console.log(error);
      }
    },
    [dispatch]
  );

  const getTopRatedMoviesFetch = useCallback(
    async (token: string) => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/movies/top_rated`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          dispatch(setTopRatedMoviesAction(data.results));
        }
      } catch (error) {
        console.log(error);
      }
    },
    [dispatch]
  );

  const getTopRatedSeriesFetch = useCallback(
    async (token: string) => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/series/top_rated`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          dispatch(setTopRatedSeriesAction(data.results));
        }
      } catch (error) {
        console.log(error);
      }
    },
    [dispatch]
  );

  useEffect(() => {
    if (token) {
      getPopularMoviesFetch(token);
      getPopularSeriesFetch(token);
      getTopRatedMoviesFetch(token);
      getTopRatedSeriesFetch(token);
    } else {
      navigate("/login");
    }
  }, [token, getPopularMoviesFetch, getPopularSeriesFetch, getTopRatedMoviesFetch, getTopRatedSeriesFetch, navigate]);

  return (
    <>
      <Mynavbar />
      <HeroBanner />
      <Container className="mt-5">
        <h2 className="mb-4 d-inline-block">Film di tendenza</h2>
        <MovieCard content={trendingMovies} />
        <h2 className="mb-4 d-inline-block">Film più votati</h2>
        <MovieCard content={topRatedMovies} />
        <h2 className="mb-4 d-inline-block">Serie di tendenza</h2>
        <MovieCard content={trendingSeries} />
        <h2 className="mb-4 d-inline-block">Serie più votate</h2>
        <MovieCard content={topRatedSeries} />
      </Container>
    </>
  );
};

export default EsploraPage;
