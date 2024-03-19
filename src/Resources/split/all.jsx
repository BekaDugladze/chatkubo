import React, {useEffect, useState} from "react";
import inc from '../photo/inc.webp';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedUser } from "../../actions";
import GetLoggedUser from "./getLoggedUser";

export default function All() {
    const [users, setUsers] = useState([])
    const user = useSelector(state => state.user)
    console.log(user)

    const getAllUsers = async () => {
        try{    
            const email = encodeURIComponent(user);
            const response = await fetch(`http://localhost:1000/chat/allLast?email=${email}`, {
                method: 'GET',
            });
            const data = await response.json()
            if(!response.ok) {console.log("Error")}
            else{
            setUsers(data);
            console.log(data);
            }
        }
        catch(err){
            console.log(err);
        }
    }
    useEffect(() => {
        getAllUsers();
    }, [user])

    
    const dispatch = useDispatch()

    const handleAddress = (userImage, userEmail,userName) => {
        dispatch(setSelectedUser(userImage, userEmail,userName));
    };
    return(
        <>
        {users.map(( user, index) => ( 
            <div className="row user scrolling" key={index}>
                <button className="user-button row user" onClick={() => handleAddress(user.picture, user.email, user.name)}>
                <img src={ user.picture ? user.picture : inc} alt={user.name} />
                <div className="col hp">
                    <p style={{fontWeight: 'bold'}}>{user.name}</p>
                    <p style={{fontStyle: 'italic'}}>{user.email}</p>
                </div>
                </button>
            </div>
        ))}
        <GetLoggedUser />
        </>
    )
}