import React from 'react'

import { JobItem } from './JobItem/JobItem'

export default class JobList extends React.Component {

  render () {
    const { jobItemsData = [] } = this.props;
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
  
}
