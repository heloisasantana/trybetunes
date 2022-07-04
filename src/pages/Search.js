import React from 'react';
import { Link } from 'react-router-dom';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Header from '../components/Header';
import Loading from '../components/Loading';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      isDisabled: true,
      onSearch: '',
      prevSearch: '',
      finded: [],
      loading: false,
      showResults: false,
      errors: 0,
    };
    this.validateSearch = this.validateSearch.bind(this);
    this.requestSearch = this.requestSearch.bind(this);
  }

  validateSearch(event) {
    const { value } = event.target;
    const { length } = event.target.value;
    const min = Number('2');
    if (length >= min) {
      this.setState({
        isDisabled: false,
        onSearch: value,
      });
    }
  }

  requestSearch() {
    const { onSearch } = this.state;
    this.setState({
      loading: true,
      showResults: true,
      onSearch: '',
      prevSearch: onSearch,
    }, async () => {
      const { prevSearch } = this.state;
      const data = await searchAlbumsAPI(prevSearch);
      const dataLength = data.length;
      if (dataLength < 1) { this.setState({ errors: 1 }); }
      this.setState({
        finded: [...data],
        loading: false,
      });
    });
  }

  render() {
    const { isDisabled, prevSearch, finded, loading, showResults, errors } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        { loading ? (<Loading />) : (
          <form>
            <label htmlFor="search-artist-input">
              <input
                type="text"
                data-testid="search-artist-input"
                onChange={ this.validateSearch }
              />
            </label>
            <label htmlFor="search-artist-button">
              <input
                type="button"
                data-testid="search-artist-button"
                value="Pesquisar"
                disabled={ isDisabled }
                onClick={ this.requestSearch }
              />
            </label>
          </form>)}
        { showResults === true ? (
          <h2>
            Resultado de álbuns de:
            {` ${prevSearch}`}
          </h2>) : (null)}
        { errors > 0 ? (<h2>Nenhum álbum foi encontrado</h2>) : (
          finded.map(({ collectionId, collectionName, collectionPrice, releaseDate }) => (
            <section key={ `${collectionId}` }>
              <Link
                to={ `/album/${collectionId}` }
                data-testid={ `link-to-album-${collectionId}` }
              >
                {collectionName}
              </Link>
              <p>
                Price:
                { collectionPrice }
              </p>
              <p>
                Date:
                { releaseDate }
              </p>
            </section>)))}
      </div>
    );
  }
}

export default Search;
