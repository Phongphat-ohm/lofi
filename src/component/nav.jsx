import React, { useState } from 'react';
import { FaArrowRightToBracket, FaDiscord, FaGoogle, FaHouse, FaHouseMedical, FaMobile, FaPhone, FaTrashArrowUp } from 'react-icons/fa6'
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import $, { error } from 'jquery';
import Swal from 'sweetalert2'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

function Nav() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [userData, setUserData] = useState('');

    useState(() => {
        const user = window.localStorage.getItem('user');

        if (user !== 'null' || user !== null) {
            setUserData(JSON.parse(user))
        }
    }, [])

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

    const googleSignin = () => {
        const provider = new GoogleAuthProvider();

        const auth = getAuth(app);

        signInWithPopup(auth, provider).then(result => {
            var settings = {
                "url": `https://api-lofi-stu.onrender.com/user/where?username=${result._tokenResponse.firstName}`,
                "method": "GET",
                "timeout": 0,
            };

            $.ajax(settings).done(function (response) {
                if (response.status == 400) {
                    window.location = '/register?type=1&username=' + result._tokenResponse.firstName + "&email=" + result.user.email + "&photo_url=" + result.user.photoURL;
                } else {
                    console.log(result);
                    if (response.data.status == '1' || response.data.status == 1) {
                        window.localStorage.setItem('user', JSON.stringify(response.data))
                        window.location = '/dashboard'
                    } else {
                        window.localStorage.setItem('user', JSON.stringify(response.data))
                        window.location = '/'
                    }
                }
            });
            // console.log(result._tokenResponse.firstName);
        }).catch(error => {
            console.log(error);
        })
    }

    const login = () => {
        var settings = {
            "url": `https://api-lofi-stu.onrender.com/login/0?username=${username}&password=${password}`,
            "method": "GET",
            "timeout": 0,
        };

        $.ajax(settings).done(function (response) {
            if (response.status == 400) {
                toast.error(response.message)
            } else {
                window.localStorage.setItem('user', JSON.stringify(response.data))
                window.location = '/'
            }
        });
    }

    const logout = () => {
        window.localStorage.setItem('user', null);
        window.location.reload();
    }

    return (
        <>
            <div className="navbar bg-base-200 bg-opacity-80 fixed w-full z-10">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex="0" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex="0" className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            <li><a href='/'><FaHouse /> Home</a></li>
                            <li><a href='/app'><FaMobile /> App</a></li>
                        </ul>
                    </div>
                    <a className="btn btn-ghost normal-case text-xl">LoFI-STU</a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        <li><a href='/'><FaHouse /> Home</a></li>
                        <li><a href='/app'><FaMobile /> App</a></li>
                    </ul>
                </div>
                {userData == null ? (
                    <div className="navbar-end">
                        <a className="btn" onClick={() => {
                            document.getElementById('login_modal').showModal()
                        }}><FaArrowRightToBracket /> Login</a>
                    </div>
                ) : (
                    <div className="navbar-end">
                        <div className="dropdown dropdown-end">
                            <label tabIndex={0} className="btn m-1">ข้อมูลผู้ใช้</label>
                            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-80">
                                <li><a>อีเมล: {userData.email}</a></li>
                                <li><a>ชื่อผู้ใช้: {userData.username}</a></li>
                                <li><a className='text-error' onClick={logout}>ออกจากระบบ</a></li>
                            </ul>
                        </div>
                    </div>
                )}
            </div>
            <dialog id="login_modal" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h3 className="font-bold text-lg">เข้าสู่ระบบ</h3>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">ชื่อผู้ใช้</span>
                        </label>
                        <input type="text" placeholder="ชื่อผู้ใช้" onChange={(e) => {
                            setUsername(e.target.value)
                        }} className="input input-bordered cursor-text" />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">รหัสผ่าน</span>
                        </label>
                        <input type="text" placeholder="รหัสผ่าน" onChange={(e) => {
                            setPassword(e.target.value)
                        }} className="input input-bordered cursor-text" />
                        <label className="label">
                            <a href="#" className="label-text-alt link link-hover">ลืมรหัสผ่าน</a>
                        </label>
                    </div>
                    <div className="form-control mt-4">
                        <button className="btn btn-primary cursor-pointer" onClick={login}>เข้าสู่ระบบ</button>
                    </div>
                    <label className="label">
                        <a href="/register" className="label-text-alt link link-hover">หรือว่าสมัครสมาชิก?</a>
                    </label>
                    <hr className="my-2 divider" />
                    <div className="flex justify-center">
                        <div onClick={googleSignin} className="rounded-full bg-base-300 p-3 text-red-500 mx-3 cursor-pointer">
                            <FaGoogle />
                        </div>
                        <a href='https://discord.com/api/oauth2/authorize?client_id=1153655023956402256&redirect_uri=https%3A%2F%2Flofi-stu.web.app%2Fredirect&response_type=code&scope=identify%20email' className="rounded-full bg-base-300 p-3 text-blue-500 mx-3">
                            <FaDiscord />
                        </a>
                    </div>
                </div>
            </dialog>
            <ToastContainer />
        </>
    );
}

export default Nav;