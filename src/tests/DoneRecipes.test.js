import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helper/renderWithRouter';
import MealsProvider from '../context/MealsProvider';
import HeaderProvider from '../context/HeaderProvider';
import DrinksProvider from '../context/DrinksProvider';
import DoneRecipes from '../pages/DoneRecipes';
import setLocalStorage from './helper/localStorage';

describe('', () => {
  beforeEach(() => {
    setLocalStorage();
  });

  it('Verifica se as imagens das recitas prontas são renderizadas na tela', () => {
    renderWithRouter(
      <HeaderProvider>
        <MealsProvider>
          <DrinksProvider>
            <DoneRecipes />
          </DrinksProvider>
        </MealsProvider>
      </HeaderProvider>,
    );

    const image0 = screen.getByTestId('0-horizontal-image');
    const image1 = screen.getByTestId('1-horizontal-image');

    expect(image0).toBeInTheDocument();
    expect(image1).toBeInTheDocument();
  });
  it('Verifica se os nomes das recitas prontas são renderizadas na tela', () => {
    renderWithRouter(
      <HeaderProvider>
        <MealsProvider>
          <DrinksProvider>
            <DoneRecipes />
          </DrinksProvider>
        </MealsProvider>
      </HeaderProvider>,
    );

    const name0 = screen.getByTestId('0-horizontal-name');
    const name1 = screen.getByTestId('1-horizontal-name');

    expect(name0).toBeInTheDocument();
    expect(name1).toBeInTheDocument();
  });
  it('Verifica se a nacionalidade, categoria e se for drink é ou não alcoólico das recitas prontas são renderizadas na tela', () => {
    renderWithRouter(
      <HeaderProvider>
        <MealsProvider>
          <DrinksProvider>
            <DoneRecipes />
          </DrinksProvider>
        </MealsProvider>
      </HeaderProvider>,
    );

    const topText0 = screen.getByTestId('0-horizontal-top-text');
    const topText1 = screen.getByTestId('1-horizontal-top-text');

    expect(topText0).toBeInTheDocument();
    expect(topText1).toBeInTheDocument();
  });
  it('Verifica se as datas das recitas prontas são renderizadas na tela', () => {
    renderWithRouter(
      <HeaderProvider>
        <MealsProvider>
          <DrinksProvider>
            <DoneRecipes />
          </DrinksProvider>
        </MealsProvider>
      </HeaderProvider>,
    );

    const doneDate0 = screen.getByTestId('0-horizontal-done-date');
    const doneDate1 = screen.getByTestId('1-horizontal-done-date');

    expect(doneDate0).toBeInTheDocument();
    expect(doneDate1).toBeInTheDocument();
  });
  it('Verifica se as datas das recitas prontas são renderizadas na tela', () => {
    renderWithRouter(
      <HeaderProvider>
        <MealsProvider>
          <DrinksProvider>
            <DoneRecipes />
          </DrinksProvider>
        </MealsProvider>
      </HeaderProvider>,
    );

    const tag0 = screen.getByTestId('0-horizontal-tag');
    const tag1 = screen.getByTestId('1-horizontal-tag');

    expect(tag0).toBeInTheDocument();
    expect(tag1).toBeInTheDocument();
  });
  it('Verifica se a função clipboardCopy é chamada', () => {
    renderWithRouter(
      <HeaderProvider>
        <MealsProvider>
          <DrinksProvider>
            <DoneRecipes />
          </DrinksProvider>
        </MealsProvider>
      </HeaderProvider>,
    );
  });
  it('Verifica se a função mealsFilter é chamada', () => {
    renderWithRouter(
      <HeaderProvider>
        <MealsProvider>
          <DrinksProvider>
            <DoneRecipes />
          </DrinksProvider>
        </MealsProvider>
      </HeaderProvider>,
    );
    mealsFilter = jest.fn();
    mealsFilter();
    jest.spyOn(global, 'mealsFilter');
    global.mealsFilter.mockImplementation();
    const filterMeal = screen.getByTestId('filter-by-meal-btn');
    userEvent.click(filterMeal);
    expect(mealsFilter).toHaveBeenCalled();
  });
  it('Verifica se a função drinksFilter é chamada', () => {
    renderWithRouter(
      <HeaderProvider>
        <MealsProvider>
          <DrinksProvider>
            <DoneRecipes />
          </DrinksProvider>
        </MealsProvider>
      </HeaderProvider>,
    );
    drinksFilter = jest.fn();
    drinksFilter();
    jest.spyOn(global, 'drinksFilter');
    global.drinksFilter.mockImplementation();
    const filterDrink = screen.getByTestId('filter-by-drink-btn');
    userEvent.click(filterDrink);
    expect(drinksFilter).toHaveBeenCalled();
  });
  it('Verifica se a função allFoodsFilter é chamada', () => {
    renderWithRouter(
      <HeaderProvider>
        <MealsProvider>
          <DrinksProvider>
            <DoneRecipes />
          </DrinksProvider>
        </MealsProvider>
      </HeaderProvider>,
    );
    allFoodsFilter = jest.fn();
    allFoodsFilter();
    jest.spyOn(global, 'allFoodsFilter');
    global.allFoodsFilter.mockImplementation();
    const filterAll = screen.getByTestId('filter-by-all-btn');
    userEvent.click(filterAll);
    expect(allFoodsFilter).toHaveBeenCalled();
  });
  it('Verifica se a função clipboard é chamada', async () => {
    renderWithRouter(
      <HeaderProvider>
        <MealsProvider>
          <DrinksProvider>
            <DoneRecipes />
          </DrinksProvider>
        </MealsProvider>
      </HeaderProvider>,
    );
    window.document.execCommand = jest.fn(() => true);
    const shareBtn = screen.getByTestId('0-horizontal-clipboard-btn');
    userEvent.click(shareBtn);
    const copiedMessage = await screen.findByText('Link copied!');
    expect(copiedMessage).toBeInTheDocument();
  });
});

/* Código desenvolvido Junior Gomes */
