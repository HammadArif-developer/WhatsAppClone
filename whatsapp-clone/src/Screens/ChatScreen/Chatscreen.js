import React, {useState, useEffect} from 'react';
import Chat from '../../Components/Chat/Chat';
import Sidebar from '../../Components/Sidebar/Sidebar';
import './Chatscreen.css';

function Chatscreen() {
  const [roomId, setroomId] = useState(0)
  const handleClick = id => {
    setroomId(id);
    console.log('check', id);
  };
  return (
    <div className="app">
        <div className="app-body">
        <Sidebar handleClick = {handleClick}/>
        <Chat roomid={roomId}/>
        </div>
    </div>
  );
}

export default Chatscreen;
