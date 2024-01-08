import { useContext, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import MealsContext from '../context/MealsContext';
import DrinksContext from '../context/DrinksContext';
import HeaderContext from '../context/HeaderContext';
import '../styles/recipes.css';

export default function Recipes() {
  const location = useLocation();
  const history = useHistory();
  const { apiMealsNameData, apiMealsCategoryData } = useContext(MealsContext);
  const { apiDrinksNameData, apiDrinksCategoryData } = useContext(DrinksContext);
  const { mealFromFetch, setInputSearchText, flag, setFlag } = useContext(HeaderContext);
  const [filteredMealsData, setFilteredMealsData] = useState(null);
  const [filteredDrinksData, setFilteredDrinksData] = useState(null);

  async function drinksFilter(param) {
    setFlag('category');
    setInputSearchText('');
    const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${param}`;
    const response = await fetch(url);
    const { drinks } = await response.json();
    const isEqualToLastResult = JSON.stringify(drinks)
    === JSON.stringify(filteredDrinksData);
    if (isEqualToLastResult) {
      setFilteredDrinksData(null);
    } else {
      setFilteredDrinksData(drinks);
    }
  }

  async function mealsFilter(param) {
    setFlag('category');
    setInputSearchText('');
    const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${param}`;
    const response = await fetch(url);
    const { meals } = await response.json();
    const isEqualToLastResult = JSON.stringify(meals)
    === JSON.stringify(filteredMealsData);
    if (isEqualToLastResult) {
      setFilteredMealsData(null);
    } else {
      setFilteredMealsData(meals);
    }
  }

  function renderCategoryButtons(apiData, onClickFilter) {
    const five = 5;
    return apiData.slice(0, five).map((item, index) => (
      <div key={ index }>
        <label htmlFor={ `${item.strCategory}` }>
          <button
            className="eachCategory-btn"
            data-testid={ `${item.strCategory}-category-filter` }
            type="button"
            onClick={ () => onClickFilter(item.strCategory) }
          >
            {item.strCategory}
          </button>
        </label>
      </div>
    ));
  }

  function pathRenderCategorys() {
    if (location.pathname === '/meals') {
      return renderCategoryButtons(apiMealsCategoryData, mealsFilter);
    }
    return renderCategoryButtons(apiDrinksCategoryData, drinksFilter);
  }

  function pathRenderSearch() {
    if (location.pathname === '/meals') {
      return mealFromFetch.map((eachMeal, index) => (
        <div key={ eachMeal.idMeal } data-testid={ `${index}-recipe-card` }>
          <button
            className="eachRecipe"
            onClick={ () => history.push(
              `${location.pathname}/${eachMeal.idMeal}`,
            ) }
          >
            <img
              src={ eachMeal.strMealThumb }
              alt={ eachMeal.strMeal }
              data-testid={ `${index}-card-img` }
            />
            <p data-testid={ `${index}-card-name` }>{eachMeal.strMeal}</p>
          </button>
        </div>
      ));
    }

    return mealFromFetch.map((eachDrink, index) => (
      <div key={ eachDrink.idDrink } data-testid={ `${index}-recipe-card` }>
        <button
          className="eachRecipe"
          onClick={ () => history.push(
            `${location.pathname}/${eachDrink.idDrink}`,
          ) }
        >
          <img
            src={ eachDrink.strDrinkThumb }
            alt={ eachDrink.strDrink }
            data-testid={ `${index}-card-img` }
          />
          <p data-testid={ `${index}-card-name` }>{eachDrink.strDrink}</p>
        </button>
      </div>
    ));
  }

  function pathRenderCards() {
    const twelve = 12;
    let data;
    if (filteredDrinksData || filteredMealsData) {
      data = location.pathname === '/meals' ? filteredMealsData : filteredDrinksData;
    } else {
      data = location.pathname === '/meals' ? apiMealsNameData : apiDrinksNameData;
    }
    return data.map((item, index) => index < twelve && (
      <div
        key={ item.idMeal || item.idDrink }
        data-testid={ `${index}-recipe-card` }
      >
        <button
          onClick={ () => history.push(
            `${location.pathname}/${item.idMeal || item.idDrink}`,
          ) }
          className="eachRecipe"
        >
          <img
            data-testid={ `${index}-card-img` }
            src={ item.strMealThumb || item.strDrinkThumb }
            alt={ item.strMeal || item.strDrink }
          />
          <p data-testid={ `${index}-card-name` }>{item.strMeal || item.strDrink}</p>
        </button>
      </div>
    ));
  }

  function allRender() {
    setFilteredDrinksData(null);
    setFilteredMealsData(null);
    setInputSearchText('');
    setFlag('generic');
    pathRenderCards();
  }


  function masterRender() {
    if (flag === 'generic') {
      return pathRenderCards();
    }
    if (flag === 'category') {
      if (apiMealsCategoryData && apiDrinksCategoryData) {
        return pathRenderCards();
      }
      return <h4>Carregando...</h4>;
    }
    if (flag === 'search') {
      return pathRenderSearch();
    }
  }

  return (
    <div className="all-recipes-page">
      <Header />
      <div className="recipe-page-container">
        <SearchBar />
        <div className="categories-container">
          <button
            className="categories-btn-all"
            data-testid="All-category-filter"
            type="button"
            onClick={ () => allRender() }
          >
            All
          </button>
          {apiMealsCategoryData && apiDrinksCategoryData ? (
          pathRenderCategorys()) : (<h4>Carregando...</h4>)}
        </div>
        {<div className="recipes-container">
          { apiMealsNameData && apiDrinksNameData
            ? (masterRender()) : (<h4>Carregando...</h4>)}
        </div>}
      </div>
      <Footer />
    </div>
  );
}
