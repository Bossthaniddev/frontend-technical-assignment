import React, { useCallback, useContext, useEffect, useState } from 'react'
import TmdbApi, { movieType } from '../../../api/TmdbApi';
import Button, { OutlineButton } from '../../Button/Button';
import MovieCard from '../MovieCard/MovieCard';
import { useParams } from 'react-router-dom';
import './MovieGrid.css'
import { MainContext } from '../../../App';

const MovieGrid = props => {

  const { movieGridRender, setMovieGridRender } = useContext(MainContext);
  const { totalPage, setTotalPage } = useContext(MainContext);

  const [page, setPage] = useState(1);

  const { keyword } = useParams();

  useEffect(() => {
    let response = null;
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
      setMovieGridRender(response)
    } else {
      getList();
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
      {props.type === 'popular' ?
        <h1 className="NameCate">Popular</h1>
        :
        <h1 className="NameCate">Top Rated</h1>
      }
      <div className="section mb-3">
        <MovieSearch category={props.category} keyword={keyword} type={props.type} />
      </div>
      <div className="movie-grid">
        {
          movieGridRender.map((item, i) => <MovieCard category={props.category} item={item} key={i} />)
        }
      </div>
      {
        page < totalPage ? (
          <div className="movie-grid__loadmore">
            <OutlineButton className="small" onClick={loadMore}>Load more</OutlineButton>
          </div>
        ) : null
      }
    </>
  );
}

const MovieSearch = props => {

  // const history = useHistory();

  const [keyword, setKeyword] = useState(props.keyword ? props.keyword : '');
  const { movieGridRender, setMovieGridRender } = useContext(MainContext);
  const { totalPage, setTotalPage } = useContext(MainContext);

  const goToSearch = useCallback(
    () => {
      console.log(props.type)
      let response = null;
      const getList = async () => {
        if (keyword === '') {
          const params = {};
          response = await TmdbApi.getMoviesList(props.type, { params });
  
        } else {
          const params = {
            query: keyword
          }
          response = await TmdbApi.search('movie', { params });
        }
        setMovieGridRender(response.results);
        setTotalPage(response.total_pages);
      }
        getList();
    },
    [keyword, props.category]
  );

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
    <div className="movie-search">
      <input
        type="text"
        placeholder="Enter keyword"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />

      <Button className="small" onClick={goToSearch}>Search</Button>
    </div>
  )
}

export default MovieGrid