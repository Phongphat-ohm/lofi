import React, { useState } from 'react';
import { FaMobile } from 'react-icons/fa6';

function Home() {
    return (
        <>
            <div className="h-screen hero">
                <div className="hero-content text-center">
                    <div className="max-w-md">
                        <h1 className="text-5xl font-bold">สวัสดีนี่คือเว็บฟังเพลงสำหรับคนดี</h1>
                        <p className="py-6">เว็บดีๆสำหรับคนดีๆที่นี่เลย</p>
                        <a className="btn btn-primary" href='#start'>เริ่มเลย</a>
                    </div>
                </div>
            </div>

            <div id="start" className=''>
                <br /><br /><br /><br />
                <div>
                    <div className="flex items-center flex-col">
                        <h1 className="text-5xl flex">🤔เรามีอะไรดี</h1>
                        <label className="text-center">What do we have?</label>
                    </div>
                    <div className="container mx-auto px-4 mb-20">
                        <p><label className="" style={{ color: "#f2f2f2" }}>_____</label>จริงๆแล้วจากการสำรวจมาในประเทศไทยเด็กสมัยเรียนจะเป็นผู้ที่ชอบฟังเพลงมากที่สุดจึงทำให้เราเกิดแนวคิดว่าถ้าเราสามารถสร้างเว็บให้นักเรียนฟังเพลง เรียน สอบถาม ปลดปล่อย ได้จะเป็นยังไง ดังนั้นจึงทำให้เกิดโปรเจก LoFI-stu เพื่อทำให้นักเรียนได้ฟังเพลงกันอย่างมีความสุขและสมารถพักหน้าจอฟังได้แบบฟรีๆ</p>
                    </div>
                    <div className="flex items-center flex-col">
                        <h1 className="text-5xl flex">👍🏼ทำไมควรเลือกใช้เรา</h1>
                        <label className="text-center">Why should you choose us?</label>
                    </div>
                    <div className="container mx-auto px-4 flex justify-center mb-28">
                        <p><label className="" style={{ color: "#f2f2f2" }}>_____</label>จริงๆแล้วมันไม่มีอะไรมาหรอกที่คุณควรเลือกใช้เรา มีเพียง 2 ข้อ 1.ฟรี 2.มีความปลอดภัย</p>
                    </div>
                    <div className="flex items-center flex-col">
                        <h1 className="text-2xl text-center">ถ้าคุณพร้อมแแล้วเรามาเริ่ม ฟังเพลง เรียน สอบถาม และ ปลดปล่อยไปพร้อมๆกันเลย</h1>
                        <label className="text-center">Are you ready we can gooooooooo.....</label>
                        <label className="text-center mb-2">กดปุ่มด้านล่างแล้วไปกันเลย</label>
                        <a href="" className="btn"><FaMobile /> App</a>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;