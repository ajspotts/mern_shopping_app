import axios from 'axios';
import { GET_ITEMS, ADD_ITEM, EDIT_ITEM, UPDATE_ITEM, DELETE_ITEM, ITEMS_LOADING } from './types';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';

export const getItems = () => dispatch => {
  dispatch(itemsLoading());
  axios
    .get('/api/items')
    .then(res =>
      dispatch({
        type: GET_ITEMS,
        payload: res.data
    }))
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
    })
};

export const addItem = item => (dispatch, getState) => {
  axios
    .post('/api/items', item, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: ADD_ITEM,
        payload: res.data
      }))
      .catch(err => {
        dispatch(returnErrors(err.response.data, err.response.status));
      })
};

export const editItem = id => {
  return {
    type: EDIT_ITEM,
    payload: id
  }
};

export const updateItem = item => (dispatch, getState) => {
  axios
    .put(`/api/items/${item._id}`, item, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: UPDATE_ITEM,
        payload: { _id: res.data._id, name: res.data.name }
      }))
      .catch(err => {
        dispatch(returnErrors(err.response.data, err.response.status));
      })
      //.catch(dispatch({type: UPDATE_ITEM, payload: item}));
};

export const deleteItem = id => (dispatch, getState) => {
  axios
    .delete(`/api/items/${id}`, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: DELETE_ITEM,
        payload: id
      })
    )
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
    })
};

export const itemsLoading = () => {
  return {
    type: ITEMS_LOADING,
  }
};
