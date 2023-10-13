import React, { useEffect, useState } from 'react';
import { BsSendFill } from 'react-icons/bs';
import './dashboard.css';
import { useList } from 'react-firebase-hooks/database';
import { getDatabase, ref, push } from 'firebase/database';
import { initializeApp } from "firebase/app";
import { onChildAdded } from 'firebase/database';
import { BsPerson, BsServer, BsDatabase, BsWifi } from 'react-icons/bs';
import $ from 'jquery'
import Nav from '../component/nav';

const firebaseConfig = {
    apiKey: "AIzaSyB6hMrSlgJZMvEej61cXEaHhjVsG0FwwlI",
    authDomain: "lofi-stu.firebaseapp.com",
    databaseURL: "https://lofi-stu-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "lofi-stu",
    storageBucket: "lofi-stu.appspot.com",
    messagingSenderId: "495811512979",
    appId: "1:495811512979:web:3e999deff924c934ae1b66",
    measurementId: "G-6LEFT4S5VT"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

function DhHome() {
    const [message, setMessage] = useState('');
    const [snapshots, loading, error] = useList(ref(db, 'messages'));
    const [chatMessages, setChatMessages] = useState([]);
    const [username, setUsername] = useState('');
    const [userCount, setUserCount] = useState(0);

    useEffect(() => {
        const user = JSON.parse(window.localStorage.getItem('user')) || { username: 'adminnnn', image: 'man.png' };
        setUsername(user.username);

        if (user.status == 0) {
            window.location = '/'
        }

        var settings = {
            "url": "https://lofi-stu-default-rtdb.asia-southeast1.firebasedatabase.app/users.json",
            "method": "GET",
            "timeout": 0,
        };

        $.ajax(settings).done(function (response) {
            const objectLength = Object.keys(response).length;
            setUserCount(objectLength)
        });

        setChatMessages([]);

        const messagesRef = ref(db, 'messages');

        onChildAdded(messagesRef, (snapshot) => {
            const newMessage = { key: snapshot.key, ...snapshot.val() };

            if (!chatMessages.some((message) => message.key === newMessage.key)) {
                setChatMessages((prevMessages) => [...prevMessages, newMessage]);
            }
        });
    }, [db]);


    const sendMessage = () => {
        const user = JSON.parse(window.localStorage.getItem('user')) || { username: 'Admin', image: 'man.png' };
        const date = new Date();

        if (message.trim() !== '') {
            const messagesRef = ref(db, 'messages');
            push(messagesRef, {
                text: message,
                author: {
                    name: user.username,
                    photo: user.image
                },
                time_stamp: `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
            });
            setMessage('');
            document.getElementById('inp-message').value = '';
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className="h-screen max-sm:h-auto">
            <Nav />
            <br /><br /><br /><br />
            <div className="container mx-auto px-5">
                <div className="grid grid-cols-4 max-sm:grid-cols-1">
                    <div className="card shadow m-2">
                        <div className="card-body flex">
                            <div className="stats">
                                <div className="stat">
                                    <div className="stat-title">จำนวนสมาชิก</div>
                                    <div className="stat-value font-mono text-5xl">{userCount}</div>
                                    <div className="stat-desc">คน</div>
                                </div>
                                <div className="text-7xl rounded-full bg-blue-500 text-white p-3 h-auto flex justify-center items-center border-none">
                                    <BsPerson />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card shadow m-2">
                        <div className="card-body flex">
                            <div className="stats">
                                <div className="stat">
                                    <div className="stat-title">สถานะ server</div>
                                    <div className="stat-value font-mono text-5xl">ON</div>
                                    <div className="stat-desc"></div>
                                </div>
                                <div className="text-7xl rounded-full bg-green-400 text-white p-3 h-auto flex justify-center items-center border-none">
                                    <BsServer />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card shadow m-2">
                        <div className="card-body flex">
                            <div className="stats">
                                <div className="stat">
                                    <div className="stat-title">สถานะ Database</div>
                                    <div className="stat-value font-mono text-5xl">ON</div>
                                    <div className="stat-desc"></div>
                                </div>
                                <div className="text-7xl rounded-full bg-yellow-300 text-white p-3 px-4 h-auto flex justify-center items-center border-none">
                                    <BsDatabase />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card shadow m-2">
                        <div className="card-body flex">
                            <div className="stats">
                                <div className="stat">
                                    <div className="stat-title">สถานะ websocket</div>
                                    <div className="stat-value font-mono text-5xl">ON</div>
                                    <div className="stat-desc"></div>
                                </div>
                                <div className="text-5xl rounded-full bg-pink-400 text-white w-30 px-8 h-auto flex justify-center items-center border-none">
                                    <BsWifi />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-gray-200 rounded border-2 border-slate-500 mt-3" style={{ height: '60vh' }}>
                    <div style={{ height: "51.5vh" }} className='overflow-y-scroll p-2' id='chat-container'>
                        {chatMessages.map((result, index) => (
                            <div key={index} className={result.author.name === username ? "chat chat-end" : "chat chat-start"}>
                                <div className="chat-image avatar">
                                    <div className="w-10 rounded-full">
                                        <img src={result.author.photo} alt="Avatar" />
                                    </div>
                                </div>
                                <div className="chat-header">
                                    {result.author.name}
                                </div>
                                <div className="chat-bubble">{result.text}</div>
                                <div className="chat-footer opacity-50">
                                    {result.time_stamp}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="p-2 flex">
                        <input
                            onChange={(e) => {
                                setMessage(e.target.value);
                            }}
                            type="text"
                            className='input input-bordered'
                            style={{
                                width: "90%"
                            }}
                            id='inp-message'
                            onKeyDown={(e) => {
                                if (e.code == "Enter") {
                                    sendMessage()
                                }
                            }}
                        />
                        <button
                            className='btn text-white btn-success ml-3 flex'
                            style={{
                                width: "13%"
                            }}
                            onClick={sendMessage}
                        >
                            <BsSendFill /> Send Message
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DhHome;
