import React from 'react'
import JobItem from './JobItem/JobItem'
import './Joblist.css'

const JobList = (props) => {
  const { jobItemsData } = props;
  return (
    <div className="jobs-wrapper">
      <ul className="jobs">
        {jobItemsData.map((jobItemData, index) => {
          return <JobItem jobData={jobItemData} key={index} buttonState={ localStorage.getItem(jobItemData.id) != null ? true : false } />;
        })}
      </ul>
    </div>
  );
}

export default JobList;