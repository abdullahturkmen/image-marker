import Canvas from '../../components/Canvas';
import Author from 'components/Author';
import {bigImg, imgsMarks} from './data';

const Default = () => {

    return (
        <div className="App demos">

            <Author/>

           
            <Canvas img={bigImg}
                dots={imgsMarks}/>


        </div>
    );
}

export default Default;
