import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import '../css/login.css';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      album: '',
      artistOrBand: '',
      musicList: [],
      favoriteList: [],
      loading: false,
    };
    this.handleCheckbox = this.handleCheckbox.bind(this);
    this.verificationFavorite = this.verificationFavorite.bind(this);
  }

  componentDidMount() {
    // Referência para realizar o Destructuring Assignment e consertar o erro do Lint: https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment;
    const { match: { params: { id } } } = this.props;
    this.setState({ loading: true }, async () => {
      const dataMusics = await getMusics(id);
      // Referência para utilizar o slice para fazer uma cópia de um array a partir de um ponto específico: https://www.w3schools.com/jsref/jsref_slice_array.asp;
      const { collectionName } = dataMusics[0];
      const { artistName } = dataMusics[0];
      const onlyMusics = dataMusics.slice(1);
      const dataFavorites = await getFavoriteSongs();
      this.setState((prev) => ({
        album: collectionName,
        artistOrBand: artistName,
        musicList: onlyMusics,
        favoriteList: [...prev.favoriteList, ...dataFavorites],
        loading: false,
      }));
    });
  }

  handleCheckbox(music) {
    this.setState({
      loading: true,
    }, async () => {
      await addSong(music);
      const uptadeFavorites = await getFavoriteSongs();
      const lastPosition = uptadeFavorites.length - 1;
      const lastUptade = uptadeFavorites[lastPosition];
      this.setState((prev) => ({
        favoriteList: [...prev.favoriteList, lastUptade],
        loading: false,
      }));
    });
  }

  verificationFavorite(trackId) {
    const { favoriteList } = this.state;
    let result = false;
    const verify = favoriteList
      .filter((favoriteItem) => favoriteItem.trackId === trackId);
    if (verify.length > 0) { result = true; }
    if (verify.length === 0) { result = false; }
    return result;
  }

  render() {
    const { album, artistOrBand, musicList, loading } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        { loading ? (<Loading />) : (
          <div>
            <h4 data-testid="album-name">
              Album:
              {` ${album}`}
            </h4>
            <h4 data-testid="artist-name">
              {`${artistOrBand}`}
            </h4>
            <div className="father-cards">
              { musicList.map((music) => (
                <MusicCard
                  key={ music.trackId }
                  trackName={ music.trackName }
                  trackId={ music.trackId }
                  previewUrl={ music.previewUrl }
                  onCheckboxChange={ () => this.handleCheckbox(music) }
                  isFavorited={ this.verificationFavorite(music.trackId) }
                />))}
            </div>
          </div>
        )}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes
    .shape({ params: PropTypes
      .shape({ id: PropTypes.string }) })
    .isRequired,
};

export default Album;
