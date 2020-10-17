import React from 'react'

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
    const { description, location, fullTime } = this.state
    const { setJobItemsData } = this.props
    return (
      <div className="search-line">
        <div className="search-input-wrap">
          <input className="search-input" placeholder="Введите описание вакансии" onChange={this.onInputChange} value={description} />
          <input className="search-input" placeholder="Введите местоположение" onChange={this.onInputChange} value={location} />
          <label className="busy-label">
            <input className="busy-input" type="checkbox" onClick={this.handleClick} /> Full time
          </label>
        </div>
      </div>
    );
  }

  // возвращает нам json, который надо мапить
  async fetchData(descriptionValue, locationValue, fulltimeValue, currentPage) {
    let response = await fetch(`http://localhost:7000/api?description=${descriptionValue}&location=${locationValue}&page=${currentPage}&full_time=${fulltimeValue}`)
      .then(res => {return res.json()})

    // console.log(response)
  }

  setCurrentPage(pageNumber) {
    this.currentPage = pageNumber;
  };

  handleClick = () => {
    this.setState({fullTime: !this.state.fullTime});
  }

  onInputChange = () => {
    console.log(this.state.description)
    this.props.setJobItemsData(this.fetchData(this.state.description, this.state.location, this.state.fullTime, '1'))
  };


  // loadJobs = (clearFnc) => {
  //   const descriptionValue = this.props.description;
  //   const locationValue = this.location;
  //
  //   this.setCurrentPage(1);
  //   const fulltime = document.querySelector('input[type=checkbox]');
  //   var fulltimeValue = '';
  //   if (fulltime.checked) {
  //     fulltimeValue = 'on';
  //   }
  //   if (descriptionValue && locationValue){
  //     clearFnc()
  //     //this.view.toogleLoadMore(false);
  //     this.jobRequest(descriptionValue, locationValue, fulltimeValue);
  //   } else if (locationValue) {
  //     clearFnc()
  //
  //     //this.view.toogleLoadMore(false);
  //     this.jobRequest('', locationValue, fulltimeValue);
  //   } else if(descriptionValue) {
  //     clearFnc()
  //     // this.view.toogleLoadMore(false);
  //     this.jobRequest(descriptionValue, '', fulltimeValue);
  //   }
  //   else {
  //     clearFnc()
  //     //this.view.toogleLoadMore(false);
  //   }
  // }
  //
  // debounce(func, wait, immediate) {
  //   let timeout;
  //   return function () {
  //     const context = this, args = arguments;
  //     const later = function () {
  //       timeout = null;
  //       if (!immediate) func.apply(context, args);
  //     };
  //     const callNow = immediate && !timeout;
  //     clearTimeout(timeout);
  //     timeout = setTimeout(later, wait);
  //     if (callNow) func.apply(context, args);
  //   };
  // }

}


export default AppSearch;

// AppSearch END
