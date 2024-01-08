import { useEffect, useState, useContext } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import HeaderContext from '../context/HeaderContext';
import { FaHeart } from "react-icons/fa";
import '../styles/favoriteRecipes.css';

function FavoriteRecipes() {
  const [allFavoriteRecipes, setAllFavoriteRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const { isFavorite, setIsFavorite } = useContext(HeaderContext);
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
      if (Array.isArray(favoriteRecipes)) {
        setAllFavoriteRecipes(favoriteRecipes);
      }
    };

    fetchData();
  }, []); 


  useEffect(() => {
    if (filteredRecipes.length === 0) {
      renderAllCards();
    } else {
      renderFilteredRecipes();
    }
  }, [filteredRecipes]);
  
  

  const handleFavorite = (id) => {
    // Remove o item de allFavoriteRecipes
    const updatedRecipes = allFavoriteRecipes.filter((recipe) => recipe.id !== id);
    setAllFavoriteRecipes(updatedRecipes);
  
    // Remove o item de filteredRecipes, se estiver presente
    const updatedFilteredRecipes = filteredRecipes.filter((recipe) => recipe.id !== id);
    setFilteredRecipes(updatedFilteredRecipes);
  
    // Atualiza o armazenamento local
    const updatedStorage = updatedFilteredRecipes.length > 0 ? updatedFilteredRecipes : updatedRecipes;
    localStorage.setItem('favoriteRecipes', JSON.stringify(updatedStorage));
  };

  const mealsFilter = () => {
    const meals = allFavoriteRecipes.filter((recipe) => recipe.type === 'meal');
    setFilteredRecipes(meals);
  };

  const drinksFilter = () => {
    const drinks = allFavoriteRecipes.filter((recipe) => recipe.type === 'drink');
    setFilteredRecipes(drinks);
  };


function renderFilteredRecipes() {
  return filteredRecipes.map((item) =>
    item.type === 'drink' ? (
      <div key={item.id} className="eachFavoritecard">
        <img
          onClick={() => history.push(`${location.pathname}/${item.idDrink}`)}
          className="eachFavoriteRecipe"
          src={item.image}
          alt={item.strDrink}
        />
        <p>{item.strDrink}</p>
      </div>
    ) : (
      <div key={item.id} className="eachFavoritecard">
        <img
          onClick={() => history.push(`${location.pathname}/${item.idMeal}`)}
          src={item.image}
          alt={item.strMeal}
        />
        <p>{item.strMeal}</p>
      </div>
    )
  );
}

  function renderAllCards() {
    return allFavoriteRecipes.map((item) => 
      <div key={item.id} className="eachFavoritecard">  
        <img
          onClick={() => history.push(`${location.pathname}/${item.idDrink || item.idMeal}`)}
          className="eachFavoriteRecipe"
          src={item.image}
          alt={item.name}
        />
        <p>{item.name}</p>
      </div>
    );
  }

  return (
    <body className="favorites-container">
      <nav className="tilte-container">
        <h1 className="myFavorites-title">My Favorites</h1>
        <div className="favorite-category-btn-container">
          <button
            type="button"
            name="all"
            className="eachFavoriteCategory-btn"
            value="all"
            onClick={ () => setFilteredRecipes([]) }
          >
            All
          </button>
          <button
            type="button"
            name="meal"
            className="eachFavoriteCategory-btn"
            onClick={ () => mealsFilter() }
          >
            Meals
          </button>
          <button
            type="button"
            className="eachFavoriteCategory-btn"
            onClick={ () => drinksFilter() }
          >
            Drinks
          </button>
        </div>
      </nav>
  
        <section className="favorite-cards-container">
          {filteredRecipes.length > 0
            ? filteredRecipes.map((recipe) => (
                <div key={recipe.id} className="eachFavoritecard">
                  <div className="heart-btn-container">
                    <button
                      className="heart-btn"
                      onClick={() => handleFavorite(recipe.id)}
                    >
                      {isFavorite ? (
                        <FaHeart
                          style={{
                            height: '17px',
                            width: '17px',
                            color: "#af1d3d",
                            backgroundColor: '#dbe2ec00',
                            padding: '0px',
                            margin: '2px',
                          }}
                        />
                      ) : (
                        <FaHeart
                          style={{
                            height: '17px',
                            width: '17px',
                            color: "#969ba1f1",
                            backgroundColor: '#dbe2ec00',
                            padding: '0px',
                            margin: '2px',
                          }}
                        />
                      )}
                    </button>
                  </div>
                  <img
                    onClick={() => history.push(`${location.pathname}/${recipe.idDrink || recipe.idMeal}`)}
                    className="eachFavoriteRecipe"
                    src={recipe.image}
                    alt={recipe.strDrink || recipe.strMeal}
                  />
                  <p>{recipe.name || recipe.strMeal}</p>
                </div>
              ))
            : allFavoriteRecipes.map((recipe) => (
                <div key={recipe.id} className="eachFavoritecard">
                  <div className="heart-btn-container">
                    <button
                      className="heart-btn"
                      onClick={() => handleFavorite(recipe.id)}
                    >
                      {isFavorite ? (
                        <FaHeart
                          style={{
                            height: '17px',
                            width: '17px',
                            color: "#af1d3d",
                            backgroundColor: '#dbe2ec00',
                            padding: '0px',
                            margin: '2px',
                          }}
                        />
                      ) : (
                        <FaHeart
                          style={{
                            height: '17px',
                            width: '17px',
                            color: "#969ba1f1",
                            backgroundColor: '#dbe2ec00',
                            padding: '0px',
                            margin: '2px',
                          }}
                        />
                      )}
                    </button>
                  </div>
                  <img
                    onClick={() => history.push(`${location.pathname}/${recipe.idDrink || recipe.idMeal}`)}
                    className="eachFavoriteRecipe"
                    src={recipe.image}
                    alt={recipe.strDrink || recipe.strMeal}
                  />
                  <p>{recipe.name || recipe.strMeal}</p>
                </div>
              ))}
        </section>

    </body>
  );
}

export default FavoriteRecipes;


// *estados*
// ALL:
// sempre populado  atualizado (pag, remoção, add))
// toggle (ao clicar btn all, limpa estado FILTRADOS)

// FILTRADOS:
// atualizado (pag, remoção, add)
// ao clicar: limpa FILTRADOS => popula com meals/drinks (ver tempo)

// *renderização*
// condição: FILTRADOS ? renderiza FILTRADOS : renderiza ALL

// *handleFavorite*
// remoção/add dentro de FILTRADOS atualizar ALL e refazer o map dos FILTRADOS