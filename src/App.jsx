import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Sidebar from "./Components/Sidebar";
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
import { useSelector } from "react-redux";
import ChangePassword from "./Pages/ChangePassword";
import ChangeName from "./Pages/ChangeName";

function App() {
  const userData = useSelector((state) => state.user.user);
  const user = userData?.user;
  /*useEffect(() => {
    axios
      .get("http://localhost:3002/user", { withCredentials: true })
      .then((response) => {
        if (response.data.user) {
          setLoggedUser(response.data.user);
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
          setLoggedUser(null);
        }
      })
      .catch(() => setLoggedUser(res.data.user));
  }, []);*/
  return (
    <Router>
      <Sidebar />
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<Home />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        {user ? (
          <Route path="/changepassword" element={<ChangePassword />} />
        ) : (
          " "
        )}
        {user ? <Route path="/changename" element={<ChangeName />} /> : " "}

        {user ? <Route path="/profile" element={<Profile />} /> : ""}
        <Route path="/movie/:id" element={<Movie />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
