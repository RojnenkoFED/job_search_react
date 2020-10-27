import React from 'react';

import Loader from '../Loader/Loader'
import JobList from './JobList/JobList';

const  AppMain = (props) => {

  const { jobItemsData = [], isFetching, buttonState, setButtonStyle } = props;
  return (
    <div className="main">
      {isFetching ? <Loader /> : <JobList jobItemsData={jobItemsData} buttonState={buttonState} setButtonStyle={setButtonStyle} />}
    </div>
  );

}

export default AppMain;
