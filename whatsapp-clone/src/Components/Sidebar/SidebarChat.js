import React from 'react';
import './SidebarChat.css';
import { Avatar } from '@material-ui/core';
import axios from "axios";

function SidebarChat({ id, name, lastmessage, addnewChat, updateRooms, handleClick}) {
    const createChat = () => {
        const roomName = prompt("Please enter name for chat");
        const Password = prompt("Please enter password");
        const config = {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        };
        if(roomName && Password) {
            var apiBaseUrl = "http://localhost:4000/chatapp/";
            var payload = {
                'user_id': 1,
                'room_name': roomName,
                'password': Password
            }
            async function fetchData() {
                const request = await axios.post(apiBaseUrl + "addroom",payload,config);
                if(request.data.code === 201) {
                    updateRooms()
                }
                return request;
            }
            fetchData();
        }
    };
    // function handleClick() {
    //     localStorage.setItem('id', id);
    //     const newid = localStorage.getItem('id');
    //     console.log(newid);
    //     updateid()
    // }
    if (!addnewChat) {
        return (
            <div className="sidebarChat" onClick={handleClick}>
                <Avatar />
                <div className="sidebarchatInfo">
                    <h2>{name}</h2>
                    <p>Last message--</p>
                </div>
            </div>
        );
    } else {
        return (
            <div onClick={createChat} className="addsidebarChat">
                <h2> Add new Chat</h2>
            </div>
        );
    }
}

export default SidebarChat
