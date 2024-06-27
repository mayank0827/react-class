import { useContext, useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Pagination from "./Pagination";
import { FavouriteMovieContext } from "../Context/FavouriteMovieContext";


const MovieList = () => {
    const { favourites, onAdd, onDelete } = useContext(FavouriteMovieContext);
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        loadMovieByPage(1);
    }, []);

    const loadMovieByPage = (pageNo) => {
        fetch(`https://api.themoviedb.org/3/movie/popular?api_key=0b5415eb9bf023d556ef265b425e0e4a&language=en-US&page=${pageNo}`)
            .then((res) => res.json())
            .then(data => setMovies(data.results));
    }

    return (
        <div className="movielist-wrapper">
            <div className="movielist-heading">
                <h1>Trending {Object.keys(favourites).length}</h1>
            </div>
            <div className="movielist">
                {
                    movies.map(movie => (
                        <div className="movie">
                            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} />
                            <Link to={`/movie-detail/${movie.id}`}><h2>{movie.original_title}</h2></Link>
                            {
                             favourites[movie.id] ? (
                                <button onClick={() => onDelete(movie)}>Remove from Favourites</button>
                             ) : (
                                 <button onClick={() => onAdd(movie)}>Add to Favourites</button>
                             ) 
                            }
                        </div>
                    ))
                }
            </div>
            <Pagination loadMovieByPage={loadMovieByPage} />
        </div>
    )
}

export default MovieList;