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
import { getClassroom, checkname_code_classroom, postcreate_classroom, putupdate_classroom, delete_classroom, getall_school_year, getone_school_year, putupdate_school_year, postcreate_school_year, delete_school_year } from "../../action/admin"
import { isAuth } from "../../action/auth";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';



function add_school_year() {




    const Auth = isAuth()
    const [values, setValues] = useState({

        school_term: "",
        school_year: "",
        school_year_start: moment(new Date()).format("YYYY-MM-DD"),
        school_year_end: moment(new Date()).format("YYYY-MM-DD"),
        createdate: "",
        who: "Admin"
    })
    const [addimage, setaddimage] = useState()
    const [SchoolyearMap, setSchoolyearMap] = useState()
    const [CheckClassroom_Name, setCheckClassroom_Name] = useState("")
    const [CheckClassroom_Code, setCheckClassroom_Code] = useState("")
    const [CheckBtn, setCheckBtn] = useState(0)
    const [MassageAl, setMassageAl] = useState("")
    const [checkoldcode, setcheckoldcode] = useState("")
    const [checkoldname, setcheckoldname] = useState("")

    const [EndDate, setEndDate] = useState(new Date());
    const options = {
        maintainAspectRatio: false	// Don't maintain w/h ratio
    }


    SwiperCore.use([Autoplay, Pagination, Navigation]);
    ChartJS.register(ArcElement, Tooltip, Legend);


    const EditClick = async (i) => {
        setShowmodaledit(true)
        console.log('SchoolyearMap', SchoolyearMap[i])
        setValues({ ...SchoolyearMap[i] })
        // setcheckoldcode(SchoolyearMap[i].school_year);
        // setcheckoldname(SchoolyearMap[i].school_term);
        setCheckClassroom_Code(2);
        setCheckClassroom_Name(2);
    }
    const search = (e) => {
        async function getdatapersondate_() {
            let check = [];
            let search = [];
            let event = e.target.value.toUpperCase();
            let data = await getall_school_year()
            console.log(data)
            check = data
            if (data) {
                var matches = check.filter(function (x) {
                    return x.school_term?.toUpperCase().includes(event) || x.school_year?.toUpperCase().includes(event) || x.school_year_start?.toUpperCase().includes(event) || x.school_year_end?.toUpperCase().includes(event)
                });
                search = matches
            }
            if (e.target.value != "") {
                setSchoolyearMap(search)
            }
            else {
                setSchoolyearMap(check)
            }
        } getdatapersondate_();
    }
    const AddClick = async () => {
        setValues({
            school_term: "",
            school_year: "",
            school_year_start: moment(new Date()).format("YYYY-MM-DD"),
            school_year_end: moment(new Date()).format("YYYY-MM-DD"),
            createdate: "",
            who: "Admin"
        })
        setShowmodaladd(true)

        setCheckClassroom_Code(2);
        setCheckClassroom_Name(2);
    }
    const CancelClick = async () => {
        Dataload()
        setShowmodaladd(false)
        setShowmodaledit(false)
        setValues({
            school_term: "",
            school_year: "",
            school_year_start: moment(new Date()).format("YYYY-MM-DD"),
            school_year_end: moment(new Date()).format("YYYY-MM-DD"),
            createdate: "",
            who: "Admin"
        })
    }
    const SaveClick = async () => {
        let data = ""
        let save = values
        save.createdate = moment().format("YYYY-MM-DD HH:mm:ss"),
            console.log('save', save);
        if (Showmodaleadd) {
            data = await postcreate_school_year(save)
        }
        else {
            data = await putupdate_school_year(save)
        }

        Dataload()
        console.log(save)
        console.log(data)

        setShowmodaladd(false)
        setShowmodaledit(false)

    }
    const DeleteClick = async (id) => {
        console.log(id)
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
                console.log('id', id)
                delete_school_year(id);
                Swal.fire(
                    'สำเร็จ!',
                    'ข้อมูลของคุณถูกลบแล้ว.',
                    'success'
                )
                Dataload();
            }
            Dataload();
        })



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
        let data = await getall_school_year()
        setSchoolyearMap(data)
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

    const handleChange = async (name, e) => {
        console.log(name)

        let data = ""
        if (name == "school_year_start" || name == "school_year_end") {
            values[name] = e
        }
        else {
            values[name] = e.target.value
            console.log(e.target.value)
        }

        setValues({ ...values })

        // if (name == "school_year_start" || name == "school_year_end") {

        //     if (e.target.value == "") {
        //         if (name == "school_year_start") {
        //             setCheckClassroom_Code(2)
        //         }
        //         else if (name == "school_term") {
        //             setCheckschool_term(2)
        //         }
        //     }
        //     else {
        //         data = await checkname_code_classroom({ codename: e.target.value })
        //         console.log('data2', data)
        //         if (name == "school_year_end") {
        //             setCheckClassroom_Code(data)
        //         }
        //         else if (name == "classroom_name") {
        //             setCheckClassroom_Name(data)
        //         }
        //         // if (CheckClassroom_Code== 1 && CheckClassroom_Name == 1) {
        //         //     setCheckBtn(0)
        //         // } else {
        //         //     setCheckBtn(1)
        //         // }
        //     }
        // }
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
                            <div className="   text-xl text-left  w-full">ข้อมูลปีการศึกษา</div>
                            <div className="flex flex-row w-full">

                                <div className="   text-base text-left   my-2   w-1/5  ">
                                    <input onChange={(e) => search(e)} className=" p-2 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-full " placeholder="ค้นหาปีการศึกษา หรือ ภาคเรียน" />
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


                                        <th className="py-2 text-gray-500 w-2/12  text-center" >ภาคเรียน</th>
                                        <th className="py-2 text-gray-500 w-2/12 text-center" >ปีการศึกษา</th>
                                        <th className="py-2 text-gray-500 w-2/12 text-center" >เริ่ม</th>
                                        <th className="py-2 text-gray-500 w-2/12 text-center" >สินสุด

                                        </th>
                                        <th className="py-2 text-gray-500 w-1/12" >

                                        </th>
                                        <th className="py-2 text-gray-500 w-1/12" >

                                        </th>

                                        <th className="py-2 text-gray-500 w-2/12" >

                                        </th>
                                        <td className="w-1/12  "></td>

                                    </tr>
                                    {(SchoolyearMap) ? SchoolyearMap.map((p, index) => (
                                        <tr key={index + 1} className="border border-gray-300">
                                            <td className="py-2 w-1/12 text-center " >
                                                {/* <label class="inline-flex items-center mt-3  rounded-lg ">
                                                    <input id="toogle1" type="checkbox" class="form-checkbox h-5 w-5 text-blue-600  outline-none c_all " onChange={(e) => handleChange('index1', e)} />
                                                </label> */}
                                                {index + 1}
                                            </td>

                                            <td className="py-2 text-center ">{p.school_term}</td>
                                            <td className="py-2 text-center">{p.school_year}</td>
                                            <td className="py-2 text-center">{p.school_year_start}</td>
                                            <td className="py-2 text-center">{p.school_year_end}</td>
                                            <td className="py-2 text-center"></td>
                                            <td className="py-2 text-center"></td>


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
                                                    onClick={() => DeleteClick(p.school_year_id)}
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
                                <div className="relative w-full   mb-6 mx-auto max-w-2xl  max-h-auto ">
                                    {/*content*/}
                                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                        {/*header*/}
                                        <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t text-color-blue">
                                            <h3 className="text-2xl font-semibold text-center w-full ml-5">
                                                เพิ่มข้อมูลห้องเรียน
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
                                            <div className="flex flex-col  w-full px-3  ">

                                                <div className="flex flex-col mb-4">
                                                    <div className="flex flex-row  mt-2 ">
                                                        <label className="mb-2 pl-1 font-bold text-lg text-gray-900  w-1/3" for="first_name">ภาคเรียน</label>
                                                        <label className="ml-2 mb-2 pl-1 font-bold text-lg text-gray-900  w-2/3" for="first_name">ปีการศึกษา</label>
                                                    </div>
                                                    <div className="flex flex-row">
                                                        <input className=" py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-1/3" type="text" onChange={(e) => handleChange('school_term', e)} />
                                                        <input className="ml-2 py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-2/3" type="text" onChange={(e) => handleChange('school_year', e)} />

                                                    </div>

                                                </div>

                                                <div className="flex flex-col mb-4">
                                                    <div className="flex flex-row">
                                                        <label className=" ml-2 mb-2 pl-1 font-bold text-lg text-gray-900  w-1/2" htmlFor="">เริ่ม</label>
                                                        <DatePicker
                                                            dateFormat="dd-MM-yyyy"
                                                            className=" py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-full "

                                                            value={moment(values.school_year_start).format("YYYY-MM-DD")}
                                                            onChange={(e) => handleChange('school_year_start', e)}

                                                        />
                                                    </div>

                                                    <div className="flex flex-row">
                                                        <label className=" ml-2 mb-2 pl-1 font-bold text-lg text-gray-900  w-1/2" htmlFor="">สิ้นสุด</label>
                                                        <DatePicker
                                                            dateFormat="dd-MM-yyyy"
                                                            className=" py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-full "

                                                            value={moment(values.school_year_end).format("YYYY-MM-DD")}
                                                            onChange={(e) => handleChange('school_year_end', e)}

                                                        />
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
                                <div className="relative w-full  mb-6 mx-auto max-w-2xl  max-h-auto ">
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
                                                    <div className="flex flex-row  mt-2 ">
                                                        <label className="mb-2 pl-1 font-bold text-lg text-gray-900  w-1/3" for="first_name">ภาคเรียน</label>
                                                        <label className="ml-2 mb-2 pl-1 font-bold text-lg text-gray-900  w-2/3" for="first_name">ปีการศึกษา</label>
                                                    </div>
                                                    <div className="flex flex-row">
                                                        <input className=" py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-1/3" type="text" onChange={(e) => handleChange('school_term', e)} value={values.school_term} />
                                                        <input className="ml-2 py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-2/3" type="text" onChange={(e) => handleChange('school_year', e)} value={values.school_year} />

                                                    </div>

                                                </div>

                                                <div className="flex flex-col mb-4">
                                                    <div className="flex flex-row">
                                                        <label className=" ml-2 mb-2 pl-1 font-bold text-lg text-gray-900  w-1/2" htmlFor="">เริ่ม</label>
                                                        <DatePicker
                                                            dateFormat="dd-MM-yyyy"
                                                            className=" py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-full "

                                                            value={moment(values.school_year_start).format("YYYY-MM-DD")}
                                                            onChange={(e) => handleChange('school_year_start', e)}

                                                        />
                                                    </div>

                                                    <div className="flex flex-row">
                                                        <label className=" ml-2 mb-2 pl-1 font-bold text-lg text-gray-900  w-1/2" htmlFor="">สิ้นสุด</label>
                                                        <DatePicker
                                                            dateFormat="dd-MM-yyyy"
                                                            className=" py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-full "

                                                            value={moment(values.school_year_end).format("YYYY-MM-DD")}
                                                            onChange={(e) => handleChange('school_year_end', e)}

                                                        />
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

export default add_school_year
