import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import renderWithRouter from './helper/renderWithRouter';
import MealsProvider from '../context/MealsProvider';
import HeaderProvider from '../context/HeaderProvider';
import DrinksProvider from '../context/DrinksProvider';
import App from '../App';
import blackHeart from '../images/blackHeartIcon.svg';
import whiteHeart from '../images/whiteHeartIcon.svg';

describe('Recipe Details', () => {
  const route = '/meals/52977';
  const start = 'start-recipe-btn';
  it('Carossel', async () => {
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
      history.push(route);
    });

    expect(history.location.pathname).toBe(route);
    const carossel0 = await screen.findByTestId('0-recommendation-card');
    const carossel1 = await screen.findByTestId('1-recommendation-card');
    const carossel2 = await screen.findByTestId('2-recommendation-card');
    const carossel3 = await screen.findByTestId('3-recommendation-card');
    const carossel4 = await screen.findByTestId('4-recommendation-card');
    const carossel5 = await screen.findByTestId('5-recommendation-card');

    expect(carossel0).toBeVisible();
    expect(carossel1).toBeVisible();
    expect(carossel2).toBeVisible();
    expect(carossel3).toBeVisible();
    expect(carossel4).toBeVisible();
    expect(carossel5).toBeVisible();
  });
  it('ingredientes/nome/categoria/instrucoes', async () => {
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
      history.push(route);
    });

    expect(history.location.pathname).toBe(route);
    // const video = await screen.findByRole('source');
    // expect(video).toHaveAttribute('src', 'https://www.youtube.com/watch?v=VVnZd8A84z4');
    const recipePhoto = await screen.findByTestId('recipe-photo');
    expect(recipePhoto).toBeInTheDocument();
    const recipeTitle = await screen.findByTestId('recipe-title');
    expect(recipeTitle).toBeInTheDocument();
    const recipeCategory = await screen.findByText('Side');
    expect(recipeCategory).toBeInTheDocument();
    const recipeIngredient = await screen.findAllByTestId(/-ingredient-name-and-measure/i);
    expect(recipeIngredient).toHaveLength(13);
    const recipeInstructions = await screen.findByTestId('instructions');
    expect(recipeInstructions).toBeInTheDocument();
  });
  it('botao', async () => {
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
      history.push(route);
    });

    const startBtn = screen.getByTestId(start);
    expect(startBtn).toBeInTheDocument();
    userEvent.click(startBtn);
    await waitFor(() => {
      expect(history.location.pathname).toBe('/meals/52977/in-progress');
    });
  });
  it('teste do botao continue recipe', async () => {
    const storageData = {
      drinks: {},
      meals: {
        52977: [
          'Lentils',
          'Onion',
          'Carrots',
          'Tomato Puree',
          'Cumin',
          'Paprika',
          'Mint',
          'Thyme',
          'Black Pepper',
          'Red Pepper Flakes',
          'Vegetable Stock',
          'Water',
          'Sea Salt',
        ],
      },
    };

    localStorage.setItem('inProgressRecipes', JSON.stringify(storageData));

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
      history.push(route);
    });

    const startBtn = screen.getByTestId(start);
    expect(startBtn).toBeInTheDocument();
    await waitFor(() => {
      expect(startBtn).toHaveTextContent('Continue Recipe');
    }, { timeout: 2000 });
    localStorage.clear();
  });
  it('chamada de api Meals', async () => {
    const mockFetchMeals = jest.spyOn(global, 'fetch');
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
      history.push(route);
    });

    const url = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=52977';
    expect(mockFetchMeals).toHaveBeenCalledWith(url);
    mockFetchMeals.mockRestore();
  });
  it('teste o botao de favoritar e compartilhar', async () => {
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
      history.push(route);
    });

    expect(history.location.pathname).toBe(route);

    const recipeDetails = screen.getByRole('heading', { name: 'Recipe Details' });
    expect(recipeDetails).toBeInTheDocument();

    const favBtn = screen.getByRole('button', { name: /Favoritar/i });
    expect(favBtn).toBeInTheDocument();
    expect(favBtn).toHaveAttribute('src', whiteHeart);
    userEvent.click(favBtn);
    expect(favBtn).toHaveAttribute('src', blackHeart);
    expect(localStorage.getItem('favoriteRecipes')).not.toBeNull();
    userEvent.click(favBtn);
    expect(localStorage.getItem('favoriteRecipes')).toBe('[]');
    const shareBtn = screen.getByRole('button', { name: /Compartilhar/i });
    expect(shareBtn).toBeInTheDocument();

    userEvent.click(shareBtn);
    const copiedMessage = await screen.findByText('Link copied!');
    expect(copiedMessage).toBeInTheDocument();
    waitFor(() => {
      expect(copiedMessage).not.toBeInTheDocument();
    });
  });

  it('chamada de api Drinks', async () => {
    const mockFetchDrinks = jest.spyOn(global, 'fetch');
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
      history.push('/drinks/15997');
    });

    const url = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=15997';
    expect(mockFetchDrinks).toHaveBeenCalledWith(url);
    mockFetchDrinks.mockRestore();
  });
});
describe('teste na tela Drinks', () => {
  const route = '/drinks/15997';
  const start = 'start-recipe-btn';
  it('Carossel', async () => {
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
      history.push(route);
    });

    expect(history.location.pathname).toBe(route);
    const carossel0 = await screen.findByTestId('0-recommendation-card');
    const carossel1 = await screen.findByTestId('1-recommendation-card');
    const carossel2 = await screen.findByTestId('2-recommendation-card');
    const carossel3 = await screen.findByTestId('3-recommendation-card');
    const carossel4 = await screen.findByTestId('4-recommendation-card');
    const carossel5 = await screen.findByTestId('5-recommendation-card');

    expect(carossel0).toBeVisible();
    expect(carossel1).toBeVisible();
    expect(carossel2).toBeVisible();
    expect(carossel3).toBeVisible();
    expect(carossel4).toBeVisible();
    expect(carossel5).toBeVisible();
  });
  it('ingredientes/nome/categoria/instrucoes', async () => {
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
      history.push(route);
    });

    expect(history.location.pathname).toBe(route);
    const recipePhoto = await screen.findByTestId('recipe-photo');
    expect(recipePhoto).toBeInTheDocument();
    const recipeTitle = await screen.findByTestId('recipe-title');
    expect(recipeTitle).toBeInTheDocument();
    const recipeCategory = await screen.findAllByTestId('recipe-category');
    expect(recipeCategory).toHaveLength(2);
    const recipeIngredient = await screen.findAllByTestId(/-ingredient-name-and-measure/i);
    expect(recipeIngredient).toHaveLength(3);
    const recipeInstructions = await screen.findByTestId('instructions');
    expect(recipeInstructions).toBeInTheDocument();
  });
  it('botao', async () => {
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
      history.push(route);
    });

    const startBtn = screen.getByTestId(start);
    expect(startBtn).toBeInTheDocument();
    userEvent.click(startBtn);
    await waitFor(() => {
      expect(history.location.pathname).toBe('/drinks/15997/in-progress');
    });
  });
  it('teste do botao continue recipe', async () => {
    const storageData = {
      drinks: {
        15997: [
          'Galliano',
          'Ginger ale',
          'Ice',
        ],
      },
      meals: {},
    };

    localStorage.setItem('inProgressRecipes', JSON.stringify(storageData));

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
      history.push(route);
    });

    const startBtn = screen.getByTestId(start);
    expect(startBtn).toBeInTheDocument();
    await waitFor(() => {
      expect(startBtn).toHaveTextContent('Continue Recipe');
    }, { timeout: 2000 });
    localStorage.clear();
  });
});
