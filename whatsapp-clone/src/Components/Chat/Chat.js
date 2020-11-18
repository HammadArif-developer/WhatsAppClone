import { Avatar, IconButton } from '@material-ui/core';
import React, { useState,useEffect } from 'react';
import "./Chat.css";
import { AttachFile, InsertEmoticon, Mic, MoreVert, SearchOutlined } from '@material-ui/icons';
import axios from "axios";
function Chat({roomid}) {
    const [messages,setMessages] = useState([]);
    const [users, setUsers] = useState([]);
    const [mymessage, setMymessage] = useState('');
    const [room, setRoom] = useState([{'room_name': '....'}]);
    useEffect(() => {
        var apiBaseUrl = "http://localhost:4000/chatapp/";
        var payload = {
            'id' : roomid
        }
        async function fetchData() {
            const request = await axios.post(apiBaseUrl + "messages",payload);
            setMessages(request.data);
            return request;
        }
        fetchData();
        async function fetchUsers() {
            const request = await axios.get(apiBaseUrl + "users");
            setUsers(request.data);
            return request;
        }
        fetchUsers();
        var newpayload = {
            'room_id' : roomid
        }
        async function fetchRoom() {
            const request = await axios.post(apiBaseUrl + "singleroom",newpayload);
            if(roomid === 0) {
                console.log('checking none')    
            } else {
                setRoom(request.data);
            }
            return request;
        }
        fetchRoom();        
    },[roomid])
    const checkuser = (id) => {
        for(var i=0;i<users.length;i++) {
            if(id === users[i].id) {
                return users[i].username
            }
        }
    }
    const getTime = (timestamp) => {
        return timestamp.substr(0,5)
    }
    const checkReciever = (user_id) => {
        if(user_id == 1) {
            return true;
        } else {
            return false;
        }
    }
    const handleSubmit = (evt) => {
        evt.preventDefault();
        var apiBaseUrl = "http://localhost:4000/chatapp/";
        var payload = {
            'user_id' : 1,
            'message' : mymessage,
            'room_id' : roomid
        }
        async function sendMessage() {
            const request = await axios.post(apiBaseUrl + "addmessage",payload);
            if (request.data.code === 201) {
                var newpayload = {
                    'id' : roomid
                }
                async function fetchData() {
                    const request = await axios.post(apiBaseUrl + "messages",newpayload);
                    setMessages(request.data);
                    return request;
                }
                fetchData();
            }
            return request;
        }
        sendMessage(); 
        setMymessage('');
    }
    const roomchecker = () => {
        if (roomid===0) {
            return false
        } else {
            return true
        }
    }
    return (
        <div className="chat">
            <div className="chatHeader">
                    <Avatar />
                    <div className="chatheaderInfo">
                        <h3>{room[0].room_name}</h3>
                        <p>Last seen at...</p>
                    </div>
                    <div className="chatheaderRight">
                        <IconButton>
                            <SearchOutlined/>
                        </IconButton>
                        <IconButton>
                            <MoreVert/>
                        </IconButton>
                    </div>
            </div>
            <div className="chatBody">
                {messages.map((message) => (
                    <div key={message.id} className={`chatMessage ${checkReciever(message.user_id) && 'chatReciever'}`}>
                        <span className="chatName">{checkuser(message.user_id)}</span>
                        {message.content}
                        <span className="chatTimestamp">{getTime(message.time)}</span>
                    </div>
                ))}
            </div>
            <div className="chatFooter">
                <IconButton>
                    <InsertEmoticon />
                </IconButton>
                <IconButton>
                    <AttachFile />
                </IconButton>
                <form>
                    <input placeholder="Type a message" type="text" value={mymessage} onChange={e => setMymessage(e.target.value)}/>
                    <button type="submit" onClick={handleSubmit}>Send a message</button>
                </form>
                <IconButton>
                    <Mic />
                </IconButton>
            </div>
        </div>
    )
}

export default Chat
