import React, { useEffect, useState } from "react";
import Image from 'next/image'
import Clock from 'react-live-clock';
import moment from "moment";
import Sidebar from '../../component/layout/student/sidebar'
import Nav from '../../component/layout/student/nav'
import Footer from '../../component/layout/footer'
import { Swiper, SwiperSlide } from "swiper/react";

import { getnews, getnewsbyone, postnewsstatus, postreadnews } from '../../action/news'
import "swiper/css";
import "swiper/css/pagination"
import "swiper/css/navigation"


function Information() {

    const [Send, setSend] = useState(false)
    const [Unsend, setUnsend] = useState(true)
    const [showModal, setShowModal] = useState(false);
    const [newsmap, setnewsmap] = useState(false);
    const [values, setValues] = useState({


    })




    const [THdate, setTHdate] = useState("")
    const [ChkNews, setChkNews] = useState(0);
    useEffect(() => {


        timezone()
    }, [])

    const newsclick = async (i) => {
        setValues(newsmap[i])
        setShowModal(true)
        let varead = {
            news_code: newsmap[i].news_code,
            login_code: localStorage.getItem("LoginId")
        }

        console.log(varead)
        let vap = await postreadnews(varead)
        console.log('vap', vap)
    }

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

    const unsend = () => {
        setUnsend(true)
        setSend(false)
        console.log("ยังไม่ส่ง")
    }
    const send = () => {
        setUnsend(false)
        setSend(true)
        console.log("ส่ง")
    }

    const Dataload = async () => {

        console.log(values)
        let va = {
            login_code: localStorage.getItem("LoginId")
        }
        console.log('vavavavavava', va)
        let data = await postnewsstatus(va)
        setnewsmap(data)
        console.log('daaaaa', data)
    }
    const CancelClick = async () => {
        let va = {
            login_code: localStorage.getItem("LoginId")
        }
        let data = await postnewsstatus(va)

        let chk_news = data.filter((x) => x.newsnoti_status == 0).length;
        setChkNews(chk_news);
        setnewsmap(data)
        setShowModal(false);
    }
    useEffect(async () => {

        Dataload();
    }, [])





    return (
        <div>
            <div className="flex flex-row min-h-screen bg-gray-100 text-gray-800 ">


                <Sidebar ChkNews={ChkNews}></Sidebar>

                <main className="flex flex-col flex-grow w-full transition-all duration-150 ease-in md:w-4/5 main md:ml-0">
                    <Nav></Nav>
                    <div className="ml-12">
                        <div className="main-content flex flex-col flex-grow p-4">
                            <div className="flex md-4">

                                <h1 className=" lg:w-3/4 w-1/4  lg:text-xl text-base text-center text-color-blue"></h1>
                                <h1 className="lg:w-1/4 w-3/4 lg:text-xl text-base text-right  text-color-blue">
                                    <p >


                                        {THdate}
                                    </p>
                                </h1>
                            </div>
                            <div className="flex flex-col ">


                                <h1 className="  lg:text-xl text-base text-right  text-color-blue">
                                    <Clock format={'HH:mm:ss'} ticking={true} timezone={'Asia/Bangkok'} />
                                </h1>
                            </div>

                            <h1 className="lg:text-xl text-lg text-center text-color-blue">ข่าวประชาสัมพันธ์</h1>
                            <div className="flex flex-col flex-grow  rounded-lg mt-4  border-blue-800  border-2 h-4/6">

                                <div className="flex flex-col overflow-x-auto h-full mb-2">
                                    {newsmap ? newsmap.map((p, index) => (
                                        <button key={index + 1} className="border-blue-800  border-2 mt-4 py-4 mx-4 rounded-lg px-4  hover:bg-blue-800 hover:text-white text-color-blue" onClick={() => newsclick(index)} type="button">

                                            <div className="flex flex-row  w-full  items-center">

                                                <div className=" w-9/12  ml-4 text-left">
                                                    {index + 1 + ". " + p.news_subject}
                                                </div>


                                                <div className="text-center">{moment(p.news_start).utc().format("DD/MM/YYYY") + " - " + moment(p.news_end).utc().format("DD/MM/YYYY")}</div>
                                                {/* <div className="w-1/12 text-right icon-exclamation">
                                           
                                        </div> */}
                                                <div className="ml-4">
                                                    {p.newsnoti_status == 0 ?
                                                        <span className="flex items-center justify-center text-lg text-yellow-400">
                                                            <svg
                                                                fill="none"
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth="2"
                                                                viewBox="0 0 24 24"
                                                                stroke="currentColor"
                                                                className="w-6 h-6"
                                                            >
                                                                <path
                                                                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                                />

                                                            </svg>
                                                        </span> : ""}

                                                </div>
                                            </div>


                                        </button>
                                    )) : ""}
                                </div>

                                <>
                                    {/* Modal */}
                                    {showModal ? (
                                        <>
                                            <div
                                                className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                                            >
                                                <div className="relative w-full   mt-28 mb-6 mx-auto max-w-4xl  max-h-auto ">
                                                    {/*content*/}
                                                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                                        {/*header*/}
                                                        <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t text-color-blue">
                                                            <h3 className="text-2xl font-semibold text-center w-full ml-5">
                                                                ข่าวประชาสัมพันธ์
                                                            </h3>
                                                            <button
                                                                className="p-1 ml-auto bg-transparent border-0 text-black  float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                                                onClick={() => CancelClick()}
                                                            >
                                                                <span className="bg-transparent text-black  h-6 w-6 text-2xl block outline-none focus:outline-none">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                                                    </svg>
                                                                </span>
                                                            </button>
                                                        </div>
                                                        {/*body*/}
                                                        <div className="relative p-6 flex-auto ">
                                                            <p className="my-4  text-xl leading-relaxed text-center  text-color-blue">
                                                                {values.news_subject}
                                                            </p>
                                                            <div className="my-4  text-lg leading-relaxed   text-center  h-80">
                                                                {/* <img src="/public/img-informaiton/information.jpg" className=" w-100" alt="" /> */}
                                                                <div className=" h-full  w-full rounded-lg" >
                                                                    {(values.news_picture ?
                                                                        <Image
                                                                            src={values.news_picture}
                                                                            alt=""
                                                                            height={150} width={400}
                                                                            layout="responsive" className="rounded-lg" />
                                                                        :
                                                                        <Image
                                                                            src="/img-informaiton/information.jpg"
                                                                            alt=""
                                                                            height={150} width={400}
                                                                            layout="responsive" className="rounded-lg" />
                                                                    )}
                                                                </div>

                                                            </div>
                                                            <p className="my-4  text-lg leading-relaxed text-center  text-color-blue">
                                                                รายละเอียดข่าวประชาสัมพันธ์
                                                            </p>
                                                            <p className="my-4  text-lg leading-relaxed border-blue-800 border-2 rounded-lg text-center m-auto p-5 text-color-blue">
                                                                {values.news_detail}
                                                            </p>
                                                        </div>
                                                        {/*footer*/}
                                                        <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                                                            <button
                                                                className=" shadow hover:shadow-lg text-white bg-red-600 hover:text-red-600   border-2   border-white hover:border-red-600  hover:bg-white rounded-lg background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                                type="button"
                                                                onClick={() => CancelClick()}
                                                            >
                                                                กลับ
                                                            </button>
                                                            {/* <button
                                                            className=" shadow hover:shadow-lg text-white bg-green-600 hover:text-green-600   border-2   border-white hover:border-green-600  hover:bg-white rounded-lg background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                            type="button"
                                                            onClick={() => setShowModal(false)}
                                                        >
                                                            Enter
                                                        </button> */}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                                        </>
                                    ) : ""}
                                </>


                            </div>


                        </div>
                        <Footer></Footer>
                    </div>
                </main>


            </div>
        </div>
    )
}

export default Information
