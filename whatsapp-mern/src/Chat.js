import { Avatar, Icon, IconButton } from '@material-ui/core'
import { AttachFile, InsertEmoticon, Message, MoreVert, SearchOutlined, SettingsInputAntenna } from '@material-ui/icons'
import MicIcon from '@material-ui/icons/Mic'
import React from 'react'
import './Chat.css'

function Chat() {
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
                <p className="chat__message">
                    <span className="chat__name">
                        Abdul
                    </span>
                    This is a message
                    <span className="chat__timestamp">
                        {new Date().toUTCString()}
                    </span>
                </p>

                <p className="chat__receiver chat__message">
                    <span className="chat__name">
                        Abdul
                    </span>
                    This is a message
                    <span className="chat__timestamp">
                        {new Date().toUTCString()}
                    </span>
                </p>

            </div>
            <div className="chat__footer">
                <IconButton>
                    <InsertEmoticon />
                </IconButton>
                <form>
                    <input placeholder="Type a message"
                        type="text"
                    />
                    <button type="submit"></button>
                </form>
                <IconButton>
                    <MicIcon />
                </IconButton>

            </div>
        </div>
    )
}

export default Chat