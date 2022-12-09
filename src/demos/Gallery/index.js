import Canvas from '../../components/Canvas';
import Author from 'components/Author';
import {bigImg, imgsMarks} from './data';

const Gallery = () => {

    return (
        <div className="App demos">

            <Author/>


            <Canvas img={bigImg}
                dots={imgsMarks}
                gallery={true}
                />


        </div>
    );
}

export default Gallery;
