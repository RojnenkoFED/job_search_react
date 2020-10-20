import React from 'react'

import { JobItem } from './JobItem/JobItem'

export default class JobList extends React.Component {

  render () {
    const { jobItemsData = [] } = this.props;
  
    return (
      <div className="jobs-wrapper">
        <ul className="jobs">
          {jobItemsData.map((jobItemData) => {
            return <JobItem jobData={jobItemData} key={jobItemsData.id}/>;
          })}
        </ul>
      </div>
    );
  }
}
