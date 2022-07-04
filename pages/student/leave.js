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
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getleave_count, getleave, getleave_category, postleave } from '../../action/student';

function Leave() {

    const [Hours, setHours] = useState(false)
    const [Day, setDay] = useState(true)
    const [timeselect, settimeselect] = useState({
        first: " 00:00:00",
        end: " 00:00:00"
    })
    const [StartDate, setStartDate] = useState(new Date());
    const [EndDate, setEndDate] = useState(new Date());
    const [valueCount, setvalueCount] = useState();
    const [dropdown, setdropdown] = useState();
    const [values, setValues] = useState();
    const [valuesPost, setvaluesPost] = useState({
        "leave_person": "",
        "classroom_code": "",
        "leave_type": "1",
        "leave_from": moment(new Date()).format('YYYY-MM-DD'),
        "leave_to": moment(new Date()).format('YYYY-MM-DD'),
        "category_code": "1",
        "leave_status": 1,
        "approve_person": "",
        "approve_date": moment(new Date()).format('YYYY-MM-DD'),
        "detail": ""
    });

    const [who, setwho] = useState();
    const [roomid, setroomid] = useState();
    const [THdate, setTHdate] = useState("")

    const Dataload = async (student_code) => {
        let data_dropdown = await getleave_category(student_code);
        let data_count = await getleave_count(student_code);
        let data = await getleave(student_code);
        setvalueCount(data_count[0].COUNT)
        setValues(data.data)
        setdropdown(data_dropdown)
        console.log(data_count)
        console.log(data)
        console.log(data_dropdown)
    }

    const SaveSubmit = async () => {
        let res_data = ""
        let save_leave = valuesPost
        save_leave.approve_person = who
        save_leave.leave_person = who
        save_leave.classroom_code = roomid
        save_leave.leave_from = save_leave.leave_from + timeselect.first
        save_leave.leave_to = save_leave.leave_to + timeselect.end
        res_data = await postleave(save_leave)
        console.log("save_leave", save_leave)
        console.log("res_data", res_data)
        let data_count = await getleave_count(who);
        setvalueCount(data_count[0].COUNT)
        let data = await getleave(who);
        setvaluesPost({
            "leave_person": "",
            "classroom_code": "",
            "leave_type": "1",
            "leave_from": moment(new Date()).format('YYYY-MM-DD'),
            "leave_to": moment(new Date()).format('YYYY-MM-DD'),
            "category_code": "1",
            "leave_status": 1,
            "approve_person": "",
            "approve_date": moment(new Date()).format('YYYY-MM-DD'),
            "detail": ""
        }
        )
    }
    const handleChange = (name, e) => {

        if (name == 'leave_from' || name == 'leave_to') {

            valuesPost[name] = moment(e).format('YYYY-MM-DD');
        }

        else {
            valuesPost[name] = e.target.value;
        }

        setvaluesPost({ ...valuesPost });


    }
    const detailshow = async () => {
        let data = await getleave(who);
        setValues(data.data)
        setShowModal(true)
    }
    useEffect(() => {
        let student_code = localStorage.getItem('LoginId');
        let student_room = localStorage.getItem('LoginRoomId');
        setwho(student_code)
        setroomid(student_room)
        Dataload(student_code)
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
    const timechange = (name, e) => {
        timeselect[name] = " " + e.target.value
        settimeselect({ ...timeselect })
    }

    const day = () => {
        setDay(true)
        setHours(false)
        let data = "1"
        valuesPost.leave_type = data
        // console.log("valuesPost.category_code",valuesPost.category_code)
        // console.log("วัน")
    }
    const hours = () => {
        setDay(false)
        setHours(true)
        let data = "2"
        valuesPost.leave_type = data
        // console.log("valuesPost.category_code",valuesPost.category_code)
        // console.log("ชั่วโมง")
    }
    const [showModal, setShowModal] = useState(false);

    return (
        <div>
            <div className="flex flex-row min-h-screen bg-gray-100 text-gray-800 z-40 absolute w-full ">


                <Sidebar></Sidebar>

                <main className="flex flex-col flex-grow w-full transition-all duration-150 ease-in md:w-4/5 main md:ml-0">
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


                                <h1 className="   lg:text-xl text-base text-right  text-color-blue">
                                    <Clock format={'HH:mm:ss'} ticking={true} timezone={'Asia/Bangkok'} />
                                </h1>
                            </div>

                            <h1 className="   text-xl text-center text-color-blue mb-4">แจ้งลาหยุด</h1>
                            {(valuesPost) ? (
                                <>
                                    <div className="flex flex-col w-full h-full sm:flex-row  md:flex-row lg:flex-row">
                                        <div className="lg:w-1/2 sm:w-full border-2  border-blue-800 p-4  m-1  rounded ">
                                            <div className="flex flex-col mb-1 text-color-blue">
                                                เลือกวันที่ต้องการลาหยุด
                                            </div>
                                            <div className="flex flex-row mb-1  w-full">


                                                <div className="switch-field flex flex-row w-full">
                                                    <div className=" xl:w-1/4 ">
                                                    </div>
                                                    <div className="xl:w-1/4 text-center  sm:w-2/4">
                                                        <input type="radio" id="Day" name="switch-one" className=" mr-2  w-5 h-5 " onClick={() => day()} />
                                                        <label htmlFor="Day" className=" mr-2  text-color-blue">เต็มวัน</label>
                                                    </div>


                                                    <div className="xl:w-1/4 text-center sm:w-2/4">
                                                        <input type="radio" id="Hours" name="switch-one" value="Hours" className=" mr-2  w-5 h-5" onClick={() => hours()} />
                                                        <label htmlFor="Hours " className="text-color-blue"> รายชั่วโมง</label>
                                                    </div>
                                                    <div className=" xl:w-1/4 ">
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex flex-col mb-1 border-2  border-blue-800  p-4      rounded">

                                                {(Day) ?
                                                    <div className="flex flex-col text-center ">
                                                        <div className="flex flex-row items-center ">
                                                            <div className=" w-1/6">

                                                            </div>
                                                            <div className=" w-1/6 text-color-blue">
                                                                จาก
                                                            </div>

                                                            <div className="text-center">

                                                                <DatePicker minDate={new Date()} selected={new Date(valuesPost.leave_from)} onChange={(e) => handleChange('leave_from', e)} className=" text-center text-blue-800 border-2 border-blue-800 p-2 m-2 rounded-lg  outline-none w-full " />

                                                            </div>

                                                            <div className=" w-1/6">

                                                            </div>
                                                        </div>
                                                        <div className="flex flex-row items-center">
                                                            <div className=" w-1/6">

                                                            </div>
                                                            <div className=" w-1/6 text-color-blue">
                                                                ถึง
                                                            </div>

                                                            <div className="text-center">
                                                                <DatePicker minDate={new Date()} selected={new Date(valuesPost.leave_to)} onChange={(e) => handleChange('leave_to', e)} className=" text-center text-blue-800 border-2 border-blue-800 p-2 m-2 rounded-lg  outline-none w-full " />

                                                            </div>
                                                            <div className=" w-1/6">

                                                            </div>
                                                        </div>

                                                    </div>
                                                    : ""}

                                                {(Hours) ?
                                                    <div className="flex flex-col text-center ">
                                                        <div className="flex flex-row items-center ">
                                                            <div className=" w-1/6">

                                                            </div>
                                                            <div className=" w-1/6 text-color-blue">
                                                                จาก
                                                            </div>
                                                            <div className="text-center">

                                                                <DatePicker minDate={new Date()} selected={new Date(valuesPost.leave_from)} onChange={(e) => handleChange('leave_from', e)} className=" text-center text-blue-800 border-2 border-blue-800 p-2 m-2 rounded  outline-none " />

                                                            </div>
                                                            <div className="w-1/2 flex flex-row">
                                                                <input type="time" onChange={(e) => timechange("first", e)} className="text-center text-blue-800 border-2 border-blue-800 p-2 m-2 rounded  outline-none" />

                                                            </div>

                                                            <div className=" w-1/6">

                                                            </div>
                                                        </div>
                                                        <div className="flex flex-row items-center">
                                                            <div className=" w-1/6">

                                                            </div>
                                                            <div className=" w-1/6 text-color-blue">
                                                                ถึง
                                                            </div>
                                                            <div className="text-center">
                                                                <DatePicker minDate={new Date()} selected={new Date(valuesPost.leave_to)} onChange={(e) => handleChange('leave_to', e)} className=" text-center text-blue-800 border-2 border-blue-800 p-2 m-2 rounded  outline-none " />

                                                            </div>
                                                            <div className="w-1/2 flex flex-row">
                                                                <input type="time" onChange={(e) => timechange("end", e)} className="text-center text-blue-800 border-2 border-blue-800 p-2 m-2 rounded  outline-none" />
                                                            </div>
                                                            <div className=" w-1/6">

                                                            </div>
                                                        </div>

                                                    </div>
                                                    : ""}
                                            </div>


                                            <div className="flex flex-col  mb-1 text-color-blue">
                                                เลือกเหตุผลที่ต้องการลาหยุด
                                            </div>
                                            <div className="flex flex-col ">

                                                <select className="rounded  p-1  border-2 border-blue-800 text-color-blue outline-none" value={valuesPost.category_code} onChange={(e) => handleChange('category_code', e)} >

                                                    {dropdown ? dropdown.map((p, index) => (
                                                        <option key={index + 1} value={p.category_code}>{p.category_name}</option>
                                                    )) : ""}

                                                </select>

                                            </div>
                                        </div>
                                        <div className="border-2 border-blue-800 m-1    rounded sm:w-full lg:w-1/2">
                                            <button type="button" className=" w-full h-full mr-2   text-center bg-blue-800  " onClick={() => detailshow()}>

                                                <div className=" h-2/6 text-white pt-10 text-xl">
                                                    วันลาสะสม
                                                </div>
                                                <div className=" md:text-12xl  lg:text-8xl sm:text-12xl  h-4/6 m-auto   pb-10 text-white">
                                                    {(valueCount) ? valueCount
                                                        : <h1>ไม่มีข้อมูล</h1>}
                                                </div>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="flex flex-col w-full  h-3/6  ">
                                        <div className="  h-full flex flex-col p-4 text-color-blue border-2  border-blue-800 m-1    rounded">

                                            ระบุเหตุผลการลาหยุด
                                            <div className="mt-4">
                                                <textarea value={valuesPost.detail} onChange={(e) => handleChange('detail', e)} name="" id="" cols="30" rows="10" className="rounded w-full resize-none border-2 border-blue-800  focus:border-blue-800 focus:border-2 outline-none">

                                                </textarea>

                                            </div>
                                        </div>
                                    </div>
                                    <div className=" w-full text-right">
                                        <button
                                            className="   w-40  h-16 shadow hover:shadow-lg text-white bg-blue-600 hover:text-blue-600   border-2   border-white hover:border-blue-600  hover:bg-white rounded-lg background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                            type="button"
                                            onClick={() => SaveSubmit()}
                                        >
                                            บันทึก
                                        </button>
                                    </div>
                                </>
                            ) : ""}
                        </div>
                        {/* Modal */}
                        {showModal ? (
                            <>
                                <div
                                    className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                                >
                                    <div className="relative w-auto   mt-28 mb-6 mx-auto max-w-4xl  max-h-auto ">
                                        {/*content*/}
                                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                            {/*header*/}
                                            <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t text-color-blue">
                                                <h3 className="text-2xl font-semibold text-center w-full ml-5">
                                                    วันลาสะสม
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
                                            <div className="relative px-6 flex-auto ">
                                                <table className="rounded-t-lg m-5  w-full mx-auto bg-blue-200 text-blue-800">
                                                    <tr className=" border-b-2 border-blue-300 text-center">
                                                        <th className="px-6 py-3">วันที่ลา</th>
                                                        <th className="px-6 py-3">ประเภทการลา</th>
                                                        <th className="px-6 py-3">เหตุผลการลา</th>

                                                    </tr>
                                                    {(values) ? values.map((p, index) => (

                                                        <tr key={index + 1} className="bg-blue-100 border-b border-blue-200 text-center">
                                                            <td className="px-6 py-3">{moment(p.Start_date).format("DD/MM/YYYY")} - {moment(p.End_date).format("DD/MM/YYYY")}</td>
                                                            <td className="px-6 py-3">{p.category_name}</td>
                                                            <td className="px-6 py-3">{p.detail}</td>
                                                        </tr>

                                                    )) : <h1>ไม่มีข้อมูล</h1>}

                                                </table>



                                            </div>
                                            {/*footer*/}
                                            <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                                                <button
                                                    className=" shadow hover:shadow-lg text-white bg-red-600 hover:text-red-600   border-2   border-white hover:border-red-600  hover:bg-white rounded-lg background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                    type="button"
                                                    onClick={() => setShowModal(false)}
                                                >
                                                    Close
                                                </button>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                            </>
                        ) : ""}
                        <Footer></Footer>
                    </div>
                </main>


            </div>
        </div>
    )
}

export default Leave
