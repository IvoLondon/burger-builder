import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import reducers from './store/reducers';

const logger = (state) => {
	return (next) => {
		return action => {
			console.log(action);
			const dispatchAction = next(action);
			console.log(store.getState());
			return dispatchAction;
		}
	}
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducers, composeEnhancers(applyMiddleware(logger)));

const app = <Provider store={store}>
				<BrowserRouter>
					<App />
				</BrowserRouter>
			</Provider>
ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
