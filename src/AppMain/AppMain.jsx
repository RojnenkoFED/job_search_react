
import React from 'react';

import Loader from '../Loader/Loader'
import JobList from './JobList/JobList';


// AppMain START

const  AppMain = (props) => {

  const { jobItemsData = [], isFetching } = props
  
  return (
    <div className='main'>
      {isFetching ? <Loader /> : <JobList jobItemsData={jobItemsData} />}
    </div>
  );
}

export default AppMain;
// AppMain END
