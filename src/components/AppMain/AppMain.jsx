import React from 'react';
import { connect } from 'react-redux'
import Loader from '../Loader/Loader'
import JobList from './JobList/JobList'
import welcome from '../img/welcome.png'
import './JobList/Joblist.css'

const  AppMain = (props) => {
  const { jobItemsData, isFetching, noResult } = props;
  return (
    <div className="main">
    {jobItemsData.length === 0 && noResult && !isFetching ? <h4>По данному запросу ничего не найдено.</h4> : false}
    {jobItemsData.length === 0 && !isFetching ? <img className="welcome-img" src={welcome} alt="Фоновое изображение" /> : false }
    {isFetching ? <Loader /> : <JobList jobItemsData={jobItemsData} />}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    jobItemsData: state.jobItemsData,
    isFetching: state.isFetching,
    noResult: state.noResult
  }
}

export default connect(mapStateToProps, null)(AppMain);
