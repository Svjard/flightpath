import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

export function createConstants(...constants) {
  console.log('createConstants', constants);

  let a = constants.reduce((acc, constant) => {
    acc[constant] = constant;
    return acc;
  }, {});

  console.log('a', a);

  return a;
}

export function createReducer(initialState, reducerMap) {
  return (state = initialState, action) => {
    const reducer = reducerMap[action.type];

    return reducer
      ? reducer(state, action.payload)
      : state;
  };
}

export function checkHttpStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    console.log('checkHttpStatus', response, response.body);
    let error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
}