import React, { useState } from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faX, faSearch } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import Chating from "./chating";
import inc from '../photo/inc.webp'
import { useDispatch, useSelector} from 'react-redux'
import { setSelectedUser, setActive, clearSelectedUser } from "../../actions";

function Search() {
    const [search, setSearch] = useState('');
    const [users, setUsers] = useState([])
    const [found, setFound] = useState(false)

        useEffect(() => {
        }, [search])

        function handleSearchChange(event) {
            setSearch(event.target.value);
        }
        async function handleSearchSubmit(event) {
            event.preventDefault();
            try{
                const email = encodeURIComponent(`%${search}%`);
                if(search.length === 0){
                    setFound(false);
                }
                const url = `http://localhost:1000/user?email=${email}`;
                const response = await fetch(url, {
                    method: 'GET',
                })
                if(response.status === 404){
                    setFound(false)
                }
                else{
                    const data = await response.json();
                    setUsers(data.map(user => ({name: user.name, email: user.email, picture: user.picture})))
                    setFound(true)
                }
            }
            catch(err){
                setFound(false);
            }
        }
        const cleanAll = () => {
            setSearch('');
            setUsers(null);
            setFound(false)
            setActive(false)
        }
        
        const dispatch = useDispatch()

        const handleAddress = (userImage, userEmail,userName) => {
            dispatch(setSelectedUser(userImage, userEmail,userName));
        };
        const setDivActive = (active) => {
            dispatch(setActive(active));
        }
        const active = useSelector(state => state.active)

    return(
        <>
        <form id="search">
            <input type="search" name="search" placeholder="search by email" value={search} onChange={handleSearchChange} required/>
            <button className="normBut" onClick={(e) => {handleSearchSubmit(e); setDivActive(true)} } alt='search'><span className="visually-hidden">Search</span><FontAwesomeIcon icon={faSearch} /></button>
            <button className="normBut" onClick={() => {cleanAll(); setDivActive(false)} }><span className="visually-hidden">Clear</span><FontAwesomeIcon icon={faX} /></button>
        </form>
        <div className="users">
            {found && search !== '' && active &&  (<>
            {users && (
                users.map((users, index) => (
                    <div className="row user" key={index}>
                        <button className="user-button row user" onClick={() => handleAddress(users.picture, users.email, users.name)}>
                        {users.picture ? (
                            <img src={users.picture} alt={users.name} />
                        ) : (
                            <img src={inc} alt={users.name} /> // Assuming defaultPicture is a variable containing the URL or base64 encoded data of the default image
                        )}
                        <div className="col hp"> 
                            <p style={{fontWeight: 'bold'}}>{users.name}</p>
                            <p style={{fontStyle: 'italic'}}>{users.email}</p>
                        </div>
                        </button>
                    </div>
                ))
            )
            } 
            </>)}
        </div>
        </>
    )
}

export default Search