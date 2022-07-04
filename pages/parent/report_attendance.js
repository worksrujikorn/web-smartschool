import React, { useEffect, useState } from "react";
import Image from 'next/image'
import Clock from 'react-live-clock';
import moment from "moment";
import Sidebar from '../../component/layout/parent/sidebar'
import Nav from '../../component/layout/parent/nav'
import Footer from '../../component/layout/footer'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination"
import "swiper/css/navigation"


function Report_attendance() {

    const [Send, setSend] = useState(false)
    const [Unsend, setUnsend] = useState(true)


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
    const [showModal, setShowModal] =useState(false);



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

                        <h1 className="   text-xl text-center text-color-blue">รายงานการเข้าเรียน</h1>
                        <div className="flex flex-col flex-grow   mt-4  border-blue-800  border-2 h-4/6">

                            <div className="flex flex-row  h-2/6  ">
                                <div className=" w-1/3 mx-4 mt-4 rounded text-center border-2 border-blue-800   ">
                                    <div className="h-2/6 m-auto pt-4 text-blue-800 text-2xl">เวลาเข้าโรงเรียน</div>
                                    <div className="text-4xl h-2/6 text-green-600 mt-5">06:12</div>
                                </div>
                                <div className=" w-1/3 mx-2 mt-4 rounded text-center border-2 border-blue-800 ">
                                    <div className="  h-2/6 m-auto pt-4 text-blue-800 text-2xl">เข้าแถว</div>
                                    <div className="text-4xl h-2/6 text-green-600 mt-5">เข้า</div>
                                </div>
                                <div className=" w-1/3 mx-4 mt-4 rounded text-center border-2 border-blue-800   ">
                                    <div className="  h-2/6 m-auto pt-4 text-blue-800 text-2xl">เวลาออกโรงเรียน</div>
                                    <div className="text-4xl h-2/6 text-black mt-5">--:--</div>
                                </div>

                            </div>
                            <div>
                                <div className="border_timeline mb-4 border-none  ">
                                    <div className="border-l-2 mt-10 flex px-8 ">
                                        {/* <!-- Card 1 --> */}

                                        <div className="  transform transition cursor-pointer hover:-translate-y-2 ml-10 relative flex items-center px-6 py-4 bg-blue-600 text-white rounded mb-10 flex-col md:flex-row space-y-4 md:space-y-0" >
                                            {/* <!-- Dot Follwing the Left Vertical Line --> */}
                                            <div className="bg-transparen w-10 h-10 bg-blue-600 absolute -left-10 transform -translate-x-2/4 rounded-full z-10 mt-2 md:mt-0" >

                                                <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-white px-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                                </svg>

                                            </div>

                                            {/* <!-- Line that connecting the box with the vertical line --> */}
                                            <div className="w-10 h-1 bg-blue-300 absolute -left-10 z-0"></div>

                                            {/* <!-- Content that showing in the box --> */}

                                            <div className="flex-auto">
                                                <button type="button" className=" bg-transparen" >
                                                    <h1 className=" text-lg font-bold">09:00 - 10:00 </h1>
                                                    <div className=" flex flex-row ">

                                                        <h1 className=" w-1/5  text-lg   mr-20">วิทยาศาสตร์ 1   </h1>
                                                        <h1 className=" w-2/5 text-lg ">ว21102    </h1>
                                                    </div>

                                                    <div className=" flex flex-row ">
                                                        <h3 className="w-1/5   mr-20"> ครู เอ็มมี่    </h3>
                                                        <h3 className=" w-2/5 ">    ห้อง 541 </h3>
                                                    </div>
                                                </button>
                                            </div>

                                            {/* <a href="#" className="text-center text-white hover:text-gray-300">Download materials</a> */}
                                        </div>



                                        {/* <!-- Card 2 --> */}
                                        <div className="pl-6">
                                            <div className="transform transition cursor-pointer hover:-translate-y-2 ml-10 relative flex items-center px-6 py-4 bg-gray-600 text-white rounded mb-10 flex-col md:flex-row space-y-4 md:space-y-0">
                                                {/* <!-- Dot Follwing the Left Vertical Line --> */}

                                                <div className="w-10 h-10 bg-gray-600 absolute -left-10 transform -translate-x-2/4 rounded-full z-10 mt-2 md:mt-0" >

                                                    {/* <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-white px-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                                            </svg> */}
                                                </div>
                                                {/* <!-- Line that connecting the box with the vertical line --> */}
                                                <div className="w-10 h-1 bg-gray-300 absolute -left-10 z-0"></div>

                                                {/* <!-- Content that showing in the box --> */}
                                                <div className="flex-auto">
                                                    <h1 className="text-lg font-bold">09:00 - 10:00 </h1>
                                                    <div className=" flex flex-row ">

                                                        <h1 className=" w-1/5  text-lg   mr-20">วิทยาศาสตร์ 1   </h1>
                                                        <h1 className=" w-2/5 text-lg ">ว21102    </h1>
                                                    </div>

                                                    <div className=" flex flex-row ">
                                                        <h3 className="w-1/5   mr-20"> ครู เอ็มมี่    </h3>
                                                        <h3 className=" w-2/5 ">    ห้อง 541 </h3>
                                                    </div>
                                                </div>
                                                {/* <a href="#" className="text-center text-white hover:text-gray-300">Download materials</a> */}
                                            </div>
                                        </div>

                                        {/* <!-- Card 3 --> */}
                                        <div className="pl-6">
                                            <div className="transform transition cursor-pointer hover:-translate-y-2 ml-10 relative flex items-center px-6 py-4 bg-gray-600 text-white rounded mb-10 flex-col md:flex-row space-y-4 md:space-y-0">
                                                {/* <!-- Dot Follwing the Left Vertical Line --> */}

                                                <div className="w-10 h-10 bg-gray-600 absolute -left-10 transform -translate-x-2/4 rounded-full z-10 mt-2 md:mt-0" >

                                                    {/* <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-white px-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                                            </svg> */}
                                                </div>
                                                {/* <!-- Line that connecting the box with the vertical line --> */}
                                                <div className="w-10 h-1 bg-gray-300 absolute -left-10 z-0"></div>

                                                {/* <!-- Content that showing in the box --> */}
                                                <div className="flex-auto">
                                                    <h1 className="text-lg font-bold">09:00 - 10:00 </h1>
                                                    <div className=" flex flex-row ">

                                                        <h1 className=" w-1/5  text-lg   mr-20">วิทยาศาสตร์ 1   </h1>
                                                        <h1 className=" w-2/5 text-lg ">ว21102    </h1>
                                                    </div>

                                                    <div className=" flex flex-row ">
                                                        <h3 className="w-1/5   mr-20"> ครู เอ็มมี่    </h3>
                                                        <h3 className=" w-2/5 ">    ห้อง 541 </h3>
                                                    </div>
                                                </div>
                                                {/* <a href="#" className="text-center text-white hover:text-gray-300">Download materials</a> */}
                                            </div>
                                        </div>

                                        {/* <!-- Card 4 --> */}
                                        <div className="pl-6">
                                            <div className="transform transition cursor-pointer hover:-translate-y-2 ml-10 relative flex items-center px-6 py-4 bg-gray-600 text-white rounded mb-10 flex-col md:flex-row space-y-4 md:space-y-0">
                                                {/* <!-- Dot Follwing the Left Vertical Line --> */}

                                                <div className="w-10 h-10 bg-gray-600 absolute -left-10 transform -translate-x-2/4 rounded-full z-10 mt-2 md:mt-0" >

                                                    {/* <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-white px-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                                            </svg> */}
                                                </div>
                                                {/* <!-- Line that connecting the box with the vertical line --> */}
                                                <div className="w-10 h-1 bg-gray-300 absolute -left-10 z-0"></div>

                                                {/* <!-- Content that showing in the box --> */}
                                                <div className="flex-auto">
                                                    <h1 className="text-lg font-bold">09:00 - 10:00 </h1>
                                                    <div className=" flex flex-row ">

                                                        <h1 className=" w-1/5  text-lg   mr-20">วิทยาศาสตร์ 1   </h1>
                                                        <h1 className=" w-2/5 text-lg ">ว21102    </h1>
                                                    </div>

                                                    <div className=" flex flex-row ">
                                                        <h3 className="w-1/5   mr-20"> ครู เอ็มมี่    </h3>
                                                        <h3 className=" w-2/5 ">    ห้อง 541 </h3>
                                                    </div>
                                                </div>
                                                {/* <a href="#" className="text-center text-white hover:text-gray-300">Download materials</a> */}
                                            </div>
                                        </div>

                                        {/* <!-- Card 5 --> */}
                                        <div className="pl-6">
                                            <div className="transform transition cursor-pointer hover:-translate-y-2 ml-10 relative flex items-center px-6 py-4 bg-gray-600 text-white rounded mb-10 flex-col md:flex-row space-y-4 md:space-y-0">
                                                {/* <!-- Dot Follwing the Left Vertical Line --> */}

                                                <div className="w-10 h-10 bg-gray-600 absolute -left-10 transform -translate-x-2/4 rounded-full z-10 mt-2 md:mt-0" >

                                                    {/* <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-white px-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                                            </svg> */}
                                                </div>
                                                {/* <!-- Line that connecting the box with the vertical line --> */}
                                                <div className="w-10 h-1 bg-gray-300 absolute -left-10 z-0"></div>

                                                {/* <!-- Content that showing in the box --> */}
                                                <div className="flex-auto">
                                                    <h1 className="text-lg font-bold">09:00 - 10:00 </h1>
                                                    <div className=" flex flex-row ">

                                                        <h1 className=" w-1/5  text-lg   mr-20">วิทยาศาสตร์ 1   </h1>
                                                        <h1 className=" w-2/5 text-lg ">ว21102    </h1>
                                                    </div>

                                                    <div className=" flex flex-row ">
                                                        <h3 className="w-1/5   mr-20"> ครู เอ็มมี่    </h3>
                                                        <h3 className=" w-2/5 ">    ห้อง 541 </h3>
                                                    </div>
                                                </div>
                                                {/* <a href="#" className="text-center text-white hover:text-gray-300">Download materials</a> */}
                                            </div>
                                        </div>
                                        {/* <!-- Card 6 --> */}
                                        <div className="pl-6">
                                            <div className="transform transition cursor-pointer hover:-translate-y-2 ml-10 relative flex items-center px-6 py-4 bg-gray-600 text-white rounded mb-10 flex-col md:flex-row space-y-4 md:space-y-0">
                                                {/* <!-- Dot Follwing the Left Vertical Line --> */}

                                                <div className="w-10 h-10 bg-gray-600 absolute -left-10 transform -translate-x-2/4 rounded-full z-10 mt-2 md:mt-0" >

                                                    {/* <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-white px-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                                            </svg> */}
                                                </div>
                                                {/* <!-- Line that connecting the box with the vertical line --> */}
                                                <div className="w-10 h-1 bg-gray-300 absolute -left-10 z-0"></div>

                                                {/* <!-- Content that showing in the box --> */}
                                                <div className="flex-auto">
                                                    <h1 className="text-lg font-bold">09:00 - 10:00 </h1>
                                                    <div className=" flex flex-row ">

                                                        <h1 className=" w-1/5  text-lg   mr-20">วิทยาศาสตร์ 1   </h1>
                                                        <h1 className=" w-2/5 text-lg ">ว21102    </h1>
                                                    </div>

                                                    <div className=" flex flex-row ">
                                                        <h3 className="w-1/5   mr-20"> ครู เอ็มมี่    </h3>
                                                        <h3 className=" w-2/5 ">    ห้อง 541 </h3>
                                                    </div>
                                                </div>
                                                {/* <a href="#" className="text-center text-white hover:text-gray-300">Download materials</a> */}
                                            </div>
                                        </div>
                                        {/* <!-- Card 7 --> */}
                                        <div className="pl-6">
                                            <div className="transform transition cursor-pointer hover:-translate-y-2 ml-10 relative flex items-center px-6 py-4 bg-gray-600 text-white rounded mb-10 flex-col md:flex-row space-y-4 md:space-y-0">
                                                {/* <!-- Dot Follwing the Left Vertical Line --> */}

                                                <div className="w-10 h-10 bg-gray-600 absolute -left-10 transform -translate-x-2/4 rounded-full z-10 mt-2 md:mt-0" >

                                                    {/* <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-white px-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                                            </svg> */}
                                                </div>
                                                {/* <!-- Line that connecting the box with the vertical line --> */}
                                                <div className="w-10 h-1 bg-gray-300 absolute -left-10 z-0"></div>

                                                {/* <!-- Content that showing in the box --> */}
                                                <div className="flex-auto">
                                                    <h1 className="text-lg font-bold">09:00 - 10:00 </h1>
                                                    <div className=" flex flex-row ">

                                                        <h1 className=" w-1/5  text-lg   mr-20">วิทยาศาสตร์ 1   </h1>
                                                        <h1 className=" w-2/5 text-lg ">ว21102    </h1>
                                                    </div>

                                                    <div className=" flex flex-row ">
                                                        <h3 className="w-1/5   mr-20"> ครู เอ็มมี่    </h3>
                                                        <h3 className=" w-2/5 ">    ห้อง 541 </h3>
                                                    </div>
                                                </div>
                                                {/* <a href="#" className="text-center text-white hover:text-gray-300">Download materials</a> */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className=" flex   flex-row">
                                <div className=" my-4  mx-4  w-full rounded-l  ">

                                    <div className="grid grid-rows-4 grid-flow-col text-color-blue border-blue-800  border-2 p-10  shadow-lg rounded-lg overflow-hidden">
                                        <div className="row-span-4  m-auto   text-center  w-full   ">
                                            <div className=" -ml-4 mb-4 p-4 text-2xl ">
                                                การบ้านทั้งหมด
                                            </div>
                                            <div className="-ml-4  p-4 text-4xl">

                                                2
                                            </div>
                                        </div>
                                        <div className="row-span-2 col-span-2  text-xl border-b-2 border-blue-800 pb-4 pl-4"> ส่งแล้ว</div>
                                        <div className="row-span-2 col-span-2 text-xl pl-4 pt-4 "> ยังไม่ส่ง</div>
                                        <div className="row-span-2 col-span-2  text-center text-xl border-b-2 border-blue-800 pb-4 pl-4 ">1</div>
                                        <div className="row-span-2 col-span-2 text-center text-xl pl-4 pt-4">1</div>


                                    </div>

                                </div>

                            </div>
                        </div>


                    </div>
                    <Footer></Footer>
                </main>


            </div>
        </div>
    )
}

export default Report_attendance
