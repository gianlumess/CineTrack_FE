import {
  DataRegistration,
  MyComment,
  MyRating,
  UserDataResponse,
  UserMovie,
  UserSeries,
} from "../../interfaces/UserInterfaces";
import { AppDispatch } from "../store/store";

export const GET_TOKEN_FROM_LOGIN = "GET_TOKEN_FROM_LOGIN";
export const UPDATE_EMAIL_AFTER_REGISTRATION = "UPDATE_EMAIL_AFTER_REGISTRATION";
export const SAVE_USER_DATA = "SAVE_USER_DATA";
export const GET_MOVIES_IN_LIST = "GET_MOVIES_IN_LIST";
export const GET_SERIES_IN_LIST = "GET_SERIES_IN_LIST";
export const GET_MY_COMMENT = "GET_MY_COMMENT";
export const GET_MY_RATING = "GET_MY_RATING";

export const registerUserFetch = (dataRegistration: DataRegistration) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await fetch("http://localhost:3001/authorization/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataRegistration),
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        dispatch(updateEmailAfterRegistrationAction(dataRegistration.email));
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const getUserDataFetch = (token: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const userData: UserDataResponse = await response.json();

        dispatch(saveUserDataAction(userData));
      } else {
        const errorMessage = await response.json();
        setError(errorMessage.message || "errore nel recuperare i dati dell'utente");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const editMyProfileFetch = (token: string, userDataUpdated: DataRegistration) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/users/me`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userDataUpdated),
      });
      if (response.ok) {
        const data = await response.json();
        dispatch(getUserDataFetch(token));
      } else {
        const erroMessage = await response.json();
        console.log(erroMessage.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const updateProfilePictureFetch = (token: string, newAvatar: File, userId: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      const formData = new FormData();
      formData.append("pic", newAvatar); // Aggiungi il file dell'immagine a FormData

      const response = await fetch(`${import.meta.env.VITE_API_URL}/users/${userId}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`, // Aggiungi il token per l'autenticazione
        },
        body: formData, // Passa FormData come corpo della richiesta
      });

      if (response.ok) {
        const updatedUser = await response.json();
        console.log("Foto profilo aggiornata con successo!", updatedUser);
        dispatch(getUserDataFetch(token));
      } else {
        const errorMessage = await response.json();
        console.log(errorMessage.message || "Errore nell'aggiornamento della foto profilo");
      }
    } catch (error) {
      console.log("Si è verificato un errore:", error);
    }
  };
};

export const getSeriesInListFetch = (token: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/user_series/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const movieData: UserSeries[] = await response.json();
        dispatch(getSeriesInListAction(movieData));
      } else {
        const erroMessage = await response.json();
        console.log(erroMessage.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const getMoviesInListFetch = (token: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/user_movies/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const movieData: UserMovie[] = await response.json();
        dispatch(getMoviesInListAction(movieData));
      } else {
        const erroMessage = await response.json();
        console.log(erroMessage.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteMovieFromListFetch = async (token: string, movieId: string, dispatch: AppDispatch) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/user_movies/me?movieId=${movieId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      dispatch(getMoviesInListFetch(token));
    } else {
      const erroMessage = await response.json();
      console.log(erroMessage.message || "errore nel rimuovere il film dalla lista");
    }
  } catch (error) {
    console.log(error);
  }
};

export const deleteSeriesFromListFetch = async (token: string, seriesId: string, dispatch: AppDispatch) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/user_series/me?seriesId=${seriesId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      dispatch(getSeriesInListFetch(token));
    } else {
      const erroMessage = await response.json();
      console.log(erroMessage.message || "errore nel rimuovere la serie TV dalla lista");
    }
  } catch (error) {
    console.log(error);
  }
};

export const saveUserDataAction = (userData: UserDataResponse) => {
  return {
    type: SAVE_USER_DATA,
    payload: userData,
  };
};

export const getTokenFromLoginAction = (token: string) => {
  return {
    type: GET_TOKEN_FROM_LOGIN,
    payload: token,
  };
};

export const updateEmailAfterRegistrationAction = (email: string) => {
  return {
    type: UPDATE_EMAIL_AFTER_REGISTRATION,
    payload: email,
  };
};

export const getMoviesInListAction = (moviesInMyList: UserMovie[]) => {
  return {
    type: GET_MOVIES_IN_LIST,
    payload: moviesInMyList,
  };
};

export const getSeriesInListAction = (seriesInList: UserSeries[]) => {
  return {
    type: GET_SERIES_IN_LIST,
    payload: seriesInList,
  };
};

export const getMyCommentAction = (comment: MyComment | null) => {
  return {
    type: GET_MY_COMMENT,
    payload: comment,
  };
};

export const getMyRatingAction = (rating: MyRating) => {
  return {
    type: GET_MY_RATING,
    payload: rating,
  };
};
