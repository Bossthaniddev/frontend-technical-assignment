import React from 'react'
import { Link } from 'react-router-dom'
import { OutlineButton } from '../components/Button/Button'
import MovieList from '../components/Movie/MovieList/MovieList'
import HeroSlide from '../components/HeroSlide/HeroSlide'
import { category, movieType } from '../api/TmdbApi'

function Home() {

  return (
    <>
    <HeroSlide />
    <div className="container">
      <div className="section mb-3">
        <div className="section__header mb-2">
          <h2>Trending Movies</h2>
          <Link to="/movie" state={movieType.popular}>
            <OutlineButton className="small">View more</OutlineButton>
          </Link>
        </div>
        <MovieList category={category.movie} type={movieType.popular} />
      </div>

      <div className="section mb-3">
        <div className="section__header mb-2">
          <h2>Top Rated Movies</h2>
          <Link to="/movie" state={movieType.top_rated}>
            <OutlineButton className="small">View more</OutlineButton>
          </Link>
        </div>
        <MovieList category={category.movie} type={movieType.top_rated} />
      </div>
    </div>
  </>
  )
}

export default Home