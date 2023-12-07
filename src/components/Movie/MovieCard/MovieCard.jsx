import React, { useState, useEffect, useRef, useContext, createContext } from 'react';
import { MainContext } from '../../../App';
import { Link } from 'react-router-dom';
import Button, { OutlineButton } from '../../Button/Button';
import ConfigApi from '../../../api/ConfigApi';
import './MovieCard.css';
import { FaHeart, FaRegHeart, FaVideo } from 'react-icons/fa'
import TmdbApi, { category } from '../../../api/TmdbApi';
import ModalVideo from '../../ModalVideo/ModalVideo';

const MovieCard = props => {
  const storedFavorites = JSON.parse(localStorage.getItem('data')) || [];

  const item = props.item;
  const link = '/movie/' + item.id;
  const bg = ConfigApi.w500Image(item.poster_path || item.backdrop_path);
  const [videSrc, setVideSrc] = useState("");

  const { favoritesMovie, setFavorites } = useContext(MainContext);
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

  const setModalActive = async () => {
    const videos = await TmdbApi.getVideos(category.movie, item.id);

    if (videos.results.length > 0) {
      const Src = 'https://www.youtube.com/embed/' + videos.results[0].key;
      setVideSrc(Src)
    }
  }

  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalActive()
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };


  return (
    <div>
      <div className="movie-card" style={{ backgroundImage: `url(${bg})` }}>
      </div>
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

      <h3 className="MovieName">{item.title || item.name}</h3>
      <ModalVideo isOpen={isModalOpen} onClose={closeModal}>
        <iframe className="iframe-video" src={videSrc} width="100%" frameBorder="0" height="500px" title="trailer"></iframe>
      </ModalVideo>
    </div>
  );
}

export default MovieCard