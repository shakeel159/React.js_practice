import {useEffect, useState} from 'react';
import './App.css';
import MovieCard from './MovieCard';
import SearchIcon from './search.svg';

const API_URL = 'http://www.omdbapi.com?apikey=5244afbd';

const movie1 = {
    "Title": "The Amazing Spiderman 2 Webb Cut",
    "Year": "2021",
    "imdbID": "tt18351128",
    "Type": "movie",
    "Poster": "https://m.media-amazon.com/images/M/MV5BYzYzZDViNWYtNWViMS00NDMxLThlN2YtZjFkOWMwODkzNzhiXkEyXkFqcGdeQXVyMTUwMzM4NzU0._V1_SX300.jpg"
}

const App = () =>{
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState([]);

    const searchMovies = async (title) =>{ //async means this search might take time
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();

        setMovies(data.Search);
    }
    useEffect(() =>{ // useEffect calls action each event //'() -> {function here}' calls function inside {}
        searchMovies('Batman');
    },[]); //' ,[])' empty array means event will ony play on start
    return(
        <div className='app'>
            <h1>MovieInfo</h1>

            <div className = "search">
                <input
                    placeholder="Search for movies"
                    value = {searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <img 
                    src ={SearchIcon}
                    alt ="Search"
                    onClick={() => searchMovies(searchTerm)}
                />
            </div>

            {
                movies?.length>0
                    ?(
                        <div className = "container">
                        {movies.map((movie)=> (
                            <MovieCard movie = {movie}/>
                        ))}
                        </div>
                    ):(
                        <div className="empty">
                            <h2>No movies found</h2>
                        </div>
                    )
            }


        </div>
    );
}

export default App;