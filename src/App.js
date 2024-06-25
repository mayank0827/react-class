import './App.css';
import MovieList from './Components/MovieList';
import MovieDetail from './Components/MovieDetails';
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import Header from './Components/Header';
import Favourite from './Components/Favourite';

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
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<MovieList />} />
          <Route path="/movie-list" element={<Navigate to={'/'} />} />
          <Route path="/movie-detail/:movieId" element={<MovieDetail />} />
          <Route path='/favourite' element={<Favourite />} />
          <Route path="*" element={<h1>Page not found!</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
