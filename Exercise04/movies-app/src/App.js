import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import YouTube from 'react-youtube';

function MovieListItem(props) {
  const [movie, setMovie] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/movie/${props.movie.id}?api_key=5e000196349daaec4dbdd97808666248&append_to_response=videos`)
      .then(response => {
        setMovie(response.data);
      })
      .catch(error => {
        console.error(`Error fetching movie details for ${props.movie.original_title}:`, error);
      });
  }, [props.movie.id]);

  let IMAGEPATH = 'http://image.tmdb.org/t/p/w500';
  let imageurl = IMAGEPATH + (movie.poster_path || '');

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  // Get genres
  let genres = "";
  if (movie.genres) {
    genres = movie.genres.map(genre => genre.name).join(', ');
  }

  // Get first YouTube video
  let video = "";
  if (movie.videos && movie.videos.results && movie.videos.results.length > 0) {
    video = (
      <span style={{ color: 'blue', cursor: 'pointer' }} onClick={openModal}>
        {movie.videos.results[0].name}
      </span>
    );
  }

  return (
    <div className="Movie">
      <img src={imageurl} alt={props.movie.original_title} />
      <p className="MovieTitle">{props.movie.original_title} : {props.movie.release_date}</p>
      <p className="MovieText">{props.movie.overview}</p>
      <span className="GenresText">Genres: {genres}</span><br />
      <span className="VideosText">Video: {video}</span>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.75)'
          },
          content: {
            width: '60%',
            height: '60%',
            margin: 'auto'
          }
        }}
      >
        <button onClick={closeModal} style={{ position: 'absolute', top: 10, right: 10, fontSize: 20, cursor: 'pointer' }}>
          &times;
        </button>
        {video && <YouTube videoId={movie.videos.results[0].key} />}
      </Modal>
    </div>
  );
}

function MovieList() {
  const [movies, setMovies] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    axios
      .get('https://api.themoviedb.org/3/movie/now_playing?api_key=5e000196349daaec4dbdd97808666248&append_to_response=videos')
      .then(response => {
        setMovies(response.data.results);
      })
      .catch(error => {
        console.error('Error fetching movies:', error);
      });
  }, []);

  const openModal = (videoId) => {
    setSelectedVideo(videoId);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedVideo(null);
    setModalIsOpen(false);
  };

  if (movies.length === 0) {
    return (
      <div style={{ flex: 1, padding: 20 }}>
        <p>Loading, please wait...</p>
      </div>
    );
  } else {
    const movieItems = movies.map((movie, index) => (
      <MovieListItem key={index} movie={movie} openModal={openModal} />
    ));

    return (
      <div style={{ flex: 1, padding: 20 }}>
        {movieItems}

        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={{
            overlay: {
              backgroundColor: 'rgba(0, 0, 0, 0.75)'
            },
            content: {
              width: '60%',
              height: '60%',
              margin: 'auto'
            }
          }}
        >
          <button onClick={closeModal} style={{ position: 'absolute', top: 10, right: 10, fontSize: 20, cursor: 'pointer' }}>
            &times;
          </button>
          {selectedVideo && <YouTube videoId={selectedVideo} />}
        </Modal>
      </div>
    );
  }
}

function App() {
  return (
    <div className="App">
      <MovieList />
    </div>
  );
}

export default App;