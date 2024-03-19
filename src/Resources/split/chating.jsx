import React from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPhone, faVideo, faBars} from '@fortawesome/free-solid-svg-icons'
import {useSelector} from 'react-redux'
import inc from '../photo/inc.webp'
import { lazy, Suspense} from 'react'
import MessageBox from './messageBox'
import Personal from "./personal";

const LazyMessages = lazy(() => import('./messages'))

export default function Chating() {
    const { userImage, userEmail, userName } = useSelector(state => state);

    return(
        <>
                    {userEmail ? 
                    <>
            <header className="chat-head">
                        <div className="userinfo">
                                <img src={ userImage ? userImage : inc} alt={userName? userName : null} />
                                <h3>{userName ? userName : 'default'}</h3>
                                <h6>{userEmail}</h6>
                        </div>
                        <div>
                            <button className="headbut"><FontAwesomeIcon icon={faPhone} /></button>
                            <button className="headbut"><FontAwesomeIcon icon={faVideo} /></button>
                            <button className="headbut"><FontAwesomeIcon icon={faBars} /></button>
                        </div>
            </header>
                        <div className="width">
                            <Suspense fallback={<p>Hi</p>}><LazyMessages /></Suspense>
                        </div>
                        </>
                    : 
                    <div className="col center personal"><Personal /></div>
                    }

        </>
    )
}