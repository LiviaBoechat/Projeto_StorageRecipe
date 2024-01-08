import React from 'react';
import { useHistory } from 'react-router-dom';
import '../styles/footer.css';

function Footer() {
  const history = useHistory();

  const routeToDrinks = () => {
    history.push('/drinks');
  };

  const routeToMeals = () => {
    history.push('/meals');
  };

  return (
    <footer className="footer-container">
      <div className= "foot-line"></div>
      <p className="credits">site desenvolvido por Livia Boechat e Eduardo Malhão  *  2023</p>
    </footer>
  );
}

export default Footer;
