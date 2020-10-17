
import React from 'react';

import JobList from './JobList/JobList'

import { jobItemsData } from '../utils/jobItemsData'

// AppMain START

const  AppMain = (props) => {

  const { jobItemsData = [] } = props

  return (
    <div className='main'>
      <JobList jobItemsData={jobItemsData}/>
    </div>
  );
}

export default AppMain;
// AppMain END
