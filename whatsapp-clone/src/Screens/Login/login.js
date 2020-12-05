import React, {useEffect, useState} from 'react';
import { useHistory } from "react-router-dom";
import './login.css';
import axios from "axios";

function Login (props) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    let history = useHistory();
    const HandleClick = (evt) => {
        evt.preventDefault();
        var apiBaseUrl = "http://localhost:4000/chatapp/";
        var payload = {
            username : username,
            password : password
        }
        async function fetchData() {
            const request = await axios.post(apiBaseUrl + "signin", payload);
            if (request.data.code == 201) {
                localStorage.setItem('userid', request.data.userid)
                localStorage.setItem('token', request.data.token)
                history.push("/chat")
            }
            return request;
        }
        fetchData();
    }
    return (
        <div>
            <div className="wrapper fadeInDown">
                <div id="formContent">
                    <h2 className="heading active"> Sign In </h2>
                    <h2 className="heading inactive underlineHover">Sign Up </h2>

                    <form>
                        <input type="text" id="username" className="fadeIn second" value={username} placeholder="Username" onChange={(e) => setUsername(e.target.value)}/>
                        <input type="password" id="password" className="fadeIn third" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
                        <input type="submit" className="fadeIn fourth" value="Log In" onClick={HandleClick}/>
                    </form>

                    <div id="formFooter">
                    <a className="underlineHover" href="#">Forgot Password?</a>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Login;