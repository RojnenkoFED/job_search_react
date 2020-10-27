import React from 'react'
import ReactDOM from 'react-dom'

import AppSearch from './AppSearch/AppSearch'
import AppMain from './AppMain/AppMain'
import AppFavorite from './AppFavorite/AppFavorite'


import './style.css'

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      isMainView: true,
      jobItemsData: [],
      localStorageData: [],
      isFetching: false,
      disabledPre: true,
      disabledNext: true,
      isSearchView:  true
    }
  }

  setJobItemsData = (res) => {
    this.setState({ jobItemsData: res });
    this.setIsFetching(false);
  }

  setIsFetching = (state) => {
    this.setState({ isFetching: state});
  }

  setPaginationNext = (state) => {
    this.setState({ disabledNext: state });
  }
  
  setPaginationPre = (state) => {
    this.setState({ disabledPre: state });
  }

  onFavoriteClick = () => {
    if (this.state.isMainView) {
      this.setState({ isMainView: false });
      this.setState({ isSearchView: false });
    }
    this.setState({ disabledPre: true });
    this.setState({ disabledNext: true });
  }

  onMainClick = () => {
    if (!this.state.isMainView) {
      this.setState({ isMainView: true });
      this.setState({ isSearchView: true });
    } 
    this.setState({ jobItemsData: [] });
    this.setState({ disabledPre: true });
    this.setState({ disabledNext: true });
  }

  render() {
    return (
      <div>
        <div id="app">
          <div className="header sticky-top">
            <div className="header-section">
              <h1>
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid  */}
                <a id="title-text" href="#" onClick={this.onMainClick}>Job Search </a>
              </h1>
              <div className="favorites">
                <button id="fav-btn" onClick={this.onFavoriteClick}>Избранное</button>
              </div>
            </div>
          </div>
          {this.state.isSearchView && <AppSearch jobItemsData={this.state.jobItemsData} setJobItemsData={this.setJobItemsData} setIsFetching={this.setIsFetching}  disabledPre={this.state.disabledPre}  disabledNext={this.state.disabledNext} setPaginationNext={this.setPaginationNext} setPaginationPre={this.setPaginationPre} />}
          {this.state.isMainView && <AppMain jobItemsData={this.state.jobItemsData} isFetching={this.state.isFetching} />}
          {!this.state.isMainView  && <AppFavorite /> }
        </div>
        <div id="footer">
          <p>&copy; 2020 JobSearch Inc. All rights reserved.</p>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))

