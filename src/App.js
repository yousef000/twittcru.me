import React, {Component} from 'react';
import './App.css';
import Profile from './containers/profile/profile';
import {Route, BrowserRouter} from 'react-router-dom';
import Auth from './containers/auth/auth';
import firebase from 'firebase';
import {Helmet} from 'react-helmet'
import pp from './assets/man.png'

const firebaseConfig = {
  apiKey: "AIzaSyD7JVWT-_Xgg6wSPCRiD74FjENArmoC-2s",
  authDomain: "twittcru.firebaseapp.com",
  databaseURL: "https://twittcru.firebaseio.com",
  projectId: "twittcru",
  storageBucket: "",
  messagingSenderId: "1053911561710",
  appId: "1:1053911561710:web:7d5a22b74debb2f1014aff",
  measurementId: "G-W9Q9TN01GR"
  };
firebase.initializeApp(firebaseConfig)

class App extends Component {
  render(){
    return (
        <div className="App">
        <Helmet>
                    <title>Profile</title>
                    <meta property="twitter:card" content="summary" />
                    <meta name="twitter:site" content="@yusdost" />
                    <meta name="twitter:title" content="Small Island Developing States Photo Submission" />
                    <meta name="twitter:description" content="View the album on Flickr." />
                    <meta name="twitter:image" content={pp} />
                    <meta name="twitter:creator" content="@yusdost" />
                </Helmet>
          <BrowserRouter>
              <Route exact path = "/" component={Auth} />
              <Route path = {"/:username"} component={Profile} />
          </BrowserRouter>
        </div>
   
    );
  }
  
}

export default App;
