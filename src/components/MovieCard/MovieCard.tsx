import { Card, Carousel } from "react-bootstrap";
import { MovieCarouselProps } from "../../interfaces/MoviesInterface";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./MovieCard.module.scss";

const MovieCard: React.FC<MovieCarouselProps> = ({ content }) => {
  // Configurazione delle impostazioni del carosello
  const settings = {
    dots: false, // Mostra i puntini di navigazione
    infinite: false, // Abilita lo scorrimento infinito
    speed: 500, // Velocità di transizione in millisecondi
    slidesToShow: 4, // Numero di elementi mostrati per ogni slide
    slidesToScroll: 1,
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
          <Card className="text-center">
            <Card.Img
              className={`${styles.movieCard__cardImage}`}
              variant="top"
              src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
              alt={show.title || show.name}
            />
            <Card.Body>
              <Card.Title>{show.title || show.name}</Card.Title>
            </Card.Body>
          </Card>
        </Carousel.Item>
      ))}
    </Slider>
  );
};

export default MovieCard;
