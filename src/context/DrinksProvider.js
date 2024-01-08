import { useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import DrinksContext from './DrinksContext';

export default function DrinksProvider({ children }) {
  const [apiDrinksNameData, setApiDrinksNameData] = useState(undefined);
  const [apiDrinksCategoryData, setApiDrinksCategoryData] = useState(undefined);

  useEffect(() => {
    const apiDrinksNameCall = async () => {
      const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
      const response = await fetch(url);
      const { drinks } = await response.json();
      setApiDrinksNameData(drinks);
    };
    const apiDrinksCategoryCall = async () => {
      const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
      const response = await fetch(url);
      const { drinks } = await response.json();
      setApiDrinksCategoryData(drinks);
    };
    apiDrinksNameCall(); apiDrinksCategoryCall();
  }, []);

  const value = useMemo(
    () => ({
      apiDrinksNameData,
      apiDrinksCategoryData,
    }),
    [apiDrinksNameData, apiDrinksCategoryData],
  );

  return (
    <DrinksContext.Provider value={ value }>
      { children }
    </DrinksContext.Provider>
  );
}

DrinksProvider.propTypes = {
  children: PropTypes.node,
}.isRequired;
