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
    const { match: { params: { id } } } = this.props;
    const recoveringMusics = async () => {
      const data = await getMusics(id);
      const { collectionName } = data[0];
      const { artistName } = data[0];
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
        { musicList.map(({ trackName, previewUrl, trackId }) => (
          <MusicCard
            key={ trackId }
            trackName={ trackName }
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
