import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

import AppSearch from './AppSearch/AppSearch'
import AppMain from './AppMain/AppMain'
import AppFavorite from './AppFavorite/AppFavorite'

import './App.css'

const App = () => {
	return (
		<Router>
			<div id="app">
				<div className="header sticky-top">
					<div className="header-section">
						<h1>
							<Link id="title-text" to="/">Job Search </Link>
						</h1>
						<div className="favorites">
							<Link id="fav-btn" to="/fav_list">Избранное</Link>
						</div>
					</div>
				</div>
				<Route path="/" component={AppSearch} exact />
				<Route path="/" component={AppMain} exact />
				<Route path="/fav_list" component={AppFavorite} />
			</div>
			<div id="footer">
				<p>&copy; 2020 JobSearch Inc. All rights reserved.</p>
			</div>
		</Router>
	)
}

export default App;