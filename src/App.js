import {useRef, useEffect, useState} from 'react';
import Canvas from 'Canvas';
import CropDot from 'CropDot';

const App = () => {

    const [selectedFiles, setSelectedFiles] = useState([]);
    const [selectedImgs, setSelectedImgs] = useState([]);
    const [bigImg, setBigImg] = useState(null);
    const [imgsMarks, setImgsMarks] = useState([]);
    const [selectCroppedImg, setSelectCroppedImg] = useState([]);
    const [hoverCroppedImg, setHoverCroppedImg] = useState([]);
    const [dotTitle, setDotTitle] = useState('');
    const [dotDescription, setDotDescription] = useState('');
    const dotFormRef = useRef(null);

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

    const selectBigImg = (e) => {
        setBigImg(e)
        setSelectCroppedImg([])
    }

    const generateKey = () => {
        return `${
            new Date().getTime()
        }-${
            Math.floor(Math.random() * 9999) + 123
        }`;
    }


    const handleCanvasCallback = (childData) => {

        setSelectCroppedImg(childData)
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

    const handleCropDotMouseEnterCallback = (childData) => {
        setHoverCroppedImg(childData)
    }

    const handleCropDotMouseLeaveCallback = (childData) => {
        setHoverCroppedImg([])
    }

    useEffect(() => {
        setDotTitle('')
        if (selectCroppedImg['title'] != null) {
            setDotTitle(selectCroppedImg['title'])
        }
        setDotDescription('')
        if (selectCroppedImg['description'] != null) {
            setDotDescription(selectCroppedImg['description'])
        }
    }, [selectCroppedImg])


    const addDotDetail = e => {
        e.preventDefault();
        let objIndex = imgsMarks.findIndex((obj => (obj.imgId == selectCroppedImg.imgId && obj.dotX + obj.dotY == selectCroppedImg.dotX + selectCroppedImg.dotY)));
        if(dotTitle != null || dotTitle != ''){
            imgsMarks[objIndex].title = dotTitle
        }
        if(dotDescription != null || dotDescription != ''){
            imgsMarks[objIndex].description = dotDescription
        }
        setDotTitle('')
        setDotDescription('')
        setSelectCroppedImg([])
    };

    const deleteDot = () => {
        let objIndex = imgsMarks.findIndex((obj => (obj.imgId == selectCroppedImg.imgId && obj.dotX + obj.dotY == selectCroppedImg.dotX + selectCroppedImg.dotY)));
        imgsMarks.splice(objIndex, 1)
        setImgsMarks([...imgsMarks])
        setSelectCroppedImg([])
    };

    useEffect(() => {
        function handleClickOutside(event) {
            if (dotFormRef.current && ! dotFormRef.current.contains(event.target)) {
                setSelectCroppedImg([])
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return() => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dotFormRef]);

    const clearApp = () => {
        setSelectedFiles([])
        setSelectedImgs([])
        setSelectCroppedImg([])
        setImgsMarks([])
        setHoverCroppedImg([])
        setBigImg(null)
    };

    const submitApp = () => {
        console.log("app submit start ========")
        console.log("images Marks : ", imgsMarks)
        console.log("selected Images : ", selectedImgs)
        console.log("app submit end ========")
    };


    return (
        <div className="App">

            <a className='abdullah-turkmen' href='https://linkedin.com/in/abdullahturkmen'>created by Abdullah Türkmen</a>

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
                <div className='dot-detail-form'>
                    <form onSubmit={addDotDetail}
                        ref={dotFormRef}>
                        <div className="dot-detail-form-element">
                            <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
                            <input type="text" className="form-control" id="exampleInputEmail1"
                                value={dotTitle}
                                onChange={
                                    e => setDotTitle(e.target.value)
                                }/>
                        </div>
                        <div className="dot-detail-form-element">
                            <label htmlFor="exampleInputPassword1" className="form-label">Description</label>
                            <textarea type="text" className="form-control" id="exampleInputPassword1"
                                value={dotDescription}
                                onChange={
                                    e => setDotDescription(e.target.value)
                                }/>
                        </div>

                        <button type="submit" className="save-modal-btn">Save</button>
                        <div className='delete-dot-btn'
                            onClick={deleteDot}>🗑</div>
                        <div className='close-modal-btn'
                            onClick={
                                () => setSelectCroppedImg([])
                        }>&#10006;</div>
                    </form>
                </div>
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
                            cropDotMouseEnterCallback={
                                (x) => handleCropDotMouseEnterCallback(x)
                            }
                            cropDotMouseLeaveCallback={
                                (x) => handleCropDotMouseLeaveCallback(x)
                            }
                            cropDotCallback={
                                (x) => handleCropDotCallback(x)
                            }/>
                    ))
                } </div>

                <Canvas img={bigImg}
                    dots={imgsMarks}
                    croppedImgHover={hoverCroppedImg}
                    parentCallback={
                        (e) => handleCanvasCallback(e)
                    }/>
            </>
        }

{
                selectedImgs ?. length > 0 && (<>
            <div className='selected-imgs'>
                {
                selectedImgs.map((e, index) => (

                    <div className='item-img'
                        key={index}>
                        <img src={
                            e['img']
                        }/>

                        <button className='select-btn'
                            onClick={
                                () => selectBigImg(e)
                        }>&#128070;</button>

                        <button className='delete-btn'
                            onClick={
                                () => deleteImg(index)
                        }>&times;</button>
                    </div>
                ))
            } </div>
            
            
            <div className='app-btns'>
                <button onClick={() => clearApp()}>Clear</button>
                <button onClick={() => submitApp()}>Submit</button>
            </div>
            
            </>)}


        </div>
    );
}

export default App;
