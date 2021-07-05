import React, {useState, useEffect} from 'react';
import Chat from '../../Components/Chat/Chat';
import Sidebar from '../../Components/Sidebar/Sidebar';
import { useHistory } from "react-router-dom";
import './Chatscreen.css';

function Chatscreen({userid}) {
  let history = useHistory();
  const [roomId, setroomId] = useState(-1);
  const [userId, setuserId] = useState(localStorage.getItem('userid'));
  useEffect(() => {
    if (localStorage.getItem('token') == null) {
      history.push('/')
    }
  },[]);
  const handleClick = id => {
    setroomId(id);
  };
  return (
    <div className="app">
        <div className="app-body">
        <Sidebar handleClick = {handleClick}/>
        <Chat roomid={roomId} userid={userId}/>
        </div>
    </div>
  );
}

export default Chatscreen;
