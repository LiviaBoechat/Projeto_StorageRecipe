import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import '../styles/login.css';
import Header from '../components/Header';
import logoImage from '../images/mystoragerecipepng.png';
import Footer from '../components/Footer';


function Login() {
  const history = useHistory();
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [emailLogin, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const minCaracter = 6;
    const emailValid = emailLogin.toLowerCase().match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    const passwordValid = password.length > minCaracter;
    if (emailValid && passwordValid) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [emailLogin, password]);

  const emailChange = ({ target: { value } }) => {
    setEmail(value);
  };

  const passwordChange = ({ target: { value } }) => {
    setPassword(value);
  };

  const submitForm = () => {
    const userEmail = { email: emailLogin };
    localStorage.setItem('user', JSON.stringify(userEmail));
    history.push('/meals');
  };

  return (
    <div className="all-login-page">
      <div className="login-page-container">
        <div className="logo-image-container">
          <img
            src={logoImage}
            alt="Logo"
            className="logo-full-image "
          />
        </div>
        <form className="form-content">
          <div className="input-container">
            <h5>login</h5>
            <label htmlFor="Email">
              <input
                className="input"
                name="emailLogin"
                id="Email"
                type="email"
                size="30"
                placeholder="email"
                value={ emailLogin }
                onChange={ emailChange }
              />
            </label>
          </div>
          <div className="input-container">
            <h5>password</h5>
            <label htmlFor="Senha">
              <input
                className="input"
                type="text"
                id="Senha"
                size="30"
                name="passwordLogin"
                value={ password }
                onChange={ passwordChange }
              />
            </label>
          </div>
          <div  className="login-button-container">
            <button
              className="login-button"
              type="button"
              name="buttonLogin"
              disabled={ buttonDisabled }
              onClick={ submitForm }
            >
              Enter
            </button>
          </div>
        </form>
        <Footer/>
      </div>
    </div>
  );
}

export default Login;
