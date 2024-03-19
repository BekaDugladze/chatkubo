import React, { useRef } from 'react'
import { useSelector } from 'react-redux'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faPaperPlane, faForward } from "@fortawesome/free-solid-svg-icons";

export default function MessageBox({getMessages}) {
    const userEmail = useSelector((state) => state.userEmail)
    const messageBoxRef = useRef(null);
    
    const postUsers = async () => {
        try{
            const text = messageBoxRef.current.innerText;
            const post = await fetch('http://localhost:1000/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
                recieverEmail : userEmail,
                text: text,
            })
        })
        if(post.ok) {
            console.log()
        }
        else{
            console.log(post.message)
        }
        }
        catch(err){
            console.log(err)
        }
    }
    const prevent = (event) => {
        event.preventDefault()
    }

    const clearMessage = () => {
        messageBoxRef.current.innerText = null
    }
    return(
        <form className='row message-box'>
            <div 
            ref={messageBoxRef}
            aria-label='Send message' 
            role='textbox' 
            contentEditable='true' 
            spellCheck='true' 
            tabIndex='0' 
            id='message-box'
            style={{
                userSelect: 'text', 
                fontSize: '15px', 
                width: '80%', 
                height: '20vh',
                maxHeight: '20vh', 
                border: '1px solid rgb(43, 71, 137)',
                background: 'white',
                borderRadius: '25px',
                padding: '1vh 1vw',
                overflow: 'auto'
            }}
            >
            </div>
            <button className='normBut message-box-button' onClick={(e) => {postUsers(); prevent(e); getMessages(); clearMessage()}}><FontAwesomeIcon icon={faPaperPlane}/>Send</button>
        </form>
    )
}