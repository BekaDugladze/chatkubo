import React, {useState, useEffect} from "react";
{/*}
export default function User(props) {
    const [user, setUser] = useState(null)

    useEffect(() => {
        getUser();
    }, [props.email]);

    const getUser = async () => {
        try{
            const email = encodeURIComponent(`%${props.email}%`);
            const url = `http://localhost:1000/user?email=${email}`;
            const response = await fetch(url, {
                method: 'GET',
            })
            if(!response.ok){
                console.error(response.json)
            }
            const data = await response.json();
            console.log(data.name)
            setUser(data.name)
        }
        catch(err){
            console.log(err);
        }
    }
    return(
        <>
        <p>{user}</p>
        </>
    )
}*/}