import React, {useEffect, useState} from "react";
import inc from '../photo/inc.webp'

export default function Personal() {
    const [user, setUser] = useState([])
    const [loading, setLoading] = useState(true)
    const [uploading, setUploading] = useState(null)
    
    async function getUser() {
        try{
        const response = await fetch(`http://localhost:1000/profile`, {
            method: 'GET',
            credentials: 'include'
        })
        if(!response.ok) {
            console.log('response !ok')
        }
        const data = await response.json()
        setUser(data)
        setLoading(false)
    }
        catch(err) {
            console.log(err)
            setLoading(false)
        }
    }
    const uploader = (event) =>{
        const image = event.target.files[0]

        const imageURL = URL.createObjectURL(image); // Create a URL for the selected image
        setUploading(imageURL);
    }
    useEffect(() => {
        getUser()
    }, [])
    return(
        <>
        {loading ? <p style={{animation: 'loader 1s infinite',}}>loading</p> :
        <div className="col center">
            <div className="row user-personal">
                <img src={uploading ? uploading : (user.picture || inc)} alt={[user.name, user.email]} width='100px' height='100px' id="changePic"/>
                <form className="col center changePic">
                    <input type="file" accept="image/*" name="upload" max='1' onChange={uploader}/>
                    <button type="submit" className="normBut">Upoload</button>
                </form>
            </div>
        <p className="pers-p bold">{user.user}</p>
        <p className="pers-p italic">{user.email}</p>
        </div>
        }
        </>
    )
}