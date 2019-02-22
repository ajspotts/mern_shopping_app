//import uuid from 'uuid';
import { GET_ITEMS, ADD_ITEM, EDIT_ITEM, UPDATE_ITEM, DELETE_ITEM, ITEMS_LOADING } from '../actions/types';

const initialState = {
  items: [],
  item: null,
  loading: false
};

export default function(state = initialState, {type, payload}) { //deconstruct action object
  switch(type) {
      case GET_ITEMS:
      return {
        ...state,
        items: payload,
        loading: false
      }
      case ADD_ITEM:
      return {
        ...state,
        items: [payload, ...state.items],
        item: null
      }
      case EDIT_ITEM:
      return {
        ...state,
        item: state.items.find(item => item._id === payload)
      }
      case UPDATE_ITEM:
      return {
        ...state,
        items: state.items.map((obj) => obj._id === payload._id ? { ...obj, name: payload.name } : obj),
        item: null
      }
      case DELETE_ITEM:
      return {
        ...state,
        items: state.items.filter(item => item._id !== payload),
        item: null
      }
      case ITEMS_LOADING:
      return {
        ...state,
        loading: true
      }
    default:
      return state;
  }
}
