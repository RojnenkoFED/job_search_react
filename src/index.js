import React from 'react';
import ReactDOM from 'react-dom';

import AppSearch from './AppSearch';
import AppMain from './AppMain';
import AppFavorite from './AppFavorite';

import './style.css';

class App extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {mainView: false, favView: false};
    this.handlerFav = this.handlerFav.bind(this);
  }

  handlerFav() {
    this.setState(() => ({
      favView: true, 
    }));
  }

  render() {
    return (
      <div id="app">
        <div className="header sticky-top">
          <div className="header-section"> 
            <h1>
              <a id="title-text" href="#">Job Search</a>
            </h1>
            <div className="favorites">
              <button id="fav-btn" onClick={this.handlerFav}>Избранное</button>
            </div>  
          </div>
        </div>
        <AppSearch />
        {false && <AppMain />}
        <AppFavorite status={this.state.favView} />
      </div>
    );
  }
  
};

ReactDOM.render(<App />, document.getElementById('root'));

