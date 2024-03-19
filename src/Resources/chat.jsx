import React, {Component} from "react"; 
import './css/chat.css';
import inc from './photo/inc.webp'
import Chating from "./split/chating";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faRightFromBracket} from '@fortawesome/free-solid-svg-icons'
import {faAdd} from '@fortawesome/free-solid-svg-icons'
import Search from "./split/search";
import Profiler from "./split/profiler";
import NavBut from "./split/navBut";

export default class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            email: null,
            photo: inc,
            id: null,
            copied: false,
            navButActive: 1,
        };
      }
    
      handleCopyToClipboard = () => {
        const  data  = this.state.email;
        
        navigator.clipboard.writeText(data)
          .then(() => {
            this.setState({ copied: true });
            setTimeout(() => {
              this.setState({ copied: false });
            }, 1500); // Reset copied state after 1.5 seconds
          })
          .catch(err => {
            console.error('Failed to copy:', err);
          });
      }
    
    async getUser() {
        try{
        const response = await fetch(`http://localhost:1000/profile`, {
            method: 'GET',
            credentials: 'include'
        })
        if(!response.ok) {
            console.log('response !ok')
        }
        const data = await response.json()
        this.setState({user: data.user, email: data.email, photo: data.picture ? data.picture : inc, id: data.id})
        }
        catch(err) {
            console.log(err)
        }
    }
    async handleLogout(){
        try{
        const response = await fetch('http://localhost:1000/logout', {
            method: 'GET',
            credentials: 'include',
        })
        if(response.ok){
            window.location.href = '/';
        }
    }
    catch(err) {
        console.log(err)
    }

    }
    async componentDidMount() {
        await this.getUser()
    }
    
    navBut(but) {
        this.setState({navButActive: but});
    }
    render() {
        return(
            <div id="chat">
            <div className="chatOne">
                <h1>Chat App</h1>
                <div className="userinfo">
                    <div>
                        <p>{this.state.user}</p>
                        <button className="moreInfo" onClick={this.handleCopyToClipboard}><p>{this.state.email}<span style={{position: 'absolute', transform: 'translate(-200%, -150%)', background: 'rgb(43, 71, 137)', color: 'white', borderRadius: '10px'}}>{this.state.copied ? 'Copied!' : null}</span></p></button>
                    </div>
                    <div className="row" style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                        <img src={this.state.photo} alt={this.state.user} width='60px' height='60px' />
                        <Profiler />
                    </div>
                    <button id="logout" onClick={() => this.handleLogout()}><FontAwesomeIcon icon={faRightFromBracket} /> <span style={{fontSize: '7px'}}>Logout</span></button>
                </div>
                <Search />
                <NavBut />


            </div>
            <div className="chatTwo">
                <Chating />
            </div>
            </div>
        )
    }
}