// import { useLocation } from 'react-router-dom';

// const location = useLocation();

// function fetchResults() {
//   const fetchResults = async (url) => {
//     const number12 = 12;
//     const response = await fetch(url);
//     const data = await response.json();
//     if (!data.meals && !data.drinks) {
//       global.alert('Sorry, we haven\'t found any recipes for these filters.');
//       return [];
//     }
//     return location.pathname === '/meals'
//       ? data.meals.slice(0, number12) : data.drinks.slice(0, number12);
//   };
// }

// export default fetchResults;
