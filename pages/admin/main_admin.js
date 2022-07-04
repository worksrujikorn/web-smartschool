import React, { useEffect, useState } from "react";
import Clock from 'react-live-clock';
import Sidebar from '../../component/layout/admin/sidebar'
import Nav from '../../component/layout/admin/nav'
import Footer from '../../component/layout/footer'
import Image from 'next/image'
import moment from "moment";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination"
import "swiper/css/navigation"
import SwiperCore, {
    Autoplay, Pagination, Navigation
} from 'swiper';

import { getTestapi } from "../../action/testapi";


import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';



function Main_teacher() {

    const [values, setValues] = useState({

        Hello: "",
        kuy: ""


    })

    const options = {
        maintainAspectRatio: false	// Don't maintain w/h ratio
    }
    const [Open, setOpen] = useState(false)
    const [Enablemorning, setEnablemorning] = useState(true)
    const [Enablelate, setEnablelate] = useState(true)
    const [Enableevening, setEnableevening] = useState(true)

    SwiperCore.use([Autoplay, Pagination, Navigation]);
    ChartJS.register(ArcElement, Tooltip, Legend);



    const data = {
        labels: ['มา', 'ลา', 'ขาด', 'สาย'],
        datasets: [
            {
                label: '# of Votes',
                data: [30, 5, 0, 3],
                backgroundColor: [

                    '#2563EB',
                    '#3B82F6',
                    '#60A5FA',
                    '#93C5FD'
                ],
                // borderColor: [
                //     'rgba(255, 99, 132, 1)',
                //     '#004AAD'
                // ],
                borderWidth: 1,

            },
        ],
    };

    const plugins = [{
        beforeDraw: function (chart) {
            let width = chart.width,
                height = chart.height,
                ctx = chart.ctx;
            ctx.restore();
            let fontSize = (height / 160).toFixed(2);
            ctx.font = fontSize + "em sans-serif";
            ctx.textBaseline = "top";
            let text = "35 คน",
                textX = Math.round((width - ctx.measureText(text).width) / 1.95),
                textY = height / 1.90;
            ctx.fillText(text, textX, textY);
            ctx.save();
        }
    }]

    const Dataload = async () => {
        const Testapi = await getTestapi()

        console.log('test', Testapi);
        values = Testapi;
        // setValues({
        //     Hello: values.Hello,
        //     kuy: values.kuy
        // })
        console.log(values)
    }
    const [THdate, setTHdate] = useState("")
    useEffect(() => {


        Dataload()

        timezone()
    }, [])


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

    const all = (e) => {

        let chk = document.getElementsByClassName('c_all')
        if (e.target.checked == true) {
            for (let index = 0; index < chk.length; index++) {
                chk[index].checked = true

            }
            console.log(e.target.checked);
        } else {
            for (let index = 0; index < chk.length; index++) {
                chk[index].checked = false

            }
            console.log(e.target.checked);
        }

    }

    const handleChange = (name, e) => {
        let chk_all = document.getElementsByClassName('m_all');

        for (let index = 0; index < chk_all.length; index++) {
            chk_all[index].checked = false

        }
        console.log('showfalse', e.target.checked);
        // if (name == 'index1') {

        //     if (e.target.checked == false) {





        //         console.log('showfalse', chk_all.length);
        //     }
        // }
    }
    const enable = (name, e) => {




        if (name == 'morning') {

            if (Enablemorning == false) {
                setEnablemorning(true)
            }
            else if (Enablemorning == true) {
                setEnablemorning(false)
            }
            console.log(Enablemorning);

        }
        else if (name == 'late') {

            if (Enablelate == false) {
                setEnablelate(true)
            }
            else if (Enablelate == true) {
                setEnablelate(false)
            }
            console.log(Enablemorning);

        } else if (name == 'evening') {
            if (Enableevening == false) {
                setEnableevening(true)
            }
            else if (Enableevening == true) {
                setEnableevening(false)
            }
            console.log(Enableevening);

        }

        console.log(name);
    }
    const open = () => {

        setOpen(true)
        if (Open == true) {
            setOpen(false)
        }
        console.log("ส่ง")
    }
  
  


    const [showModal, setShowModal] = useState(false);
    const [showModal1, setShowModal1] = useState(false);

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

                                    {/* {moment(new Date()).format('dddd : DD :MMMM :YYYY').toLocaleDateString("th-TH")}   */}
                                    {THdate}
                                </p>
                            </h1>
                        </div>
                        <div className="flex flex-col ">


                            <h1 className="   text-xl text-right  text-color-blue">
                                <Clock format={'HH:mm:ss'} ticking={true} timezone={'Asia/Bangkok'} />
                            </h1>
                        </div>

                        <div className="flex flex-row">
                            <div className="   text-xl text-center text-color-blue w-full">ข่าวประชาสัมพันธ์</div>

                        </div>
                        <div className="flex flex-row   h-screen ">
                            <div className="w-full  rounded pt-4">
                                <Swiper spaceBetween={30} centeredSlides={true} autoplay={{
                                    "delay": 2500,
                                    "disableOnInteraction": false
                                }} pagination={{
                                    "clickable": true
                                }} navigation={true} className="myswiper">
                                    <SwiperSlide><img src="/img-informaiton/information.jpg" alt="" ></img></SwiperSlide>
                                    <SwiperSlide><img src="/img-informaiton/information_6.jpg" alt="" className=" w-full  h-full"></img></SwiperSlide>
                                    <SwiperSlide><img src="/img-informaiton/information_7.jpg" alt=""></img></SwiperSlide>
                                    <SwiperSlide><img src="/img-informaiton/information_4.png" alt=""></img></SwiperSlide>
                                    <SwiperSlide><img src="/img-informaiton/information_5.png" alt=""></img></SwiperSlide>
                                </Swiper>
                            </div>


                        </div>
                        {/* <div className="flex flex-row mt-4">
                            <div className="w-1/2 text-left text-xl text-blue-800 ">
                                ข้อมูลเช็คชื่อครู

                                <button type="button" onClick={() => setShowModal1(true)} className=" ml-4 border-2 border-blue-800  p-2 rounded-lg  bg-blue-800  text-white  hover:text-blue-800 hover:bg-white  text-sm  ">
                                    เช็คชื่อเข้าแถว
                                </button>
                            </div>

                            <div className="w-1/2 text-left text-xl text-blue-800 ml-4">
                                ข้อมูลการสอน
                                <button type="button" onClick={() => setShowModal(true)} className="ml-4 border-2 border-blue-800  p-2 rounded-lg  bg-blue-800  text-white  hover:text-blue-800 hover:bg-white  text-sm  ">
                                    จัดการเวลา
                                </button>
                            </div>

                        </div> */}
                        {/* <div className="flex flex-row   h-1/2">
                            <div className="  rounded mt-4 w-1/2 border-2 border-blue-600  ">
                                <div className="p-4  h-full">


                                    <div className="flex flex-col  h-full">
                                        <div className=" w-1/2 text-left text-xl text-blue-800  mb-2">
                                            ข้อมูลเช็คชื่อครู
                                        </div>

                                        <p
                                            href="#"
                                            className="flex flex-row items-center h-1/2 px-3 w-full  rounded-lg text-white hover:bg-white  hover:border-blue-600  border-2     hover:text-blue-600 bg-color-blue"
                                        >
                                            <span className=" ml-2 w-1/2">check-in เช้า :</span>
                                            <span className=" text-center  w-2/3 text-xl">07:40</span>
                                        </p>

                                        <a
                                            href="#"
                                            className="flex flex-row items-center h-1/2 px-3  w-full rounded-lg text-white hover:bg-white  hover:border-blue-600  border-2     hover:text-blue-600 bg-color-blue"
                                        >
                                            <span className=" ml-2 w-1/2">check-out เย็น :</span>
                                            <span className=" text-center  w-2/3 text-xl">--:--</span>
                                        </a>
                                    </div>


                                </div>
                            </div>
                            <div className="   rounded mt-4 w-1/2 ml-4 border-2 border-blue-600">
                                <div className="p-4  h-full">

                                    <div className="flex flex-col  h-full">
                                        <div className=" w-1/2 text-left text-xl text-blue-800 mb-2 ">
                                            ข้อมูลการสอน
                                        </div>
                                        <p
                                            href="#"
                                            className="flex flex-row items-center h-1/2 px-3 w-full  rounded-lg text-white hover:bg-white  hover:border-blue-600  border-2     hover:text-blue-600 bg-color-blue"
                                        >
                                            <span className=" ml-2 w-1/2">จำนวนวิชาสอน :</span>
                                            <span className=" text-center  w-2/3 text-xl">8</span>
                                        </p>

                                        <a
                                            href="#"
                                            className="flex flex-row items-center h-1/2 px-3  w-full rounded-lg text-white hover:bg-white  hover:border-blue-600  border-2     hover:text-blue-600 bg-color-blue"
                                        >
                                            <span className=" ml-2 w-1/2">เข้าสอนแล้ว :</span>
                                            <span className=" text-center  w-2/3 text-xl">2</span>
                                        </a>
                                    </div>

                                </div>

                            </div>
                        </div> */}



                    </div>
                    {showModal ? (
                        <>
                            <div
                                className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                            >
                                <div className="relative w-8/12   mt-28 mb-6 mx-auto max-w-4xl  max-h-auto ">
                                    {/*content*/}
                                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                        {/*header*/}
                                        <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t text-color-blue">
                                            <h3 className="text-2xl font-semibold text-center w-full ml-5">
                                                จำนวนนักเรียน ม. 6/2
                                            </h3>
                                            <button
                                                className="p-1 ml-auto bg-transparent border-0 text-black  float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                                onClick={() => setShowModal(false)}
                                            >
                                                <span className="bg-transparent text-black  h-6 w-6 text-2xl block outline-none focus:outline-none">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                                    </svg>
                                                </span>
                                            </button>
                                        </div>
                                        {/*body*/}
                                        <div className="relative p-6 flex-auto  ">




                                            <div className=" w-full h-full border-2 border-blue-800 p-4 text-blue-800 rounded-lg">

                                                <div className="flex flex-row    w-full border-2 border-blue-800 p-4 items-center rounded-lg max-h-96  overflow-y-auto ">
                                                    <table className="w-full text-center  text-sm   mt-4    ">
                                                        <tr >

                                                            <td className=" w-1/12 border-2 border-blue-800" onClick={() => open()}>
                                                                <Image
                                                                    // src="/img-student/student-1.png"
                                                                    src="/img-student/student-2.jpg"
                                                                    alt=""
                                                                    height={60} width={50}
                                                                    layout="responsive" className=" h-auto " />
                                                            </td>
                                                            <td className=" w-1/12 border-2 border-blue-800">
                                                                <Image
                                                                    // src="/img-student/student-1.png"
                                                                    src="/img-student/student-2.jpg"
                                                                    alt=""
                                                                    height={60} width={50}
                                                                    layout="responsive" className=" h-auto " />
                                                            </td>
                                                            <td className=" w-1/12 border-2 border-blue-800">
                                                                <Image
                                                                    // src="/img-student/student-1.png"
                                                                    src="/img-student/student-2.jpg"
                                                                    alt=""
                                                                    height={60} width={50}
                                                                    layout="responsive" className=" h-auto " />
                                                            </td>
                                                            <td className=" w-1/12 border-2 border-blue-800">
                                                                <Image
                                                                    // src="/img-student/student-1.png"
                                                                    src="/img-student/student-2.jpg"
                                                                    alt=""
                                                                    height={60} width={50}
                                                                    layout="responsive" className=" h-auto " />
                                                            </td >
                                                            <td className=" w-1/12 border-2 border-blue-800">
                                                                <Image
                                                                    // src="/img-student/student-1.png"
                                                                    src="/img-student/student-2.jpg"
                                                                    alt=""
                                                                    height={60} width={50}
                                                                    layout="responsive" className=" h-auto " />
                                                            </td >
                                                            <td className=" w-1/12 border-2 border-blue-800">
                                                                <Image
                                                                    // src="/img-student/student-1.png"
                                                                    src="/img-student/student-2.jpg"
                                                                    alt=""
                                                                    height={60} width={50}
                                                                    layout="responsive" className=" h-auto " />
                                                            </td >
                                                            <td className=" w-1/12 border-2 border-blue-800">
                                                                <Image
                                                                    // src="/img-student/student-1.png"
                                                                    src="/img-student/student-2.jpg"
                                                                    alt=""
                                                                    height={60} width={50}
                                                                    layout="responsive" className=" h-auto " />
                                                            </td>
                                                            <td className=" w-1/12 border-2 border-blue-800">
                                                                <Image
                                                                    // src="/img-student/student-1.png"
                                                                    src="/img-student/student-2.jpg"
                                                                    alt=""
                                                                    height={60} width={50}
                                                                    layout="responsive" className=" h-auto " />
                                                            </td>
                                                            <td className=" w-1/12 border-2 border-blue-800">
                                                                <Image
                                                                    // src="/img-student/student-1.png"
                                                                    src="/img-student/student-2.jpg"
                                                                    alt=""
                                                                    height={60} width={50}
                                                                    layout="responsive" className=" h-auto " />
                                                            </td>
                                                            <td className=" w-1/12 border-2 border-blue-800">
                                                                <Image
                                                                    // src="/img-student/student-1.png"
                                                                    src="/img-student/student-2.jpg"
                                                                    alt=""
                                                                    height={60} width={50}
                                                                    layout="responsive" className=" h-auto " />
                                                            </td >

                                                        </tr>
                                                        <tr >
                                                            <td className=" w-1/12 border-2 border-blue-800">
                                                                6011110001
                                                            </td>
                                                            <td className=" w-1/12 border-2 border-blue-800">
                                                                6011110001
                                                            </td>
                                                            <td className=" w-1/12 border-2 border-blue-800">
                                                                6011110001
                                                            </td>
                                                            <td className=" w-1/12 border-2 border-blue-800">
                                                                6011110001
                                                            </td >
                                                            <td className=" w-1/12 border-2 border-blue-800">
                                                                6011110001
                                                            </td >
                                                            <td className=" w-1/12 border-2 border-blue-800">
                                                                6011110001
                                                            </td >
                                                            <td className=" w-1/12 border-2 border-blue-800">
                                                                6011110001
                                                            </td>
                                                            <td className=" w-1/12 border-2 border-blue-800">
                                                                6011110001
                                                            </td>
                                                            <td className=" w-1/12 border-2 border-blue-800">
                                                                6011110001
                                                            </td>
                                                            <td className=" w-1/12 border-2 border-blue-800">
                                                                6011110001
                                                            </td >

                                                        </tr>
                                                        <tr >
                                                            <td className=" w-1/12 border-2 border-blue-800">
                                                                เช้า : --:--
                                                            </td>
                                                            <td className=" w-1/12 border-2 border-blue-800">
                                                                เช้า : --:--
                                                            </td>
                                                            <td className=" w-1/12 border-2 border-blue-800">
                                                                เช้า : --:--
                                                            </td>
                                                            <td className=" w-1/12 border-2 border-blue-800">
                                                                เช้า : --:--
                                                            </td >
                                                            <td className=" w-1/12 border-2 border-blue-800">
                                                                เช้า : --:--
                                                            </td >
                                                            <td className=" w-1/12 border-2 border-blue-800">
                                                                เช้า : --:--
                                                            </td >
                                                            <td className=" w-1/12 border-2 border-blue-800">
                                                                เช้า : --:--
                                                            </td>
                                                            <td className=" w-1/12 border-2 border-blue-800">
                                                                เช้า : --:--
                                                            </td>
                                                            <td className=" w-1/12 border-2 border-blue-800">
                                                                เช้า : --:--
                                                            </td>
                                                            <td className=" w-1/12 border-2 border-blue-800">
                                                                เช้า : --:--
                                                            </td >

                                                        </tr>

                                                        <tr >
                                                            <td className=" w-1/12 border-2 border-blue-800">
                                                                เย็น : --:--
                                                            </td>
                                                            <td className=" w-1/12 border-2 border-blue-800">
                                                                เย็น : --:--
                                                            </td>
                                                            <td className=" w-1/12 border-2 border-blue-800">
                                                                เย็น : --:--
                                                            </td>
                                                            <td className=" w-1/12 border-2 border-blue-800">
                                                                เย็น : --:--
                                                            </td >
                                                            <td className=" w-1/12 border-2 border-blue-800">
                                                                เย็น : --:--
                                                            </td >
                                                            <td className=" w-1/12 border-2 border-blue-800">
                                                                เย็น : --:--
                                                            </td >
                                                            <td className=" w-1/12 border-2 border-blue-800">
                                                                เย็น : --:--
                                                            </td>
                                                            <td className=" w-1/12 border-2 border-blue-800">
                                                                เย็น : --:--
                                                            </td>
                                                            <td className=" w-1/12 border-2 border-blue-800">
                                                                เย็น : --:--
                                                            </td>
                                                            <td className=" w-1/12 border-2 border-blue-800">
                                                                เย็น : --:--
                                                            </td >

                                                        </tr>
                                                        <tr >
                                                            <td className=" w-1/12 border-2 border-blue-800">
                                                                แถว : มา
                                                            </td>
                                                            <td className=" w-1/12 border-2 border-blue-800">
                                                                แถว : ไม่มา
                                                            </td>
                                                            <td className=" w-1/12 border-2 border-blue-800">
                                                                แถว : มา
                                                            </td>
                                                            <td className=" w-1/12 border-2 border-blue-800">
                                                                แถว : มา
                                                            </td >
                                                            <td className=" w-1/12 border-2 border-blue-800">
                                                                แถว : มา
                                                            </td >
                                                            <td className=" w-1/12 border-2 border-blue-800">
                                                                แถว : มา
                                                            </td >
                                                            <td className=" w-1/12 border-2 border-blue-800">
                                                                แถว : มา
                                                            </td>
                                                            <td className=" w-1/12 border-2 border-blue-800">
                                                                แถว : มา
                                                            </td>
                                                            <td className=" w-1/12 border-2 border-blue-800">
                                                                แถว : มา
                                                            </td>
                                                            <td className=" w-1/12 border-2 border-blue-800">
                                                                แถว : มา
                                                            </td >

                                                        </tr>
                                                        <br />
                                                        <tr >
                                                            <td className=" w-1/12 border-2 border-blue-800">
                                                                <Image
                                                                    // src="/img-student/student-1.png"
                                                                    src="/img-student/student-2.jpg"
                                                                    alt=""
                                                                    height={60} width={50}
                                                                    layout="responsive" className=" h-auto " />
                                                            </td>
                                                            <td className=" w-1/12 border-2 border-blue-800">
                                                                <Image
                                                                    // src="/img-student/student-1.png"
                                                                    src="/img-student/student-2.jpg"
                                                                    alt=""
                                                                    height={60} width={50}
                                                                    layout="responsive" className=" h-auto " />
                                                            </td>
                                                            <td className=" w-1/12 border-2 border-blue-800">
                                                                <Image
                                                                    // src="/img-student/student-1.png"
                                                                    src="/img-student/student-2.jpg"
                                                                    alt=""
                                                                    height={60} width={50}
                                                                    layout="responsive" className=" h-auto " />
                                                            </td>
                                                            <td className=" w-1/12 border-2 border-blue-800">
                                                                <Image
                                                                    // src="/img-student/student-1.png"
                                                                    src="/img-student/student-2.jpg"
                                                                    alt=""
                                                                    height={60} width={50}
                                                                    layout="responsive" className=" h-auto " />
                                                            </td >
                                                            <td className=" w-1/12 border-2 border-blue-800">
                                                                <Image
                                                                    // src="/img-student/student-1.png"
                                                                    src="/img-student/student-2.jpg"
                                                                    alt=""
                                                                    height={60} width={50}
                                                                    layout="responsive" className=" h-auto " />
                                                            </td >
                                                            <td className=" w-1/12 border-2 border-blue-800">
                                                                <Image
                                                                    // src="/img-student/student-1.png"
                                                                    src="/img-student/student-2.jpg"
                                                                    alt=""
                                                                    height={60} width={50}
                                                                    layout="responsive" className=" h-auto " />
                                                            </td >
                                                            <td className=" w-1/12 border-2 border-blue-800">
                                                                <Image
                                                                    // src="/img-student/student-1.png"
                                                                    src="/img-student/student-2.jpg"
                                                                    alt=""
                                                                    height={60} width={50}
                                                                    layout="responsive" className=" h-auto " />
                                                            </td>
                                                            <td className=" w-1/12 border-2 border-blue-800">
                                                                <Image
                                                                    // src="/img-student/student-1.png"
                                                                    src="/img-student/student-2.jpg"
                                                                    alt=""
                                                                    height={60} width={50}
                                                                    layout="responsive" className=" h-auto " />
                                                            </td>
                                                            <td className=" w-1/12 border-2 border-blue-800">
                                                                <Image
                                                                    // src="/img-student/student-1.png"
                                                                    src="/img-student/student-2.jpg"
                                                                    alt=""
                                                                    height={60} width={50}
                                                                    layout="responsive" className=" h-auto " />
                                                            </td>
                                                            <td className=" w-1/12 border-2 border-blue-800">
                                                                <Image
                                                                    // src="/img-student/student-1.png"
                                                                    src="/img-student/student-2.jpg"
                                                                    alt=""
                                                                    height={60} width={50}
                                                                    layout="responsive" className=" h-auto " />
                                                            </td >

                                                        </tr>
                                                        <tr >
                                                            <td className=" w-1/12 border-2 border-blue-800">
                                                                6011110001
                                                            </td>
                                                            <td className=" w-1/12 border-2 border-blue-800">
                                                                6011110001
                                                            </td>
                                                            <td className=" w-1/12 border-2 border-blue-800">
                                                                6011110001
                                                            </td>
                                                            <td className=" w-1/12 border-2 border-blue-800">
                                                                6011110001
                                                            </td >
                                                            <td className=" w-1/12 border-2 border-blue-800">
                                                                6011110001
                                                            </td >
                                                            <td className=" w-1/12 border-2 border-blue-800">
                                                                6011110001
                                                            </td >
                                                            <td className=" w-1/12 border-2 border-blue-800">
                                                                6011110001
                                                            </td>
                                                            <td className=" w-1/12 border-2 border-blue-800">
                                                                6011110001
                                                            </td>
                                                            <td className=" w-1/12 border-2 border-blue-800">
                                                                6011110001
                                                            </td>
                                                            <td className=" w-1/12 border-2 border-blue-800">
                                                                6011110001
                                                            </td >

                                                        </tr>
                                                        <tr >
                                                            <td className=" w-1/12 border-2 border-blue-800">
                                                                เช้า : --:--
                                                            </td>
                                                            <td className=" w-1/12 border-2 border-blue-800">
                                                                เช้า : --:--
                                                            </td>
                                                            <td className=" w-1/12 border-2 border-blue-800">
                                                                เช้า : --:--
                                                            </td>
                                                            <td className=" w-1/12 border-2 border-blue-800">
                                                                เช้า : --:--
                                                            </td >
                                                            <td className=" w-1/12 border-2 border-blue-800">
                                                                เช้า : --:--
                                                            </td >
                                                            <td className=" w-1/12 border-2 border-blue-800">
                                                                เช้า : --:--
                                                            </td >
                                                            <td className=" w-1/12 border-2 border-blue-800">
                                                                เช้า : --:--
                                                            </td>
                                                            <td className=" w-1/12 border-2 border-blue-800">
                                                                เช้า : --:--
                                                            </td>
                                                            <td className=" w-1/12 border-2 border-blue-800">
                                                                เช้า : --:--
                                                            </td>
                                                            <td className=" w-1/12 border-2 border-blue-800">
                                                                เช้า : --:--
                                                            </td >

                                                        </tr>

                                                        <tr >
                                                            <td className=" w-1/12 border-2 border-blue-800">
                                                                เย็น : --:--
                                                            </td>
                                                            <td className=" w-1/12 border-2 border-blue-800">
                                                                เย็น : --:--
                                                            </td>
                                                            <td className=" w-1/12 border-2 border-blue-800">
                                                                เย็น : --:--
                                                            </td>
                                                            <td className=" w-1/12 border-2 border-blue-800">
                                                                เย็น : --:--
                                                            </td >
                                                            <td className=" w-1/12 border-2 border-blue-800">
                                                                เย็น : --:--
                                                            </td >
                                                            <td className=" w-1/12 border-2 border-blue-800">
                                                                เย็น : --:--
                                                            </td >
                                                            <td className=" w-1/12 border-2 border-blue-800">
                                                                เย็น : --:--
                                                            </td>
                                                            <td className=" w-1/12 border-2 border-blue-800">
                                                                เย็น : --:--
                                                            </td>
                                                            <td className=" w-1/12 border-2 border-blue-800">
                                                                เย็น : --:--
                                                            </td>
                                                            <td className=" w-1/12 border-2 border-blue-800">
                                                                เย็น : --:--
                                                            </td >

                                                        </tr>
                                                        <tr >
                                                            <td className=" w-1/12 border-2 border-blue-800">
                                                                แถว : มา
                                                            </td>
                                                            <td className=" w-1/12 border-2 border-blue-800">
                                                                แถว : มา
                                                            </td>
                                                            <td className=" w-1/12 border-2 border-blue-800">
                                                                แถว : มา
                                                            </td>
                                                            <td className=" w-1/12 border-2 border-blue-800">
                                                                แถว : มา
                                                            </td >
                                                            <td className=" w-1/12 border-2 border-blue-800">
                                                                แถว : มา
                                                            </td >
                                                            <td className=" w-1/12 border-2 border-blue-800">
                                                                แถว : มา
                                                            </td >
                                                            <td className=" w-1/12 border-2 border-blue-800">
                                                                แถว : มา
                                                            </td>
                                                            <td className=" w-1/12 border-2 border-blue-800">
                                                                แถว : มา
                                                            </td>
                                                            <td className=" w-1/12 border-2 border-blue-800">
                                                                แถว : มา
                                                            </td>
                                                            <td className=" w-1/12 border-2 border-blue-800">
                                                                แถว : มา
                                                            </td >

                                                        </tr>
                                                    </table>



                                                </div>
                                                <div className="mb-2" ></div>

                                                <div className="  h-48 border-2 border-blue-800 rounded-lg">
                                                    {Open ? (
                                                        <><div className="ml-4 mt-4 ">แก้ไขเวลาของนักเรียน</div><div className=" flex flex-wrap items-stretch  w-3/6 mx-4 my-4 relative ">
                                                            <div className="flex ">
                                                                <span className=" w-28 flex items-center leading-normal  rounded rounded-r-none   bg-blue-800 px-3 whitespace-no-wrap text-grey-dark text-sm   text-white">

                                                                    check-in เช้า :
                                                                </span>
                                                            </div>
                                                            <input type="time" className="   outline-none flex-shrink flex-grow flex-auto leading-normal w-px  border h-10 border-grey-light rounded rounded-l-none px-3 relative focus:border-blue focus:shadow" disabled={Enablemorning} />
                                                            <button type="button" onClick={(e) => { enable('morning') }} className="  hover:bg-yellow-500 m-auto p-2 rounded-lg ml-4  hover:text-white  text-yellow-500 border-2  border-yellow-500 bg-white  ">
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 " fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />

                                                                </svg>



                                                            </button>
                                                        </div>
                                                            {/* <div className="flex flex-wrap items-stretch  w-3/6 mx-4 my-2 relative ">
                                                                <div className="flex ">
                                                                    <span className=" w-28 flex items-center leading-normal  rounded rounded-r-none   bg-blue-800 px-3 whitespace-no-wrap text-grey-dark text-sm   text-white">

                                                                        check-in แถว :
                                                                    </span>
                                                                </div>
                                                                <input type="time" className="   outline-none flex-shrink flex-grow flex-auto leading-normal w-px  border h-10 border-grey-light rounded rounded-l-none px-3 relative focus:border-blue focus:shadow" disabled={Enablelate} />
                                                                <button type="button" onClick={(e) => { enable('late') }} className="  bg-yellow-500 m-auto p-2 rounded-lg ml-4  text-white  hover:text-yellow-500 border-2 border-yellow-500 hover:bg-white  ">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 " fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />

                                                                    </svg>



                                                                </button>
                                                            </div> */}
                                                            <div className="flex flex-wrap items-stretch  w-3/6 mx-4 my-4 relative ">
                                                                <div className="flex ">
                                                                    <span className="   w-28 flex items-center leading-normal  rounded rounded-r-none   bg-blue-800 px-3 whitespace-no-wrap text-grey-dark text-sm   text-white">

                                                                        check-in เย็น :
                                                                    </span>
                                                                </div>
                                                                <input type="time" className="   outline-none flex-shrink flex-grow flex-auto leading-normal w-px  border h-10 border-grey-light rounded rounded-l-none px-3 relative focus:border-blue focus:shadow" disabled={Enableevening} />
                                                                <button type="button" onClick={(e) => { enable('evening') }} className="  hover:bg-yellow-500 m-auto p-2 rounded-lg ml-4  hover:text-white  text-yellow-500 border-2  border-yellow-500 bg-white  ">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 " fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />

                                                                    </svg>



                                                                </button>
                                                            </div></>
                                                    ) : ""}
                                                </div>


                                            </div>



                                        </div>
                                        {/*footer*/}
                                        <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                                            <button
                                                className=" shadow hover:shadow-lg text-white bg-red-600 hover:text-red-600   border-2   border-white hover:border-red-600  hover:bg-white rounded-lg background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                type="button"
                                                onClick={() => setShowModal(false)}
                                            >
                                                ยกเลิก
                                            </button>
                                            <button
                                                className=" shadow hover:shadow-lg text-white bg-green-600 hover:text-green-600   border-2   border-white hover:border-green-600  hover:bg-white rounded-lg background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                type="button"
                                                onClick={() => setShowModal(false)}
                                            >
                                                บันทึก
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                        </>
                    ) : ""}

                    {showModal1 ? (
                        <>
                            <div
                                className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                            >
                                <div className="relative w-8/12   mt-28 mb-6 mx-auto max-w-4xl  max-h-auto ">
                                    {/*content*/}
                                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                        {/*header*/}
                                        <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t text-color-blue">
                                            <h3 className="text-2xl font-semibold text-center w-full ml-5">
                                                เช็คชื่อเข้าแถว ม. 6/2
                                            </h3>
                                            <button
                                                className="p-1 ml-auto bg-transparent border-0 text-black  float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                                onClick={() => setShowModal1(false)}
                                            >
                                                <span className="bg-transparent text-black  h-6 w-6 text-2xl block outline-none focus:outline-none">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                                    </svg>
                                                </span>
                                            </button>
                                        </div>
                                        {/*body*/}
                                        <div className="relative p-6 flex-auto  ">




                                            <div className=" w-full h-full   p-4 text-blue-800 rounded-lg">

                                                <div className="flex flex-row    w-full border-2 border-blue-800 p-4 items-center rounded-lg max-h-96  overflow-y-auto ">
                                                    <table className="w-full text-center  text-sm   max-h-40     mt-36    ">
                                                        <tr>

                                                            <th className=" w-1/12 border-2 border-blue-800 ">
                                                                รูป
                                                            </th>
                                                            <th className=" w-1/12 border-2 border-blue-800">
                                                                รหัสนักเรียน
                                                            </th>
                                                            <th className=" w-1/12 border-2 border-blue-800">
                                                                ชื่อ-นามสกุล
                                                            </th>
                                                            <th className=" w-1/12 border-2 border-blue-800">

                                                                <div className="flex items-center justify-center w-full  p-2">

                                                                    <label
                                                                        for="toogleAll"
                                                                        className="flex items-center cursor-pointer"
                                                                    >
                                                                        {/* <!-- toggle --> */}
                                                                        <div className="relative">
                                                                            {/* <!-- input --> */}
                                                                            <input id="toogleAll" type="checkbox" className="sr-only m_all mt-2" onChange={(e) => all(e)} />
                                                                            {/* <!-- line --> */}
                                                                            <div className="w-10 h-4 bg-gray-400 rounded-full shadow-inner"></div>
                                                                            {/* <!-- dot --> */}
                                                                            <div className="dot absolute w-6 h-6 bg-white rounded-full shadow -left-1 -top-1 transition"></div>
                                                                        </div>

                                                                    </label>

                                                                </div>



                                                            </th>
                                                        </tr>
                                                        <tr >

                                                            <td className=" w-1/12 border-2 border-blue-800 text-center">
                                                                <img src="/img-student/student-2.jpg" alt="" className=" h-32 w-32  m-auto">
                                                                </img>
                                                            </td>

                                                            <td className=" w-1/12 border-2 border-blue-800">
                                                                6011110001
                                                            </td>
                                                            <td className=" w-1/12 border-2 border-blue-800">
                                                                รุจิกร โถสโมสร

                                                            </td>
                                                            <td className=" w-1/12 border-2 border-blue-800">

                                                                {/* <!-- Toggle A --> */}
                                                                <div className="flex items-center justify-center w-full my-2 ">

                                                                    <label
                                                                        for="toogle1"
                                                                        className="flex items-center cursor-pointer"
                                                                    >
                                                                        {/* <!-- toggle --> */}
                                                                        <div className="relative">
                                                                            {/* <!-- input --> */}
                                                                            <input id="toogle1" type="checkbox" className="sr-only c_all mt-2" onChange={(e) => handleChange('index1', e)} />
                                                                            {/* <!-- line --> */}
                                                                            <div className="w-10 h-4 bg-gray-400 rounded-full shadow-inner"></div>
                                                                            {/* <!-- dot --> */}
                                                                            <div className="dot absolute w-6 h-6 bg-white rounded-full shadow -left-1 -top-1 transition"></div>
                                                                        </div>

                                                                    </label>

                                                                </div>






                                                            </td>
                                                        </tr>
                                                        <tr >


                                                            <td className=" w-1/12 border-2 border-blue-800 text-center">
                                                                <img src="/img-student/student-2.jpg" alt="" className=" h-32 w-32  m-auto">
                                                                </img>
                                                            </td>

                                                            <td className=" w-1/12 border-2 border-blue-800">
                                                                6011110001
                                                            </td>
                                                            <td className=" w-1/12 border-2 border-blue-800">
                                                                รุจิกร โถสโมสร
                                                            </td>
                                                            <td className=" w-1/12 border-2 border-blue-800 text-center">
                                                                <div className="flex items-center justify-center w-full my-2 ">

                                                                    <label
                                                                        for="toogle2"
                                                                        className="flex items-center cursor-pointer"
                                                                    >
                                                                        {/* <!-- toggle --> */}
                                                                        <div className="relative">
                                                                            {/* <!-- input --> */}
                                                                            <input id="toogle2" type="checkbox" className="sr-only c_all mt-2" onChange={(e) => handleChange('index2', e)} />
                                                                            {/* <!-- line --> */}
                                                                            <div className="w-10 h-4 bg-gray-400 rounded-full shadow-inner"></div>
                                                                            {/* <!-- dot --> */}
                                                                            <div className="dot absolute w-6 h-6 bg-white rounded-full shadow -left-1 -top-1 transition"></div>
                                                                        </div>

                                                                    </label>

                                                                </div>
                                                            </td>
                                                        </tr>
                                                        <tr >


                                                            <td className=" w-1/12 border-2 border-blue-800 text-center">
                                                                <img src="/img-student/student-2.jpg" alt="" className=" h-32 w-32  m-auto">
                                                                </img>
                                                            </td>

                                                            <td className=" w-1/12 border-2 border-blue-800">
                                                                6011110001
                                                            </td>
                                                            <td className=" w-1/12 border-2 border-blue-800">
                                                                รุจิกร โถสโมสร
                                                            </td>
                                                            <td className=" w-1/12 border-2 border-blue-800 text-center">
                                                                <div className="flex items-center justify-center w-full my-2 ">

                                                                    <label
                                                                        for="toogle3"
                                                                        className="flex items-center cursor-pointer"
                                                                    >
                                                                        {/* <!-- toggle --> */}
                                                                        <div className="relative">
                                                                            {/* <!-- input --> */}
                                                                            <input id="toogle3" type="checkbox" className="sr-only c_all mt-2" onChange={(e) => handleChange('index3', e)} />
                                                                            {/* <!-- line --> */}
                                                                            <div className="w-10 h-4 bg-gray-400 rounded-full shadow-inner"></div>
                                                                            {/* <!-- dot --> */}
                                                                            <div className="dot absolute w-6 h-6 bg-white rounded-full shadow -left-1 -top-1 transition"></div>
                                                                        </div>

                                                                    </label>

                                                                </div>
                                                            </td>
                                                        </tr>
                                                        <br />


                                                    </table>



                                                </div>



                                            </div>



                                        </div>
                                        {/*footer*/}
                                        <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                                            <button
                                                className=" shadow hover:shadow-lg text-white bg-red-600 hover:text-red-600   border-2   border-white hover:border-red-600  hover:bg-white rounded-lg background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                type="button"
                                                onClick={() => setShowModal1(false)}
                                            >
                                                ยกเลิก
                                            </button>
                                            <button
                                                className=" shadow hover:shadow-lg text-white bg-green-600 hover:text-green-600   border-2   border-white hover:border-green-600  hover:bg-white rounded-lg background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                type="button"
                                                onClick={() => setShowModal1(false)}
                                            >
                                                บันทึก
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                        </>
                    ) : ""}
                    <Footer></Footer>

                </main>
            </div>
        </div>
    )
}

export default Main_teacher
