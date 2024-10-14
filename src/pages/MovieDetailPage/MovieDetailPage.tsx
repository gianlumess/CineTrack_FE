import { useParams } from "react-router-dom";

const MovieDetailPage = () => {
  const [error, setError] = useState("");
  const { movieId } = useParams<{ movieId: string }>();
  const getMovieDetails = async (token: string) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/movies${movieId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const movieData = await response.json();
      } else {
        const erroMessage = await response.json();
        setError(erroMessage.message || "errore nel recuperare i dati del film");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return <h1>MOVIE DETAIL</h1>;
};

export default MovieDetailPage;
