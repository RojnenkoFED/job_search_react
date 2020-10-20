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
      moreJob: true,
      currentPage: 1,
      localStorageData: [],
      isFetching: false
    }
  }

  setJobItemsData = (res) => {
    this.setState({ jobItemsData: res });
    this.setIsFetching(false);
  }

  setIsFetching = (state) => {
    this.setState({ isFetching: state});
  }

  onFavoriteClick = () => {
    if (this.state.isMainView) {
      this.setState({ isMainView: false });
    }
  }

  onMainClick = () => {
    if (!this.state.isMainView) {
      this.setState({ isMainView: true });
    }
  }

  componentDidMount() {
    let keys = Object.values(localStorage);
    for(let key of keys) {
      let object = JSON.parse(`${localStorage.getItem(key)}`);
      this.setState({ localStorageData: this.state.localStorageData.push(object)} );
    } 
    // console.log(list);
  }

  render() {
    return (
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
        <AppSearch jobItemsData={this.state.jobItemsData} setJobItemsData={this.setJobItemsData} setIsFetching={this.setIsFetching}/>
        {this.state.isMainView && <AppMain jobItemsData={this.state.jobItemsData} isFetching={this.state.isFetching} />}
        {!this.state.isMainView && <AppFavorite localStorageData={this.state.localStorageData} />}
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))

