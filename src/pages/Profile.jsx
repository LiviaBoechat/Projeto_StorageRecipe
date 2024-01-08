import { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/profile.css';
import FavoriteRecipes from './FavoriteRecipes';

function Profile({ history }) {
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const email = JSON.parse(localStorage.getItem('user'));
    const emailDefault = email || 'teste@teste.com';
    setUserEmail(emailDefault);
  }, []);

  const logout = useCallback(() => {
    localStorage.clear();
    history.push('/');
  }, [history]);

  return (
    <div className="all-profile-page">
      <Header />
      <div className="profile-container">
        <aside className="sidebar-container"> 
          <p className="profile-p">Profile</p>
          <h2
            className="user-email-profile"
            data-testid="profile-email"
          >
            { userEmail.email }
          </h2>
          <Button
            className= "logout-btn"
            type="button"
            data-testid="profile-logout-btn"
            onClick={ logout }
          >
            Logout
          </Button>
        </aside>
        <FavoriteRecipes />
      </div>
      <Footer />
    </div>
  );
}

Profile.propTypes = {
  history: PropTypes.instanceOf(Object).isRequired,
};

export default Profile;


