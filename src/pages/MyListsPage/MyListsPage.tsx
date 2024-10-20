import { useSelector } from "react-redux";
import MyShowsGallery from "../../components/MyShowsGallery/MyShowsGallery";
import Mynavbar from "../../components/Navbar/Mynavbar";
import { RootState } from "../../redux/store/store";

const MyListsPage = () => {
  const myMoviesList = useSelector((state: RootState) => state.user.moviesList);
  const mySeriesList = useSelector((state: RootState) => state.user.seriesList);
  return (
    <>
      <Mynavbar />
      <MyShowsGallery shows={myMoviesList} />
    </>
  );
};

export default MyListsPage;
