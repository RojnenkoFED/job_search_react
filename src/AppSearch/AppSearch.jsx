import React from 'react'

// AppSearch START

class AppSearch extends React.Component {

  constructor(props) {
    super(props);
    //this.currentPage = 1;
    this.state = {
      description: '',
      location: '',
      fullTime: '',
      disabledPre: true,
      disabledNext: true,
      currentPage: 1
    };
  }

  render() {
    const { description, location} = this.state;

    return (
      <div className="search-line">
        <div className="search-input-wrap">
          <form onSubmit={this.handleSubmit}>
            <input className="search-input" placeholder="Введите описание вакансии" onChange={this.onDescriptionInputChange} value={description} />
            <input className="search-input" placeholder="Введите местоположение" onChange={this.onLocationInputChange} value={location} />
            <label className="busy-label">
              <input className="busy-input" type="checkbox" onClick={this.handleClick} /> Full time
            </label>
            <input type="submit" value="Отправить" hidden/>
            <button class="btn btn-dark" onClick={this.previousPage} hidden={this.state.disabledPre}>Назад</button>
            <button class="btn btn-dark" onClick={this.nextPage}  hidden={this.state.disabledNext}>Вперед</button>
          </form> 
        </div>
      </div>
    );
  }

  nextPage = (e) => {
    const { description, location, fullTime, currentPage } = this.state;
    e.preventDefault();
    //this.currentPage += 1;
    this.props.setIsFetching(true);
    this.setState({ disabledNext: true});
    this.fetchData(description, location, currentPage + 1, fullTime);

    if ( this.props.jobItemsData.lenght < 50 ) {
      this.setState({ disabledNext: true});
    } 
    this.setState({ disabledPre: false});
  }

  previousPage = (e) => {
    const { description, location, fullTime, currentPage } = this.state;
    e.preventDefault();
    //this.currentPage -= 1;
    this.props.setIsFetching(true);
    this.fetchData(description, location, currentPage - 1, fullTime);

    if (currentPage === 1) {
      this.setState({ disabledPre: true});
    }       
    this.setState({ disabledNext: false});
  }

  async fetchData(descriptionValue, locationValue, currentPage, fulltimeValue) {
    try {
      return await fetch(`http://localhost:7000/api?description=${descriptionValue}&location=${locationValue}&page=${currentPage}&full_time=${fulltimeValue}`)
      .then(res => res.json().then(res => {
        this.props.setJobItemsData(res);

        if (res.length === 0) {
          alert(`По запросу ${descriptionValue} и ${locationValue} ничего не найдено.`);
        } else if (res.length >= 50) {
          this.setState({ disabledNext: false});
        } else {
          this.setState({ disabledNext: true});
        }
       })
      ); 
    } 
    catch (err) {
      console.log('Error:' + err);
    }
  }

  handleClick = () => {
    if ( this.state.fullTime === '' ) {
      this.setState({ fullTime: 'on' });
    }
    else {
      this.setState({ fullTime: '' });
    }
  }

  handleSubmit = (e) => {
    const { description, location, fullTime, currentPage } = this.state;
    this.setState({ disabledNext: true});
    this.setState({ disabledPre: true});
    e.preventDefault();

    if ( !description && !location ) {
      console.log('нет данных');
    } else {
      this.props.setIsFetching(true);
      this.fetchData(description, location, currentPage, fullTime);
    }
  }

  onDescriptionInputChange = (e) => {
    this.setState({ description: e.target.value });
  };
  
  onLocationInputChange = (e) => {
    this.setState({ location: e.target.value });
  };

}

export default AppSearch;

// AppSearch END
