import React from 'react';
import {useState, useEffect} from 'react';
import './App.css';
import SearchIcon from './search.svg'
import MovieCard from './MovieCard';

const API_URL = 'http://www.omdbapi.com?apikey=5b9209fa'

//we use this as static data to render out something so that we know what jsx we writing
/*
const movie = {
    "Title": "Italian Spiderman",
    "Year": "2007",
    "imdbID": "tt2705436",
    "Type": "movie",
    "Poster": "https://m.media-amazon.com/images/M/MV5BYjFhN2RjZTctMzA2Ni00NzE2LWJmYjMtNDAyYTllOTkyMmY3XkEyXkFqcGdeQXVyNTA0OTU0OTQ@._V1_SX300.jpg"
}
*/

const App = () => { 
    
    const [movies, setMovies] = useState([]);
    //We pass empty string initially because our searchterm will be empty at first. 
    const [searchTerm, setSearchTerm] = useState([""])
    
    //async: asynchronous data which means takes time to fetch these movies
    //this function will accept title of the movie that you want to search by
    const searchMovies = async (title) => {
        /* 
        Fetch API can be used with fetch method which then lets you talk with other APIs. 
        basic syntax: let promise = fetch(url, [options]) where url: url to access and options: optional parameters like method and headers
        without options, this is a simple GET request, downloading contents of the url
        fetch returns data in form of promises. Fetch returns a promise which is resolved
        to the Response object when the request completes. Now, you need to way for this 
        promise to reolsve into the Response object. One way is to use then to capture response. 
        Also, if the request fails the, the promise is rejected. 

        A better to handle promsie is through async/await keywords: start by specifying the caller
        function as async and then use await to handle the promise. Await is only valid within async function. 
        Await expressions make promise-returning functions behave as though they are synchronous by 
        suspending execution untilt he returned promise is fulfilled or rejected. Because of the await 
        keyword, the asynchronous function pauses until the promise is resolved. 

        Pretty good explanation: https://rapidapi.com/guides/fetch-api-async-await
        more on async functions: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function

        `` are called template literals. Along with normal strings, template literals can contain other parts
        called placeholders in this form: ${placeHolderVariable}
        */
        const response = await fetch(`${API_URL}&s=${title}`);

        /*Although we have the Response object now, we cant access the data inside it right away. 
        The response object returned by await fetch supports multiple functions for different data formats, which include:
        response.json: Returns data as a JSON Object ...
        These functions return a promise which resolved into the specific data form. 
        So, we use await keyword again to extract the API response. 
        */

        const data = await response.json()
        setMovies(data.Search)
        console.log(movies[0])
    }
    //The empty dependency array is so that the hook can only be called at the start of the program
    useEffect(() => {
        searchMovies('Batman')
    },[])

    return (
        <div className= 'app'> 
            <h1>Movieland</h1>
            <div className='search'> 
              <input            
                placeholder='Search for movies'
                //This will make it empty at the start and will show the placeholder
                value={searchTerm}
                //this allows us to type in a search term. 
                onChange={(e)=>setSearchTerm(e.target.value)}
              />
              <img 
                src = {SearchIcon}
                alt= "search"
                onClick={()=> searchMovies(searchTerm)}
              />
            </div> 
            {
                    //NOTE: So this is supposed to be opposite. If movies.length > 0, render moviecard. 
                    //But that didn't work and when i reversed, it worked. No idea. 
                    //if movies length is > 0, reder moviecard
                    movies?.lenth > 0 ? //render a div with "No movies found"
                        (
                            <div className="empty"> 
                            <h2>No movies found</h2>
                            </div>
                        )  : 
                        
                        (
                            <div className='container'>
                            {
                            /* we map over movies array and then we will get each entry from the array in form of 
                            "movie" */  
                            movies.map((movie)=>(
                                //We want to render a MovieCard component for each iteration of the loop
                                //We pass a movie prop. 
                                <MovieCard movie={movie} />
                            ))
                            }
                            </div>
                        )
            }


        </div> 
    );
}

export default App;