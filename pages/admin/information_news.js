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
import { getNews, putNews, postNews, deleteNews } from "../../action/news";
import { isAuth } from "../../action/auth";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';



function Information_News() {
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
        teacher_code: "",
        teacher_idcard: "",
        title: "",
        username: "",
        who: "admin",
    })
    const [addimage, setaddimage] = useState()
    const [NewsMap, setNewsMap] = useState()
    const [StartDate, setStartDate] = useState(new Date());
    const [EndDate, setEndDate] = useState(new Date());
    const options = {
        maintainAspectRatio: false	// Don't maintain w/h ratio
    }
    const [Showmodaleadd, setShowmodaladd] = useState(false);
    const [Showmodaledit, setShowmodaledit] = useState(false);
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
        console.log(NewsMap[i])
        setValues(NewsMap[i])
    }
    const AddClick = async () => {
        setValues({
            createdate: moment(new Date()).format("YYYY-MM-DD"),
            news_code: "",
            news_detail: "",
            news_end: moment(new Date()).format("YYYY-MM-DD"),
            // news_id: 0,
            news_picture: "",
            news_start: moment(new Date()).format("YYYY-MM-DD"),
            news_status: 1,
            news_subject: "",
            who: "Admin_Frank"
        })
        setShowmodaladd(true)
    }
    const CancelClick = async () => {
        await Dataload()
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
            teacher_idcard: "",
            title: "",
            username: "",
            who: localStorage.getItem('LoginUsername'),
        })
    }
    const SaveClick = async () => {
        console.log(values)
        let data
        if (Showmodaledit) {
            data = await putNews(values)
        }
        else {
            data = await postNews(values)
        }
        console.log(data)
        let data1 = await getNews()
        setNewsMap(data1)
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
                deleteNews(id);
                Swal.fire(
                    'สำเร็จ!',
                    'ข้อมูลของคุณถูกลบแล้ว.',
                    'success'
                )
                Dataload()
            }

            // let data1 = await getNews()

        })



    }
    const imageadd = async (file) => {
        console.log(file)
        // let data = file.name
        // values.picture = data
        console.log(data)
        let formData = new FormData();
        formData.append("name", moment(new Date()).format("YYYYMMDDHHmmss")) + file.name;
        formData.append("type", 'news');
        formData.append("image", file);
        // console.log(data)
        for (var value of formData.values()) {
            console.log('value--->', value);
        }
        let data1 = await upload(formData)
        console.log('picture------>', data1.data)
        // setaddimage({
        //     name: file.name,
        //     type: "news",
        //     image: file,
        // })

        console.log('values', values);
        setValues({ ...values, news_picture: data1.data })

    }

    const Dataload = async () => {
        let data = await getNews()
        setNewsMap(data)
        console.log('data', data);
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
    const search = (e) => {
        async function getdatapersondate_() {
            let check = [];
            let search = [];
            let event = e.target.value.toUpperCase();
            let data = await getNews()
            console.log(data)
            check = data
            if (data) {
                var matches = check.filter(function (x) {
                    return x.news_subject?.toUpperCase().includes(event)
                });
                search = matches
            }
            if (e.target.value != "") {
                setNewsMap(search)
            }
            else {
                setNewsMap(check)
            }
        } getdatapersondate_();
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
        if (name == "news_start" || name == "news_end") {
            values[name] = moment(e).format("YYYY-MM-DD")
            setValues({ ...values })
            console.log(e)
        }
        else {
            values[name] = e.target.value
            setValues({ ...values })
            console.log("values." + name, e.target.value)
        }
    }







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
                            <div className="   text-xl text-left  w-full">ข้อมูลของข่าวประชาสัมพันธ์</div>
                            <div className="flex flex-row w-full">

                                <div className="   text-base text-left   my-2   w-1/5  ">
                                    <input onChange={(e) => search(e)} className=" p-2 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-full " placeholder="Search for users" />
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

                                        <th className="py-2 text-gray-500 w-2/12 text-center" >หัวข้อข่าว</th>
                                        <th className="py-2 text-gray-500 w-2/12 text-center" >ช่วงเวลา</th>
                                        <th className="py-2 text-gray-500 w-2/12 text-center" >สถานะ</th>
                                        <th className="py-2 text-gray-500 w-1/12" >

                                        </th>
                                        <th className="py-2 text-gray-500 w-1/12" >

                                        </th>
                                        <td className="w-1/12  "></td>
                                    </tr>
                                    {(NewsMap) ? NewsMap.map((p, index) => (
                                        <tr key={index + 1} className="border border-gray-300">
                                            <td className="py-2 w-1/12 text-center " >
                                                {/* <label class="inline-flex items-center mt-3  rounded-lg ">
                                                    <input id="toogle1" type="checkbox" class="form-checkbox h-5 w-5 text-blue-600  outline-none c_all " onChange={(e) => handleChange('index1', e)} />
                                                </label> */}
                                                {index + 1}
                                            </td>

                                            <td className="py-2 text-center ">{p.news_subject}</td>
                                            <td className="py-2  text-center">{moment(p.news_start).format("DD-MM-YYYY")} - {moment(p.news_end).format("DD-MM-YYYY")}</td>
                                            <td className="py-2 text-center ">{(p.news_status == 1) ? "แสดง" : "ไม่แสดง"}</td>

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
                                                    onClick={() => DeleteClick(p.news_id)}
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
                                                เพิ่มข้อมูลข่าว
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
                                                <div className="flex flex-col my-4">
                                                    <div className="flex flex-row">
                                                        {/* <label className=" mb-2 pl-2 font-bold text-lg text-gray-900 w-1/2" for="first_name">รหัสข่าว</label> */}
                                                        <label className=" mb-2 pl-2 font-bold text-lg text-gray-900 w-1/2" for="first_name">สถานะการแสดงข่าว</label>
                                                    </div>
                                                    <div className="flex flex-row text-center">
                                                        {/* <input className="ml-2 py-2 px-2 mr-2 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-1/2" type="text" disabled value={values.news_code} onChange={(e) => handleChange('news_code', e)} /> */}

                                                        {/* <label className="inline-flex items-center ml-6">
                                                            <input type="radio" className="form-radio  w-5 h-5 " name="accountType" value="personal" />
                                                            <span class="ml-2">แสดง</span>
                                                        </label>
                                                        <label className="inline-flex items-center ml-6">
                                                            <input type="radio" className="form-radio w-5 h-5  " name="accountType" value="busines" />
                                                            <span className="ml-2">ไม่แสดง</span>
                                                        </label> */}
                                                        <select onChange={(e) => handleChange('news_status', e)} className="border border-gray-300 rounded-lg text-gray-600 h-10 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none " >
                                                            <option value={""} >--กรุณาเลือกสถานะการแสดง--</option>
                                                            <option value={1}>แสดง</option>
                                                            <option value={0}>ไม่แสดง</option>
                                                        </select>
                                                    </div>
                                                </div>



                                                <div className="flex flex-col mb-4">
                                                    <div className="flex flex-row  ">
                                                        <label className="mb-2 pl-1 font-bold text-lg text-gray-900  w-1/2" for="first_name">หัวข้อข่าว</label>
                                                        <label className="ml-2 mb-2 pl-1 font-bold text-lg text-gray-900  w-1/2" for="first_name">รูปถ่าย</label>
                                                    </div>
                                                    <div className="flex flex-row">
                                                        <input className="ml-2 py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-1/2" type="text" onChange={(e) => handleChange('news_subject', e)} />
                                                        <input className=" py-2 px-3 ml-2 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-1/2" type="file" onChange={(e) => imageadd(e.target.files[0])} id="myfile" />

                                                    </div>
                                                    <div className="flex flex-row  ">

                                                        <label className="ml-2 mb-2 pl-1 font-bold text-lg text-gray-900  w-1/3" htmlFor="first_name">รายละเอียด</label>
                                                    </div>
                                                    <div className="flex flex-row">

                                                        <textarea className="ml-2 py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-full" name="detail" id="detail" onChange={(e) => handleChange('news_detail', e)} />

                                                    </div>
                                                </div>

                                                <div className="flex flex-col mb-4">
                                                    <div className="flex flex-row  ">
                                                        <label className=" ml-2 mb-2 pl-1 font-bold text-lg text-gray-900  w-1/2" for="first_name">วันเริ่มต้น</label>
                                                        <label className="ml-2 mb-2 pl-1 font-bold text-lg text-gray-900  w-1/2" for="first_name">วันสิ้นสุด</label>
                                                    </div>
                                                    <div className="flex flex-row">
                                                        <div className="w-1/2 mr-2 ml-2">
                                                            <DatePicker onChange={(e) => handleChange('news_start', e)} value={moment(values.news_start).format("YYYY-MM-DD")} className="w-full  text-center text-gray-900 border border-gray-300 p-2 mr-2  rounded-lg  outline-none " />

                                                        </div>
                                                        <div className="w-1/2">
                                                            <DatePicker onChange={(e) => handleChange('news_end', e)} value={moment(values.news_end).format("YYYY-MM-DD")} className=" w-full text-center text-gray-900 border border-gray-300 p-2 mr-2  rounded-lg  outline-none " />

                                                        </div>

                                                    </div>
                                                    {/* <div className="flex flex-row  ">

                                                        <label className="ml-2 mb-2 pl-1 font-bold text-lg text-gray-900  w-1/3" htmlFor="first_name">รายละเอียด</label>
                                                    </div>
                                                    <div className="flex flex-row">

                                                        <textarea className="ml-2 py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-full" name="detail" id="detail" value={values.news_detail} onChange={(e) => handleChange('news_detail', e)} />

                                                    </div> */}
                                                </div>




                                                {/* <div className="flex flex-col mb-4">
                                                    <div className="flex flex-row  ">
                                                        <label className="mb-2 pl-1  w-1/2" ></label>
                                                        <label className="ml-2 mb-2 pl-1 font-bold text-lg text-gray-900  w-1/2" for="first_name">ผู้สร้าง</label>
                                                    </div>
                                                    <div className="flex flex-row">
                                                        <label className="mb-2 pl-1  w-1/2" ></label>
                                                        <input className=" py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow  w-1/2" type="password" name="password" id="password" disabled />

                                                    </div>
                                                </div> */}


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
                                                แก้ไขข้อมูลข่าว
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
                                                <div className="flex flex-col my-4">
                                                    <div className="flex flex-row">
                                                        <label className=" mb-2 pl-2 font-bold text-lg text-gray-900 w-1/2" for="first_name">รหัสข่าว</label>
                                                        <label className=" mb-2 pl-2 font-bold text-lg text-gray-900 w-1/2" for="first_name">สถานะการแสดงข่าว</label>
                                                    </div>
                                                    <div className="flex flex-row text-center">
                                                        <input className="ml-2 py-2 px-2 mr-2 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-1/2" type="text" disabled value={values.news_code} onChange={(e) => handleChange('news_code', e)} />

                                                        {/* <label className="inline-flex items-center ml-6">
                                                            <input type="radio" className="form-radio  w-5 h-5 " name="accountType" value="personal" />
                                                            <span class="ml-2">แสดง</span>
                                                        </label>
                                                        <label className="inline-flex items-center ml-6">
                                                            <input type="radio" className="form-radio w-5 h-5  " name="accountType" value="busines" />
                                                            <span className="ml-2">ไม่แสดง</span>
                                                        </label> */}
                                                        <select value={values.news_status} onChange={(e) => handleChange('news_status', e)} className="border border-gray-300 rounded-lg text-gray-600 h-10 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none " >
                                                            <option value={""} >--กรุณาเลือกสถานะการแสดง--</option>
                                                            <option value={1}>แสดง</option>
                                                            <option value={0}>ไม่แสดง</option>
                                                        </select>
                                                    </div>
                                                </div>



                                                <div className="flex flex-col mb-4">
                                                    <div className="flex flex-row  ">
                                                        <label className="mb-2 pl-1 font-bold text-lg text-gray-900  w-1/2" for="first_name">หัวข้อข่าว</label>
                                                        <label className="ml-2 mb-2 pl-1 font-bold text-lg text-gray-900  w-1/2" for="first_name">รูปถ่าย</label>
                                                    </div>
                                                    <div className="flex flex-row">
                                                        <input className="ml-2 py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-1/2" type="text" value={values.news_subject} onChange={(e) => handleChange('news_subject', e)} />
                                                        <input className=" py-2 px-3 ml-2 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-1/2" type="file" onChange={(e) => imageadd(e.target.files[0])} id="myfile" />

                                                    </div>
                                                    <div className="flex flex-row  ">

                                                        <label className="ml-2 mb-2 pl-1 font-bold text-lg text-gray-900  w-1/3" htmlFor="first_name">รายละเอียด</label>
                                                    </div>
                                                    <div className="flex flex-row">

                                                        <textarea className="ml-2 py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-full" name="detail" id="detail" value={values.news_detail} onChange={(e) => handleChange('news_detail', e)} />

                                                    </div>
                                                </div>

                                                <div className="flex flex-col mb-4">
                                                    <div className="flex flex-row  ">
                                                        <label className=" ml-2 mb-2 pl-1 font-bold text-lg text-gray-900  w-1/2" for="first_name">วันเริ่มต้น</label>
                                                        <label className="ml-2 mb-2 pl-1 font-bold text-lg text-gray-900  w-1/2" for="first_name">วันสิ้นสุด</label>
                                                    </div>
                                                    <div className="flex flex-row">
                                                        <div className="w-1/2 mr-2 ml-2">
                                                            <DatePicker onChange={(e) => handleChange('news_start', e)} value={moment(values.news_start).format("YYYY-MM-DD")} className="w-full  text-center text-gray-900 border border-gray-300 p-2 mr-2  rounded-lg  outline-none " />

                                                        </div>
                                                        <div className="w-1/2">
                                                            <DatePicker onChange={(e) => handleChange('news_end', e)} value={moment(values.news_end).format("YYYY-MM-DD")} className=" w-full text-center text-gray-900 border border-gray-300 p-2 mr-2  rounded-lg  outline-none " />

                                                        </div>

                                                    </div>
                                                    {/* <div className="flex flex-row  ">

                                                        <label className="ml-2 mb-2 pl-1 font-bold text-lg text-gray-900  w-1/3" htmlFor="first_name">รายละเอียด</label>
                                                    </div>
                                                    <div className="flex flex-row">

                                                        <textarea className="ml-2 py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-full" name="detail" id="detail" value={values.news_detail} onChange={(e) => handleChange('news_detail', e)} />

                                                    </div> */}
                                                </div>




                                                <div className="flex flex-col mb-4">
                                                    <div className="flex flex-row  ">
                                                        <label className="mb-2 pl-1  w-1/2" ></label>
                                                        <label className="ml-2 mb-2 pl-1 font-bold text-lg text-gray-900  w-1/2" for="first_name">ผู้สร้าง</label>
                                                    </div>
                                                    <div className="flex flex-row">
                                                        <label className="mb-2 pl-1  w-1/2" ></label>
                                                        <input className=" py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow  w-1/2" type="text" value={values.who} disabled />

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

export default Information_News
