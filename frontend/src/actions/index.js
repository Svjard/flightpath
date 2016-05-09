import { checkHttpStatus } from '../utils';
import {
  LOGIN_USER_REQUEST,
  LOGIN_USER_FAILURE,
  LOGIN_USER_SUCCESS,
  LOGOUT_USER,
  FETCH_PROTECTED_DATA_REQUEST,
  RECEIVE_PROTECTED_DATA
} from '../constants';
import { pushState } from 'redux-router';
import Promise from 'bluebird';
import superAgent from 'superagent';
import superAgentPromise from 'superagent-promise';

const agent = superAgentPromise(superAgent, Promise);

export function loginUserSuccess(account) {
  console.log('loginUserSuccess', account, LOGIN_USER_SUCCESS);
  return {
    type: LOGIN_USER_SUCCESS,
    payload: {
      account: account
    }
  };
}

export function loginUserFailure(error) {
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
    
    let formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    
    return agent.
      post('http://127.0.0.1:8000/api/v1/auth/login/')
      .send(formData)
      .end()
      .then(checkHttpStatus)
      .then(response => {
        console.log('call LOGIN_USER_SUCCESS', response.body.account);
        dispatch(loginUserSuccess(response.body.account));
        dispatch(pushState(null, redirect));
      })
      .catch(error => {
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