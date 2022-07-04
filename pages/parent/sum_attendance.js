import React, { useEffect, useState } from "react";
import Clock from 'react-live-clock';
import moment from "moment";
import Sidebar from '../../component/layout/parent/sidebar'
import Nav from '../../component/layout/parent/nav'
import Footer from '../../component/layout/footer'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination"
import "swiper/css/navigation"
import Chart from 'chart.js/auto'
import { Bar } from 'react-chartjs-2'
import { Doughnut } from 'react-chartjs-2';
function sum_attendance() {

    const data = {
        labels: ['ท35246 ภาษาไทย', 'ค23325 คณิต1', 'ว42545 วิทย์', 'ว32254 ชีววิทยา', 'ว26356 เคมี', 'ว52122 ฟิสิกส์'],
        datasets: [{
            label: 'สรุปคะแนนรายวิชา',
            data: [50, 73, 60, 41, 85, 99],
            backgroundColor: [
                '#93C5FD',
                '#60A5FA',
                '#3B82F6',
                '#2563EB',
                '#1D4ED8',
                '#1E40AF',

            ],

            borderWidth: 1
        }]
    }
    const [values, setValues] = useState({


    })
    const plugins = [{
        beforeDraw: function (chart) {
            let width = chart.width,
                height = chart.height,
                ctx = chart.ctx;
            ctx.restore();
            let fontSize = (height / 160).toFixed(2);
            ctx.font = fontSize + "em sans-serif";
            ctx.textBaseline = "right";
            let text = "95%",
                textX = Math.round((width - ctx.measureText(text).width) / 1.95),
                textY = height / 1.50;
            ctx.fillText(text, textX, textY);
            ctx.save();
        }
    }]


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


                            <h1 className="   text-xl text-right  text-color-blue">
                                <Clock format={'HH:mm:ss'} ticking={true} timezone={'Asia/Bangkok'} />
                            </h1>
                        </div>
                        <h1 className="   text-xl text-center text-color-blue">สรุปข้อมูลการเข้าเรียน</h1>
                        {/* main */}

                        <div className="flex flex-row flex-grow mt-4 h-4/6">
                            <div className=" w-2/3 mx-2 rounded text-center border-2 border-blue-800 ">
                                <div className=" h-2/6 m-auto pt-4 text-blue-800">คะแนนความประพฤติ</div>
                                <div className="text-3xl pt-4 h-2/6 text-blue-800">100</div>
                            </div>
                            <div className=" w-1/3 mr-2 rounded text-center bg-blue-400 ">
                                <div className=" h-2/6 m-auto pt-4 text-white">วันเรียนทั้งหมด</div>
                                <div className="text-3xl  pt-4 h-2/6 text-white">98</div>
                            </div>

                            <div className=" w-1/3 ml-2 rounded text-center bg-blue-200 ">
                                <div className="h-2/6 m-auto pt-4 text-blue-800">วันลาทั้งหมด</div>
                                <div className="text-3xl  pt-4 h-2/6  text-blue-800">5</div>
                            </div>
                        </div>

                        <div className="flex flex-row flex-grow mt-4 h-4/6">
                            <div className=" w-1/3 mr-2 rounded text-center bg-blue-900 ">
                                <div className="h-2/6 m-auto pt-4 text-white">วันขาดทั้งหมด</div>
                                <div className="text-3xl pt-4 h-2/6 text-white">0</div>
                            </div>
                            <div className=" w-1/3 mx-2 rounded text-center bg-blue-800">
                                <div className="  h-2/6 m-auto pt-4 text-white">มาสายทั้งหมด</div>
                                <div className="text-3xl pt-4 h-2/6 text-white">9</div>
                            </div>
                            <div className=" w-1/3 ml-2 rounded text-center bg-blue-600 ">
                                <div className="  h-2/6 m-auto pt-4 text-white">ไม่เข้าเรียนทั้งหมด</div>
                                <div className="text-3xl pt-4 h-2/6 text-white">5</div>
                            </div>
                        </div>

                        <div className="flex flex-row flex-grow rounded mt-4 border-blue-800 border-2  h-96">
                            <div className=" flex flex-col rounded m-4 w-1/2 border-2 border-blue-600 text-lg">
                                <div className="  w-auto bg-blue-400 text-white p-2 mt-2 mx-2 rounded">
                                    <div className="flex flex-row w-full">
                                        <div className="  w-4/6  pl-8  ">
                                            ท35246 ภาษาไทย
                                        </div>
                                        <div className="  w-2/6 text-right  pr-10" >
                                            67
                                        </div>
                                    </div>





                                </div>
                                <div className="  w-auto bg-blue-500 text-white p-2 mt-2 mx-2 rounded">
                                    <div className="flex flex-row w-full">
                                        <div className="  w-4/6  pl-8  ">
                                            ค23325 คณิต1
                                        </div>
                                        <div className="  w-2/6 text-right  pr-10" >
                                            80
                                        </div>
                                    </div>

                                </div>
                                <div className="  w-auto bg-blue-600 text-white p-2 mt-2 mx-2 rounded">
                                    <div className="flex flex-row w-full">
                                        <div className="  w-4/6  pl-8  ">
                                            ว42545 วิทย์
                                        </div>
                                        <div className="  w-2/6 text-right  pr-10" >
                                            60
                                        </div>
                                    </div>
                                </div>
                                <div className="  w-auto bg-blue-700 text-white p-2 mt-2 mx-2 rounded">
                                    <div className="flex flex-row w-full">
                                        <div className="  w-4/6  pl-8  ">
                                            ว32254 ชีววิทยา
                                        </div>
                                        <div className="  w-2/6 text-right  pr-10" >
                                            30
                                        </div>
                                    </div>
                                </div>
                                <div className="  w-auto bg-blue-800 text-white p-2 mt-2 mx-2 rounded">
                                    <div className="flex flex-row w-full">
                                        <div className="  w-4/6  pl-8  ">
                                            ว26356 เคมี
                                        </div>
                                        <div className="  w-2/6 text-right  pr-10" >
                                            20
                                        </div>
                                    </div>
                                </div>
                                <div className="  w-auto bg-blue-900 text-white p-2 mt-2 mx-2 mb-2 rounded">
                                    <div className="flex flex-row w-full">
                                        <div className="  w-4/6  pl-8  ">
                                            ว52122 ฟิสิกส์
                                        </div>
                                        <div className="  w-2/6 text-right  pr-10" >
                                            45
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="   rounded  m-4 w-1/2  border-2 border-blue-600">


                                <div className="p-5 flex justify-center items-center    w-80 m-auto">

                                    <Doughnut data={data} height={100}  />



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

export default sum_attendance
