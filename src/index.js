import React from 'react'
import ReactDOM from 'react-dom'

import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { Provider } from 'react-redux'

import reducer from './components/store/SearchReducer'
import App from './components/App'
import './style.css'

const store = createStore(reducer, composeWithDevTools(applyMiddleware()));

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>, document.getElementById('root'))

