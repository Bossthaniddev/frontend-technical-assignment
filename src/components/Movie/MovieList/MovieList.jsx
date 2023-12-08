import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import { Swiper, SwiperSlide } from 'swiper/react';
import TmdbApi, { category } from '../../../api/TmdbApi';
import MovieCard from '../MovieCard/MovieCard';
import ReactLoading from 'react-loading';
import './MovieList.css';
import 'swiper/css';

const MovieList = props => {

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getList = async () => {
      let response = null;
      const params = {};
      setLoading(true)

      if (props.type !== 'similar') {
        switch (props.category) {
          case category.movie:
            response = await TmdbApi.getMoviesList(props.type, { params });
            break;
          default:
        }
      } else {
        response = await TmdbApi.similar(props.category, props.id);
      }
      setItems(response.results);
      setTimeout(() => {
        setLoading(false)
      }, 0);
    }
    getList();
  }, []);

  return (
    <div className="movie-list">
      <Swiper
        grabCursor={true}
        spaceBetween={10}
        slidesPerView={'auto'}
      >
        {
          items.map((item, i) => (
            <SwiperSlide key={i}>
              {loading ?
                <ReactLoading className="react-loading" type='spin' color='red' height={'20px'} width={'20px'} />
                :
                <MovieCard item={item} category={props.category} />
              }
            </SwiperSlide>
          ))
        }
      </Swiper>
    </div>
  );
}

MovieList.propTypes = {
  category: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
}

export default MovieList