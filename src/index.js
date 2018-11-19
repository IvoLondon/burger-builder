import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk'

import burgerBuilderReducer from './store/reducers/burgerBuilderReducer';
import ordersReducer from './store/reducers/orderReducer';
import authReducer from './store/reducers/authReducer';



const reducers = combineReducers({
	burgerBuilder : burgerBuilderReducer,
	orders : ordersReducer,
	auth : authReducer,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

const app = <Provider store={store}>
				<BrowserRouter>
					<App />
				</BrowserRouter>
			</Provider>
ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
