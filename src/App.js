import {useEffect, useState} from 'react';
import Canvas from 'Canvas';

const App = () => {

    const [selectedFiles, setSelectedFiles] = useState([]);
    const [selectedImgs, setSelectedImgs] = useState([]);
    const [bigImg, setBigImg] = useState(null);
    const [imgsMarks, setImgsMarks] = useState([]);


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


    const handleCallback = (childData) => {
        setImgsMarks([
            ...imgsMarks,
            childData
        ])
    }


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
            selectedImgs ?. length > 0 && <Canvas img={bigImg}
                dots={imgsMarks}
                parentCallback=
                {(e) => handleCallback(e)}/>
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
