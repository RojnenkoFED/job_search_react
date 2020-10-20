import React from 'react';
import JobList from '../AppMain/AppMain';

const AppFavorite = (props) => {
  
  const { localStorageData } = props

  return (
    <div id="fav">
      <div className="fav-title">
        <h3>Вы отметили это</h3>
      </div>
      <JobList id="fav-jobs" localStorageData={localStorageData} />
    </div>
  )
}

export default AppFavorite;
