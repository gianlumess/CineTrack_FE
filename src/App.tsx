import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import EsploraPage from "./pages/EsploraPage";
import RegistrationPage from "./pages/RegistrationPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<EsploraPage />}></Route>
          <Route path="/register" element={<RegistrationPage />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
