import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      user: '',
    };
  }

  componentDidMount() {
    const recoveringUser = async () => {
      this.setState({
        loading: false,
        user: await getUser(),
      });
    };
    recoveringUser();
  }

  render() {
    const { loading, user } = this.state;
    return (
      <header data-testid="header-component">
        { loading ? (<Loading />) : (
          <h4 data-testid="header-user-name">{ user.name }</h4>
        )}
        <p><Link to="/search" data-testid="link-to-search">Search</Link></p>
        <p><Link to="/favorites" data-testid="link-to-favorites">Favorites</Link></p>
        <p><Link to="/profile" data-testid="link-to-profile">Profile</Link></p>
      </header>
    );
  }
}

export default Header;
