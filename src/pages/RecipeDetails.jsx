import { useParams, useLocation, useHistory } from 'react-router-dom';
import { useState, useEffect, useContext, useCallback } from 'react';
import copy from 'clipboard-copy';
import Header from '../components/Header';
import '../styles/recipeDetails.css';
import RecommendationCards from '../components/RecommendationCards';
import HeaderContext from '../context/HeaderContext';
import { UseGetItem, UseSetItem } from '../hooks/UseLocalStorage';
import Footer from '../components/Footer';
import { IoShareSocial } from "react-icons/io5";
import { FaHeart } from "react-icons/fa";

export default function RecipeDetails() {
  const location = useLocation();
  const getId = useParams();
  const history = useHistory();
  const [wasCopied, setWasCopied] = useState(false);
  const { mealObject, drinkObject, mealsIngredients, drinksIngredients,
    mealsMeasures, drinksMeasures, videoUrl, recommendations,
    setRecommendations, setDrinkObject, setVideoUrl, setMealObject,
    isFavorite, setIsFavorite } = useContext(HeaderContext);

  const getType = () => (
    location.pathname.includes('meals') ? 'meals' : 'drinks'
  );
  const ingredientsToLocal = () => {
    console.log(mealsIngredients);
    return getType() === 'meals' ? mealsIngredients : drinksIngredients;
  };

  const localStart = () => {
    const inProgressRecipes = UseGetItem('inProgressRecipes')
    || { drinks: {}, meals: {} };
    const type = getType();
    console.log(inProgressRecipes);
    return Object.keys(inProgressRecipes[type]).includes(getId.id);
  };
  const checkStartedRecipe = useCallback(() => {
    console.log('teste');
    const inProgressRecipes = UseGetItem('inProgressRecipes')
    || { drinks: {}, meals: {} };
    UseSetItem(
      'inProgressRecipes',
      { ...inProgressRecipes,
        [getType()]: {
          [getId.id]: ingredientsToLocal(),
        } },
    );
    if (location.pathname === `/meals/${getId.id}`) {
      history.push(`/meals/${getId.id}/in-progress`);
    } else {
      history.push(`/drinks/${getId.id}/in-progress`);
    }
  }, [getId.id]);

  const handleFavorite = () => {
    const favoriteRecipes = UseGetItem('favoriteRecipes') || [];

    const isRecipeFavorite = favoriteRecipes.some((recipe) => recipe.id === getId.id);

    const newFavoriteRecipes = isRecipeFavorite
      ? favoriteRecipes.filter((recipe) => recipe.id !== getId.id)
      : [...favoriteRecipes, {
        id: getId.id,
        type: location.pathname.includes('meals') ? 'meal' : 'drink',
        nationality: mealObject?.strArea || '',
        category: mealObject?.strCategory || drinkObject?.strCategory,
        alcoholicOrNot: drinkObject?.strAlcoholic || '',
        name: mealObject?.strMeal || drinkObject?.strDrink,
        image: mealObject?.strMealThumb || drinkObject?.strDrinkThumb,
      }];

    UseSetItem('favoriteRecipes', newFavoriteRecipes);
    setIsFavorite(!isRecipeFavorite);
  };

  useEffect(() => {
    const favoriteLocalStorage = UseGetItem('favoriteRecipes');
    if (!favoriteLocalStorage) return setIsFavorite(false);
    if (favoriteLocalStorage.some(({ id }) => id === getId.id)) {
      return setIsFavorite(true);
    }
    return setIsFavorite(false);
  });
  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${getId.id}`);
      const { meals } = await response.json();
      setMealObject(meals[0]);
      setVideoUrl(meals[0].strYoutube);
    };
    const fetchDrinks = async () => {
      const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${getId.id}`);
      const { drinks } = await response.json();
      setDrinkObject(drinks[0]);
      setVideoUrl(drinks[0].strVideo);
    };
    if (location.pathname === `/meals/${getId.id}`) {
      fetchMeals();
    } else {
      fetchDrinks();
    }
  }, [getId]);
  useEffect(() => {
    const number6 = 6;
    const fetchRecommendations = async () => {
      const response = await fetch(
        location.pathname === `/meals/${getId.id}`
          ? 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='
          : 'https://www.themealdb.com/api/json/v1/1/search.php?s=',
      );
      const data = await response.json();
      setRecommendations((data.drinks ?? data.meals).slice(0, number6));
    };

    fetchRecommendations();
  }, [getId, location.pathname]);

  return (
    <div className="all-recipeDetails-page">
        <div className="recipeDetail-page-container">
          <Header />
          { location.pathname === `/meals/${getId.id}` ? (
            <div className= "allDescripition-container">
              <div className= "name-image-video-container">
                 <h1 className="recipeDetail-title ">RECIPE DETAILS</h1>
                  <div className= "recipeDetailTitle-btns">
                    <h2 data-testid="recipe-title">{mealObject.strMeal}</h2>
                    <div className= "only-btns">
                      <button
                        className="favorite-btn"
                        onClick={ () => handleFavorite() }
                      >
                        { isFavorite? 
                        <FaHeart
                          style={{
                            height: '25px',
                            width: '25px',
                            color:  "#af1d3d",
                            backgroundColor : '#dbe2ec00',
                            padding:  '0px',
                            margin: '2px',
                            }}
                        /> :
                        <FaHeart
                          style={{
                            height: '25px',
                            width: '25px',
                            color:  "#969ba1f1",
                            backgroundColor : '#dbe2ec00',
                            padding:  '0px',
                            margin: '2px',
                            }}
                        />}
                      </button>
                      <button
                        className="share-btn"
                        src={ IoShareSocial }
                        onClick={ () => {
                          copy(`http://localhost:3000${location.pathname}`);
                          setWasCopied(true);
                          const time = 2000;
                          setTimeout(() => setWasCopied(false), time);
                        } }
                      >
                        <IoShareSocial
                          style={{
                            height: '30px',
                            width: '30px',
                            color:  "#969ba1f1",
                            backgroundColor : '#dbe2ec00',
                            padding:  '0px',
                            margin: '0px',
                            }}
                        />
                         { wasCopied && <p>Link copied!</p>}
                      </button>
                    </div>
                </div>
                <img
                  className="recipeDetails-meal-image"
                  data-testid="recipe-photo"
                  src={ mealObject.strMealThumb }
                  alt={ mealObject.strMeal }
                />
                {videoUrl && (
                  <video controls data-testid="video" className= "recipeDetail-video">
                    <source src={ mealObject.strYoutube } type="video/mp4" />
                    <track
                      kind="captions"
                      label="English"
                      srcLang="en"
                      src={ mealObject.strMeal }
                    />
                    Seu navegador não suporta o elemento de vídeo.
                  </video>
                )}
              </div>
              <div className= "text-details">
                <h4 className="each-detail">Category</h4>
                <p className="text-content">{mealObject.strCategory}</p>
                <h4 className="each-detail">Ingredients</h4>
                {mealsIngredients.map((eachMealIngredient, index) => (
                  <p
                    className="text-content"
                    data-testid={ `${index}-ingredient-name-and-measure` }
                    key={ eachMealIngredient }
                  >
                    { `${eachMealIngredient} : ${mealsMeasures[index]}` }
                  </p>
                ))}
                <h4 className="each-detail">Instructions</h4>
                <p className="text-content">{mealObject.strInstructions}</p>
                {recommendations.length > 0 && (
                <>
                  <h2 className="each-detail">Recommended</h2>
                  <RecommendationCards
                    recommendations={ recommendations }
                  />
                </>)}
              </div>
            </div>)
              : (
              <div className= "allDescripition-container">
                <div className="name-image-video-container">
                  <h1 className="recipeDetail-title ">RECIPE DETAILS</h1>
                  <div className= "recipeDetailTitle-btns">
                    <h2 data-testid="recipe-title">{drinkObject.strDrink}</h2>
                    <div className= "only-btns">
                      <button
                        className="favorite-btn"
                        onClick={ () => handleFavorite() }
                      >
                        { isFavorite? 
                        <FaHeart
                          style={{
                            height: '25px',
                            width: '25px',
                            color:  "#af1d3d",
                            backgroundColor : '#dbe2ec00',
                            padding:  '0px',
                            margin: '2px',
                            }}
                        /> :
                        <FaHeart
                          style={{
                            height: '25px',
                            width: '25px',
                            color:  "#969ba1f1",
                            backgroundColor : '#dbe2ec00',
                            padding:  '0px',
                            margin: '2px',
                            }}
                        />}
                      </button>
                      <button
                        className="share-btn"
                        src={ IoShareSocial }
                        onClick={ () => {
                          copy(`http://localhost:3000${location.pathname}`);
                          setWasCopied(true);
                          const time = 2000;
                          setTimeout(() => setWasCopied(false), time);
                        } }
                      >
                         <IoShareSocial
                          style={{
                            height: '30px',
                            width: '30px',
                            color:  "#969ba1f1",
                            backgroundColor : '#dbe2ec00',
                            padding:  '0px',
                            margin: '0px',
                            }}
                        />
                         { wasCopied && <p>Link copied!</p>}
                      </button>
                    </div>
                  </div>
                <img
                  className="recipeDetails-drink-image"
                  data-testid="recipe-photo"
                  src={ drinkObject.strDrinkThumb }
                  alt={ drinkObject.strDrink }
                />
                {videoUrl && (
                  <video controls data-testid="video" className= "recipeDetail-video">
                    <source src={ drinkObject.strVideo } type="video/mp4" />
                    <track
                      kind="captions"
                      label="English"
                      srcLang="en"
                      src={ drinkObject.strDrink }
                    />
                    Seu navegador não suporta o elemento de vídeo.
                  </video>
                )}
              </div>
              <div className= "text-details">
                <h4 className="each-detail">Category</h4>
                <p className="text-content">{drinkObject.strAlcoholic}</p>
                <p data-testid="recipe-category">{drinkObject.strCategory}</p>
                <h4 className="each-detail">Ingredients</h4>
                {drinksIngredients.map((eachDrinkIngredient, index) => (
                  <p
                    className="text-content"
                    data-testid={ `${index}-ingredient-name-and-measure` }
                    key={ eachDrinkIngredient }
                  >
                    { `${eachDrinkIngredient} : ${drinksMeasures[index]}` }
                  </p>
                ))}
                <h4 className="each-detail">Instructions</h4>
                <p className="text-content">{drinkObject.strInstructions}</p>
                {recommendations.length > 0 && (
                <>
                  <h2 className="each-detail">Recommended</h2>
                  <RecommendationCards
                    recommendations={ recommendations }
                  />
                </>)}
              </div>
            </div>)}

        </div>
        <Footer />
    </div>
  );
}
