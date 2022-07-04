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


function Assessment() {

    const [Front, setFront] = useState(false)
    const [End, setEnd] = useState(false)
    const [Eq, setEq] = useState(false)
    const [Plus, setPlus] = useState(true)
    const [Mins, setMins] = useState(false)
    const [Plus1, setPlus1] = useState(true)
    const [Mins1, setMins1] = useState(false)

    const [Chkno1, setChkno1] = useState(true)




    const [THdate, setTHdate] = useState("")
    useEffect(() => {


        timezone()
        // console.log('chkno1', Chkno1);
    }, [])

    const timezone = () => {

        const result = new Date().toLocaleDateString('th-TH', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            weekday: 'long',
        })

        setTHdate(result);
        // console.log(result)

    }

    const handleChange = (name, e) => {
        // console.log();
        if (name == "chk_1_1") {
            setChkno1(true);
            // console.log('name', name);
            // console.log('chkno1', Chkno1);
        }
        else if (name == "chk_1_2") {
            setChkno1(false);
            // console.log('name', name);
            // console.log('chkno1', Chkno1);

        }
        else if (name == "chk_1_3") {
            setChkno1(false);
            // console.log('name', name);
            // console.log('chkno1', Chkno1);

        }
        else if (name == "chk_1_4") {
            setChkno1(false);
            // console.log('name', name);
            // console.log('chkno1', Chkno1);

        }
    }
    const front = () => {
        setFront(true)
        setEnd(false)
        setEq(false)
        setChkno1(true)


        if (Front == true) {
            setFront(false)
            setPlus(true)
            setMins(false)
            setPlus1(true)
            setMins1(false)
        }
        else {
            setPlus(false)
            setMins(true)
            setPlus1(true)
            setMins1(false)

        }
        // console.log(Front)
    }

    const end = () => {
        setFront(false)
        setEnd(false)
        setEq(false)
        // if (End == true) {
        //     setEnd(false)
        // }
        // console.log(End)
    }
    const eq = () => {
        setFront(false)
        setEnd(false)
        setEq(true)
        setChkno1(true)

        if (Eq == true) {
            setEq(false)
            setPlus1(true)
            setMins1(false)
            setPlus(true)
            setMins(false)
        }
        else {
            setPlus(true)
            setMins(false)
            setPlus1(false)
            setMins1(true)
        }
        // console.log(Eq)
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

                        <h1 className="   text-xl text-center text-color-blue">ประเภทแบบประเมิน</h1>
                        <div className="flex flex-col flex-grow  rounded-lg mt-4   pb-4  border-blue-800  border-2  h-auto">
                            <button id='plus' onClick={() => front()} className="flex flex-col  border-2 border-blue-800 mt-4 mx-4 p-4  rounded-lg text-color-blue   text-left hover:bg-blue-800 hover:text-white" type="button">

                                {/* <div className="my-auto  text-left">
                                    แบบประเมินพฤติกรรมเด็ก (SDQ : Strengths and Difficulties Questionnaire) (ฉบับนักเรียนประเมินตนเอง)

                                </div> */}
                                <div className="flex flex-row  w-full  items-center ">

                                    <div className=" w-9/12  ml-4 text-left">
                                        แบบประเมินพฤติกรรมเด็ก (SDQ : Strengths and Difficulties Questionnaire) (ฉบับผู้ปกครองเป็นผู้ประเมินนักเรียน)
                                    </div>


                                    <div className="w-2/12 text-center text-yellow-400"></div>
                                    <div className="w-1/12  flex justify-end mr-4"  >
                                        {(Plus) ?
                                            <svg
                                                fill="none"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                className="h-6 w-6"
                                            >
                                                <path d="M12 4v16m8-8H4" />
                                            </svg>
                                            : ""}
                                        {(Mins) ?
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-dash-lg" viewBox="0 0 16 16">
                                                <path fill-rule="evenodd" d="M2 8a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11A.5.5 0 0 1 2 8Z" />
                                            </svg>
                                            : ""}

                                    </div>

                                </div>

                            </button>
                            {(Front) ?
                                <div className=" flex flex-col border-l-2 border-r-2 border-b-2 border-blue-800   rounded h-auto mx-4 bg-gray-300  ">
                                    <div className="relative p-4  ">
                                        <div className="bg-white   py-8  px-5" >
                                        <div className="text-center mb-2">
                                                แบบประเมินพฤติกรรมเด็ก (SDQ : Strengths and Difficulties Questionnaire)
                                                <br/> (ฉบับผู้ปกครองเป็นผู้ประเมินนักเรียน)
                                            </div>

                                            <div className="flex flex-row mb-2"  >
                                                <div className="w-4/6 ">
                                                    ชื่อ(ด.ช.,ด.ญ.,นาย,นางสาว)
                                                </div>
                                                <div className="w-1/6">
                                                    ชั้น
                                                </div>
                                                <div className="w-1/6">
                                                    เลขที่
                                                </div>


                                            </div>
                                            <div className="flex flex-row mb-2"  >
                                                <div className="w-4/6 ">
                                                    วัน/เดือน/ปีเกิด
                                                </div>
                                                <div className="w-2/6">
                                                    โทร
                                                </div>



                                            </div>
                                            <div >


                                            </div>
                                            คำชี้แจง ให้เลือก 1 คำตอบ
                                            ในช่องท้ายแต่ละข้อให้ครบทุกข้อ กรุณาตอบให้ตรงกับลักษณะของนักเรียนในช่วง 6 เดือนที่ผ่านมา
                                            <table className="rounded-t-lg mt-5  w-full mx-auto bg-white text-black border-black">
                                                <tr className="border-2  border-black text-center">
                                                    <th className="px-6 py-3 border-r-2 border-black w-1/12" rowSpan={2}>ข้อ</th>
                                                    <th className="px-6 py-3 border-r-2 border-black w-7/12" rowSpan={2}>พฤติกรรมประเมิน</th>
                                                    <th className="px-6 py-3 w-4/12" colSpan={3}>ความคิดเห็น</th>

                                                </tr>
                                                <tr className="border-2  border-black text-center">

                                                    <th className="px-6 py-3 border-r-2 border-black">ไม่จริง</th>
                                                    <th className="px-6 py-3 border-r-2 border-black">ค่อนข้างจริง</th>
                                                    <th className="px-6 py-3">จริง</th>
                                                </tr>
                                                <tr className="bg-white border-b-2 border-l-2 border-r-2 border-black ">
                                                    <td className="px-6 py-3 border-r-2 border-black text-center">1</td>
                                                    <td className="px-6 py-3 border-r-2 border-black text-left">ห่วงใยความรู้สึกของคนอื่น</td>
                                                    <td className="px-6 py-3 border-r-2 border-black m-auto  text-center ">
                                                        <input type="radio" id="1_1" name="1" value="1" className="    w-5 h-5 " />
                                                    </td>
                                                    <td className="px-6 py-3 border-r-2 border-black m-auto  text-center ">
                                                        <input type="radio" id="1_2" name="1" value="2" className="    w-5 h-5 " />
                                                    </td>
                                                    <td className="px-6 py-3 border-r-2 border-black m-auto  text-center ">
                                                        <input type="radio" id="1_3" name="1" value="3" className="    w-5 h-5 " />
                                                    </td>
                                                </tr>
                                                <tr className="bg-white border-b-2 border-l-2 border-r-2 border-black ">
                                                    <td className="px-6 py-3 border-r-2 border-black text-center">2</td>
                                                    <td className="px-6 py-3 border-r-2 border-black text-left ">อยู่ไม่นิ่ง นั้งนิ่งๆไม่ได้</td>
                                                    <td className="px-6 py-3 border-r-2 border-black m-auto  text-center ">
                                                        <input type="radio" id="2_1" name="2" value="1" className="    w-5 h-5 " />
                                                    </td>
                                                    <td className="px-6 py-3 border-r-2 border-black m-auto  text-center ">
                                                        <input type="radio" id="2_2" name="2" value="2" className="    w-5 h-5 " />
                                                    </td>
                                                    <td className="px-6 py-3 border-r-2 border-black m-auto  text-center ">
                                                        <input type="radio" id="2_3" name="2" value="3" className="    w-5 h-5 " />
                                                    </td>
                                                </tr>
                                                <tr className="bg-white border-b-2 border-l-2 border-r-2 border-black ">
                                                    <td className="px-6 py-3 border-r-2 border-black text-center">3</td>
                                                    <td className="px-6 py-3 border-r-2 border-black text-left">มักจะบ่นว่าปวดศีรษะ ปวดท้อง</td>
                                                    <td className="px-6 py-3 border-r-2 border-black m-auto  text-center ">
                                                        <input type="radio" id="3_1" name="3" value="1" className="    w-5 h-5 " />
                                                    </td>
                                                    <td className="px-6 py-3 border-r-2 border-black m-auto  text-center ">
                                                        <input type="radio" id="3_2" name="3" value="2" className="    w-5 h-5 " />
                                                    </td>
                                                    <td className="px-6 py-3 border-r-2 border-black m-auto  text-center ">
                                                        <input type="radio" id="3_3" name="3" value="3" className="    w-5 h-5 " />
                                                    </td>
                                                </tr>
                                                <tr className="bg-white border-b-2 border-l-2 border-r-2 border-black ">
                                                    <td className="px-6 py-3 border-r-2 border-black text-center">4</td>
                                                    <td className="px-6 py-3 border-r-2 border-black text-left">เต็มใจแบ่งบันสิ่งของให้เพื่อน (ขนม,ของเล่น,ดินสอ เป็นต้น)</td>
                                                    <td className="px-6 py-3 border-r-2 border-black m-auto  text-center ">
                                                        <input type="radio" id="4_1" name="4" value="1" className="    w-5 h-5 " />
                                                    </td>
                                                    <td className="px-6 py-3 border-r-2 border-black m-auto  text-center ">
                                                        <input type="radio" id="4_2" name="4" value="2" className="    w-5 h-5 " />
                                                    </td>
                                                    <td className="px-6 py-3 border-r-2 border-black m-auto  text-center ">
                                                        <input type="radio" id="4_3" name="4" value="3" className="    w-5 h-5 " />
                                                    </td>
                                                </tr>
                                                <tr className="bg-white border-b-2 border-l-2 border-r-2 border-black ">
                                                    <td className="px-6 py-3 border-r-2 border-black text-center">5</td>
                                                    <td className="px-6 py-3 border-r-2 border-black text-left">มักจะอาละวาด หรือโมโหร้าย</td>
                                                    <td className="px-6 py-3 border-r-2 border-black m-auto  text-center ">
                                                        <input type="radio" id="5_1" name="5" value="1" className="    w-5 h-5 " />
                                                    </td>
                                                    <td className="px-6 py-3 border-r-2 border-black m-auto  text-center ">
                                                        <input type="radio" id="5_2" name="5" value="2" className="    w-5 h-5 " />
                                                    </td>
                                                    <td className="px-6 py-3 border-r-2 border-black m-auto  text-center ">
                                                        <input type="radio" id="5_3" name="5" value="3" className="    w-5 h-5 " />
                                                    </td>
                                                </tr>
                                                <tr className="bg-white border-b-2 border-l-2 border-r-2 border-black ">
                                                    <td className="px-6 py-3 border-r-2 border-black text-center">6</td>
                                                    <td className="px-6 py-3 border-r-2 border-black text-left">ค่อยข้างแยกตัว ชอบเล่นคนเดียว</td>
                                                    <td className="px-6 py-3 border-r-2 border-black m-auto  text-center ">
                                                        <input type="radio" id="6_1" name="6" value="1" className="    w-5 h-5 " />
                                                    </td>
                                                    <td className="px-6 py-3 border-r-2 border-black m-auto  text-center ">
                                                        <input type="radio" id="6_2" name="6" value="2" className="    w-5 h-5 " />
                                                    </td>
                                                    <td className="px-6 py-3 border-r-2 border-black m-auto  text-center ">
                                                        <input type="radio" id="6_3" name="6" value="3" className="    w-5 h-5 " />
                                                    </td>
                                                </tr>
                                                <tr className="bg-white border-b-2 border-l-2 border-r-2 border-black ">
                                                    <td className="px-6 py-3 border-r-2 border-black text-center">7</td>
                                                    <td className="px-6 py-3 border-r-2 border-black text-left">เชื่อฟัง มักจะทำตามที่ผู้ใหญ่ต้องการ</td>
                                                    <td className="px-6 py-3 border-r-2 border-black m-auto  text-center ">
                                                        <input type="radio" id="7_1" name="7" value="1" className="    w-5 h-5 " />
                                                    </td>
                                                    <td className="px-6 py-3 border-r-2 border-black m-auto  text-center ">
                                                        <input type="radio" id="7_2" name="7" value="2" className="    w-5 h-5 " />
                                                    </td>
                                                    <td className="px-6 py-3 border-r-2 border-black m-auto  text-center ">
                                                        <input type="radio" id="7_3" name="7" value="3" className="    w-5 h-5 " />
                                                    </td>
                                                </tr>
                                                <tr className="bg-white border-b-2 border-l-2 border-r-2 border-black ">
                                                    <td className="px-6 py-3 border-r-2 border-black text-center">8</td>
                                                    <td className="px-6 py-3 border-r-2 border-black text-left">กังวลใจหลายเรื่อง ดูกังวลเสมอ</td>
                                                    <td className="px-6 py-3 border-r-2 border-black m-auto  text-center ">
                                                        <input type="radio" id="8_1" name="8" value="1" className="    w-5 h-5 " />
                                                    </td>
                                                    <td className="px-6 py-3 border-r-2 border-black m-auto  text-center ">
                                                        <input type="radio" id="8_2" name="8" value="2" className="    w-5 h-5 " />
                                                    </td>
                                                    <td className="px-6 py-3 border-r-2 border-black m-auto  text-center ">
                                                        <input type="radio" id="8_3" name="8" value="3" className="    w-5 h-5 " />
                                                    </td>
                                                </tr>
                                                <tr className="bg-white border-b-2 border-l-2 border-r-2 border-black ">
                                                    <td className="px-6 py-3 border-r-2 border-black text-center">9</td>
                                                    <td className="px-6 py-3 border-r-2 border-black text-left">เป็นที่พึ่่งได้เวลาที่คนอื่นเสียใจ  อารมณ์ไม่ดี หรือไม่สบายใจ</td>
                                                    <td className="px-6 py-3 border-r-2 border-black m-auto  text-center ">
                                                        <input type="radio" id="9_1" name="9" value="1" className="    w-5 h-5 " />
                                                    </td>
                                                    <td className="px-6 py-3 border-r-2 border-black m-auto  text-center ">
                                                        <input type="radio" id="9_2" name="9" value="2" className="    w-5 h-5 " />
                                                    </td>
                                                    <td className="px-6 py-3 border-r-2 border-black m-auto  text-center ">
                                                        <input type="radio" id="9_3" name="9" value="3" className="    w-5 h-5 " />
                                                    </td>
                                                </tr>
                                                <tr className="bg-white border-b-2 border-l-2 border-r-2 border-black ">
                                                    <td className="px-6 py-3 border-r-2 border-black text-center">10</td>
                                                    <td className="px-6 py-3 border-r-2 border-black text-left">อยู่ไม่สุข วุ่ยวายอย่างมาก</td>
                                                    <td className="px-6 py-3 border-r-2 border-black m-auto  text-center ">
                                                        <input type="radio" id="10_1" name="10" value="1" className="    w-5 h-5 " />
                                                    </td>
                                                    <td className="px-6 py-3 border-r-2 border-black m-auto  text-center ">
                                                        <input type="radio" id="10_2" name="10" value="2" className="    w-5 h-5 " />
                                                    </td>
                                                    <td className="px-6 py-3 border-r-2 border-black m-auto  text-center ">
                                                        <input type="radio" id="10_3" name="10" value="3" className="    w-5 h-5 " />
                                                    </td>
                                                </tr>
                                                <tr className="bg-white border-b-2 border-l-2 border-r-2 border-black ">
                                                    <td className="px-6 py-3 border-r-2 border-black text-center">11</td>
                                                    <td className="px-6 py-3 border-r-2 border-black text-left">มีเพื่อนสนิท</td>
                                                    <td className="px-6 py-3 border-r-2 border-black m-auto  text-center ">
                                                        <input type="radio" id="11_1" name="11" value="1" className="    w-5 h-5 " />
                                                    </td>
                                                    <td className="px-6 py-3 border-r-2 border-black m-auto  text-center ">
                                                        <input type="radio" id="11_2" name="11" value="2" className="    w-5 h-5 " />
                                                    </td>
                                                    <td className="px-6 py-3 border-r-2 border-black m-auto  text-center ">
                                                        <input type="radio" id="11_3" name="11" value="3" className="    w-5 h-5 " />
                                                    </td>
                                                </tr>
                                                <tr className="bg-white border-b-2 border-l-2 border-r-2 border-black ">
                                                    <td className="px-6 py-3 border-r-2 border-black text-center">12</td>
                                                    <td className="px-6 py-3 border-r-2 border-black text-left">มักมีเรื่องทะเลาะวิวาทกับเด็กอื่น หรือรังแกเด็กอื่น</td>
                                                    <td className="px-6 py-3 border-r-2 border-black m-auto  text-center ">
                                                        <input type="radio" id="12_1" name="12" value="1" className="    w-5 h-5 " />
                                                    </td>
                                                    <td className="px-6 py-3 border-r-2 border-black m-auto  text-center ">
                                                        <input type="radio" id="12_2" name="12" value="2" className="    w-5 h-5 " />
                                                    </td>
                                                    <td className="px-6 py-3 border-r-2 border-black m-auto  text-center ">
                                                        <input type="radio" id="12_3" name="12" value="3" className="    w-5 h-5 " />
                                                    </td>
                                                </tr>
                                                <tr className="bg-white border-b-2 border-l-2 border-r-2 border-black ">
                                                    <td className="px-6 py-3 border-r-2 border-black text-center">13</td>
                                                    <td className="px-6 py-3 border-r-2 border-black text-left">ดูไม่มีความสุข ท้อแท้</td>
                                                    <td className="px-6 py-3 border-r-2 border-black m-auto  text-center ">
                                                        <input type="radio" id="13_1" name="13" value="1" className="    w-5 h-5 " />
                                                    </td>
                                                    <td className="px-6 py-3 border-r-2 border-black m-auto  text-center ">
                                                        <input type="radio" id="13_2" name="13" value="2" className="    w-5 h-5 " />
                                                    </td>
                                                    <td className="px-6 py-3 border-r-2 border-black m-auto  text-center ">
                                                        <input type="radio" id="13_3" name="13" value="3" className="    w-5 h-5 " />
                                                    </td>
                                                </tr>
                                                <tr className="bg-white border-b-2 border-l-2 border-r-2 border-black ">
                                                    <td className="px-6 py-3 border-r-2 border-black text-center">14</td>
                                                    <td className="px-6 py-3 border-r-2 border-black text-left">เป็นที่ชื่นชอบของเพื่อนๆ</td>
                                                    <td className="px-6 py-3 border-r-2 border-black m-auto  text-center ">
                                                        <input type="radio" id="14_1" name="14" value="1" className="    w-5 h-5 " />
                                                    </td>
                                                    <td className="px-6 py-3 border-r-2 border-black m-auto  text-center ">
                                                        <input type="radio" id="14_2" name="14" value="2" className="    w-5 h-5 " />
                                                    </td>
                                                    <td className="px-6 py-3 border-r-2 border-black m-auto  text-center ">
                                                        <input type="radio" id="14_3" name="14" value="3" className="    w-5 h-5 " />
                                                    </td>
                                                </tr>
                                                <tr className="bg-white border-b-2 border-l-2 border-r-2 border-black ">
                                                    <td className="px-6 py-3 border-r-2 border-black text-center">15</td>
                                                    <td className="px-6 py-3 border-r-2 border-black text-left">วอกแวกง่าย สมาธิสั้น</td>
                                                    <td className="px-6 py-3 border-r-2 border-black m-auto  text-center ">
                                                        <input type="radio" id="15_1" name="15" value="1" className="    w-5 h-5 " />
                                                    </td>
                                                    <td className="px-6 py-3 border-r-2 border-black m-auto  text-center ">
                                                        <input type="radio" id="15_2" name="15" value="2" className="    w-5 h-5 " />
                                                    </td>
                                                    <td className="px-6 py-3 border-r-2 border-black m-auto  text-center ">
                                                        <input type="radio" id="15_3" name="15" value="3" className="    w-5 h-5 " />
                                                    </td>
                                                </tr>
                                                <tr className="bg-white border-b-2 border-l-2 border-r-2 border-black ">
                                                    <td className="px-6 py-3 border-r-2 border-black text-center">16</td>
                                                    <td className="px-6 py-3 border-r-2 border-black text-left">เครียดไม่ยอดห่างเวลาอยู่ในสถานการณ์ที่ไม่คุ้น และขาดความมั่นใจในตนเอง</td>
                                                    <td className="px-6 py-3 border-r-2 border-black m-auto  text-center ">
                                                        <input type="radio" id="16_1" name="16" value="1" className="    w-5 h-5 " />
                                                    </td>
                                                    <td className="px-6 py-3 border-r-2 border-black m-auto  text-center ">
                                                        <input type="radio" id="16_2" name="16" value="2" className="    w-5 h-5 " />
                                                    </td>
                                                    <td className="px-6 py-3 border-r-2 border-black m-auto  text-center ">
                                                        <input type="radio" id="16_3" name="16" value="3" className="    w-5 h-5 " />
                                                    </td>
                                                </tr>
                                                <tr className="bg-white border-b-2 border-l-2 border-r-2 border-black ">
                                                    <td className="px-6 py-3 border-r-2 border-black text-center">17</td>
                                                    <td className="px-6 py-3 border-r-2 border-black text-left">ใจดีกับเด็กที่เล็กกว่า</td>
                                                    <td className="px-6 py-3 border-r-2 border-black m-auto  text-center ">
                                                        <input type="radio" id="17_1" name="17" value="1" className="    w-5 h-5 " />
                                                    </td>
                                                    <td className="px-6 py-3 border-r-2 border-black m-auto  text-center ">
                                                        <input type="radio" id="17_2" name="17" value="2" className="    w-5 h-5 " />
                                                    </td>
                                                    <td className="px-6 py-3 border-r-2 border-black m-auto  text-center ">
                                                        <input type="radio" id="17_3" name="17" value="3" className="    w-5 h-5 " />
                                                    </td>
                                                </tr>
                                                <tr className="bg-white border-b-2 border-l-2 border-r-2 border-black ">
                                                    <td className="px-6 py-3 border-r-2 border-black text-center">18</td>
                                                    <td className="px-6 py-3 border-r-2 border-black text-left">ชอบโกหก หรือขี้โกง</td>
                                                    <td className="px-6 py-3 border-r-2 border-black m-auto  text-center ">
                                                        <input type="radio" id="18_1" name="18" value="1" className="    w-5 h-5 " />
                                                    </td>
                                                    <td className="px-6 py-3 border-r-2 border-black m-auto  text-center ">
                                                        <input type="radio" id="18_2" name="18" value="2" className="    w-5 h-5 " />
                                                    </td>
                                                    <td className="px-6 py-3 border-r-2 border-black m-auto  text-center ">
                                                        <input type="radio" id="18_3" name="18" value="3" className="    w-5 h-5 " />
                                                    </td>
                                                </tr>
                                                <tr className="bg-white border-b-2 border-l-2 border-r-2 border-black ">
                                                    <td className="px-6 py-3 border-r-2 border-black text-center">19</td>
                                                    <td className="px-6 py-3 border-r-2 border-black text-left">ลูกเด็กคนอื่นล้อเลียน หรือรังแก </td>
                                                    <td className="px-6 py-3 border-r-2 border-black m-auto  text-center ">
                                                        <input type="radio" id="19_1" name="19" value="1" className="    w-5 h-5 " />
                                                    </td>
                                                    <td className="px-6 py-3 border-r-2 border-black m-auto  text-center ">
                                                        <input type="radio" id="19_2" name="19" value="2" className="    w-5 h-5 " />
                                                    </td>
                                                    <td className="px-6 py-3 border-r-2 border-black m-auto  text-center ">
                                                        <input type="radio" id="19_3" name="19" value="3" className="    w-5 h-5 " />
                                                    </td>
                                                </tr>
                                                <tr className="bg-white border-b-2 border-l-2 border-r-2 border-black ">
                                                    <td className="px-6 py-3 border-r-2 border-black text-center">20</td>
                                                    <td className="px-6 py-3 border-r-2 border-black text-left">ชอบอาสา ช่วยเหลือผู้อื่น (พ่อแม่, ครู, เพื่อน, เด็กคนอื่นๆ  เป็นต้น)</td>
                                                    <td className="px-6 py-3 border-r-2 border-black m-auto  text-center ">
                                                        <input type="radio" id="20_1" name="20" value="1" className="    w-5 h-5 " />
                                                    </td>
                                                    <td className="px-6 py-3 border-r-2 border-black m-auto  text-center ">
                                                        <input type="radio" id="20_2" name="20" value="2" className="    w-5 h-5 " />
                                                    </td>
                                                    <td className="px-6 py-3 border-r-2 border-black m-auto  text-center ">
                                                        <input type="radio" id="20_3" name="20" value="3" className="    w-5 h-5 " />
                                                    </td>
                                                </tr>
                                                <tr className="bg-white border-b-2 border-l-2 border-r-2 border-black ">
                                                    <td className="px-6 py-3 border-r-2 border-black text-center">21</td>
                                                    <td className="px-6 py-3 border-r-2 border-black text-left">คิดก่อนทำ</td>
                                                    <td className="px-6 py-3 border-r-2 border-black m-auto  text-center ">
                                                        <input type="radio" id="21_1" name="21" value="1" className="    w-5 h-5 " />
                                                    </td>
                                                    <td className="px-6 py-3 border-r-2 border-black m-auto  text-center ">
                                                        <input type="radio" id="21_2" name="21" value="2" className="    w-5 h-5 " />
                                                    </td>
                                                    <td className="px-6 py-3 border-r-2 border-black m-auto  text-center ">
                                                        <input type="radio" id="21_3" name="21" value="3" className="    w-5 h-5 " />
                                                    </td>
                                                </tr>
                                                <tr className="bg-white border-b-2 border-l-2 border-r-2 border-black ">
                                                    <td className="px-6 py-3 border-r-2 border-black text-center">22</td>
                                                    <td className="px-6 py-3 border-r-2 border-black text-left">ขโมยของที่บ้าน ที่โรงเรียนหรือที่อื่น</td>
                                                    <td className="px-6 py-3 border-r-2 border-black m-auto  text-center ">
                                                        <input type="radio" id="22_1" name="22" value="1" className="    w-5 h-5 " />
                                                    </td>
                                                    <td className="px-6 py-3 border-r-2 border-black m-auto  text-center ">
                                                        <input type="radio" id="22_2" name="22" value="2" className="    w-5 h-5 " />
                                                    </td>
                                                    <td className="px-6 py-3 border-r-2 border-black m-auto  text-center ">
                                                        <input type="radio" id="22_3" name="22" value="3" className="    w-5 h-5 " />
                                                    </td>
                                                </tr>
                                                <tr className="bg-white border-b-2 border-l-2 border-r-2 border-black ">
                                                    <td className="px-6 py-3 border-r-2 border-black text-center">23</td>
                                                    <td className="px-6 py-3 border-r-2 border-black text-left">เข้ากับผู้ใหญ่ได้ดีกว่ากับเด็กในวัยเดียวกัน</td>
                                                    <td className="px-6 py-3 border-r-2 border-black m-auto  text-center ">
                                                        <input type="radio" id="23_1" name="23" value="1" className="    w-5 h-5 " />
                                                    </td>
                                                    <td className="px-6 py-3 border-r-2 border-black m-auto  text-center ">
                                                        <input type="radio" id="23_2" name="23" value="2" className="    w-5 h-5 " />
                                                    </td>
                                                    <td className="px-6 py-3 border-r-2 border-black m-auto  text-center ">
                                                        <input type="radio" id="23_3" name="23" value="3" className="    w-5 h-5 " />
                                                    </td>
                                                </tr>
                                                <tr className="bg-white border-b-2 border-l-2 border-r-2 border-black ">
                                                    <td className="px-6 py-3 border-r-2 border-black text-center">24</td>
                                                    <td className="px-6 py-3 border-r-2 border-black text-left">ขี้กลัว รู้สึกหวาดกลัวได้ง่าย</td>
                                                    <td className="px-6 py-3 border-r-2 border-black m-auto  text-center ">
                                                        <input type="radio" id="24_1" name="24" value="1" className="    w-5 h-5 " />
                                                    </td>
                                                    <td className="px-6 py-3 border-r-2 border-black m-auto  text-center ">
                                                        <input type="radio" id="24_2" name="24" value="2" className="    w-5 h-5 " />
                                                    </td>
                                                    <td className="px-6 py-3 border-r-2 border-black m-auto  text-center ">
                                                        <input type="radio" id="24_3" name="24" value="3" className="    w-5 h-5 " />
                                                    </td>
                                                </tr>
                                                <tr className="bg-white border-b-2 border-l-2 border-r-2 border-black ">
                                                    <td className="px-6 py-3 border-r-2 border-black text-center">25</td>
                                                    <td className="px-6 py-3 border-r-2 border-black text-left">ทำงานได้จนเสร็จ มีความตั้งอกตั้งใจในการทำงาน</td>
                                                    <td className="px-6 py-3 border-r-2 border-black m-auto  text-center ">
                                                        <input type="radio" id="25_1" name="25" value="1" className="    w-5 h-5 " />
                                                    </td>
                                                    <td className="px-6 py-3 border-r-2 border-black m-auto  text-center ">
                                                        <input type="radio" id="25_2" name="25" value="2" className="    w-5 h-5 " />
                                                    </td>
                                                    <td className="px-6 py-3 border-r-2 border-black m-auto  text-center ">
                                                        <input type="radio" id="25_3" name="25" value="3" className="    w-5 h-5 " />
                                                    </td>
                                                </tr>
                                                {/* <tr className="bg-white border-b-2 border-l-2 border-r-2 border-black ">

                                                    <td className="px-6 py-3 border-r-2 border-black text-center" colSpan={2}>รวมคะแนนแต่ละด้าน</td>
                                                    <td className="px-6 py-3 border-r-2 border-black m-auto  text-center ">
                                                    </td>
                                                    <td className="px-6 py-3 border-r-2 border-black m-auto  text-center ">
                                                    </td>
                                                    <td className="px-6 py-3 border-r-2 border-black m-auto  text-center ">
                                                    </td>
                                                </tr>
                                                <tr className="bg-white border-b-2 border-l-2 border-r-2 border-black ">

                                                    <td className="px-6 py-3 border-r-2 border-black text-center" colSpan={2}>การแปรผล</td>
                                                    <td className="px-6 py-3 border-r-2 border-black m-auto  text-center ">
                                                    </td>
                                                    <td className="px-6 py-3 border-r-2 border-black m-auto  text-center ">
                                                    </td>
                                                    <td className="px-6 py-3 border-r-2 border-black m-auto  text-center ">
                                                    </td>
                                                </tr> */}
                                            </table>
                                            {/* <table className="rounded-t-lg   w-full mx-auto bg-white text-black border-black">

                                                <tr className="bg-white border-b-2 border-l-2 border-r-2 border-black ">

                                                    <td className="px-6 py-3  text-center w-2/6" >รวมคะแนนการแปรผล ด้านที่ 1-4 ได้ </td>
                                                    <td className="px-6 py-3 border-r-2 border-black text-center w-1/6" >........  คะแนน</td>

                                                    <td className="px-6 py-3  text-left w-1/6">
                                                        จัดอยู่ในกลุ่ม
                                                    </td>
                                                    <td className="px-6 py-3 border-r-2 border-black text-center w-1/6">

                                                    </td>
                                                </tr>
                                                <tr className="bg-white border-b-2 border-l-2 border-r-2 border-black ">

                                                    <td className="px-6 py-3  text-center w-2/6" >คะแนนด้านที่ 5 ได้</td>
                                                    <td className="px-6 py-3 border-r-2 border-black text-center w-1/6" >........  คะแนน</td>

                                                    <td className="px-6 py-3 border-r-2 border-black text-center w-1/6">
                                                        <input type="radio" id="1" name="switch-one" value="1" className="    w-5 h-5 " />    มีจุดแข็ง ( 4 – 10 )
                                                    </td>
                                                    <td className="px-6 py-3 border-r-2 border-black text-center w-1/6">
                                                        <input type="radio" id="1" name="switch-one" value="1" className="    w-5 h-5 " />    ไม่มีจุดแข็ง( 0 – 3)
                                                    </td>
                                                </tr>
                                            </table> */}

                                            <table className=" mt-5  w-full mx-auto bg-white text-black border-black rounded-lg">

                                                <tr className="   text-center">
                                                    <td className=" py-3   text-left  " colSpan={4}>โดยรวมเธอคิดว่าตัวเองมีปัญหาในด้านใดด้านหนึ่งต่อไปนี้หรือไม่</td>

                                                </tr>
                                                <tr className="   text-center">
                                                    <td className=" py-3   text-left  " colSpan={4}>1.	 ด้านอารมณ์ ด้านสมาธิ ด้านพฤติกรรม หรือความสามารถเข้ากับผู้อื่น</td>

                                                </tr>

                                                <tr className="border-2  border-black text-center rounded-lg">
                                                    <td className="px-6 py-3 border-r-2 border-black text-center  w-1/4 ">
                                                        {(Chkno1)
                                                            ?
                                                            <input type="radio" id="chk_1_1" name="chk_1" value="1" className="    w-5 h-5   mr-4" onChange={(e) => handleChange('chk_1_1', e)} checked />
                                                            :
                                                            <input type="radio" id="chk_1_1" name="chk_1" value="1" className="    w-5 h-5   mr-4" onChange={(e) => handleChange('chk_1_1', e)} />

                                                        }
                                                        ไม่
                                                    </td>
                                                    <td className="px-6 py-3 border-r-2 border-black text-center  w-1/4">
                                                        <input type="radio" id="chk_1_2" name="chk_1" value="1" className="    w-5 h-5 mr-4" onChange={(e) => handleChange('chk_1_2', e)} />
                                                        ใช่ มีปัญหาเล็กน้อย
                                                    </td>
                                                    <td className="px-6 py-3 border-r-2 border-black text-center  w-1/4">
                                                        <input type="radio" id="chk_1_3" name="chk_1" value="1" className="    w-5 h-5 mr-4" onChange={(e) => handleChange('chk_1_3', e)} />
                                                        ใช่  มีปัญหาชัดเจน
                                                    </td>
                                                    <td className="px-6 py-3 border-r-2 border-black text-center  w-1/4">
                                                        <input type="radio" id="chk_1_4" name="chk_1" value="1" className="    w-5 h-5 mr-4" onChange={(e) => handleChange('chk_1_4', e)} />
                                                        ใช่  มีปัญหาอย่างมาก
                                                    </td>

                                                </tr>
                                                <tr className="   text-center">
                                                    <td className=" py-3   text-left   underline " colSpan={4}>ถ้าตอบว่า  <span className=" text-red-600"> “ไม่”</span> ไม่ต้องตอบข้อต่อไป   ถ้าคุณตอบว่า <span className="text-green-600"> “ใช่”  </span> กรุณาตอบข้อต่อไปนี้    </td>

                                                </tr>
                                                {(Chkno1) ?
                                                    ""
                                                    :
                                                    <>
                                                        <tr className="   text-center">
                                                            <td className="  py-3  text-left  " colSpan={4}> 2.	ปัญหานี้เกิดมานานเท่าไหร่แล้ว</td>

                                                        </tr>

                                                        <tr className="border-2  border-black text-center rounded-lg">
                                                            <td className="px-6 py-3 border-r-2 border-black text-center  w-1/4 ">
                                                                <input type="radio" id="chk_2_1" name="chk_2" value="1" className="    w-5 h-5   mr-4" />
                                                                น้อยกว่า  1  เดือน
                                                            </td>
                                                            <td className="px-6 py-3 border-r-2 border-black text-center  w-1/4">
                                                                <input type="radio" id="chk_2_2" name="chk_2" value="1" className="    w-5 h-5 mr-4" />
                                                                1  -  5  เดือน
                                                            </td>
                                                            <td className="px-6 py-3 border-r-2 border-black text-center  w-1/4">
                                                                <input type="radio" id="chk_2_3" name="chk_2" value="1" className="    w-5 h-5 mr-4" />
                                                                6  -  12  เดือน
                                                            </td>
                                                            <td className="px-6 py-3 border-r-2 border-black text-center  w-1/4">
                                                                <input type="radio" id="chk_2_4" name="chk_2" value="1" className="    w-5 h-5 mr-4" />
                                                                มากกว่า  1  ปี
                                                            </td>

                                                        </tr>
                                                        <tr className="   text-center">
                                                            <td className="  py-3  text-left  " colSpan={4}> <span className="text-red-600"> *</span> 3.	ปัญหานี้ทำให้เธอไม่สบายใจหรือไม่</td>

                                                        </tr>
                                                        <tr className="border-2  border-black text-center rounded-lg">
                                                            <td className="px-6 py-3 border-r-2 border-black text-center  w-1/4 ">
                                                                <input type="radio" id="chk_3_1" name="chk_3" value="1" className="    w-5 h-5 mr-4" />
                                                                ไม่เลย
                                                            </td>
                                                            <td className="px-6 py-3 border-r-2 border-black text-center  w-1/4">
                                                                <input type="radio" id="chk_3_2" name="chk_3" value="1" className="    w-5 h-5 mr-4" />
                                                                เล็กน้อย
                                                            </td>
                                                            <td className="px-6 py-3 border-r-2 border-black text-center  w-1/4">
                                                                <input type="radio" id="chk_3_3" name="chk_3" value="1" className="    w-5 h-5 mr-4" />
                                                                ค่อนข้างมาก
                                                            </td>
                                                            <td className="px-6 py-3 border-r-2 border-black text-center  w-1/4">
                                                                <input type="radio" id="chk_3_4" name="chk_3" value="1" className="    w-5 h-5 mr-4" />
                                                                มาก
                                                            </td>

                                                        </tr>
                                                    </>}

                                            </table>
                                            {(Chkno1) ? "" :
                                                <>
                                                    <table className="rounded-t-lg   w-full mx-auto bg-white text-black border-black">

                                                        <tr className="   text-center">
                                                            <td className="  py-3  text-left  " colSpan={4}> <span className="text-red-600"> *</span>  4.  ปัญหานี้รบกวนชีวิตประจำวันของเธอในด้านต่างๆต่อไปนี้หรือไม่</td>

                                                        </tr>
                                                        <tr className="border-2  border-black text-center rounded-lg">
                                                            <td className="px-6 py-3 border-r-2 border-black text-center  w-2/6 ">


                                                            </td>
                                                            <td className="px-6 py-3 border-r-2 border-black text-center  w-1/6 ">

                                                                ไม่เลย
                                                            </td>
                                                            <td className="px-6 py-3 border-r-2 border-black text-center  w-1/6">

                                                                เล็กน้อย
                                                            </td>
                                                            <td className="px-6 py-3 border-r-2 border-black text-center  w-1/6">

                                                                ค่อนข้างมาก
                                                            </td>
                                                            <td className="px-6 py-3 border-r-2 border-black text-center  w-1/6">

                                                                มาก
                                                            </td>

                                                        </tr>
                                                        <tr className="border-2  border-black text-center rounded-lg">
                                                            <td className="px-6 py-3 border-r-2 border-black text-center  w-2/6 ">
                                                                ความเป็นอยู่ที่บ้าน

                                                            </td>
                                                            <td className="px-6 py-3 border-r-2 border-black text-center  w-1/6 ">

                                                                <input type="radio" id="1" name="switch-one" value="1" className="    w-5 h-5 " />
                                                            </td>
                                                            <td className="px-6 py-3 border-r-2 border-black text-center  w-1/6">

                                                                <input type="radio" id="1" name="switch-one" value="1" className="    w-5 h-5 " />
                                                            </td>
                                                            <td className="px-6 py-3 border-r-2 border-black text-center  w-1/6">

                                                                <input type="radio" id="1" name="switch-one" value="1" className="    w-5 h-5 " />
                                                            </td>
                                                            <td className="px-6 py-3 border-r-2 border-black text-center  w-1/6">

                                                                <input type="radio" id="1" name="switch-one" value="1" className="    w-5 h-5 " />
                                                            </td>

                                                        </tr>
                                                        <tr className="border-2  border-black text-center rounded-lg">
                                                            <td className="px-6 py-3 border-r-2 border-black text-center  w-2/6 ">
                                                                การคบเพื่อน

                                                            </td>
                                                            <td className="px-6 py-3 border-r-2 border-black text-center  w-1/6 ">

                                                                <input type="radio" id="1" name="switch-one" value="1" className="    w-5 h-5 " />
                                                            </td>
                                                            <td className="px-6 py-3 border-r-2 border-black text-center  w-1/6">

                                                                <input type="radio" id="1" name="switch-one" value="1" className="    w-5 h-5 " />
                                                            </td>
                                                            <td className="px-6 py-3 border-r-2 border-black text-center  w-1/6">

                                                                <input type="radio" id="1" name="switch-one" value="1" className="    w-5 h-5 " />
                                                            </td>
                                                            <td className="px-6 py-3 border-r-2 border-black text-center  w-1/6">

                                                                <input type="radio" id="1" name="switch-one" value="1" className="    w-5 h-5 " />
                                                            </td>

                                                        </tr>
                                                        <tr className="border-2  border-black text-center rounded-lg">
                                                            <td className="px-6 py-3 border-r-2 border-black text-center  w-2/6 ">

                                                                การเรียนในห้อง
                                                            </td>
                                                            <td className="px-6 py-3 border-r-2 border-black text-center  w-1/6 ">

                                                                <input type="radio" id="1" name="switch-one" value="1" className="    w-5 h-5 " />
                                                            </td>
                                                            <td className="px-6 py-3 border-r-2 border-black text-center  w-1/6">

                                                                <input type="radio" id="1" name="switch-one" value="1" className="    w-5 h-5 " />
                                                            </td>
                                                            <td className="px-6 py-3 border-r-2 border-black text-center  w-1/6">

                                                                <input type="radio" id="1" name="switch-one" value="1" className="    w-5 h-5 " />
                                                            </td>
                                                            <td className="px-6 py-3 border-r-2 border-black text-center  w-1/6">

                                                                <input type="radio" id="1" name="switch-one" value="1" className="    w-5 h-5 " />
                                                            </td>

                                                        </tr>
                                                        <tr className="border-2  border-black text-center rounded-lg">
                                                            <td className="px-6 py-3 border-r-2 border-black text-center  w-2/6 ">
                                                                กิจกรรมยามว่าง

                                                            </td>
                                                            <td className="px-6 py-3 border-r-2 border-black text-center  w-1/6 ">

                                                                <input type="radio" id="1" name="switch-one" value="1" className="    w-5 h-5 " />
                                                            </td>
                                                            <td className="px-6 py-3 border-r-2 border-black text-center  w-1/6">

                                                                <input type="radio" id="1" name="switch-one" value="1" className="    w-5 h-5 " />
                                                            </td>
                                                            <td className="px-6 py-3 border-r-2 border-black text-center  w-1/6">

                                                                <input type="radio" id="1" name="switch-one" value="1" className="    w-5 h-5 " />
                                                            </td>
                                                            <td className="px-6 py-3 border-r-2 border-black text-center  w-1/6">

                                                                <input type="radio" id="1" name="switch-one" value="1" className="    w-5 h-5 " />
                                                            </td>

                                                        </tr>





                                                    </table>
                                                </>
                                            }

                                            <table className=" mb-5  w-full mx-auto bg-white text-black border-black rounded-lg">
                                                {(Chkno1) ?
                                                    "" :
                                                    <>
                                                        <tr className="   text-center">
                                                            <td className=" py-3   text-left  " colSpan={4}> <span className="text-red-600"> *</span> 5. ปัญหานี้ทำให้คนรอบข้างเกิดความยุ่งยากหรือไม่  ( ครอบครัว  เพื่อน  ครู  เป็นต้น )</td>

                                                        </tr>

                                                        <tr className="border-2  border-black text-center rounded-lg">
                                                            <td className="px-6 py-3 border-r-2 border-black text-center  w-1/4 ">
                                                                <input type="radio" id="chk_4_1" name="chk_4" value="1" className="    w-5 h-5 mr-4" />
                                                                ไม่เลย
                                                            </td>
                                                            <td className="px-6 py-3 border-r-2 border-black text-center  w-1/4">
                                                                <input type="radio" id="chk_4_2" name="chk_4" value="1" className="    w-5 h-5 mr-4" />
                                                                เล็กน้อย
                                                            </td>
                                                            <td className="px-6 py-3 border-r-2 border-black text-center  w-1/4">
                                                                <input type="radio" id="chk_4_3" name="chk_4" value="1" className="    w-5 h-5 mr-4" />
                                                                ค่อนข้างมาก
                                                            </td>
                                                            <td className="px-6 py-3 border-r-2 border-black text-center  w-1/4">
                                                                <input type="radio" id="chk_4_4" name="chk_4" value="1" className="    w-5 h-5 mr-4" />
                                                                มาก
                                                            </td>

                                                        </tr>
                                                    </>
                                                }
                                            </table>
                                            <table className=" mb-5  w-full mx-auto bg-white text-black border-black rounded-lg">


                                                <tr className=" text-center rounded-lg">
                                                    <td className="px-6 py-3  text-center  w-1/4 ">

                                                    </td>
                                                    <td className="px-6 py-3  text-right  w-1/4" colSpan={2}>
                                                        ลงชื่อ
                                                        <input type="text" id="1" name="switch-one" className="  text-center  w-1/4  h-full m-4 p-2 border-2  border-black  outline-none rounded-lg" />
                                                    </td>
                                                </tr>
                                                <tr className=" text-center rounded-lg">
                                                    <td className="px-6 py-3  text-center  w-1/4 ">

                                                    </td>

                                                    <td className="px-6 py-3  text-right  w-1/4" colSpan={2}>
                                                        แปรผล
                                                        <input type="text" id="1" name="switch-one" className="  text-center  w-1/4  h-full m-4 p-2 border-2  border-black  outline-none rounded-lg" />
                                                    </td>

                                                </tr>
                                                <tr className=" text-center rounded-lg">
                                                    <td className="px-6 py-3  text-center  w-1/4 ">

                                                    </td>


                                                    <td className="px-6 py-3  text-right  w-2/4" colSpan={2}>

                                                        คะแนนรวมแบบประเมินด้านหลัง


                                                        <input type="text" id="1" name="switch-one" className="  text-center  w-1/4  h-full m-4 p-2 border-2  border-black  outline-none rounded-lg" />

                                                    </td>

                                                </tr>


                                            </table>
                                        </div>

                                    </div>


                                    <div className="flex items-center justify-center  mb-4 mr-4 ">
                                        {/* <button
                                            className=" shadow hover:shadow-lg text-white bg-red-600 hover:text-red-600   border-2   border-red-600   hover:bg-white rounded-lg background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                            type="button"
                                            onClick={() => end()}
                                        >
                                            Close
                                        </button> */}
                                        <button
                                            className="  w-36 shadow hover:shadow-lg text-white bg-blue-600 hover:text-blue-600   border-2   border-blue-600 hover:border-blue-600  hover:bg-white rounded-lg background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                            type="button"

                                        >
                                            ส่งแบบประเมิน
                                        </button>
                                    </div>


                                </div>

                                : ""}
                            {/* <button onClick={() => end()} className="flex flex-col  border-2 border-blue-800 mt-4 mx-4 p-4  rounded-lg text-color-blue   text-left hover:bg-blue-800 hover:text-white" type="button">
                                
                                <div className="flex flex-row  w-full  items-center ">

                                    <div className=" w-9/12  ml-4 text-left">
                                        แบบประเมินพฤติกรรมเด็ก (SDQ : Strengths and Difficulties Questionnaire) (ฉบับนักเรียนประเมินตนเอง)
                                    </div>


                                    <div className="w-2/12 text-center  text-green-400 "></div>
                                    <div className="w-1/12  flex justify-end mr-4" >
                                        <svg
                                            fill="none"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            className="h-6 w-6"
                                        >
                                            <path d="M12 4v16m8-8H4" />
                                        </svg>

                                    </div>

                                </div>
                            </button> */}
                            {(End) ?
                                <div className=" flex flex-col border-l-2 border-r-2 border-b-2 border-blue-800   rounded h-auto mx-4 bg-gray-300  ">
                                    <div className="relative p-4  ">
                                        <div className="bg-white   py-8  px-5" >


                                            <table className=" mt-5  w-full mx-auto bg-white text-black border-black rounded-lg">

                                                <tr className="   text-center">
                                                    <td className="px-6 py-3   text-left  " colSpan={4}>โดยรวมเธอคิดว่าตัวเองมีปัญหาในด้านใดด้านหนึ่งต่อไปนี้หรือไม่</td>

                                                </tr>
                                                <tr className="   text-center">
                                                    <td className="px-6 py-3   text-left  " colSpan={4}>1.	 ด้านอารมณ์ ด้านสมาธิ ด้านพฤติกรรม หรือความสามารถเข้ากับผู้อื่น</td>

                                                </tr>

                                                <tr className="border-2  border-black text-center rounded-lg">
                                                    <td className="px-6 py-3 border-r-2 border-black text-center  w-1/4 ">
                                                        <input type="radio" id="1" name="switch-one" value="1" className="    w-5 h-5   mr-4" />
                                                        ไม่
                                                    </td>
                                                    <td className="px-6 py-3 border-r-2 border-black text-center  w-1/4">
                                                        <input type="radio" id="1" name="switch-one" value="1" className="    w-5 h-5 mr-4" />
                                                        ใช่ มีปัญหาเล็กน้อย
                                                    </td>
                                                    <td className="px-6 py-3 border-r-2 border-black text-center  w-1/4">
                                                        <input type="radio" id="1" name="switch-one" value="1" className="    w-5 h-5 mr-4" />
                                                        ใช่  มีปัญหาชัดเจน
                                                    </td>
                                                    <td className="px-6 py-3 border-r-2 border-black text-center  w-1/4">
                                                        <input type="radio" id="1" name="switch-one" value="1" className="    w-5 h-5 mr-4" />
                                                        ใช่  มีปัญหาอย่างมาก
                                                    </td>

                                                </tr>
                                                <tr className="   text-center">
                                                    <td className="px-6 py-3   text-left   underline " colSpan={4}>ถ้าตอบว่า  <span className=" text-red-600"> “ไม่”</span> ไม่ต้องตอบข้อต่อไป   ถ้าคุณตอบว่า <span className="text-green-600"> “ใช่”  </span> กรุณาตอบข้อต่อไปนี้    </td>

                                                </tr>
                                                <tr className="   text-center">
                                                    <td className="px-6  py-3  text-left  " colSpan={4}> 2.	ปัญหานี้เกิดมานานเท่าไหร่แล้ว</td>

                                                </tr>
                                                <tr className="border-2  border-black text-center rounded-lg">
                                                    <td className="px-6 py-3 border-r-2 border-black text-center  w-1/4 ">
                                                        <input type="radio" id="1" name="switch-one" value="1" className="    w-5 h-5   mr-4" />
                                                        น้อยกว่า  1  เดือน
                                                    </td>
                                                    <td className="px-6 py-3 border-r-2 border-black text-center  w-1/4">
                                                        <input type="radio" id="1" name="switch-one" value="1" className="    w-5 h-5 mr-4" />
                                                        1  -  5  เดือน
                                                    </td>
                                                    <td className="px-6 py-3 border-r-2 border-black text-center  w-1/4">
                                                        <input type="radio" id="1" name="switch-one" value="1" className="    w-5 h-5 mr-4" />
                                                        6  -  12  เดือน
                                                    </td>
                                                    <td className="px-6 py-3 border-r-2 border-black text-center  w-1/4">
                                                        <input type="radio" id="1" name="switch-one" value="1" className="    w-5 h-5 mr-4" />
                                                        มากกว่า  1  ปี
                                                    </td>

                                                </tr>
                                                <tr className="   text-center">
                                                    <td className="px-6  py-3  text-left  " colSpan={4}> <span className="text-red-600"> *</span> 3.	ปัญหานี้ทำให้เธอไม่สบายใจหรือไม่</td>

                                                </tr>
                                                <tr className="border-2  border-black text-center rounded-lg">
                                                    <td className="px-6 py-3 border-r-2 border-black text-center  w-1/4 ">
                                                        <input type="radio" id="1" name="switch-one" value="1" className="    w-5 h-5   mr-4" />
                                                        ไม่เลย
                                                    </td>
                                                    <td className="px-6 py-3 border-r-2 border-black text-center  w-1/4">
                                                        <input type="radio" id="1" name="switch-one" value="1" className="    w-5 h-5 mr-4" />
                                                        เล็กน้อย
                                                    </td>
                                                    <td className="px-6 py-3 border-r-2 border-black text-center  w-1/4">
                                                        <input type="radio" id="1" name="switch-one" value="1" className="    w-5 h-5 mr-4" />
                                                        ค่อนข้างมาก
                                                    </td>
                                                    <td className="px-6 py-3 border-r-2 border-black text-center  w-1/4">
                                                        <input type="radio" id="1" name="switch-one" value="1" className="    w-5 h-5 mr-4" />
                                                        มาก
                                                    </td>

                                                </tr>


                                            </table>
                                            <table className="rounded-t-lg mt-5  w-full mx-auto bg-white text-black border-black">
                                                <tr className="   text-center">
                                                    <td className="px-6  py-3  text-left  " colSpan={4}> <span className="text-red-600"> *</span>  4.  ปัญหานี้รบกวนชีวิตประจำวันของเธอในด้านต่างๆต่อไปนี้หรือไม่</td>

                                                </tr>
                                                <tr className="border-2  border-black text-center rounded-lg">
                                                    <td className="px-6 py-3 border-r-2 border-black text-center  w-2/6 ">


                                                    </td>
                                                    <td className="px-6 py-3 border-r-2 border-black text-center  w-1/6 ">

                                                        ไม่เลย
                                                    </td>
                                                    <td className="px-6 py-3 border-r-2 border-black text-center  w-1/6">

                                                        เล็กน้อย
                                                    </td>
                                                    <td className="px-6 py-3 border-r-2 border-black text-center  w-1/6">

                                                        ค่อนข้างมาก
                                                    </td>
                                                    <td className="px-6 py-3 border-r-2 border-black text-center  w-1/6">

                                                        มาก
                                                    </td>

                                                </tr>
                                                <tr className="border-2  border-black text-center rounded-lg">
                                                    <td className="px-6 py-3 border-r-2 border-black text-center  w-2/6 ">
                                                        ความเป็นอยู่ที่บ้าน

                                                    </td>
                                                    <td className="px-6 py-3 border-r-2 border-black text-center  w-1/6 ">

                                                        <input type="radio" id="1" name="switch-one" value="1" className="    w-5 h-5 " />
                                                    </td>
                                                    <td className="px-6 py-3 border-r-2 border-black text-center  w-1/6">

                                                        <input type="radio" id="1" name="switch-one" value="1" className="    w-5 h-5 " />
                                                    </td>
                                                    <td className="px-6 py-3 border-r-2 border-black text-center  w-1/6">

                                                        <input type="radio" id="1" name="switch-one" value="1" className="    w-5 h-5 " />
                                                    </td>
                                                    <td className="px-6 py-3 border-r-2 border-black text-center  w-1/6">

                                                        <input type="radio" id="1" name="switch-one" value="1" className="    w-5 h-5 " />
                                                    </td>

                                                </tr>
                                                <tr className="border-2  border-black text-center rounded-lg">
                                                    <td className="px-6 py-3 border-r-2 border-black text-center  w-2/6 ">
                                                        การคบเพื่อน

                                                    </td>
                                                    <td className="px-6 py-3 border-r-2 border-black text-center  w-1/6 ">

                                                        <input type="radio" id="1" name="switch-one" value="1" className="    w-5 h-5 " />
                                                    </td>
                                                    <td className="px-6 py-3 border-r-2 border-black text-center  w-1/6">

                                                        <input type="radio" id="1" name="switch-one" value="1" className="    w-5 h-5 " />
                                                    </td>
                                                    <td className="px-6 py-3 border-r-2 border-black text-center  w-1/6">

                                                        <input type="radio" id="1" name="switch-one" value="1" className="    w-5 h-5 " />
                                                    </td>
                                                    <td className="px-6 py-3 border-r-2 border-black text-center  w-1/6">

                                                        <input type="radio" id="1" name="switch-one" value="1" className="    w-5 h-5 " />
                                                    </td>

                                                </tr>
                                                <tr className="border-2  border-black text-center rounded-lg">
                                                    <td className="px-6 py-3 border-r-2 border-black text-center  w-2/6 ">

                                                        การเรียนในห้อง
                                                    </td>
                                                    <td className="px-6 py-3 border-r-2 border-black text-center  w-1/6 ">

                                                        <input type="radio" id="1" name="switch-one" value="1" className="    w-5 h-5 " />
                                                    </td>
                                                    <td className="px-6 py-3 border-r-2 border-black text-center  w-1/6">

                                                        <input type="radio" id="1" name="switch-one" value="1" className="    w-5 h-5 " />
                                                    </td>
                                                    <td className="px-6 py-3 border-r-2 border-black text-center  w-1/6">

                                                        <input type="radio" id="1" name="switch-one" value="1" className="    w-5 h-5 " />
                                                    </td>
                                                    <td className="px-6 py-3 border-r-2 border-black text-center  w-1/6">

                                                        <input type="radio" id="1" name="switch-one" value="1" className="    w-5 h-5 " />
                                                    </td>

                                                </tr>
                                                <tr className="border-2  border-black text-center rounded-lg">
                                                    <td className="px-6 py-3 border-r-2 border-black text-center  w-2/6 ">
                                                        กิจกรรมยามว่าง

                                                    </td>
                                                    <td className="px-6 py-3 border-r-2 border-black text-center  w-1/6 ">

                                                        <input type="radio" id="1" name="switch-one" value="1" className="    w-5 h-5 " />
                                                    </td>
                                                    <td className="px-6 py-3 border-r-2 border-black text-center  w-1/6">

                                                        <input type="radio" id="1" name="switch-one" value="1" className="    w-5 h-5 " />
                                                    </td>
                                                    <td className="px-6 py-3 border-r-2 border-black text-center  w-1/6">

                                                        <input type="radio" id="1" name="switch-one" value="1" className="    w-5 h-5 " />
                                                    </td>
                                                    <td className="px-6 py-3 border-r-2 border-black text-center  w-1/6">

                                                        <input type="radio" id="1" name="switch-one" value="1" className="    w-5 h-5 " />
                                                    </td>

                                                </tr>





                                            </table>
                                            <table className=" mb-5  w-full mx-auto bg-white text-black border-black rounded-lg">


                                                <tr className="   text-center">
                                                    <td className="px-6 py-3   text-left  " colSpan={4}> <span className="text-red-600"> *</span> 5. ปัญหานี้ทำให้คนรอบข้างเกิดความยุ่งยากหรือไม่  ( ครอบครัว  เพื่อน  ครู  เป็นต้น )</td>

                                                </tr>

                                                <tr className="border-2  border-black text-center rounded-lg">
                                                    <td className="px-6 py-3 border-r-2 border-black text-center  w-1/4 ">
                                                        <input type="radio" id="1" name="switch-one" value="1" className="    w-5 h-5   mr-4" />
                                                        ไม่เลย
                                                    </td>
                                                    <td className="px-6 py-3 border-r-2 border-black text-center  w-1/4">
                                                        <input type="radio" id="1" name="switch-one" value="1" className="    w-5 h-5 mr-4" />
                                                        เล็กน้อย
                                                    </td>
                                                    <td className="px-6 py-3 border-r-2 border-black text-center  w-1/4">
                                                        <input type="radio" id="1" name="switch-one" value="1" className="    w-5 h-5 mr-4" />
                                                        ค่อนข้างมาก
                                                    </td>
                                                    <td className="px-6 py-3 border-r-2 border-black text-center  w-1/4">
                                                        <input type="radio" id="1" name="switch-one" value="1" className="    w-5 h-5 mr-4" />
                                                        มาก
                                                    </td>

                                                </tr>
                                                <tr className=" text-center rounded-lg">
                                                    <td className="px-6 py-3  text-center  w-1/4 ">

                                                    </td>
                                                    <td className="px-6 py-3  text-center  w-1/4">

                                                    </td>

                                                    <td className="px-6 py-3  text-right  w-1/4" colSpan={2}>
                                                        ลงชื่อ
                                                        <input type="text" id="1" value="นางสาวแอปเปิ้ล สีรุ้ง" name="switch-one" className=" border-2  border-black text-left  w-1/2  h-full m-4 p-2  outline-none rounded-lg" />
                                                    </td>
                                                </tr>
                                                <tr className=" text-center rounded-lg">
                                                    <td className="px-6 py-3  text-center  w-1/4 ">

                                                    </td>
                                                    <td className="px-6 py-3  text-center  w-1/4">

                                                    </td>

                                                    <td className="px-6 py-3  text-right  w-1/4" colSpan={2}>
                                                        แปลผล
                                                        <input type="text" id="1" name="switch-one" className=" border-2  border-black text-left  w-1/2  h-full m-4 p-2   outline-none rounded-lg" />
                                                    </td>

                                                </tr>
                                                <tr className=" text-center rounded-lg">
                                                    <td className="px-6 py-3  text-center  w-1/4 ">

                                                    </td>
                                                    <td className="px-6 py-3  text-center  w-1/4">

                                                    </td>

                                                    <td className="px-6 py-3  text-right  w-1/4" colSpan={2}>
                                                        คะแนนรวมแบบประเมินด้านหลัง
                                                        <input type="text" id="1" name="switch-one" className="  text-left  w-1/2  h-full m-4 p-2 border-2  border-black  outline-none rounded-lg" />

                                                    </td>

                                                </tr>


                                            </table>
                                        </div>

                                    </div>
                                    <div className="flex items-center justify-center  mb-4 mr-4 ">
                                        {/* <button
                                            className=" shadow hover:shadow-lg text-white bg-red-600 hover:text-red-600   border-2   border-red-600   hover:bg-white rounded-lg background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                            type="button"
                                            onClick={() => end()}
                                        >
                                            Close
                                        </button> */}
                                        <button
                                            className="  w-36 shadow hover:shadow-lg text-white bg-blue-600 hover:text-blue-600   border-2   border-blue-600 hover:border-blue-600  hover:bg-white rounded-lg background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                            type="button"

                                        >
                                            ส่งแบบประเมิน
                                        </button>
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

export default Assessment