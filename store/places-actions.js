import * as FileSystem from 'expo-file-system';
import { insertPlace, fetchPlaces } from '../helpers/db';
import ENV from '../env';

export const ADD_PLACE = 'ADD_PLACE';
export const SET_PLACES = 'SET_PLACES';

export const addPlace = (title, image, location) => async (dispatch) => {
  const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&key=${ENV.googleApiKey}`);

  if (!response.ok) {
    throw new Error('Something went wrong!');
  }

  const resData = await response.json();
  if (!resData.results) {
    throw new Error('Something went wrong!');
  }

  const address = resData.results[0].formatted_address;
  const fileName = image.split('/').pop();
  const newPath = FileSystem.documentDirectory + fileName;

  try {
    await FileSystem.moveAsync({
      from: image,
      to: newPath,
    });
    const dbResult = await insertPlace(title, newPath, address, location.lat, location.lng);
    dispatch({
      type: ADD_PLACE,
      placeData: {
        id: dbResult.insertId,
        title,
        image: newPath,
        address,
        coords: {
          lat: location.lat,
          lng: location.lng,
        },
      },
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const loadPlaces = () => async (dispatch) => {
  try {
    const dbResult = await fetchPlaces();

    dispatch({
      type: SET_PLACES,
      places: dbResult.rows._array,
    });
  } catch (error) {
    throw error;
  }
};
