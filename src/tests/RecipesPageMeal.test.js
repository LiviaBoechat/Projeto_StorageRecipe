import React from 'react';
import { screen, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helper/renderWithRouter';
import fetch from '../../cypress/mocks/fetch';
import MealsProvider from '../context/MealsProvider';
import HeaderProvider from '../context/HeaderProvider';
import DrinksProvider from '../context/DrinksProvider';

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
        { route: '/meals' },
      );
      history2 = history;
    });
  });

  it('Testa se existem os botoes de filtros na rota meals', async () => {
    await waitFor(() => {
      expect(global.fetch).toBeCalled();
    });

    const buttonAll = screen.getByRole('button', { name: /all/i });
    const buttonBeef = screen.getByRole('button', { name: /Beef/i });
    const buttonBreakFast = screen.getByRole('button', { name: /Breakfast/i });
    const buttonChicken = screen.getByRole('button', { name: /Chicken/i });
    const buttonDessert = screen.getByRole('button', { name: /Dessert/i });
    const buttonGoat = screen.getByRole('button', { name: /Goat/i });

    expect(
      buttonAll
      && buttonBeef
      && buttonBreakFast
      && buttonChicken
      && buttonDessert
      && buttonGoat,
    ).toBeInTheDocument();

    userEvent.click(buttonGoat);

    const buttonPosGoat = await screen.findByAltText('Mbuzi Choma (Roasted Goat)');
    expect(buttonPosGoat).toBeInTheDocument();

    const buttonAllLength = screen.getAllByRole('button');
    expect(buttonAllLength).toHaveLength(12);

    userEvent.click(buttonGoat);

    await waitFor(() => {
      const buttonAllLengthPosClick = screen.getAllByRole('button');
      expect(buttonAllLengthPosClick).toHaveLength(23);
    });

    expect(global.fetch).toBeCalled();
  });

  it('testa se os icones de meals estao na tela', async () => {
    const buttonAllLength = screen.getAllByRole('button');
    expect(buttonAllLength).toHaveLength(23);

    const altImageButton0 = screen.getByAltText('Corba');
    const altImageButton1 = screen.getByAltText('Fish pie');
    const altImageButton2 = screen.getByAltText('Kapsalon');
    const altImageButton3 = screen.getByAltText('Kumpir');
    const altImageButton4 = screen.getByAltText('Pancakes');
    const altImageButton5 = screen.getByAltText('Dal fry');
    const altImageButton6 = screen.getByAltText('Poutine');
    const altImageButton7 = screen.getByAltText('Lasagne');
    const altImageButton8 = screen.getByAltText('Timbits');
    const altImageButton9 = screen.getByAltText('Wontons');
    const altImageButton10 = screen.getByAltText('Kafteji');
    const altImageButton11 = screen.getByAltText('Big Mac');

    await waitFor(() => {
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
    });
  });

  it('Testa ao clicar nos botoes de filtro', async () => {
    const buttonBeef = screen.getByRole('button', { name: /Beef/i });
    userEvent.click(buttonBeef);

    expect(global.fetch).toBeCalled();

    const beefWord = await screen.findByTestId('0-card-img');
    expect(beefWord).toBeInTheDocument();
  });

  it('Testa se redireciona para a pagina de detalhes ao encontrar somente uma receita', async () => {
    const buttonSearch = screen.getByTestId('search-top-btn');
    userEvent.click(buttonSearch);
    const inputSearch = screen.getByTestId('search-input');
    expect(inputSearch).toBeInTheDocument();
    userEvent.type(inputSearch, 'Arrabiata');
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
      expect(history2.location.pathname).toBe('/meals/52771');
    });
  });

  it('Testa ao clicar em um botao de recitas na tela de drinks', async () => {
    const buttonBebidasPageInitial = screen.getByAltText('Corba');
    expect(buttonBebidasPageInitial).toBeInTheDocument();
    userEvent.click(buttonBebidasPageInitial);

    expect(history2.location.pathname).toBe('/meals/52977');
  });
});
