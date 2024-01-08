export const UseGetItem = (key) => JSON.parse(localStorage.getItem(key));

export const UseSetItem = (key, value) => {
  localStorage
    .setItem(key, JSON.stringify(value));
};

export const getType = (locationPathname) => (
  locationPathname.includes('meals') ? 'meals' : 'drinks'
);
