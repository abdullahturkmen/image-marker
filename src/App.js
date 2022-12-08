import Cropper from './cropper/Cropper';
import Default from 'demos/Default';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route exact path='/'
        element={<Cropper />} />
      <Route  path='/default'
        element={<Default />} />
    </Routes>
  );
}

export default App;