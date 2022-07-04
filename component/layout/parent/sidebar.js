import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import { postNewscount } from "../../../action/news";

function Sidebar(props) {
    const [NewsCount, setNewsCount] = useState("")
    const [sidebaropen, setsidebaropen] = useState(false);
    const [setting, setSetting] = useState({
        sidebarcolor: "#E32626",
        sidebarfrontcolor: "#E3E0E0",
        iconcolor: "#F0F016",
        logouticoncolor: "#27CE06",
        hoversidebarfrontcolor: "#000000",
        hovercolor: "#F5F5F5",
        notifyiconcolor: "bg-red-100",
        notifyfrontcolor: "text-red-500",
        dasbordfront: "#0322E5",
        dasbordcolor: "bg-gray-100",
    });
    const [bgcolorhover, setBgcolorhover] = useState({
        timetable: "",
        elearning: "",
        leave: "",
        news: "",
        logout: "",
    });
    const [colorhover, setColorhover] = useState({
        timetable: "",
        elearning: "",
        leave: "",
        news: "",
        logout: "",
    });
    function clickmenu() {
        console.log("clickmenu");
        setsidebaropen(!sidebaropen);
    }


    useEffect(async () => {


        console.log('newscount-log-data', localStorage.getItem('newscount'))


        let data = {
            login_code: localStorage.getItem("LoginId")
        }

        let newscount = await postNewscount(data);

        console.log(newscount[0].cnt, "newcount");


        setNewsCount(newscount[0].cnt);


    }, [])

    useEffect(() => {
        setNewsCount(props.ChkNews);
    }, [props.ChkNews])


    const router = useRouter();
    const gotopage = async (name) => {
        // router.push("/student/main_student")
        // window.open(`/student/main_student`)
        // 

        if (name == "dashboard") {
            router.push("/parent/main_parent")
            console.log("หน้าหลัก");
        }
        else if (name == "timetable") {
            router.push("/parent/timetable")
            console.log("ตารางเรียน");
        }
        else if (name == "report_attendance") {
            router.push("/parent/report_attendance")
            console.log("ตารางเรียน");
        }
        else if (name == "sum_attendance") {
            router.push("/parent/sum_attendance")
            console.log("สรุปงานที่ได้รับ");
        } else if (name == "comments") {
            router.push("/parent/comments")
            console.log("สรุปข้อมูลการเข้าเรียน");
        } else if (name == "information") {
            router.push("/parent/information")
            console.log("ข่าวประชาสัมพันธ์");
        } else if (name == "leave") {
            router.push("/parent/leave")
            console.log("ลาหยุด");
        } else if (name == "assessment") {
            router.push("/parent/assessment")
            console.log("แบบประเมิน");
        } else if (name == "conductscore") {
            router.push("/parent/conductscore")
            console.log("คะแนนความประพฤติ");
        } else if (name == "logout") {
            window.localStorage.clear();
            router.push("/")
            console.log("สรุปงานที่ได้รับ");
        }
        // else if (name == "homevisit") {
        //     router.push("/parent/homevisit")
        //     console.log("การเยี่ยมบ้าน");
        // }

        else {
            console.log("ไม่ผ่าน");
        }

        // console.log(e.target.value);

    }

    return (
        <>
            {sidebaropen ? (
                <div className="  sm:hidden md:block lg:block xl:block h-full transition-transform duration-150 ease-in transform md:w-1/5  sidebar md:shadow md:translate-x-0 bg-color-blue z-50 absolute" >
                    <div className="flex text-center w-full">
                        <div className="flex-row w-full">
                            <button
                                onClick={() => clickmenu()}
                                className=" items-center justify-center text-xl text-white mt-5 "
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    class="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    stroke-width="2"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M10 19l-7-7m0 0l7-7m-7 7h18"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div className="flex items-center justify-center py-4 sidebar-header">
                        <div className="inline-flex">
                            <a href="#" className="inline-flex flex-row items-center px-2">
                                {/* <svg className="w-10 h-10 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                        fill-rule="evenodd"
                                        d="M11.757 2.034a1 1 0 01.638.519c.483.967.844 1.554 1.207 2.03.368.482.756.876 1.348 1.467A6.985 6.985 0 0117 11a7.002 7.002 0 01-14 0c0-1.79.684-3.583 2.05-4.95a1 1 0 011.707.707c0 1.12.07 1.973.398 2.654.18.374.461.74.945 1.067.116-1.061.328-2.354.614-3.58.225-.966.505-1.93.839-2.734.167-.403.356-.785.57-1.116.208-.322.476-.649.822-.88a1 1 0 01.812-.134zm.364 13.087A2.998 2.998 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879.586.585.879 1.353.879 2.121s-.293 1.536-.879 2.121z"
                                        clip-rule="evenodd"
                                    />
                                </svg> */}
                                <img src="/img/logo-login.png" className="h-14 w-18 " alt="" />
                                <span className="leading-10 text-gray-100 text-xl font-bold ml-1 uppercase">โรงเรียนสวนผึ้งวิทยา</span>
                            </a>
                        </div>
                    </div>
                    <div className="sidebar-content px-4 py-6">
                        <ul className="flex flex-col w-full">
                            <li className="my-px">
                                <a
                                    href="#" onClick={(e) => { gotopage("dashboard") }}
                                    className="flex flex-row items-center h-10 px-3 rounded-lg text-gray-700 bg-gray-100"
                                >
                                    <span className="flex items-center justify-center text-lg text-gray-400">
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
                                                d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"
                                            />
                                            <path
                                                d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"
                                            />

                                        </svg>
                                    </span>
                                    <span className="ml-3">Dashboard</span>
                                </a>
                            </li>


                            <li className="my-px">
                                <span className="flex font-medium text-sm text-gray-300 px-4 my-4 uppercase">Projects</span>
                            </li>
                            <li className="my-px">
                                <a
                                    href="#" onClick={(e) => { gotopage('timetable') }}
                                    className="flex flex-row items-center h-10 px-3 rounded-lg text-gray-300 hover:bg-gray-100 hover:text-gray-700"
                                >
                                    <span className="flex items-center justify-center text-lg text-gray-400">
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
                                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                            />
                                        </svg>
                                    </span>
                                    <span className="ml-3">ตารางเรียน/สอน</span>
                                </a>
                            </li>
                            {/* <li className="my-px">
                        <a
                            href="#" onClick={(name, e) => { gotopage('report_attendance') }}
                            className="flex flex-row items-center h-10 px-3 rounded-lg text-gray-300 hover:bg-gray-100 hover:text-gray-700"
                        >
                            <span className="flex items-center justify-center text-lg text-gray-400">
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
                                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                    />
                                </svg>
                            </span>
                            <span className="ml-3">รายงานการเข้าเรียน</span>
                        </a>
                    </li>  */}
                            {/* <li className="my-px">
                        <a
                            href="#" onClick={(e) => { gotopage('sum_attendance') }}
                            className="flex flex-row items-center h-10 px-3 rounded-lg text-gray-300 hover:bg-gray-100 hover:text-gray-700"
                        >
                            <span className="flex items-center justify-center text-lg text-gray-400">
                                <svg
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    className="h-6 w-6"
                                >
                                    <path d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                                </svg>
                            </span>
                            <span className="ml-3">สรุปข้อมูลการเข้าเรียน</span>
                            <span
                                className="flex items-center justify-center text-xs text-red-500 font-semibold bg-red-100 h-6 px-2 rounded-full ml-auto"
                            >1</span>
                        </a>
                    </li>  */}
                            {/* 
                     <li className="my-px">
                        <a
                            href="#" onClick={(e) => { gotopage("homevisit") }}
                            className="flex flex-row items-center h-10 px-3 rounded-lg text-gray-300 hover:bg-gray-100 hover:text-gray-700"
                        >
                            <span className="flex items-center justify-center text-lg text-gray-400">
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
                                        d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />

                                </svg>
                            </span>
                            <span className="ml-3">การเยี่ยมบ้าน</span>

                        </a>
                    </li>  */}

                            <li className="my-px">
                                <a
                                    href="#" onClick={(e) => { gotopage('information') }}
                                    className="flex flex-row items-center h-10 px-3 rounded-lg text-gray-300 hover:bg-gray-100 hover:text-gray-700"
                                >
                                    <span className="flex items-center justify-center text-lg text-gray-400">
                                        <svg
                                            fill="none"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            className="h-6 w-6"
                                        >
                                            <path d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                                        </svg>
                                    </span>
                                    <span className="ml-3">ข่าวประชาสัมพันธ์</span>
                                    <span
                                        className="flex items-center justify-center text-xs text-red-500 font-semibold bg-red-100 h-6 px-2 rounded-full ml-auto"
                                    >
                                        {NewsCount}
                                    </span>
                                </a>
                            </li>
                            {/* <li className="my-px">
                        <a
                            href="#" onClick={(e) => { gotopage('assessment') }}
                            className="flex flex-row items-center h-10 px-3 rounded-lg text-gray-300 hover:bg-gray-100 hover:text-gray-700"
                        >
                            <span className="flex items-center justify-center text-lg text-gray-400">
                                <svg
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    className="h-6 w-6"
                                >
                                    <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>

                            </span>
                            <span className="ml-3">ประเภทแบบประเมิน</span>
                            <span
                                className="flex items-center justify-center text-xs text-red-500 font-semibold bg-red-100 h-6 px-2 rounded-full ml-auto"
                            >1</span>
                        </a>
                    </li> */}
                            <li className="my-px">
                                <span className="flex font-medium text-sm text-gray-300 px-4 my-4 uppercase">Account</span>
                            </li>
                            {/* <li className="my-px">
                        <a
                            href="#"
                            className="flex flex-row items-center h-10 px-3 rounded-lg text-gray-300 hover:bg-gray-100 hover:text-gray-700"
                        >
                            <span className="flex items-center justify-center text-lg text-gray-400">
                                <svg
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    className="h-6 w-6"
                                >
                                    <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </span>
                            <span className="ml-3">Profile</span>
                        </a>
                    </li>
                    <li className="my-px">
                        <a
                            href="#"
                            className="flex flex-row items-center h-10 px-3 rounded-lg text-gray-300 hover:bg-gray-100 hover:text-gray-700"
                        >
                            <span className="flex items-center justify-center text-lg text-gray-400">
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
                                        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                                    />
                                </svg>
                            </span>
                            <span className="ml-3">Notifications</span>
                            <span
                                className="flex items-center justify-center text-xs text-red-500 font-semibold bg-red-100 h-6 px-2 rounded-full ml-auto"
                            >10</span>
                        </a>
                    </li>
                    <li className="my-px">
                        <a
                            href="#"
                            className="flex flex-row items-center h-10 px-3 rounded-lg text-gray-300 hover:bg-gray-100 hover:text-gray-700"
                        >
                            <span className="flex items-center justify-center text-lg text-gray-400">
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
                                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                                    />
                                    <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </span>
                            <span className="ml-3">Settings</span>
                        </a>
                    </li>  */}
                            <li className="my-px">
                                <a
                                    href="#"
                                    onClick={(e) => {
                                        gotopage("logout");
                                    }}
                                    className="flex flex-row items-center h-10 px-3 text-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700"
                                >
                                    <span className="flex items-center justify-center text-lg text-red-400">
                                        <svg
                                            fill="none"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            className="w-6 h-6"
                                        >
                                            <path d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
                                        </svg>
                                    </span>
                                    <span className="ml-3">Logout</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            ) : (
                <div className="  bg-blue-800  w-10  lg:w-12 h-full z-50 absolute  sm:hidden lg:block xl:block md:block">
                    {/* <div className="  bg-blue-800 sm:w-1/12  " style={{ width: "5%" }}></div> */}
                    <div className="flex text-center w-full">
                        <div className="flex-row w-full">
                            <div>
                                <button
                                    onClick={() => clickmenu()}
                                    className=" items-center justify-center text-lg text-white mt-5 "
                                >
                                    <svg
                                        fill="none"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        className="md:w-8 md:h-8  w-5 h-5"
                                    >
                                        <path d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                                    </svg>
                                </button>
                            </div>
                            {/* <div>
                          <button className=" items-center justify-center text-lg text-white mt-5 ">
                            <svg
                              fill="none"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              className="w-8 h-8"
                            >
                              <path d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                            </svg>
                          </button>
                        </div> */}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Sidebar
