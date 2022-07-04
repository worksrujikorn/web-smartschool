import React, { useEffect, useState, useRef } from "react";
import Clock from 'react-live-clock';
import moment from "moment";
import Sidebar from '../../component/layout/student/sidebar'
import Nav from '../../component/layout/student/nav'
import Footer from '../../component/layout/footer'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination"
import "swiper/css/navigation"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Takephoto() {

    const [Hours, setHours] = useState(false)
    const [Day, setDay] = useState(true)

    const [StartDate, setStartDate] = useState(new Date());
    const [EndDate, setEndDate] = useState(new Date());
    const [values, setValues] = useState({


    })


    const [THdate, setTHdate] = useState("")


    const timezone = () => {

        const result = new Date().toLocaleDateString('th-TH', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            weekday: 'long',
        })

        setTHdate(result);
        console.log(result)

    }


    const open = async () => {
        let video = document.querySelector("#video");
        let stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
        video.srcObject = stream;
        video.play();
    }
    const save = async () => {
        let canvas = document.querySelector("#canvas");
        canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
        let image_data_url = canvas.toDataURL('image/jpeg');

        // data url of the image
        console.log(canvas)
        console.log(image_data_url);
    }
    useEffect(() => {
        

        

        timezone()
    }, [])
    return (
        <div>
            <div className="flex flex-row min-h-screen bg-gray-100 text-gray-800 ">


                <Sidebar></Sidebar>

                <main className="main w-4/5 flex flex-col flex-grow -ml-64 md:ml-0 transition-all duration-150 ease-in">
                    <Nav></Nav>
                    <div className="main-content flex flex-col flex-grow p-4">
                        <div className="flex md-4">

                            <h1 className="  w-3/4 text-xl text-center text-color-blue"></h1>
                            <h1 className="  w-1/4 text-xl text-right  text-color-blue">
                                <p >


                                    {THdate}
                                </p>
                            </h1>
                        </div>
                        <div className="flex flex-col ">


                            <h1 className="   text-xl text-right  text-color-blue">
                                <Clock format={'HH:mm:ss'} ticking={true} timezone={'Asia/Bangkok'} />
                            </h1>
                        </div>

                        <h1 className="   text-xl text-center text-color-blue mb-4">ถ่ายรูป</h1>
                        <div className="flex w-full  flex-col">

                            <button onClick={() => open()} id="start-camera">Start Camera</button>
                            <video id="video" width="320" height="240" autoplay></video>
                            <button onClick={() => save()} id="click-photo">Click Photo</button>
                            <canvas id="canvas" width="320" height="240"></canvas>

                        </div>


                    </div>


                    <Footer></Footer>
                </main>


            </div >
        </div >
    )
}

export default Takephoto
