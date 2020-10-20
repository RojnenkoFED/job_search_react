import React from 'react';
import loader from '../img/loader.gif';

function Loader() {
  return (
    <div>
      <img className="loader" alt="Загрузка" src={loader} />
    </div>
  );
}

export default Loader;