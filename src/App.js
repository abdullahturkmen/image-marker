import Cropper from './cropper/Cropper';
import Products from 'demos/Products';
import { Routes, Route } from 'react-router-dom';
import React, { Component } from 'react';

function App() {
  return (
    <Routes>
      <Route exact path='/'
        element={<Cropper />} />
      <Route  path='/products'
        element={<Products />} />
    </Routes>
  );
}

export default App;