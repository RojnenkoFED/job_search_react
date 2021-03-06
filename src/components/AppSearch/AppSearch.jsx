import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../store/actions';
import './AppSearch.css'

class AppSearch extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      description: '',
      location: '',
      fullTime: '',
      currentPage: 1
    };
  }

  render() {
    const { description, location} = this.state;
    const { disabledPre, disabledNext} = this.props;
    return (
      <div className="search-line">
        <div className="search-input-wrap">
          <form onSubmit={this.handleSubmit}>
            <label className="busy-label">
              <input  type="checkbox" onClick={this.handleClick} /> Full time
            </label>
            <input className="search-input" placeholder="Введите описание вакансии" onChange={this.onDescriptionInputChange} value={description} />
            <input className="search-input" placeholder="Введите местоположение" onChange={this.onLocationInputChange} value={location} />
            <button className="submit-button" type="submit"><i className="fa fa-search"></i></button>
            <button className="btn btn-dark" onClick={this.previousPage} hidden={disabledPre}>Назад</button>
            <button className="btn btn-dark" onClick={this.nextPage}  hidden={disabledNext}>Вперед</button>
          </form> 
        </div>
      </div>
    );
  }

  nextPage = (e) => {
    const { description, location, fullTime, currentPage } = this.state;
    e.preventDefault();
    this.props.searchLoad(); 
    this.props.setPaginationNext(true);
    this.fetchData(description, location, currentPage + 1, fullTime);

    if ( this.props.jobItemsData.lenght < 50 ) {
      this.props.setPaginationNext(true);
    } 
    this.props.setPaginationPre(false);
  }

  previousPage = (e) => {
    const { description, location, fullTime, currentPage } = this.state;
    e.preventDefault();
    this.props.searchLoad();
    this.fetchData(description, location, currentPage - 1, fullTime);

    if (currentPage === 1) {
      this.props.setPaginationPre(true);
    }       
    this.props.setPaginationNext(false);
  }

  async fetchData(descriptionValue, locationValue, currentPage, fulltimeValue) {
    const url = 'http://localhost:7000/api?';
    try {
      return await fetch(`${url}description=${descriptionValue}&location=${locationValue}&page=${currentPage}&full_time=${fulltimeValue}`)
      .then(res => res.json().then(res => {
        this.props.searchSuccess(res);  
        
        if (res.length === 0) {
          this.props.searchNoResult();
        } else if (res.length >= 50) {
          this.props.setPaginationNext(false);
        } else {
          this.props.setPaginationNext(true);
        }
       })
      ); 
    } 
    catch (err) {
      console.log('Error: ' + err);
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
    e.preventDefault();

    if ( !description && !location ) {
      console.log('Нет данных');
      this.props.searchNoResult();
    } else {
      this.props.searchLoad();
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

const mapStateToProps = (state) => {
  return {
    disabledPre: state.disabledPre,
    disabledNext: state.disabledNext,
    jobItemsData: state.jobItemsData
  }
}


export default connect(mapStateToProps, actions)(AppSearch);

