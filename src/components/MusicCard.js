import React from 'react';
import PropTypes from 'prop-types';

class MusicCard extends React.Component {
  render() {
    const { trackName, trackId, previewUrl, isFavorited, onCheckboxChange } = this.props;
    return (
      <div>
        <h5>{ trackName }</h5>
        <label htmlFor={ `checkbox-music-${trackId}` }>
          Favoritar
          <input
            type="checkbox"
            data-testid={ `checkbox-music-${trackId}` }
            defaultChecked={ isFavorited }
            onChange={ onCheckboxChange }
          />
        </label>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
          .
        </audio>
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  previewUrl: PropTypes.string.isRequired,
  isFavorited: PropTypes.bool.isRequired,
  onCheckboxChange: PropTypes.func.isRequired,
};

export default MusicCard;
