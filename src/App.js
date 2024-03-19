import React from 'react';
import './App.css';
import Auth from './Resources/auth';
import { Component, lazy, Suspense} from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './Resources/css/general.css';

const LazyAuth = lazy(() => import('./Resources/auth'))
const LazyChat = lazy(() => import('./Resources/chat'));

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authed: false
    }
  }
  async isAuthed() {
    try{
      const response = await fetch('http://localhost:1000/profile', {
        method: 'GET',
        credentials: 'include',
      })
      if(response.ok) {
        this.setState({authed: true});
      }
    }
    catch(err){
      console.error(err)
    }
  }

  async componentDidMount() {
    await this.isAuthed()
  }
  render() {
    return (
      <Router>
        <Routes>
          <Route path='/' element={<Suspense fallback={<div><h1>Please Wait...</h1></div>}><LazyAuth /></Suspense>} />
          <Route path='/chat' element={<Suspense fallback={<div><h1>Please Wait...</h1></div>}>{this.state.authed ? <LazyChat /> : <LazyAuth /> }</Suspense>} />
        </Routes>
      </Router>
  )};
}

export default App;
