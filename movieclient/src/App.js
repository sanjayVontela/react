import logo from './logo.svg';
import './App.css';
import api from './api/axiosConfig';
import { useState,useEffect } from 'react';
import Layout from './components/Layout';
import { Routes,Route } from 'react-router-dom';
import Home from './components/home/Home';
import Header from './components/header/header'
import Trailer from './components/trailer/Trailer';
import Reviews from './components/reviews/Reviews';
import NotFound from './components/notFound/NotFound';
function App() {

  const [movie, setMovie] = useState([]);
  const [singleMovie, setSingleMovie] = useState([]);
  const [reviews, setReviews] = useState([]);



  const getMovies = async() =>{
    try {
      const response = await api.get("/api/v1/movies/allMovies");
      setMovie(response.data);
      // console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  const getMovieData = async (movieId)=>{

    try {
      const response = await api.get(`/api/v1/movies/movie/imdb/${movieId}`);
      const oneMovie = response.data;
      setSingleMovie(oneMovie);
      setReviews(oneMovie.reviews);
    } catch (error) {
      
    }



  }

  useEffect(()=>{
    getMovies();
  },[])

  return (
    <div className="App" style={{marginTop:"0%"}}>
      <Header/>
     <Routes>
      <Route path="/" element={<Layout/>}/>
      <Route index element={<Home movies={movie} />} />
      <Route path='/Trailer/:ytTrailerId' element={<Trailer />} />
      <Route path="Reviews/:movieId" element={<Reviews getMovieData={getMovieData} movie={singleMovie} reviews={reviews} setReviews={setReviews} />} />
      <Route path="*" element={<NotFound/>}/>
     </Routes>
    </div>
  );
}

export default App;
