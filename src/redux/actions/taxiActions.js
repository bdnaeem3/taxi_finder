import axios from 'axios';
import { TAXI_SEARCH } from '../types/types';


export const taxiListAction = (dispatch) => {
  return axios.get('taxi.json')
    .then(response=>{
      dispatch({
        type: TAXI_SEARCH,
        data: response.data.taxis
      })
    })
    .catch(() => {
      dispatch({
        type: TAXI_SEARCH,
        data: []
      })
    });
}