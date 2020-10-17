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
    }
  }


  setJobItemsData = (res) => {
    this.setState({jobItemsData:res})
  }

  onFavoriteClick = () => {
    if (this.state.isMainView) {
      this.setState({ isMainView: false })
    }
  }

  onMainButtonClick = () => {
    if (!this.state.isMainView) {
      this.setState({ isMainView: true })
    }
  }

  render() {
    return (
      <div id="app">
        {console.log(this.state)}
        <div className="header sticky-top">
          <div className="header-section">
            <h1>
              <a id="title-text" href="#" onClick={this.onMainButtonClick}>Job Search </a>
              {console.log(this.state)}
            </h1>
            <div className="favorites">
              <button id="fav-btn" onClick={this.onFavoriteClick}>Избранное</button>
            </div>
          </div>
        </div>
        <AppSearch setJobItemsData={this.setJobItemsData}/>
        {this.state.isMainView && <AppMain jobItemsData={this.state.jobItemsData}/>}
        {!this.state.isMainView && <AppFavorite/>}
        {console.log(this.state)}
      </div>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('root'))

