import React, {useRef, useEffect} from 'react'

const CropDot = props => {

    const canvasRef = useRef(null)
    var imgLeft
    var imgTop


    useEffect(() => {
        console.log("detailssss : ", props.details)
        const canvas = canvasRef.current
        const context = canvas.getContext('2d')

        const image = new Image();
        image.src = props.img;


        image.onload = function () { // 1200/100*50
            imgLeft = this.width / 100 * props.details.dotX
            imgTop = this.height / 100 * props.details.dotY

            context.clearRect(0, 0, canvas.width, canvas.height);
            context.drawImage(image, imgLeft - 50, imgTop - 50, 100, 100, 0, 0, 50, 50);
        }


    }, [props])

    return <canvas ref={canvasRef}
        width="50px"
        height="50px"/>
}

export default CropDot
