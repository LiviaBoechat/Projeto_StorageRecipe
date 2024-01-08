import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import HeaderProvider from './context/HeaderProvider';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import MealsProvider from './context/MealsProvider';
import DrinksProvider from './context/DrinksProvider';

ReactDOM
  .createRoot(document.getElementById('root'))
  .render(
    <BrowserRouter>
      <DrinksProvider>
        <MealsProvider>
          <HeaderProvider>
            <App />
          </HeaderProvider>
        </MealsProvider>
      </DrinksProvider>
    </BrowserRouter>,
  );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
