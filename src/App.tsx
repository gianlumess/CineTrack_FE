import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import EsploraPage from "./pages/EsploraPage/EsploraPage";
import RegistrationPage from "./pages/RegistrationPage/RegistrationPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import MovieDetailPage from "./pages/MovieDetailPage/MovieDetailPage";
import SeriesDetailPage from "./pages/SeriesDetailPage/SeriesDetailPage";
import MyProfilePage from "./pages/MyprofilePage/MyProfilePage";
import MyListsPage from "./pages/MyListsPage/MyListsPage";
import SearchPage from "./pages/SearchPage/SearchPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<EsploraPage />}></Route>
          <Route path="/register" element={<RegistrationPage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/movie-detail/:movieId" element={<MovieDetailPage />}></Route>
          <Route path="/series-detail/:seriesId" element={<SeriesDetailPage />}></Route>
          <Route path="/my-profile" element={<MyProfilePage />}></Route>
          <Route path="/my-lists" element={<MyListsPage />}></Route>
          <Route path="/search" element={<SearchPage />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
