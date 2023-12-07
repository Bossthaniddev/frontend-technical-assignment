import React, { useState, useEffect, useRef, useContext, createContext } from 'react';
import ConfigApi from '../../api/ConfigApi';
import { MainContext } from '../../../src/App';

// import SwiperCore, { Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { useNavigate } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/pagination';
import './HeroSlide.css';
import Button, { OutlineButton } from '../Button/Button';
import moment from 'moment';
import TmdbApi, { category, movieType } from '../../api/TmdbApi';
import { FaHeart, FaRegHeart, FaVideo } from 'react-icons/fa'
import ReactLoading from 'react-loading';
import ModalVideo from '../ModalVideo/ModalVideo';

function HeroSlide() {
  // SwiperCore.use([Autoplay]);
  const [movieItems, setMovieItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const getMovies = async () => {
      const params = { page: 1 }
      try {
        setLoading(true)
        const response = await TmdbApi.getMoviesList(movieType.popular, { params });
        setMovieItems(response.results.slice(0, 3));
      } catch (error) {
        setError("Something went wrong :", error)
      } finally {
        setTimeout(() => {
          setLoading(false)
        }, 1000);
      }
    }
    getMovies();
  }, []);

  const pagination = {
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + (index + 1) + '</span>';
    },
  };

  return (
    <>
      <div className="hero-slide">
        <Swiper
          pagination={pagination}
          modules={[Pagination]}
          className="topMovieSwiper"
        >
          {
            movieItems.map((item, i) => (
              <SwiperSlide key={i}>
                {({ isActive }) => (
                  <HeroSlideItem loading={loading} item={item} className={`${isActive ? 'active' : ''}`} />
                )}
              </SwiperSlide>
            ))
          }
        </Swiper>
      </div>
    </>
  )
}

const HeroSlideItem = props => {
  const storedFavorites = JSON.parse(localStorage.getItem('data')) || [];
  const loading = props.loading;
  const item = props.item;
  const background = ConfigApi.originalImage(item.backdrop_path ? item.backdrop_path : item.poster_path);

  const { favoritesMovie, setFavorites } = useContext(MainContext);
  const [videSrc, setVideSrc] = useState("");

  const setModalActive = async () => {
    const videos = await TmdbApi.getVideos(category.movie, item.id);

    if (videos.results.length > 0) {
      const Src = 'https://www.youtube.com/embed/' + videos.results[0].key;
      setVideSrc(Src)
    }
  }

  const toggleLike = () => {
    addFav(item.id, item)
  }

  const addFav = (id, item) => {
    if (!storedFavorites.some((fav) => fav.id === id)) {
      const newFavorites = [...storedFavorites, item];
      setFavorites(newFavorites);
      localStorage.setItem('data', JSON.stringify(newFavorites));
    } else {
      const newFavorites = storedFavorites.filter((fav) => fav.id !== id);
      setFavorites(newFavorites);
      localStorage.setItem('data', JSON.stringify(newFavorites));
    }
  };

  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalActive()
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };



  return (
    <>
      {loading ?
        <ReactLoading className="react-loading" type='spin' color='red' height={'20px'} width={'20px'} />
        :
        <>
          <div
            className={`hero-slide-item ${props.className}`}
            style={{ backgroundImage: `url(${background})` }}
          >
            <div className="hero-slide-item-content container">
              <div className="hero-slide-item-content-info">
                <div className="text-top-movie">
                  Top 3 Movie
                </div>
                <h2 className="title">{item.title}</h2>
                <div className="releaseDate"> <span>Release Date : {moment(item.release_date).format('D MMMM YYYY')}</span> </div>
                <div className="overview">{item.overview}</div>
                <div className="btns">

                  {storedFavorites && storedFavorites.some((dataFav) => dataFav.id === item.id) ?
                    <Button onClick={toggleLike}>
                      <FaHeart />
                    </Button>
                    :
                    <Button onClick={toggleLike}>
                      <FaRegHeart />
                    </Button>
                  }

                  <OutlineButton onClick={openModal}>
                    <FaVideo />
                  </OutlineButton>
                </div>
              </div>
              <div className="hero-slide-item-content-poster">
                <img src={ConfigApi.w500Image(item.poster_path)} alt="" />
              </div>
            </div>


            <ModalVideo isOpen={isModalOpen} onClose={closeModal}>
              <iframe className="iframe-video" src={videSrc} frameBorder="0" title="trailer"></iframe>
            </ModalVideo>
          </div>
        </>
      }
    </>
  )
}

export default HeroSlide