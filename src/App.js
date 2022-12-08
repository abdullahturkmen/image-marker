import Cropper from './cropper/Cropper';
import Products from 'demos/Products';
import { Routes, Route } from 'react-router-dom';

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