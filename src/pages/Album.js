import React from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      album: '',
      artistOrBand: '',
      musicList: [],
    };
  }

  componentDidMount() {
    // Referência para realizar o Destructuring Assignment e consertar o erro do Lint: https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment;
    const { match: { params: { id } } } = this.props;
    const recoveringMusics = async () => {
      const data = await getMusics(id);
      const { collectionName } = data[0];
      const { artistName } = data[0];
      // Referência para utilizar o slice para fazer uma cópia de um array a partir de um ponto específico: https://www.w3schools.com/jsref/jsref_slice_array.asp;
      const musics = data.slice(1);
      this.setState({
        album: collectionName,
        artistOrBand: artistName,
        musicList: musics,
      });
    };
    recoveringMusics();
  }

  render() {
    const { album, artistOrBand, musicList } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <h4 data-testid="album-name">
          Album:
          {` ${album}`}
        </h4>
        <h4 data-testid="artist-name">
          {`${artistOrBand}`}
        </h4>
        { musicList.map(({ trackId, trackName, previewUrl }) => (
          <MusicCard
            key={ trackId }
            trackName={ trackName }
            trackId={ trackId }
            previewUrl={ previewUrl }
          />))}
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
