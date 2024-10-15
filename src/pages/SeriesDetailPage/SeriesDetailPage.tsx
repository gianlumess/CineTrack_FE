import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { SeriesCredits, SeriesDetails } from "../../interfaces/SeriesInterface";
import { setSeriesCreditsAction, setSeriesDetailsAction } from "../../redux/actions/seriesActions";
import { RootState } from "../../redux/store/store";

const SeriesDetailPage = () => {
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const { seriesId } = useParams<{ seriesId: string }>();
  const seriesDetails = useSelector((state: RootState) => state.series.seriesDetails);

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

  const getSeriesCreditsFetch = async (token: string) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/series/${seriesId}/credits`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const seriesData: SeriesCredits = await response.json();
        dispatch(setSeriesCreditsAction(seriesData));
      } else {
        const erroMessage = await response.json();
        setError(erroMessage.message || "errore nel recuperare i crediti della serie TV");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (token) {
      getSeriesDetailsFetch(token);
      getSeriesCreditsFetch(token);
    }
  }, []);

  return <h1>SERIES DETAIL</h1>;
};

export default SeriesDetailPage;
