import {AnyAction} from 'redux';
import * as actionSTATE from '../actions/index';

interface stateINT {
  name: string;
  price: number;
  originalPrice: number;
  img: string;
  uid: string;
  shop: {
    lat: number;
    lng: number;
    location: string;
    name: string;
  };
}

const initialState: stateINT[] = [];

export default function (state = initialState, action: AnyAction) {
  switch (action.type) {
    case actionSTATE.GET_FAVORITE:
      return [...action.payload];

    case actionSTATE.ADD_FAVORITE:
      if (state.some((a) => a.uid === action.payload.uid)) {
        return [...state];
      } else {
        return [...state, {...action.payload}];
      }

    case actionSTATE.DELETE_FAVORITE:
      const filterArray = state.filter((a) => a.uid !== action.payload);
      return filterArray;

    case actionSTATE.CLEAR_FAVORITE:
      return [];

    default:
      return state;
  }
}
