import { UseGetItem, UseSetItem } from '../hooks/UseLocalStorage';

export default function handleFavorite(
  { mealObject, drinkObject },
  pathname,
  id,
  setIsFavorite,
) {
  const favoriteRecipes = UseGetItem('favoriteRecipes') || [];

  const isRecipeFavorite = favoriteRecipes.some((recipe) => recipe.id === id);

  const newFavoriteRecipes = isRecipeFavorite
    ? favoriteRecipes.filter((recipe) => recipe.id !== id)
    : [...favoriteRecipes, {
      id,
      type: pathname.includes('meals') ? 'meal' : 'drink',
      nationality: mealObject?.strArea || '',
      category: mealObject?.strCategory || drinkObject?.strCategory,
      alcoholicOrNot: drinkObject?.strAlcoholic || '',
      name: mealObject?.strMeal || drinkObject?.strDrink,
      image: mealObject?.strMealThumb || drinkObject?.strDrinkThumb,
    }];

  UseSetItem('favoriteRecipes', newFavoriteRecipes);
  setIsFavorite(!isRecipeFavorite);
}
