import CinemaNavbar from "./Components/CinemaNavbar";
import Carousel from "./Components/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Sidebar from "./Components/Sidebar";
import FeaturedMovies from "./Components/FeaturedMovies";
import { useState } from "react";
import Footer from "./Components/Footer";
import { Login } from "./Pages/Login";


function App() {
  const [movieType, setMovieType] = useState("now_playing");
  const handleClick = (e, value) => {
    e.preventDefault();
    setMovieType(value);
    console.log("click ", value);
  };

  return (
    <div className="appWrapper">
      {/* <BrowserRouter> */}
        <section className="sidebar-wrapper">
          <Sidebar handleClick={handleClick} />
        </section>
        <section className="content-wrapper">
          <CinemaNavbar />
          <section className="content-body">
            <section className="carousel-wrapper">
              <Carousel />
            </section>
            <section>
              <FeaturedMovies movieType={movieType} handleClick={handleClick} />
            </section>
            <section>
              <Footer />
            </section>
          </section>
        </section>
      {/* </BrowserRouter> */}
    </div>
  );
}

export default App;
