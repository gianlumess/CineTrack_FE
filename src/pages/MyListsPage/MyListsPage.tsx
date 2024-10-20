import { useSelector } from "react-redux";
import MyShowsGallery from "../../components/MyShowsGallery/MyShowsGallery";
import Mynavbar from "../../components/Navbar/Mynavbar";
import { RootState } from "../../redux/store/store";
import { Container } from "react-bootstrap";

const MyListsPage = () => {
  const myMoviesList = useSelector((state: RootState) => state.user.moviesList);
  const mySeriesList = useSelector((state: RootState) => state.user.seriesList);
  return (
    <>
      <Mynavbar />
      <Container>
        {myMoviesList.length !== 0 && (
          <>
            <h2>My movies</h2>
            <MyShowsGallery shows={myMoviesList} />
          </>
        )}
        {mySeriesList.length !== 0 && (
          <>
            <h2>My series</h2>
            <MyShowsGallery shows={mySeriesList} />
          </>
        )}
      </Container>
    </>
  );
};

export default MyListsPage;
