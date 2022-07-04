import React, { useEffect, useState } from "react";
import ReactExport from "react-data-export";
import Clock from "react-live-clock";
import Sidebar from "../../component/layout/admin/sidebar";
import Nav from "../../component/layout/admin/nav";
import Footer from "../../component/layout/footer";
import Image from "next/image";
import moment from "moment";
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
  getchecklist_teacher,
} from "../../action/teacher";
import {
  getClassroom,
  checkname_code_classroom,
  postcreate_classroom,
  putupdate_classroom,
  delete_classroom,
  postdaily_time_personnel,
  poststaff,
} from "../../action/admin";
import { isAuth } from "../../action/auth";
import thLocale from "moment/locale/th";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { createGlobalStyle } from "styled-components";

function report_individual_personal() {
  const Auth = isAuth();
  const [values, setValues] = useState({
    month: moment(new Date()).format("YYYY-MM"),
    teacher_code: "",
  });
  const [rtas, setRtas] = useState({
    firstname: "",
    lastname: "",
    position: "",
    checkin: "",
    checkout: "",
    recordby: " ",
    descrpition: " ",
    who: "admin",
  });
  const ExcelFile = ReactExport.ExcelFile;
  const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
  const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;
  const exclename =
    "ายงานการลงเวลาบุคลากรรายบุคคล_" + moment(new Date()).format("YYYYMMDD");
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
  const [persona, setPersona] = useState({
    teacher_code: "",
    month: "",
  });
  const [TeacherddMap, setTeacherddMap] = useState("");
  const [ClassroomMap, setClassroomMap] = useState();
  const [PersonalMap, setPersonalMap] = useState([]);

  const [CheckClassroom_Name, setCheckClassroom_Name] = useState("");
  const [CheckClassroom_Code, setCheckClassroom_Code] = useState("");

  const options = {
    maintainAspectRatio: false, // Don't maintain w/h ratio
  };

  SwiperCore.use([Autoplay, Pagination, Navigation]);
  ChartJS.register(ArcElement, Tooltip, Legend);

  const [StartDate, setStartDate] = useState({
    month: moment(new Date()).format("YYYY-MM"),
  });

  const search = async (e) => {
    // let personal = persona
    console.log(values);
    let data2 = await poststaff(values);
    setPersonalMap(data2);
    console.log("data2", data2);
    let dataexcel = [];
    for (let index = 0; index < data2.length; index++) {
      var arr = [];
      if (data2 && data2[index].checkin_facescan_id) {
        arr = [
          { value: index + 1 },
          {
            value:
              moment(data2[index].date).add(543, "year").format("DD-MM-YYYY") ==
              "Invalid date"
                ? "-"
                : moment(data2[index].date)
                    .add(543, "year")
                    .format("DD-MM-YYYY"),
          },
          {
            value:
              moment(data2[index].timein).format("HH:MM") == "Invalid date"
                ? "-"
                : moment(data2[index].timein).format("HH:MM"),
          },
          {
            value:
              moment(data2[index].timeout).format("HH:MM") == "Invalid date"
                ? "-"
                : moment(data2[index].timeout).format("HH:MM"),
          },
          { value: data2[index].late == "1" ? "🗸" : "✗" },
          { value: data2[index].who || "-" },
          { value: data2[index].description || "-" },
        ];
      } else {
        arr = [
          { value: index + 1 },
          {
            value:
              moment(data2[index].date).add(543, "year").format("DD-MM-YYYY") ==
              "Invalid date"
                ? "-"
                : moment(data2[index].date)
                    .add(543, "year")
                    .format("DD-MM-YYYY"),
          },
          { value: "-" },
          { value: "-" },
          { value: "-" },
          { value: "-" },
          { value: data2[index].description || "-" },
        ];
      }

      dataexcel.push(arr);
    }

    let exclassroom = "";
    for (let index = 0; index < TeacherddMap.length; index++) {
      if (values.teacher_code == TeacherddMap[index].teacher_code) {
        exclassroom =
          TeacherddMap[index].firstname + " " + TeacherddMap[index].lastname;
      }
    }
    var arr1 = [
      [
        {
          value:
            moment(values.month).add(543, "year").format("MM-YYYY") ==
            "Invalid date"
              ? "-"
              : moment(values.month).add(543, "year").format("MM-YYYY"),
        },
        { value: exclassroom || "-" },
        { value: "04:00-21:00" },
        { value: "จันทร์,อังคาร,พุธ,พฤหัสบดี,ศุกร์" },
        { value: "08:00" },
        { value: "12:00" },
      ],
      [
        { value: "" },
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
          { title: "รายงานการลงเวลาบุคลากร รายบุคคล", width: { wch: 25 } },
        ],
        data: [[{ value: "" }]],
      },
      {
        columns: [
          { title: "เดือนที่", width: { wch: 17 } },
          { title: "ชื่อ-สกุล", width: { wch: 25 } },
          { title: "ช่วงเวลาทำงาน" },
          { title: "วันทำงาน" },
          { title: "เวลาสาย" },
          { title: "เวลาขาดงาน" },
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
  };
  const CancelClick = async () => {
    Dataload();
    setShowmodaladd(false);
    setShowmodaledit(false);
    setValues({
      classroom_code: "",
      classroom_name: "",
      detail: "",
      who: "admin",
    });
  };

  const SaveClick = async () => {
    let data = "";
    let save = values;
    (save.createdate = moment().format("YYYY-MM-DD HH:mm:ss")),
      console.log("save", save);
    if (Showmodaleadd) {
      data = await postcreate_classroom(save);
    } else {
      data = await putupdate_classroom(save);
    }

    Dataload();
    console.log(save);
    console.log(data);

    setShowmodaladd(false);
    setShowmodaledit(false);
  };

  const Dataload = async () => {
    let data = await getClassroom();
    setClassroomMap(data);
    console.log("data", data);
  };
  const [THdate, setTHdate] = useState("");
  useEffect(async () => {
    setRtas({
      rtss: [],
    });
    let teacher = await getchecklist_teacher();
    console.log(teacher);
    setTeacherddMap(teacher);
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

    let data = "";
    if (name == "month") {
      values[name] = moment(e).format("YYYY-MM");
    } else {
      values[name] = e.target.value;
      console.log(e.target.value);
    }

    setValues({ ...values });
  };

  // const handleChange2 = async (name, e) => {
  //     console.log(name)

  //     let data = ""
  //     if (name == "teacher_code") {
  //         TeacherddMap[name] = e.target.value
  //         console.log(e.target.value)
  //     }
  //     else {
  //         TeacherddMap[name] = e.target.value
  //         console.log(e.target.value)
  //     }

  //     setTeacherddMap({ ...TeacherddMap })

  // }

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
                รายงานการลงเวลาบุคลากร รายบุคคล
              </div>
            </div>
            <div className="p-2 text-center w-full">
              <div className="flex flex-col mb-4">
                <div className="flex flex-row">
                  <label
                    className="p-2 font-bold text-lg text-gray-900  w-1/4"
                    htmlFor=""
                  >
                    เดือนที่
                  </label>
                  <div className="ml-2 w-1/4">
                    <DatePicker
                      dateFormat="yyyy-MM"
                      showMonthYearPicker
                      className=" py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-full "
                      selected={new Date(values.month)}
                      onChange={(e) => handleChange("month", e)}
                    />
                    {/* <input
                      className=" py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-full "
                      onChange={(e) => handleChange("month", e)}
                      value={values.month}
                      type={month}
                    ></input> */}
                  </div>
                  <label
                    className="p-2 font-bold text-lg text-gray-900  w-1/4"
                    htmlFor=""
                  >
                    {/* สถานะ */}
                  </label>
                  <div class="ml-2 relative inline-flex w-1/4">
                    {/* <svg
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
                                            value={values.title}
                                            onChange={(e) => handleChange("title", e)}
                                        >
                                            <option value="">--เข้าออก--</option>

                                        </select> */}
                  </div>

                  <label
                    className="p-2 font-bold text-lg text-gray-900  w-1/4"
                    htmlFor=""
                  >
                    ช่วงเวลาทำงาน
                  </label>
                  <div class="ml-2 relative inline-flex w-1/4">
                    <input
                      disabled="true"
                      type="text"
                      value={"04:00-21:00"}
                      className="text-center bg-gray-200 relative inline-flex w-full"
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col mb-4">
                <div className="flex flex-row">
                  <label
                    className="p-2 font-bold text-lg text-gray-900  w-1/4"
                    htmlFor=""
                  >
                    ชื่อ-สกุล
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
                      value={values.teacher_code}
                      onChange={(e) => handleChange("teacher_code", e)}
                    >
                      <option value="">--ชื่อ สกุล--</option>
                      {TeacherddMap
                        ? TeacherddMap.map((p, index) => (
                            <option value={p.teacher_code}>
                              {p.firstname + " "}
                              {p.lastname != null ? p.lastname : ""}
                            </option>
                          ))
                        : ""}
                    </select>
                  </div>
                  <label
                    className="p-2 font-bold text-lg text-gray-900  w-1/4"
                    htmlFor=""
                  >
                    {/* แสดงเวลาบัตร */}
                  </label>
                  <div class="ml-2 relative inline-flex w-1/4">
                    {/* <svg
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
                                            value={values.title}
                                            onChange={(e) => handleChange("title", e)}
                                        >
                                            <option value="">--เข้าออก--</option>

                                        </select> */}
                  </div>
                  <label
                    className="p-2 font-bold text-lg text-gray-900  w-1/4"
                    htmlFor=""
                  >
                    วันทำงาน
                  </label>
                  <div class="ml-2 relative inline-flex w-1/4">
                    <input
                      disabled="true"
                      type="text"
                      value={"จันทร์,อังคาร,พุธ,พฤหัสบดี,ศุกร์"}
                      className="text-center bg-gray-200 relative inline-flex w-full"
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col mb-4">
                <div className="flex flex-row">
                  <label
                    className="p-2 font-bold text-lg text-gray-900  w-1/4"
                    htmlFor=""
                  ></label>
                  <div class="ml-2 relative inline-flex w-1/4"></div>

                  <label
                    className="p-2 font-bold text-lg text-gray-900  w-1/4"
                    htmlFor=""
                  ></label>
                  <div class="ml-2 relative inline-flex w-1/4"></div>
                  <label
                    className="p-2 font-bold text-lg text-gray-900  w-1/4"
                    htmlFor=""
                  >
                    เวลาสาย
                  </label>
                  <div class="ml-2 relative inline-flex w-1/4">
                    <input
                      disabled="true"
                      type="text"
                      value={"08:00"}
                      className="text-center bg-gray-200 relative inline-flex w-full"
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col mb-4">
                <div className="flex flex-row">
                  <label
                    className="p-2 font-bold text-lg text-gray-900  w-1/4"
                    htmlFor=""
                  ></label>
                  <div class="ml-2 relative inline-flex w-1/4"></div>
                  <label
                    className="p-2 font-bold text-lg text-gray-900  w-1/4"
                    htmlFor=""
                  ></label>
                  <div class="ml-2 relative inline-flex w-1/4"></div>
                  <label
                    className="p-2 font-bold text-lg text-gray-900  w-1/4"
                    htmlFor=""
                  >
                    เวลาขาดงาน
                  </label>
                  <div class="ml-2 relative inline-flex w-1/4">
                    <input
                      disabled="true"
                      type="text"
                      value={"12:00"}
                      className="text-center bg-gray-200 relative inline-flex w-full"
                    />
                  </div>
                </div>
              </div>

              <button
                className="mt-1 w-auto shadow hover:shadow-lg text-white bg-green-500 hover:text-green-500   border-2   border-green-500  hover:border-green-500  hover:bg-white rounded-lg background-transparent  uppercase px-6 py-1 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => search()}
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
                  name="รายงานการลงเวลาบุคลากร รายบุคคล"
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

                    <th className="py-2 text-gray-500 w-64 text-center">
                      วันที่
                    </th>
                    {/* <th className="py-2 text-gray-500 w-80 text-center" >ต่ำแหน่ง</th> */}
                    <th className="py-2 text-gray-500 w-32 text-center">
                      เวลาเข้า
                    </th>
                    <th className="py-2 text-gray-500 w-32 text-center">
                      เวลาออก
                    </th>
                    <th className="py-2 text-gray-500 w-32 text-center">
                      มาสาย
                    </th>
                    <th className="py-2 text-gray-500 w-64 text-center ">
                      บันทึกโดย
                    </th>
                    <th className="py-2 text-gray-500 w-64 text-center ">
                      หมายเหตุ
                    </th>
                  </tr>
                  {PersonalMap
                    ? PersonalMap.map((p, index) => (
                        <tr key={index + 1} className="border border-gray-300 ">
                          <td className="py-2  text-center  ">
                            {/* <label class="inline-flex items-center mt-3  rounded-lg ">
                                                    <input id="toogle1" type="checkbox" class="form-checkbox h-5 w-5 text-blue-600  outline-none c_all " onChange={(e) => handleChange('index1', e)} />
                                                </label> */}
                            {index + 1}
                          </td>

                          <td className="py-2  text-center w-64  ">
                            {" "}
                            {moment(p.date)
                              .add(543, "year")
                              .format("DD-MMM-YYYY")}{" "}
                          </td>
                          {/* <td className="py-2  text-center  ">{p.detail}</td> */}
                          {p.timein ? (
                            <td className="py-2  text-center  w-32 ">
                              {moment(p.timein).format("HH:MM")}{" "}
                            </td>
                          ) : (
                            <td className="py-2  text-center  "> - </td>
                          )}
                          {p.timeout ? (
                            <td className="py-2  text-center  w-32 ">
                              {moment(p.timeout).format("HH:MM")}{" "}
                            </td>
                          ) : (
                            <td className="py-2  text-center  "> - </td>
                          )}
                          {p.late == "1" ? (
                            <td className="py-2 icon_check ">
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
                            <td className="py-2 icon_check "> - </td>
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

export default report_individual_personal;
