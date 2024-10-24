import { Card, Carousel } from "react-bootstrap";
import { MovieCarouselProps } from "../../interfaces/MoviesInterface";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./MovieCard.module.scss";
import { Link } from "react-router-dom";

const MovieCard: React.FC<MovieCarouselProps> = ({ content }) => {
  // Configurazione delle impostazioni del carosello
  const settings = {
    dots: false, // Mostra i puntini di navigazione
    infinite: true, // Abilita lo scorrimento infinito
    speed: 500, // Velocità di transizione in millisecondi
    slidesToShow: 4, // Numero di elementi mostrati per ogni slide
    slidesToScroll: 2,
    initialSlide: 0, // Numero di elementi da scorrere alla volta
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Slider {...settings}>
      {content.map((show) => (
        <Carousel.Item key={show.id}>
          <Link to={show.title ? `/movie-detail/${show.id}` : `/series-detail/${show.id}`}>
            <Card className="text-center bg-dark text-light border-0">
              <Card.Img
                className={`${styles.movieCard__cardImage}`}
                variant="top"
                src={
                  show.poster_path
                    ? `https://image.tmdb.org/t/p/w500${show.poster_path}`
                    : "https://via.placeholder.com/500x750?text=No+Image+Available"
                }
                alt={show.title || show.name}
              />
              <Card.Body>
                <Card.Title>{show.title || show.name}</Card.Title>
              </Card.Body>
            </Card>
          </Link>
        </Carousel.Item>
      ))}
    </Slider>
  );
};

export default MovieCard;
