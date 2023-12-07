
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';

//components
import Navbar from './components/Navbar/Navbar'
import Movie from './components/Movie/Movie'
import Favorites from './components/Favorites/Favorites'
import TrendingMovie from './components/TrendingMovie/TrendingMovie';
import Home from './pages/Home';
import React, { useState, useEffect, useRef, useContext, createContext } from 'react';

export const MainContext = createContext();

function App() {
  const [favoritesMovie, setFavorites] = useState([]);
  const [movieGridRender, setMovieGridRender] = useState([]);
  const [totalPage, setTotalPage] = useState(0);


  const storedObject = JSON.parse(localStorage.getItem('data'));

  // console.log(storedObject);
  return (
    <MainContext.Provider value={{favoritesMovie, setFavorites, movieGridRender, setMovieGridRender, totalPage, setTotalPage}}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route>
            <Route path="" element={<Home />} />
            <Route path="movie" element={<Movie />} />
            <Route path="trendingMovie" element={<TrendingMovie />} />

            <Route path="favorites" element={<Favorites />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </MainContext.Provider>
  )
}

export default App
