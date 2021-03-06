import React, { useEffect, useState } from "react";
import Clock from "react-live-clock";
import moment from "moment";
import Sidebar from "../../component/layout/student/sidebar";
import Nav from "../../component/layout/student/nav";
import Footer from "../../component/layout/footer";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import SwiperCore, { Autoplay, Pagination, Navigation } from "swiper";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { postSchedule, postSchedule_Period } from "../../action/student";

function Timetable() {
  const [values, setValues] = useState();
  const [Schedulevalues, setSchedulevalues] = useState({
    student_code: "",
  });
  const [schedule, setSchedule] = useState([]);
  const [loadSchedule, setLoadSchedule] = useState({
    load: false,
    schedule_code: "",
  });

  const Pulldata = async () => {
    let data = "";
    data = await postSchedule(Schedulevalues);
    setValues(data);
    console.log("Schedule------->", data);
    // console.log('Data', data)
    // console.log('Values', values)
    setShowModal_Alltime(true);
  };

  const getDataSchudle_student = async () => {
    let login_id = localStorage.getItem("LoginId");
    let day_today = moment(new Date()).format("YYYY-MM-DD");
    let form = {
      datetime: day_today,
      student_code: login_id,
      date: new Date().getDay(),
    };
    // console.log('FROM', form)
    let data = await postSchedule_Period(form);
    console.log("data", data);
    let lunch = data.findIndex((res) => res.subject_code == "LUNCH");
    setLoadSchedule({ ...loadSchedule, lunch: lunch });
    setSchedule(data);
  };

  SwiperCore.use([Autoplay, Pagination, Navigation]);
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

  const [THdate, setTHdate] = useState("");
  useEffect(() => {
    let login = localStorage.getItem("LoginId");
    console.log("login", login);
    setSchedulevalues({ student_code: login });
    // console.log(localStorage.getItem('LoginId'));
    getDataSchudle_student();
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

  const [ShowModal_Alltime, setShowModal_Alltime] = useState(false);

  return (
    <div>
      <div className="flex flex-row min-h-screen bg-gray-100 text-gray-800 w-full z-40 absolute ">
        <Sidebar></Sidebar>
        <main className="flex flex-col flex-grow w-full transition-all duration-150 ease-in md:w-4/5 main md:ml-0 overflow-x-auto">
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
                <h1 className="  lg:text-xl m:text-sm text-base text-right  text-color-blue">
                  <Clock
                    format={"HH:mm:ss"}
                    ticking={true}
                    timezone={"Asia/Bangkok"}
                  />
                </h1>
              </div>
              {/* <button className="bg-transparent hover:bg-blue-600 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-600 hover:border-transparent rounded" onClick={() => Pulldata()}>ClickTest</button> */}
              <div className="w-full lg:6/12 mx-auto relative ">
                <div className="  text-xl text-center text-color-blue mb-4">
                  ตารางเรียน/สอนรายวัน
                </div>
                <div className="text-right text-color-blue mb-4">
                  <button
                    type="submit"
                    className="bg-transparent hover:bg-blue-600 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-600 hover:border-transparent rounded"
                    onClick={() => Pulldata()}
                  >
                    ดูตารางเรียน/สอนทั้งหมด
                  </button>
                </div>

                <div className="grid sm:grid-cols-2 ssm:grid-cols-1 md:grid-cols-3 gap-3 grid-cols-4">
                  {schedule.map((p, index) => (
                    <React.Fragment key={index}>
                      {index < loadSchedule.lunch && p.subject_code != "LUNCH" && (
                        <button
                          className={
                            p.status_checkinclassroom != null
                              ? "h-full p-1 md:px-6 md:py-6 font-bold text-white bg-green-500 rounded hover:bg-gray-500"
                              : "h-full p-1 md:px-6 md:py-6 font-bold text-white bg-gray-500 rounded hover:bg-blue-700"
                          }
                        >
                          <div className="w-full text-left ">
                            <h1 className="text-lg">{p.period}</h1>
                          </div>
                          <div className="flex flex-col justify-between md:flex-row">
                            {/* <h1 className="text-lg mr-20">{p.subject_name}</h1> */}
                          </div>
                          <div className="flex flex-col justify-between md:flex-row">
                            <h1 className="text-lg">{p.subject_code}</h1>
                          </div>
                          <div className="flex flex-col justify-between md:flex-row">
                            <h1 className="text-lg mr-20">
                              {p.teacher_firstname}
                            </h1>
                            <h1 className="text-lg">{p.room_name}</h1>
                          </div>
                        </button>
                      )}
                    </React.Fragment>
                  ))}
                </div>
                <div className="grid grid-cols-1 gap-1 mt-3 mb-3">
                  <div className="h-full px-6 py-6 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 w">
                    <h1 className="text-lg text-center">พัก</h1>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                  {schedule.map((p, index) => (
                    <React.Fragment key={index}>
                      {index > loadSchedule.lunch && p.subject_code != "LUNCH" && (
                        <button
                          className={
                            p.status_checkinclassroom != null
                              ? "h-full p-1 md:px-6 md:py-6 font-bold text-white bg-green-500 rounded hover:bg-gray-500"
                              : "h-full p-1 md:px-6 md:py-6 font-bold text-white bg-gray-500 rounded hover:bg-blue-700"
                          }
                        >
                          <div className="flex flex-row ">
                            <h1 className="text-lg">{p.period}</h1>
                          </div>
                          <div className="flex flex-row ">
                            {/* <h1 className="text-lg mr-20">{p.subject_name}</h1> */}
                          </div>
                          <div className="flex flex-row ">
                            <h1 className="text-lg">{p.subject_code}</h1>
                          </div>
                          <div className="flex flex-row ">
                            <h1 className="text-lg mr-20">
                              {p.teacher_firstname}
                            </h1>
                            <h1 className="text-lg">{p.room_name}</h1>
                          </div>
                        </button>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Alltime */}
            {ShowModal_Alltime ? (
              <>
                <div className="items-center flex overflow-x-auto overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
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
                              className="h-6 w-6"
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
                      <div className="relative px-6 flex-auto ">
                        <table className="m-5 mx-auto text-blue-800 bg-blue-200 rounded-t-lg">
                          <thead>
                            <tr className=" border-b-2 border-blue-300 text-center">
                              <th className="px-4 py-2 border-r-2 bg-blue-200 border-blue-300  w-1/12 ">
                                ชั่วโมงที่
                              </th>

                              {values
                                ? values[0].periodsCount.map((res) => (
                                  <>
                                    <th className="px-4 py-2 border-r-2 bg-blue-200 border-blue-300 w-1/12 ">
                                      {res == 0 ? "" : res}
                                    </th>
                                  </>
                                ))
                                : ""}
                            </tr>

                            <tr className=" border-b-2 border-blue-300 text-center">
                              <>
                                <th className="px-4 py-2 border-r-2 bg-blue-200 border-blue-300 ">
                                  เวลา
                                </th>
                                {values
                                  ? values[0].periods.map((res) => (
                                    <>
                                      <td className="px-4 py-2 border-r-2 bg-blue-200 border-blue-300  ">
                                        {res}
                                      </td>
                                    </>
                                  ))
                                  : ""}
                              </>
                            </tr>
                          </thead>
                          <tbody>
                            {values
                              ? values.map((t) => (
                                <tr className=" border-b-2 border-blue-300 text-center">
                                  <th className="px-4 py-2 border-r-2 bg-yellow-200 border-yellow-300 ">
                                    {t.day}
                                  </th>
                                  {t.period.map((p) => (
                                    <td className="px-4 py-2 border-r-2 bg-red-200 border-red-300  ">
                                      {p.subject_code}
                                      <br />
                                      {p.teacher_firstname}
                                      <br />
                                      {p.room_name}
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
                <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
              </>
            ) : (
              ""
            )}

            <Footer></Footer>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Timetable;
