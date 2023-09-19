import React, { useEffect, useState } from 'react';
import axios from 'axios';
import * as config from './config.json';

function Redirect() {
    useEffect(() => {
        function getUserData(accessToken) {
            const headers = {
                Authorization: `Bearer ${accessToken}`,
            };

            fetch('https://discord.com/api/users/@me', { headers })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('ไม่สามารถดึงข้อมูลผู้ใช้ได้');
                    }
                    return response.json();
                })
                .then((userData) => {
                    console.log('ข้อมูลผู้ใช้:', userData);
                })
                .catch((error) => {
                    console.error('เกิดข้อผิดพลาดในการดึงข้อมูลผู้ใช้:', error);
                });
        }

        const methodGet = new URLSearchParams(window.location.search)
        const code = methodGet.get('code');

        if (code) {
            const tokenRequest = {
                method: "POST",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    client_id: config.client_id,
                    client_secret: config.client_secret,
                    code: code,
                    grant_type: 'authorization_code',
                    redirect_uri: config.redirect_uri,
                }).toString(),
            }

            fetch('https://discord.com/api/oauth2/token', tokenRequest)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('ไม่สามารถรับโทเคนได้');
                    }
                    return response.json();
                })
                .then((tokenData) => {
                    const accessToken = tokenData.access_token;

                    getUserData(accessToken);
                    console.log('รับ accessToken:', accessToken);
                })
                .catch((error) => {
                    console.error('เกิดข้อผิดพลาด:', error);
                });
        }
    }, [])

    return (
        <>
            <div className="h-screen flex justify-center items-center flex-col">
                <label className="my-2">กำลังโหลดข้อมูลรอสักครู่ (ห้าม reload page)</label>
                <span className="loading loading-dots loading-lg"></span>
            </div>
        </>
    );
}

export default Redirect;