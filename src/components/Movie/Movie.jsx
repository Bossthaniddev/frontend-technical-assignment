import React from 'react'
import HeroSlide from '../HeroSlide/HeroSlide'
import MovieGrid from './MovieGrid/MovieGrid'
import { useLocation } from 'react-router-dom'

const Movie = (props) => {
  const location = useLocation();
  const movieTypeProp = location.state;
  return (
    <>
      <HeroSlide />
      <div className="container">
        <div className="section mb-3">
          <MovieGrid type={movieTypeProp} />
        </div>
      </div>
    </>
  )
}

export default Movie
