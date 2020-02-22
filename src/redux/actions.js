import axios from 'axios';
import { GET_COORDINATES, GET_MASKDATA, GET_TARGETPOSITION, GET_NOWSELECTDATA } from './actionTypes';

export const getMaskData = () => (dispatch, getState) => {
  axios.get('https://raw.githubusercontent.com/kiang/pharmacies/master/json/points.json')
    .then((res) => {
      const properties = res.data.features;
      dispatch({
        type: GET_MASKDATA,
        payload: properties,
      });
    });
};

export const getCoordinates = () => async (dispatch, getState) => {
  await navigator.geolocation.getCurrentPosition((position) => {
    dispatch({
      type: GET_COORDINATES,
      payload: {
        lat: position.coords.latitude,
        lon: position.coords.longitude,
      },
    });
  });
};

export const getTargetPosition = (input) => (dispatch, getState) => {
  const api = `https://nominatim.openstreetmap.org/?q=${input}&format=json&limit=1`;
  axios.get(api)
  .then((res) => {
    console.log(res.data)
    dispatch({
      type: GET_TARGETPOSITION,
      payload:{
        lat: res.data[0].lat,
        lon: res.data[0].lon,
      },
    });
  })
};

export const getNowSelectData = (select) => ({
  type: GET_NOWSELECTDATA,
  payload: {
    select
  }
})
