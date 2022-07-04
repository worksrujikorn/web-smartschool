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
            <div className="flex flex-row min-h-screen bg-gray-100 text-gray-800 w-full z-40 absolute ">
                <Sidebar></Sidebar>

                <main className="flex flex-col flex-grow w-full transition-all duration-150 ease-in md:w-4/5 main md:ml-0 overflow-x-auto">
                    <Nav></Nav>
                    <div className="ml-12">
                        <div className="main-content flex flex-col flex-grow p-4">
                            <div className="flex md-4">
                                <h1 className="   lg:w-3/4 w-1/4  lg:text-xl text-base text-center text-color-blue"></h1>
                                <h1 className=" lg:w-1/4 w-3/4 lg:text-xl text-base text-right  text-color-blue">
                                    <p>{THdate}</p>
                                </h1>
                            </div>
                            <div className="flex flex-col ">
                                <h1 className="  lg:text-xl m:text-sm text-base text-right  text-color-blue">
                                    <Clock
                                        format={"HH:mm:ss"}
                                        ticking={true}
                                        timezone={"Asia/Bangkok"}
                                    />
                                </h1>
                            </div>

                            <h1 className="   text-xl text-center text-color-blue">ประเภทแบบประเมิน</h1>
                            <div className="flex flex-col flex-grow  rounded-lg mt-4   pb-4  border-blue-800  border-2  h-auto">
                                <button id='plus' className="flex flex-col  border-2 border-blue-800 mt-4 mx-4 p-4  rounded-lg text-color-blue   text-left hover:bg-blue-800 hover:text-white" type="button">

                                    {/* <div className="my-auto  text-left"> onClick={() => front()}
                                    แบบประเมินพฤติกรรมเด็ก (SDQ : Strengths and Difficulties Questionnaire) (ฉบับนักเรียนประเมินตนเอง)

                                </div> */}
                                    <div className="flex flex-row  w-full  items-center ">

                                        <div className=" w-9/12  ml-4 text-left">
                                            แบบประเมินพฤติกรรมเด็ก (SDQ : Strengths and Difficulties Questionnaire) (ฉบับนักเรียนประเมินตนเอง)
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
                                                    <br /> (ฉบับนักเรียนประเมินตนเอง)
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
                                                        <td className="px-6 py-3 border-r-2 border-black text-left">ฉันพยายามทำตัวดีกับคนอื่น ฉันใส่ใจความรู้สึกของคนอื่น</td>
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
                                                        <td className="px-6 py-3 border-r-2 border-black text-left ">ฉันอยู่ไม่นิ่ง ฉันอยู่นิ่งๆไม่ได้</td>
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
                                                        <td className="px-6 py-3 border-r-2 border-black text-left">ฉันปวดศีรษะ ปวดท้อง หรือไม่สบายบ่อยๆ</td>
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
                                                        <td className="px-6 py-3 border-r-2 border-black text-left">ฉันเต็มใจแบ่งปันสิ่งของให้เพื่อน (ขนม,ของเล่น,ดินสอ เป็นต้น)</td>
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
                                                        <td className="px-6 py-3 border-r-2 border-black text-left">ฉันโกรธแรง และมักอารมณ์เสีย</td>
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
                                                        <td className="px-6 py-3 border-r-2 border-black text-left">ฉันชอบอยู่กับตัวเอง ฉันชอบเล่นคนเดียวหรืออยู่ตามลำพัง</td>
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
                                                        <td className="px-6 py-3 border-r-2 border-black text-left">ฉันมักทำตามคนอื่นบอก</td>
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
                                                        <td className="px-6 py-3 border-r-2 border-black text-left">ฉันขี้กังวล</td>
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
                                                        <td className="px-6 py-3 border-r-2 border-black text-left">ใครๆก็พึ่งฉันได้ ถ้าเขาเสียใจ อารมณ์ไม่ดี หรือไม่สบายใจ</td>
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
                                                        <td className="px-6 py-3 border-r-2 border-black text-left">ฉันอยู่ไม่สุข วุ่ยวาย</td>
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
                                                        <td className="px-6 py-3 border-r-2 border-black text-left">ฉันมีเพื่อนสนิท</td>
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
                                                        <td className="px-6 py-3 border-r-2 border-black text-left">ฉันมีเรื่องทะเลาะวิวาทบ่อย ฉันทำให้คนอื่นทำ อย่างที่ฉันต้องการได้</td>
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
                                                        <td className="px-6 py-3 border-r-2 border-black text-left">ฉันไม่มีความสุข ท้อแท้ ร้องไห้บ่อยๆ</td>
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
                                                        <td className="px-6 py-3 border-r-2 border-black text-left">เพื่อนๆส่วนมากชอบฉัน</td>
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
                                                        <td className="px-6 py-3 border-r-2 border-black text-left">ฉันวอกแวกง่าย ฉันรู้สึกว่าไม่มีสมาธิ</td>
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
                                                        <td className="px-6 py-3 border-r-2 border-black text-left">ฉันกังวลเวลาอยู่ในสถานการณ์ที่ไม่คุ้น และเสียความมั่นใจในตนเองง่าย</td>
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
                                                        <td className="px-6 py-3 border-r-2 border-black text-left">ฉันใจดีกับเด็กที่เล็กกว่า</td>
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
                                                        <td className="px-6 py-3 border-r-2 border-black text-left">มีคนว่าฉันโกหก หรือขี้โกงบ่อยๆ</td>
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
                                                        <td className="px-6 py-3 border-r-2 border-black text-left">เด็กๆคนอื่นล้อเลียน หรือรังแกฉัน</td>
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
                                                        <td className="px-6 py-3 border-r-2 border-black text-left">ฉันมักจะอาสาช่วยเหลือผู้อื่น (พ่อแม่, ครู, เพื่อน, เด็กคนอื่นๆ  เป็นต้น)</td>
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
                                                        <td className="px-6 py-3 border-r-2 border-black text-left">ฉันคิดก่อนทำ</td>
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
                                                        <td className="px-6 py-3 border-r-2 border-black text-left">ฉันเอาของคนอื่นในบ้าน ที่โรงเรียนหรือที่อื่น</td>
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
                                                        <td className="px-6 py-3 border-r-2 border-black text-left">ฉันเข้ากับผู้ใหญ่ได้ดีกว่ากับเด็กในวัยเดียวกัน</td>
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
                                                        <td className="px-6 py-3 border-r-2 border-black text-left">ฉันขี้กลัว รู้สึกหวาดกลัวได้ง่าย</td>
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
                                                        <td className="px-6 py-3 border-r-2 border-black text-left">ฉันทำงานได้จนเสร็จ ความตั้งใจในการทำงานของฉันดี</td>
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
                                <button onClick={() => eq()} className="flex flex-col  border-2 border-blue-800 mt-4 mx-4 p-4  rounded-lg text-color-blue   text-left hover:bg-blue-800 hover:text-white" type="button">
                                    {/* <div className="my-auto  text-left">
                                    แบบประเมินพฤติกรรมเด็ก (SDQ : Strengths and Difficulties Questionnaire) (ฉบับนักเรียนประเมินตนเอง)

                                </div> */}
                                    <div className="flex flex-row  w-full  items-center ">

                                        <div className=" w-9/12  ml-4 text-left">
                                            แบบประเมินความฉลาดทางอารมณ์(EQ) ( 12-17 ปี)  ช่วงชั้นที่ 3 4
                                        </div>


                                        <div className="w-2/12 text-center   "></div>
                                        <div className="w-1/12  flex justify-end mr-4" >
                                            {(Plus1) ?
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
                                            {(Mins1) ?
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-dash-lg" viewBox="0 0 16 16">
                                                    <path fill-rule="evenodd" d="M2 8a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11A.5.5 0 0 1 2 8Z" />
                                                </svg>
                                                : ""}

                                        </div>

                                    </div>
                                </button>
                                {(Eq) ?
                                    <div className=" flex flex-col border-l-2 border-r-2 border-b-2 border-blue-800   rounded h-auto mx-4 bg-gray-300  ">
                                        <div className="relative p-4  ">
                                            <div className="bg-white   py-8  px-5" >

                                                คำชี้แจง ให้เลือก 1 คำตอบ
                                                ในช่องท้ายแต่ละข้อให้ครบทุกข้อ กรุณาตอบให้ตรงกับลักษณะของนักเรียนในช่วง 6 เดือนที่ผ่านมา
                                                <table className="rounded-t-lg m-5  w-full mx-auto bg-white text-black border-black">

                                                    <tr className="border-2  border-black text-center">
                                                        <th className="px-6 py-3 border-r-2 border-black w-1/12" >ข้อ</th>
                                                        <th className="px-6 py-3 border-r-2 border-black w-7/12" >ข้อความ</th>
                                                        <th className="px-6 py-3 border-r-2 border-black w-1/12">ไม่จริง</th>
                                                        <th className="px-6 py-3 border-r-2 border-black  w-1/12">จริงบางครั้ง</th>
                                                        <th className="px-6 py-3 border-r-2 border-black  w-1/12">ค่อนข้างจริง</th>
                                                        <th className="px-6 py-3 border-r-2 border-black  w-1/12">จริงมาก</th>
                                                    </tr>
                                                    <tr className="border-2  border-black text-center">
                                                        <td className="px-6 py-3 border-r-2 border-black w-1/12" >1</td>
                                                        <td className="px-6 py-3 border-r-2 border-black w-7/12 text-left" >เวลาโกรธหรือไม่สบาย ฉันรับรู้ได้ว่าเกิดอะไรขึ้นกับฉัน</td>
                                                        <td className="px-6 py-3 border-r-2 border-black w-1/12">
                                                            <input type="radio" id="ep1_1" name="ep1_1" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                        <td className="px-6 py-3 border-r-2 border-black  w-1/12">
                                                            <input type="radio" id="ep1_2" name="ep1_2" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                        <td className="px-6 py-3 border-r-2 border-black  w-1/12">
                                                            <input type="radio" id="ep1_3" name="ep1_3" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                        <td className="px-6 py-3 border-r-2 border-black  w-1/12">
                                                            <input type="radio" id="ep1_4" name="ep1_4" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                    </tr>
                                                    <tr className="border-2  border-black text-center">
                                                        <td className="px-6 py-3 border-r-2 border-black w-1/12" >2</td>
                                                        <td className="px-6 py-3 border-r-2 border-black w-7/12 text-left" >ฉันบอกไม่ได้ว่าอะไรทำให้ฉันรู้สึกกลัว</td>
                                                        <td className="px-6 py-3 border-r-2 border-black w-1/12">
                                                            <input type="radio" id="ep2_1" name="ep2_1" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                        <td className="px-6 py-3 border-r-2 border-black  w-1/12">
                                                            <input type="radio" id="ep2_2" name="ep2_2" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                        <td className="px-6 py-3 border-r-2 border-black  w-1/12">
                                                            <input type="radio" id="ep2_3" name="ep2_3" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                        <td className="px-6 py-3 border-r-2 border-black  w-1/12">
                                                            <input type="radio" id="ep2_4" name="ep2_4" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                    </tr>
                                                    <tr className="border-2  border-black text-center">
                                                        <td className="px-6 py-3 border-r-2 border-black w-1/12" >3</td>
                                                        <td className="px-6 py-3 border-r-2 border-black w-7/12 text-left" >เมื่อถูกขัดใจฉันมักรู้สึกหงุดหงิดจนควบคุมอารมณ์ไม่ได้</td>
                                                        <td className="px-6 py-3 border-r-2 border-black w-1/12">
                                                            <input type="radio" id="ep3_1" name="ep3_1" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                        <td className="px-6 py-3 border-r-2 border-black  w-1/12">
                                                            <input type="radio" id="ep3_2" name="ep3_2" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                        <td className="px-6 py-3 border-r-2 border-black  w-1/12">
                                                            <input type="radio" id="ep3_3" name="ep3_3" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                        <td className="px-6 py-3 border-r-2 border-black  w-1/12">
                                                            <input type="radio" id="ep3_4" name="ep3_4" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                    </tr>
                                                    <tr className="border-2  border-black text-center">
                                                        <td className="px-6 py-3 border-r-2 border-black w-1/12" >4</td>
                                                        <td className="px-6 py-3 border-r-2 border-black w-7/12 text-left" >ฉันสามารถคอยเพื่อนให้บรรลุเป้าหมายที่พอใจ</td>
                                                        <td className="px-6 py-3 border-r-2 border-black w-1/12">
                                                            <input type="radio" id="ep4_1" name="ep4_1" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                        <td className="px-6 py-3 border-r-2 border-black  w-1/12">
                                                            <input type="radio" id="ep4_2" name="ep4_2" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                        <td className="px-6 py-3 border-r-2 border-black  w-1/12">
                                                            <input type="radio" id="ep4_3" name="ep4_3" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                        <td className="px-6 py-3 border-r-2 border-black  w-1/12">
                                                            <input type="radio" id="ep4_4" name="ep4_4" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                    </tr>
                                                    <tr className="border-2  border-black text-center">
                                                        <td className="px-6 py-3 border-r-2 border-black w-1/12" >5</td>
                                                        <td className="px-6 py-3 border-r-2 border-black w-7/12 text-left" >ฉันมักมีปฏิกิริยาโต้ตอบรุนแรงต่อปัญหาเพียงเล็กน้อย</td>
                                                        <td className="px-6 py-3 border-r-2 border-black w-1/12">
                                                            <input type="radio" id="ep5_1" name="ep5_1" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                        <td className="px-6 py-3 border-r-2 border-black  w-1/12">
                                                            <input type="radio" id="ep5_2" name="ep5_2" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                        <td className="px-6 py-3 border-r-2 border-black  w-1/12">
                                                            <input type="radio" id="ep5_3" name="ep5_3" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                        <td className="px-6 py-3 border-r-2 border-black  w-1/12">
                                                            <input type="radio" id="ep5_4" name="ep5_4" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                    </tr>
                                                    <tr className="border-2  border-black text-center">
                                                        <td className="px-6 py-3 border-r-2 border-black w-1/12" >6</td>
                                                        <td className="px-6 py-3 border-r-2 border-black w-7/12 text-left" >เมื่อถูกบังคับให้ทำในสิ่งที่ไม่ชอบ ฉันอธิบายเหตุผลจนผู้อื่นยอมรับไม่ได้</td>
                                                        <td className="px-6 py-3 border-r-2 border-black w-1/12">
                                                            <input type="radio" id="ep6_1" name="ep6_1" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                        <td className="px-6 py-3 border-r-2 border-black  w-1/12">
                                                            <input type="radio" id="ep6_2" name="ep6_2" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                        <td className="px-6 py-3 border-r-2 border-black  w-1/12">
                                                            <input type="radio" id="ep6_3" name="ep6_3" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                        <td className="px-6 py-3 border-r-2 border-black  w-1/12">
                                                            <input type="radio" id="ep6_4" name="ep6_4" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                    </tr>
                                                    <tr className="border-2  border-black text-center">
                                                        <td className="px-6 py-3 border-r-2 border-black w-1/12" >7</td>
                                                        <td className="px-6 py-3 border-r-2 border-black w-7/12 text-left" >ฉันสังเกตได้ เมื่อคนใกล้ชิดมีอารมณ์เปลี่ยนแปลง</td>
                                                        <td className="px-6 py-3 border-r-2 border-black w-1/12">
                                                            <input type="radio" id="ep7_1" name="ep7_1" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                        <td className="px-6 py-3 border-r-2 border-black  w-1/12">
                                                            <input type="radio" id="ep7_2" name="ep7_2" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                        <td className="px-6 py-3 border-r-2 border-black  w-1/12">
                                                            <input type="radio" id="ep7_3" name="ep7_3" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                        <td className="px-6 py-3 border-r-2 border-black  w-1/12">
                                                            <input type="radio" id="ep7_4" name="ep7_4" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                    </tr>
                                                    <tr className="border-2  border-black text-center">
                                                        <td className="px-6 py-3 border-r-2 border-black w-1/12" >8</td>
                                                        <td className="px-6 py-3 border-r-2 border-black w-7/12 text-left" >ฉันไม่สนใจกับความทุกข์ของคนอื่นที่ฉันไม่รู้จัก</td>
                                                        <td className="px-6 py-3 border-r-2 border-black w-1/12">
                                                            <input type="radio" id="ep8_1" name="ep8_1" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                        <td className="px-6 py-3 border-r-2 border-black  w-1/12">
                                                            <input type="radio" id="ep8_2" name="ep8_2" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                        <td className="px-6 py-3 border-r-2 border-black  w-1/12">
                                                            <input type="radio" id="ep8_3" name="ep8_3" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                        <td className="px-6 py-3 border-r-2 border-black  w-1/12">
                                                            <input type="radio" id="ep8_4" name="ep8_4" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                    </tr>
                                                    <tr className="border-2  border-black text-center">
                                                        <td className="px-6 py-3 border-r-2 border-black w-1/12" >9</td>
                                                        <td className="px-6 py-3 border-r-2 border-black w-7/12 text-left" >ฉันไม่ยอมรับในสิ่งที่ผู้อื่นทำต่างจากที่ฉันคิด</td>
                                                        <td className="px-6 py-3 border-r-2 border-black w-1/12">
                                                            <input type="radio" id="ep9_1" name="ep9_1" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                        <td className="px-6 py-3 border-r-2 border-black  w-1/12">
                                                            <input type="radio" id="ep9_2" name="ep9_2" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                        <td className="px-6 py-3 border-r-2 border-black  w-1/12">
                                                            <input type="radio" id="ep9_3" name="ep9_3" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                        <td className="px-6 py-3 border-r-2 border-black  w-1/12">
                                                            <input type="radio" id="ep9_4" name="ep9_4" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                    </tr>
                                                    <tr className="border-2  border-black text-center">
                                                        <td className="px-6 py-3 border-r-2 border-black w-1/12" >10</td>
                                                        <td className="px-6 py-3 border-r-2 border-black w-7/12 text-left" >ฉันยอมรับได้ว่าผู้อื่นก็อาจมีเหตุผลที่จะไม่พอใจการกระทำของฉัน</td>
                                                        <td className="px-6 py-3 border-r-2 border-black w-1/12">
                                                            <input type="radio" id="ep10_1" name="ep10_1" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                        <td className="px-6 py-3 border-r-2 border-black  w-1/12">
                                                            <input type="radio" id="ep10_2" name="ep10_2" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                        <td className="px-6 py-3 border-r-2 border-black  w-1/12">
                                                            <input type="radio" id="ep10_3" name="ep10_3" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                        <td className="px-6 py-3 border-r-2 border-black  w-1/12">
                                                            <input type="radio" id="ep10_4" name="ep10_4" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                    </tr>
                                                    <tr className="border-2  border-black text-center">
                                                        <td className="px-6 py-3 border-r-2 border-black w-1/12" >11</td>
                                                        <td className="px-6 py-3 border-r-2 border-black w-7/12 text-left" >ฉันรู้สึกว่าผู้อื่นชอบเรียกร้องความสนใจมากเกินไป</td>
                                                        <td className="px-6 py-3 border-r-2 border-black w-1/12">
                                                            <input type="radio" id="ep11_1" name="ep11_1" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                        <td className="px-6 py-3 border-r-2 border-black  w-1/12">
                                                            <input type="radio" id="ep11_2" name="ep11_2" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                        <td className="px-6 py-3 border-r-2 border-black  w-1/12">
                                                            <input type="radio" id="ep11_3" name="ep11_3" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                        <td className="px-6 py-3 border-r-2 border-black  w-1/12">
                                                            <input type="radio" id="ep11_4" name="ep11_4" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                    </tr>
                                                    <tr className="border-2  border-black text-center">
                                                        <td className="px-6 py-3 border-r-2 border-black w-1/12" >12</td>
                                                        <td className="px-6 py-3 border-r-2 border-black w-7/12 text-left" >แม้จะมีภาระที่ต้องทำ ฉันก็ยินดีรับฟังความทุกข์ของผู้อื่นที่ต้องการความช่วยเหลือ</td>
                                                        <td className="px-6 py-3 border-r-2 border-black w-1/12">
                                                            <input type="radio" id="ep12_1" name="ep12_1" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                        <td className="px-6 py-3 border-r-2 border-black  w-1/12">
                                                            <input type="radio" id="ep12_2" name="ep12_2" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                        <td className="px-6 py-3 border-r-2 border-black  w-1/12">
                                                            <input type="radio" id="ep12_3" name="ep12_3" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                        <td className="px-6 py-3 border-r-2 border-black  w-1/12">
                                                            <input type="radio" id="ep12_4" name="ep12_4" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                    </tr>
                                                    <tr className="border-2  border-black text-center">
                                                        <td className="px-6 py-3 border-r-2 border-black w-1/12" >13</td>
                                                        <td className="px-6 py-3 border-r-2 border-black w-7/12 text-left" >เป็นเรื่องธรรมดาที่จะเอาเปรียบผู้อื่นเมื่อมีโอกาส</td>
                                                        <td className="px-6 py-3 border-r-2 border-black w-1/12">
                                                            <input type="radio" id="ep13_1" name="ep13_1" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                        <td className="px-6 py-3 border-r-2 border-black  w-1/12">
                                                            <input type="radio" id="ep13_2" name="ep13_2" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                        <td className="px-6 py-3 border-r-2 border-black  w-1/12">
                                                            <input type="radio" id="ep13_3" name="ep13_3" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                        <td className="px-6 py-3 border-r-2 border-black  w-1/12">
                                                            <input type="radio" id="ep13_4" name="ep13_4" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                    </tr>
                                                    <tr className="border-2  border-black text-center">
                                                        <td className="px-6 py-3 border-r-2 border-black w-1/12" >14</td>
                                                        <td className="px-6 py-3 border-r-2 border-black w-7/12 text-left" >ฉันเห็นคุณค่าในน้ำใจที่ผู้อื่นมีต่อฉัน</td>
                                                        <td className="px-6 py-3 border-r-2 border-black w-1/12">
                                                            <input type="radio" id="ep14_1" name="ep14_1" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                        <td className="px-6 py-3 border-r-2 border-black  w-1/12">
                                                            <input type="radio" id="ep14_2" name="ep14_2" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                        <td className="px-6 py-3 border-r-2 border-black  w-1/12">
                                                            <input type="radio" id="ep14_3" name="ep14_3" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                        <td className="px-6 py-3 border-r-2 border-black  w-1/12">
                                                            <input type="radio" id="ep14_4" name="ep14_4" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                    </tr>
                                                    <tr className="border-2  border-black text-center">
                                                        <td className="px-6 py-3 border-r-2 border-black w-1/12" >15</td>
                                                        <td className="px-6 py-3 border-r-2 border-black w-7/12 text-left" >เมื่อทำผิดฉันสามารถกล่าวคำ ขอโทษ  ผู้อื่นได้ </td>
                                                        <td className="px-6 py-3 border-r-2 border-black w-1/12">
                                                            <input type="radio" id="ep15_1" name="ep15_1" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                        <td className="px-6 py-3 border-r-2 border-black  w-1/12">
                                                            <input type="radio" id="ep15_2" name="ep15_2" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                        <td className="px-6 py-3 border-r-2 border-black  w-1/12">
                                                            <input type="radio" id="ep15_3" name="ep15_3" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                        <td className="px-6 py-3 border-r-2 border-black  w-1/12">
                                                            <input type="radio" id="ep15_4" name="ep15_4" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                    </tr>
                                                    <tr className="border-2  border-black text-center">
                                                        <td className="px-6 py-3 border-r-2 border-black w-1/12" >16</td>
                                                        <td className="px-6 py-3 border-r-2 border-black w-7/12 text-left" >ฉันยอมรับข้อผิดพลาดของคนอื่นได้ยาก</td>
                                                        <td className="px-6 py-3 border-r-2 border-black w-1/12">
                                                            <input type="radio" id="ep16_1" name="ep16_1" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                        <td className="px-6 py-3 border-r-2 border-black  w-1/12">
                                                            <input type="radio" id="ep16_2" name="ep16_2" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                        <td className="px-6 py-3 border-r-2 border-black  w-1/12">
                                                            <input type="radio" id="ep16_3" name="ep16_3" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                        <td className="px-6 py-3 border-r-2 border-black  w-1/12">
                                                            <input type="radio" id="ep16_4" name="ep16_4" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                    </tr>
                                                    <tr className="border-2  border-black text-center">
                                                        <td className="px-6 py-3 border-r-2 border-black w-1/12" >17</td>
                                                        <td className="px-6 py-3 border-r-2 border-black w-7/12 text-left" >ถึงแม้จะเสียประโยชน์ส่วนตัวไปบ้าง ฉันก็ยินดีที่จะทำเพื่อส่วนรวม</td>
                                                        <td className="px-6 py-3 border-r-2 border-black w-1/12">
                                                            <input type="radio" id="ep17_1" name="ep17_1" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                        <td className="px-6 py-3 border-r-2 border-black  w-1/12">
                                                            <input type="radio" id="ep17_2" name="ep17_2" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                        <td className="px-6 py-3 border-r-2 border-black  w-1/12">
                                                            <input type="radio" id="ep17_3" name="ep17_3" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                        <td className="px-6 py-3 border-r-2 border-black  w-1/12">
                                                            <input type="radio" id="ep17_4" name="ep17_4" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                    </tr>
                                                    <tr className="border-2  border-black text-center">
                                                        <td className="px-6 py-3 border-r-2 border-black w-1/12" >18</td>
                                                        <td className="px-6 py-3 border-r-2 border-black w-7/12 text-left" >ฉันรู้สึกลำบากใจในการทำสิ่งใดสิ่งหนึ่งเพื่อผู้อื่น</td>
                                                        <td className="px-6 py-3 border-r-2 border-black w-1/12">
                                                            <input type="radio" id="ep18_1" name="ep18_1" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                        <td className="px-6 py-3 border-r-2 border-black  w-1/12">
                                                            <input type="radio" id="ep18_2" name="ep18_2" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                        <td className="px-6 py-3 border-r-2 border-black  w-1/12">
                                                            <input type="radio" id="ep18_3" name="ep18_3" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                        <td className="px-6 py-3 border-r-2 border-black  w-1/12">
                                                            <input type="radio" id="ep18_4" name="ep18_4" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                    </tr>
                                                    <tr className="border-2  border-black text-center">
                                                        <td className="px-6 py-3 border-r-2 border-black w-1/12" >19</td>
                                                        <td className="px-6 py-3 border-r-2 border-black w-7/12 text-left" >ฉันไม่รู้ว่าฉันเก่งเรื่องอะไร</td>
                                                        <td className="px-6 py-3 border-r-2 border-black w-1/12">
                                                            <input type="radio" id="ep19_1" name="ep19_1" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                        <td className="px-6 py-3 border-r-2 border-black  w-1/12">
                                                            <input type="radio" id="ep19_2" name="ep19_2" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                        <td className="px-6 py-3 border-r-2 border-black  w-1/12">
                                                            <input type="radio" id="ep19_3" name="ep19_3" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                        <td className="px-6 py-3 border-r-2 border-black  w-1/12">
                                                            <input type="radio" id="ep19_4" name="ep19_4" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                    </tr>
                                                    <tr className="border-2  border-black text-center">
                                                        <td className="px-6 py-3 border-r-2 border-black w-1/12" >20</td>
                                                        <td className="px-6 py-3 border-r-2 border-black w-7/12 text-left" >แม้จะเป็นงานยากฉันก็มั่นใจว่าสามารถทำได้</td>
                                                        <td className="px-6 py-3 border-r-2 border-black w-1/12">
                                                            <input type="radio" id="ep20_1" name="ep20_1" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                        <td className="px-6 py-3 border-r-2 border-black  w-1/12">
                                                            <input type="radio" id="ep20_2" name="ep20_2" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                        <td className="px-6 py-3 border-r-2 border-black  w-1/12">
                                                            <input type="radio" id="ep20_3" name="ep20_3" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                        <td className="px-6 py-3 border-r-2 border-black  w-1/12">
                                                            <input type="radio" id="ep20_4" name="ep20_4" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                    </tr>
                                                    <tr className="border-2  border-black text-center">
                                                        <td className="px-6 py-3 border-r-2 border-black w-1/12" >21</td>
                                                        <td className="px-6 py-3 border-r-2 border-black w-7/12 text-left" >เมื่อทำสิ่งใดไม่สำเร็จฉันรู้สึกหมดกำลังใจ</td>
                                                        <td className="px-6 py-3 border-r-2 border-black w-1/12">
                                                            <input type="radio" id="ep21_1" name="ep21_1" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                        <td className="px-6 py-3 border-r-2 border-black  w-1/12">
                                                            <input type="radio" id="ep21_2" name="ep21_2" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                        <td className="px-6 py-3 border-r-2 border-black  w-1/12">
                                                            <input type="radio" id="ep21_3" name="ep21_3" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                        <td className="px-6 py-3 border-r-2 border-black  w-1/12">
                                                            <input type="radio" id="ep21_4" name="ep21_4" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                    </tr>
                                                    <tr className="border-2  border-black text-center">
                                                        <td className="px-6 py-3 border-r-2 border-black w-1/12" >22</td>
                                                        <td className="px-6 py-3 border-r-2 border-black w-7/12 text-left" >ฉันรู้สึกมีคุณค่าเมื่อได้ทำสิ่งต่างๆ อย่างเต็มความสามารถ</td>
                                                        <td className="px-6 py-3 border-r-2 border-black w-1/12">
                                                            <input type="radio" id="ep22_1" name="ep22_1" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                        <td className="px-6 py-3 border-r-2 border-black  w-1/12">
                                                            <input type="radio" id="ep22_2" name="ep22_2" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                        <td className="px-6 py-3 border-r-2 border-black  w-1/12">
                                                            <input type="radio" id="ep22_3" name="ep22_3" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                        <td className="px-6 py-3 border-r-2 border-black  w-1/12">
                                                            <input type="radio" id="ep22_4" name="ep22_4" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                    </tr>
                                                    <tr className="border-2  border-black text-center">
                                                        <td className="px-6 py-3 border-r-2 border-black w-1/12" >23</td>
                                                        <td className="px-6 py-3 border-r-2 border-black w-7/12 text-left" >เมื่อต้องเผชิญกับอุปสรรคและความผิดหวัง ฉันก็จะไม่ยอมแพ้</td>
                                                        <td className="px-6 py-3 border-r-2 border-black w-1/12">
                                                            <input type="radio" id="ep23_1" name="ep23_1" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                        <td className="px-6 py-3 border-r-2 border-black  w-1/12">
                                                            <input type="radio" id="ep23_2" name="ep23_2" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                        <td className="px-6 py-3 border-r-2 border-black  w-1/12">
                                                            <input type="radio" id="ep23_3" name="ep23_3" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                        <td className="px-6 py-3 border-r-2 border-black  w-1/12">
                                                            <input type="radio" id="ep23_4" name="ep23_4" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                    </tr>
                                                    <tr className="border-2  border-black text-center">
                                                        <td className="px-6 py-3 border-r-2 border-black w-1/12" >24</td>
                                                        <td className="px-6 py-3 border-r-2 border-black w-7/12 text-left" >เมื่อเริ่มทำสิ่งหนึ่งสิ่งใด ฉันมักทำต่อไปไม่สำเร็จ</td>
                                                        <td className="px-6 py-3 border-r-2 border-black w-1/12">
                                                            <input type="radio" id="ep24_1" name="ep24_1" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                        <td className="px-6 py-3 border-r-2 border-black  w-1/12">
                                                            <input type="radio" id="ep24_2" name="ep24_2" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                        <td className="px-6 py-3 border-r-2 border-black  w-1/12">
                                                            <input type="radio" id="ep24_3" name="ep24_3" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                        <td className="px-6 py-3 border-r-2 border-black  w-1/12">
                                                            <input type="radio" id="ep24_4" name="ep24_4" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                    </tr>
                                                    <tr className="border-2  border-black text-center">
                                                        <td className="px-6 py-3 border-r-2 border-black w-1/12" >25</td>
                                                        <td className="px-6 py-3 border-r-2 border-black w-7/12 text-left" >ฉันพยายามหาสาเหตุที่แท้จริงของปัญหาโดยไม่คิดเอาเองตามใจชอบ</td>
                                                        <td className="px-6 py-3 border-r-2 border-black w-1/12">
                                                            <input type="radio" id="ep25_1" name="ep25_1" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                        <td className="px-6 py-3 border-r-2 border-black  w-1/12">
                                                            <input type="radio" id="ep25_2" name="ep25_2" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                        <td className="px-6 py-3 border-r-2 border-black  w-1/12">
                                                            <input type="radio" id="ep25_3" name="ep25_3" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                        <td className="px-6 py-3 border-r-2 border-black  w-1/12">
                                                            <input type="radio" id="ep25_4" name="ep25_4" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                    </tr>
                                                    <tr className="border-2  border-black text-center">
                                                        <td className="px-6 py-3 border-r-2 border-black w-1/12" >26</td>
                                                        <td className="px-6 py-3 border-r-2 border-black w-7/12 text-left" >บ่อยครั้งที่ฉันไม่รู้ว่าอะไรทำให้ฉันไม่มีความสุข</td>
                                                        <td className="px-6 py-3 border-r-2 border-black w-1/12">
                                                            <input type="radio" id="ep26_1" name="ep26_1" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                        <td className="px-6 py-3 border-r-2 border-black  w-1/12">
                                                            <input type="radio" id="ep26_2" name="ep26_2" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                        <td className="px-6 py-3 border-r-2 border-black  w-1/12">
                                                            <input type="radio" id="ep26_3" name="ep26_3" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                        <td className="px-6 py-3 border-r-2 border-black  w-1/12">
                                                            <input type="radio" id="ep26_4" name="ep26_4" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                    </tr>
                                                    <tr className="border-2  border-black text-center">
                                                        <td className="px-6 py-3 border-r-2 border-black w-1/12" >27</td>
                                                        <td className="px-6 py-3 border-r-2 border-black w-7/12 text-left" >ฉันรู้สึกว่าการตัดสินใจแก้ปัญหาเป็นเรื่องยากสำหรับฉัน</td>
                                                        <td className="px-6 py-3 border-r-2 border-black w-1/12">
                                                            <input type="radio" id="ep27_1" name="ep27_1" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                        <td className="px-6 py-3 border-r-2 border-black  w-1/12">
                                                            <input type="radio" id="ep27_2" name="ep27_2" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                        <td className="px-6 py-3 border-r-2 border-black  w-1/12">
                                                            <input type="radio" id="ep27_3" name="ep27_3" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                        <td className="px-6 py-3 border-r-2 border-black  w-1/12">
                                                            <input type="radio" id="ep27_4" name="ep27_4" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                    </tr>
                                                    <tr className="border-2  border-black text-center">
                                                        <td className="px-6 py-3 border-r-2 border-black w-1/12" >28</td>
                                                        <td className="px-6 py-3 border-r-2 border-black w-7/12 text-left" >เมื่อต้องทำอะไรบางอย่างในเวลาเดียวกันฉันตัดสินใจได้ว่าจะทำอะไรก่อนหลัง</td>
                                                        <td className="px-6 py-3 border-r-2 border-black w-1/12">
                                                            <input type="radio" id="ep28_1" name="ep28_1" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                        <td className="px-6 py-3 border-r-2 border-black  w-1/12">
                                                            <input type="radio" id="ep28_2" name="ep28_2" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                        <td className="px-6 py-3 border-r-2 border-black  w-1/12">
                                                            <input type="radio" id="ep28_3" name="ep28_3" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                        <td className="px-6 py-3 border-r-2 border-black  w-1/12">
                                                            <input type="radio" id="ep28_4" name="ep28_4" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                    </tr>
                                                    <tr className="border-2  border-black text-center">
                                                        <td className="px-6 py-3 border-r-2 border-black w-1/12" >29</td>
                                                        <td className="px-6 py-3 border-r-2 border-black w-7/12 text-left" >ฉันลำบากใจเมื่อต้องอยู่กับคนแปลกหน้าหรือคนที่ไม่คุ้นเคย</td>
                                                        <td className="px-6 py-3 border-r-2 border-black w-1/12">
                                                            <input type="radio" id="ep29_1" name="ep29_1" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                        <td className="px-6 py-3 border-r-2 border-black  w-1/12">
                                                            <input type="radio" id="ep29_2" name="ep29_2" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                        <td className="px-6 py-3 border-r-2 border-black  w-1/12">
                                                            <input type="radio" id="ep29_3" name="ep29_3" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                        <td className="px-6 py-3 border-r-2 border-black  w-1/12">
                                                            <input type="radio" id="ep29_4" name="ep29_4" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                    </tr>
                                                    <tr className="border-2  border-black text-center">
                                                        <td className="px-6 py-3 border-r-2 border-black w-1/12" >30</td>
                                                        <td className="px-6 py-3 border-r-2 border-black w-7/12 text-left" >ฉันทนไม่ได้เมื่อต้องอยู่ในสังคมที่มีกฎระเบียบขัดกับความเคยชินกับฉัน</td>
                                                        <td className="px-6 py-3 border-r-2 border-black w-1/12">
                                                            <input type="radio" id="ep30_1" name="ep30_1" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                        <td className="px-6 py-3 border-r-2 border-black  w-1/12">
                                                            <input type="radio" id="ep30_2" name="ep30_2" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                        <td className="px-6 py-3 border-r-2 border-black  w-1/12">
                                                            <input type="radio" id="ep30_3" name="ep30_3" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                        <td className="px-6 py-3 border-r-2 border-black  w-1/12">
                                                            <input type="radio" id="ep30_4" name="ep30_4" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                    </tr>


                                                </table>
                                            </div>
                                            <div className="bg-white   py-8  px-5 mt-5" >

                                                <table className="rounded-t-lg m-5  w-full mx-auto bg-white text-black border-black">

                                                    <tr className="border-2  border-black text-center">
                                                        <th className="px-6 py-3 border-r-2 border-black w-1/12" >ข้อ</th>
                                                        <th className="px-6 py-3 border-r-2 border-black w-7/12" >ข้อความ</th>
                                                        <th className="px-6 py-3 border-r-2 border-black w-1/12">ไม่จริง</th>
                                                        <th className="px-6 py-3 border-r-2 border-black  w-1/12">จริงบางครั้ง</th>
                                                        <th className="px-6 py-3 border-r-2 border-black  w-1/12">ค่อนข้างจริง</th>
                                                        <th className="px-6 py-3 border-r-2 border-black  w-1/12">จริงมาก</th>
                                                    </tr>
                                                    <tr className="border-2  border-black text-center">
                                                        <td className="px-6 py-3 border-r-2 border-black w-1/12" >31</td>
                                                        <td className="px-6 py-3 border-r-2 border-black w-7/12 text-left" >ฉันทำความรู้จักผู้อื่นได้ง่าย</td>
                                                        <td className="px-6 py-3 border-r-2 border-black w-1/12">
                                                            <input type="radio" id="ep31_1" name="ep31_1" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                        <td className="px-6 py-3 border-r-2 border-black  w-1/12">
                                                            <input type="radio" id="ep31_2" name="ep31_2" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                        <td className="px-6 py-3 border-r-2 border-black  w-1/12">
                                                            <input type="radio" id="ep31_3" name="ep31_3" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                        <td className="px-6 py-3 border-r-2 border-black  w-1/12">
                                                            <input type="radio" id="ep31_4" name="ep31_4" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                    </tr>
                                                    <tr className="border-2  border-black text-center">
                                                        <td className="px-6 py-3 border-r-2 border-black w-1/12" >32</td>
                                                        <td className="px-6 py-3 border-r-2 border-black w-7/12 text-left" >ฉันมีเพื่อนสนิทหลายคนที่คบกันมานาน</td>
                                                        <td className="px-6 py-3 border-r-2 border-black w-1/12">
                                                            <input type="radio" id="ep32_1" name="ep32_1" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                        <td className="px-6 py-3 border-r-2 border-black  w-1/12">
                                                            <input type="radio" id="ep32_2" name="ep32_2" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                        <td className="px-6 py-3 border-r-2 border-black  w-1/12">
                                                            <input type="radio" id="ep32_3" name="ep32_3" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                        <td className="px-6 py-3 border-r-2 border-black  w-1/12">
                                                            <input type="radio" id="ep32_4" name="ep32_4" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                    </tr>
                                                    <tr className="border-2  border-black text-center">
                                                        <td className="px-6 py-3 border-r-2 border-black w-1/12" >33</td>
                                                        <td className="px-6 py-3 border-r-2 border-black w-7/12 text-left" >ฉันไม่กล้าบอกความต้องการของฉันให้ผู้อื่นรับรู้</td>
                                                        <td className="px-6 py-3 border-r-2 border-black w-1/12">
                                                            <input type="radio" id="ep33_1" name="ep33_1" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                        <td className="px-6 py-3 border-r-2 border-black  w-1/12">
                                                            <input type="radio" id="ep33_2" name="ep33_2" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                        <td className="px-6 py-3 border-r-2 border-black  w-1/12">
                                                            <input type="radio" id="ep33_3" name="ep33_3" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                        <td className="px-6 py-3 border-r-2 border-black  w-1/12">
                                                            <input type="radio" id="ep33_4" name="ep33_4" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                    </tr>
                                                    <tr className="border-2  border-black text-center">
                                                        <td className="px-6 py-3 border-r-2 border-black w-1/12" >34</td>
                                                        <td className="px-6 py-3 border-r-2 border-black w-7/12 text-left" >ฉันทำในสิ่งที่ต้องการโดยไม่ทำให้ผู้อื่นเดือดร้อน</td>
                                                        <td className="px-6 py-3 border-r-2 border-black w-1/12">
                                                            <input type="radio" id="ep34_1" name="ep34_1" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                        <td className="px-6 py-3 border-r-2 border-black  w-1/12">
                                                            <input type="radio" id="ep34_2" name="ep34_2" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                        <td className="px-6 py-3 border-r-2 border-black  w-1/12">
                                                            <input type="radio" id="ep34_3" name="ep34_3" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                        <td className="px-6 py-3 border-r-2 border-black  w-1/12">
                                                            <input type="radio" id="ep34_4" name="ep34_4" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                    </tr>
                                                    <tr className="border-2  border-black text-center">
                                                        <td className="px-6 py-3 border-r-2 border-black w-1/12" >35</td>
                                                        <td className="px-6 py-3 border-r-2 border-black w-7/12 text-left" >เป็นการยากสำหรับฉันที่จะโต้แย้งกับผู้อื่น แม้จะมีเหตุผลเพียงพอ</td>
                                                        <td className="px-6 py-3 border-r-2 border-black w-1/12">
                                                            <input type="radio" id="ep35_1" name="ep35_1" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                        <td className="px-6 py-3 border-r-2 border-black  w-1/12">
                                                            <input type="radio" id="ep35_2" name="ep35_2" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                        <td className="px-6 py-3 border-r-2 border-black  w-1/12">
                                                            <input type="radio" id="ep35_3" name="ep35_3" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                        <td className="px-6 py-3 border-r-2 border-black  w-1/12">
                                                            <input type="radio" id="ep35_4" name="ep35_4" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                    </tr>
                                                    <tr className="border-2  border-black text-center">
                                                        <td className="px-6 py-3 border-r-2 border-black w-1/12" >36</td>
                                                        <td className="px-6 py-3 border-r-2 border-black w-7/12 text-left" >เมื่อไม่เห็นด้วยกับผู้อื่นฉันสามารถอธิบายเหตุผลที่เขายอมรับได้ ฉันอธิบายเหตุผลจนผู้อื่นยอมรับไม่ได้</td>
                                                        <td className="px-6 py-3 border-r-2 border-black w-1/12">
                                                            <input type="radio" id="ep36_1" name="ep36_1" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                        <td className="px-6 py-3 border-r-2 border-black  w-1/12">
                                                            <input type="radio" id="ep36_2" name="ep36_2" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                        <td className="px-6 py-3 border-r-2 border-black  w-1/12">
                                                            <input type="radio" id="ep36_3" name="ep36_3" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                        <td className="px-6 py-3 border-r-2 border-black  w-1/12">
                                                            <input type="radio" id="ep36_4" name="ep36_4" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                    </tr>
                                                    <tr className="border-2  border-black text-center">
                                                        <td className="px-6 py-3 border-r-2 border-black w-1/12" >37</td>
                                                        <td className="px-6 py-3 border-r-2 border-black w-7/12 text-left" >ฉันรู้สึกว่าด้อยกว่าคนอื่น</td>
                                                        <td className="px-6 py-3 border-r-2 border-black w-1/12">
                                                            <input type="radio" id="ep37_1" name="ep37_1" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                        <td className="px-6 py-3 border-r-2 border-black  w-1/12">
                                                            <input type="radio" id="ep37_2" name="ep37_2" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                        <td className="px-6 py-3 border-r-2 border-black  w-1/12">
                                                            <input type="radio" id="ep37_3" name="ep37_3" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                        <td className="px-6 py-3 border-r-2 border-black  w-1/12">
                                                            <input type="radio" id="ep37_4" name="ep37_4" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                    </tr>
                                                    <tr className="border-2  border-black text-center">
                                                        <td className="px-6 py-3 border-r-2 border-black w-1/12" >38</td>
                                                        <td className="px-6 py-3 border-r-2 border-black w-7/12 text-left" >ฉันทำหน้าที่ได้ดี ไม่ว่าจะอยู่ในบทบาทใด</td>
                                                        <td className="px-6 py-3 border-r-2 border-black w-1/12">
                                                            <input type="radio" id="ep38_1" name="ep38_1" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                        <td className="px-6 py-3 border-r-2 border-black  w-1/12">
                                                            <input type="radio" id="ep38_2" name="ep38_2" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                        <td className="px-6 py-3 border-r-2 border-black  w-1/12">
                                                            <input type="radio" id="ep38_3" name="ep38_3" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                        <td className="px-6 py-3 border-r-2 border-black  w-1/12">
                                                            <input type="radio" id="ep38_4" name="ep38_4" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                    </tr>
                                                    <tr className="border-2  border-black text-center">
                                                        <td className="px-6 py-3 border-r-2 border-black w-1/12" >39</td>
                                                        <td className="px-6 py-3 border-r-2 border-black w-7/12 text-left" >ฉันสามารถทำงานที่ได้รับมอบหมายได้ดีที่สุด</td>
                                                        <td className="px-6 py-3 border-r-2 border-black w-1/12">
                                                            <input type="radio" id="ep39_1" name="ep39_1" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                        <td className="px-6 py-3 border-r-2 border-black  w-1/12">
                                                            <input type="radio" id="ep39_2" name="ep39_2" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                        <td className="px-6 py-3 border-r-2 border-black  w-1/12">
                                                            <input type="radio" id="ep39_3" name="ep39_3" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                        <td className="px-6 py-3 border-r-2 border-black  w-1/12">
                                                            <input type="radio" id="ep39_4" name="ep39_4" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                    </tr>
                                                    <tr className="border-2  border-black text-center">
                                                        <td className="px-6 py-3 border-r-2 border-black w-1/12" >40</td>
                                                        <td className="px-6 py-3 border-r-2 border-black w-7/12 text-left" >ฉันไม่มั่นใจในการทำงานที่ยากลำบาก</td>
                                                        <td className="px-6 py-3 border-r-2 border-black w-1/12">
                                                            <input type="radio" id="ep40_1" name="ep40_1" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                        <td className="px-6 py-3 border-r-2 border-black  w-1/12">
                                                            <input type="radio" id="ep40_2" name="ep40_2" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                        <td className="px-6 py-3 border-r-2 border-black  w-1/12">
                                                            <input type="radio" id="ep40_3" name="ep40_3" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                        <td className="px-6 py-3 border-r-2 border-black  w-1/12">
                                                            <input type="radio" id="ep40_4" name="ep40_4" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                    </tr>
                                                    <tr className="border-2  border-black text-center">
                                                        <td className="px-6 py-3 border-r-2 border-black w-1/12" >41</td>
                                                        <td className="px-6 py-3 border-r-2 border-black w-7/12 text-left" >แม้สถานการณ์จะเลวร้าย ฉันก็มีความหวังว่าจะดีขึ้น</td>
                                                        <td className="px-6 py-3 border-r-2 border-black w-1/12">
                                                            <input type="radio" id="ep41_1" name="ep41_1" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                        <td className="px-6 py-3 border-r-2 border-black  w-1/12">
                                                            <input type="radio" id="ep41_2" name="ep41_2" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                        <td className="px-6 py-3 border-r-2 border-black  w-1/12">
                                                            <input type="radio" id="ep41_3" name="ep41_3" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                        <td className="px-6 py-3 border-r-2 border-black  w-1/12">
                                                            <input type="radio" id="ep41_4" name="ep41_4" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                    </tr>
                                                    <tr className="border-2  border-black text-center">
                                                        <td className="px-6 py-3 border-r-2 border-black w-1/12" >42</td>
                                                        <td className="px-6 py-3 border-r-2 border-black w-7/12 text-left" > ทุกปัญหามักมีทางออกเสมอ </td>
                                                        <td className="px-6 py-3 border-r-2 border-black w-1/12">
                                                            <input type="radio" id="ep42_1" name="ep42_1" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                        <td className="px-6 py-3 border-r-2 border-black  w-1/12">
                                                            <input type="radio" id="ep42_2" name="ep42_2" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                        <td className="px-6 py-3 border-r-2 border-black  w-1/12">
                                                            <input type="radio" id="ep42_3" name="ep42_3" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                        <td className="px-6 py-3 border-r-2 border-black  w-1/12">
                                                            <input type="radio" id="ep42_4" name="ep42_4" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                    </tr>
                                                    <tr className="border-2  border-black text-center">
                                                        <td className="px-6 py-3 border-r-2 border-black w-1/12" >43</td>
                                                        <td className="px-6 py-3 border-r-2 border-black w-7/12 text-left" >เมื่อมีเรื่องทำให้เครียด ฉันมักปรับเปลี่ยนให้เป็นเรื่องผ่อนคลาย  หรือสนุกสนาน</td>
                                                        <td className="px-6 py-3 border-r-2 border-black w-1/12">
                                                            <input type="radio" id="ep43_1" name="ep43_1" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                        <td className="px-6 py-3 border-r-2 border-black  w-1/12">
                                                            <input type="radio" id="ep43_2" name="ep43_2" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                        <td className="px-6 py-3 border-r-2 border-black  w-1/12">
                                                            <input type="radio" id="ep43_3" name="ep43_3" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                        <td className="px-6 py-3 border-r-2 border-black  w-1/12">
                                                            <input type="radio" id="ep43_4" name="ep43_4" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                    </tr>
                                                    <tr className="border-2  border-black text-center">
                                                        <td className="px-6 py-3 border-r-2 border-black w-1/12" >44</td>
                                                        <td className="px-6 py-3 border-r-2 border-black w-7/12 text-left" >ฉันสนุกสนานทุกครั้งกับกิจกรรมในวันสุดสัปดาห์และวันหยุดพักผ่อน</td>
                                                        <td className="px-6 py-3 border-r-2 border-black w-1/12">
                                                            <input type="radio" id="ep44_1" name="ep44_1" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                        <td className="px-6 py-3 border-r-2 border-black  w-1/12">
                                                            <input type="radio" id="ep44_2" name="ep44_2" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                        <td className="px-6 py-3 border-r-2 border-black  w-1/12">
                                                            <input type="radio" id="ep44_3" name="ep44_3" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                        <td className="px-6 py-3 border-r-2 border-black  w-1/12">
                                                            <input type="radio" id="ep44_4" name="ep44_4" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                    </tr>
                                                    <tr className="border-2  border-black text-center">
                                                        <td className="px-6 py-3 border-r-2 border-black w-1/12" >45</td>
                                                        <td className="px-6 py-3 border-r-2 border-black w-7/12 text-left" >ฉันรู้สึกไม่พอใจที่ผู้อื่นได้รับสิ่งดีๆ มากกว่าฉัน</td>
                                                        <td className="px-6 py-3 border-r-2 border-black w-1/12">
                                                            <input type="radio" id="ep45_1" name="ep45_1" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                        <td className="px-6 py-3 border-r-2 border-black  w-1/12">
                                                            <input type="radio" id="ep45_2" name="ep45_2" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                        <td className="px-6 py-3 border-r-2 border-black  w-1/12">
                                                            <input type="radio" id="ep45_3" name="ep45_3" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                        <td className="px-6 py-3 border-r-2 border-black  w-1/12">
                                                            <input type="radio" id="ep45_4" name="ep45_4" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                    </tr>
                                                    <tr className="border-2  border-black text-center">
                                                        <td className="px-6 py-3 border-r-2 border-black w-1/12" >46</td>
                                                        <td className="px-6 py-3 border-r-2 border-black w-7/12 text-left" >ฉันพอใจกับสิ่งที่ฉันเป็นอยู่</td>
                                                        <td className="px-6 py-3 border-r-2 border-black w-1/12">
                                                            <input type="radio" id="ep46_1" name="ep46_1" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                        <td className="px-6 py-3 border-r-2 border-black  w-1/12">
                                                            <input type="radio" id="ep46_2" name="ep46_2" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                        <td className="px-6 py-3 border-r-2 border-black  w-1/12">
                                                            <input type="radio" id="ep46_3" name="ep46_3" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                        <td className="px-6 py-3 border-r-2 border-black  w-1/12">
                                                            <input type="radio" id="ep46_4" name="ep46_4" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                    </tr>
                                                    <tr className="border-2  border-black text-center">
                                                        <td className="px-6 py-3 border-r-2 border-black w-1/12" >47</td>
                                                        <td className="px-6 py-3 border-r-2 border-black w-7/12 text-left" >ฉันไม่รู้ว่าจะหาอะไรทำ เมื่อรู้สึกเบื่อหน่าย</td>
                                                        <td className="px-6 py-3 border-r-2 border-black w-1/12">
                                                            <input type="radio" id="ep47_1" name="ep47_1" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                        <td className="px-6 py-3 border-r-2 border-black  w-1/12">
                                                            <input type="radio" id="ep47_2" name="ep47_2" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                        <td className="px-6 py-3 border-r-2 border-black  w-1/12">
                                                            <input type="radio" id="ep47_3" name="ep47_3" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                        <td className="px-6 py-3 border-r-2 border-black  w-1/12">
                                                            <input type="radio" id="ep47_4" name="ep47_4" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                    </tr>
                                                    <tr className="border-2  border-black text-center">
                                                        <td className="px-6 py-3 border-r-2 border-black w-1/12" >48</td>
                                                        <td className="px-6 py-3 border-r-2 border-black w-7/12 text-left" >เมื่อวันว่างจากภาระหน้าที่ ฉันจะทำในสิ่งที่ฉันชอบ</td>
                                                        <td className="px-6 py-3 border-r-2 border-black w-1/12">
                                                            <input type="radio" id="ep48_1" name="ep48_1" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                        <td className="px-6 py-3 border-r-2 border-black  w-1/12">
                                                            <input type="radio" id="ep48_2" name="ep48_2" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                        <td className="px-6 py-3 border-r-2 border-black  w-1/12">
                                                            <input type="radio" id="ep48_3" name="ep48_3" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                        <td className="px-6 py-3 border-r-2 border-black  w-1/12">
                                                            <input type="radio" id="ep48_4" name="ep48_4" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                    </tr>
                                                    <tr className="border-2  border-black text-center">
                                                        <td className="px-6 py-3 border-r-2 border-black w-1/12" >49</td>
                                                        <td className="px-6 py-3 border-r-2 border-black w-7/12 text-left" >เมื่อรู้สึกไม่สบายใจ ฉันมีวิธีผ่อนคลายอารมณ์ได้</td>
                                                        <td className="px-6 py-3 border-r-2 border-black w-1/12">
                                                            <input type="radio" id="ep49_1" name="ep49_1" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                        <td className="px-6 py-3 border-r-2 border-black  w-1/12">
                                                            <input type="radio" id="ep49_2" name="ep49_2" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                        <td className="px-6 py-3 border-r-2 border-black  w-1/12">
                                                            <input type="radio" id="ep49_3" name="ep49_3" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                        <td className="px-6 py-3 border-r-2 border-black  w-1/12">
                                                            <input type="radio" id="ep49_4" name="ep49_4" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                    </tr>
                                                    <tr className="border-2  border-black text-center">
                                                        <td className="px-6 py-3 border-r-2 border-black w-1/12" >50</td>
                                                        <td className="px-6 py-3 border-r-2 border-black w-7/12 text-left" >ฉันสามารถผ่อนคลายตนเองได้ แม้จะเหน็ดเหนื่อยจากภาระหน้าที่</td>
                                                        <td className="px-6 py-3 border-r-2 border-black w-1/12">
                                                            <input type="radio" id="ep50_1" name="ep50_1" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                        <td className="px-6 py-3 border-r-2 border-black  w-1/12">
                                                            <input type="radio" id="ep50_2" name="ep50_2" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                        <td className="px-6 py-3 border-r-2 border-black  w-1/12">
                                                            <input type="radio" id="ep50_3" name="ep50_3" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                        <td className="px-6 py-3 border-r-2 border-black  w-1/12">
                                                            <input type="radio" id="ep50_4" name="ep50_4" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                    </tr>
                                                    <tr className="border-2  border-black text-center">
                                                        <td className="px-6 py-3 border-r-2 border-black w-1/12" >51</td>
                                                        <td className="px-6 py-3 border-r-2 border-black w-7/12 text-left" >ฉันไม่สามารถทำใจให้เป็นสุขได้จนกว่าจะได้ทุกสิ่งที่ต้องการ</td>
                                                        <td className="px-6 py-3 border-r-2 border-black w-1/12">
                                                            <input type="radio" id="ep51_1" name="ep51_1" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                        <td className="px-6 py-3 border-r-2 border-black  w-1/12">
                                                            <input type="radio" id="ep51_2" name="ep51_2" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                        <td className="px-6 py-3 border-r-2 border-black  w-1/12">
                                                            <input type="radio" id="ep51_3" name="ep51_3" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                        <td className="px-6 py-3 border-r-2 border-black  w-1/12">
                                                            <input type="radio" id="ep51_4" name="ep51_4" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                    </tr>
                                                    <tr className="border-2  border-black text-center">
                                                        <td className="px-6 py-3 border-r-2 border-black w-1/12" >52</td>
                                                        <td className="px-6 py-3 border-r-2 border-black w-7/12 text-left" >ฉันทุกข์ร้อนกับเรื่องเล็กๆ น้อยๆ ที่เกิดขึ้นเสมอ</td>
                                                        <td className="px-6 py-3 border-r-2 border-black w-1/12">
                                                            <input type="radio" id="ep52_1" name="ep52_1" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                        <td className="px-6 py-3 border-r-2 border-black  w-1/12">
                                                            <input type="radio" id="ep52_2" name="ep52_2" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                        <td className="px-6 py-3 border-r-2 border-black  w-1/12">
                                                            <input type="radio" id="ep52_3" name="ep52_3" value="1" className="    w-5 h-5 mr-4" />

                                                        </td>
                                                        <td className="px-6 py-3 border-r-2 border-black  w-1/12">
                                                            <input type="radio" id="ep52_4" name="ep52_4" value="1" className="    w-5 h-5 mr-4" />

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

                    </div>
                </main >


            </div >
        </div >
    )
}

export default Assessment
