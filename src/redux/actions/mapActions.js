import axios from 'axios';
import { CITY_LIST } from '../types/types';

export const getCityListAction = (dispatch) => {
  return axios.get('map.json')
    .then(response=>{
      dispatch({
        type: CITY_LIST,
        data: response.data.cities
      })
    })
    .catch(() => {
      dispatch({
        type: CITY_LIST,
        data: []
      })
    });
}