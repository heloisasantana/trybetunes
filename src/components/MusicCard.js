import React from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      isFavorited: false,
    };
    this.handleFavorite = this.handleFavorite.bind(this);
  }

  handleFavorite() {
    this.setState({
      loading: true,
    }, async () => {
      await addSong();
      this.setState({
        loading: false,
        isFavorited: true,
      });
    });
  }

  render() {
    const { loading, isFavorited } = this.state;
    const { trackName, trackId, previewUrl } = this.props;
    return (
      <div>
        { loading ? (<Loading />) : (
          <section>
            <h5>{ trackName }</h5>
            <label htmlFor={ `checkbox-music-${trackId}` }>
              Favoritar
              <input
                type="checkbox"
                data-testid={ `checkbox-music-${trackId}` }
                checked={ isFavorited }
                onClick={ this.handleFavorite }
              />
            </label>
            <audio data-testid="audio-component" src={ previewUrl } controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              <code>audio</code>
              .
            </audio>
          </section>)}
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  previewUrl: PropTypes.string.isRequired,
};

export default MusicCard;
