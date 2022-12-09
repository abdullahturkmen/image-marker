import Canvas from '../../components/Canvas';
import Author from 'components/Author';
import {bigImg, imgsMarks} from './data';

const Tooltip = () => {

    return (
        <div className="App demos">

            <Author/>

           
            <Canvas img={bigImg}
                dots={imgsMarks}
                type="tooltip"/>


        </div>
    );
}

export default Tooltip;
