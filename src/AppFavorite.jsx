import React from 'react';
import JobList from './AppMain';

const AppFavorite = (props) => {
	if (!props.status) {
    return null;
  }
  
  return (
    <div id="fav">
      <div class="fav-title">
        <h3>Вы отметили это</h3>
      </div>
      <JobList id="fav-jobs" />
    </div>
  );
	
};

export default AppFavorite;