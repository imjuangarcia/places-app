export const ADD_PLACE = 'ADD_PLACE';

export const addPlace = (title) => ({
  type: ADD_PLACE,
  placeData: {
    title,
  },
});
