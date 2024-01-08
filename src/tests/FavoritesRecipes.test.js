import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import renderWithRouter from './helper/renderWithRouter';
import MealsProvider from '../context/MealsProvider';
import HeaderProvider from '../context/HeaderProvider';
import DrinksProvider from '../context/DrinksProvider';
import App from '../App';

describe('Favorites', () => {
  const mealsRoute = '/meals/52977';
  const drinksRoute = '/drinks/15997';
  const favoriteBtn = 'favorite-btn';
  const horizontalName = '0-horizontal-name';
  it('Titulo/nomes/Botoes', async () => {
    const { history } = renderWithRouter(
      <HeaderProvider>
        <MealsProvider>
          <DrinksProvider>
            <App />
          </DrinksProvider>
        </MealsProvider>
      </HeaderProvider>,
    );

    await act(async () => {
      history.push(mealsRoute);
    });

    const favBtn = screen.getByTestId(favoriteBtn);
    const profileBtn = await screen.findByTestId('profile-top-btn');
    userEvent.click(favBtn);
    userEvent.click(profileBtn);
    const favoriteRecipes = screen.getByTestId('profile-favorite-btn');
    userEvent.click(favoriteRecipes);

    const favTitle = screen.getByRole('heading', { name: 'Favorite Recipes' });
    const allBtn = await screen.findByTestId('filter-by-all-btn');
    const mealBtn = await screen.findByTestId('filter-by-meal-btn');
    const drinkBtn = await screen.findByTestId('filter-by-drink-btn');
    const shareBtn = await screen.findByTestId(/-horizontal-share-btn/i);
    const favoriteHorizontalBtn = await screen.findByTestId(/-horizontal-favorite-btn/i);

    expect(favTitle).toBeInTheDocument();
    expect(allBtn).toBeInTheDocument();
    expect(mealBtn).toBeInTheDocument();
    expect(drinkBtn).toBeInTheDocument();
    expect(shareBtn).toBeInTheDocument();
    expect(favoriteHorizontalBtn).toBeInTheDocument();

    const nameRecipe = await screen.findByTestId(horizontalName);
    window.document.execCommand = jest.fn(() => true);
    userEvent.click(shareBtn);
    const copiedMessage = await screen.findByText('Link copied!');
    expect(copiedMessage).toBeInTheDocument();

    expect(nameRecipe).toBeInTheDocument();

    userEvent.click(nameRecipe);

    expect(history.location.pathname).toBe(mealsRoute);

    userEvent.click(favBtn);

    expect(nameRecipe).not.toBeInTheDocument();
    expect(shareBtn).not.toBeInTheDocument();
    expect(favBtn).not.toBeInTheDocument();
    localStorage.clear();
  });
  it('localstorage test', async () => {
    const storage = [
      {
        id: '52977',
        type: 'meal',
        nationality: 'Turkish',
        category: 'Side',
        alcoholicOrNot: '',
        name: 'Corba',
        image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
      },
    ];
    localStorage.setItem('favoriteRecipes', JSON.stringify(storage));

    const { history } = renderWithRouter(
      <HeaderProvider>
        <MealsProvider>
          <DrinksProvider>
            <App />
          </DrinksProvider>
        </MealsProvider>
      </HeaderProvider>,
    );

    await act(async () => {
      history.push('/favorite-recipes');
    });

    const nameRecipe = await screen.findByTestId(horizontalName);
    const favoriteBtn1 = await screen.findByTestId('0-horizontal-favorite-btn');
    expect(nameRecipe).toBeInTheDocument();
    userEvent.click(favoriteBtn1);

    expect(localStorage.getItem('favoriteRecipes')).toEqual('[]');
    localStorage.clear();
  });
  describe('Favorites botoes de filtro', () => {
    it('All/Meals/Drinks', async () => {
      const { history } = renderWithRouter(
        <HeaderProvider>
          <MealsProvider>
            <DrinksProvider>
              <App />
            </DrinksProvider>
          </MealsProvider>
        </HeaderProvider>,
      );

      await act(async () => {
        history.push(mealsRoute);
      });

      const favMealBtn = screen.getByTestId(favoriteBtn);
      await userEvent.click(favMealBtn);

      await act(async () => {
        history.push(drinksRoute);
      });

      const favDrinkBtn = await screen.findByTestId(favoriteBtn);
      await userEvent.click(favDrinkBtn);

      const profileBtn = await screen.findByTestId('profile-top-btn');
      userEvent.click(profileBtn);

      const favoriteRecipes = screen.getByTestId('profile-favorite-btn');
      userEvent.click(favoriteRecipes);

      const allBtn = await screen.findByTestId('filter-by-all-btn');
      const mealBtn = await screen.findByTestId('filter-by-meal-btn');
      const drinkBtn = await screen.findByTestId('filter-by-drink-btn');
      const shareBtn1 = await screen.findByTestId('0-horizontal-share-btn');
      const favoriteBtn1 = await screen.findByTestId('0-horizontal-favorite-btn');
      const shareBtn2 = await screen.findByTestId('1-horizontal-share-btn');
      const favoriteBtn2 = await screen.findByTestId('1-horizontal-favorite-btn');
      expect(shareBtn2).toBeVisible();
      expect(favoriteBtn2).toBeVisible();

      expect(shareBtn1).toBeInTheDocument();
      expect(favoriteBtn1).toBeInTheDocument();

      const nameRecipe1 = await screen.findByTestId(horizontalName);
      const nameRecipe2 = await screen.findByTestId('1-horizontal-name');

      expect(nameRecipe1).toBeInTheDocument();
      waitFor(() => {
        expect(nameRecipe1).toHaveTextContent('Name: Cobra');
      });

      expect(nameRecipe2).toBeInTheDocument();
      waitFor(() => {
        expect(nameRecipe2).toHaveTextContent('Name: GG');
      });

      userEvent.click(mealBtn);
      expect(nameRecipe2).not.toBeInTheDocument();

      userEvent.click(allBtn);
      waitFor(() => {
        expect(nameRecipe1).toBeInTheDocument();
        expect(nameRecipe2).toBeInTheDocument();
      });

      userEvent.click(drinkBtn);
      expect(nameRecipe1).not.toBeInTheDocument();

      userEvent.click(allBtn);
      waitFor(() => {
        expect(nameRecipe1).toBeInTheDocument();
        expect(nameRecipe2).toBeInTheDocument();
      });

      userEvent.click(favoriteBtn1);
      userEvent.click(favoriteBtn2);
      expect(favoriteBtn1).not.toBeInTheDocument();
      expect(favoriteBtn2).not.toBeInTheDocument();
      localStorage.clear();
    });
  });
});
