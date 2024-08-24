import CinemaNavbar from "./Components/CinemaNavbar";
import Carousel from "./Components/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Sidebar from "./Components/Sidebar";
import FeaturedMovies from "./Components/FeaturedMovies";
import { createContext, useEffect, useState } from "react";
import Footer from "./Components/Footer";
import "react-toastify/dist/ReactToastify.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { Login } from "./Pages/Login";
import Home from "./Components/Home";
import Register from "./Pages/Register";
import NotFoundPage from "./Pages/NotFoundPage";
import Profile from "./Pages/Profile";
import axios from "axios";
import Movie from "./Pages/Movie";

export const IsLoggedInContext = createContext();
export const SetLoggedInContext = createContext();

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  /*useEffect(() => {
    axios
      .get("http://localhost:3002/user", { withCredentials: true })
      .then((response) => {
        if (response.data.user) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      })
      .catch(() => setIsLoggedIn(false));
  }, []);*/

  return (
    
        <Router>
          <Sidebar />
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="*" element={<NotFoundPage />} />
            <Route
              path="/login"
              element={ <Login />}
            />
            <Route path="/signup" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/movie/:id" element={<Movie />} />
          </Routes>
          <Footer />
        </Router>
     
  );
}

export default App;
