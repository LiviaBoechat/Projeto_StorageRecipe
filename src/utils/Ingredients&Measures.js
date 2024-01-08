export function getMealIngredientsAndMeasures(
  mealObject,
  setMealsIngredients,
  setMealsMeasures,
) {
  // ingredients
  const allMealIngredientKeys = Object.keys(mealObject)
    .filter((eachKey) => eachKey.includes('strIngredient'));
  const getKeysIngredientsValues = allMealIngredientKeys
    .map((eachKey) => mealObject[eachKey]);
  const getValidIngredients = getKeysIngredientsValues
    .filter((eachIngredient) => eachIngredient !== '' && eachIngredient !== null);
  setMealsIngredients(getValidIngredients);

  // measure
  const allMealMeasureKeys = Object.keys(mealObject)
    .filter((eachKey) => eachKey.includes('strMeasure'));
  const getKeysMeasuresValues = allMealMeasureKeys
    .map((eachKey) => mealObject[eachKey]);
  const getValidMeasures = getKeysMeasuresValues
    .filter((eachMeasure) => eachMeasure !== '' && eachMeasure !== null);
  setMealsMeasures(getValidMeasures);
}

export function getDrinkIngredientsAndMeasures(
  drinkObject,
  setDrinksIngredients,
  setDrinksMeasures,
) {
  // ingredients
  const allDrinkIngredientKeys = Object.keys(drinkObject)
    .filter((eachKey) => eachKey.includes('strIngredient'));
  const getKeysIngredientsValues = allDrinkIngredientKeys
    .map((eachKey) => drinkObject[eachKey]);
  const getValidIngredients = getKeysIngredientsValues
    .filter((eachIngredient) => eachIngredient !== '' && eachIngredient !== null);
  setDrinksIngredients(getValidIngredients);

  // measure
  const allDrinkMeasureKeys = Object.keys(drinkObject)
    .filter((eachKey) => eachKey.includes('strMeasure'));
  const getKeysMeasuresValues = allDrinkMeasureKeys
    .map((eachKey) => drinkObject[eachKey]);
  const getValidMeasures = getKeysMeasuresValues
    .filter((eachMeasure) => eachMeasure !== '' && eachMeasure !== null);
  setDrinksMeasures(getValidMeasures);
}
