import { useSelector } from "react-redux";
import styles from "./HeroBanner.module.scss";
import { RootState } from "../../redux/store/store";
import Slider from "react-slick";

const HeroBanner = () => {
  const trendingMovies = useSelector((state: RootState) => state.movies.trendingMovies);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className={styles.heroBanner}>
      <Slider {...settings}>
        {trendingMovies.map((movie) => (
          <div className={styles.slideContainer} key={movie.id}>
            <img
              className={styles.heroBanner__image}
              src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
              alt={movie.title}
            />
            <div className={styles.heroBanner__overlay} />
            <div className={styles.heroBanner__titleOverlay}>
              <h1>{`${movie.title} (${new Date(movie.release_date).getFullYear()})`}</h1>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default HeroBanner;
