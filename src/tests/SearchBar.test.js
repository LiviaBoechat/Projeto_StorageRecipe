import React from 'react';
import { screen, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helper/renderWithRouter';
import MealsProvider from '../context/MealsProvider';
import HeaderProvider from '../context/HeaderProvider';
import DrinksProvider from '../context/DrinksProvider';
import fetch from '../../cypress/mocks/fetch';

const searchButton = 'search-top-btn';
const searchInput = 'search-input';
const inputRadioName = 'name-search-radio';

describe('Search Bar tests', () => {
  it('testa se ao digitar uma comida especifica na rota meals ele vai para outra rota', async () => {
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
      history.push('/meals');
    });

    const buttonSearch = screen.getByTestId(searchButton);
    userEvent.click(buttonSearch);
    const inputSearch = screen.getByTestId(searchInput);
    expect(inputSearch).toBeInTheDocument();
    userEvent.type(inputSearch, 'arrabiata');
    const nameRadio = screen.getByTestId(inputRadioName);
    expect(nameRadio).toBeInTheDocument();
    userEvent.click(nameRadio);
    const buttonPesquisar = screen.getByRole('button', { name: /search/i });
    expect(buttonPesquisar).toBeInTheDocument();
    userEvent.click(buttonPesquisar);

    const carregando = await screen.findAllByText(/carregando\.\.\./i);
    expect(carregando[0]).toBeInTheDocument();

    await waitFor(() => {
      const recommendedTitle = screen.getByRole('heading', { name: /recipe details/i });
      expect(recommendedTitle).toBeInTheDocument();
    });

    waitFor(() => expect(history.location.pathname).toBe('/meals/52771'));
  });

  it('testa se ao digitar uma bebida especifica na rota meals ele vai para outra rota', async () => {
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
      history.push('/drinks');
    });

    const buttonSearch = screen.getByTestId(searchButton);
    userEvent.click(buttonSearch);
    const inputSearch = screen.getByTestId(searchInput);
    expect(inputSearch).toBeInTheDocument();
    userEvent.type(inputSearch, 'aquamarine');
    const nameRadio = screen.getByTestId(inputRadioName);
    expect(nameRadio).toBeInTheDocument();
    userEvent.click(nameRadio);
    const buttonPesquisar = screen.getByRole('button', { name: /search/i });
    expect(buttonPesquisar).toBeInTheDocument();
    userEvent.click(buttonPesquisar);

    const carregando = await screen.findAllByText(/carregando\.\.\./i);
    expect(carregando[0]).toBeInTheDocument();

    await waitFor(() => {
      const recommendedTitle = screen.getByRole('heading', { name: /recipe details/i });
      expect(recommendedTitle).toBeInTheDocument();
    });

    expect(history.location.pathname).toBe('/drinks/178319');
  });

  it('testa se digitar xablau no input ele da um alert na tela', async () => {
    global.alert = jest.fn(() => /Sorry, we haven\\'t found any recipes for these filters./i);

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
      history.push('/meals');
    });

    const buttonSearch = screen.getByTestId(searchButton);
    userEvent.click(buttonSearch);
    const inputSearch = screen.getByTestId(searchInput);
    expect(inputSearch).toBeInTheDocument();
    userEvent.type(inputSearch, 'xablau');
    const nameRadio = screen.getByTestId(inputRadioName);
    expect(nameRadio).toBeInTheDocument();
    userEvent.click(nameRadio);
    const buttonPesquisar = screen.getByRole('button', { name: /search/i });
    expect(buttonPesquisar).toBeInTheDocument();
    userEvent.click(buttonPesquisar);

    await waitFor(() => {
      expect(global.alert).toHaveBeenCalled();
    });
  });

  it('testa se digitar mais de uma letra no fisrtsLetter ele da um alert na tela', async () => {
    global.alert = jest.fn(() => /Your search must have only 1 (one) character/i);

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
      history.push('/meals');
    });

    const buttonSearch = screen.getByTestId(searchButton);
    userEvent.click(buttonSearch);
    const inputSearch = screen.getByTestId(searchInput);
    expect(inputSearch).toBeInTheDocument();
    userEvent.type(inputSearch, 'xablau');
    const nameRadio = screen.getByTestId('first-letter-search-radio');
    expect(nameRadio).toBeInTheDocument();
    userEvent.click(nameRadio);
    const buttonPesquisar = screen.getByRole('button', { name: /search/i });
    expect(buttonPesquisar).toBeInTheDocument();
    userEvent.click(buttonPesquisar);

    await waitFor(() => {
      expect(global.alert).toHaveBeenCalled();
    });
  });

  it('testa se estou na rota meals e se digitar uma comida especifica eu vou para a rota dessa comida', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockImplementation(fetch);

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
      history.push('/meals');
    });

    expect(history.location.pathname).toBe('/meals');

    const buttonSearch = screen.getByTestId(searchButton);
    userEvent.click(buttonSearch);
    const inputSearch = screen.getByTestId(searchInput);
    expect(inputSearch).toBeInTheDocument();
    userEvent.type(inputSearch, 'arrabiata');
    const nameRadioInput = screen.getByTestId('name-search-radio');
    expect(nameRadioInput).toBeInTheDocument();
    userEvent.click(nameRadioInput);
    const buttonPesquisar = screen.getByRole('button', { name: /search/i });
    expect(buttonPesquisar).toBeInTheDocument();
    userEvent.click(buttonPesquisar);

    await waitFor(() => {
      expect(global.fetch).toBeCalled();
    });
  });

  it('testa se eu pesquisar por sal em ingredient retorna uma lista de comidas com sal', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockImplementation(fetch);

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
      history.push('/meals');
    });

    expect(history.location.pathname).toBe('/meals');

    const buttonSearch = screen.getByTestId(searchButton);
    userEvent.click(buttonSearch);
    const inputSearch = screen.getByTestId(searchInput);
    expect(inputSearch).toBeInTheDocument();
    userEvent.type(inputSearch, 'salt');
    const ingredientInputRadio = screen.getByTestId('ingredient-search-radio');
    expect(ingredientInputRadio).toBeInTheDocument();
    userEvent.click(ingredientInputRadio);
    const buttonPesquisar = screen.getByRole('button', { name: /search/i });
    expect(buttonPesquisar).toBeInTheDocument();
    userEvent.click(buttonPesquisar);

    waitFor(() => {
      expect(global.fetch).toBeCalled();
      const cardZero = screen.getByTestId('0-card-name');
      expect(cardZero).toBeInTheDocument();
    });
  });

  it('testa se pesquisar pela primeira letra ele acha os cards', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockImplementation(fetch);

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
      history.push('/meals');
    });

    expect(history.location.pathname).toBe('/meals');

    const buttonSearch = screen.getByTestId(searchButton);
    userEvent.click(buttonSearch);
    const inputSearch = screen.getByTestId(searchInput);
    expect(inputSearch).toBeInTheDocument();
    userEvent.type(inputSearch, 'a');
    const firstLetterRadioInput = screen.getByTestId('first-letter-search-radio');
    expect(firstLetterRadioInput).toBeInTheDocument();
    userEvent.click(firstLetterRadioInput);
    const buttonPesquisar = screen.getByRole('button', { name: /search/i });
    expect(buttonPesquisar).toBeInTheDocument();
    userEvent.click(buttonPesquisar);

    waitFor(() => {
      expect(global.fetch).toBeCalled();
      const cardZero = screen.getByTestId('0-card-name');
      expect(cardZero).toBeInTheDocument();
    });
  });
});
