import React, { useEffect } from "react";
import Navbar from "../Components/Navbar";
import "./Profile.css";
import { useSelector, useDispatch } from "react-redux";
import RemoveFavoutite from "../Components/RemoveFavoutite";
import axios from "axios";
import { favorite, clearFavorites } from "../Slices/favoriteMoviesSlice.js";

const imgPath = "https://image.tmdb.org/t/p/w500";
const apiKeyTwo = "api_key=db95773a7fb212ba790d71f6adac0e7e";

const Profile = () => {
  // Dispatch fn
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.user);

  const user = userData?.user;

  const favoriteMovies = useSelector(
    (state) => state.favoriteMoviesSlice.favoriteMovies
  );

  useEffect(() => {
    if (user) {
      fetchFavoriteMovies();
    } else {
      dispatch(clearFavorites());
    }
  }, [user]);

  const removeFavoriteMovie = async (movie) => {
    console.log("Remove movie", movie);

    const res = await axios.delete(
      `http://localhost:3002/deleteFavorite/${movie.id}`,
      { withCredentials: true }
    );
    fetchFavoriteMovies();
    console.log("Deleted Movie ", res);
  };

  const fetchFavoriteMovies = async () => {
    try {
      const res = await axios.get("http://localhost:3002/favourite", {
        withCredentials: true,
      });
      console.log("Favorite Movies Data", res.data);

      const favoriteMovies = await Promise.all(
        res.data.map(async (movieID) => {
          const movieRes = await axios.get(
            `https://api.themoviedb.org/3/movie/${movieID}?${apiKeyTwo}`
          );
          return movieRes.data;
        })
      );

      dispatch(favorite(favoriteMovies));
    } catch (error) {
      console.error("Error fetching favorite movies:", error);
    }
  };

  return (
    <div className="appWrapper">
      <div className="content-wrapper">
        <Navbar />
        <div className="profileContent">
          <h1>Welcome Home {user.name}</h1>
          <div className="movie-poster">
            {favoriteMovies.map((movie) => (
              <div key={movie.id} className="img-wrapper">
                <img src={imgPath + movie.poster_path} alt={movie.title} />
                <RemoveFavoutite
                  removeFavoriteMovie={removeFavoriteMovie}
                  movie={movie}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
