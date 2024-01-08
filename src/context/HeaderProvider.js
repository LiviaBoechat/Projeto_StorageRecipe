import { useMemo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import HeaderContext from './HeaderContext';

function HeaderProvider({ children }) {
  const [radioChoice, setRadio] = useState([]);
  const [mealFromFetch, setMeal] = useState([]);
  const [inputSearchText, setInputSearchText] = useState('');
  const [flag, setFlag] = useState('generic');
  const [mealObject, setMealObject] = useState({});
  const [drinkObject, setDrinkObject] = useState({});
  const [mealsIngredients, setMealsIngredients] = useState([]);
  const [drinksIngredients, setDrinksIngredients] = useState([]);
  const [mealsMeasures, setMealsMeasures] = useState([]);
  const [drinksMeasures, setDrinksMeasures] = useState([]);
  const [videoUrl, setVideoUrl] = useState('');
  const [recommendations, setRecommendations] = useState([]);
  const [isFavorite, setIsFavorite] = useState([]);

  const value = useMemo(() => ({
    mealFromFetch,
    setMeal,
    radioChoice,
    setRadio,
    inputSearchText,
    setInputSearchText,
    flag,
    setFlag,
    mealObject,
    setMealObject,
    drinkObject,
    setDrinkObject,
    mealsIngredients,
    setMealsIngredients,
    drinksIngredients,
    setDrinksIngredients,
    mealsMeasures,
    setMealsMeasures,
    drinksMeasures,
    setDrinksMeasures,
    videoUrl,
    setVideoUrl,
    recommendations,
    setRecommendations,
    isFavorite,
    setIsFavorite,
  }), [
    flag,
    setFlag,
    mealFromFetch,
    setMeal,
    radioChoice,
    inputSearchText,
    mealObject,
    drinkObject,
    mealsIngredients,
    drinksIngredients,
    mealsMeasures,
    drinksMeasures,
    videoUrl,
    recommendations,
    isFavorite,
  ]);

  useEffect(() => {
    if (mealObject) {
      const allMealIngredientKeys = Object.keys(mealObject)
        .filter((eachKey) => eachKey.includes('strIngredient'));
      const getKeysValues = allMealIngredientKeys
        .map((eachKey) => mealObject[eachKey]);
      const getValidIngredients = getKeysValues
        .filter((eachIngredient) => eachIngredient !== '' && eachIngredient !== null);
      setMealsIngredients(getValidIngredients);
    }
  }, [mealObject]);

  useEffect(() => {
    if (drinkObject) {
      const allDrinkIngredientKeys = Object.keys(drinkObject)
        .filter((eachKey) => eachKey.includes('strIngredient'));
      const getKeysValues = allDrinkIngredientKeys.map((eachKey) => drinkObject[eachKey]);
      const getValidIngredients = getKeysValues
        .filter((eachIngredient) => eachIngredient !== '' && eachIngredient !== null);
      setDrinksIngredients(getValidIngredients);
    }
  }, [drinkObject]);

  useEffect(() => {
    if (mealObject) {
      const allMealMeasureKeys = Object.keys(mealObject)
        .filter((eachKey) => eachKey.includes('strMeasure'));
      const getKeysValues = allMealMeasureKeys
        .map((eachKey) => mealObject[eachKey]);
      const getValidMeasures = getKeysValues
        .filter((eachMeasure) => eachMeasure !== '' && eachMeasure !== null);
      setMealsMeasures(getValidMeasures);
    }
  }, [mealObject]);

  useEffect(() => {
    if (drinkObject) {
      const allDrinkMeasureKeys = Object.keys(drinkObject)
        .filter((eachKey) => eachKey.includes('strMeasure'));
      const getKeysValues = allDrinkMeasureKeys.map((eachKey) => drinkObject[eachKey]);
      const getValidMeasures = getKeysValues
        .filter((eachMeasure) => eachMeasure !== '' && eachMeasure !== null);
      setDrinksMeasures(getValidMeasures);
    }
  }, [drinkObject]);

  return (
    <HeaderContext.Provider value={ value }>
      { children }
    </HeaderContext.Provider>
  );
}

export default HeaderProvider;

HeaderProvider.propTypes = {
  children: PropTypes.node,
}.isRequired;
