import React from 'react'
import MovieGrid from '../Movie/MovieGrid/MovieGrid'
import { movieType } from '../../api/TmdbApi'

function TrendingMovie() {
  return (
    <div className="container">
      <div className="section mb-3">
        <MovieGrid type={movieType.popular} />
      </div>
    </div>
  )
}

export default TrendingMovie