import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Esplora from "./pages/Esplora";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Esplora />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
