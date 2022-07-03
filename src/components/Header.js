import React from 'react';
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
          <h4 data-testid="header-user-name">{ user.name }</h4>)}
      </header>
    );
  }
}

export default Header;
