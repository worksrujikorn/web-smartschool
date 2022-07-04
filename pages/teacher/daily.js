import React, { useEffect, useState } from "react";
import Clock from 'react-live-clock';
import moment from "moment";
import Sidebar from '../../component/layout/teacher/sidebar'
import Nav from '../../component/layout/teacher/nav'
import Footer from '../../component/layout/footer'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination"
import "swiper/css/navigation"
import Chart from 'chart.js/auto'
import { Bar } from 'react-chartjs-2'

function Daily() {

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


                            <h1 className="   text-xl text-right  text-color-blue">
                                <Clock format={'HH:mm:ss'} ticking={true} timezone={'Asia/Bangkok'} />
                            </h1>
                        </div>
                        <h1 className="   text-xl text-center text-color-blue">สรุปข้อมูลการเข้าเรียน</h1>
                        {/* main */}

                        <div className="flex flex-row flex-grow mt-4 h-4/6">
                            <div className=" w-1/2 mx-2 rounded text-center border-2 border-blue-800 ">
                                <div className=" h-2/6 m-auto pt-4 text-blue-800 text-2xl">เวลาเข้าโรงเรียน</div>
                                <div className=" text-4xl  h-2/6 text-green-400 mt-5">06:12</div>
                            </div>
                            <div className=" w-1/2 mr-2 rounded text-center border-2 border-blue-800 ">
                                <div className=" h-2/6 m-auto pt-4 text-blue-800 text-2xl">เวลาออกโรงเรียน</div>
                                <div className="text-4xl h-2/6 text-red-400 mt-5" >16:18</div>
                            </div>


                        </div>

                        <div className="flex flex-row flex-grow mt-4 h-4/6">
                            <div className=" w-1/3 mr-2 rounded text-center bg-blue-900 ">
                                <div className="h-2/6 m-auto pt-4 text-white text-2xl">จำนวนสอนทั้งหมด</div>
                                <div className="text-4xl h-2/6 text-white mt-5">15</div>
                            </div>
                            <div className=" w-1/3 mx-2 rounded text-center bg-blue-800">
                                <div className="  h-2/6 m-auto pt-4 text-white text-2xl">ไม่เข้าสอนทั้งหมด</div>
                                <div className="text-4xl h-2/6 text-white mt-5">0</div>
                            </div>
                            <div className=" w-1/3 ml-2 rounded text-center bg-blue-600 ">
                                <div className="  h-2/6 m-auto pt-4 text-white text-2xl">สั่งการบ้านทั้งหมด</div>
                                <div className="text-4xl h-2/6 text-white mt-5">11</div>
                            </div>
                        </div>

                        <div className="flex flex-col flex-grow rounded mt-4 border-blue-800 border-2 h-3/6">

                            <div className="flex flex-row  h-full ">
                                <div className=" my-4  ml-4  w-1/2 rounded-l ">

                                    <div className="grid grid-rows-4 grid-flow-col text-color-blue border-blue-800  border-2 p-4  shadow-lg rounded-lg overflow-hidden">
                                        <div className="row-span-4  m-auto   text-center  w-full   ">
                                            <div className=" -ml-4 text-2xl ">
                                                ม.5/4
                                            </div>
                                            <div className="-ml-4  text-4xl">

                                                40
                                            </div>
                                        </div>
                                        <div className="row-span-2 col-span-2  text-xl border-b-2 border-blue-800 pb-2 pl-2"> เข้าเรียน</div>
                                        <div className="row-span-2 col-span-2 text-xl pl-2 pt-1"> ขาด/ลา</div>
                                        <div className="row-span-2 col-span-2  text-center text-xl border-b-2 border-blue-800 pb-2 ">39</div>
                                        <div className="row-span-2 col-span-2 text-center text-xl pt-1">1</div>

                                        <div className="row-span-2 col-span-2  text-xl border-b-2 border-l-2 border-blue-800 pb-2 pl-2 "> วิทยาศาสตร์ 5</div>
                                        <div className="row-span-2 col-span-2 text-xl pl-2 border-l-2 border-blue-800 pt-1">คาบที่ 1 </div>
                                        <div className="row-span-2 col-span-2  text-center text-xl border-b-2 border-blue-800 pb-2 ">ว21105</div>
                                        <div className="row-span-2 col-span-2 text-center text-xl pt-1">ตึก 1 ห้อง 105</div>
                                    </div>

                                </div>
                                <div className=" my-4  mx-4 w-1/2 rounded-l ">

                                    <div className="grid grid-rows-4 grid-flow-col text-color-blue border-blue-800  border-2 p-4  shadow-lg rounded-lg overflow-hidden">
                                        <div className="row-span-4  m-auto   text-center  w-full   ">
                                            <div className=" -ml-4 text-2xl ">
                                                ม.2/3
                                            </div>
                                            <div className="-ml-4  text-4xl">

                                                35
                                            </div>
                                        </div>
                                        <div className="row-span-2 col-span-2  text-xl border-b-2 border-blue-800 pb-2 pl-2"> เข้าเรียน</div>
                                        <div className="row-span-2 col-span-2 text-xl pl-2 pt-1"> ขาด/ลา</div>
                                        <div className="row-span-2 col-span-2  text-center text-xl border-b-2 border-blue-800 pb-2 ">35</div>
                                        <div className="row-span-2 col-span-2 text-center text-xl pt-1">0</div>

                                        <div className="row-span-2 col-span-2  text-xl border-b-2 border-l-2 border-blue-800 pb-2 pl-2 "> วิทยาศาสตร์ 2</div>
                                        <div className="row-span-2 col-span-2 text-xl pl-2 border-l-2 border-blue-800 pt-1">คาบที่ 1 </div>
                                        <div className="row-span-2 col-span-2  text-center text-xl border-b-2 border-blue-800 pb-2 ">ว21102</div>
                                        <div className="row-span-2 col-span-2 text-center text-xl pt-1">ตึก 4 ห้อง 404</div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-row  h-full ">
                                <div className=" my-4  ml-4  w-1/2 rounded-l ">

                                    <div className="grid grid-rows-4 grid-flow-col text-color-blue border-blue-800  border-2 p-4  shadow-lg rounded-lg overflow-hidden">
                                        <div className="row-span-4  m-auto   text-center  w-full   ">
                                            <div className=" -ml-4 text-2xl ">
                                                ม.2/4
                                            </div>
                                            <div className="-ml-4  text-4xl">

                                                33
                                            </div>
                                        </div>
                                        <div className="row-span-2 col-span-2  text-xl border-b-2 border-blue-800 pb-2 pl-2"> เข้าเรียน</div>
                                        <div className="row-span-2 col-span-2 text-xl pl-2 pt-1"> ขาด/ลา</div>
                                        <div className="row-span-2 col-span-2  text-center text-xl border-b-2 border-blue-800 pb-2 ">32</div>
                                        <div className="row-span-2 col-span-2 text-center text-xl pt-1">1</div>

                                        <div className="row-span-2 col-span-2  text-xl border-b-2 border-l-2 border-blue-800 pb-2 pl-2 "> วิทยาศาสตร์ 2</div>
                                        <div className="row-span-2 col-span-2 text-xl pl-2 border-l-2 border-blue-800 pt-1">คาบที่ 1 </div>
                                        <div className="row-span-2 col-span-2  text-center text-xl border-b-2 border-blue-800 pb-2 ">ว21102</div>
                                        <div className="row-span-2 col-span-2 text-center text-xl pt-1">ตึก 2 ห้อง 201</div>
                                    </div>
                                </div>
                                <div className=" my-4  mx-4 w-1/2 rounded-l ">

                                    <div className="grid grid-rows-4 grid-flow-col text-color-blue border-blue-800  border-2 p-4  shadow-lg rounded-lg overflow-hidden">
                                        <div className="row-span-4  m-auto   text-center  w-full   ">
                                            <div className=" -ml-4 text-2xl ">
                                                ม.3/1
                                            </div>
                                            <div className="-ml-4  text-4xl">

                                                37
                                            </div>
                                        </div>
                                        <div className="row-span-2 col-span-2  text-xl border-b-2 border-blue-800 pb-2 pl-2"> เข้าเรียน</div>
                                        <div className="row-span-2 col-span-2 text-xl pl-2 pt-1"> ขาด/ลา</div>
                                        <div className="row-span-2 col-span-2  text-center text-xl border-b-2 border-blue-800 pb-2 ">37</div>
                                        <div className="row-span-2 col-span-2 text-center text-xl pt-1">0</div>

                                        <div className="row-span-2 col-span-2  text-xl border-b-2 border-l-2 border-blue-800 pb-2 pl-2 "> วิทยาศาสตร์ 3</div>
                                        <div className="row-span-2 col-span-2 text-xl pl-2 border-l-2 border-blue-800 pt-1">คาบที่ 1 </div>
                                        <div className="row-span-2 col-span-2  text-center text-xl border-b-2 border-blue-800 pb-2 ">ว21103</div>
                                        <div className="row-span-2 col-span-2 text-center text-xl pt-1">ตึก 1 ห้อง 102</div>
                                    </div>
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

export default Daily
