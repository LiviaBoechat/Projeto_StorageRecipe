import { fireEvent, screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helper/renderWithRouter';
import MealsProvider from '../context/MealsProvider';
import HeaderProvider from '../context/HeaderProvider';
import DrinksProvider from '../context/DrinksProvider';
import App from '../App';

describe('Header', () => {
  it('Testar a pagina meals', async () => {
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

    const mealsTitle = screen.getByRole('heading', { name: /meals/i });
    const iconePerfil = screen.getByRole('img', { name: /ícone de perfi/i });
    const iconeBusca = screen.getByRole('button', { name: /ícone de busca/i });

    expect(mealsTitle).toBeInTheDocument();
    expect(iconePerfil).toBeInTheDocument();
    expect(iconeBusca).toBeInTheDocument();

    userEvent.click(iconePerfil);
    const profileTitle = screen.getByRole('heading', { name: /profile/i });
    expect(profileTitle).toBeInTheDocument();

    const btnMeal = screen.getByRole('img', { name: /meal icon/i });
    userEvent.click(btnMeal);
    userEvent.click(iconeBusca);

    const btnDrinks = screen.getByRole('button', { name: /drink icon/i });
    userEvent.click(btnDrinks);
    expect(history.location.pathname).toBe('/drinks');

    const dinksTiTle = screen.getByRole('heading', { name: /drinks/i });
    expect(dinksTiTle).toBeInTheDocument();
  });

  it('testa se aparece o input na tela', () => {
    const { history } = renderWithRouter(
      <HeaderProvider>
        <MealsProvider>
          <DrinksProvider>
            <App />
          </DrinksProvider>
        </MealsProvider>
      </HeaderProvider>,
    );

    act(() => {
      history.push('/meals');
    });

    fireEvent.click(screen.getByTestId('search-top-btn'));
    expect(screen.getByTestId('search-input')).toBeInTheDocument();
  });

  it('Testar atualização do input de busca para drinks', async () => {
    const { history } = renderWithRouter(
      <HeaderProvider>
        <MealsProvider>
          <DrinksProvider>
            <App />
          </DrinksProvider>
        </MealsProvider>
      </HeaderProvider>,
    );

    act(() => {
      history.push('/drinks');
    });

    screen.logTestingPlaygroundURL();

    const searchBtn = screen.getByTestId('search-top-btn');
    userEvent.click(searchBtn);

    const searchInput = screen.getByTestId('search-input');
    expect(searchInput.value).toBe('');

    const inputText = 'Vodka';
    userEvent.type(searchInput, inputText);

    expect(searchInput.value).toBe(inputText);

    const inputRadioName = screen.getByTestId('name-search-radio');
    userEvent.click(inputRadioName);

    const btnSearch = screen.getByRole('button', { name: /search/i });
    userEvent.click(btnSearch);

    await waitFor(() => {
      const element = screen.getByText(/Long vodka/i);
      expect(element).toBeInTheDocument();

      const imgVodka = screen.getByRole('img', { name: /long vodka/i });
      expect(imgVodka).toBeInTheDocument();

      const testId = screen.getByTestId('0-card-img');
      expect(testId).toBeInTheDocument();
    });
    screen.logTestingPlaygroundURL();
    screen.debug();
  });

  it('testa se vai para as devidas rotas', () => {
    const { history } = renderWithRouter(
      <HeaderProvider>
        <MealsProvider>
          <DrinksProvider>
            <App />
          </DrinksProvider>
        </MealsProvider>
      </HeaderProvider>,
    );

    act(() => {
      history.push('/meals');
    });

    const mealsTitle = screen.getByRole('heading', { name: /meals/i });
    expect(mealsTitle).toBeInTheDocument();

    act(() => {
      history.push('/done-recipes');
    });

    const buttonRoute = screen.getByTestId('profile-top-btn');
    expect(buttonRoute).toBeInTheDocument();

    act(() => {
      history.push('/favorite-recipes');
    });
  });
});
