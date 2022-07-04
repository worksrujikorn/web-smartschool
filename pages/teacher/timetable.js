import React, { useEffect, useState } from "react";
import Clock from "react-live-clock";
import Sidebar from "../../component/layout/teacher/sidebar";
import Nav from "../../component/layout/teacher/nav";
import Footer from "../../component/layout/footer";
import moment from "moment";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import {
  post_schedule_teacher_list,
  post_schedule_teacher_view,
  postCheckin_classroom,
  postScheduleTeacher,
  postscheduleteacherstatus,
} from "../../action/teacher";
import Load from "../../component/layout/Load";
import * as Sweet2 from "../../component/layout/SweetAlert2";
function Timetable() {
  const [teacherbydaymap, setteacherbydaymap] = useState();
  const [values, setValues] = useState();

  const [THdate, setTHdate] = useState("");

  const [Timetables, setTimetables] = useState(false);
  const [TimetablesUnder, setTimetablesUnder] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [ShowModal_Alltime, setShowModal_Alltime] = useState(false);
  const [Check, setCheck] = useState(false);
  const [Incheck, setIncheck] = useState(true);
  const [Uncheck, setUncheck] = useState(false);
  const [GrayTimetable, setGrayTimetable] = useState(true);
  const [BlueTimetable, setBlueTimetable] = useState(false);

  const [schedule, setSchedule] = useState([]);
  const [scheduleTeacherstatus, setScheduleTeacherstatus] = useState([
    {
      classroom_code: "",
      schedule_code: "",
      status: "",
    },
  ]);
  const [scheduleListStudent, setScheduleListStudent] = useState([]);
  const [loadSchedule, setLoadSchedule] = useState({
    load: false,
    schedule_code: "",
  });

  const [Hours, setHours] = useState(false);
  const [Day, setDay] = useState(true);

  ChartJS.register(ArcElement, Tooltip, Legend);

  const data = {
    labels: ["มา", "ขาด"],
    datasets: [
      {
        label: "# of Votes",
        data: [95, 5],
        backgroundColor: ["#004AAD", "#FF0000"],
        // borderColor: [
        //     'rgba(255, 99, 132, 1)',
        //     '#004AAD'
        // ],
        borderWidth: 1,
      },
    ],
  };

  const plugins = [
    {
      beforeDraw: function (chart) {
        let width = chart.width,
          height = chart.height,
          ctx = chart.ctx;
        ctx.restore();
        let fontSize = (height / 160).toFixed(2);
        ctx.font = fontSize + "em sans-serif";
        ctx.textBaseline = "top";
        let text = "95%",
          textX = Math.round((width - ctx.measureText(text).width) / 1.95),
          textY = height / 1.9;
        ctx.fillText(text, textX, textY);
        ctx.save();
      },
    },
  ];

  useEffect(() => {
    getDataSchudle();
    console.log("scl", schedule);
    timezone();
    loadScheduleTeacherall();
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

  const loadScheduleTeacherall = async () => {
    let login_id = localStorage.getItem("LoginId");
    let form = {
      teacher_code: login_id,
    };
    let res = await postScheduleTeacher(form);

    console.log("postScheduleTeacher", res);
    setValues(res);
  };

  const loadScheduleTeacher = async (data) => {
    let login_id = localStorage.getItem("LoginId");
    let form = {
      teacher_code: login_id,
    };
    let res = await postScheduleTeacher(form);

    console.log("postScheduleTeacher", res);
    setValues(res);

    let senddata = [];
    for (let index = 0; index < data.length; index++) {
      senddata.push({
        classroom_code: data[index].classroom_code,
        schedule_code: data[index].schedule_code,
        teacher_code: data[index].teacher_code,
      });
    }
    let res2 = await postscheduleteacherstatus(senddata);
    console.log("senddata", senddata);
    console.log("scheduleteacherstatus", data);
    console.log("res2", res2);
    setScheduleTeacherstatus(res2);
  };

  const getDataSchudle = async () => {
    let login_id = localStorage.getItem("LoginId");
    let form = {
      date: new Date().getDay(),
      teacher_code: login_id,
    };
    console.log(form);
    let data = await post_schedule_teacher_list(form);
    if (data.length > 0) {
      console.log("data", data);
      let lunch = data.findIndex((res) => res.subject_code == "LUNCH");

      setLoadSchedule({
        ...loadSchedule,
        lunch: lunch,
        classroom_code: data[0].classroom_code,
      });
      console.log("sc", scheduleTeacherstatus);
      setSchedule(data);
      console.log("ld", loadSchedule);
      loadScheduleTeacher(data);
    }
  };

  const getDataSchudleByschedulId = async (schedule_code) => {
    console.log(schedule_code);
    let form = {
      schedule_code: schedule_code,
    };
    let res = await post_schedule_teacher_view(form);

    for (let index = 0; index < res.length; index++) {
      if (res[index].status_facescan != null) {
        res[index].status_classroom = moment().format("YYYY-MM-DD HH:mm:ss");
      }
    }

    if (res && res.length > 0) {
      setScheduleListStudent(res);
    }
  };

  const click_timetable = async (name, schedule_code) => {
    console.log("object");
    setLoadSchedule({ ...loadSchedule, load: true });

    await getDataSchudleByschedulId(schedule_code);
    if (name == "1") {
      setTimetables(true);
      setTimetablesUnder(false);
    } else {
      setTimetablesUnder(true);
      setTimetables(false);
    }

    setTimeout(() => {
      setLoadSchedule({
        ...loadSchedule,
        load: false,
        schedule_code: schedule_code,
      });
    }, 500);
  };
  const incheck = () => {
    setIncheck(true);
    setUncheck(false);
    setShowModal(false);
    setShowModal_Alltime(false);
  };
  const uncheck = () => {
    setIncheck(false);
    setUncheck(true);

    setShowModal(false);
    setShowModal_Alltime(false);
  };
  const bluetables = () => {
    setBlueTimetable(true);
    setGrayTimetable(false);
    setCheck(true);
  };
  const onCheckStudent = async (student_code, index) => {
    if (!scheduleListStudent[index].status_classroom) {
      scheduleListStudent[index].status_classroom = moment().format(
        "YYYY-MM-DD HH:mm:ss"
      );
      // checkInClassroom.push(student_code)
    } else {
      // let indexStudent = await checkInClassroom.findIndex((res) => res == student_code)
      // if (indexStudent > -1) {
      //     checkInClassroom.splice(indexStudent, 1); // 2nd parameter means remove one item only
      // }
      scheduleListStudent[index].status_classroom = null;
      scheduleListStudent[index].status_facescan = null;
    }

    // console.log(checkInClassroom);
    // setCheckInClassroom([...checkInClassroom])
    setScheduleListStudent([...scheduleListStudent]);
  };
  const onSubmitCheckinClassroom = async () => {
    setLoadSchedule({ ...loadSchedule, load: true });
    let student_code = [];
    let student_code_uncheck = [];

    for (const iterator of scheduleListStudent) {
      if (iterator.status_classroom != null) {
        student_code.push(iterator.student_code);
      } else {
        student_code_uncheck.push(iterator.student_code);
      }
    }

    let form = {
      checkin_classroom_code: loadSchedule.classroom_code,
      datetime: moment().format("YYYY-MM-DD HH:mm:ss"),
      teacher_code: localStorage.getItem("LoginId"),
      schedule_code: loadSchedule.schedule_code,
      detail: null,
      student_code: student_code,
      student_code_uncheck: student_code_uncheck,
    };
    console.log(form);
    let res = await postCheckin_classroom(form);
    console.log("postCheckin_classroom", res);
    Sweet2.onSuccess();
    getDataSchudle();
    setTimeout(() => {
      setLoadSchedule({ ...loadSchedule, load: false });
    }, 500);
  };

  return (
    <div>
      <div className="flex flex-row min-h-screen bg-gray-100 text-gray-800 w-full z-40 absolute ">
        <Sidebar></Sidebar>

        <div className="flex flex-col flex-grow w-full transition-all duration-150 ease-in md:w-4/5 main md:ml-0 overflow-x-auto">
          <Nav></Nav>
          <div className="ml-12">
            <div className="flex flex-col flex-grow p-4 main-content">
              <div className="flex md-4">

                <h1 className="   lg:w-3/4 w-1/4  lg:text-xl sm:text-sm text-base text-center text-color-blue"></h1>
                <h1 className=" lg:w-1/4 w-3/4 lg:text-xl m:text-sm text-base text-right  text-color-blue">
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

              <div className="flex flex-col items-center ">
                <div className="w-full lg:6/12 mx-auto relative ">
                  {/* <div className="flex flex-row w-full">
                                </div> */}
                  <div className="mb-4 text-xl text-center text-color-blue">
                    ตารางเรียน/สอน
                  </div>
                  <div className="mb-4 text-right text-color-blue">
                    <button
                      type="submit"
                      className="bg-transparent hover:bg-blue-600 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-600 hover:border-transparent rounded"
                      onClick={() => setShowModal_Alltime(true)}
                    >
                      ดูตารางเรียน/สอนทั้งหมด
                    </button>
                  </div>
                  <div className="grid sm:grid-cols-2 ssm:grid-cols-1 md:grid-cols-3 gap-3 grid-cols-4">
                    {schedule.map((s, index) => (
                      <React.Fragment key={index}>
                        {index < loadSchedule.lunch &&
                          s.subject_code != "LUNCH" && (
                            <button
                              className={
                                loadSchedule.schedule_code == s.schedule_code
                                  ? "h-full p-1 md:px-6 md:py-6 font-bold text-white bg-blue-700 rounded hover:bg-gray-500"
                                  : "h-full p-1 md:px-6 md:py-6 font-bold text-white bg-gray-500 rounded hover:bg-blue-700"
                              }
                              disabled={loadSchedule.load}
                              onClick={(e) =>
                                click_timetable("1", s.schedule_code)
                              }
                            >
                              <div className="w-full text-left">
                                <h1 className="text-lg">{s.period}</h1>
                              </div>
                              <div className="flex flex-col justify-between md:flex-row ">
                                <h1 className="text-lg">{s.subject_name}</h1>
                                <h1 className="text-lg">{s.subject_code}</h1>
                              </div>
                              <div className="flex flex-col justify-between md:flex-row">
                                <h1 className="text-lg ">{`${s.title} ${s.firstname} ${s.lastname}`}</h1>
                                <h1 className="text-lg">{s.room_name}</h1>
                              </div>
                            </button>
                          )}
                      </React.Fragment>
                    ))}
                  </div>
                  {Timetables ? (
                    <>
                      <div className="grid grid-cols-1 gap-1 mt-2">
                        {loadSchedule.load ? (
                          <div className="px-4 py-4 text-center border border-blue-600 rounded">
                            <Load></Load>
                          </div>
                        ) : (
                          <div className="px-4 py-4 border border-blue-600 rounded">
                            <div className="grid grid-cols-4 gap-10 md:grid-cols-8">
                              {scheduleListStudent &&
                                scheduleListStudent.map((s, index) => (
                                  <div
                                    className="text-center icon_font"
                                    key={index}
                                  >
                                    <button
                                      type="button"
                                      className="w-full icon-button bg-transparen"
                                      onClick={() =>
                                        onCheckStudent(s.student_code, index)
                                      }
                                    >
                                      <span>
                                        <img
                                          src={`${s.picture
                                            ? s.picture
                                            : "/icon/blank-profile.png"
                                            }`}
                                          className="object-scale-down h-20 rounded "
                                        ></img>
                                      </span>
                                      {s.status_classroom ||
                                        s.status_facescan ? (
                                        <span className="icon-button__check">
                                          <span className="material-icons md-18">
                                            done
                                          </span>
                                        </span>
                                      ) : (
                                        <span className="icon-button__uncheck">
                                          <span className="material-icons md-18">
                                            clear
                                          </span>
                                        </span>
                                      )}
                                    </button>
                                    <label className="text-center">
                                      {s.firstname + " " + s.lastname}
                                    </label>
                                  </div>
                                ))}
                            </div>
                          </div>
                        )}
                      </div>
                      <button
                        onClick={() => onSubmitCheckinClassroom()}
                        className="px-4 py-2 mt-2 font-semibold text-blue-700 bg-transparent border border-blue-500 rounded hover:bg-blue-500 hover:text-white hover:border-transparent"
                      >
                        บันทึก
                      </button>
                    </>
                  ) : (
                    ""
                  )}
                  {scheduleListStudent.map((s, index) => (
                    <React.Fragment key={index}>
                      {s.subject_code == "LUNCH" && (
                        <div className="grid grid-cols-1 gap-1 mt-3">
                          <div className="h-full px-6 py-6 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 w">
                            <h1 className="text-lg text-center">พัก</h1>
                          </div>
                        </div>
                      )}
                    </React.Fragment>
                  ))}

                  {TimetablesUnder ? (
                    <>
                      <div className="grid grid-cols-1 gap-1 mt-2">
                        {loadSchedule.load ? (
                          <div className="px-4 py-4 text-center border border-blue-600 rounded">
                            <Load></Load>
                          </div>
                        ) : (
                          <div className="px-4 py-4 border border-blue-600 rounded">
                            <div className="grid grid-cols-4 gap-10 md:grid-cols-8">
                              {scheduleListStudent &&
                                scheduleListStudent.map((s, index) => (
                                  <div
                                    className="text-center icon_font"
                                    key={index}
                                  >
                                    <button
                                      type="button"
                                      className="w-full icon-button bg-transparen"
                                      onClick={() =>
                                        onCheckStudent(s.student_code, index)
                                      }
                                    >
                                      <span>
                                        <img
                                          src={`${s.picture
                                            ? s.picture
                                            : "/icon/blank-profile.png"
                                            }`}
                                          className="object-scale-down h-20 rounded "
                                        ></img>
                                      </span>
                                      {s.status_classroom ||
                                        s.status_facescan ? (
                                        <span className="icon-button__check">
                                          <span className="material-icons md-18">
                                            done
                                          </span>
                                        </span>
                                      ) : (
                                        <span className="icon-button__uncheck">
                                          <span className="material-icons md-18">
                                            clear
                                          </span>
                                        </span>
                                      )}
                                    </button>
                                    <label className="text-center">
                                      {s.firstname + " " + s.lastname}
                                    </label>
                                  </div>
                                ))}
                            </div>
                          </div>
                        )}
                      </div>
                      <button
                        onClick={() => onSubmitCheckinClassroom()}
                        className="px-4 py-2 mt-2 mb-2 font-semibold text-blue-700 bg-transparent border border-blue-500 rounded hover:bg-blue-500 hover:text-white hover:border-transparent"
                      >
                        บันทึก
                      </button>
                    </>
                  ) : (
                    ""
                  )}
                  <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                    {schedule?.map((s, index) => (
                      <React.Fragment key={index}>
                        {index > loadSchedule.lunch &&
                          s.subject_code != "LUNCH" && (
                            <button
                              className={
                                loadSchedule.schedule_code == s.schedule_code
                                  ? scheduleTeacherstatus[index]?.status == "Y"
                                    ? "h-full p-1 md:px-6 md:py-6 font-bold text-white bg-green-700 rounded hover:bg-blue-500"
                                    : "h-full p-1 md:px-6 md:py-6 font-bold text-white bg-gray-500 rounded hover:bg-blue-500"
                                  : scheduleTeacherstatus[index]?.status == "Y"
                                    ? "h-full p-1 md:px-6 md:py-6 font-bold text-white bg-green-500 rounded hover:bg-blue-700"
                                    : "h-full p-1 md:px-6 md:py-6 font-bold text-white bg-gray-500 rounded hover:bg-blue-700"
                              }
                              disabled={loadSchedule.load}
                              onClick={(e) =>
                                click_timetable("2", s.schedule_code)
                              }
                            >
                              {/* {console.log(scheduleTeacherstatus)} */}
                              <div className="w-full text-left">
                                <h1 className="text-lg">{s.period}</h1>
                              </div>
                              <div className="flex flex-col justify-between md:flex-row ">
                                <h1 className="text-lg">{s.subject_code}</h1>
                              </div>
                              <div className="flex flex-col justify-between md:flex-row">
                                {/* <h1 className="text-lg ">{`${s.title} ${s.firstname} ${s.lastname}`}</h1> */}
                                <h1 className="text-lg">{s.classroom_name}</h1>

                                <h1 className="text-lg">{s.room_name}</h1>
                              </div>
                            </button>
                          )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            {/* Modal */}
            {showModal && (
              <>
                <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
                  <div className="relative w-auto max-w-4xl mx-auto mb-6 mt-28 max-h-auto ">
                    {/*content*/}
                    <div className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
                      {/*header*/}
                      <div className="flex items-start justify-between p-5 border-b border-solid rounded-t border-blueGray-200 text-color-blue">
                        <h3 className="w-full ml-5 text-2xl font-semibold text-center">
                          ข้อมูลนักเรียน
                        </h3>
                        <button
                          className="float-right p-1 ml-auto text-3xl font-semibold leading-none text-black bg-transparent border-0 outline-none focus:outline-none"
                          onClick={() => setShowModal(false)}
                        >
                          <span className="block w-6 h-6 text-2xl text-black bg-transparent outline-none focus:outline-none">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-6 h-6"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </span>
                        </button>
                      </div>
                      {/*body*/}
                      <div className="relative flex-auto px-6 ">
                        <div className="w-full m-5 mx-auto text-blue-800">
                          <div className="">
                            ชื่อ : <span> นายดอกไม้ สีเขียว</span>
                          </div>
                          <label className="">
                            รหัส : <span> 6011110001</span>
                          </label>
                        </div>
                      </div>
                      {/*footer*/}
                      <div className="flex items-center justify-end p-6 border-t border-solid rounded-b border-blueGray-200">
                        <button
                          className="px-6 py-2 mb-1 mr-1 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear bg-red-600 border-2 border-white rounded-lg shadow outline-none hover:shadow-lg hover:text-red-600 hover:border-red-600 hover:bg-white background-transparent focus:outline-none"
                          type="button"
                          onClick={() => uncheck()}
                        >
                          ไม่มา
                        </button>
                        <button
                          className="px-6 py-2 mb-1 mr-1 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear bg-green-600 border-2 border-white rounded-lg shadow outline-none hover:shadow-lg hover:text-green-600 hover:border-green-600 hover:bg-white background-transparent focus:outline-none"
                          type="button"
                          onClick={() => incheck()}
                        >
                          มา
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
              </>
            )}

            {/* Modal Alltime */}
            {ShowModal_Alltime && (
              <>
                <div className="fixed inset-0 z-50 flex items-center  overflow-x-auto overflow-y-auto outline-none focus:outline-none">
                  <div className="relative w-auto max-w-6xl mx-auto mb-6 mt-28 max-h-auto ">
                    {/*content*/}
                    <div className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
                      {/*header*/}
                      <div className="flex items-start justify-between p-5 border-b border-solid rounded-t border-blueGray-200 text-color-blue">
                        <h3 className="w-full h-auto px-20 ml-5 text-2xl font-semibold text-center">
                          ตารางเรียน/สอนทั้งหมด
                        </h3>
                        <button
                          className="float-right p-1 ml-auto text-3xl font-semibold leading-none text-black bg-transparent border-0 outline-none focus:outline-none"
                          onClick={() => setShowModal_Alltime(false)}
                        >
                          <span className="block w-6 h-6 text-2xl text-black bg-transparent outline-none focus:outline-none">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-6 h-6"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </span>
                        </button>
                      </div>
                      {/*body*/}
                      <div className="relative flex-auto px-6 ">
                        <table className="m-5 mx-auto text-blue-800 bg-blue-200 rounded-t-lg">
                          <thead>
                            <tr className="text-center border-b-2 border-blue-300 ">
                              <th className="w-1/12 px-4 py-2 bg-blue-200 border-r-2 border-blue-300 ">
                                ชั่วโมงที่
                              </th>

                              {values.length > 0
                                ? values[0].periodsCount.map((res, index) => (
                                  <React.Fragment key={index}>
                                    <th className="w-1/12 px-4 py-2 bg-blue-200 border-r-2 border-blue-300 ">
                                      {res == 0 ? "" : res}
                                    </th>
                                  </React.Fragment>
                                ))
                                : ""}
                            </tr>

                            <tr className="text-center border-b-2 border-blue-300 ">
                              <>
                                <th className="px-4 py-2 bg-blue-200 border-r-2 border-blue-300 ">
                                  เวลา
                                </th>
                                {values.length > 0
                                  ? values[0].periods.map((res, index) => (
                                    <React.Fragment key={index}>
                                      <td className="px-4 py-2 bg-blue-200 border-r-2 border-blue-300 ">
                                        {res}
                                      </td>
                                    </React.Fragment>
                                  ))
                                  : ""}
                              </>
                            </tr>
                          </thead>
                          <tbody>
                            {values.length > 0
                              ? values.map((t, index) => (
                                <tr
                                  className="text-center border-b-2 border-blue-300 "
                                  key={index}
                                >
                                  <th className="px-4 py-2 bg-yellow-200 border-r-2 border-yellow-300 ">
                                    {t.day}
                                  </th>
                                  {t.period.map((p, index2) => (
                                    <td
                                      className="px-4 py-2 bg-red-200 border-r-2 border-red-300 "
                                      key={index2}
                                    >
                                      {p.subject_code}
                                      <br />
                                      {p.classroom_name}
                                      <br />
                                      {p.room_code}
                                      <br />
                                    </td>
                                  ))}
                                </tr>
                              ))
                              : ""}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
              </>
            )}
            <Footer></Footer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Timetable;
