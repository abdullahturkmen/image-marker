import React, {useRef, useState, useEffect} from 'react'

const CropDot = props => {

    const cropDotCanvas = useRef(null)
    let imgLeft
    let imgTop


    useEffect(() => {

        const canvas = cropDotCanvas.current
        const context = canvas.getContext('2d')
        const image = new Image();
        image.src = props.img['img'];

        image.onload = function () {
            imgLeft = this.width / 100 * props.details.dotX
            imgTop = this.height / 100 * props.details.dotY
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.fillStyle = "white";
            context.fillRect(0, 0, canvas.width, canvas.height);
            context.drawImage(image, imgLeft - 50, imgTop - 50, 100, 100, 0, 0, 50, 50);
        }


    }, [props])


    const croppedImgClick = (e) => {
        props.cropDotCallback(e)
    }


    const handleCanvasMouseEnter = () => {
        props.cropDotMouseEnterCallback(props.details)
    }

    const handleCanvasMouseLeave = () => {
        props.cropDotMouseLeaveCallback(props.details)
    }


    return (
        <>
            <div onClick={
                () => croppedImgClick(props.details)
            }>
                <canvas onMouseEnter={handleCanvasMouseEnter}
                    onMouseLeave={handleCanvasMouseLeave}
                    ref={cropDotCanvas}
                    width="50px"
                    height="50px"/>
            </div>
        </>
    )
}

export default CropDot
