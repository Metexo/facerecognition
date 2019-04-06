import React from 'react';
import './FaceRecognition.css'

const createDiv = (boxes) => {
    const image = document.getElementById('imageBox');
    for(const box in boxes) {
        let div = document.createElement("div");
        div.classList.add('bounding-box');
        div.style.top = boxes[box].topRow +"px";
        div.style.right = boxes[box].rightCol+"px";
        div.style.bottom = boxes[box].bottomRow+"px";
        div.style.left = boxes[box].leftCol+"px";
        image.appendChild(div);
    }
}

const FaceRecognition = ({imageUrl, box}) => {
    return(
        <div className='center ma'>
            <div id="imageBox" className ='absolute mt2'>
                <img id='inputimage' alt='' src={imageUrl} width='500px' heigh='auto'/>
                {createDiv(box)}
            </div>
        </div>
    );
}

export default FaceRecognition;