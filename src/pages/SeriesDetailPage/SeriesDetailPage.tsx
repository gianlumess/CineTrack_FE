import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { SeriesDetails } from "../../interfaces/SeriesInterface";
import { setSeriesDetailsAction } from "../../redux/actions/seriesActions";

const SeriesDetailPage = () => {
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const { seriesId } = useParams<{ seriesId: string }>();

  const getSeriesDetailsFetch = async (token: string) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/series/${seriesId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const seriesData: SeriesDetails = await response.json();
        dispatch(setSeriesDetailsAction(seriesData));
      } else {
        const erroMessage = await response.json();
        setError(erroMessage.message || "errore nel recuperare i dati della serie TV");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (token) {
      getSeriesDetailsFetch(token);
    }
  }, []);

  return <h1>SERIES DETAIL</h1>;
};

export default SeriesDetailPage;
