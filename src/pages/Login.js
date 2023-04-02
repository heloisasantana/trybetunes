import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';
import '../css/login.css';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      isDisabled: true,
      user: '',
      loading: false,
      redirect: false,
    };
    this.validateUser = this.validateUser.bind(this);
    this.singUpUser = this.singUpUser.bind(this);
  }

  validateUser(event) {
    const { value } = event.target;
    const { length } = event.target.value;
    const min = Number('3');
    if (length >= min) {
      this.setState({
        isDisabled: false,
        user: value,
      });
    }
  }

  singUpUser() {
    const { user } = this.state;
    this.setState({ loading: true },
      async () => {
        await createUser({ name: user });
        this.setState({ loading: false, redirect: true });
      });
  }

  render() {
    const { isDisabled, loading, redirect } = this.state;
    return (
      <div data-testid="page-login" className="login-container">
        <div className="login-inputs">
          <h2>TrybeTunes</h2>
          { loading && <Loading />}
          { redirect && <Redirect to="/search" /> }
          <label htmlFor="login-name-input">
            <input
              type="text"
              data-testid="login-name-input"
              onChange={ this.validateUser }
            />
          </label>
          <input
            name="button"
            type="submit"
            value="Entrar"
            data-testid="login-submit-button"
            disabled={ isDisabled }
            onClick={ this.singUpUser }
          />
        </div>
      </div>
    );
  }
}

export default Login;
