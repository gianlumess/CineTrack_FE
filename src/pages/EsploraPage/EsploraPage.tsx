import { useEffect, useState } from "react";
import Mynavbar from "../../components/Navbar/Mynavbar";
import { useDispatch } from "react-redux";
import { UserDataResponse } from "../../interfaces/UserInterfaces";
import { saveUserDataAction } from "../../redux/actions/userActions";
import { useNavigate } from "react-router-dom";

const EsploraPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");

  const getUserDataFetch = async (token: string) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const userData: UserDataResponse = await response.json();
        //INSERIRE DISPATCH PER AGGIORNARE I DATI UTENTE NELLO STORE
        dispatch(saveUserDataAction(userData));
      } else {
        const errorMessage = await response.json();
        setError(errorMessage.message || "errore nel recuperare i dati dell'utente");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      getUserDataFetch(token);
    } else {
      navigate("/login");
    }
  });

  return (
    <>
      <Mynavbar />
      <h1>ESPLORA</h1>
    </>
  );
};

export default EsploraPage;
