import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import store from "./store.js";
import { Provider } from "react-redux";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, Router, RouterProvider } from "react-router-dom";
import { Login } from "./Pages/Login.jsx";
import NotFoundPage from "./Pages/NotFoundPage.jsx";
import Register from "./Pages/Register.jsx";
import Profile from "./Pages/Profile.jsx";
import { ToastContainer } from "react-toastify";
import Home from "./Components/Home.jsx";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Home />,
//     errorElement: <NotFoundPage />,
//   },
//   {
//     path: "/login",
//     element: <Login />,
//   },
//   {
//     path: "/signup",
//     element: <Register />,
//   },
//   {
//     path: "/profile",
//     element: <Profile />,
//   },
// ]);
{
  /* <RouterProvider router={router} /> */
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
