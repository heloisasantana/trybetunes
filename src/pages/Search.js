import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      isDisabled: true,
    };
    this.validateSearch = this.validateSearch.bind(this);
  }

  validateSearch(event) {
    const { length } = event.target.value;
    const min = Number('2');
    if (length >= min) {
      this.setState({
        isDisabled: false,
      });
    }
  }

  render() {
    const { isDisabled } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
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
            />
          </label>
        </form>
      </div>
    );
  }
}

export default Search;
