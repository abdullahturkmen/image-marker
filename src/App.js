import {useEffect, useState} from 'react';
import Canvas from 'Canvas';
import CropDot from 'CropDot';

const App = () => {

    const [selectedFiles, setSelectedFiles] = useState([]);
    const [selectedImgs, setSelectedImgs] = useState([]);
    const [bigImg, setBigImg] = useState(null);
    const [imgsMarks, setImgsMarks] = useState([]);
    const [selectCroppedImg, setSelectCroppedImg] = useState([]);
    const [dotTitle, setDotTitle] = useState('');
    const [dotDescription, setDotDescription] = useState('');


    useEffect(() => {

        selectedFiles.map(e => {

            var reader = new FileReader();
            reader.readAsDataURL(e);

            reader.onload = (e) => {
                var image = new Image();
                image.src = e.target.result;
                // console.log("img details : ", e.target.fileName)
                image.onload = function () { // console.log("details : ", this.width)

                };
            }
            selectedImgs.push({id: generateKey(), img: URL.createObjectURL(e)})

            setSelectedImgs([...selectedImgs]);

            if (bigImg == null && selectedImgs.length > 0) {
                setBigImg(selectedImgs[0])
            }

        })
    }, [selectedFiles]);


    const handleFileSelect = (event) => {
        setSelectedImgs([])
        const chosenFiles = Array.prototype.slice.call(event.target.files)
        setSelectedFiles([
            ...selectedFiles,
            ... chosenFiles
        ]);
    }


    const deleteImg = (id) => {
        selectedImgs.splice(id, 1)
        selectedFiles.splice(id, 1)
        setSelectedImgs([...selectedImgs]);
    }

    const generateKey = () => {
        return `${
            new Date().getTime()
        }-${
            Math.floor(Math.random() * 9999) + 123
        }`;
    }


    const handleCanvasCallback = (childData) => {
        setImgsMarks([
            ...imgsMarks,
            childData
        ])
    }

    const handleCropDotCallback = (childData) => {
        if (selectCroppedImg != null && selectCroppedImg.dotX + selectCroppedImg.dotY != childData.dotX + childData.dotY) {
            setSelectCroppedImg(childData)
            
        } else {
            setSelectCroppedImg([])
            setDotTitle('')
            setDotDescription('')
        }
    }

    useEffect(() => {
        console.log("selectCroppedImg : ", selectCroppedImg)
        setDotTitle('')
        if(selectCroppedImg['title'] != null){
            setDotTitle(selectCroppedImg['title'])
        }
        setDotDescription('')
        if(selectCroppedImg['description'] != null){
            setDotDescription(selectCroppedImg['description'])
        }
    }, [selectCroppedImg])


    const addDotDetail = e => {
        e.preventDefault();
        let objIndex = imgsMarks.findIndex((obj => (obj.imgId == selectCroppedImg.imgId && obj.dotX + obj.dotY == selectCroppedImg.dotX + selectCroppedImg.dotY)));
        imgsMarks[objIndex].title = dotTitle
        imgsMarks[objIndex].description = dotDescription
        setDotTitle('')
        setDotDescription('')
    };

    const deleteDot = () => {
        let objIndex = imgsMarks.findIndex((obj => (obj.imgId == selectCroppedImg.imgId && obj.dotX + obj.dotY == selectCroppedImg.dotX + selectCroppedImg.dotY)));
        imgsMarks.splice(objIndex, 1)
        setImgsMarks([
            ...imgsMarks
        ])
        setSelectCroppedImg([])
    };



    return (
        <div className="App">

            {
            selectedImgs ?. length < 1 && <div className="file-upload">
                <button className="btn">Upload files &#43;</button>
                <input type="file" className="form-control" id="inputGroupFile02"
                    onChange={handleFileSelect}
                    multiple/>

            </div>
        }


            {
            selectCroppedImg.imgId != null && (
                <form onSubmit={addDotDetail}>
                    <div className="mb-3">
                        <label for="exampleInputEmail1" className="form-label">Title</label>
                        <input type="text" className="form-control" id="exampleInputEmail1"
                            value={dotTitle}
                            onChange={
                                e => setDotTitle(e.target.value)
                            }/>
                    </div>
                    <div className="mb-3">
                        <label for="exampleInputPassword1" className="form-label">Description</label>
                        <input type="text" className="form-control" id="exampleInputPassword1"
                            value={dotDescription}
                            onChange={
                                e => setDotDescription(e.target.value)
                            }/>
                    </div>

                    <button type="submit" className="btn btn-primary"
                        disabled={
                            !dotTitle || !dotDescription
                    }>Submit</button>
                    <div onClick={deleteDot}>Delete Dot</div>
                </form>
            )
        }


            {
            selectedImgs ?. length > 0 && <>

                <div className='crops'>
                    {
                    imgsMarks ?. length > 0 && imgsMarks.filter(e => e.imgId == bigImg.id).map((e, index) => (
                        <CropDot img={bigImg}
                            details={e}
                            key={index}
                            cropDotCallback={
                                (x) => handleCropDotCallback(x)
                            }/>
                    ))
                } </div>

                <Canvas img={bigImg}
                    dots={imgsMarks}
                    parentCallback={
                        (e) => handleCanvasCallback(e)
                    }/>
            </>
        }


            <div className='selected-imgs'>
                {
                selectedImgs ?. length > 0 && selectedImgs.map((e, index) => (

                    <div className='item-img'
                        key={index}>
                        <img src={
                            e['img']
                        }/>

                        <button className='select-btn'
                            onClick={
                                () => setBigImg(e)
                        }>&#128070;</button>

                        <button className='delete-btn'
                            onClick={
                                () => deleteImg(index)
                        }>&times;</button>
                    </div>
                ))
            } </div>


        </div>
    );
}

export default App;
