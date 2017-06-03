'use strict';

import { createStore } from 'redux';

const state = {
  items: [],
  selected: null
}

const appReducer = (state = 0, action) => {
  switch (action.type) {
    case 'SET_ITEMS':
      return Object.assign({}, state, {items: action.data});
    case 'SELECTED':
      return Object.assign({}, state, {selected: action.data});
    default:
      return state
    }
}

export const store = createStore(
  appReducer, 
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);