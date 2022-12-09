import React, {useRef, useEffect} from 'react';
import Marker from './Marker';
import CropDot from './CropDot';


const Canvas = props => {

    const canvasRef = useRef(null);

    let imgWidth
    let imgHeight

    useEffect(() => {

        const canvas = canvasRef.current
        const context = canvas.getContext('2d')

        const image = new Image();
        image.src = props.img['img'];

        image.onload = function () {

            console.log("canvas size : ", canvas.width)

            if (this.width > this.height) {
                imgWidth = 600
                imgHeight = 600 / (this.width / this.height)

            } else {
                imgWidth = 600 / (this.height / this.width)
                imgHeight = 600

            } canvas.width = imgWidth;
            canvas.height = imgHeight;

            context.clearRect(0, 0, canvas.width, canvas.height);
            context.drawImage(image, 0, 0, this.width, this.height, 0, 0, imgWidth, imgHeight);

            console.log("canvas size : ", canvas.width)
        }

    }, [props])


    const handleCanvasClick = (event) => {
        if (props.parentCallback) {
            const rect = canvasRef.current.getBoundingClientRect()
            const x = event.clientX - rect.left
            const y = event.clientY - rect.top
            props.parentCallback({
                imgId: props.img.id,
                dotX: (x * 100 / imgWidth),
                dotY: (y * 100 / imgHeight)
            });
        }

    }

    const handleBigImgPrevBtn = () => {
        props.prevImgCallback()
    }

    const handleBigImgNextBtn = () => {

        props.nextImgCallback()
    }

    return (
        <>
            <div className='canvas-img'>

                {
                props.gallery && (
                    <>
                        <div className='crops'>
                            {
                            props.dots ?. length > 0 && props.dots.filter(e => e.imgId == props.img.id).map((e, index) => (
                                <CropDot img={
                                        props.img
                                    }
                                    details={e}
                                    key={index}/>
                            ))
                        } </div>
                    </>
                )
            }

                {
                props.bigImgLeftNav && (
                    <button className='canvas-btn canvas-btn-prev'
                        disabled={
                            !props.bigImgLeftNav
                        }
                        onClick={handleBigImgPrevBtn}>&#8249;</button>
                )
            }

                <div className='canvas-container'>
                    {
                    props.dots ?. length > 0 && props.dots.filter(e => e.imgId === props.img.id).map((e, index) => (

                        <Marker type={
                                props.type
                            }

                            hover={
                                `${
                                    (props.croppedImgHover && e.imgId === props.croppedImgHover.imgId && e.dotX + e.dotY === props.croppedImgHover.dotX + props.croppedImgHover.dotY) ? 'hover' : ''
                                }`
                            }
                            left={
                                e.dotX
                            }
                            top={
                                e.dotY
                            }
                            key={index}
                            details={e}/>
                    ))
                }

                    <canvas onClick={handleCanvasClick}
                        ref={canvasRef}/>
                </div>

                {
                props.bigImgRightNav && (
                    <button className='canvas-btn canvas-btn-next'
                        disabled={
                            !props.bigImgRightNav
                        }
                        onClick={handleBigImgNextBtn}>&#8250;</button>
                )
            } </div>
        </>
    )
}

export default Canvas
