
import React from 'react';

// AppSearch START

class AppSearch extends React.Component {

  constructor(props) {
    super(props);
    this.currentPage = 1;
    this.state = {
      description: '',
      location: '',
      fullTime: false
    };
  }

  render() {
    return (
      <div className="search-line">
        <div className="search-input-wrap">
          <input className="search-input" placeholder="Введите описание вакансии" onKeyUp={this.inputKeyUp} value={this.description} />
          <input className="search-input" placeholder="Введите местоположение" onKeyUp={this.inputKeyUp} value={this.location} />
          <label className="busy-label">
            <input className="busy-input" type="checkbox" onClick={this.handleClick} /> Full time
          </label>
        </div>
      </div>
    );
  }

  setCurrentPage(pageNumber) {
    this.currentPage = pageNumber;
  };

  handleClick = () => {
    this.setState({fullTime: !this.state.fullTime});
  }

  inputKeyUp = (e) => {
    //this.setState({ description: e.target.value });
    this.debounce(this.loadJobs, 500);
  };

  clearJobs() {
    this.view.jobsList.innerHTML ='';
  }

  loadJobs = (props) => {
    const descriptionValue = this.description;
    const locationValue = this.location;
    
    this.setCurrentPage(1);
    const fulltime = document.querySelector('input[type=checkbox]');
    var fulltimeValue = '';
    if (fulltime.checked) {
      fulltimeValue = 'on';
    } 
    if (descriptionValue && locationValue){
        this.clearJobs();
        //this.view.toogleLoadMore(false);
        this.jobRequest(descriptionValue, locationValue, fulltimeValue);
    } else if (locationValue) {
        this.clearJobs();
        //this.view.toogleLoadMore(false);
        this.jobRequest('', locationValue, fulltimeValue);
    } else if(descriptionValue) {
        this.clearJobs();
       // this.view.toogleLoadMore(false);
        this.jobRequest(descriptionValue, '', fulltimeValue);
    }
    else {
        this.clearJobs();
        //this.view.toogleLoadMore(false);
    }
  }
  
  debounce(func, wait, immediate) {
    let timeout;
    return function () {
      const context = this, args = arguments;
      const later = function () {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  }
};


export default AppSearch;

// AppSearch END