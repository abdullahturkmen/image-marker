import {useState} from 'react';
import Canvas from '../../components/Canvas';
import CropDot from '../../components/CropDot';
import Author from 'components/Author';
import {bigImg, imgsMarks} from './data';

const Products = () => {

    const [hoverCroppedImg, setHoverCroppedImg] = useState([]);

    const handleCropDotMouseEnterCallback = (childData) => {
        setHoverCroppedImg(childData)
    }

    const handleCropDotMouseLeaveCallback = (childData) => {
        setHoverCroppedImg([])
    }


    return (
        <div className="App demos">

            <Author/>

            <div className='crops'>
                {
                imgsMarks?.length > 0 && imgsMarks.filter(e => e.imgId === bigImg.id).map((e, index) => (
                    <CropDot img={bigImg}
                        details={e}
                        key={index}
                        cropDotMouseEnterCallback={
                            (x) => handleCropDotMouseEnterCallback(x)
                        }
                        cropDotMouseLeaveCallback={
                            (x) => handleCropDotMouseLeaveCallback(x)
                        }/>
                ))
            } </div>


            <Canvas img={bigImg}
                dots={imgsMarks}
                croppedImgHover={hoverCroppedImg}/>


        </div>
    );
}

export default Products;
