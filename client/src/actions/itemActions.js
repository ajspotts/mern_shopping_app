import axios from 'axios';
import { GET_ITEMS, ADD_ITEM, EDIT_ITEM, UPDATE_ITEM, DELETE_ITEM, ITEMS_LOADING } from './types';

export const getItems = () => dispatch => {
  dispatch(itemsLoading());
  axios
    .get('/api/items')
    .then(res =>
      dispatch({
        type: GET_ITEMS,
        payload: res.data
    }))
};

export const addItem = item => dispatch => {
  axios
    .post('/api/items', item)
    .then(res =>
      dispatch({
        type: ADD_ITEM,
        payload: res.data
      }))
};

export const editItem = id => {
  return {
    type: EDIT_ITEM,
    payload: id
  }
};

export const updateItem = item => dispatch => {
  axios
    .put(`/api/items/${item._id}`, item)
    .then(res =>
      dispatch({
        type: UPDATE_ITEM,
        payload: { _id: res.data._id, name: res.data.name }
      }))
      //.catch(dispatch({type: UPDATE_ITEM, payload: item}));
};

export const deleteItem = id => dispatch => {
  axios
    .delete(`/api/items/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_ITEM,
        payload: id
      })
    )
};

export const itemsLoading = () => {
  return {
    type: ITEMS_LOADING,
  }
};
