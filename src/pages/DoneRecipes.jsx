/* import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import clipboardCopy from 'clipboard-copy';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import SearchBar from '../components/SearchBar';
import favoriteBtn from '../images/blackHeartIcon.svg';

function DoneRecipes() {
  const [filterRecipes, setFilterRecipes] = useState([]);
  const [status, setStatus] = useState(false);

  const allRecipes = JSON.parse(localStorage.getItem('doneRecipes'));

  const mealsFilter = () => {
    const meals = allRecipes.filter((recipe) => recipe.type === 'meal');
    setFilterRecipes(meals);
  };

  const drinksFilter = () => {
    const drinks = allRecipes.filter((recipe) => recipe.type === 'drink');
    setFilterRecipes(drinks);
  };

  const allFoodsFilter = () => {
    setFilterRecipes(allRecipes);
  };

  useEffect(() => {
    const madeRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    setFilterRecipes(madeRecipes);
  }, []);

  return (
    <section>
      <Header />
      <SearchBar />
      <nav>
        <button
          type="button"
          name="all"
          data-testid="filter-by-all-btn"
          value="all"
          onClick={ () => allFoodsFilter() }
        >
          All
        </button>
        <button
          type="button"
          name="meal"
          data-testid="filter-by-meal-btn"
          onClick={ () => mealsFilter() }
        >
          Meals
        </button>
        <button
          type="button"
          name="drink"
          data-testid="filter-by-drink-btn"
          value="drink"
          onClick={ () => drinksFilter() }
        >
          Drinks
        </button>
      </nav>
      <div>

        {filterRecipes && filterRecipes.map((recipe, index) => (
          <div key={ recipe.id }>
            <div>
              <Link to={ `/${recipe.type}s/${recipe.id}` }>
                <img
                  data-testid={ `${index}-horizontal-image` }
                  src={ recipe.image }
                  alt={ recipe.name }
                  className="img"
                  width="10"
                  height="10"
                />
              </Link>
            </div>
            <div>

              <Link to={ `/${recipe.type}s/${recipe.id}` }>
                <p
                  data-testid={ `${index}-horizontal-name` }
                >
                  {`Name: ${recipe.name}`}
                </p>
              </Link>
              {
                recipe.type === 'meal' ? (
                  <p data-testid={ `${index}-horizontal-top-text` }>
                    { `${recipe.nationality} - ${recipe.category}` }
                  </p>
                )
                  : (
                    <p data-testid={ `${index}-horizontal-top-text` }>
                      { recipe.alcoholicOrNot}
                    </p>
                  )
              }
              <p data-testid={ `${index}-horizontal-done-date` }>
                {recipe.doneDate }
              </p>
              {
                recipe.type === 'meal' && (
                  recipe.tags && recipe.tags.length > 0 && (
                    <p
                      data-testid={ `${index}-horizontal-tag` }
                    >
                      {
                        recipe.tags.map((tag, indexTag) => (
                          <span
                            key={ indexTag }
                            data-testid={ `${index}-${tag}-horizontal-tag` }
                          >
                            {tag}
                            {indexTag < recipe.tags.length - 1 && ', '}
                          </span>
                        ))
                      }
                    </p>
                  )
                )
              }
              <div>
                <button
                  data-testid={ `${index}-horizontal-clipboard-btn` }
                  type="button"
                  onClick={ () => {
                    clipboardCopy(`http://localhost:3000/${recipe.type}s/${recipe.id}`);
                    setStatus(true);
                  } }
                >
                  <img
                    data-testid={ `${index}-horizontal-share-btn` }
                    src={ shareIcon }
                    alt="share"
                  />
                </button>
                <button
                  type="button"
                  data-testid={ `${index}-horizontal-favorite-btn` }
                >
                  <img
                    src={ favoriteBtn }
                    alt="favorite"
                  />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <h4>
        {
          !status ? '' : 'Link copied!'
        }
      </h4>
    </section>
  );
}

export default DoneRecipes;

 */