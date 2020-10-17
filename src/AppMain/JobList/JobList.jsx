import React from 'react'

import { JobItem } from './JobItem/JobItem'

export default class JobList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {display: 'none', buttonView: false};
  }

  render () {

    const { jobItemsData = [] } = this.props

    return (
      <div className="jobs-wrapper">
        {jobItemsData.map((jobItemData, index) => {
          return (
            <JobItem jobData={jobItemData} key={index}/>
          )
        })}
        <button className="pagination" onClick={this.onMoreClick}>Показать ещё</button>
      </div>
    );
  }

  onMoreClick = () => {
    this.debounce(this.loadJobs.bind(this), 500);
    this.currentPage = 1;
  };

  toogleLoadMore(state) {
    this.setState({buttonView: !state.buttonView});
  }

}
