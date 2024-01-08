import copy from 'clipboard-copy';
import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import shareIcon from '../images/shareIcon.svg';
import whiteHeart from '../images/whiteHeartIcon.svg';
import blackHeart from '../images/blackHeartIcon.svg';
import {
  getDrinkIngredientsAndMeasures, getMealIngredientsAndMeasures,
} from '../utils/Ingredients&Measures';
import handleFavorite from '../utils/FavoriteToLocalStorage';
import './recipeInProgress.css';
import { UseGetItem, UseSetItem } from '../hooks/UseLocalStorage';

function RecipesInProgress() {
  const location = useLocation();
  const menos1 = -1;
  const urlToCopy = window.location.href.split('/').slice(0, -menos1).join('/');
  const getId = useParams();
  const [wasCopied, setWasCopied] = useState(false);
  const [mealObject, setMealObject] = useState({});
  const [drinkObject, setDrinkObject] = useState({});
  const [mealsIngredients, setMealsIngredients] = useState([]);
  const [drinksIngredients, setDrinksIngredients] = useState([]);
  const [mealsMeasures, setMealsMeasures] = useState([]);
  const [drinksMeasures, setDrinksMeasures] = useState([]);
  const [isFavorite, setIsFavorite] = useState([]);
  const [checkedIngredients, setCheckedIngredients] = useState([]);

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${getId.id}`);
      const { meals } = await response.json();
      setMealObject(meals[0]);
    };
    const fetchDrinks = async () => {
      const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${getId.id}`);
      const { drinks } = await response.json();
      setDrinkObject(drinks[0]);
    };
    if (location.pathname === `/meals/${getId.id}/in-progress`) {
      fetchMeals();
    } else {
      fetchDrinks();
    }
  }, []);

  useEffect(() => {
    if (mealObject) {
      getMealIngredientsAndMeasures(mealObject, setMealsIngredients, setMealsMeasures);
    }
    if (drinkObject) {
      getDrinkIngredientsAndMeasures(
        drinkObject,
        setDrinksIngredients,
        setDrinksMeasures,
      );
    }
  }, [mealObject, drinkObject]);

  useEffect(() => {
    const recipeType = location.pathname.includes('meals') ? 'meals' : 'drinks';
    const inProgressRecipes = UseGetItem('inProgressRecipes')
    || { drinks: {}, meals: {} };
    setCheckedIngredients(inProgressRecipes[recipeType][getId.id]);
  }, []);

  // add checked ingredients no localStorage
  function addIngredientsToLocalStorage(ingredient) {
    const recipeType = location.pathname.includes('meals') ? 'meals' : 'drinks';
    const inProgressRecipes = UseGetItem('inProgressRecipes')
    || { drinks: {}, meals: {} };
    UseSetItem(
      'inProgressRecipes',
      { ...inProgressRecipes,
        [recipeType]: {
          [getId.id]: [...inProgressRecipes[recipeType][getId.id],
            ingredient,
          ],
        } },
    );
  }
  // remove checked ingredients no localStorage
  function removeIngredientsFromLocalStorage(ingredient) {
    const recipeType = location.pathname.includes('meals') ? 'meals' : 'drinks';
    const inProgressRecipes = UseGetItem('inProgressRecipes');
    const storedIngredients = inProgressRecipes[recipeType][getId.id];
    const updatedIngredients = storedIngredients
      .filter((storedIngredient) => storedIngredient !== ingredient);
    UseSetItem(
      'inProgressRecipes',
      { ...inProgressRecipes,
        [recipeType]: {
          [getId.id]: [...updatedIngredients],
        } },
    );
  }

  return (
    <div className="recipeInProgress-container">
      <Header />
      <SearchBar />
      <h1>Recipe in Progress</h1>
      <button
        data-testid="share-btn"
        src={ shareIcon }
        onClick={ () => {
          copy(`${urlToCopy}`);
          setWasCopied(true);
          const time = 2000;
          setTimeout(() => setWasCopied(false), time);
        } }
      >
        Compartilhar
      </button>
      { wasCopied && <p>Link copied!</p>}
      <button
        data-testid="favorite-btn"
        onClick={ () => handleFavorite(
          { mealObject, drinkObject },
          location.pathname,
          getId.id,
          setIsFavorite,
        ) }
      >
        <img
          src={ isFavorite ? blackHeart : whiteHeart }
          alt=""
        />
        Favoritar
      </button>
      <div>
        { location.pathname === `/meals/${getId.id}/in-progress` ? (
          <div>
            <img
              className="recipeDetails-image"
              data-testid="recipe-photo"
              src={ mealObject.strMealThumb }
              alt={ mealObject.strMeal }
            />
            <h2 data-testid="recipe-title">{mealObject.strMeal}</h2>
            <h4>Category</h4>
            <p data-testid="recipe-category">{mealObject.strCategory}</p>
            <h4>Ingredients</h4>
            {mealsIngredients.map((eachMealIngredient, index) => (
              <label
                htmlFor={ `ingredient-${index}` }
                key={ eachMealIngredient }
                data-testid={ `${index}-ingredient-step` }
                className={ checkedIngredients
                  .includes(eachMealIngredient) ? 'checked' : '' }
              >
                <input
                  type="checkbox"
                  id={ `ingredient-${index}` }
                  checked={ checkedIngredients.includes(eachMealIngredient) }
                  onChange={ ({ target }) => {
                    if (target.checked) {
                      setCheckedIngredients(
                        [...checkedIngredients, eachMealIngredient],
                      );
                      addIngredientsToLocalStorage(eachMealIngredient);
                    } else {
                      setCheckedIngredients(checkedIngredients
                        .filter((ingredient) => ingredient !== eachMealIngredient));
                      removeIngredientsFromLocalStorage(eachMealIngredient);
                    }
                  } }
                />
                { `${eachMealIngredient} : ${mealsMeasures[index]}` }
              </label>
            ))}
            <h4>Instructions</h4>
            <p data-testid="instructions">{mealObject.strInstructions}</p>
          </div>)
          : (
            <div>
              <img
                className="recipeDetails-image"
                data-testid="recipe-photo"
                src={ drinkObject.strDrinkThumb }
                alt={ drinkObject.strDrink }
              />
              <p data-testid="recipe-title">{drinkObject.strDrink}</p>
              <h4>Category</h4>
              <p data-testid="recipe-category">{drinkObject.strAlcoholic}</p>
              <p data-testid="recipe-category">{drinkObject.strCategory}</p>
              <h4>Ingredients</h4>
              {drinksIngredients.map((eachDrinkIngredient, index) => (
                <label
                  htmlFor={ `ingredient-${index}` }
                  key={ eachDrinkIngredient }
                  data-testid={ `${index}-ingredient-step` }
                  className={ checkedIngredients
                    .includes(eachDrinkIngredient) ? 'checked' : '' }
                >
                  <input
                    type="checkbox"
                    id={ `ingredient-${index}` }
                    checked={ checkedIngredients.includes(eachDrinkIngredient) }
                    onChange={ (event) => {
                      if (event.target.checked) {
                        setCheckedIngredients(
                          [...checkedIngredients, eachDrinkIngredient],
                        );
                        addIngredientsToLocalStorage(eachDrinkIngredient);
                      } else {
                        setCheckedIngredients(checkedIngredients
                          .filter((ingredient) => ingredient !== eachDrinkIngredient));
                        removeIngredientsFromLocalStorage(eachDrinkIngredient);
                      }
                    } }
                  />
                  { `${eachDrinkIngredient} : ${drinksMeasures[index]}` }
                </label>
              ))}
              <h4>Instructions</h4>
              <p data-testid="instructions">{drinkObject.strInstructions}</p>
            </div>)}
      </div>
      <button
        className="finish-btn"
        data-testid="finish-recipe-btn"
        onClick={ () => {} }
      >
        Finish Recipe
      </button>
    </div>
  );
}
export default RecipesInProgress;
