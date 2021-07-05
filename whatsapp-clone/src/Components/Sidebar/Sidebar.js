import React, {useState, useEffect} from 'react';
import './Sidebar.css';
import { Avatar, IconButton } from '@material-ui/core';
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import { MoreVert, SearchOutlined } from '@material-ui/icons';
import ChatIcon from "@material-ui/icons/Chat";
import SidebarChat from './SidebarChat';
import axios from "axios";
function Sidebar({handleClick}) {
    const [rooms, setRooms] = useState([]);
    const [toup, settoup] = useState(0);
    useEffect(() => {
        const config = {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        };
        var apiBaseUrl = "http://localhost:4000/chatapp/";
        async function fetchData() {
            const request = await axios.get(apiBaseUrl + "rooms",config);
            setRooms(request.data);
            return request;
        }
        fetchData();
    }, [toup]);
    return (
        <div className="sidebar">
            <div className="sidebarHeader">
                <Avatar/>
                <div className="sidebarheaderRight">
                    <IconButton style={{outline: "none"}}>
                        <DonutLargeIcon />
                    </IconButton>
                    <IconButton style={{outline: "none"}}>
                        <ChatIcon/>
                    </IconButton>
                    <IconButton style={{outline: "none"}}>
                        <MoreVert />
                    </IconButton>
                </div>
            </div>
            <div className="sidebarSearch">
                <div className="sidebarsearchContainer">
                    <SearchOutlined />
                    <input placeholder="Search or start new chat" type="text" />
                </div>
            </div>
            <div className="sidebarChats">
                <SidebarChat addnewChat updateRooms={() => settoup(prev => prev + 1)}/>
                {rooms.map((room) => (
                    <SidebarChat key={room.id} id={room.id} name={room.room_name} lastmessage={room.lastmessage} handleClick={() => handleClick(room.id)}/> 
                ))}
            </div>
        </div>
    )
}

export default Sidebar
