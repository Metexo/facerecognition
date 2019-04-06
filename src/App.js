import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import './App.css';

const app = new Clarifai.App({
  apiKey: ''
 });
 

const pariclesOptions ={
  particles: {
    number:{
      value: 100,
      density:{
        enable:true,
        value_area: 500
      }
    }
  },
  interactivity:{
    detect_on: 'window',
    events:{
      onhover: {
        enable: true,
        mode: 'grab'
      }
    }
  }
}

class App extends Component {

  constructor(){
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignIn: false
    }
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions.map(region =>{
      return region.region_info.bounding_box;
    })
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return clarifaiFace.map((item)=>{
      return {
        leftCol: item.left_col * width,
        topRow: item.top_row * height,
        rightCol: width - (item.right_col * width),
        bottomRow: height - (item.bottom_row * height)
      }
    })
  }

  displayFaceBox = (box) =>{
    this.setState({box: box});
  }

  onInputChange = (event) =>{
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
    app.models
    .predict(
       Clarifai.FACE_DETECT_MODEL,
       this.state.input)
    .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
    .catch(err => console.log(err));
  }

  onRouteChange = (route)=>{
    if(route === 'signout'){
      this.setState({isSignIn: false})
    } else if (route === 'home'){
      this.setState({isSignIn: true})
    }
    this.setState({route: route});
  }

  render() {
    const {isSignIn, imageUrl, route, box} = this.state;
    return (
      <div className="App">
        <Particles className='particles'
          params ={pariclesOptions}
        />
        <Navigation isSignedIn={isSignIn} onRouteChange={this.onRouteChange}/>
        { route ==='home'
          ? <div>
              <Logo/>
              <Rank/>
              <ImageLinkForm 
              onInputChange={this.onInputChange}
              onButtonSubmit ={this.onButtonSubmit}/>
              <FaceRecognition box={box} imageUrl={imageUrl}/>
          </div>
          : (
            route === 'signin'
            ? <SignIn onRouteChange={this.onRouteChange}/>
            : <Register onRouteChange={this.onRouteChange}/>
          )
        }
      </div>
    );
  }
}

export default App;
