import React, {useState, useEffect} from 'react';
import './popup.css';
import axios from "axios";

function Popup ({openup, Allowchat, roomid}) {
    const [password,setPassword] = useState('');
    const [popstate, setPopstate] = useState(true)
    const modal = document.getElementById("myModal");
    const HandleClick = () => {
        setPopstate(true)
    }
    useEffect(() => {
        if (roomid != -1) {
            setPopstate(openup)
            setPassword('')
        }
    },[openup,roomid])
    const handleSubmit = (e) => {
        e.preventDefault();
        const config = {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        };
        var apiBaseUrl = "http://localhost:4000/chatapp/";
        var payload = {
            'id' : roomid,
            'password': password
        }
        async function passcheck() {
            const request = await axios.post(apiBaseUrl + "roomaccess",payload,config);
            if (request.data.code == 201) {
                Allowchat(true);
                setPopstate(true)
            }
            return request;
        }
        passcheck();
    }
    return (
        <div id="myModal" className={`modal ${popstate && 'none'}`}>
            <div className="modal-content">
            <button type="submit" className="close"  onClick={HandleClick}>&times;</button>
            <form>
                <input type="password" id="password" className="fadeIn third" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
                <button type="submit" onClick={handleSubmit}>Submit</button>
            </form>
            </div>
        </div>
    );
}
export default Popup;