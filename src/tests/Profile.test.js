import React from 'react';
import { screen, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Profile from '../pages/Profile';
import App from '../App';
import renderWithRouter from './helper/renderWithRouter';
import MealsProvider from '../context/MealsProvider';
import HeaderProvider from '../context/HeaderProvider';
import DrinksProvider from '../context/DrinksProvider';

// mock localstorage

describe('Arquivo com os teste da página Profile', () => {
  const logout = 'profile-logout-btn';
  it('1º verifica se o localStorage é chamado', () => {
    // Falta implementar
  });

  it('2º verificar se o e-mail salvo no localStorage é renderizado na tela', async () => {
    // Falta terminar

    const { history } = renderWithRouter(
      <HeaderProvider>
        <MealsProvider>
          <DrinksProvider>
            <App />
          </DrinksProvider>
        </MealsProvider>
      </HeaderProvider>,
    );

    const email = screen.getByTestId('email-input');
    const password = screen.getByTestId('password-input');
    const loginSubmit = screen.getByTestId('login-submit-btn');

    await waitFor(async () => {
      userEvent.type(email, 'grupo-14-A@trybe.com');
    });

    await waitFor(async () => {
      userEvent.type(password, 'grupo-14-A');
    });

    await waitFor(async () => {
      userEvent.click(loginSubmit);
    });

    act(() => {
      history.push('/profile');
    });

    const { pathname } = history.location;
    expect(pathname).toBe('/profile');

    // const emailDisplay = screen.getByTestId('profile-email');
    // expect(emailDisplay).toBeInTheDocument(emailDisplay);
  });

  it('3º verifica se existem 3 botões na tela', () => {
    renderWithRouter(
      <HeaderProvider>
        <MealsProvider>
          <DrinksProvider>
            <Profile />
          </DrinksProvider>
        </MealsProvider>
      </HeaderProvider>,
    );

    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(3);
  });
  it('4º verifica se existem o botão na tela Done Recipes', () => {
    renderWithRouter(
      <HeaderProvider>
        <MealsProvider>
          <DrinksProvider>
            <Profile />
          </DrinksProvider>
        </MealsProvider>
      </HeaderProvider>,
    );

    const profileButton = screen.getByTestId('profile-done-btn');
    expect(profileButton).toBeInTheDocument();
  });
  it('5º verifica se ao clicar no botão Done Recipes redireciona para receitas feitas', () => {
    const { history } = renderWithRouter(
      <HeaderProvider>
        <MealsProvider>
          <DrinksProvider>
            <Profile />
          </DrinksProvider>
        </MealsProvider>
      </HeaderProvider>,
    );

    const profileButton = screen.getByTestId('profile-done-btn');
    expect(profileButton).toBeInTheDocument();

    userEvent.click(profileButton);

    const { pathname } = history.location;
    expect(pathname).toBe('/done-recipes');
  });
  it('6º verifica se existem o botão na tela Favorite Recipes', () => {
    renderWithRouter(
      <HeaderProvider>
        <MealsProvider>
          <DrinksProvider>
            <Profile />
          </DrinksProvider>
        </MealsProvider>
      </HeaderProvider>,
    );

    const favoriteButton = screen.getByTestId('profile-favorite-btn');
    expect(favoriteButton).toBeInTheDocument();
  });
  it('7º verifica se ao clicar no botão Favorite Recipes redireciona para receitas favoritas', () => {
    const { history } = renderWithRouter(
      <HeaderProvider>
        <MealsProvider>
          <DrinksProvider>
            <Profile />
          </DrinksProvider>
        </MealsProvider>
      </HeaderProvider>,
    );

    const favoriteButton = screen.getByTestId('profile-favorite-btn');
    expect(favoriteButton).toBeInTheDocument();

    userEvent.click(favoriteButton);

    const { pathname } = history.location;
    expect(pathname).toBe('/favorite-recipes');
  });
  it('8º verifica se existem o botão na tela Logout', () => {
    renderWithRouter(
      <HeaderProvider>
        <MealsProvider>
          <DrinksProvider>
            <Profile />
          </DrinksProvider>
        </MealsProvider>
      </HeaderProvider>,
    );

    const logoutButton = screen.getByTestId(logout);
    expect(logoutButton).toBeInTheDocument();
  });
  it('9º verifica se ao clicar no botão Logout redireciona para tela de login', () => {
    const { history } = renderWithRouter(
      <HeaderProvider>
        <MealsProvider>
          <DrinksProvider>
            <Profile />
          </DrinksProvider>
        </MealsProvider>
      </HeaderProvider>,
    );

    const logoutBtn = screen.getByTestId(logout);
    // expect(button).toBeInTheDocument();

    userEvent.click(logoutBtn);

    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });
  it('10º verifica se o localStorage está vazio', () => {
    // falta implementar
  });
  it('', () => {
    const { history } = renderWithRouter(
      <HeaderProvider>
        <MealsProvider>
          <DrinksProvider>
            <Profile />
          </DrinksProvider>
        </MealsProvider>
      </HeaderProvider>,
    );

    const logoutButton = screen.getByTestId(logout);
    // expect(button).toBeInTheDocument();

    userEvent.click(logoutButton);

    const clearSpy = jest.spyOn(Object.getPrototypeOf(window.localStorage), 'clear');
    expect(clearSpy).toHaveBeenCalled();
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });
});

/* Código desenvolvido Junior Gomes */
