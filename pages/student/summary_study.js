import React, { useEffect, useState } from "react";
import Clock from 'react-live-clock';
import moment from "moment";
import Sidebar from '../../component/layout/student/sidebar'
import Nav from '../../component/layout/student/nav'
import Footer from '../../component/layout/footer'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination"
import "swiper/css/navigation"
import Chart from 'chart.js/auto'
import { Bar } from 'react-chartjs-2'

function Summary_study() {

    const data = {
        labels: ['ท35246 ภาษาไทย', 'ค23325 คณิต1', 'ว42545 วิทย์', 'ว32254 ชีววิทยา', 'ว26356 เคมี', 'ว52122 ฟิสิกส์'],
        datasets: [{
            label: 'สรุปคะแนนรายวิชา',
            data: [50, 73, 60, 41, 85, 99],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    }
    const [values, setValues] = useState({


    })


    const [THdate, setTHdate] = useState("")
    useEffect(() => {


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


                            <h1 className="  lg:text-xl m:text-sm text-base text-right  text-color-blue">
                                <Clock format={'HH:mm:ss'} ticking={true} timezone={'Asia/Bangkok'} />
                            </h1>
                        </div>
                        <h1 className="   text-xl text-center text-color-blue">สรุปข้อมูลการเข้าเรียน</h1>
                        {/* main */}

                        <div className="flex flex-row flex-grow mt-4 h-4/6">
                            <div className=" w-2/3 mx-2 rounded text-center border-2 border-blue-800 ">
                                <div className=" h-2/6 m-auto pt-4 text-blue-800">คะแนนความประพฤติ</div>
                                <div className="text-3xl  h-2/6 text-blue-800">100</div>
                            </div>
                            <div className=" w-1/3 mr-2 rounded text-center bg-blue-400 ">
                                <div className=" h-2/6 m-auto pt-4 text-white">วันเรียนทั้งหมด</div>
                                <div className="text-3xl h-2/6 text-white">98</div>
                            </div>

                            <div className=" w-1/3 ml-2 rounded text-center bg-blue-200 ">
                                <div className="h-2/6 m-auto pt-4 text-blue-800">วันลาทั้งหมด</div>
                                <div className="text-3xl h-2/6  text-blue-800">5</div>
                            </div>
                        </div>

                        <div className="flex flex-row flex-grow mt-4 h-4/6">
                            <div className=" w-1/3 mr-2 rounded text-center bg-blue-900 ">
                                <div className="h-2/6 m-auto pt-4 text-white">วันขาดทั้งหมด</div>
                                <div className="text-3xl h-2/6 text-white">0</div>
                            </div>
                            <div className=" w-1/3 mx-2 rounded text-center bg-blue-800">
                                <div className="  h-2/6 m-auto pt-4 text-white">มาสายทั้งหมด</div>
                                <div className="text-3xl h-2/6 text-white">9</div>
                            </div>
                            <div className=" w-1/3 ml-2 rounded text-center bg-blue-600 ">
                                <div className="  h-2/6 m-auto pt-4 text-white">ไม่เข้าเรียนทั้งหมด</div>
                                <div className="text-3xl h-2/6 text-white">5</div>
                            </div>
                        </div>

                        <div className="flex flex-col flex-grow rounded mt-4 border-blue-800 border-2 h-3/6">
                            <div className="shadow-lg rounded-lg overflow-hidden">
                                <div className="px-2.5">
                                    <Bar data={data} height={50} />
                                </div>
                            </div>
                        </div>
                        {/* end-main */}
                    </div>
                    <Footer></Footer>
                </main>


            </div>
        </div>
    )
}

export default Summary_study
