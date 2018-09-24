
import { compose, createStore, applyMiddleware } from 'redux'  
import createSagaMiddleware from 'redux-saga'


import logger from 'redux-logger'
 

// import {ActionSaga} from '../actionSaga';
import rootSaga from "sagas";

import reducers from 'reducers' // Or wherever you keep your reducers
import createHistory from 'history/createBrowserHistory';

// import { createBrowserHistory } from 'history'

export const history = createHistory()
// Saga Middleware
const sagaMiddleware = createSagaMiddleware()


// Build the middleware for intercepting and dispatching navigation actions



let enhancers = null
if (process.env.NODE_ENV === 'production') {
  enhancers = compose(
    applyMiddleware( sagaMiddleware)
  );
} else {
  enhancers = compose(
    applyMiddleware(sagaMiddleware, logger),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  );
}


// const action = type => store.dispatch({type})
// Add the reducer to your store on the `router` key
// Also apply our middleware for navigating
const store = createStore(
    reducers,
    enhancers
)
sagaMiddleware.run(rootSaga)

export default store;