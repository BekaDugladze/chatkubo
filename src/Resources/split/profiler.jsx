import React from "react"
import { useDispatch } from "react-redux";
import { clearSelectedUser } from "../../actions";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faRightFromBracket} from '@fortawesome/free-solid-svg-icons'
import {faAdd, faInfo} from '@fortawesome/free-solid-svg-icons'

export default function Profiler(){
    const dispatch = useDispatch()
    function clearAll() {
        dispatch(clearSelectedUser())
    }
    return(
        <button onClick={clearAll} className="moreInfo"><span className="visually-hidden">Info</span><FontAwesomeIcon icon={faInfo} /></button>
    )
}