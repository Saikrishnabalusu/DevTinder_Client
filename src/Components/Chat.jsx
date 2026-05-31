import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import initializeSocket from "../Utils/socketClient.js"
import { useEffect } from 'react';
import { useSelector } from 'react-redux'
import { BASE_URL } from '../Utils/constants.js';
import axios from "axios"

const Chat = () => {
    const [newMessage, setNewMessage] = useState("")
    const [messages, setMessages] = useState([]);
    const loginUser = useSelector(state => state.user.value)
    const loginUserId = loginUser?._id
    const { targetUserId } = useParams();
    // console.log("targetUserId", targetUserId)
    const connections = useSelector(state => state.connections.connections)
    const targetUser = connections.filter(user => user._id.toString() === targetUserId.toString())
    console.log("target User = ", targetUser)


    useEffect(() => {
        // this effect to establish the socket connection
        if (!loginUserId) {
            return
        }
        const socket = initializeSocket(); // Use the imported socket instance
        socket.emit("join_chat", { firstName: loginUser.firstName, targetUserId, loginUserId })

        socket.on("message_Received", ({ senderId, newMessage }) => {
            // console.log(firstName + " : " + newMessage)
            // setReceivedMessages(prev => [...prev, newMessage])
            setMessages(prev => [...prev, { senderId, text: newMessage }])

        })

        return () => {
            socket.disconnect()
        }
    }, [targetUserId, loginUserId])

    useEffect(() => {
        if (!targetUserId || !loginUserId) return;
        // this is to find the chat and get the existing messages
        const getMessages = async () => {
            const chat = await axios.get(`${BASE_URL}/chat/${targetUserId}`, { withCredentials: true })
            console.log("chat = ", chat.data.data?.messages)
            setMessages(chat?.data?.data?.messages)
        }

        getMessages()
    }, [targetUserId, loginUserId])


    const handleSend = () => {
        const socket = initializeSocket();
        socket.emit("send_message", { firstName: loginUser.firstName, targetUserId, loginUserId, profileUrl: loginUser.profileUrl, newMessage })
        setNewMessage("")
    }

    return (
        <>
            {/* <div className="chat-container max-w-2/3 mx-auto mt-24 bg-base-300 rounded-box shadow-md h-[85vh] p-4 relative flex flex-col ">
                {messages?.length > 0 ? messages.map((message, index) => (<div className={"chat " + (message.senderId._id.toString() === loginUserId.toString() ? " chat-end" : " chat-start")} key={index}>
                    <div className="chat-image avatar">
                        <div className="w-10 rounded-full">
                            <img
                                alt="Tailwind CSS chat bubble component"
                                src={message?.senderId?.profileUrl}
                            />
                        </div>
                    </div>
                    <div className="chat-header">
                        {message?.senderId?.firstName}
                        <time className="text-xs opacity-50">12:45</time>
                    </div>
                    <div className="chat-bubble bg-base-100">{message?.text}</div>
                    <div className="chat-footer opacity-50">Delivered</div>
                </div>)) : null}

                <div className="post-container flex gap-2 items-center absolute bottom-4 left-1/2 transform -translate-x-1/2 w-full px-4">
                    <input type="text" placeholder="Type your message here..." className="input input-bordered w-[90%]" value={newMessage} onChange={e => setNewMessage(e.target.value)} />
                    <button className="btn btn-secondary " onClick={handleSend}>Send</button>
                </div>
            </div> */}
            <div className="chat-container max-w-2/3 mx-auto mt-24 bg-base-300 rounded-box shadow-md h-[85vh] flex flex-col">
                <div className="chatTitle font-semibold w-full h-14 bg-primary text-2xl text-left flex items-center px-4">{targetUser[0]?.firstName}</div>
                <div className="flex-1 overflow-y-auto p-4">
                    {messages?.map((message, index) => (
                        <div
                            key={index}
                            className={
                                "chat " +
                                (message.senderId._id.toString() === loginUserId.toString()
                                    ? "chat-end"
                                    : "chat-start")
                            }
                        >
                            <div className="chat-image avatar">
                                <div className="w-10 rounded-full">
                                    <img
                                        alt="Tailwind CSS chat bubble component"
                                        src={message?.senderId?.profileUrl}
                                    />
                                </div>
                            </div>
                            <div className="chat-header">
                                {message?.senderId?.firstName}
                                <time className="text-xs opacity-50">12:45</time>
                            </div>
                            <div className="chat-bubble bg-base-100">{message?.text}</div>
                            <div className="chat-footer opacity-50">Delivered</div>
                        </div>
                    ))}
                </div>

                <div className="post-container flex gap-2 items-center p-4 border-t border-base-content/10">
                    <input
                        type="text"
                        placeholder="Type your message here..."
                        className="input input-bordered flex-1"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                    />
                    <button
                        className="btn btn-secondary"
                        onClick={handleSend}
                    >
                        Send
                    </button>
                </div>

            </div>
        </>
    )
}

export default Chat