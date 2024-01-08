import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import Login from '../pages/Login';

describe('Login', () => {
  it('desativa o botão quando o e-mail e a senha forem inválidos', () => {
    render(<Login />);
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const button = screen.getByTestId('login-submit-btn');

    expect(button).toBeDisabled();

    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.change(passwordInput, { target: { value: '123' } });

    expect(button).toBeDisabled();
  });

  it('ativa o botão quando o e-mail e a senha forem válidos', () => {
    render(<Login />);

    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const button = screen.getByTestId('login-submit-btn');

    expect(button).toBeDisabled();

    fireEvent.change(emailInput, { target: { value: 'valid-email@example.com' } });
    fireEvent.change(passwordInput, { target: { value: '12345678' } });

    expect(button).toBeEnabled();
    // screen.logTestingPlaygroundURL();
  });

  it('se redireciona para a rota /meals ao cliccar no botao', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <Login />
      </Router>,
    );

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/senha/i);
    const loginButton = screen.getByRole('button', { name: /entrar/i });

    fireEvent.change(emailInput, { target: { value: 'test@test.com' } });
    fireEvent.change(passwordInput, { target: { value: '12345678' } });
    fireEvent.click(loginButton);

    expect(history.location.pathname).toBe('/meals');
    screen.logTestingPlaygroundURL();
  });
});
