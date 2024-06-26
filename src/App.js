import "./App.css";
import MovieList from "./Components/MovieList";
import MovieDetail from './Components/MovieDetails'
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import Header from './Components/Header'
import Favourite from "./Components/Favourite";
import { useState } from "react";
import { useEffect } from "react";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <MovieList />,
//   },{
//     path: "/movie-detail",
//     element: <MovieDetail />,
//   },
// ]);

function App() {
  const [favourites, setFavourites] = useState({});

  const updateLocalStorage = (data) => {
    localStorage.setItem('favourites', JSON.stringify(data));
  }

  const handleAddFavourite = (movie) => {
    setFavourites((prevData) => ({
      ...prevData,
      [movie.id]: movie,
    }));
  };

  const handleDeleteFavourite = (movie) => {
    setFavourites((prevData) => {
      const prevDataCopy = { ...prevData };
      delete prevDataCopy[movie.id];
      return prevDataCopy;
    });
  };

  useEffect(() => {
    const persistedFavourites = localStorage.getItem('favourites');
    if (persistedFavourites) {
      setFavourites(JSON.parse(persistedFavourites));
    }
  }, []);

  useEffect(() => {
    updateLocalStorage(favourites);
  }, [favourites]);

  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <MovieList
                favourites={favourites}
                onAdd={handleAddFavourite}
                onDelete={handleDeleteFavourite}
              />
            }
          />
          <Route path="/movie-list" element={<Navigate to={"/"} />} />
          <Route path="/movie-detail/:movieId" element={<MovieDetail />} />
          <Route
            path="/favourite"
            element={
              <Favourite favourites={favourites} onDelete={handleDeleteFavourite} />
            }
          />
          <Route path="*" element={<h1>Page not found!</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;