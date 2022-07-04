import React, { useEffect, useState } from "react";
import ReactExport from "react-data-export";
import Clock from "react-live-clock";
import Sidebar from "../../component/layout/admin/sidebar";
import Nav from "../../component/layout/admin/nav";
import Footer from "../../component/layout/footer";
import Image from "next/image";
import moment from "moment";
import thLocale from "moment/locale/th";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Swal from "sweetalert2";
import SwiperCore, { Autoplay, Pagination, Navigation } from "swiper";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  getteacher,
  postteacheradd,
  putteacherupdate,
  deleteteacher,
  upload,
} from "../../action/teacher";
import {
  getClassroom,
  checkname_code_classroom,
  get_school_year_all,
  report1,
} from "../../action/admin";
import { getStudent } from "../../action/student";
import { isAuth } from "../../action/auth";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

function report_time_attendance_student() {
  const Auth = isAuth();
  const ExcelFile = ReactExport.ExcelFile;
  const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
  const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;
  const exclename =
    "รายงานระบบลงเวลา(นักเรียนรายบุคคล)_" +
    moment(new Date()).format("YYYYMMDD");
  const [exroom, setexroom] = useState("");
  const [exl1, setexl1] = useState([
    {
      columns: [
        { title: "ลำดับ" },
        { title: "ชื่อ-นามสกุล" },
        { title: "รหัสนักเรียน" },
        { title: "เวลาเข้า" },
        { title: "เวลาออก" },
        { title: "มาสาย" },
        { title: "บันทึกโดย" },
        { title: "หมายเหตุ" },
      ],
      data: [
        [
          { value: "" },
          { value: "" },
          { value: "" },
          { value: "" },
          { value: "" },
          { value: "" },
          { value: "" },
          { value: "" },
        ],
      ],
    },
  ]);
  const [schoolterm, setSchoolterm] = useState([
    {
      month_end: 1,
      month_start: 1,
      school_year_id: "",
      school_term: "",
      school_year: "",
      school_term_year: "",
      school_year_start: "",
      school_year_end: "",
      createdate: "",
      year_end: 1,
      year_start: 1,
    },
  ]);
  const [values, setValues] = useState({
    school_year_id: "",
    month: "",
    classroom_level: "",
    classroom_code: "",
    student_code: "",
  });
  const [rtas, setRtas] = useState([]);

  const [ClassroomMap, setClassroomMap] = useState([
    {
      class: "",
      classroom_code: "",
      classroom_id: "",
      classroom_name: "",
      createdate: "",
      detail: "",
      who: "",
    },
  ]);
  const [student, setStudent] = useState([]);

  const [monthmap, setMonthmap] = useState([
    {
      month: "",
    },
  ]);

  const options = {
    maintainAspectRatio: false, // Don't maintain w/h ratio
  };

  SwiperCore.use([Autoplay, Pagination, Navigation]);
  ChartJS.register(ArcElement, Tooltip, Legend);

  const setupMonthmap = async (data2) => {
    let tmp = [];
    // tmp.school_year_id = data2[0].school_year_id;
    // console.log("tmp start", tmp);
    if (data2[0].year_start < data2[0].year_end) {
      let countmonth = 12 - data2[0].month_start + data2[0].month_end;
      let monthstart = data2[0].month_start;
      let newyearmonth = 1;
      for (let i = 0; i < countmonth + 1; i++) {
        if (monthstart <= 12) {
          if (monthstart < 10) {
            let schoolyear = parseInt(data2[0].school_year);
            tmp.push({
              school_year: data2[0].school_year,
              month: schoolyear + "-0" + monthstart,
            });
          } else {
            let schoolyear = parseInt(data2[0].school_year);
            tmp.push({
              school_year: data2[0].school_year,
              month: schoolyear + "-" + monthstart,
            });
          }

          monthstart++;
          console.log("set tmp", tmp);
        } else {
          if (newyearmonth < 10) {
            let schoolnewyear = parseInt(data2[0].school_year) + 1;
            tmp.push({
              school_year: data2[0].school_year,
              month: schoolnewyear + "-0" + newyearmonth,
            });
          } else {
            let schoolnewyear = parseInt(data2[0].school_year) + 1;
            tmp.push({
              school_year: data2[0].school_year,
              month: schoolnewyear + "-" + newyearmonth,
            });
          }
          newyearmonth++;
          console.log("set tmp", tmp);
        }
      }
    } else {
      let countmonth = data2[0].month_end - data2[0].month_start;
      let monthstart = data2[0].month_start;
      let newyearmonth = 1;
      for (let i = 0; i < countmonth + 1; i++) {
        if (monthstart <= 12) {
          if (monthstart < 10) {
            let schoolyear = parseInt(data2[0].school_year);
            tmp.push({
              school_year: data2[0].school_year,
              month: schoolyear + "-0" + monthstart,
            });
          } else {
            let schoolyear = parseInt(data2[0].school_year);
            tmp.push({
              school_year: data2[0].school_year,
              month: schoolyear + "-" + monthstart,
            });
          }
          monthstart++;
          console.log("set tmp", tmp);
        } else {
          if (monthstart < 10) {
            let schoolnewyear = parseInt(data2[0].school_year) + 1;
            tmp.push({
              school_year: data2[0].school_year,
              month: schoolnewyear + "-0" + newyearmonth,
            });
          } else {
            let schoolnewyear = parseInt(data2[0].school_year) + 1;
            tmp.push({
              school_year: data2[0].school_year,
              month: schoolnewyear + "-" + newyearmonth,
            });
          }
          newyearmonth++;
          console.log("set tmp", tmp);
        }
      }
    }
    setMonthmap(tmp);
    console.log("monthmap end", tmp);
    values["month"] = tmp[0].month;

    setValues({ ...values });
    console.log(values);
  };

  const Dataload = async () => {
    let data = await getClassroom();
    if (data) {
      for (let index = 0; index < data.length; index++) {
        data[index].classroom_level = data[index].classroom_code[1];
      }
    }
    setexroom(data);
    setClassroomMap(data);
    console.log("data classroom", data);

    let data2 = await get_school_year_all();
    if (data2) {
      for (let index = 0; index < data2.length; index++) {
        data2[index].month_start =
          new Date(data2[index].school_year_start).getMonth() + 1;
        data2[index].month_end =
          new Date(data2[index].school_year_end).getMonth() + 1;
        data2[index].year_start =
          parseInt(data2[index].school_year_start.substring(0, 4)) + 543;
        data2[index].year_end =
          parseInt(data2[index].school_year_end.substring(0, 4)) + 543;
        data2[index].school_term_year =
          data2[index].school_term + "/" + data2[index].school_year;
      }
    }
    await setupMonthmap(data2);
    setSchoolterm(data2);
    console.log("data term", data2);

    let data3 = await getStudent();
    if (data3) {
      for (let index = 0; index < data3.length; index++) {
        data3[index].name_lastname =
          data3[index].firstname + " " + data3[index].lastname;
        data3[index].classroom_level = data3[index].classroom_code[1];
      }
    }
    setStudent(data3);
    console.log("data student", data3);
    if (data2) {
      values["school_year_id"] = data2[0].school_year_id;
      setValues({ ...values });
    }
  };

  const [THdate, setTHdate] = useState("");

  useEffect(() => {
    Dataload();

    timezone();
  }, []);

  const timezone = () => {
    const result = new Date().toLocaleDateString("th-TH", {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "long",
    });

    setTHdate(result);
    console.log(result);
  };

  const handleChange = async (name, e) => {
    console.log(name);
    console.log(e.target.value);
    values[name] = e.target.value;

    if (name == "school_year_id") {
      let check = [];
      for (let index = 0; index < schoolterm.length; index++) {
        if (schoolterm[index].school_year_id == e.target.value) {
          check.push(schoolterm[index]);
        }
      }
      console.log("value to setup monthmap", check);
      await setupMonthmap(check);
    }

    if (name == "classroom_level") {
      //get ค่าของ classroom เอามา setting ใหม่
      let data = await getClassroom();
      if (data) {
        for (let index = 0; index < data.length; index++) {
          data[index].classroom_level = data[index].classroom_code[1];
        }
      }
      setClassroomMap(data);
      //get ค่าของ student เอามา setting ใหม่
      let data3 = await getStudent();
      if (data3) {
        for (let index = 0; index < data3.length; index++) {
          data3[index].name_lastname =
            data3[index].firstname + " " + data3[index].lastname;
          data3[index].classroom_level = data3[index].classroom_code[1];
        }
      }
      setStudent(data3);

      if (e.target.value != "") {
        let result = data.filter(
          (data) => data.classroom_level == e.target.value
        );
        setClassroomMap(result);
        console.log("data after filter classroom", result);

        let result2 = data3.filter(
          (data3) => data3.classroom_level == e.target.value
        );
        setStudent(result2);
        console.log("data after filter student", result);

        values.classroom_code = "";
        values.student_code = "";
      } else {
        // Dataload();
        values.classroom_code = "";
        values.student_code = "";
      }
    }

    if (name == "classroom_code") {
      //get ค่าของ classroom เอามา setting ใหม่
      let data = await getClassroom();
      if (data) {
        for (let index = 0; index < data.length; index++) {
          data[index].classroom_level = data[index].classroom_code[1];
        }
      }
      setClassroomMap(data);
      //get ค่าของ student เอามา setting ใหม่
      let data3 = await getStudent();
      if (data3) {
        for (let index = 0; index < data3.length; index++) {
          data3[index].name_lastname =
            data3[index].firstname + " " + data3[index].lastname;
          data3[index].classroom_level = data3[index].classroom_code[1];
        }
      }
      setStudent(data3);

      if (e.target.value != "") {
        values.classroom_level = e.target.value[1];
        let result = data.filter(
          (data) => data.classroom_level == e.target.value[1]
        );
        setClassroomMap(result);
        console.log("data after filter classroom", result);

        let result2 = data3.filter(
          (data3) => data3.classroom_code == e.target.value
        );
        setStudent(result2);
        console.log("data after filter student", result2);
        values.student_code = "";
      } else {
        // Dataload();
        let result = data.filter(
          (data) => data.classroom_level == values.classroom_level
        );
        setClassroomMap(result);

        let result2 = data3.filter(
          (data3) => data3.classroom_level == values.classroom_level
        );
        setStudent(result2);

        values.student_code = "";
      }
    }

    if (name == "student_code") {
      //get ค่าของ classroom เอามา setting ใหม่
      let data = await getClassroom();
      if (data) {
        for (let index = 0; index < data.length; index++) {
          data[index].classroom_level = data[index].classroom_code[1];
        }
      }
      setClassroomMap(data);
      //get ค่าของ student เอามา setting ใหม่
      let data3 = await getStudent();
      if (data3) {
        for (let index = 0; index < data3.length; index++) {
          data3[index].name_lastname =
            data3[index].firstname + " " + data3[index].lastname;
          data3[index].classroom_level = data3[index].classroom_code[1];
        }
      }
      setStudent(data3);

      if (e.target.value != "") {
        const result3 = data3.filter(
          (data3) => data3.student_code == e.target.value
        );
        console.log(result3);
        values.classroom_level = result3[0].classroom_level;
        values.classroom_code = result3[0].classroom_code;
        console.log("เช็คบัค", values);
        let result = data.filter(
          (data) => data.classroom_level == values.classroom_level
        );
        setClassroomMap(result);
        console.log("data after filter classroom", result);

        let result2 = data3.filter(
          (data3) => data3.classroom_code == values.classroom_code
        );
        setStudent(result2);
        console.log("data after filter student", result2);
      } else {
        let result = data.filter(
          (data) => data.classroom_level == values.classroom_level
        );
        setClassroomMap(result);

        let result2 = data3.filter(
          (data3) => data3.classroom_code == values.classroom_code
        );
        setStudent(result2);
      }
    }
    setValues({ ...values });
    console.log(values);
  };

  function isEmpty(obj) {
    if (
      obj.classroom_code === "" ||
      obj.classroom_level === "" ||
      obj.month === "" ||
      obj.school_year_id === "" ||
      obj.student_code === ""
    ) {
      return true;
    }
    return false;
  }

  const searchClick = async () => {
    if (!isEmpty(values)) {
      console.log(values);
      const result = await report1(values);
      setRtas(result);
      console.log("searchclick", result);
      let dataexcel = [];
      for (let index = 0; index < result.length; index++) {
        var arr = [];
        if (result && result[index].checkin_facescan_id) {
          arr = [
            { value: index + 1 },
            {
              value:
                moment(result[index].date)
                  .add(543, "year")
                  .format("DD-MM-YYYY") == "Invalid date"
                  ? "-"
                  : moment(result[index].date)
                      .add(543, "year")
                      .format("DD-MM-YYYY"),
            },
            {
              value:
                moment(result[index].timein).format("HH:MM") == "Invalid date"
                  ? "-"
                  : moment(result[index].timein).utc().format("HH:MM"),
            },
            {
              value:
                moment(result[index].timeout).format("HH:MM") == "Invalid date"
                  ? "-"
                  : moment(result[index].timeout).utc().format("HH:MM"),
            },
            { value: result[index].late == "1" ? "🗸" : "✗" },
            { value: result[index].who || "-" },
            { value: result[index].description || "-" },
          ];
        } else {
          arr = [
            { value: index + 1 },
            {
              value:
                moment(result[index].date)
                  .add(543, "year")
                  .format("DD-MM-YYYY") == "Invalid date"
                  ? "-"
                  : moment(result[index].date)
                      .add(543, "year")
                      .format("DD-MM-YYYY"),
            },
            { value: "-" },
            { value: "-" },
            { value: result[index].late == "1" ? "🗸" : "✗" },
            { value: "-" },
            { value: result[index].description || "-" },
          ];
        }
        dataexcel.push(arr);
      }
      console.log(dataexcel);
      let exclass = "";
      if (values.classroom_level == "1") {
        exclass = "มัธยมศึกษาปีที่ 1";
      } else if (values.classroom_level == "2") {
        exclass = "มัธยมศึกษาปีที่ 2";
      } else if (values.classroom_level == "3") {
        exclass = "มัธยมศึกษาปีที่ 3";
      } else if (values.classroom_level == "4") {
        exclass = "มัธยมศึกษาปีที่ 4";
      } else if (values.classroom_level == "5") {
        exclass = "มัธยมศึกษาปีที่ 5";
      } else if (values.classroom_level == "6") {
        exclass = "มัธยมศึกษาปีที่ 6";
      }
      console.log(ClassroomMap);
      let exclassroom = "";
      for (let index = 0; index < ClassroomMap.length; index++) {
        if (values.classroom_code == ClassroomMap[index].classroom_code) {
          exclassroom = ClassroomMap[index].classroom_name;
        }
      }
      let studentname = "";
      for (let index = 0; index < student.length; index++) {
        if (values.student_code == student[index].student_code) {
          studentname =
            student[index].firstname + " " + student[index].lastname;
        }
      }
      let croom = "";
      for (let index = 0; index < exroom.length; index++) {
        if (values.classroom_code == exroom[index].classroom_code) {
          croom = exroom[index].classroom_name;
        }
      }
      let cschoolterm = "";
      for (let index = 0; index < schoolterm.length; index++) {
        if (values.school_year_id == schoolterm[index].school_year_id) {
          cschoolterm = schoolterm[index].school_term_year;
        }
      }
      var arr1 = [
        [
          { value: exclass || "-" },
          { value: studentname || "-" },
          { value: croom || "-" },
          {
            value:
              moment(values.month).add(543, "year").format("MM-YYYY") ==
              "Invalid date"
                ? "-"
                : moment(values.month).format("MM-YYYY"),
          },
          { value: cschoolterm || "-" },
        ],
        [
          { value: "" },
          { value: "" },
          { value: "" },
          { value: "" },
          { value: "" },
        ],
      ];

      console.log(arr1);
      setexl1([
        {
          columns: [
            { title: "", width: { wch: 17 } },
            {
              title: "รายงานระบบลงเวลา (นักเรียนรายบุคคล)",
              width: { wch: 25 },
            },
          ],
          data: [[{ value: "" }]],
        },
        {
          columns: [
            { title: "ระดับ", width: { wch: 17 } },
            { title: "ชื่อนักเรียน", width: { wch: 25 } },
            { title: "ห้องเรียน" },
            { title: "เดือน" },
            { title: "ภาค/ปีการศึกษา" },
          ],
          data: arr1,
        },
        {
          columns: [
            { title: "ลำดับ", width: { wch: 17 } },
            { title: "วันที่", width: { wch: 25 } },
            { title: "เวลาเข้า" },
            { title: "เวลาออก" },
            { title: "มาสาย" },
            { title: "บันทึกโดย" },
            { title: "หมายเหตุ" },
          ],
          data: dataexcel,
        },
      ]);
    } else {
      Swal.fire({
        icon: "error",
        title: "ผิดพลาด",
        text: "กรุณากรอกให้ครบ",
      });
      console.log("กรอกข้อมูลให้ครบด้วยนะค้าบ");
    }
    console.log("schooltermschool_year_id", schoolterm.school_year_id);
  };

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
                <p>
                  {/* {moment(new Date()).format('dddd : DD :MMMM :YYYY').toLocaleDateString("th-TH")}   */}
                  {THdate}
                </p>
              </h1>
            </div>
            <div className="flex flex-col   pr-4">
              <h1 className="   text-xl text-right  text-color-blue">
                <Clock
                  format={"HH:mm:ss"}
                  ticking={true}
                  timezone={"Asia/Bangkok"}
                />
              </h1>
            </div>
            <div className="flex flex-col pl-2">
              <div className="   text-xl text-left  w-full">
                รายงานระบบลงเวลา (นักเรียนรายบุคคล)
              </div>
            </div>
            {console.log("เทส")}
            <div className="p-2 text-center w-4/5 mx-auto">
              <div className="flex flex-col mb-4">
                <div className="flex flex-row">
                  <label
                    className="p-2 font-bold text-lg text-gray-900  w-1/4"
                    htmlFor=""
                  >
                    ภาค/ปีการศึกษา
                  </label>
                  <div class="ml-2 relative inline-flex w-1/4">
                    <svg
                      class="ml-2 w-2 h-2 absolute top-0 right-0 m-4 pointer-events-none"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 412 232"
                    >
                      <path
                        d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z"
                        fill="#648299"
                        fill-rule="nonzero"
                      />
                    </svg>
                    {}
                    <select
                      class="border border-gray-300 rounded-lg text-gray-600 h-10 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none w-full"
                      value={values.school_year_id}
                      onChange={(e) => handleChange("school_year_id", e)}
                    >
                      {schoolterm
                        ? schoolterm.map((p, index) => (
                            <option value={p.school_year_id}>
                              {p.school_term_year}
                            </option>
                          ))
                        : ""}
                    </select>
                  </div>
                  <label
                    className="p-2 font-bold text-lg text-gray-900  w-1/4"
                    htmlFor=""
                  >
                    เดือน
                  </label>
                  <div class="ml-2 relative inline-flex w-1/4">
                    <svg
                      class="ml-2 w-2 h-2 absolute top-0 right-0 m-4 pointer-events-none"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 412 232"
                    >
                      <path
                        d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z"
                        fill="#648299"
                        fill-rule="nonzero"
                      />
                    </svg>

                    <select
                      class="border border-gray-300 rounded-lg text-gray-600 h-10 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none w-full"
                      value={values.month}
                      onChange={(e) => handleChange("month", e)}
                    >
                      {monthmap
                        ? monthmap?.map((p, index) => (
                            <>
                              {p.month < 10 ? (
                                <option key={index} value={p.month}>
                                  {p.month}
                                </option>
                              ) : (
                                <option key={index} value={p.month}>
                                  {p.month}
                                </option>
                              )}
                            </>
                          ))
                        : ""}
                    </select>
                  </div>
                </div>
              </div>
              <div className="flex flex-col mb-4">
                <div className="flex flex-row">
                  <label
                    className="p-2 font-bold text-lg text-gray-900  w-1/4"
                    htmlFor=""
                  >
                    ระดับ
                  </label>
                  <div class="ml-2 relative inline-flex w-1/4">
                    <svg
                      class="ml-2 w-2 h-2 absolute top-0 right-0 m-4 pointer-events-none"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 412 232"
                    >
                      <path
                        d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z"
                        fill="#648299"
                        fill-rule="nonzero"
                      />
                    </svg>
                    <select
                      class="border border-gray-300 rounded-lg text-gray-600 h-10 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none w-full"
                      value={values.classroom_level}
                      onChange={(e) => handleChange("classroom_level", e)}
                    >
                      <option value="">--เลือกระดับการศึกษา--</option>
                      <option value="1">มัธยมศึกษาปีที่ 1 </option>
                      <option value="2">มัธยมศึกษาปีที่ 2 </option>
                      <option value="3">มัธยมศึกษาปีที่ 3 </option>
                      <option value="4">มัธยมศึกษาปีที่ 4 </option>
                      <option value="5">มัธยมศึกษาปีที่ 5 </option>
                      <option value="6">มัธยมศึกษาปีที่ 6 </option>
                    </select>
                  </div>
                  <label
                    className="p-2 font-bold text-lg text-gray-900  w-1/4"
                    htmlFor=""
                  >
                    ห้องเรียน
                  </label>
                  <div class="ml-2 relative inline-flex w-1/4">
                    <svg
                      class="ml-2 w-2 h-2 absolute top-0 right-0 m-4 pointer-events-none"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 412 232"
                    >
                      <path
                        d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z"
                        fill="#648299"
                        fill-rule="nonzero"
                      />
                    </svg>
                    <select
                      class="border border-gray-300 rounded-lg text-gray-600 h-10 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none w-full"
                      value={values.classroom_code}
                      onChange={(e) => handleChange("classroom_code", e)}
                    >
                      <option value="">--เลือกห้องเรียน--</option>
                      {ClassroomMap
                        ? ClassroomMap.map((p, index) => (
                            <option value={p.classroom_code}>
                              {p.classroom_name}
                            </option>
                          ))
                        : ""}
                    </select>
                  </div>
                </div>
              </div>
              <div className="flex flex-col mb-4">
                <div className="flex flex-row">
                  <label
                    className="p-2 font-bold text-lg text-gray-900  w-1/4"
                    htmlFor=""
                  >
                    ชื่อนักเรียน
                  </label>
                  <div class="ml-2 relative inline-flex w-1/4">
                    <svg
                      class="ml-2 w-2 h-2 absolute top-0 right-0 m-4 pointer-events-none"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 412 232"
                    >
                      <path
                        d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z"
                        fill="#648299"
                        fill-rule="nonzero"
                      />
                    </svg>
                    <select
                      class="border border-gray-300 rounded-lg text-gray-600 h-10 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none w-full"
                      value={values.student_code}
                      onChange={(e) => handleChange("student_code", e)}
                    >
                      <option value="">--ชื่อนักเรียน--</option>
                      {student
                        ? student.map((p, index) => (
                            <option value={p.student_code}>
                              {p.name_lastname}
                            </option>
                          ))
                        : ""}
                    </select>
                  </div>
                  <label className="p-2 font-bold text-lg text-gray-900  w-1/4"></label>
                  <div class="ml-2 relative inline-flex w-1/4"></div>
                </div>
              </div>

              <button
                className="mt-1 w-auto shadow hover:shadow-lg text-white bg-green-500 hover:text-green-500   border-2   border-green-500  hover:border-green-500  hover:bg-white rounded-lg background-transparent  uppercase px-6 py-1 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => searchClick()}
              >
                <div className="flex flex-row items-center justify-center content-center    ">
                  <div className=" mt-1 text-center">ค้นหา</div>
                </div>
              </button>
            </div>
            <div className="w-full flex justify-end mb-2">
              <ExcelFile
                filename={exclename}
                element={
                  <button
                    className="mt-1 w-auto shadow hover:shadow-lg text-white bg-green-500 hover:text-green-500   border-2   border-green-500  hover:border-green-500  hover:bg-white rounded-lg background-transparent  uppercase px-6 py-1 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 "
                    style={{ backgroundColor: "#8edf50d4" }}
                  >
                    Download
                  </button>
                }
              >
                <ExcelSheet
                  dataSet={exl1}
                  name="รายงานระบบลงเวลา (นักเรียนรายบุคคล)"
                />
              </ExcelFile>
            </div>
            <div className="flex flex-row   h-full ">
              <div className="px-1 w-full text-left">
                <table className="w-full">
                  <tr className=" bg-gray-300 ">
                    <th className="py-2 w-24 text-center">
                      {/* <label class="inline-flex items-center mt-3  rounded-lg">
                                                <input id="toogleAll" type="checkbox" class="form-checkbox h-5 w-5 text-blue-600  outline-none  m_all " onChange={(e) => all(e)} />
                                            </label> */}
                      ลำดับ
                    </th>
                    <th className="py-2 text-gray-500 w-32 text-center">
                      วันที่
                    </th>
                    <th className="py-2 text-gray-500 w-48 text-center">
                      เวลาเข้า
                    </th>
                    <th className="py-2 text-gray-500 w-48 text-center">
                      เวลาออก
                    </th>
                    <th className="py-2 text-gray-500 w-48 text-center">
                      มาสาย
                    </th>
                    <th className="py-2 text-gray-500 w-64 text-center">
                      บันทึกโดย
                    </th>
                    <th className="py-2 text-gray-500 w-64 text-center ">
                      หมายเหตุ
                    </th>
                  </tr>
                  {rtas
                    ? rtas.map((p, index) => (
                        <tr key={index + 1} className="border border-gray-300">
                          <td className="py-2  text-center ">{index + 1}</td>
                          <td className="py-2  text-center  ">
                            {" "}
                            {moment(p.date)
                              .add(543, "year")
                              .format("DD-MMM-YYYY")}
                          </td>
                          {p.timein ? (
                            <td className="py-2  text-center  ">
                              {p.timein.substring(11, 16)}
                            </td>
                          ) : (
                            <td className="py-2  text-center  "> - </td>
                          )}

                          {p.timeout ? (
                            <td className="py-2  text-center  ">
                              {p.timeout.substring(11, 16)}
                            </td>
                          ) : (
                            <td className="py-2  text-center  "> - </td>
                          )}
                          {p.late == "1" ? (
                            <td className="py-2 icon_check">
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
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                            </td>
                          ) : (
                            <td className="py-2 icon_check"> - </td>
                          )}
                          {p.who ? (
                            <td className="py-2  text-center ">{p.who}</td>
                          ) : (
                            <td className="py-2  text-center  "> - </td>
                          )}
                          {p.description ? (
                            <td className="py-2  text-center ">
                              {p.description}
                            </td>
                          ) : (
                            <td className="py-2  text-center  "> - </td>
                          )}
                        </tr>
                      ))
                    : ""}
                </table>
              </div>
            </div>
          </div>
          {/* Modal */}
          <Footer></Footer>
        </main>
      </div>
    </div>
  );
}

export default report_time_attendance_student;
