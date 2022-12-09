import Canvas from '../../components/Canvas';
import Author from 'components/Author';
import {canvasList} from './data';

const MultiCanvas = () => {

    console.log("canvas list : ", canvasList)

    canvasList.map(e => {
        console.log("e map", e.bigImg)
    })

    return (
        <div className="App demos">

            <Author/> {
            canvasList ?. length > 0 && canvasList.map((e, index) => (
                <Canvas key={index}
                    img={
                        e.bigImg
                    }
                    dots={
                        e.imgsMarks
                    }/>
            ))
        } </div>
    );
}

export default MultiCanvas;
