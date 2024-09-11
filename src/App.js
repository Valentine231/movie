import { useEffect, useState } from "react";

const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

const KEY = '26f0e5e'


export default function App() {
  const [query, setQuery] = useState("transformers");
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading,setisLoading]= useState(false)
  const [error, seterror] = useState('')
  const [selectedId, setselectedId] = useState(null)
 

/*
 useEffect(() =>{
  console.log('After the initail render')
 },[])

 useEffect(() =>{
  console.log('after every render')
 })

 useEffect(() =>{
  console.log('D')
 },[query])

 console.log('during render')
  */
const handleselect = (id)=> {
  setselectedId(id)
}

  useEffect(() => {
    
   const fetchmovie =  async ()=>{
   try{ 
    setisLoading(true)
    seterror('')
     const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=${query}`)
     if(!res.ok){
       throw new Error('something went wrong with fetching movie')
     }
     const data = await res.json();
     if(data.Response === 'false') throw new Error ("movie about that")
     setMovies(data.Search)
    console.log(data.Search)
     
  } catch (err) {
    console.error(err.message);
    seterror(err.message);
  } finally {
    setisLoading(false)
  }

  if(query.length <3){
    setMovies([]);
    seterror('')
    return;
  }

}

  fetchmovie()
  }, [query]);

   return (
     <>
      <NavBar  >
    <Search query={query} setQuery={setQuery} />
    <NumResults  movies={movies}/>
      </NavBar>
      <Main movies={movies}>
       
      <Box >
        {/* {isLoading ? <Laoder /> : <MovieList  movies={movies}/>} */}
        {isLoading && <Laoder />}
        {!isLoading && !error &&  <MovieList  movies={movies} handleselect={handleselect}/>}
        {error && <Errormessage message={error} />}
      
      </Box>
      <Box>
      
            { selectedId ? <MovieDetails selectedId={selectedId} /> : 
              (
                <>
              <WatchedSummary  watched={watched}/>
            <WatchedMovieList watched={watched} />
            </>
            ) }

         
      </Box> 
     
      </Main>
 
     </>
   );
 }
 
 const Laoder =()=> {
  return (
    <p className="loader">Loading....</p>
  )
 }

 const Errormessage =({message})=> {
  return(
    <p className="error">
      <span>🛑</span>{message}</p>
  )
 }

  const NavBar =({children})=> {
  
    return (
      <nav className="nav-bar">
        <Logo />
    {children}
    </nav>
    )
  }

  const NumResults =({movies})=> {
    return(
      <p className="num-results">
      Found <strong>{Movies.length}</strong> results
    </p>
    )
  }
  const Logo =()=> {
    return(
      <div className="logo">
        <span role="img">🍿</span>
        <h1>usePopcorn</h1>
      </div>
    )
  }

  const Search =({query,setQuery})=> {
    return (
      <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
    )
  }

  const Main =({children})=> {
    return (
      <main className="main">
      {children}
       </main>
       
    )
  }

  const Box =({children})=> {
    
    const [isOpen, setIsOpen] = useState(true);
    return(
      
      <div className="box">
          <button
            className="btn-toggle"
            onClick={() => setIsOpen((open) => !open)}
          >
            {isOpen ? "–" : "+"}
          </button>
          {isOpen && (
            children
            
          )}
        </div>
        
    )
  }


  // const WatchedBox =()=> {
     
  //   const [watched, setWatched] = useState(tempWatchedData);
  //   const [isOpen2, setIsOpen2] = useState(true)
 
  //   return (
      
      
  //     <div className="box">
  //       <button
  //         className="btn-toggle"
  //         onClick={() => setIsOpen2((open) => !open)}
  //       >
  //         {isOpen2 ? "–" : "+"}
  //       </button>
  //       {isOpen2 && (
         
  //       )}
  //     </div>
    
    
  //   )
  // }

  

  const MovieList = ({movies,handleselect})=> {
  
    return(
      <ul className="list">
              {movies?.map((movie) => (
             <Movies movie={movie} key={movie.imdbID} handleselect={handleselect}/>
              ))}
            </ul>
    )
  }

  const Movies =({movie,handleselect})=> {
    return(
      <li onClick={()=>handleselect(movie.imdbID)}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
    )
  }

  const MovieDetails =({selectedId})=> {
    return <div className="list list-detail">{selectedId}</div>
  }

  const WatchedSummary =({watched})=> {
    const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
    const avgUserRating = average(watched.map((movie) => movie.userRating));
    const avgRuntime = average(watched.map((movie) => movie.runtime))
    return(<div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>)
  }
  const WatchedMovieList =({watched})=> {
    return(

      <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie  movie={movie} key={movie.imdbID}/>
       
      ))}
    </ul>
    )
  }

  const WatchedMovie =({movie})=> {
    return(
      <li >
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
      </div>
    </li>
    )
  }

