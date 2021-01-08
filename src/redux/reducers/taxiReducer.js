import { TAXI_SEARCH } from '../types/types';

const initialState = {
  taxis: []
}

const taxiReducer = (state = initialState, action) => {
  switch(action.type) {
    case TAXI_SEARCH:
      return {
        ...state,
        taxis: action.data
      }
    default:
      return state
  }
}

export default taxiReducer;