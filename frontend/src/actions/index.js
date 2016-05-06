import { checkHttpStatus, parseJSON } from '../utils';
import {
  LOGIN_USER_REQUEST,
  LOGIN_USER_FAILURE,
  LOGIN_USER_SUCCESS,
  LOGOUT_USER,
  FETCH_PROTECTED_DATA_REQUEST,
  RECEIVE_PROTECTED_DATA
} from '../constants';
import { pushState } from 'redux-router';
import jwtDecode from 'jwt-decode';

export function loginUserSuccess(token) {
  localStorage.setItem('token', token);
  return {
    type: LOGIN_USER_SUCCESS,
    payload: {
      token: token
    }
  };
}

export function loginUserFailure(error) {
  localStorage.removeItem('token');
  return {
    type: LOGIN_USER_FAILURE,
    payload: {
      status: error.response.status,
      statusText: error.response.statusText,
      message: error.response.message
    }
  };
}

export function loginUserRequest() {
  return {
    type: LOGIN_USER_REQUEST
  };
}

export function logout() {
  localStorage.removeItem('token');
  return {
    type: LOGOUT_USER
  };
}

export function logoutAndRedirect() {
  return (dispatch, state) => {
    dispatch(logout());
    dispatch(pushState(null, '/login'));
  };
}

export function loginUser(email, password, redirect="/") {
  console.log('loginUser', email, password);

  return function(dispatch) {
    dispatch(loginUserRequest());

    console.log('loginUser 2');
    
    let fd = new FormData();
    fd.append('email', email);
    fd.append('password', password);
    
    return fetch('http://localhost:8000/api/v1/auth/login/', {
        method: 'post',
        headers: {
          'Accept': 'application/json'
        },
        body: fd
      })
      .then(checkHttpStatus)
      .then(parseJSON)
      .then(response => {
        console.log('loginUser 5', response);
        try {
          let decoded = jwtDecode(response.token);
          dispatch(loginUserSuccess(response.token));
          dispatch(pushState(null, redirect));
        } catch (e) {
          dispatch(loginUserFailure({
            response: {
              status: 403,
              statusText: 'Invalid token'
            }
          }));
        }
      })
      .catch(error => {
        console.log('DONE', error);
        dispatch(loginUserFailure(error));
      });
  };
}

export function receiveProtectedData(data) {
  return {
    type: RECEIVE_PROTECTED_DATA,
    payload: {
      data: data
    }
  };
}

export function fetchProtectedDataRequest() {
  return {
    type: FETCH_PROTECTED_DATA_REQUEST
  };
}

export function fetchProtectedData(token) {
  return (dispatch, state) => {
    dispatch(fetchProtectedDataRequest());
    return fetch('http://localhost:3000/getData/', {
        credentials: 'include',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(checkHttpStatus)
      .then(parseJSON)
      .then(response => {
        dispatch(receiveProtectedData(response.data));
      })
      .catch(error => {
        if (error.response.status === 401) {
          dispatch(loginUserFailure(error));
          dispatch(pushState(null, '/login'));
        }
      });
  };
}