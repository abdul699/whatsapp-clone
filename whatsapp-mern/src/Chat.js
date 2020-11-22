import { Avatar, Icon, IconButton } from '@material-ui/core';
import { AttachFile, InsertEmoticon, Message, MoreVert, SearchOutlined, SettingsInputAntenna } from '@material-ui/icons';
import MicIcon from '@material-ui/icons/Mic';
import React from 'react';
import './Chat.css';
import {setInput, useState} from 'react';
import axios from './axios.js';

function Chat({ messages }) {
    // store input
    const [input, setInput] = useState("");

    const sendMessage = async(e) => {
        e.preventDefault();

        await axios.post('/messages/new', {
            message: input,
            name: "Demo Name",
            timestamp: "Just now!",
            received: false
        });
        // set input to empty after submit
        setInput('');
    };

    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar />

                <div className="chat__headerInfo">
                    <h3>Chat Room</h3>
                    <p>Last seen......</p>
                </div>
                <div className="chat__headerRight">
                    <IconButton>
                        <SearchOutlined />
                    </IconButton>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </div>
            </div>
            <div className="chat__body">
                {messages.map((message) => (
                    <p 
                        className={`chat__message ${(message.received === false) && "chat__receiver"}`}>
                        <span className="chat__name">
                            {message.name}
                        </span>
                        {message.message}
                        <span className="chat__timestamp">
                            {message.timestamp}
                        </span>
                    </p>
                ))}
            </div>

            <div className="chat__footer">
                <IconButton>
                    <InsertEmoticon />
                </IconButton>
                <form>
                    <input value={input} onChange={e => setInput(e.target.value)}
                    placeholder="Type a message"
                        type="text"
                    />
                    <button onClick={sendMessage} type="submit">Send a Message</button>
                </form>
                <IconButton>
                    <MicIcon />
                </IconButton>
            </div>
        </div>
    )
}

export default Chat