import React, { useContext } from 'react'
import { MainContext } from '../../App';
import { category } from '../../api/TmdbApi';
import MovieCard from '../Movie/MovieCard/MovieCard';
import MovieGrid from '../Movie/MovieGrid/MovieGrid';
import HeroSlide from '../HeroSlide/HeroSlide';

function Favorites() {
  const { favoritesMovie, setFavorites } = useContext(MainContext);
  const storedFavorites = JSON.parse(localStorage.getItem('data')) || [];

  return (
    <>
      <HeroSlide />
      <div className="container">
        <div className="section mb-3">
          <MovieGrid favorites={storedFavorites} />
        </div>
      </div>
    </>
  )
}


export default Favorites
