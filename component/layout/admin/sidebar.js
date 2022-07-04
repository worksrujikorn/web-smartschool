import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { get_school_color } from "../../../action/admin";
function Sidebar() {
  const router = useRouter();

  const [Dorp, setDorp] = useState(false);
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
    information_student: "",
    information_late: "",
    information_teacher: "",
    information_news: "",
    information_classroom: "",
    add_school_year: "",
    add_conduct_score: "",
    add_group_department: "",
    report: "",
    report_daily_time_attendance: "",
    report_individual_personal: "",
    report_personal_time_attendance_daily: "",
    report_time_attendance_student: "",
    setting: "",
    logout: "",
  });
  const [colorhover, setColorhover] = useState({
    information_student: "",
    information_late: "",
    information_teacher: "",
    information_news: "",
    information_classroom: "",
    add_school_year: "",
    add_conduct_score: "",
    add_group_department: "",
    report: "",
    report_daily_time_attendance: "",
    report_individual_personal: "",
    report_personal_time_attendance_daily: "",
    report_time_attendance_student: "",
    setting: "",
    logout: "",
  });

  const hoverchange = (name) => {
    // console.log(setting.hovercolor);
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

  const gotopage = async (name) => {
    // router.push("/student/main_student")
    // window.open(`/student/main_student`)
    //

    if (name == "dashboard") {
      router.push("/admin/main_admin");
      console.log("หน้าหลัก");
    } else if (name == "information_student") {
      router.push("/admin/information_student");
      console.log("ข้อมูลนักเรียน");
    } else if (name == "information_teacher") {
      router.push("/admin/information_teacher");
      console.log("ข้อมูลครู");
    } else if (name == "information_news") {
      router.push("/admin/information_news");
      console.log("ข้อมูลข่าว");
    } else if (name == "information_late") {
      router.push("/admin/information_late");
      console.log("จัดการเวลาครู");
    } else if (name == "add_school_year") {
      router.push("/admin/add_school_year");
      console.log("ข้อมูลข่าว");
    } else if (name == "add_group_department") {
      router.push("/admin/add_group_department");
      console.log("เพิ่มกลุ่มสาระ");
    } else if (name == "information_classroom") {
      router.push("/admin/information_classroom");
      console.log("ข้อมูลข่าว");
    } else if (name == "report_daily_time_attendance") {
      router.push("/admin/report_daily_time_attendance");
      console.log("ส่วนตัวเช็คชื่อ");
    } else if (name == "report_individual_personal") {
      router.push("/admin/report_individual_personal");
      console.log("ส่วนตัวเช็คชื่อ");
    } else if (name == "report_personal_time_attendance_daily") {
      router.push("/admin/report_personal_time_attendance_daily");
      console.log("ส่วนตัวเช็คชื่อ");
    } else if (name == "setting") {
      router.push("/admin/setting");
      console.log("ตั้งค่า");
    } else if (name == "add_conduct_score") {
      router.push("/admin/add_conduct_score");
      console.log("คะแนน");
    }
    // else if (name == "report_summary_regional_personal") {
    //     router.push("/admin/report_summary_regional_personal")
    //     console.log("ส่วนตัวเช็คชื่อ");
    // }
    // else if (name == "report_summary_regional") {
    //     router.push("/admin/report_summary_regional")
    //     console.log("ส่วนตัวเช็คชื่อ");
    // }
    else if (name == "report_time_attendance_student") {
      router.push("/admin/report_time_attendance_student");
      console.log("ส่วนตัวเช็คชื่อ");
    } else if (name == "late") {
      router.push("/admin/late");

      console.log("จัดการเวลา");
    } else if (name == "logout") {
      window.localStorage.clear();
      // await localStorage.clear();
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
  useEffect(async () => {
    let data2 = await get_school_color();
    setSetting(data2[0]);
    console.log(data2, "");

    console.log("Before", bgcolorhover);

    Object.keys(bgcolorhover).map((key, index) => {
      bgcolorhover[key] = data2[0].sidebarcolor;
    });
    Object.keys(colorhover).map((key, index) => {
      colorhover[key] = data2[0].sidebarfrontcolor;
    });

    console.log("After", bgcolorhover);

    setColorhover({ ...colorhover });
    setBgcolorhover({ ...bgcolorhover });
  }, []);

  return (
    <aside
      style={{ backgroundColor: setting.sidebarcolor }}
      className={
        "w-1/5 transition-transform duration-150 ease-in transform -translate-x-full sidebar md:shadow md:translate-x-0 "
      }
    >
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
              className="h-14 w-18 "
              alt=""
            />
            <span
              style={{ color: setting.schoolfrontcolor }}
              className="ml-1 text-xl font-bold leading-10  uppercase"
            >
              {setting.schoolname}
            </span>
          </a>
        </div>
      </div>
      <div className="px-4 py-6 sidebar-content">
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
                  <path d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                  <path d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                </svg>
              </span>
              <span className="ml-3">Dashboard</span>
            </a>
          </li>
          <li className="my-px">
            <span
              style={{ color: setting.sidebarfrontcolor }}
              className={"flex px-4 my-4 text-sm font-medium  uppercase "}
            >
              Projects
            </span>
          </li>
          <li className="my-px">
            <a
              onMouseEnter={() => {
                // console.log("hover");
                hoverchange("information_student");
              }}
              onMouseLeave={() => {
                // console.log("unhover");
                unhoverchange("information_student");
              }}
              style={{
                color: colorhover.information_student,
                backgroundColor: bgcolorhover.information_student,
              }}
              href="#"
              onClick={(name, e) => {
                gotopage("information_student");
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
              <span className="ml-3">ข้อมูลของนักเรียน</span>
            </a>
          </li>
          <li className="my-px">
            <a
              onMouseEnter={() => {
                // console.log("hover");
                hoverchange("information_late");
              }}
              onMouseLeave={() => {
                // console.log("unhover");
                unhoverchange("information_late");
              }}
              style={{
                color: colorhover.information_late,
                backgroundColor: bgcolorhover.information_late,
              }}
              href="#"
              onClick={(name, e) => {
                gotopage("information_late");
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
              <span className="ml-3">จัดการเวลาครู</span>
            </a>
          </li>
          <li className="my-px">
            <a
              onMouseEnter={() => {
                // console.log("hover");
                hoverchange("information_teacher");
              }}
              onMouseLeave={() => {
                // console.log("unhover");
                unhoverchange("information_teacher");
              }}
              style={{
                color: colorhover.information_teacher,
                backgroundColor: bgcolorhover.information_teacher,
              }}
              href="#"
              onClick={(name, e) => {
                gotopage("information_teacher");
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
              <span className="ml-3">ข้อมูลของครู</span>
            </a>
          </li>
          <li className="my-px">
            <a
              onMouseEnter={() => {
                // console.log("hover");
                hoverchange("information_news");
              }}
              onMouseLeave={() => {
                // console.log("unhover");
                unhoverchange("information_news");
              }}
              style={{
                color: colorhover.information_news,
                backgroundColor: bgcolorhover.information_news,
              }}
              href="#"
              onClick={(name, e) => {
                gotopage("information_news");
              }}
              className={" flex flex-row items-center h-10 px-3 rounded-lg "}
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
              <span className="ml-3">ข้อมูลของเพิ่มข่าวประชาสัมพันธ์</span>
            </a>
          </li>

          <li className="my-px">
            <a
              onMouseEnter={() => {
                // console.log("hover");
                hoverchange("information_classroom");
              }}
              onMouseLeave={() => {
                // console.log("unhover");
                unhoverchange("information_classroom");
              }}
              style={{
                color: colorhover.information_classroom,
                backgroundColor: bgcolorhover.information_classroom,
              }}
              href="#"
              onClick={(name, e) => {
                gotopage("information_classroom");
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
              <span className="ml-3">ข้อมูลของห้องเรียน</span>
            </a>
          </li>
          <li className="my-px">
            <a
              onMouseEnter={() => {
                // console.log("hover");
                hoverchange("add_school_year");
              }}
              onMouseLeave={() => {
                // console.log("unhover");
                unhoverchange("add_school_year");
              }}
              style={{
                color: colorhover.add_school_year,
                backgroundColor: bgcolorhover.add_school_year,
              }}
              href="#"
              onClick={(name, e) => {
                gotopage("add_school_year");
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
              <span className="ml-3">เพิ่มปีการศึกษา</span>
            </a>
          </li>
          <li className="my-px">
            <a
              onMouseEnter={() => {
                // console.log("hover");
                hoverchange("add_group_department");
              }}
              onMouseLeave={() => {
                // console.log("unhover");
                unhoverchange("add_group_department");
              }}
              style={{
                color: colorhover.add_group_department,
                backgroundColor: bgcolorhover.add_group_department,
              }}
              href="#"
              onClick={(name, e) => {
                gotopage("add_group_department");
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
              <span className="ml-3">เพิ่มกลุ่มสาระการเรียนรู้</span>
            </a>
          </li>
          <li className="my-px">
            <a
              onMouseEnter={() => {
                // console.log("hover");
                hoverchange("add_conduct_score");
              }}
              onMouseLeave={() => {
                // console.log("unhover");
                unhoverchange("add_conduct_score");
              }}
              style={{
                color: colorhover.add_conduct_score,
                backgroundColor: bgcolorhover.add_conduct_score,
              }}
              href="#"
              onClick={(name, e) => {
                gotopage("add_conduct_score");
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
              <span className="ml-3">คะแนนความประพฤติ</span>
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
                  Dorp == true ? setDorp(false) : setDorp(true);
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
                <span className="ml-3">ข้อมูลของรายงาน</span>
              </a>
            </li>
          </div>
          {Dorp ? (
            <>
              <div className="ml-4">
                <li className="my-px  ">
                  <a
                    onMouseEnter={() => {
                      // console.log("hover");
                      hoverchange("report_time_attendance_student");
                    }}
                    onMouseLeave={() => {
                      // console.log("unhover");
                      unhoverchange("report_time_attendance_student");
                    }}
                    style={{
                      color: colorhover.report_time_attendance_student,
                      backgroundColor:
                        bgcolorhover.report_time_attendance_student,
                    }}
                    href="#"
                    onClick={(name, e) => {
                      gotopage("report_time_attendance_student");
                    }}
                    className={
                      "  flex flex-row items-center h-10 px-3 rounded-lg "
                    }
                  >
                    <span
                      style={{ color: setting.iconcolor }}
                      className={" flex items-center justify-center text-lg "}
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
                    <span className="ml-3   ">
                      {" "}
                      รายงานระบบลงเวลา <br /> (นักเรียนรายบุคคล){" "}
                    </span>
                  </a>
                </li>
                <li className="my-px">
                  <a
                    onMouseEnter={() => {
                      // console.log("hover");
                      hoverchange("report_daily_time_attendance");
                    }}
                    onMouseLeave={() => {
                      // console.log("unhover");
                      unhoverchange("report_daily_time_attendance");
                    }}
                    style={{
                      color: colorhover.report_daily_time_attendance,
                      backgroundColor:
                        bgcolorhover.report_daily_time_attendance,
                    }}
                    href="#"
                    onClick={(name, e) => {
                      gotopage("report_daily_time_attendance");
                    }}
                    className={
                      "flex flex-row items-center h-10 px-3 rounded-lg "
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
                    <span className="ml-3">รายงานการลงเวลาประจำวัน </span>
                  </a>
                </li>

                <li className="my-px">
                  <a
                    onMouseEnter={() => {
                      // console.log("hover");
                      hoverchange("report_personal_time_attendance_daily");
                    }}
                    onMouseLeave={() => {
                      // console.log("unhover");
                      unhoverchange("report_personal_time_attendance_daily");
                    }}
                    style={{
                      color: colorhover.report_personal_time_attendance_daily,
                      backgroundColor:
                        bgcolorhover.report_personal_time_attendance_daily,
                    }}
                    href="#"
                    onClick={(name, e) => {
                      gotopage("report_personal_time_attendance_daily");
                    }}
                    className={
                      "flex flex-row items-center h-10 px-3 rounded-lg "
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
                    <span className="ml-3">
                      รายงานการลงเวลาบุคลากรประจำวัน{" "}
                    </span>
                  </a>
                </li>
                <li className="my-px ">
                  <a
                    onMouseEnter={() => {
                      // console.log("hover");
                      hoverchange("report_individual_personal");
                    }}
                    onMouseLeave={() => {
                      // console.log("unhover");
                      unhoverchange("report_individual_personal");
                    }}
                    style={{
                      color: colorhover.report_individual_personal,
                      backgroundColor: bgcolorhover.report_individual_personal,
                    }}
                    href="#"
                    onClick={(name, e) => {
                      gotopage("report_individual_personal");
                    }}
                    className={
                      "  flex flex-row items-center h-10 px-3 rounded-lg "
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
                    <span className="ml-3 ">
                      รายงานการลงเวลาบุคลากร รายบุคคล{" "}
                    </span>
                  </a>
                </li>
                {/* <li className="my-px">
                  <a
                    href="#"
                    onClick={(name, e) => {
                      gotopage("report_summary_regional");
                    }}
                    className="flex flex-row items-center h-10 px-3 text-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700"
                  >
                    <span className="flex items-center justify-center text-lg text-gray-400">
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
                    <span className="ml-3 ">
                      รายงานสรุปขาด-ลา-มาสาย ประจำภาค{" "}
                    </span>
                  </a>
                </li> */}
                {/* <li className="my-px">
                  <a
                    href="#"
                    onClick={(name, e) => {
                      gotopage("report_summary_regional_personal");
                    }}
                    className="flex flex-row items-center h-10 px-3 text-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700"
                  >
                    <span className="flex items-center justify-center text-lg text-gray-400">
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
                    <span className="ml-3">
                      รายงานสรุปขาด-ลา-มาสาย บุคลากร{" "}
                    </span>
                  </a>
                </li> */}
              </div>
            </>
          ) : (
            ""
          )}
          <div></div>

          <li className="my-px">
            <span
              style={{ color: setting.sidebarfrontcolor }}
              className={"flex px-4 my-4 text-sm font-medium uppercase"}
            >
              Account
            </span>
          </li>
          <li className="my-px ">
            <a
              onMouseEnter={() => {
                // console.log("hover");
                hoverchange("setting");
              }}
              onMouseLeave={() => {
                // console.log("unhover");
                unhoverchange("setting");
              }}
              style={{
                color: colorhover.setting,
                backgroundColor: bgcolorhover.setting,
              }}
              href="#"
              onClick={(e) => {
                gotopage("setting");
              }}
              className={"flex flex-row items-center h-10 px-3 rounded-lg "}
            >
              <span
                style={{ color: setting.iconcolor }}
                className={"flex items-center justify-center text-lg "}
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
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </span>
              <span className="ml-3 ">ตั้งค่า </span>
            </a>
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
              <span className="ml-3">Logout</span>
            </a>
          </li>
        </ul>
      </div>
    </aside>
  );
}

export default Sidebar;
