import React from 'react';
import './FaceRecognition.css'


class FaceRecognition extends React.Component {

    constructor(props){
        super(props);
        this.state = {
        }
    }
    
    createDiv = (boxes) => {
        const image = document.getElementById('imageBox');
        const boudingBox = document.getElementsByClassName('bounding-box')


        if(boudingBox.length === 0){
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
    }

    deleteBoxes = () => {
        const boudingBox = document.getElementsByClassName('bounding-box');
        console.log(boudingBox);
        while(boudingBox.length>0){
            boudingBox[0].parentNode.removeChild(boudingBox[0]);
        }
    }

    render(){
        return(
            
            <div className='center ma'>
                <div id="imageBox" className ='absolute mt2'>
                    <img id='inputimage' alt='' src={this.props.imageUrl} width='500px' heigh='auto'/>
                    {this.deleteBoxes()}
                    {this.createDiv(this.props.box)}
                </div>
            </div>
        );
    }
}

export default FaceRecognition;