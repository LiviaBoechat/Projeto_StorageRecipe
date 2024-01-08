import PropTypes from 'prop-types';
import { useParams, useLocation, useHistory } from 'react-router-dom';
import { useState, useEffect, useContext, useCallback } from 'react';
import DrinksContext from '../context/DrinksContext';
import MealsContext from '../context/MealsContext';
import '../styles/recommendationCards.css';


export default function RecommendationCards({ recommendations: propRecommendations = [] }) {
    const location = useLocation();
    const getId = useParams();
    const history = useHistory();
    const { apiMealsNameData } = useContext(MealsContext);
    const { apiDrinksNameData } = useContext(DrinksContext);


  useEffect(() => {
    pathRenderRecommendationCards();
  }, [apiDrinksNameData, apiMealsNameData, location.pathname]);
  
    function pathRenderRecommendationCards() {
      const four = 4;
      let data;
  
      if (apiMealsNameData && apiDrinksNameData) {
        const lowerCasePathname = location.pathname.toLowerCase();
        data = lowerCasePathname.includes('/drinks') ? apiMealsNameData : apiDrinksNameData;
      }
  
      return Array.isArray(data) && data.length > 0 && data.map((item, index) => index < four && (
        <div
            className="recommendation-container"
            key={ item.idMeal || item.idDrink }
            data-testid={ `${index}-recipe-card` }
        >
            <button
                className="eachRecommendation"
                onClick={() => {
                    const lowerCasePathname = location.pathname.toLowerCase();
                    const newPathname = lowerCasePathname.includes('/meals') ? '/drinks' : '/meals';
                    const newItemId = lowerCasePathname.includes('/meals') ? item.idDrink : item.idMeal;
                    history.push(`${newPathname}/${newItemId}`);
                  }}
               
            >
            <img
                data-testid={ `${index}-card-img` }
                src={ item.strMealThumb ?? item.strDrinkThumb }
                alt={ item.strMeal ?? item.strDrink }
            />
            {/* <p data-testid={ `${index}-card-name` }>{item.strMeal || item.strDrink}</p> */}
            </button>
        </div>
      ));
    }
  
    return (
      <div className="recommendation-container">
        { propRecommendations ? pathRenderRecommendationCards() : <h4>Carregando...</h4> }
      </div>
    );
  }
  