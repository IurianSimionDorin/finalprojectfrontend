import Navigation from './components/navigation/Navigation';
import Logo from './components/logo/Logo';
import ImageLinkForm from './components/imageLinkForm/ImageLinkForm';
import Rank from './components/rank/Rank';
import FaceRecognition from './components/faceRecognition/FaceRecognition';
import SignIn from './components/signIn/SignIn';
import Register from './components/register/Register';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import './App.css';
import { Component } from 'react';


const app = new Clarifai.App({
  apiKey: 'b1596bee8f0244f9b5318549a055508b'
});


const particlesOptions = {
  particles: {
    number: {
      value: 50,
      density: {
        enable: true,
        value_area: 800
      }
    },
    line_linked: {
      shadow: {
        enable: true,
        color: "#3CA9D1",
        blur: 5
      },
      color: 'rgb(0,43,51)',
    },
    color: {
      value: 'rgba(0, 0, 0, 0.1)'
    }
  }
}


class App extends Component {

  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignedIn: false,
    }
  }


  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);

    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }


  displayFaceBox = (box) => {
    // console.log(box);
    this.setState({ box: box });
  }


  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  }


  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input });

    app.models
      .predict(
        Clarifai.FACE_DETECT_MODEL,
        this.state.input,
      )
      .then((response) => {
        this.displayFaceBox(this.calculateFaceLocation(response));
        // console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState({ isSignedIn: false });
    }
    else if (route === 'home') {
      this.setState({ isSignedIn: true });
    }
    this.setState({ route: route });
  }


  render() {

    return (
      <div className="App " >
        <Particles
          className='particles'
          params={particlesOptions} />
        <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange} />
        {
          this.state.route === 'home'
            ?
            <div>
              <Logo />
              <Rank />
              <ImageLinkForm
                onInputChange={this.onInputChange}
                onButtonSubmit={this.onButtonSubmit}
              />
              <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl} />
            </div>
            :
            (
              this.state.route === 'signin'
                ? <SignIn onRouteChange={this.onRouteChange} />
                : <Register onRouteChange={this.onRouteChange} />
            )
        }
      </div>
    );
  }
}

export default App;
