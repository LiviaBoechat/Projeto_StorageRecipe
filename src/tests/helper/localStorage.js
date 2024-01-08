const storageData = [{
  id: '17835',
  type: 'drink',
  nationality: '',
  category: 'Ordinary Drink',
  alcoholicOrNot: 'Alcoholic',
  name: 'Abilene',
  image: 'https://www.thecocktaildb.com/images/media/drink/smb2oe1582479072.jpg',
  doneDate: '23/01/2021',
  tags: [],
}, {
  id: '52771',
  type: 'meal',
  nationality: 'British',
  category: 'Dessert',
  alcoholicOrNot: 'Alcoholic',
  name: 'Carrot Cake',
  image: 'https://www.themealdb.com/images/media/meals/vrspxv1511722107.jpg',
  doneDate: '23/10/2022',
  tags: [
    'Dessert',
    'Vegetarian',
  ],
}];

const setLocalStorage = (id, data) => {
  localStorage.setItem(id, JSON.stringify(data));
};

const mockId = 'doneRecipes';
const mockJson = storageData;

setLocalStorage(mockId, mockJson);

export default setLocalStorage;
