import React, { Component, lazy, Suspense } from 'react';
import img from './photo/chat.webp';
import './css/auth.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faGoogle} from '@fortawesome/free-brands-svg-icons'

const LazyLogin = lazy(() => import('./split/login'))
const LazyReg = lazy(() => import('./split/register'))

export default class Auth extends Component{
    constructor(props){
        super(props);
        this.state = {
            active: 'but1',

        }
    }
    handleActive(props) {
        this.setState({active: props})
    }
    render(){
        return (
        <div className='auth'>
            <div className='forms'>
                <h1>Chat App</h1>
                <div>
                    <button className='normBut' onClick={() => this.handleActive('but1')} 
                    style={this.state.active === 'but1' ? {
                        background: 'white',
                        color: 'rgb(43, 71, 137)'
                    } : {
                        background: 'rgb(43, 71, 137)',
                        color: 'white'
                    }}>Log In</button>
                    <button className='normBut' onClick={() => this.handleActive('but2')}
                    style={this.state.active === 'but2' ? {
                        background: 'white',
                        color: 'rgb(43, 71, 137)'
                    } : {
                        background: 'rgb(43, 71, 137)',
                        color: 'white'
                    }}>Register</button>
                </div>
                <Suspense fallback={<div><h2>Loading...</h2></div>}>
                {this.state.active === 'but1' && (<LazyLogin />)}
                {this.state.active === 'but2' && (<LazyReg />)}
                </Suspense>
                <p>Or</p>
                <a href='http://localhost:1000/auth/google'><FontAwesomeIcon icon={faGoogle}/>   Continue with Google</a>
            </div>
            <img src={img} width='100px' height='100px' alt='Chat App, Beka Dugladze, Portfolio'/>
        </div>
        )
    }
}