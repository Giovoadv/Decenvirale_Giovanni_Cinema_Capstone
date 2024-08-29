import React, { useEffect } from "react";
import Navbar from "../Components/Navbar";
import "./Profile.css";
import { useSelector, useDispatch } from "react-redux";
import RemoveFavoutite from "../Components/RemoveFavoutite";
import axios from "axios";
import { favorite, clearFavorites } from "../Slices/favoriteMoviesSlice.js";

const imgPath = "https://image.tmdb.org/t/p/w500";
const apiKeyTwo = "api_key=db95773a7fb212ba790d71f6adac0e7e";
const apiUrl = import.meta.env.VITE_BACK_END_URL;

const Profile = () => {
  const token = localStorage.getItem("authToken");
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

    const res = await axios.delete(`${apiUrl}/deleteFavorite/${movie.id}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });
    fetchFavoriteMovies();
    console.log("Deleted Movie ", res);
  };

  const fetchFavoriteMovies = async () => {
    try {
      const res = await axios.get(`${apiUrl}/favourite`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

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
          <h1 className="profileTitle">
            Hello, <span className="userName">{user.name}</span>
          </h1>
          <span className="favoriteMoviesSpan">
            <h2 className="favoritesMovies">Favorites Movies</h2>
          </span>
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
