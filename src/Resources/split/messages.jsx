import React, {useEffect, useState, useRef} from 'react'
import { useSelector } from 'react-redux'
import MessageBox from './messageBox'

export default function Messages() {
    const [messages, setMessages] = useState([])
    const userEmail = useSelector((state) => state.userEmail)
    const [loading, setLoading] = useState(true)
    const messagesContainerRef = useRef(null);

    const getMessages = async () => {
        try{
            if(userEmail){
            const url = `http://localhost:1000/chat/messages?userEmail=${encodeURIComponent(userEmail)}`
            const get = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
        });
            const data = await get.json()
            console.log(data)
            if(data.rows === 0){
                setMessages([])
                setLoading(false);
            }
            else{
                setMessages(data.messagges)
                setLoading(false);
            }
        }
        }
        catch(err){
            console.log(err)
            setLoading(false);
        }
    }
    useEffect(() => {
        getMessages();
    }, [userEmail])
    return(
        <>
        { loading ? 
        <p style={{ animation: 'loader 1s infinite', textAlign: 'center'}}>loading...</p>
        :
        <>
        {messages ? 
        <div id='messages'>
        {messages.map((message, index) => (
            <div key={index} className='row message-div' style={{ background: message.senderEmail ? 'rgba(43, 71, 137, 0.1)' : 'white', flexDirection: message.senderEmail ? 'row-reverse': 'row' }}>
                <div className='messages-hp' style={message.senderEmail ? {alignItems: 'flex-end'} : {alignItems: 'flex-start'} }>
                    <h6>{message.senderEmail || message.recieverEmail}</h6>
                    <p>{message.message}</p>
                </div>
                <p>{message.timestamp}</p>
            </div>
        ))}
        </div>
    : <p>No Message</p>}
    </>
        }
    <MessageBox getMessages={getMessages} />
        </>
    )
}