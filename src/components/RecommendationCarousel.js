import PropTypes from 'prop-types';
// import { useState } from 'react';
import '../styles/recommendationCarousel.css';

function RecommendationCarousel({ recommendations = [] }) {
  // const [position, setposition] = useState(0);

  // const handleClickToBack = () => {
  //   setposition(position - 2);
  // };

  // const handleClickNext = () => {
  //   setposition(position + 2);
  // };

  return (
    <div className="carousel">
      {/* <button
        onClick={ handleClickToBack }
        disabled={ position === 0 }
      >
        Back
      </button> */}
      <div
        className="carousel-card"
      >
        {recommendations.map((eachRecom, index) => (
          <div
            className="recommendation-cards"
            key={ eachRecom.idMeal ?? eachRecom.idDrink }
            data-testid={ `${index}-recommendation-card` }
          >
            <img
              src={ eachRecom.strMealThumb ?? eachRecom.strDrinkThumb }
              alt={ eachRecom.strMeal ?? eachRecom.strDrink }
            />
            <h3
              data-testid={ `${index}-recommendation-title` }
            >
              {eachRecom.strMeal ?? eachRecom.strDrink}
            </h3>
          </div>
        ))}
      </div>
      {/* <button
        onClick={ handleClickNext }
        disabled={ position >= recommendations.length - 2 }
      >
        Next
      </button> */}
    </div>
  );
}

RecommendationCarousel.propTypes = {
  recommendations: PropTypes.arrayOf(
    PropTypes.shape({
      idMeal: PropTypes.string,
      idDrink: PropTypes.string,
      strMealThumb: PropTypes.string,
      strDrinkThumb: PropTypes.string,
      strMeal: PropTypes.string,
      strDrink: PropTypes.string,
    }),
  ),
};

export default RecommendationCarousel;

// {recommendations.slice(position, position + 2).map((eachRecom, index) => (
//   <div
//     key={ eachRecom.idMeal ?? eachRecom.idDrink }
//     data-testid={ `${index}-recommendation-card` }
//   >
//     <img
//       src={ eachRecom.strMealThumb ?? eachRecom.strDrinkThumb }
//       alt={ eachRecom.strMeal ?? eachRecom.strDrink }
//     />
//     <h3
//       data-testid={ `${index}-recommendation-title` }
//     >
//       {eachRecom.strMeal ?? eachRecom.strDrink}
//     </h3>
//   </div>
// ))}
