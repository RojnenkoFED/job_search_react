import React from 'react';
import loader from '../img/loader.gif';
import './loader.css'

const Loader = () => {
  return (
    <div>
      <img className="loader" alt="Загрузка..." src={loader} />
    </div>
  );
}

export default Loader;