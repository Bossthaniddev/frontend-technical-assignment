
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';

//components
import Navbar from './components/Navbar/Navbar'
import Movie from './components/Movie/Movie'
import Favorites from './components/Favorites/Favorites'
import TrendingMovie from './components/TrendingMovie/TrendingMovie';
import Home from './pages/Home';
import React, { useState, useEffect, useRef, useContext, createContext } from 'react';
import Footer from './components/Footer/Footer';

export const MainContext = createContext();

function App() {
  const [favoritesMovie, setFavorites] = useState([]);
  const [movieGridRender, setMovieGridRender] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [searchHistory, setSearchHistory] = useState([]);

  return (
    <MainContext.Provider value={{favoritesMovie, setFavorites, movieGridRender, setMovieGridRender, totalPage, setTotalPage, searchHistory, setSearchHistory}}>
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
        <Footer/>
      </BrowserRouter>
    </MainContext.Provider>
  )
}

export default App
