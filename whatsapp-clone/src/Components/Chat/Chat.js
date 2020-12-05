import { Avatar, IconButton } from '@material-ui/core';
import React, { useState,useEffect, useRef } from 'react';
import "./Chat.css";
import { AttachFile, InsertEmoticon, Mic, MoreVert, SearchOutlined } from '@material-ui/icons';
import axios from "axios";
import Popup from '../Popup/popup';
function Chat({roomid,userid}) {
    const [messages,setMessages] = useState([]);
    const [users, setUsers] = useState([]);
    const [mymessage, setMymessage] = useState('');
    const [room, setRoom] = useState([{'room_name': '....'}]);
    const messagesEndRef = useRef(null)
    const [newchat, setNewchat] =  useState(false)
    const [lastscene, setLastscene] = useState('0:00')
    const [newroom, setNewroom] = useState(false)
    const [lastid, setlastid] = useState(-1)

    const Allowchat = e => {
        setNewroom(e)
    }

    const scrollToBottom = () => {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
    useEffect(() => {
        if(roomid != -1 && lastid != -1) {
            const config = {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            };
            var apiBaseUrl = "http://localhost:4000/chatapp/";
            var payload = {
                'id' : roomid
            }
            async function Refresh() {
                const request = await axios.post(apiBaseUrl + "refreshchat",payload,config);
                if (request.data[0].id != lastid) {
                    importdata()
                }
                return request;
            }
            Refresh();
            scrollToBottom();
        }
    });
    useEffect(() => {
        if (roomid != -1 && newroom) {
            setNewroom(false)
            importdata()
            scrollToBottom();
        }  
    },[roomid,newroom])
    const checkuser = (id) => {
        for(var i=0;i<users.length;i++) {
            if(id == users[i].id) {
                return users[i].username
            }
        }
    }
    const getTime = (timestamp) => {
        return timestamp.substr(0,5)
    }
    const checkReciever = (user_id) => {
        if(user_id == userid) {
            return true;
        } else {
            return false;
        }
    }
    const importdata = () => {
        const config = {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        };
        var apiBaseUrl = "http://localhost:4000/chatapp/";
        var payload = {
            'id' : roomid
        }
        async function fetchData() {
            const request = await axios.post(apiBaseUrl + "messages",payload,config);
            setMessages(request.data);
            if (request.data.length > 0) {
                setLastscene(getTime(request.data[request.data.length - 1].time))
                setlastid(request.data[request.data.length - 1].id)
            } else {
                setLastscene('0:00')
            }
            return request;
        }
        fetchData();
        async function fetchUsers() {
            const request = await axios.get(apiBaseUrl + "users",config);
            setUsers(request.data);
            return request;
        }
        fetchUsers();
        var newpayload = {
            'room_id' : roomid
        }
        async function fetchRoom() {
            const request = await axios.post(apiBaseUrl + "singleroom",newpayload,config);
            if(roomid != -1) {
                setRoom(request.data);
            }
            return request;
        }
        fetchRoom(); 
    }
    const handleSubmit = (evt) => {
        evt.preventDefault();
        const config = {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        };
        if (roomid != -1 ) {
            var apiBaseUrl = "http://localhost:4000/chatapp/";
            var payload = {
                'user_id' : userid,
                'message' : mymessage,
                'room_id' : roomid
            }
            async function sendMessage() {
                const request = await axios.post(apiBaseUrl + "addmessage",payload,config);
                if (request.data.code === 201) {
                    var newpayload = {
                        'id' : roomid
                    }
                    async function fetchData() {
                        const request = await axios.post(apiBaseUrl + "messages",newpayload,config);
                        setMessages(request.data);
                        return request;
                    }
                    fetchData();
                }
                return request;
            }
            sendMessage(); 
            setMymessage('');
            scrollToBottom();   
        }
    }
    const roomchecker = () => {
        if (roomid===-1) {
            return false
        } else {
            return true
        }
    }
    return (
        <div className="chat">
            <Popup openup={newchat} Allowchat={Allowchat} roomid={roomid}/>
            <div className="chatHeader">
                    <Avatar />
                    <div className="chatheaderInfo">
                        <h3>{room[0].room_name}</h3>
                        <p>Last seen at {lastscene}</p>
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
            <div className="chatBody" >
                {messages.map((message) => (
                    <div key={message.id} className={`chatMessage ${checkReciever(message.user_id) && 'chatReciever'}`}>
                        <span className="chatName">{checkuser(message.user_id)}</span>
                        {message.content}
                        <span className="chatTimestamp">{getTime(message.time)}</span>
                    </div>
                ))}
                <div ref={messagesEndRef} />
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
