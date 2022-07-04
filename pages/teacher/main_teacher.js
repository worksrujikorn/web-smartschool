import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Clock from "react-live-clock";
import Sidebar from "../../component/layout/teacher/sidebar";
import Nav from "../../component/layout/teacher/nav";
import Footer from "../../component/layout/footer";
import Image from "next/image";
import moment from "moment";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import SwiperCore, { Autoplay, Pagination, Navigation } from "swiper";
import {
  getnews,
  postschedulejobs,
  studentgraph,
  postteachertime,
  getDetailteacher,
} from "../../action/teacher";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

function Main_teacher() {
  const [values, setValues] = useState({});
  const router = useRouter();
  const [newsmap, setnewsmap] = useState();
  const [room, setroom] = useState();
  const [teachertime, setteachertime] = useState();
  const [Teacher_Time, setTeacher_Time] = useState({
    checkin: "--:--",
    checkout: "--:--",
  });
  const [studydetailmap, setstudydetailmap] = useState({
    All_Schedule: 0,
    Done: 0,
  });
  const [Graphmap, setGraphmap] = useState({
    absented: 0,
    attended: 0,
    late: 0,
    leave: 0,
  });
  const [Graphsum, setGraphsum] = useState();
  const options = {
    maintainAspectRatio: false, // Don't maintain w/h ratio
  };
  const [Open, setOpen] = useState(false);
  const [Enablemorning, setEnablemorning] = useState(true);
  const [Enablelate, setEnablelate] = useState(true);
  const [Enableevening, setEnableevening] = useState(true);

  SwiperCore.use([Autoplay, Pagination, Navigation]);
  ChartJS.register(ArcElement, Tooltip, Legend);

  const data = {
    labels: ["มา", "ลา", "สาย", "ขาด"],
    datasets: [
      {
        label: "# of Votes",
        data: [
          Graphmap?.attended || 0,
          Graphmap?.leave || 0,
          Graphmap?.late || 0,
          Graphmap?.absented || 0,
        ],
        backgroundColor: ["#2563EB", "#2CC090", "#FAC63E", "#F78182"],
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
        let text = "35 คน",
          textX = Math.round((width - ctx.measureText(text).width) / 1.95),
          textY = height / 1.9;
        ctx.fillText(text, textX, textY);
        ctx.save();
      },
    },
  ];

  const [THdate, setTHdate] = useState("");

  useEffect(async () => {
    let date = "0";

    if (moment(new Date()).format("dddd") == "Monday") {
      date = "1";
    } else if (moment(new Date()).format("dddd") == "Tuesday") {
      date = "2";
    } else if (moment(new Date()).format("dddd") == "Wednesday") {
      date = "3";
    } else if (moment(new Date()).format("dddd") == "Thursday") {
      date = "4";
    } else if (moment(new Date()).format("dddd") == "Friday") {
      date = "5";
    }
    let data = await getnews();
    let value1 = {
      teachercode: localStorage.getItem("LoginId"),
      date: date,
    };
    console.log(date);
    let data1 = await postschedulejobs(value1);
    console.log(data1);
    let data2 = await studentgraph(localStorage.getItem("LoginRoomId"));
    console.log(data2);
    let sum = (data2[0]?.attended || 0) + (data2[0]?.absented || 0);
    let data3 = await postteachertime({
      teacher_code: localStorage.getItem("LoginId"),
    });
    console.log(data3);
    let data4 = await getDetailteacher(localStorage.getItem("LoginId"));
    console.log(data4);
    setGraphsum(sum);
    setGraphmap(data2[0]);
    // setteachertime(data3)

    let check_time = [];
    console.log(data3.length);
    if (data3.length > 0) {
      setTeacher_Time(data3[0]);
    }

    // if (data3.length == 1) {
    //     console.log(' timetime', data3[0].time)
    //     check_time = {
    //         checkin: data3[0].time ? data3[0].time : "--:--",
    //         checkout: "--:--"
    //     }

    //     setTeacher_Time(check_time)
    // }
    // else if (data3.length == 2) {
    //     console.log('timetimetime', data3)
    //     check_time = {
    //         checkin: data3[0].time ? data3[0].time : "--:--",
    //         checkout: data3[1].time ? data3[1].time : "--:--"
    //     }
    //     setTeacher_Time(check_time)
    // }

    console.log("check_Time", check_time);

    setstudydetailmap(data1[0]);
    console.log(data);
    setnewsmap(data);

    setroom(data4[0].classroom_name);
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
  const opennews = async (id) => {
    router.push("/teacher/information");
  };
  const all = (e) => {
    let chk = document.getElementsByClassName("c_all");
    if (e.target.checked == true) {
      for (let index = 0; index < chk.length; index++) {
        chk[index].checked = true;
      }
      console.log(e.target.checked);
    } else {
      for (let index = 0; index < chk.length; index++) {
        chk[index].checked = false;
      }
      console.log(e.target.checked);
    }
  };

  const handleChange = (name, e) => {
    let chk_all = document.getElementsByClassName("m_all");

    for (let index = 0; index < chk_all.length; index++) {
      chk_all[index].checked = false;
    }
    console.log("showfalse", e.target.checked);
    // if (name == 'index1') {

    //     if (e.target.checked == false) {

    //         console.log('showfalse', chk_all.length);
    //     }
    // }
  };
  const enable = (name, e) => {
    if (name == "morning") {
      if (Enablemorning == false) {
        setEnablemorning(true);
      } else if (Enablemorning == true) {
        setEnablemorning(false);
      }
      console.log(Enablemorning);
    } else if (name == "late") {
      if (Enablelate == false) {
        setEnablelate(true);
      } else if (Enablelate == true) {
        setEnablelate(false);
      }
      console.log(Enablemorning);
    } else if (name == "evening") {
      if (Enableevening == false) {
        setEnableevening(true);
      } else if (Enableevening == true) {
        setEnableevening(false);
      }
      console.log(Enableevening);
    }

    console.log(name);
  };
  const open = () => {
    setOpen(true);
    if (Open == true) {
      setOpen(false);
    }
    console.log("ส่ง");
  };
  const [showModal, setShowModal] = useState(false);
  const [showModal1, setShowModal1] = useState(false);

  return (
    <div className=" ">
      <div className="flex flex-row min-h-screen bg-gray-100 text-gray-800 z-40 absolute  ">
        <Sidebar></Sidebar>
        <main className="flex flex-col flex-grow w-full transition-all duration-150 ease-in md:w-4/5 main md:ml-0 overflow-x-auto">
          <Nav></Nav>
          <div className="ml-12">
            <div className="main-content flex flex-col flex-grow p-4">
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

              <div className="flex flex-row lg:hidden ">
                <div className="   lg:text-xl text-base text-center text-color-blue w-full">
                  ข่าวประชาสัมพันธ์
                </div>
              </div>
              <div className="lg:flex flex-row   hidden">
                <div className="   lg:text-xl text-base text-left text-color-blue w-1/2">
                  ข่าวประชาสัมพันธ์
                </div>
                <div className="   lg:text-xl text-base text-left text-color-blue w-1/2">
                  จำนวนนักเรียน
                </div>
              </div>
              <div className="flex lg:flex-row flex-col   ">
                <div className="lg:w-1/2 sm:w-full rounded pt-4 pr-2">
                  <Swiper
                    spaceBetween={30}
                    centeredSlides={true}
                    autoplay={{
                      delay: 2500,
                      disableOnInteraction: false,
                    }}
                    pagination={{
                      clickable: true,
                    }}
                    navigation={true}
                    className="myswiper"
                  >
                    {newsmap
                      ? newsmap.map((p, index) => (
                          <>
                            <SwiperSlide>
                              <img
                                onClick={() => opennews(p.news_id)}
                                src={p.news_picture}
                                alt=""
                              ></img>
                            </SwiperSlide>
                            {/* <SwiperSlide><img src="/img-informaiton/information.jpg" alt="" ></img></SwiperSlide>
                                    <SwiperSlide><img src="/img-informaiton/information_6.jpg" alt="" className=" w-full  h-full"></img></SwiperSlide>
                                    <SwiperSlide><img src="/img-informaiton/information_7.jpg" alt=""></img></SwiperSlide>
                                    <SwiperSlide><img src="/img-informaiton/information_4.png" alt=""></img></SwiperSlide>
                                    <SwiperSlide><img src="/img-informaiton/information_5.png" alt=""></img></SwiperSlide> */}
                          </>
                        ))
                      : ""}
                  </Swiper>
                </div>
                <div className="flex lg:flex-row  lg:w-1/2 w-full  ">
                  <div className="  mt-4  flex-col   rounded  w-1/2 lg:w-2/3  lg:ml-2 border-2 border-blue-600  flex  justify-center   ">
                    <div className="   lg:ml-4 ml-2 lg:mt-2  lg:text-xl text-base text-left text-color-blue ">
                      นักเรียน {room} จำนวน {Graphsum} คน
                    </div>

                    <Doughnut
                      data={data}
                      options={options}
                      className=" canvas-container ml-5 lg:m-auto     "
                    />
                  </div>
                  <div className="   mt-4   rounded  w-1/2 lg:w-1/3  border-r-2 border-l-1 border-t-2 border-b-2 border-blue-600  flex  justify-center   ">
                    <div className="flex flex-col  h-full w-full px-2">
                      {/* <p
                                        href="#"
                                        className="  flex flex-row items-center h-1/5 px-3  my-2  w-full  rounded-lg text-white hover:bg-white  hover:border-blue-700  border-2     hover:text-blue-700 bg-blue-700"
                                    >
                                        <span className=" ml-2 w-1/3">ทั้งหมด</span>
                                        <span className=" text-center  w-1/3 text-xl">35 </span>
                                        <span className=" text-center  w-1/3 text-xl">คน </span>
                                    </p> */}

                      <p
                        href="#"
                        className="    flex flex-row items-center h-1/4 lg:px-3  px-1 my-2  w-full  rounded-lg hover:text-white bg-white  border-blue-600  border-2     text-blue-600 hover:bg-blue-600"
                      >
                        <span className=" lg:ml-2 w-1/2 lg:w-1/3 text-sm lg:text-xl">
                          นร.มา
                        </span>
                        <span className=" text-center  w-1/2 lg:w-1/3 text-sm lg:text-xl">
                          {Graphmap?.attended || 0}{" "}
                        </span>
                        <span className=" text-center  w-1/3 text-sm lg:text-xl">
                          คน{" "}
                        </span>
                      </p>

                      <a
                        href="#"
                        className="flex flex-row items-center h-1/4 lg:px-3   px-1 mb-2 w-full rounded-lg hover:text-white bg-white  border-green-500  border-2     text-green-500 hover:bg-green-500"
                      >
                        <span className=" lg:ml-2 w-1/2 lg:w-1/3   text-sm lg:text-xl">
                          นร.ลา{" "}
                        </span>
                        <span className=" text-center w-1/2 lg:w-1/3 text-sm lg:text-xl ">
                          {Graphmap?.leave || 0}{" "}
                        </span>
                        <span className=" text-center  w-1/3 text-sm lg:text-xl  ">
                          คน{" "}
                        </span>
                      </a>

                      <a
                        href="#"
                        className="flex flex-row items-center h-1/4 lg:px-3 px-1 mb-2  w-full rounded-lg hover:text-white bg-white  border-yellow-400  border-2     text-yellow-400 hover:bg-yellow-400"
                      >
                        <span className=" lg:ml-2 w-1/2 lg:w-1/3 text-sm lg:text-xl">
                          นร.สาย
                        </span>
                        <span className=" text-center  w-1/2 lg:w-1/3 text-sm lg:text-xl">
                          {Graphmap?.late || 0}{" "}
                        </span>
                        <span className=" text-center  w-1/3 text-sm lg:text-xl">
                          คน{" "}
                        </span>
                      </a>
                      <a
                        href="#"
                        className="flex flex-row items-center h-1/4 lg:px-3 px-1 mb-2 w-full rounded-lg hover:text-white bg-white  border-red-400  border-2     text-red-400 hover:bg-red-400"
                      >
                        <span className=" lg:ml-2 w-1/2 lg:w-1/3 text-sm lg:text-xl">
                          นร.ขาด
                        </span>
                        <span className=" text-center  w-1/2 lg:w-1/3 text-sm lg:text-xl">
                          {Graphmap?.absented || 0}{" "}
                        </span>
                        <span className=" text-center  w-1/3 text-sm lg:text-xl">
                          คน{" "}
                        </span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-row  h-1/2">
                <div className="  rounded mt-4 w-1/2  border-2 border-blue-600  ">
                  <div className="lg:p-4  p-2 h-full">
                    <div className="flex flex-col  h-full">
                      <div className=" lg:w-1/2  w-full text-left text-sm lg:text-xl text-blue-800  mb-2">
                        ข้อมูลเช็คชื่อครู
                      </div>

                      <p
                        href="#"
                        className="flex flex-row items-center h-1/2 lg:px-3 px-1 w-full mb-2  rounded-lg  hover:text-white bg-white  border-blue-700  border-2     text-blue-700 hover:bg-blue-700"
                      >
                        <span className=" ml-2 w-1/2  text-xs lg:text-xl ">
                          check-in เช้า :
                        </span>

                        <span className=" text-center  w-2/3 text-sm lg:text-xl">
                          {Teacher_Time.timein ? Teacher_Time.timein : "--: --"}{" "}
                          น.
                        </span>
                      </p>

                      <p
                        href="#"
                        className="flex flex-row items-center h-1/2 lg:px-3 px-1  w-full mb-2 rounded-lg hover:text-white bg-white  border-blue-700  border-2     text-blue-700 hover:bg-blue-700"
                      >
                        <span className=" ml-2 w-1/2  text-xs lg:text-xl">
                          check-out เย็น :
                        </span>

                        <span className=" text-center  w-2/3 text-sm lg:text-xl">
                          {Teacher_Time.timeout
                            ? Teacher_Time.timeout
                            : "--: --"}{" "}
                          น.
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="   rounded mt-4 w-1/2 ml-2 lg:ml-4  border-2 border-blue-600">
                  <div className="lg:p-4 p-2  h-full">
                    <div className="flex flex-col  h-full">
                      <div className="  lg:w-1/2  w-full text-left text-sm lg:text-xl text-blue-800 mb-2 ">
                        ข้อมูลการสอน
                      </div>
                      <p
                        onClick={() => router.push("/teacher/timetable")}
                        className="flex flex-row items-center h-1/2 lg:px-3 px-1 w-full mb-2 rounded-lg hover:text-white bg-white  border-blue-700  border-2     text-blue-700 hover:bg-blue-700"
                      >
                        <span className=" ml-2 w-2/3 lg:w-1/2   text-xs lg:text-xl ">
                          จำนวนวิชาสอน :
                        </span>
                        <span className=" text-center  lg:w-2/3 w-1/3 text-xs lg:text-xl">
                          {studydetailmap.All_Schedule || 0}
                        </span>
                      </p>

                      <p
                        onClick={() => router.push("/teacher/timetable")}
                        className="flex flex-row items-center h-1/2 lg:px-3 px-1  w-full mb-2 rounded-lg hover:text-white bg-white  border-blue-700  border-2     text-blue-700 hover:bg-blue-700"
                      >
                        <span className=" ml-2 w-2/3 lg:w-1/2 text-xs lg:text-xl">
                          เข้าสอนแล้ว :
                        </span>
                        <span className=" text-center lg:w-2/3 w-1/3 text-xs lg:text-xl">
                          {studydetailmap.Done || 0}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {showModal ? (
            <>
              <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-8/12   mt-28 mb-6 mx-auto max-w-4xl  max-h-auto ">
                  {/*content*/}
                  <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    {/*header*/}
                    <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t text-color-blue">
                      <h3 className="text-2xl font-semibold text-center w-full ml-5">
                        จำนวนนักเรียน ม. 6/2
                      </h3>
                      <button
                        className="p-1 ml-auto bg-transparent border-0 text-black  float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                        onClick={() => setShowModal(false)}
                      >
                        <span className="bg-transparent text-black  h-6 w-6 text-2xl block outline-none focus:outline-none">
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
                    <div className="relative p-6 flex-auto  ">
                      <div className=" w-full h-full border-2 border-blue-800 p-4 text-blue-800 rounded-lg">
                        <div className="flex flex-row    w-full border-2 border-blue-800 p-4 items-center rounded-lg max-h-96  overflow-y-auto ">
                          <table className="w-full text-center  text-sm   mt-4    ">
                            <tr>
                              <td
                                className=" w-1/12 border-2 border-blue-800"
                                onClick={() => open()}
                              >
                                <Image
                                  // src="/img-student/student-1.png"
                                  src="/img-student/student-2.jpg"
                                  alt=""
                                  height={60}
                                  width={50}
                                  layout="responsive"
                                  className=" h-auto "
                                />
                              </td>
                              <td className=" w-1/12 border-2 border-blue-800">
                                <Image
                                  // src="/img-student/student-1.png"
                                  src="/img-student/student-2.jpg"
                                  alt=""
                                  height={60}
                                  width={50}
                                  layout="responsive"
                                  className=" h-auto "
                                />
                              </td>
                              <td className=" w-1/12 border-2 border-blue-800">
                                <Image
                                  // src="/img-student/student-1.png"
                                  src="/img-student/student-2.jpg"
                                  alt=""
                                  height={60}
                                  width={50}
                                  layout="responsive"
                                  className=" h-auto "
                                />
                              </td>
                              <td className=" w-1/12 border-2 border-blue-800">
                                <Image
                                  // src="/img-student/student-1.png"
                                  src="/img-student/student-2.jpg"
                                  alt=""
                                  height={60}
                                  width={50}
                                  layout="responsive"
                                  className=" h-auto "
                                />
                              </td>
                              <td className=" w-1/12 border-2 border-blue-800">
                                <Image
                                  // src="/img-student/student-1.png"
                                  src="/img-student/student-2.jpg"
                                  alt=""
                                  height={60}
                                  width={50}
                                  layout="responsive"
                                  className=" h-auto "
                                />
                              </td>
                              <td className=" w-1/12 border-2 border-blue-800">
                                <Image
                                  // src="/img-student/student-1.png"
                                  src="/img-student/student-2.jpg"
                                  alt=""
                                  height={60}
                                  width={50}
                                  layout="responsive"
                                  className=" h-auto "
                                />
                              </td>
                              <td className=" w-1/12 border-2 border-blue-800">
                                <Image
                                  // src="/img-student/student-1.png"
                                  src="/img-student/student-2.jpg"
                                  alt=""
                                  height={60}
                                  width={50}
                                  layout="responsive"
                                  className=" h-auto "
                                />
                              </td>
                              <td className=" w-1/12 border-2 border-blue-800">
                                <Image
                                  // src="/img-student/student-1.png"
                                  src="/img-student/student-2.jpg"
                                  alt=""
                                  height={60}
                                  width={50}
                                  layout="responsive"
                                  className=" h-auto "
                                />
                              </td>
                              <td className=" w-1/12 border-2 border-blue-800">
                                <Image
                                  // src="/img-student/student-1.png"
                                  src="/img-student/student-2.jpg"
                                  alt=""
                                  height={60}
                                  width={50}
                                  layout="responsive"
                                  className=" h-auto "
                                />
                              </td>
                              <td className=" w-1/12 border-2 border-blue-800">
                                <Image
                                  // src="/img-student/student-1.png"
                                  src="/img-student/student-2.jpg"
                                  alt=""
                                  height={60}
                                  width={50}
                                  layout="responsive"
                                  className=" h-auto "
                                />
                              </td>
                            </tr>
                            <tr>
                              <td className=" w-1/12 border-2 border-blue-800">
                                6011110001
                              </td>
                              <td className=" w-1/12 border-2 border-blue-800">
                                6011110001
                              </td>
                              <td className=" w-1/12 border-2 border-blue-800">
                                6011110001
                              </td>
                              <td className=" w-1/12 border-2 border-blue-800">
                                6011110001
                              </td>
                              <td className=" w-1/12 border-2 border-blue-800">
                                6011110001
                              </td>
                              <td className=" w-1/12 border-2 border-blue-800">
                                6011110001
                              </td>
                              <td className=" w-1/12 border-2 border-blue-800">
                                6011110001
                              </td>
                              <td className=" w-1/12 border-2 border-blue-800">
                                6011110001
                              </td>
                              <td className=" w-1/12 border-2 border-blue-800">
                                6011110001
                              </td>
                              <td className=" w-1/12 border-2 border-blue-800">
                                6011110001
                              </td>
                            </tr>
                            <tr>
                              <td className=" w-1/12 border-2 border-blue-800">
                                เช้า : --:--
                              </td>
                              <td className=" w-1/12 border-2 border-blue-800">
                                เช้า : --:--
                              </td>
                              <td className=" w-1/12 border-2 border-blue-800">
                                เช้า : --:--
                              </td>
                              <td className=" w-1/12 border-2 border-blue-800">
                                เช้า : --:--
                              </td>
                              <td className=" w-1/12 border-2 border-blue-800">
                                เช้า : --:--
                              </td>
                              <td className=" w-1/12 border-2 border-blue-800">
                                เช้า : --:--
                              </td>
                              <td className=" w-1/12 border-2 border-blue-800">
                                เช้า : --:--
                              </td>
                              <td className=" w-1/12 border-2 border-blue-800">
                                เช้า : --:--
                              </td>
                              <td className=" w-1/12 border-2 border-blue-800">
                                เช้า : --:--
                              </td>
                              <td className=" w-1/12 border-2 border-blue-800">
                                เช้า : --:--
                              </td>
                            </tr>

                            <tr>
                              <td className=" w-1/12 border-2 border-blue-800">
                                เย็น : --:--
                              </td>
                              <td className=" w-1/12 border-2 border-blue-800">
                                เย็น : --:--
                              </td>
                              <td className=" w-1/12 border-2 border-blue-800">
                                เย็น : --:--
                              </td>
                              <td className=" w-1/12 border-2 border-blue-800">
                                เย็น : --:--
                              </td>
                              <td className=" w-1/12 border-2 border-blue-800">
                                เย็น : --:--
                              </td>
                              <td className=" w-1/12 border-2 border-blue-800">
                                เย็น : --:--
                              </td>
                              <td className=" w-1/12 border-2 border-blue-800">
                                เย็น : --:--
                              </td>
                              <td className=" w-1/12 border-2 border-blue-800">
                                เย็น : --:--
                              </td>
                              <td className=" w-1/12 border-2 border-blue-800">
                                เย็น : --:--
                              </td>
                              <td className=" w-1/12 border-2 border-blue-800">
                                เย็น : --:--
                              </td>
                            </tr>
                            <tr>
                              <td className=" w-1/12 border-2 border-blue-800">
                                แถว : มา
                              </td>
                              <td className=" w-1/12 border-2 border-blue-800">
                                แถว : ไม่มา
                              </td>
                              <td className=" w-1/12 border-2 border-blue-800">
                                แถว : มา
                              </td>
                              <td className=" w-1/12 border-2 border-blue-800">
                                แถว : มา
                              </td>
                              <td className=" w-1/12 border-2 border-blue-800">
                                แถว : มา
                              </td>
                              <td className=" w-1/12 border-2 border-blue-800">
                                แถว : มา
                              </td>
                              <td className=" w-1/12 border-2 border-blue-800">
                                แถว : มา
                              </td>
                              <td className=" w-1/12 border-2 border-blue-800">
                                แถว : มา
                              </td>
                              <td className=" w-1/12 border-2 border-blue-800">
                                แถว : มา
                              </td>
                              <td className=" w-1/12 border-2 border-blue-800">
                                แถว : มา
                              </td>
                            </tr>
                            <br />
                            <tr>
                              <td className=" w-1/12 border-2 border-blue-800">
                                <Image
                                  // src="/img-student/student-1.png"
                                  src="/img-student/student-2.jpg"
                                  alt=""
                                  height={60}
                                  width={50}
                                  layout="responsive"
                                  className=" h-auto "
                                />
                              </td>
                              <td className=" w-1/12 border-2 border-blue-800">
                                <Image
                                  // src="/img-student/student-1.png"
                                  src="/img-student/student-2.jpg"
                                  alt=""
                                  height={60}
                                  width={50}
                                  layout="responsive"
                                  className=" h-auto "
                                />
                              </td>
                              <td className=" w-1/12 border-2 border-blue-800">
                                <Image
                                  // src="/img-student/student-1.png"
                                  src="/img-student/student-2.jpg"
                                  alt=""
                                  height={60}
                                  width={50}
                                  layout="responsive"
                                  className=" h-auto "
                                />
                              </td>
                              <td className=" w-1/12 border-2 border-blue-800">
                                <Image
                                  // src="/img-student/student-1.png"
                                  src="/img-student/student-2.jpg"
                                  alt=""
                                  height={60}
                                  width={50}
                                  layout="responsive"
                                  className=" h-auto "
                                />
                              </td>
                              <td className=" w-1/12 border-2 border-blue-800">
                                <Image
                                  // src="/img-student/student-1.png"
                                  src="/img-student/student-2.jpg"
                                  alt=""
                                  height={60}
                                  width={50}
                                  layout="responsive"
                                  className=" h-auto "
                                />
                              </td>
                              <td className=" w-1/12 border-2 border-blue-800">
                                <Image
                                  // src="/img-student/student-1.png"
                                  src="/img-student/student-2.jpg"
                                  alt=""
                                  height={60}
                                  width={50}
                                  layout="responsive"
                                  className=" h-auto "
                                />
                              </td>
                              <td className=" w-1/12 border-2 border-blue-800">
                                <Image
                                  // src="/img-student/student-1.png"
                                  src="/img-student/student-2.jpg"
                                  alt=""
                                  height={60}
                                  width={50}
                                  layout="responsive"
                                  className=" h-auto "
                                />
                              </td>
                              <td className=" w-1/12 border-2 border-blue-800">
                                <Image
                                  // src="/img-student/student-1.png"
                                  src="/img-student/student-2.jpg"
                                  alt=""
                                  height={60}
                                  width={50}
                                  layout="responsive"
                                  className=" h-auto "
                                />
                              </td>
                              <td className=" w-1/12 border-2 border-blue-800">
                                <Image
                                  // src="/img-student/student-1.png"
                                  src="/img-student/student-2.jpg"
                                  alt=""
                                  height={60}
                                  width={50}
                                  layout="responsive"
                                  className=" h-auto "
                                />
                              </td>
                              <td className=" w-1/12 border-2 border-blue-800">
                                <Image
                                  // src="/img-student/student-1.png"
                                  src="/img-student/student-2.jpg"
                                  alt=""
                                  height={60}
                                  width={50}
                                  layout="responsive"
                                  className=" h-auto "
                                />
                              </td>
                            </tr>
                            <tr>
                              <td className=" w-1/12 border-2 border-blue-800">
                                6011110001
                              </td>
                              <td className=" w-1/12 border-2 border-blue-800">
                                6011110001
                              </td>
                              <td className=" w-1/12 border-2 border-blue-800">
                                6011110001
                              </td>
                              <td className=" w-1/12 border-2 border-blue-800">
                                6011110001
                              </td>
                              <td className=" w-1/12 border-2 border-blue-800">
                                6011110001
                              </td>
                              <td className=" w-1/12 border-2 border-blue-800">
                                6011110001
                              </td>
                              <td className=" w-1/12 border-2 border-blue-800">
                                6011110001
                              </td>
                              <td className=" w-1/12 border-2 border-blue-800">
                                6011110001
                              </td>
                              <td className=" w-1/12 border-2 border-blue-800">
                                6011110001
                              </td>
                              <td className=" w-1/12 border-2 border-blue-800">
                                6011110001
                              </td>
                            </tr>
                            <tr>
                              <td className=" w-1/12 border-2 border-blue-800">
                                เช้า : --:--
                              </td>
                              <td className=" w-1/12 border-2 border-blue-800">
                                เช้า : --:--
                              </td>
                              <td className=" w-1/12 border-2 border-blue-800">
                                เช้า : --:--
                              </td>
                              <td className=" w-1/12 border-2 border-blue-800">
                                เช้า : --:--
                              </td>
                              <td className=" w-1/12 border-2 border-blue-800">
                                เช้า : --:--
                              </td>
                              <td className=" w-1/12 border-2 border-blue-800">
                                เช้า : --:--
                              </td>
                              <td className=" w-1/12 border-2 border-blue-800">
                                เช้า : --:--
                              </td>
                              <td className=" w-1/12 border-2 border-blue-800">
                                เช้า : --:--
                              </td>
                              <td className=" w-1/12 border-2 border-blue-800">
                                เช้า : --:--
                              </td>
                              <td className=" w-1/12 border-2 border-blue-800">
                                เช้า : --:--
                              </td>
                            </tr>

                            <tr>
                              <td className=" w-1/12 border-2 border-blue-800">
                                เย็น : --:--
                              </td>
                              <td className=" w-1/12 border-2 border-blue-800">
                                เย็น : --:--
                              </td>
                              <td className=" w-1/12 border-2 border-blue-800">
                                เย็น : --:--
                              </td>
                              <td className=" w-1/12 border-2 border-blue-800">
                                เย็น : --:--
                              </td>
                              <td className=" w-1/12 border-2 border-blue-800">
                                เย็น : --:--
                              </td>
                              <td className=" w-1/12 border-2 border-blue-800">
                                เย็น : --:--
                              </td>
                              <td className=" w-1/12 border-2 border-blue-800">
                                เย็น : --:--
                              </td>
                              <td className=" w-1/12 border-2 border-blue-800">
                                เย็น : --:--
                              </td>
                              <td className=" w-1/12 border-2 border-blue-800">
                                เย็น : --:--
                              </td>
                              <td className=" w-1/12 border-2 border-blue-800">
                                เย็น : --:--
                              </td>
                            </tr>
                            <tr>
                              <td className=" w-1/12 border-2 border-blue-800">
                                แถว : มา
                              </td>
                              <td className=" w-1/12 border-2 border-blue-800">
                                แถว : มา
                              </td>
                              <td className=" w-1/12 border-2 border-blue-800">
                                แถว : มา
                              </td>
                              <td className=" w-1/12 border-2 border-blue-800">
                                แถว : มา
                              </td>
                              <td className=" w-1/12 border-2 border-blue-800">
                                แถว : มา
                              </td>
                              <td className=" w-1/12 border-2 border-blue-800">
                                แถว : มา
                              </td>
                              <td className=" w-1/12 border-2 border-blue-800">
                                แถว : มา
                              </td>
                              <td className=" w-1/12 border-2 border-blue-800">
                                แถว : มา
                              </td>
                              <td className=" w-1/12 border-2 border-blue-800">
                                แถว : มา
                              </td>
                              <td className=" w-1/12 border-2 border-blue-800">
                                แถว : มา
                              </td>
                            </tr>
                          </table>
                        </div>
                        <div className="mb-2"></div>

                        <div className="  h-48 border-2 border-blue-800 rounded-lg">
                          {Open ? (
                            <>
                              <div className="ml-4 mt-4 ">
                                แก้ไขเวลาของนักเรียน
                              </div>
                              <div className=" flex flex-wrap items-stretch  w-3/6 mx-4 my-4 relative ">
                                <div className="flex ">
                                  <span className=" w-28 flex items-center leading-normal  rounded rounded-r-none   bg-blue-800 px-3 whitespace-no-wrap text-grey-dark text-sm   text-white">
                                    check-in เช้า :
                                  </span>
                                </div>
                                <input
                                  type="time"
                                  className="   outline-none flex-shrink flex-grow flex-auto leading-normal w-px  border h-10 border-grey-light rounded rounded-l-none px-3 relative focus:border-blue focus:shadow"
                                  disabled={Enablemorning}
                                />
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    enable("morning");
                                  }}
                                  className="  hover:bg-yellow-500 m-auto p-2 rounded-lg ml-4  hover:text-white  text-yellow-500 border-2  border-yellow-500 bg-white  "
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 "
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                                    />
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                    />
                                  </svg>
                                </button>
                              </div>
                              {/* <div className="flex flex-wrap items-stretch  w-3/6 mx-4 my-2 relative ">
                                                                <div className="flex ">
                                                                    <span className=" w-28 flex items-center leading-normal  rounded rounded-r-none   bg-blue-800 px-3 whitespace-no-wrap text-grey-dark text-sm   text-white">

                                                                        check-in แถว :
                                                                    </span>
                                                                </div>
                                                                <input type="time" className="   outline-none flex-shrink flex-grow flex-auto leading-normal w-px  border h-10 border-grey-light rounded rounded-l-none px-3 relative focus:border-blue focus:shadow" disabled={Enablelate} />
                                                                <button type="button" onClick={(e) => { enable('late') }} className="  bg-yellow-500 m-auto p-2 rounded-lg ml-4  text-white  hover:text-yellow-500 border-2 border-yellow-500 hover:bg-white  ">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 " fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />

                                                                    </svg>



                                                                </button>
                                                            </div> */}
                              <div className="flex flex-wrap items-stretch  w-3/6 mx-4 my-4 relative ">
                                <div className="flex ">
                                  <span className="   w-28 flex items-center leading-normal  rounded rounded-r-none   bg-blue-800 px-3 whitespace-no-wrap text-grey-dark text-sm   text-white">
                                    check-in เย็น :
                                  </span>
                                </div>
                                <input
                                  type="time"
                                  className="   outline-none flex-shrink flex-grow flex-auto leading-normal w-px  border h-10 border-grey-light rounded rounded-l-none px-3 relative focus:border-blue focus:shadow"
                                  disabled={Enableevening}
                                />
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    enable("evening");
                                  }}
                                  className="  hover:bg-yellow-500 m-auto p-2 rounded-lg ml-4  hover:text-white  text-yellow-500 border-2  border-yellow-500 bg-white  "
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 "
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                                    />
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                    />
                                  </svg>
                                </button>
                              </div>
                            </>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    </div>
                    {/*footer*/}
                    <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                      <button
                        className=" shadow hover:shadow-lg text-white bg-red-600 hover:text-red-600   border-2   border-white hover:border-red-600  hover:bg-white rounded-lg background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => setShowModal(false)}
                      >
                        ยกเลิก
                      </button>
                      <button
                        className=" shadow hover:shadow-lg text-white bg-green-600 hover:text-green-600   border-2   border-white hover:border-green-600  hover:bg-white rounded-lg background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => setShowModal(false)}
                      >
                        บันทึก
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
            </>
          ) : (
            ""
          )}

          {showModal1 ? (
            <>
              <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-8/12   mt-28 mb-6 mx-auto max-w-4xl  max-h-auto ">
                  {/*content*/}
                  <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    {/*header*/}
                    <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t text-color-blue">
                      <h3 className="text-2xl font-semibold text-center w-full ml-5">
                        เช็คชื่อเข้าแถว ม. 6/2
                      </h3>
                      <button
                        className="p-1 ml-auto bg-transparent border-0 text-black  float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                        onClick={() => setShowModal1(false)}
                      >
                        <span className="bg-transparent text-black  h-6 w-6 text-2xl block outline-none focus:outline-none">
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
                    <div className="relative p-6 flex-auto  ">
                      <div className=" w-full h-full   p-4 text-blue-800 rounded-lg">
                        <div className="flex flex-row    w-full border-2 border-blue-800 p-4 items-center rounded-lg max-h-96  overflow-y-auto ">
                          <table className="w-full text-center  text-sm   max-h-40     mt-36    ">
                            <tr>
                              <th className=" w-1/12 border-2 border-blue-800 ">
                                รูป
                              </th>
                              <th className=" w-1/12 border-2 border-blue-800">
                                รหัสนักเรียน
                              </th>
                              <th className=" w-1/12 border-2 border-blue-800">
                                ชื่อ-นามสกุล
                              </th>
                              <th className=" w-1/12 border-2 border-blue-800">
                                <div className="flex items-center justify-center w-full  p-2">
                                  <label
                                    for="toogleAll"
                                    className="flex items-center cursor-pointer"
                                  >
                                    {/* <!-- toggle --> */}
                                    <div className="relative">
                                      {/* <!-- input --> */}
                                      <input
                                        id="toogleAll"
                                        type="checkbox"
                                        className="sr-only m_all mt-2"
                                        onChange={(e) => all(e)}
                                      />
                                      {/* <!-- line --> */}
                                      <div className="w-10 h-4 bg-gray-400 rounded-full shadow-inner"></div>
                                      {/* <!-- dot --> */}
                                      <div className="dot absolute w-6 h-6 bg-white rounded-full shadow -left-1 -top-1 transition"></div>
                                    </div>
                                  </label>
                                </div>
                              </th>
                            </tr>
                            <tr>
                              <td className=" w-1/12 border-2 border-blue-800 text-center">
                                <img
                                  src="/img-student/student-2.jpg"
                                  alt=""
                                  className=" h-32 w-32  m-auto"
                                ></img>
                              </td>

                              <td className=" w-1/12 border-2 border-blue-800">
                                6011110001
                              </td>
                              <td className=" w-1/12 border-2 border-blue-800">
                                รุจิกร โถสโมสร
                              </td>
                              <td className=" w-1/12 border-2 border-blue-800">
                                {/* <!-- Toggle A --> */}
                                <div className="flex items-center justify-center w-full my-2 ">
                                  <label
                                    for="toogle1"
                                    className="flex items-center cursor-pointer"
                                  >
                                    {/* <!-- toggle --> */}
                                    <div className="relative">
                                      {/* <!-- input --> */}
                                      <input
                                        id="toogle1"
                                        type="checkbox"
                                        className="sr-only c_all mt-2"
                                        onChange={(e) =>
                                          handleChange("index1", e)
                                        }
                                      />
                                      {/* <!-- line --> */}
                                      <div className="w-10 h-4 bg-gray-400 rounded-full shadow-inner"></div>
                                      {/* <!-- dot --> */}
                                      <div className="dot absolute w-6 h-6 bg-white rounded-full shadow -left-1 -top-1 transition"></div>
                                    </div>
                                  </label>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td className=" w-1/12 border-2 border-blue-800 text-center">
                                <img
                                  src="/img-student/student-2.jpg"
                                  alt=""
                                  className=" h-32 w-32  m-auto"
                                ></img>
                              </td>

                              <td className=" w-1/12 border-2 border-blue-800">
                                6011110001
                              </td>
                              <td className=" w-1/12 border-2 border-blue-800">
                                รุจิกร โถสโมสร
                              </td>
                              <td className=" w-1/12 border-2 border-blue-800 text-center">
                                <div className="flex items-center justify-center w-full my-2 ">
                                  <label
                                    for="toogle2"
                                    className="flex items-center cursor-pointer"
                                  >
                                    {/* <!-- toggle --> */}
                                    <div className="relative">
                                      {/* <!-- input --> */}
                                      <input
                                        id="toogle2"
                                        type="checkbox"
                                        className="sr-only c_all mt-2"
                                        onChange={(e) =>
                                          handleChange("index2", e)
                                        }
                                      />
                                      {/* <!-- line --> */}
                                      <div className="w-10 h-4 bg-gray-400 rounded-full shadow-inner"></div>
                                      {/* <!-- dot --> */}
                                      <div className="dot absolute w-6 h-6 bg-white rounded-full shadow -left-1 -top-1 transition"></div>
                                    </div>
                                  </label>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td className=" w-1/12 border-2 border-blue-800 text-center">
                                <img
                                  src="/img-student/student-2.jpg"
                                  alt=""
                                  className=" h-32 w-32  m-auto"
                                ></img>
                              </td>

                              <td className=" w-1/12 border-2 border-blue-800">
                                6011110001
                              </td>
                              <td className=" w-1/12 border-2 border-blue-800">
                                รุจิกร โถสโมสร
                              </td>
                              <td className=" w-1/12 border-2 border-blue-800 text-center">
                                <div className="flex items-center justify-center w-full my-2 ">
                                  <label
                                    for="toogle3"
                                    className="flex items-center cursor-pointer"
                                  >
                                    {/* <!-- toggle --> */}
                                    <div className="relative">
                                      {/* <!-- input --> */}
                                      <input
                                        id="toogle3"
                                        type="checkbox"
                                        className="sr-only c_all mt-2"
                                        onChange={(e) =>
                                          handleChange("index3", e)
                                        }
                                      />
                                      {/* <!-- line --> */}
                                      <div className="w-10 h-4 bg-gray-400 rounded-full shadow-inner"></div>
                                      {/* <!-- dot --> */}
                                      <div className="dot absolute w-6 h-6 bg-white rounded-full shadow -left-1 -top-1 transition"></div>
                                    </div>
                                  </label>
                                </div>
                              </td>
                            </tr>
                            <br />
                          </table>
                        </div>
                      </div>
                    </div>
                    {/*footer*/}
                    <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                      <button
                        className=" shadow hover:shadow-lg text-white bg-red-600 hover:text-red-600   border-2   border-white hover:border-red-600  hover:bg-white rounded-lg background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => setShowModal1(false)}
                      >
                        ยกเลิก
                      </button>
                      <button
                        className=" shadow hover:shadow-lg text-white bg-green-600 hover:text-green-600   border-2   border-white hover:border-green-600  hover:bg-white rounded-lg background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => setShowModal1(false)}
                      >
                        บันทึก
                      </button>
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
        </main>
      </div>
    </div>
  );
}

export default Main_teacher;
