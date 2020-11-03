import React from 'react';
import FavJobList from './FavJobList/FavJobList';

const AppFavorite = () => {
  
  let list = [];
  let keys = Object.keys(localStorage);
  for(let key of keys) {
    let object = JSON.parse(`${localStorage.getItem(key)}`);
    list.push(object);
  }
  return <FavJobList jobItemsData={list} />;
}

export default AppFavorite;
