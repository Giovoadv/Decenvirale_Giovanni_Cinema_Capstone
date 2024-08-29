# Cinema App

## Overview

The Cinema App is a movie website that allows users to search for movies, view details, and explore featured films. The app provides a user-friendly interface with a responsive design, leveraging various technologies to create an engaging experience for movie enthusiasts.

## Technologies Used

- **React**: A JavaScript library for building user interfaces. It is used here to create interactive components and manage state.
- **Bootstrap**: A CSS framework used for styling and ensuring the app is responsive across different devices. Included via `bootstrap/dist/css/bootstrap.min.css` and `bootstrap/dist/js/bootstrap.bundle.min`.
- **Axios**: A promise-based HTTP client for making API requests. It is used to fetch movie data from The Movie Database (TMDb) API.
- **React Router**: A library for routing in React applications, used to manage navigation within the app (although routing isn't fully utilized in this version).
- **TMDb API**: Provides movie data including posters, titles, and more. This API is used to populate the movie details and featured movies sections.


## Features
- **Login Page**: Users can log in with their email and password.
- **Signup Page**: New users can create an account with their email, name, and password.
- **Logout Page**: Users can log out of their account, which will clear their session.
- **Profile Page**: Users can view and manage their profile information and add their favorite movies.

## Approach Taken

1. **Component-Based Architecture**:
   - The application is divided into several React components such as `CinemaNavbar`, `Carousel`, `Sidebar`, `FeaturedMovies`, and `Footer`.
   - Each component is responsible for specific parts of the user interface and functionality, improving modularity and maintainability.

2. **State Management**:
   - React hooks (`useState` and `useEffect`) manage the application state and side effects. For example, `useState` handles the search query, modal visibility, and fetched movie data, while `useEffect` manages side effects related to fetching movie data when the modal is opened.

3. **Responsive Design**:
   - The application is styled using CSS and Bootstrap to ensure it works well on various screen sizes.

4. **API Integration**:
   - Axios is used to send requests to the TMDb API based on the user's search query.
   - Movie data is fetched and displayed in the modal and other sections of the app.

5.   **User Authentication**:

- Users can log in, sign up, and log out. Session management is handled on the server side with Express.js and sessions.

6.   **Profile Management**:

- Users can view their profile information and manage their favorite movies, which are stored and retrieved from the database.

## Live Site

You can view the live version of the Cinema App at [https://decenvirale-giovanni-cinema-capstone-ifiv.onrender.com]

## Usage Instructions

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Giovoadv/Decenvirale_Giovanni_Cinema_Capstone.git


