import React, { useEffect, useState } from 'react';
import $ from 'jquery';
import Swal from 'sweetalert2'

function Register() {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [type, setType] = useState('');
    const [imgurl, setimgurl] = useState('');

    useEffect(() => {
        const methodGet = new URLSearchParams(window.location.search)

        setType(methodGet.get('type'));
        setEmail(methodGet.get('email'));
        setUsername(methodGet.get('username'));
        setimgurl(methodGet.get('photo_url'));

        console.log(imgurl);
    }, [])

    const register = () => {
        if (!email) {
            document.getElementById('email-inp').className = 'input input-bordered input-error';
        } else if (!username) {
            document.getElementById('username-inp').className = 'input input-bordered input-error';
        } else if (!password) {
            document.getElementById('password-inp').className = 'input input-bordered input-error';
        } else {
            var settings = {
                "url": "https://api-lofi-stu.onrender.com/register?type=1",
                "method": "POST",
                "timeout": 0,
                "headers": {
                    "Content-Type": "application/json"
                },
                "data": JSON.stringify({
                    "username": username,
                    "password": password,
                    "email": email,
                    "url": imgurl // ใช้ค่า imgurl ที่ถูกตั้งค่าผ่าน useEffect
                }),
            };

            $.ajax(settings).done(function (response) {
                console.log(response);
                if (response.status == 200) {
                    window.localStorage.setItem('user', JSON.stringify(response.data));
                    window.location = '/';
                } else {
                    Swal.fire(response.message, '', 'error');
                }
            });
        }
    }

    return (
        <>
            {type == 1 ? (
                <div className="hero min-h-screen">
                    <div className="hero-content flex-col lg:flex-row-reverse">
                        <div className="card flex-shrink-0 w-96 max-w-sm shadow-2xl bg-base-100">
                            <div className="card-body">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">อีเมล</span>
                                    </label>
                                    <input readOnly value={email} type="text" placeholder="อีเมล" onChange={(e) => {
                                        setEmail(e.target.value)
                                    }} className="input input-bordered bg-base-200" />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">ชื่อผู้ใช้</span>
                                    </label>
                                    <input type="text" placeholder="ชื่อผู้ใช้" readOnly value={username} onChange={(e) => {
                                        setUsername(e.target.value)
                                    }} className="input input-bordered bg-base-200" />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">รหัสผ่าน</span>
                                    </label>
                                    <input type="text" placeholder="รหัสผ่าน" onChange={(e) => {
                                        setPassword(e.target.value);
                                    }} className="input input-bordered" id='password-inp' />
                                </div>
                                <div className="form-control mt-6">
                                    <button className="btn btn-primary" onClick={register}>สมัครสมาชิก</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="hero min-h-screen">
                    <div className="hero-content flex-col lg:flex-row-reverse">
                        <div className="card flex-shrink-0 w-96 max-w-sm shadow-2xl bg-base-100">
                            <div className="card-body">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">อีเมล</span>
                                    </label>
                                    <input type="text" id='email-inp' placeholder="อีเมล" onChange={(e) => {
                                        setEmail(e.target.value)
                                    }} className="input input-bordered" />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">ชื่อผู้ใช้</span>
                                    </label>
                                    <input id='username-inp' type="text" placeholder="ชื่อผู้ใช้" onChange={(e) => {
                                        setUsername(e.target.value)
                                    }} className="input input-bordered" />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">รหัสผ่าน</span>
                                    </label>
                                    <input type="text" placeholder="รหัสผ่าน" onChange={(e) => {
                                        setPassword(e.target.value);
                                    }} className="input input-bordered" id='password-inp' />
                                    <label className="label">
                                        <a href="#" className="label-text-alt link link-hover">ลืมรหัสผ่าน</a>
                                    </label>
                                </div>
                                <div className="form-control mt-6">
                                    <button className="btn btn-primary" onClick={register}>สมัครสมาชิก</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Register;