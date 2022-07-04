import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { postNewscount } from "../../../action/news";
import { get_school_color } from "../../../action/admin";
import { Link } from "../../../action/auth";

function Sidebar(props) {
  const [NewsCount, setNewsCount] = useState("");
  const [DorpD, setDorpD] = useState(false);
  const [sidebaropen, setsidebaropen] = useState(false);
  const [setting, setSetting] = useState({
    schooliconcolor: "",
    schoolfrontcolor: "",
    sidebarcolor: "",
    sidebarfrontcolor: "",
    iconcolor: "",
    logouticoncolor: "",
    hoversidebarfrontcolor: "",
    hovercolor: "",
    notifyiconcolor: "",
    notifyfrontcolor: "",
    dashbordfront: "",
    dashbordcolor: "",
    schoolname: "",
    schoolnameEN: "",
  });
  const [bgcolorhover, setBgcolorhover] = useState({
    lineup: "",
    timetable: "",
    late: "",
    comments: "",
    E_Leaning: "",
    leave: "",
    information: "",
    report: "",
    report_daily_time_attendance_teacher: "",
    report_time_attendance_student_teacher: "",
    logout: "",
    home_visit: ""
  });
  const [colorhover, setColorhover] = useState({
    lineup: "",
    timetable: "",
    late: "",
    comments: "",
    E_Leaning: "",
    leave: "",
    information: "",
    report: "",
    report_daily_time_attendance_teacher: "",
    report_time_attendance_student_teacher: "",
    logout: "",
    home_visit: ""
  });

  const hoverchange = (name) => {
    //console.log(setting.hovercolor);
    // console.log(name);
    bgcolorhover[name] = setting.hovercolor;
    colorhover[name] = setting.hoverfrontcolor;
    setBgcolorhover({ ...bgcolorhover });
    setColorhover({ ...colorhover });
  };
  const unhoverchange = (name) => {
    bgcolorhover[name] = "";
    colorhover[name] = setting.sidebarfrontcolor;
    setBgcolorhover({ ...bgcolorhover });
    setColorhover({ ...colorhover });
  };

  function clickmenu() {
    console.log("clickmenu");
    setsidebaropen(!sidebaropen);
  }

  useEffect(async () => {
    console.log("newscount-log-data", localStorage.getItem("newscount"));

    let data2 = await get_school_color();
    setSetting(data2[0]);
    console.log(data2, "");

    let data = {
      login_code: localStorage.getItem("LoginId"),
    };

    let newscount = await postNewscount(data);

    console.log(newscount[0].cnt, "newcount");

    setNewsCount(newscount[0].cnt);

    // console.log("Before", bgcolorhover);

    Object.keys(bgcolorhover).map((key, index) => {
      bgcolorhover[key] = data2[0].sidebarcolor;
    });
    Object.keys(colorhover).map((key, index) => {
      colorhover[key] = data2[0].sidebarfrontcolor;
    });

    // console.log("After", bgcolorhover);

    setColorhover({ ...colorhover });
    setBgcolorhover({ ...bgcolorhover });
  }, []);

  useEffect(() => {
    setNewsCount(props.ChkNews);
  }, [props.ChkNews]);

  // useEffect(() => {
  //   setsidebaropen(props.sidebaropen);
  // }, [props.sidebaropen]);

  const router = useRouter();
  const gotopage = async (name) => {
    // router.push("/student/main_student")
    // window.open(`/student/main_student`)
    //

    if (name == "dashboard") {
      router.push("/teacher/main_teacher");
      console.log("หน้าหลัก");
    } else if (name == "lineup") {
      router.push("/teacher/lineup");
      console.log("เช็คชื่อ");
    } else if (name == "timetable") {
      router.push("/teacher/timetable");
      console.log("ตารางเรียน");
    } else if (name == "E-Leaning") {
      const token = localStorage.getItem("LoginToken");
      console.log(token);
      const E_Leaninglink = await Link({ token: token });
      router.push(E_Leaninglink.loginurl);
      console.log("E-Leaning", E_Leaninglink.loginurl);
    } else if (name == "late") {
      router.push("/teacher/late");
      console.log("จัดการเวลา");
    } else if (name == "home_visit") {
      router.push("/teacher/student_homevisit");
      console.log("homevisit");
    } else if (name == "daily") {
      router.push("/teacher/daily");
      console.log("สรุปงานที่ได้รับ");
    } else if (name == "comments") {
      router.push("/teacher/comments");
      console.log("สรุปข้อมูลการเข้าเรียน");
    } else if (name == "information") {
      router.push("/teacher/information");
      console.log("ข่าวประชาสัมพันธ์");
    } else if (name == "report_daily_time_attendance_teacher") {
      router.push("/teacher/report_daily_time_attendance_teacher");
      console.log("ส่วนตัวเช็คชื่อ");
    } else if (name == "report_time_attendance_student_teacher") {
      router.push("/teacher/report_time_attendance_student_teacher");
      console.log("ส่วนตัวเช็คชื่อ");
    } else if (name == "leave") {
      router.push("/teacher/leave");
      console.log("ลาหยุด");
    } else if (name == "assessment") {
      router.push("/teacher/assessment");
      console.log("แบบประเมิน");
    } else if (name == "conductscore") {
      router.push("/teacher/conductscore");
      console.log("คะแนนความประพฤติ");
    } else if (name == "logout") {
      window.localStorage.clear();
      router.push("/");
      console.log("สรุปงานที่ได้รับ");
    }
    // else if (name == "homevisit") {
    //     router.push("/teacher/homevisit")
    //     console.log("การเยี่ยมบ้าน");
    // }
    else {
      console.log("ไม่ผ่าน");
    }

    // console.log(e.target.value);
  };

  return (
    <>
      {sidebaropen ? (
        <div
          style={{ backgroundColor: setting.sidebarcolor }}
          className={
            "sm:hidden md:block lg:block xl:block h-full transition-transform duration-150 ease-in transform md:w-2/5 lg:w-1/5  sidebar md:shadow  md:translate-x-0 z-50 absolute"
          }
        >
          <div className="flex text-center w-full">
            <div className="flex-row w-full">
              <button
                onClick={() => clickmenu()}
                style={{ color: setting.schoolfrontcolor }}
                className={" items-center justify-center text-xl mt-5 "}
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
                <img
                  src={"" + setting.schooliconcolor}
                  className="h-14 w-18"
                  alt=""
                />
                <span
                  style={{ color: setting.schoolfrontcolor }}
                  className={
                    "ml-1 text-lg lg:text-xl font-bold leading-10 uppercase"
                  }
                >
                  {setting.schoolname}
                </span>
              </a>
            </div>
          </div>
          <div className="px-4 py-6 sidebar-content ">
            <ul className="flex flex-col w-full">
              <li className="my-px">
                <a
                  style={{
                    color: setting.dashbordfront,
                    backgroundColor: setting.dashbordcolor,
                  }}
                  href="#"
                  onClick={(e) => {
                    gotopage("dashboard");
                  }}
                  className={
                    "flex flex-row items-center h-10 px-3 bg-gray-100 rounded-lg"
                  }
                >
                  <span
                    style={{ color: setting.iconcolor }}
                    className={"flex items-center justify-center text-lg "}
                  >
                    <svg
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                      <path d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                    </svg>
                  </span>
                  <span className="ml-3 text-sm lg:text-lg   ">Dashboard</span>
                </a>
              </li>
              <li className="my-px">
                <span
                  style={{ color: setting.sidebarfrontcolor }}
                  className={"flex px-4 my-4 text-sm font-medium uppercase"}
                >
                  Projects
                </span>
              </li>
              <li className="my-px">
                <a
                  onMouseEnter={() => {
                    // console.log("hover");
                    hoverchange("lineup");
                  }}
                  onMouseLeave={() => {
                    // console.log("unhover");
                    unhoverchange("lineup");
                  }}
                  style={{
                    color: colorhover.lineup,
                    backgroundColor: bgcolorhover.lineup,
                  }}
                  href="#"
                  onClick={(name, e) => {
                    gotopage("lineup");
                  }}
                  className={"flex flex-row items-center h-10 px-3 rounded-lg "}
                >
                  <span
                    style={{ color: setting.iconcolor }}
                    className={"flex items-center justify-center text-lg "}
                  >
                    <svg
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                    </svg>
                  </span>
                  <span className="ml-3 text-sm  lg:text-lg">
                    เช็คชื่อเข้าแถว{" "}
                  </span>
                </a>
              </li>
              <li className="my-px">
                <a
                  onMouseEnter={() => {
                    // console.log("hover");
                    hoverchange("timetable");
                  }}
                  onMouseLeave={() => {
                    // console.log("unhover");
                    unhoverchange("timetable");
                  }}
                  style={{
                    color: colorhover.timetable,
                    backgroundColor: bgcolorhover.timetable,
                  }}
                  href="#"
                  onClick={(name, e) => {
                    gotopage("timetable");
                  }}
                  className={"flex flex-row items-center h-10 px-3 rounded-lg "}
                >
                  <span
                    style={{ color: setting.iconcolor }}
                    className={"flex items-center justify-center text-lg "}
                  >
                    <svg
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </span>
                  <span className="ml-3 text-sm lg:text-lg">
                    ตารางเรียน/สอน
                  </span>
                </a>
              </li>
              <li className="my-px">
                <a
                  onMouseEnter={() => {
                    // console.log("hover");
                    hoverchange("late");
                  }}
                  onMouseLeave={() => {
                    // console.log("unhover");
                    unhoverchange("late");
                  }}
                  style={{
                    color: colorhover.late,
                    backgroundColor: bgcolorhover.late,
                  }}
                  href="#"
                  onClick={(name, e) => {
                    gotopage("late");
                  }}
                  className={"flex flex-row items-center h-10 px-3 rounded-lg "}
                >
                  <span
                    style={{ color: setting.iconcolor }}
                    className={"flex items-center justify-center text-lg "}
                  >
                    <svg
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </span>
                  <span className="ml-3 text-sm lg:text-lg">จัดการเวลา</span>
                </a>
              </li>
              <li className="my-px">
                <a
                  onMouseEnter={() => {
                    // console.log("hover");
                    hoverchange("comments");
                  }}
                  onMouseLeave={() => {
                    // console.log("unhover");
                    unhoverchange("comments");
                  }}
                  style={{
                    color: colorhover.comments,
                    backgroundColor: bgcolorhover.comments,
                  }}
                  href="#"
                  onClick={(name, e) => {
                    gotopage("comments");
                  }}
                  className={"flex flex-row items-center h-10 px-3 rounded-lg "}
                >
                  <span
                    style={{ color: setting.iconcolor }}
                    className={"flex items-center justify-center text-lg "}
                  >
                    <svg
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </span>
                  <span className="ml-3 text-sm lg:text-lg">
                    จัดการนักเรียน
                  </span>
                </a>
              </li>
              <li className="my-px">
                <a
                  onMouseEnter={() => {
                    // console.log("hover");
                    hoverchange("home_visit");
                  }}
                  onMouseLeave={() => {
                    // console.log("unhover");
                    unhoverchange("home_visit");
                  }}
                  style={{
                    color: colorhover.home_visit,
                    backgroundColor: bgcolorhover.home_visit,
                  }}
                  href="#"
                  onClick={(name, e) => {
                    gotopage("home_visit");
                  }}
                  className={"flex flex-row items-center h-10 px-3 rounded-lg "}
                >
                  <span
                    style={{ color: setting.iconcolor }}
                    className={"flex items-center justify-center text-lg "}
                  >
                    <svg
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                    </svg>
                  </span>
                  <span className="ml-3 text-sm lg:text-lg">การเยี่ยมบ้าน</span>
                </a>
              </li>
              <li className="my-px">
                <button
                  onMouseEnter={() => {
                    // console.log("hover");
                    hoverchange("E_Leaning");
                  }}
                  onMouseLeave={() => {
                    // console.log("unhover");
                    unhoverchange("E_Leaning");
                  }}
                  style={{
                    color: colorhover.E_Leaning,
                    backgroundColor: bgcolorhover.E_Leaning,
                  }}
                  onClick={(name, e) => {
                    gotopage("E-Leaning");
                  }}
                  //href="https://noodee.net/login/index.php"
                  href=""
                  className={
                    "flex flex-row items-center h-10 px-3 rounded-lg w-full "
                  }
                >
                  <span
                    style={{ color: setting.iconcolor }}
                    className={"flex items-center justify-center text-lg "}
                  >
                    <svg
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                    </svg>
                  </span>
                  <span className="ml-3 text-sm lg:text-lg">E-Leaning</span>
                </button>
              </li>
              <li className="my-px">
                <a
                  onMouseEnter={() => {
                    // console.log("hover");
                    hoverchange("leave");
                  }}
                  onMouseLeave={() => {
                    // console.log("unhover");
                    unhoverchange("leave");
                  }}
                  style={{
                    color: colorhover.leave,
                    backgroundColor: bgcolorhover.leave,
                  }}
                  href="#"
                  onClick={(name, e) => {
                    gotopage("leave");
                  }}
                  className={"flex flex-row items-center h-10 px-3 rounded-lg "}
                >
                  <span
                    style={{ color: setting.iconcolor }}
                    className={"flex items-center justify-center text-lg "}
                  >
                    <svg
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                    </svg>
                  </span>
                  <span className="ml-3 text-sm lg:text-lg">แจ้งลาหยุด</span>
                </a>
              </li>
              <li className="my-px">
                <a
                  onMouseEnter={() => {
                    // console.log("hover");
                    hoverchange("information");
                  }}
                  onMouseLeave={() => {
                    // console.log("unhover");
                    unhoverchange("information");
                  }}
                  style={{
                    color: colorhover.information,
                    backgroundColor: bgcolorhover.information,
                  }}
                  href="#"
                  onClick={(e) => {
                    gotopage("information");
                  }}
                  className={"flex flex-row items-center h-10 px-3 rounded-lg"}
                >
                  <span
                    style={{ color: setting.iconcolor }}
                    className={"flex items-center justify-center text-lg "}
                  >
                    <svg
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                    </svg>
                  </span>
                  <span className="ml-3 text-sm lg:text-lg mr-2 lg:mr-2 md-mr-2">
                    ข่าวประชาสัมพันธ์
                  </span>
                  <span
                    style={{
                      backgroundColor: setting.notifyiconcolor,
                      color: setting.notifyfrontcolor,
                    }}
                    className={
                      "flex items-center justify-center h-6 px-2 ml-auto text-xs font-semibold rounded-full"
                    }
                  >
                    {NewsCount}
                  </span>
                </a>
              </li>
              <div>
                <li className="my-px">
                  <a
                    onMouseEnter={() => {
                      // console.log("hover");
                      hoverchange("report");
                    }}
                    onMouseLeave={() => {
                      // console.log("unhover");
                      unhoverchange("report");
                    }}
                    style={{
                      color: colorhover.report,
                      backgroundColor: bgcolorhover.report,
                    }}
                    href="#"
                    onClick={() => {
                      DorpD == true ? setDorpD(false) : setDorpD(true);
                    }}
                    className={
                      "flex flex-row items-center h-10 px-3 rounded-lg"
                    }
                  >
                    <span
                      style={{ color: setting.iconcolor }}
                      className={"flex items-center justify-center text-lg "}
                    >
                      <svg
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                      </svg>
                    </span>
                    <span className="ml-3 text-sm lg:text-lg">
                      ข้อมูลของรายงาน
                    </span>
                  </a>
                </li>
              </div>
              {DorpD ? (
                <>
                  <div className="ml-4">
                    <li className="my-px  ">
                      <a
                        onMouseEnter={() => {
                          // console.log("hover");
                          hoverchange("report_time_attendance_student_teacher");
                        }}
                        onMouseLeave={() => {
                          // console.log("unhover");
                          unhoverchange(
                            "report_time_attendance_student_teacher"
                          );
                        }}
                        style={{
                          color:
                            colorhover.report_time_attendance_student_teacher,
                          backgroundColor:
                            bgcolorhover.report_time_attendance_student_teacher,
                        }}
                        href="#"
                        onClick={(name, e) => {
                          gotopage("report_time_attendance_student_teacher");
                        }}
                        className={
                          "  flex flex-row items-center h-10 px-3 rounded-lg "
                        }
                      >
                        <span
                          style={{ color: setting.iconcolor }}
                          className={
                            " flex items-center justify-center text-lg "
                          }
                        >
                          <svg
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            className="w-6 h-6"
                          >
                            <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                          </svg>
                        </span>
                        <span className="ml-3 text-sm lg:text-lg   ">
                          {" "}
                          รายงานระบบลงเวลา <br /> (นักเรียนรายบุคคล){" "}
                        </span>
                      </a>
                    </li>
                    <li className="my-px">
                      <a
                        onMouseEnter={() => {
                          // console.log("hover");
                          hoverchange("report_daily_time_attendance_teacher");
                        }}
                        onMouseLeave={() => {
                          // console.log("unhover");
                          unhoverchange("report_daily_time_attendance_teacher");
                        }}
                        style={{
                          color:
                            colorhover.report_daily_time_attendance_teacher,
                          backgroundColor:
                            bgcolorhover.report_daily_time_attendance_teacher,
                        }}
                        href="#"
                        onClick={(name, e) => {
                          gotopage("report_daily_time_attendance_teacher");
                        }}
                        className={
                          "flex flex-row items-center h-10 px-3 rounded-lg"
                        }
                      >
                        <span
                          style={{ color: setting.iconcolor }}
                          className={
                            "flex items-center justify-center text-lg "
                          }
                        >
                          <svg
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            className="w-6 h-6"
                          >
                            <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                          </svg>
                        </span>
                        <span className="ml-3 text-sm lg:text-lg">
                          รายงานการลงเวลาประจำวัน{" "}
                        </span>
                      </a>
                    </li>
                  </div>
                </>
              ) : (
                ""
              )}
              <li className="my-px">
                <span
                  style={{ color: setting.sidebarfrontcolor }}
                  className={"flex px-4 my-4 text-sm font-medium uppercase"}
                >
                  Account
                </span>
              </li>
              <li className="my-px">
                <a
                  onMouseEnter={() => {
                    // console.log("hover");
                    hoverchange("logout");
                  }}
                  onMouseLeave={() => {
                    // console.log("unhover");
                    unhoverchange("logout");
                  }}
                  style={{
                    color: colorhover.logout,
                    backgroundColor: bgcolorhover.logout,
                  }}
                  href="#"
                  onClick={(e) => {
                    gotopage("logout");
                  }}
                  className={"flex flex-row items-center h-10 px-3 rounded-lg "}
                >
                  <span
                    style={{ color: setting.logouticoncolor }}
                    className={"flex items-center justify-center text-lg "}
                  >
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
                  <span className="ml-3 text-sm lg:text-lg">Logout</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <div
          style={{ backgroundColor: setting.sidebarcolor }}
          className={
            "w-10  lg:w-12 h-full z-50 absolute  sm:hidden lg:block xl:block md:block"
          }
        >
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

export default Sidebar;
