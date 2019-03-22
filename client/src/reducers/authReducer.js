import {
  USER_LOADING,
  USER_LOADED,
  LOGIN_SUCCESS,
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL
} from '../actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  isLoading: false,
  user: null
};

export default function(state = initialState, { type, payload }) {
  switch(type) {
    case USER_LOADING:
    return {
      ...state,
      isLoading: true
    };
    case USER_LOADED:
    return {
      ...state,
      isAuthenticated: true,
      isLoading: false,
      user: payload
    };
    case LOGIN_SUCCESS: 
    case REGISTER_SUCCESS:
    localStorage.setItem('token', payload.token);
    return {
      ...state,
      ...payload,
      isAuthenticated: true,
      isLoading: false
    };
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT_SUCCESS:
    case REGISTER_FAIL:
    localStorage.removeItem('token');
    return {
      ...state,
      token: null,
      user: null,
      isAuthenticated: false,
      isLoading: false
    }
    default:
    return state;
  }
};