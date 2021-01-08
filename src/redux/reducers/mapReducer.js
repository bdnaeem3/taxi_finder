import { CITY_LIST } from '../types/types';

const initialState = {
  cities: []
}

const mapReducer = (state = initialState, action) => {
  switch(action.type) {
    case CITY_LIST:
      return {
        ...state,
        cities: action.data
      }
    default:
      return state
  }
}

export default mapReducer;