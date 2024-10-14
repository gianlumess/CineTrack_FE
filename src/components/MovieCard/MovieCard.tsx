import { Card, Carousel } from "react-bootstrap";
import { MovieCarouselProps } from "../../interfaces/MoviesInterface";

const MovieCard: React.FC<MovieCarouselProps> = ({ content }) => {
  return (
    <Carousel>
      {content.map((show) => (
        <Carousel.Item key={show.id}>
          <Card className="text-center">
            <Card.Img
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
    </Carousel>
  );
};

export default MovieCard;
