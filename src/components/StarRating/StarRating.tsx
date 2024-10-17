import React, { useState } from "react";
import styles from "./StarRating.module.scss";
import { useParams } from "react-router-dom";

interface NewRatingDTO {
  rating: number;
}

interface StarRatingProps {
  getMyRatingFetch: (token: string) => Promise<void>;
}

const StarRating: React.FC<StarRatingProps> = ({ getMyRatingFetch }) => {
  const token = localStorage.getItem("token");
  const [currentRating, setCurrentRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [error, setError] = useState("");
  const maxStars = 5;
  const { movieId } = useParams<{ movieId: string }>();
  const { seriesId } = useParams<{ seriesId: String }>();

  const saveRatingFetch = async (token: string, rating: NewRatingDTO) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/ratings/me/${movieId || seriesId}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(rating),
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        await getMyRatingFetch(token);
      } else {
        const errorMessage = await response.json();
        setError(errorMessage.message || "errore nel salvare la valutazione");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleStarClick = (rating: number) => {
    const newRating: NewRatingDTO = {
      rating: rating,
    };
    setCurrentRating(rating);
    saveRatingFetch(token, newRating);
    // Qui puoi aggiungere la logica per inviare la valutazione al server
    console.log("Valutazione inviata:", rating);
  };

  return (
    <div className={styles.starRating}>
      {[...Array(maxStars)].map((_, index) => {
        const starNumber = index + 1;
        return (
          <span
            key={index}
            className={`${styles.star} ${starNumber <= (hoveredRating || currentRating) ? styles.filled : ""}`}
            onMouseEnter={() => setHoveredRating(starNumber)}
            onMouseLeave={() => setHoveredRating(0)}
            onClick={() => handleStarClick(starNumber)}
          >
            ★
          </span>
        );
      })}
    </div>
  );
};

export default StarRating;
