import {Routes, Route} from 'react-router-dom';
import Cropper from './cropper/Cropper';
import Default from 'demos/Default';
import MultiCanvas from 'demos/MultiCanvas';
import Tooltip from 'demos/Tooltip';

function App() {
    return (
        <Routes>
            <Route exact path='/'
                element={<Cropper/>}/>
            <Route path='/default'
                element={<Default/>}/>
            <Route path='/multi-canvas'
                element={<MultiCanvas/>}/>
            <Route path='/tooltip'
                element={<Tooltip/>}/>
        </Routes>
    );
}

export default App;
