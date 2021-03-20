import {AnyAction} from 'redux';
import * as actionSTATE from '../actions/index';

interface stateINT {
  name: string;
  price: number;
  originalPrice: number;
  img: string;
  number: number;
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
    case actionSTATE.GET_CART:
      return [...action.payload];

    case actionSTATE.ADD_CART_ITEM:
      const findIDX = state.findIndex((x) => x.uid === action.uid);
      console.log(findIDX, action.uid);
      const addArrayNew = [...state];
      if (findIDX >= 0) {
        addArrayNew[findIDX] = action.payload;
        return addArrayNew;
      } else {
        return [...state, {...action.payload}];
      }

    case actionSTATE.UPDATE_CART_ITEM:
      const resultIDX = state.findIndex((x) => x.uid === action.uidItem);
      const newArray = [...state];
      newArray[resultIDX].number = action.payload;
      return newArray;

    case actionSTATE.DELETE_CART_ITEM:
      const filterArray = state.filter((a) => a.uid !== action.payload);
      return filterArray;

    case actionSTATE.CLEAR_ITEM:
      return [];

    default:
      return state;
  }
}
