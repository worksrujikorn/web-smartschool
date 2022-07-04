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


function Assignment() {

    const [Send, setSend] = useState(false)
    const [Unsend, setUnsend] = useState(true)




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


                            <h1 className=" lg:text-xl m:text-sm text-base text-right  text-color-blue">
                                <Clock format={'HH:mm:ss'} ticking={true} timezone={'Asia/Bangkok'} />
                            </h1>
                        </div>

                        <h1 className="   text-xl text-center text-color-blue">สรุปงานที่ได้รับ</h1>
                        <div className="flex flex-row flex-grow  mt-4   h-2/6">
                            <div className=" w-1/3 mr-2 rounded  text-center bg-blue-800 ">
                                <div className=" text-3xl h-4/6 m-auto  pt-8 text-white">
                                    11
                                </div>
                                <div className=" h-2/6 text-white">
                                    ส่งแล้ว
                                </div>
                            </div>
                            <div className=" w-1/3 mx-2 rounded  text-center  border-2 border-blue-800 ">
                                <div className=" text-3xl h-4/6 m-auto  pt-8  text-blue-800">
                                    22
                                </div>
                                <div className=" h-2/6 text-blue-800">
                                    ทั้งหมด
                                </div>
                            </div>
                            <div className=" w-1/3 ml-2 rounded  text-center bg-blue-800 ">
                                <div className=" text-3xl h-4/6 m-auto  pt-8 text-white">
                                    33
                                </div>
                                <div className=" h-2/6 text-white">
                                    ยังไม่ส่ง
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-row flex-grow  rounded mt-4   text-right">
                            <div className=" w-11/12 ">

                            </div>
                            <div className="  w-2/12   ">


                                <div className="inline-flex rounded-lg">
                                    <input type="radio" name="room_type" id="roomPrivate" checked hidden />
                                    <label htmlFor="roomPrivate" className="radio text-center self-center py-2 px-4 rounded-l cursor-pointer hover:opacity-75" onClick={() => unsend()}>ยังไม่ส่ง</label>
                                </div>
                                <div className="inline-flex rounded-lg">
                                    <input type="radio" name="room_type" id="roomPublic" hidden />
                                    <label htmlFor="roomPublic" className="radio text-center self-center py-2 px-4 rounded-r cursor-pointer hover:opacity-75" onClick={() => send()}>ส่งแล้ว</label>
                                </div>



                            </div>



                        </div>
                        <div className="flex flex-col flex-grow  rounded mt-4  border-blue-800  border-2 h-4/6">
                            {(Unsend) ?
                                <div className="flex flex-row  ">
                                    <div className="border-blue-800  border-2 my-4 py-4 ml-4 w-1/2 rounded-l px-4">

                                        <div className="grid grid-rows-4 grid-flow-col gap-4 text-color-blue">
                                            <div className="row-span-4  m-auto  text-2xl">
                                                <div className=" -ml-4">
                                                    1.
                                                </div>
                                            </div>
                                            <div className="row-span-2 col-span-2 "> วิทยาศาสตร์ 2</div>
                                            <div className="row-span-2 col-span-2 ">กำหนดส่ง 1/12/2564</div>
                                            <div className="row-span-2 col-span-2 ">ว21103</div>
                                            <div className="row-span-2 col-span-2 ">ครู เอ็มมี่</div>
                                        </div>
                                    </div>
                                    <div className="bg-blue-800   my-4 py-4 mr-4 w-1/2 rounded-r px-4  text-white">

                                        <div className="flex flex-row ">
                                            <div className=" w-3/4   pb-4"> แบบฝึกหัดท้ายบทข้อที่ 1-50 </div>
                                            <div className="  w-1/4 text-center"> จำนวน </div>


                                        </div>

                                        <div className="flex flex-row ">
                                            <div className=" w-3/4 pb-4 "> ข้อละ 2.5 คะแนน รวม 20 คะแนน </div>
                                            <div className="  w-1/4 text-center  text-xl "> 1 </div>


                                        </div>

                                    </div>
                                </div>
                                : ""}
                            {(Send) ?
                                <div className="flex flex-row  ">
                                    <div className="border-blue-800  border-2 my-4 py-4 ml-4 w-1/2 rounded-l px-4">

                                        <div className="grid grid-rows-4 grid-flow-col gap-4 text-color-blue">
                                            <div className="row-span-4  m-auto  text-2xl">
                                                <div className=" -ml-4">
                                                    1.
                                                </div>
                                            </div>
                                            <div className="row-span-2 col-span-2 "> สังคม 2</div>
                                            <div className="row-span-2 col-span-2 ">กำหนดส่ง 1/12/2564</div>
                                            <div className="row-span-2 col-span-2 ">ส21103</div>
                                            <div className="row-span-2 col-span-2 ">ครู เอ็มมี่</div>
                                        </div>
                                    </div>
                                    <div className="bg-blue-800   my-4 py-4 mr-4 w-1/2 rounded-r px-4  text-white">

                                        <div className="flex flex-row ">
                                            <div className=" w-3/4   pb-4"> หาข้อมูลเรื่อง แผ่นดินไหว อธิบายอย่างละเอียด </div>
                                            <div className="  w-1/4 text-center"> จำนวน </div>


                                        </div>

                                        <div className="flex flex-row ">
                                            <div className=" w-3/4 pb-4 ">  20 คะแนน </div>
                                            <div className="  w-1/4 text-center  text-xl "> 1 </div>


                                        </div>

                                    </div>
                                </div>
                                : ""}
                        </div>


                    </div>
                    <Footer></Footer>
                </main>


            </div>
        </div>
    )
}

export default Assignment
