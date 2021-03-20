import {AnyAction} from 'redux';
import * as actionSTATE from '../actions/index';

const initialState = {};

export default function (state = initialState, action: AnyAction) {
  switch (action.type) {
    case actionSTATE.GET_ITEM:
      return [...action.payload];

    case actionSTATE.CLEAR_ITEM:
      return [];

    default:
      return state;
  }
}
