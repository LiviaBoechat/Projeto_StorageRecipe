import React from 'react';
import { screen, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// import Recipes from '../pages/Recipes';
import renderWithRouter from './helper/renderWithRouter';
import fetch from '../../cypress/mocks/fetch';
import MealsProvider from '../context/MealsProvider';
import HeaderProvider from '../context/HeaderProvider';
import DrinksProvider from '../context/DrinksProvider';
import App from '../App';

describe('testando a pagina recipes', () => {
  let history2;

  beforeEach(async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockImplementation(fetch);

    await act(async () => {
      const { history } = renderWithRouter(
        <HeaderProvider>
          <MealsProvider>
            <DrinksProvider>
              <App />
            </DrinksProvider>
          </MealsProvider>
        </HeaderProvider>,
        { route: '/drinks' },
      );
      history2 = history;
    });
  });

  it('testa se esta na tela de drinks', async () => {
    await act(async () => {
      expect(global.fetch).toBeCalled();
    });

    await waitFor(() => {
      const card = screen.getByTestId('0-recipe-card');
      expect(card).toBeInTheDocument();
    });

    const buttonAll = screen.getByRole('button', { name: /All/i });
    expect(buttonAll).toBeInTheDocument();

    expect(history2.location.pathname).toBe('/drinks');
  });

  it('Testa ao clicar nos botoes de filtro', async () => {
    const buttonOrdinaryDrink = screen.getByRole('button', { name: /Ordinary Drink/i });
    expect(buttonOrdinaryDrink).toBeInTheDocument();

    userEvent.click(buttonOrdinaryDrink);

    expect(global.fetch).toBeCalled();

    const cardsScreen = await screen.findByTestId('0-card-img');
    expect(cardsScreen).toBeInTheDocument();

    userEvent.click(buttonOrdinaryDrink);
    screen.logTestingPlaygroundURL();
    const card = screen.getByRole('img', {
      name: /drink icon/i,
    });
    expect(card).toBeInTheDocument();
  });

  it('Testa se existem os botoes de filtros na rota drinks', async () => {
    await waitFor(() => {
      expect(global.fetch).toBeCalled();
    });

    const buttonAll = screen.getByRole('button', { name: /all/i });
    const buttonOrdinary = screen.getByRole('button', { name: /Ordinary Drink/i });
    const buttonCocktail = screen.getByRole('button', { name: /Cocktail/i });
    const buttonShake = screen.getByRole('button', { name: /Shake/i });
    const buttonOther = screen.getByTestId('Other/Unknown-category-filter');
    const buttonCocoa = screen.getByRole('button', { name: /Cocoa/i });

    expect(
      buttonAll
      && buttonOrdinary
      && buttonCocktail
      && buttonShake
      && buttonOther
      && buttonCocoa,
    ).toBeInTheDocument();
  });

  it('testa se os icones de drinks estao na tela', () => {
    const buttonAllLength = screen.getAllByRole('button');
    expect(buttonAllLength).toHaveLength(23);

    const altImageButton0 = screen.getByAltText('GG');
    const altImageButton1 = screen.getByAltText('A1');
    const altImageButton2 = screen.getByAltText('ABC');
    const altImageButton3 = screen.getByAltText('Kir');
    const altImageButton4 = screen.getByAltText('747');
    const altImageButton5 = screen.getByAltText('252');
    const altImageButton6 = screen.getByAltText('Ace');
    const altImageButton7 = screen.getByAltText('Adam');
    const altImageButton8 = screen.getByAltText('B-53');
    const altImageButton9 = screen.getByAltText('AT&T');
    const altImageButton10 = screen.getByAltText('ACID');
    const altImageButton11 = screen.getByAltText('B-52');

    expect(
      altImageButton0
      && altImageButton1
      && altImageButton2
      && altImageButton3
      && altImageButton4
      && altImageButton5
      && altImageButton6
      && altImageButton7
      && altImageButton8
      && altImageButton9
      && altImageButton10
      && altImageButton11,
    ).toBeInTheDocument();

    // screen.logTestingPlaygroundURL();
  });

  // Teste que testa o botao de filtro e espera o clique duas vezes n estou conseguind fazer
  it('Testa ao clicar nos botoes de filtro', async () => {
    const ordinaryDrinkButton = screen.getByRole('button', { name: /Ordinary Drink/i });
    userEvent.click(ordinaryDrinkButton);

    await waitFor(() => {
      expect(global.fetch).toBeCalled();
    });

    const cardDrinks0 = await screen.findByTestId('0-card-img');
    expect(cardDrinks0).toBeInTheDocument();

    const buttonBack = screen.getByRole('button', { name: /Shake/i });
    userEvent.click(buttonBack);
    expect(buttonBack).toBeInTheDocument();
  });

  it('Testa se redireciona para a pagina de detalhes ao encontrar somente uma bebida', async () => {
    // screen.logTestingPlaygroundURL();

    const buttonSearch = screen.getByTestId('search-top-btn');
    expect(buttonSearch).toBeInTheDocument();

    userEvent.click(buttonSearch);
    const inputSearch = screen.getByTestId('search-input');
    expect(inputSearch).toBeInTheDocument();
    userEvent.type(inputSearch, 'Aquamarine');
    const nameInputRadio = screen.getByTestId('name-search-radio');
    expect(nameInputRadio).toBeInTheDocument();
    userEvent.click(nameInputRadio);
    const buttonPesquisar = screen.getByRole('button', { name: /search/i });
    expect(buttonPesquisar).toBeInTheDocument();
    userEvent.click(buttonPesquisar);

    await waitFor(() => {
      expect(global.fetch).toBeCalled();
    });

    await waitFor(() => {
      expect(history2.location.pathname).toBe('/drinks/178319');
    });
  });

  it('Testa ao clicar em um botao de recitas na tela de drinks', async () => {
    const buttonBebidasPageInitial = screen.getByAltText('GG');
    expect(buttonBebidasPageInitial).toBeInTheDocument();
    userEvent.click(buttonBebidasPageInitial);

    expect(history2.location.pathname).toBe('/drinks/15997');
  });

  it('Testa a ida e a volta do botao de All', async () => {
    const btnGG = screen.getByAltText('GG');
    expect(btnGG).toBeInTheDocument();

    const btnCategory = screen.getByRole('button', { name: /cocktail/i });
    expect(btnCategory).toBeInTheDocument();
    userEvent.click(btnCategory);

    await screen.findByText(/Absolutely Fabulous/i);

    expect(screen.getByText(/A True Amaretto Sour/i)).toBeInTheDocument();

    const btnAll = screen.getByRole('button', { name: /all/i });
    expect(btnAll).toBeInTheDocument();
    userEvent.click(btnAll);

    await screen.findByText(/Ace/i);
    expect(screen.getByText(/Adam/i)).toBeInTheDocument();
  });
});
