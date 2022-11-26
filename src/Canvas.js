import React, { useRef, useState, useEffect } from 'react';


const Canvas = props => {

    const canvasRef = useRef(null);

    let imgWidth
    let imgHeight

    useEffect(() => {

        console.log("props", props)

        const canvas = canvasRef.current
        const context = canvas.getContext('2d')

        const image = new Image();
        image.src = props.img['img'];

        image.onload = function () {

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
        }

    }, [props])


    const handleCanvasClick = (event) => {
        const rect = canvasRef.current.getBoundingClientRect()
        const x = event.clientX - rect.left
        const y = event.clientY - rect.top
        props.parentCallback({ imgId: props.img.id, dotX: (x * 100 / imgWidth), dotY: (y * 100 / imgHeight) });
    }


    return (
        <>
            <div className='canvas-img'>
                <div className='canvas-container'>
                    {
                        props.dots?.length > 0 && props.dots.filter(e => e.imgId == props.img.id).map((e, index) => (
                            <div className='canvas-dot' style={{ left: `${e.dotX}%`, top: `${e.dotY}%` }} key={index} title={e.title}></div>
                        ))
                    }

                    <canvas onClick={handleCanvasClick}
                        ref={canvasRef}
                        width="600px"
                        height="600px" />
                </div>
            </div>
        </>
    )
}

export default Canvas
