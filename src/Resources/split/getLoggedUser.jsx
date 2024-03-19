import React, { useEffect } from "react";
import {useDispatch} from 'react-redux'
import { setLoginUser } from "../../actions";

export default function GetLoggedUser(){
    const dispatch = useDispatch() 

    const get = async () => {
        try{
            const response = await fetch(`http://localhost:1000/profile`, {
                method: 'GET',
                credentials: 'include'
            })
            if(!response.ok) {
                console.log('response !ok')
            }
            const data = await response.json()
            dispatch(setLoginUser(data.email))
        }
        catch(err){
            console.log(err)
        }
    }
    useEffect(() => {
        get()
    }, [])
    return (<>
    </>)
}