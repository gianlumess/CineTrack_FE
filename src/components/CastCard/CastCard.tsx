import { Card, Carousel } from "react-bootstrap";
import { CreditCardProps } from "../../interfaces/MoviesInterface";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const CastCard: React.FC<CreditCardProps> = ({ content }) => {
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
      {content.cast.map((person) => (
        <Carousel.Item key={person.id}>
          <Card className="text-center bg-dark text-light border-0">
            <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w500${person.profile_path}`} alt={person.name} />
            <Card.Body>
              <Card.Title>{person.name}</Card.Title>
            </Card.Body>
          </Card>
        </Carousel.Item>
      ))}
    </Slider>
  );
};

export default CastCard;
