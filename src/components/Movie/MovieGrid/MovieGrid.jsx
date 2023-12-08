import React, { useCallback, useContext, useEffect, useState } from 'react'
import TmdbApi, { movieType } from '../../../api/TmdbApi';
import Button, { OutlineButton } from '../../Button/Button';
import MovieCard from '../MovieCard/MovieCard';
import { useParams } from 'react-router-dom';
import { FaSearch, FaSyncAlt } from 'react-icons/fa'
import './MovieGrid.css'
import { MainContext } from '../../../App';
import SearchHistoryDropdown from '../../SearchHistoryDropdown/SearchHistoryDropdown';
import ReactLoading from 'react-loading';

const MovieGrid = props => {

  const { movieGridRender, setMovieGridRender } = useContext(MainContext);
  const { totalPage, setTotalPage } = useContext(MainContext);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [checkPageFav, setCheckPageFav] = useState(false);

  const { keyword } = useParams();

  useEffect(() => {
    let response = null;
    setLoading(true)
    const getList = async () => {
      if (keyword === undefined) {
        const params = {};
        response = await TmdbApi.getMoviesList(props.type, { params });

      } else {
        const params = {
          query: keyword
        }
        response = await TmdbApi.search(props.category, { params });
      }
      setMovieGridRender(response.results);
      setTotalPage(response.total_pages);
    }

    if (props.favorites) {
      response = props.favorites
      setCheckPageFav(true)
      setMovieGridRender(response)
      setTimeout(() => {
        setLoading(false)
      }, 0);
    } else {
      getList();
      setTimeout(() => {
        setLoading(false)
      }, 0);
    }

  }, [props.category, keyword]);

  const loadMore = async () => {
    let response = null;
    if (keyword === undefined) {
      const params = {
        page: page + 1
      };
      response = await TmdbApi.getMoviesList(movieType.upcoming, { params });

    } else {
      const params = {
        page: page + 1,
        query: keyword
      }
      response = await TmdbApi.search('movie', { params });
    }
    setMovieGridRender([...movieGridRender, ...response.results]);
    setPage(page + 1);
  }

  return (
    <>
      <h1 className="NameCate">{props.type === 'popular' && 'Popular' || props.type === 'top_rated' && 'Top Rated' || props.type === 'favorites' && 'Favorites'}</h1>
      <div className="mb-3">
        <MovieSearch category={props.category} keyword={keyword} type={props.type} checkPageFav={checkPageFav} favorites={props.favorites} />
      </div>
      {movieGridRender.length > 0 ?
        <div className="movie-grid">
          {
            movieGridRender.map((item, i) => (
              <div key={i}>
                {loading ?
                  <ReactLoading className="react-loading" type='spin' color='red' height={'20px'} width={'20px'} />
                  :
                  <MovieCard category={props.category} item={item} key={i} />
                }
              </div>
            ))
          }
        </div>
        :
        <h2 className="text-no-data mb-3">The movie you searched for does not exist.</h2>
      }

      {movieGridRender.lenght > 0 ?
        page < totalPage ? (
          <div className="movie-grid__loadmore">
            <OutlineButton className="small" onClick={loadMore}>Load more</OutlineButton>
          </div>
        ) : null
        :
        <></>
      }
    </>
  );
}

const MovieSearch = props => {
  const [keyword, setKeyword] = useState(props.keyword ? props.keyword : '');
  const { movieGridRender, setMovieGridRender } = useContext(MainContext);
  const { totalPage, setTotalPage } = useContext(MainContext);
  const { searchHistory, setSearchHistory } = useContext(MainContext);
  const [showDropdown, setShowDropdown] = useState(false);
  const storedMovieSearch = JSON.parse(localStorage.getItem('dataMovieSearch')) || [];

  const goToSearch = useCallback(
    () => {
      let response = null;
      let responseFavorites = null;
      const getList = async () => {
        if (keyword === '') {
          const params = {};

          if (props.favorites.lenght === 0) {
            // responseFavorites = props.favorites
            response = await TmdbApi.getMoviesList(props.type, { params });
            setMovieGridRender(response.results);
            setTotalPage(response.total_pages);
          } else {
            setMovieGridRender(props.favorites)
          }

        } else {
          const params = {
            query: keyword
          }
          response = await TmdbApi.search('movie', { params });
          setMovieGridRender(response.results);
          setTotalPage(response.total_pages);

        }
        setSearchHistory([...searchHistory, keyword]);
        if (searchHistory.length > 5) {
          setSearchHistory(searchHistory.splice(-1, 1))
        }
        setShowDropdown(false);
      }

      getList();
    },
    [keyword, props.category]
  );


  const handleSelect = (query) => {
    setKeyword(query);
    setShowDropdown(false);
    goToSearch();
  };

  const handleReSearch = () => {
    setKeyword('');
    setShowDropdown(false);
    goToSearch();
  };


  useEffect(() => {
    const enterEvent = (e) => {
      e.preventDefault();
      if (e.keyCode === 13) {
        goToSearch();
      }
    }
    document.addEventListener('keyup', enterEvent);
    return () => {
      document.removeEventListener('keyup', enterEvent);
    };
  }, [keyword, goToSearch]);

  return (
    <div className="box-search">
      <input
        type="text"
        placeholder="Search..."
        onFocus={() => setShowDropdown(true)}
        onBlur={() => handleSelect}
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <div className="box-icon-search">
        <FaSyncAlt className="FaSyncAlt" onClick={handleReSearch} />
        <FaSearch className="FaSearch" onClick={goToSearch} />
      </div>
      {showDropdown && <SearchHistoryDropdown history={searchHistory} onSelect={handleSelect} />}
    </div>
  )
}

export default MovieGrid