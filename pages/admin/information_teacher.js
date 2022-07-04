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
import Swal from 'sweetalert2'
import SwiperCore, {
    Autoplay, Pagination, Navigation
} from 'swiper';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getteacher, postteacheradd, putteacherupdate, deleteteacher, upload } from "../../action/teacher";
import { getClassroom, get_group_all } from "../../action/admin";
import { isAuth } from "../../action/auth";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';



function Information_teacher() {
    const Auth = isAuth()
    const [values, setValues] = useState({
        Address: "",
        classroom_code: "",
        createdate: moment(new Date()).format("YYYY-MM-DD"),
        detail: "",
        email: "",
        firstname: "",
        // id: 0,
        lastname: "",
        password: "",
        phonenumber: "",
        picture: "",
        role: 3,
        group_code: "",
        group_name: "",
        teacher_code: "",
        teacher_idcard: "",
        title: "",
        username: "",
        who: "admin",
    })
    const [addimage, setaddimage] = useState()

    const [TeacherMap, setTeacherMap] = useState()
    const [GroupMap, setGroupMap] = useState()
    const [ClassroomMap, setClassroomMap] = useState()
    const [StartDate, setStartDate] = useState(new Date());
    const [EndDate, setEndDate] = useState(new Date());
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

    const EditClick = async (i) => {
        setShowmodaledit(true)
        console.log(TeacherMap[i])
        setValues(TeacherMap[i])
    }
    const AddClick = async () => {
        setValues({
            Address: "",
            classroom_code: "",
            createdate: moment(new Date()).format("YYYY-MM-DD"),
            detail: "",
            email: "",
            firstname: "",
            // id: 0,
            lastname: "",
            password: "",
            phonenumber: "",
            picture: "",
            role: 3,
            group_code: "",
            group_name: "",
            teacher_code: "",
            teacher_idcard: "",
            title: "",
            username: "",
            who: "admin",
        })
        setShowmodaladd(true)
    }
    const CancelClick = async () => {
        Dataload()
        setShowmodaladd(false)
        setShowmodaledit(false)
        setValues({
            Address: "",
            classroom_code: "",
            createdate: moment(new Date()).format("YYYY-MM-DD"),
            detail: "",
            email: "",
            firstname: "",
            // id: 0,
            lastname: "",
            password: "",
            phonenumber: "",
            picture: "",
            role: 3,
            teacher_code: "",
            group_id: "",
            group_code: "",
            group_name: "",
            teacher_idcard: "",
            title: "",
            username: "",
            who: "admin",
        })
    }
    const SaveClick = async () => {
        let data = ""
        let save = values
        save.createdate = moment().format("YYYY-MM-DD HH:mm:ss"),
            console.log('save', save);
        if (Showmodaleadd) {
            data = await postteacheradd(save)
        }
        else {
            data = await putteacherupdate(save)
        }

        Dataload()
        console.log(save)
        console.log(data)

        setShowmodaladd(false)
        setShowmodaledit(false)

    }
    const DeleteClick = async (id) => {
        Swal.fire({
            title: 'ลบข้อมูล',
            text: "คุณต้องการลบขอมูลหรือไม่",
            icon: 'warning',
            showCancelButton: true,
            cancelButtonColor: '#d33',
            confirmButtonColor: '#55D055',
            cancelButtonText: 'ยกเลิก',
            confirmButtonText: 'ยืนยัน',
        }).then(async (result) => {
            if (await result.isConfirmed) {
                console.log(id)
                let data = await deleteteacher(id);
                Swal.fire(
                    'สำเร็จ!',
                    'ข้อมูลของคุณถูกลบแล้ว.',
                    'success'
                )
                console.log(data)
            }
            Dataload();
        })
    }

    const search = (e) => {
        async function getdatapersondate_() {
            let check = [];
            let search = [];
            let event = e.target.value.toUpperCase();
            let data = await getteacher()
            check = data
            console.log(check)
            if (data) {
                var matches = check.filter(function (x) {
                    return x.firstname?.toUpperCase().includes(event) || x.lastname?.toUpperCase().includes(event) || x.classroom_code?.toUpperCase().includes(event)
                });
                search = matches
            }
            if (e.target.value != "") {
                setGroupMap(search)
                setTeacherMap(search)
                console.log(search)
            }
            else {
                setGroupMap(check)
                setTeacherMap(check)
            }
        } getdatapersondate_();
    }

    const imageadd = async (file) => {
        console.log(file)
        // let data = file.name
        // values.picture = data
        console.log(data)
        let formData = new FormData();
        formData.append("name", moment(new Date()).format("YYYYMMDDHHmmss")) + file.name;
        formData.append("type", 'teacher');
        formData.append("image", file);
        // console.log(data)
        for (var value of formData.values()) {
            console.log('value--->', value);
        }
        let data1 = await upload(formData)


        console.log('picture------>', data1.data)
        setaddimage({
            name: file.name,
            type: "register",
            image: file,
        })

        console.log('values', values);
        setValues({ ...values, picture: data1.data })

    }
    const Dataload = async () => {
        let data = await getteacher()
        setTeacherMap(data)
        let classroom = await getClassroom()
        setClassroomMap(classroom)
        let sara = await get_group_all()
        setGroupMap(sara)
        console.log('data', data);
        console.log('classroom', classroom);
        console.log('sara', sara);
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

        if (name == "index1") {
            let chk_all = document.getElementsByClassName('m_all');

            for (let index = 0; index < chk_all.length; index++) {
                chk_all[index].checked = false

            }
            console.log('showfalse', e.target.checked);
        }
        else {
            values[name] = e.target.value
            setValues({ ...values })
            console.log("values." + name, e.target.value)
        }
    }
    const handleInput = (name, e) => {
        if (name == 'dob') {
            values[name] = moment(e).format('YYYY-MM-DD');
        } else {
            values[name] = e.target.value;
        }

        setValues({ ...values });

    }





    const [Showmodaleadd, setShowmodaladd] = useState(false);
    const [Showmodaledit, setShowmodaledit] = useState(false);

    return (
        <div>
            <div className="flex flex-row min-h-screen bg-gray-100 text-gray-800 ">

                <Sidebar></Sidebar>

                <main className="main w-4/5 flex flex-col flex-grow -ml-64 md:ml-0 transition-all duration-150 ease-in">

                    <Nav></Nav>

                    <div className="main-content flex flex-col flex-grow ">

                        <div className="flex md-4 pr-4 pt-4">

                            <h1 className="  w-3/4 text-xl text-center text-color-blue"></h1>
                            <h1 className="  w-1/4 text-xl text-right  text-color-blue">
                                <p >

                                    {/* {moment(new Date()).format('dddd : DD :MMMM :YYYY').toLocaleDateString("th-TH")}   */}
                                    {THdate}
                                </p>
                            </h1>
                        </div>
                        <div className="flex flex-col   pr-4">


                            <h1 className="   text-xl text-right  text-color-blue">
                                <Clock format={'HH:mm:ss'} ticking={true} timezone={'Asia/Bangkok'} />
                            </h1>
                        </div>

                        <div className="flex flex-col pl-2">
                            <div className="   text-xl text-left  w-full">ข้อมูลของครู</div>
                            <div className="flex flex-row w-full">

                                <div className="   text-base text-left   my-2   w-1/5  ">
                                    <input onChange={(e) => search(e)} className=" p-2 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-full " placeholder="Search for Name" />
                                </div>
                                <div className="p-2 text-right w-full">
                                    <button
                                        className="mt-1 w-auto shadow hover:shadow-lg text-white bg-green-500 hover:text-green-500   border-2   border-green-500  hover:border-green-500  hover:bg-white rounded-lg background-transparent  uppercase px-6 py-1 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => AddClick()}
                                    >
                                        <div className="flex flex-row items-center justify-center content-center    ">
                                            <svg
                                                fill="none"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                className="h-6 w-6"
                                            >
                                                <path
                                                    d="M12 6v6m0 0v6m0-6h6m-6 0H6" />

                                            </svg>

                                            <div className="ml-3 mt-1">เพิ่ม</div>

                                        </div>
                                    </button>
                                </div>

                            </div>


                        </div>
                        <div className="flex flex-row   h-full ">
                            <div className="px-1 w-full text-left">
                                <table className="w-full ">
                                    <tr className=" bg-gray-300 ">
                                        <th className="py-2 w-1/12 text-center" >
                                            {/* <label class="inline-flex items-center mt-3  rounded-lg">
                                                <input id="toogleAll" type="checkbox" class="form-checkbox h-5 w-5 text-blue-600  outline-none  m_all " onChange={(e) => all(e)} />
                                            </label> */}
                                            ลำดับ
                                        </th>

                                        <th className="py-2   text-gray-500 w-1/12 text-center" ></th>
                                        <th className="py-2 text-gray-500 w-2/12 " >ชื่อ</th>
                                        <th className="py-2 text-gray-500 w-2/12" >นามสกุล</th>
                                        <th className="py-2 text-gray-500 w-2/12" >ชั้น</th>
                                        <th className="py-2 text-gray-500 w-1/12" >

                                        </th>
                                        <th className="py-2 text-gray-500 w-1/12" >

                                        </th>
                                        <td className="w-1/12  "></td>
                                    </tr>
                                    {(TeacherMap) ? TeacherMap.map((p, index) => (
                                        <tr key={index + 1} className="border border-gray-300">
                                            <td className="py-2 w-1/12 text-center " >
                                                {/* <label class="inline-flex items-center mt-3  rounded-lg ">
                                                    <input id="toogle1" type="checkbox" class="form-checkbox h-5 w-5 text-blue-600  outline-none c_all " onChange={(e) => handleChange('index1', e)} />
                                                </label> */}
                                                {index + 1}
                                            </td>
                                            <td className="flex py-2  text-center justify-center ">
                                                {(p.picture) ?
                                                    <img
                                                        src={p.picture}
                                                        alt
                                                        className="h-10 w-10 bg-gray-200 border rounded-full"
                                                    /> :
                                                    <img
                                                        src="/icon/blank-profile.png"
                                                        alt
                                                        className="h-10 w-10 bg-gray-200 border rounded-full"
                                                    />
                                                }

                                            </td>
                                            <td className="py-2 ">{p.firstname}</td>
                                            <td className="py-2 ">{p.lastname}</td>
                                            <td className="py-2 ">{p.classroom_name}</td>

                                            <td className="w-1/12  ">
                                                <button
                                                    className="mt-1 w-auto shadow hover:shadow-lg text-white bg-blue-500 hover:text-blue-500   border-2   border-blue-500  hover:border-blue-500  hover:bg-white rounded-lg background-transparent  uppercase px-6 py-1 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                    type="button"
                                                    onClick={() => EditClick(index)}
                                                >
                                                    <div className="flex flex-row items-center justify-center content-center    ">
                                                        <svg
                                                            fill="none"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            viewBox="0 0 24 24"
                                                            stroke="currentColor"
                                                            className="h-6 w-6"
                                                        >
                                                            <path
                                                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />

                                                        </svg>
                                                        <div className="ml-3 mt-1">แก้ไข</div>


                                                    </div>
                                                </button>

                                            </td>
                                            <td className="w-1/12  ">
                                                <button
                                                    className="mt-1 w-auto shadow hover:shadow-lg text-white bg-red-500 hover:text-red-500   border-2   border-red-500  hover:border-red-500  hover:bg-white rounded-lg background-transparent  uppercase px-6 py-1 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                    type="button"
                                                    onClick={() => DeleteClick(p.teacher_code)}
                                                >
                                                    <div className="flex flex-row items-center justify-center content-center    ">
                                                        <svg
                                                            fill="none"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            viewBox="0 0 24 24"
                                                            stroke="currentColor"
                                                            className="h-6 w-6"
                                                        >
                                                            <path
                                                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />

                                                        </svg>
                                                        <div className="ml-3 mt-1">ลบ</div>

                                                    </div>
                                                </button>

                                            </td>
                                            <td className="w-1/12  "></td>
                                        </tr>
                                    )) : ""}
                                </table>
                            </div>
                        </div>



                    </div>
                    {/* Modal */}
                    {Showmodaleadd ? (
                        <>
                            <div
                                className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                            >
                                <div className="relative w-full  m-auto mb-6 mx-auto max-w-2xl  max-h-auto ">
                                    {/*content*/}
                                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                        {/*header*/}
                                        <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t text-color-blue">
                                            <h3 className="text-2xl font-semibold text-center w-full ml-5">
                                                เพิ่มข้อมูลครู
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
                                        <>
                                            <div className="flex flex-col  w-full px-2  ">
                                                <div className="flex flex-col mb-4">
                                                    <label className="mb-2 pl-1 font-bold text-lg text-gray-900" for="first_name">รหัสครู</label>
                                                    <input className=" py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-1/2" type="text" onChange={(e) => handleChange('teacher_code', e)} />
                                                </div>
                                                <div className="flex flex-col mb-4">
                                                    <div className="flex flex-row  ">
                                                        <label className="mb-2 pl-1 font-bold text-lg text-gray-900  w-1/2" for="first_name">ชื่อ</label>
                                                        <label className="ml-2 mb-2 pl-1 font-bold text-lg text-gray-900  w-1/2" for="first_name">นามสกุล</label>
                                                    </div>
                                                    <div className="flex flex-row">
                                                        <input className=" py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-1/2" type="text" onChange={(e) => handleChange('firstname', e)} />
                                                        <input className="ml-2 py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-1/2" type="text" onChange={(e) => handleChange('lastname', e)} />

                                                    </div>

                                                </div>
                                                <div className="flex flex-col mb-4">
                                                    <div className="flex flex-row  ">
                                                        <label className=" mb-2 pl-1 font-bold text-lg text-gray-900  w-1/2" for="first_name">รหัสบัตรประชาชน</label>
                                                        <label className=" mb-2 pl-1 font-bold text-lg text-gray-900  w-1/2" for="group_name">กลุ่มสาระการเรียนรู้</label>

                                                        {/* <label className=" ml-2 mb-2 pl-1 font-bold text-lg text-gray-900  w-1/2" for="first_name">วันเกิด</label> */}

                                                    </div>
                                                    <div className="flex flex-row">

                                                        <input className=" py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-1/2" type="text" onChange={(e) => handleChange('teacher_idcard', e)} />
                                                        {/* <div className=" ml-2 w-1/2"> */}
                                                        {/* <DatePicker className=" py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-full " selected={new Date(values.dob)} onChange={(e) => handleInput('dob', e)} /> */}

                                                        {/* </div> */}
                                                        <select className="ml-2 py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-1/2" onChange={(e) => handleChange('group_code', e)}    >
                                                            <option value={0} name={0} > กรุณาเลือกข้อมูล </option>

                                                            {/* <option key={index + 1} value={p.behaviour_id} name={p.score} >{p.behaviour_name} {p.score} คะแนน</option> */}
                                                            {GroupMap ? GroupMap.map((p, index) => (
                                                                <option key={index + 1} value={p.group_code} name={p.group_code} >{p.group_name} </option>
                                                            )) : ""}
                                                        </select>
                                                    </div>

                                                </div>
                                                <div className="flex flex-col mb-4">
                                                    <div className="flex flex-row  ">

                                                        <label className=" mb-2 pl-1 font-bold text-lg text-gray-900  w-1/3" for="first_name">ที่อยู่</label>
                                                    </div>
                                                    <div className="flex flex-row">

                                                        <input className=" py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-full" type="text" onChange={(e) => handleChange('Address', e)} />

                                                    </div>

                                                </div>
                                                <div className="flex flex-col mb-4">
                                                    <div className="flex flex-row  ">
                                                        <label className="mb-2 pl-1 font-bold text-lg text-gray-900  w-1/2" for="first_name">อีเมล</label>
                                                        <label className="ml-2 mb-2 pl-1 font-bold text-lg text-gray-900  w-1/2" for="first_name">เบอร์โทรศัพท์</label>
                                                    </div>
                                                    <div className="flex flex-row">
                                                        <input className=" py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-1/2" type="text" onChange={(e) => handleChange('email', e)} />
                                                        <input className="ml-2 py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-1/2" type="text" onChange={(e) => handleChange('phonenumber', e)} />

                                                    </div>

                                                </div>
                                                <div className="flex flex-col mb-4">
                                                    <div className="flex flex-row  ">
                                                        <label className="mb-2 pl-1 font-bold text-lg text-gray-900  w-1/2" for="first_name">รูปถ่าย</label>
                                                        <label className="ml-2 mb-2 pl-1 font-bold text-lg text-gray-900  w-1/2" for="first_name">ประจำชั้น</label>
                                                    </div>
                                                    <div className="flex flex-row">
                                                        <input className=" py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-1/2" type="file" onChange={(e) => imageadd(e.target.files[0])} id="myfile" />

                                                        <select className="ml-2 py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-1/2" onChange={(e) => handleChange('classroom_code', e)}    >
                                                            <option value={0} name={0} > กรุณาเลือกข้อมูล </option>

                                                            {/* <option key={index + 1} value={p.behaviour_id} name={p.score} >{p.behaviour_name} {p.score} คะแนน</option> */}
                                                            {ClassroomMap ? ClassroomMap.map((p, index) => (
                                                                <option key={index + 1} value={p.classroom_code} name={p.classroom_name} >{p.classroom_name} </option>
                                                            )) : ""}
                                                        </select>
                                                    </div>

                                                </div>
                                                <div className="flex flex-col mb-4">
                                                    <div className="flex flex-row  ">
                                                        <label className="mb-2 pl-1 font-bold text-lg text-gray-900  w-1/2" for="first_name">ชื่อผู้ใช้</label>
                                                        <label className="ml-2 mb-2 pl-1 font-bold text-lg text-gray-900  w-1/2" for="first_name">รหัสผ่าน</label>
                                                    </div>
                                                    <div className="flex flex-row">
                                                        <input className=" py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-1/2" type="text" onChange={(e) => handleChange('username', e)} />
                                                        <input className="ml-2 py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-1/2" type="password" onChange={(e) => handleChange('password', e)} />

                                                    </div>

                                                </div>
                                                <div className="flex flex-col mb-4">
                                                    <div className="flex flex-row  ">

                                                        <label className=" mb-2 pl-1 font-bold text-lg text-gray-900  w-1/3" for="first_name">รายละเอียด</label>
                                                    </div>
                                                    <div className="flex flex-row">

                                                        <textarea className=" py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-full" onChange={(e) => handleChange('detail', e)} />

                                                    </div>

                                                </div>



                                                <div className="flex flex-col mb-4">
                                                    <div className="flex flex-row  ">
                                                        <label className="mb-2 pl-1  w-1/2" ></label>
                                                        <label className="ml-2 mb-2 pl-1 font-bold text-lg text-gray-900  w-1/2" for="first_name">ผู้สร้าง</label>
                                                    </div>
                                                    <div className="flex flex-row">
                                                        <label className="mb-2 pl-1  w-1/2" ></label>
                                                        <input className=" py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow  w-1/2" type="password" name="password" id="password" disabled />

                                                    </div>
                                                </div>


                                            </div>


                                        </>

                                        {/*footer*/}
                                        <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">

                                            <button
                                                className=" shadow hover:shadow-lg text-white bg-red-600 hover:text-red-600   border-2   border-red-600 hover:border-red-600  hover:bg-white rounded-lg background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                type="button"
                                                onClick={() => CancelClick()}
                                            >
                                                กลับ
                                            </button>
                                            <button
                                                className=" shadow hover:shadow-lg text-white bg-green-600 hover:text-green-600   border-2   border-green-600  hover:border-green-600  hover:bg-white rounded-lg background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                type="button"
                                                onClick={() => SaveClick()}
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
                    {Showmodaledit ? (
                        <>
                            <div
                                className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                            >
                                <div className="relative w-full  m-auto mb-6 mx-auto max-w-2xl  max-h-auto ">
                                    {/*content*/}
                                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                        {/*header*/}
                                        <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t text-color-blue">
                                            <h3 className="text-2xl font-semibold text-center w-full ml-5">
                                                แก้ไขข้อมูลครู
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
                                        <>
                                            <div className="flex flex-col  w-full px-2  ">
                                                <div className="flex flex-col mb-4">
                                                    <label className="mb-2 pl-1 font-bold text-lg text-gray-900" for="first_name">รหัสครู</label>
                                                    <input className=" py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-1/2" type="text" name="first_name" id="first_name" value={values.teacher_code} disabled />
                                                </div>
                                                <div className="flex flex-col mb-4">
                                                    <div className="flex flex-row  ">
                                                        <label className="mb-2 pl-1 font-bold text-lg text-gray-900  w-1/2" for="first_name">ชื่อ</label>
                                                        <label className="ml-2 mb-2 pl-1 font-bold text-lg text-gray-900  w-1/2" for="first_name">นามสกุล</label>
                                                    </div>
                                                    <div className="flex flex-row">
                                                        <input className=" py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-1/2" value={values.firstname} type="text" onChange={(e) => handleChange('firstname', e)} />
                                                        <input className="ml-2 py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-1/2" value={values.lastname} type="text" onChange={(e) => handleChange('lastname', e)} />

                                                    </div>

                                                </div>
                                                <div className="flex flex-col mb-4">
                                                    <div className="flex flex-row  ">
                                                        <label className=" mb-2 pl-1 font-bold text-lg text-gray-900  w-1/2">รหัสบัตรประชาชน</label>
                                                        <label className=" mb-2 pl-1 font-bold text-lg text-gray-900  w-1/2" for="group_name">กลุ่มสาระการเรียนรู้</label>
                                                        {/* <label className=" ml-2 mb-2 pl-1 font-bold text-lg text-gray-900  w-1/2" for="first_name">วันเกิด</label> */}

                                                    </div>
                                                    <div className="flex flex-row">

                                                        <input className=" py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-1/2" value={values.teacher_idcard} type="text" onChange={(e) => handleChange('teacher_idcard', e)} />
                                                        {/* <div className=" ml-2 w-1/2">
                                                            <DatePicker selected={StartDate} onChange={(date) => setStartDate(date)} dateFormat="dd-MM-yyyy" className=" py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-full " onChange={(e) => handleChange('firstName', e)} />

                                                        </div> */}
                                                        <select className="ml-2 py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-1/2" onChange={(e) => handleChange('group_code', e)} value={values.group_code}  >
                                                            <option value={0} name={0} > กรุณาเลือกข้อมูล </option>

                                                            {/* <option key={index + 1} value={p.behaviour_id} name={p.score} >{p.behaviour_name} {p.score} คะแนน</option> */}
                                                            {GroupMap ? GroupMap.map((p, index) => (
                                                                <option key={index + 1} value={p.group_code} name={p.group_name} >{p.group_name} </option>
                                                            )) : ""}
                                                        </select>
                                                    </div>

                                                </div>
                                                <div className="flex flex-col mb-4">
                                                    <div className="flex flex-row  ">

                                                        <label className=" mb-2 pl-1 font-bold text-lg text-gray-900  w-1/3" for="first_name">ที่อยู่</label>
                                                    </div>
                                                    <div className="flex flex-row">

                                                        <input className=" py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-full" value={values.Address} type="text" onChange={(e) => handleChange('Address', e)} />

                                                    </div>

                                                </div>
                                                <div className="flex flex-col mb-4">
                                                    <div className="flex flex-row  ">
                                                        <label className="mb-2 pl-1 font-bold text-lg text-gray-900  w-1/2" for="first_name">อีเมล</label>
                                                        <label className="ml-2 mb-2 pl-1 font-bold text-lg text-gray-900  w-1/2" for="first_name">เบอร์โทรศัพท์</label>
                                                    </div>
                                                    <div className="flex flex-row">
                                                        <input className=" py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-1/2" value={values.email} type="text" onChange={(e) => handleChange('email', e)} />
                                                        <input className="ml-2 py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-1/2" value={values.phonenumber} type="text" onChange={(e) => handleChange('phonenumber', e)} />

                                                    </div>

                                                </div>
                                                <div className="flex flex-col mb-4">
                                                    <div className="flex flex-row  ">
                                                        <label className="mb-2 pl-1 font-bold text-lg text-gray-900  w-1/2" for="first_name">รูปถ่าย</label>
                                                        <label className="ml-2 mb-2 pl-1 font-bold text-lg text-gray-900  w-1/2" for="first_name">ประจำชั้น</label>
                                                    </div>
                                                    <div className="flex flex-row">
                                                        <input className=" py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-1/2" onChange={(e) => imageadd(e.target.files[0])} type="file" id="myfile" />
                                                        {/* <input className="ml-2 py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-1/2"  type="text" onChange={(e) => handleChange('classroom_code', e)} /> */}
                                                        <select className="ml-2 py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-1/2" onChange={(e) => handleChange('classroom_code', e)} value={values.classroom_code}   >
                                                            <option value={0} name={0} > กรุณาเลือกข้อมูล </option>

                                                            {/* <option key={index + 1} value={p.behaviour_id} name={p.score} >{p.behaviour_name} {p.score} คะแนน</option> */}
                                                            {ClassroomMap ? ClassroomMap.map((p, index) => (

                                                                <option key={index + 1} value={p.classroom_code} name={p.classroom_name} >{p.classroom_name} </option>
                                                            )) : ""}
                                                        </select>
                                                    </div>

                                                </div>
                                                <div className="flex flex-col mb-4">
                                                    <div className="flex flex-row  ">
                                                        <label className="mb-2 pl-1 font-bold text-lg text-gray-900  w-1/2" for="first_name">ชื่อผู้ใช้</label>
                                                        <label className="ml-2 mb-2 pl-1 font-bold text-lg text-gray-900  w-1/2" for="first_name">รหัสผ่าน</label>
                                                    </div>
                                                    <div className="flex flex-row">
                                                        <input className=" py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-1/2" type="text" disabled value={values.username} onChange={(e) => handleChange('username', e)} />
                                                        <input className="ml-2 py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-1/2" type="password" name="password" id="password" value={values.password} onChange={(e) => handleChange('password', e)} />

                                                    </div>

                                                </div>
                                                <div className="flex flex-col mb-4">
                                                    <div className="flex flex-row  ">

                                                        <label className=" mb-2 pl-1 font-bold text-lg text-gray-900  w-1/3" for="first_name">รายละเอียด</label>
                                                    </div>
                                                    <div className="flex flex-row">

                                                        <textarea className=" py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-full" value={values.detail} onChange={(e) => handleChange('detail', e)} />

                                                    </div>

                                                </div>

                                                <div className="flex flex-col mb-4">
                                                    <div className="flex flex-row  ">
                                                        <label className="mb-2 pl-1  w-1/2" ></label>
                                                        <label className="ml-2 mb-2 pl-1 font-bold text-lg text-gray-900  w-1/2" for="first_name">ผู้สร้าง</label>
                                                    </div>
                                                    <div className="flex flex-row">
                                                        <label className="mb-2 pl-1  w-1/2" ></label>
                                                        <input className=" py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow  w-1/2" value={values.who} type="password" name="password" id="password" disabled />

                                                    </div>
                                                </div>


                                            </div>


                                        </>

                                        {/*footer*/}
                                        <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                                            <button
                                                className=" shadow hover:shadow-lg text-white bg-red-600 hover:text-red-600   border-2   border-red-600 hover:border-red-600  hover:bg-white rounded-lg background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                type="button"
                                                onClick={() => CancelClick()}
                                            >
                                                กลับ
                                            </button>
                                            <button
                                                className=" shadow hover:shadow-lg text-white bg-green-600 hover:text-green-600   border-2   border-green-600  hover:border-green-600  hover:bg-white rounded-lg background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                type="button"
                                                onClick={() => SaveClick()}
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

export default Information_teacher
