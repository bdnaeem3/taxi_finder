import axios from 'axios';
import { TAXI_SEARCH } from '../types/types';

export const searchTaxiListAction = (dispatch, formDatas) => {
  return axios.get('taxi.json')
    .then(response=>{

      // Filering with the city and type inputted by the search form
      // We could use the city and type as peremeter with API
      const filteredTaxis = response.data.taxis.filter(taxi=>{
        return !taxi.booked && taxi.available_at === formDatas.city && taxi.type === formDatas.type
      })

      dispatch({
        type: TAXI_SEARCH,
        data: filteredTaxis
      })
    })
    .catch(() => {
      dispatch({
        type: TAXI_SEARCH,
        data: []
      })
    });
}