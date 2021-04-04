// import {createStore, combineReducers, applyMiddleware, compose} from '@reduxjs/toolkit'
// import {thunk} from  '@reduxjs/toolkit';

// declare global {
//     interface Window {
//       __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
//     }
// }

// const rootReducer = combineReducers({
    
// })

// let enhancer:any;

// if (process.env.NODE_ENV === 'production') {
//     enhancer = applyMiddleware(thunk)
// } else {
//     const logger = require('redux-logger').default;
//     const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
//     enhancer = composeEnhancer(applyMiddleware(thunk, logger))
// }

// const configureStore = () => {
//     return createStore(rootReducer, enhancer)
// }

// export default configureStore

import { configureStore, getDefaultMiddleware, Action } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import {ThunkAction} from 'redux-thunk'

const store = configureStore({
  reducer: {
    
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware()
      .concat(logger)
})

//Infer the 'RootState' and 'AppDispatch' types from the store itself
export type RootState = ReturnType<typeof store.getState>

// Inferred type: {}
export type AppDispatch = typeof store.dispatch

export type Appthunk = ThunkAction<void, RootState, unknown, Action>

export default store