import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import initializeSocket from "../Utils/socketClient.js"
import { useEffect } from 'react';
import { useSelector } from 'react-redux'

const Chat = () => {
    const [newMessage, setNewMessage] = useState("")
    // const [receivedMessages, setReceivedMessages] = useState([]);
    // const [sentMessages, setSentMessages] = useState([]);
    const [messages, setMessages] = useState([]);
    const loginUser = useSelector(state => state.user.value)
    const loginUserId = loginUser?._id
    const { targetUserId } = useParams();
    // console.log("targetUserId", targetUserId)
    const connections = useSelector(state => state.connections.connections)
    const targetUser = connections.filter(user => user._id.toString() === targetUserId.toString())
    // console.log("TargetUser :", targetUser)
    useEffect(() => {
        if (!loginUserId) {
            return
        }
        const socket = initializeSocket(); // Use the imported socket instance
        socket.emit("join_chat", { firstName: loginUser.firstName, targetUserId, loginUserId })

        socket.on("message_Received", ({ firstName, newMessage }) => {
            // console.log(firstName + " : " + newMessage)
            // setReceivedMessages(prev => [...prev, newMessage])
            setMessages(prev => [...prev, newMessage])

        })

        return () => {
            socket.disconnect()
        }
    }, [targetUserId])

    const handleSend = () => {
        const socket = initializeSocket();
        socket.emit("send_message", { firstName: loginUser.firstName, targetUserId, loginUserId, newMessage })
        setNewMessage("")
    }

    return (
        <>
            <div className="chat-container max-w-2/3 mx-auto mt-24 bg-base-300 rounded-box shadow-md h-[85vh] p-4 relative">
                {messages.length > 0 ? messages.map((message, index) => (<div className="chat chat-start" key={index}>
                    <div className="chat-image avatar">
                        <div className="w-10 rounded-full">
                            <img
                                alt="Tailwind CSS chat bubble component"
                                src={targetUser[0]?.profileUrl}
                            />
                        </div>
                    </div>
                    <div className="chat-header">
                        {targetUser[0]?.firstName}
                        <time className="text-xs opacity-50">12:45</time>
                    </div>
                    <div className="chat-bubble bg-base-100">{message}</div>
                    <div className="chat-footer opacity-50">Delivered</div>
                </div>)) : null}
                <div className="chat chat-end">
                    <div className="chat-image avatar">
                        <div className="w-10 rounded-full">
                            <img
                                alt="Tailwind CSS chat bubble component"
                                src={loginUser?.profileUrl}
                            />
                        </div>
                    </div>
                    <div className="chat-header">
                        {loginUser?.firstName}
                        <time className="text-xs opacity-50">12:46</time>
                    </div>
                    <div className="chat-bubble bg-base-100">I hate you!</div>
                    <div className="chat-footer opacity-50">Seen at 12:46</div>
                </div>
                <div className="post-container flex gap-2 items-center absolute bottom-4 left-1/2 transform -translate-x-1/2 w-full px-4">
                    <input type="text" placeholder="Type your message here..." className="input input-bordered w-[90%]" value={newMessage} onChange={e => setNewMessage(e.target.value)} />
                    <button className="btn btn-secondary " onClick={handleSend}>Send</button>
                </div>
            </div>
        </>
    )
}

export default Chat