import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
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
import {
  getNews,
  getstudent_score,
  getstudent_time,
  getStudent_One,
  getall_subjects,
} from "../../action/student";
// import {tests} from '../../action/auth';

function Main_student() {
  const router = useRouter();
  // const Tests = tests();
  const [newsmap, setnewsmap] = useState();
  const [Score, setScore] = useState("");
  const [All_Subjects, setAll_Subjects] = useState("");
  const [values, setValues] = useState({
    score: 0,
    news: [],
    checkin: {
      checkin: "",
      checkin_line: "",
      checkout: "",
    },
    checkin_classroom: {
      classroom_all: "",
      classroom_checked: "",
    },
  });
  const [Student_Time, setStudent_Time] = useState({
    scan_status: "",
    student_code: "",
    timein: "",
    timeline: "",
    timeout: "",
  });
  const Dataload = async (student_code) => {
    let date = new Date().getDay();

    // if (moment(new Date()).format('dddd') == "Monday" || moment(new Date()).format('dddd') == "วันจันทร์") {
    //     date = "1"
    // }
    // else if (moment(new Date()).format('dddd') == "Tuesday" || moment(new Date()).format('dddd') == "วันอังคาร") {
    //     date = "2"
    // }
    // else if (moment(new Date()).format('dddd') == "Wednesday" || moment(new Date()).format('dddd') == "วันพุธ") {
    //     date = "3"
    // }
    // else if (moment(new Date()).format('dddd') == "Thursday" || moment(new Date()).format('dddd') == "วันพฤหัสบดี" || moment(new Date()).format('dddd') == "วันพฤหัส") {
    //     date = "4"
    // }
    // else if (moment(new Date()).format('dddd') == "Friday" || moment(new Date()).format('dddd') == "วันศุกร์") {
    //     date = "5"
    // }

    console.log("date", date);

    let news = await getNews();
    console.log(news);
    let data_score = await getstudent_score(student_code);
    console.log(data_score);
    let student_time = await getstudent_time(student_code);
    console.log(student_time);
    let student_one = await getStudent_One(student_code);
    console.log(student_one);

    let date_subject = {
      student_code: student_code,
      classroom_code: student_one[0]?.classroom_code,
      date: "1",
    };
    let all_subjects = await getall_subjects(date_subject);
    console.log(student_time);
    console.log(student_time[0]);
    setAll_Subjects(all_subjects);
    if (student_time.length > 0) {
      setStudent_Time(student_time[0]);
    } else {
    }

    if (data_score) {
      // console.log('data_score', data_score[0]?.score)

      setScore(data_score[0]?.score);
    }

    setnewsmap(news);
    console.log("news", news);

    // console.log('student_code', student_code)
    // console.log('values', values)
  };

  const options = {
    maintainAspectRatio: false, // Don't maintain w/h ratio
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
  const opennews = async (id) => {
    router.push("/student/information");
  };
  const [THdate, setTHdate] = useState("");
  useEffect(() => {
    let student_code = localStorage.getItem("LoginId");
    Dataload(student_code);

    // console.log(Tests, 'tests');
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

  return (
    <div>
      <div className="flex flex-row min-h-screen text-gray-800 bg-gray-100 z-40 absolute">
        <Sidebar></Sidebar>

        <main className="flex flex-col flex-grow w-full transition-all duration-150 ease-in md:w-4/5 main md:ml-0 overflow-x-auto">
          <Nav></Nav>
          <div className="ml-12">
            <div className="flex flex-col flex-grow p-4 main-content">
              <div className="flex md-4">
                <h1 className="  lg:w-3/4 w-1/4  lg:text-xl text-base text-center text-color-blue"></h1>
                <h1 className="  lg:w-1/4 w-3/4 lg:text-xl text-base text-right  text-color-blue">
                  <p>
                    {/* {moment(new Date()).format('dddd : DD :MMMM :YYYY').toLocaleDateString("th-TH")}   */}
                    {THdate}
                  </p>
                </h1>
              </div>
              <div className="flex flex-col ">
                <h1 className=" lg:text-xl m:text-sm text-base text-right  text-color-blue">
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
                  คะแนนความประพฤติ
                </div>
              </div>
              <div className="flex lg:flex-row flex-col  ">
                <div className="lg:w-1/2 sm:w-full rounded pt-4">
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
                                    <SwiperSlide><img src="/img-informaiton/information_6.jpg" alt="" className="w-full h-full "></img></SwiperSlide>
                                    <SwiperSlide><img src="/img-informaiton/information_7.jpg" alt=""></img></SwiperSlide>
                                    <SwiperSlide><img src="/img-informaiton/information_4.png" alt=""></img></SwiperSlide>
                                    <SwiperSlide><img src="/img-informaiton/information_5.png" alt=""></img></SwiperSlide> */}
                        </>
                      ))
                      : ""}
                  </Swiper>
                </div>

                <div className="flex flex-col items-center content-center justify-center lg:w-1/2 sm:w-full mt-4 sm:mb-4 md:mb-0 lg:mb-0  lg:ml-4 text-blue-800 bg-white border-2 border-blue-600 rounded  max-h-auto hover:text-white text-6xl md:text-5xl lg:text-9xl hover:bg-blue-800">
                  {Score}
                </div>
              </div>

              <div className="flex flex-row h-1/2">
                <div className="w-1/2 mt-4 border-2 border-blue-600 rounded ">
                  <div className="h-full p-2 lg:p-4">
                    <div className="flex flex-col h-full">
                      <div className="lg:w-1/2 w-full mb-2   text-base  lg:text-xl text-left text-blue-800 ">
                        ข้อมูลเช็คชื่อ
                      </div>

                      <>
                        <p
                          href="#"
                          className="flex flex-row items-center w-full px-1 lg:p-5 my-1 text-green-500 bg-white border-2 border-green-500 rounded-lg h-1/2 hover:text-white hover:bg-green-500 "
                        >
                          <span className="w-1/2 ml-2 text-sm  ">check-in เช้า :</span>
                          <span className="w-2/3  lg:text-2xl  text-sm text-center ">
                            {Student_Time.timein
                              ? Student_Time.timein
                              : "--: --"}{" "}
                            น.
                          </span>
                        </p>

                        <p
                          href="#"
                          className="flex flex-row items-center w-full px-1 lg:p-5 my-1 text-yellow-500 bg-white border-2 border-yellow-500 rounded-lg h-1/2 hover:text-white hover:bg-yellow-500 "
                        >
                          <span className="w-1/2 ml-2 text-sm ">
                            check-in เข้าแถว :
                          </span>
                          <span className="w-2/3 lg:text-2xl text-sm text-center ">
                            {Student_Time.timeline
                              ? Student_Time.timeline
                              : "--: --"}{" "}
                            น.
                          </span>
                        </p>
                        <p
                          href="#"
                          className="flex flex-row items-center w-full px-1 lg:p-5 my-1 text-red-500 bg-white border-2 border-red-500 rounded-lg h-1/2 hover:text-white hover:bg-red-500 "
                        >
                          <span className="w-1/2 ml-2  text-sm">check-out เย็น :</span>
                          <span className="w-2/3 lg:text-2xl text-sm text-center ">
                            {Student_Time.timeout
                              ? Student_Time.timeout
                              : "--: --"}{" "}
                            น.
                          </span>
                        </p>
                      </>
                    </div>
                  </div>
                </div>
                <div className="w-1/2 mt-4 ml-4 border-2 border-blue-600 rounded ">
                  <div className="h-full p-2 lg:p-4">
                    <div className="flex flex-col h-full">
                      <div className="lg:w-1/2 w-full mb-2 text-base  lg:text-xl text-left text-blue-800 ">
                        ข้อมูลการเรียน
                      </div>
                      {All_Subjects
                        ? All_Subjects.map((p, index) => (
                          <>
                            <p
                              onClick={() =>
                                router.push("/student/timetable")
                              }
                              className="flex flex-row items-center w-full px-1 lg:p-5 my-1 text-blue-500 bg-white border-2 border-blue-500 rounded-lg h-1/2 hover:text-white hover:bg-blue-500"
                            >
                              <span className="w-1/2 ml-2 text-sm ">
                                เรียนทั้งหมด :
                              </span>
                              <span className="w-2/4 lg:text-2xl text-center ">
                                {p.All_Subject}
                              </span>
                            </p>
                            <p
                              onClick={() =>
                                router.push("/student/timetable")
                              }
                              className="flex flex-row items-center w-full px-1 lg:p-5 my-1 text-blue-500 bg-white border-2 border-blue-500 rounded-lg h-1/2 hover:text-white hover:bg-blue-500"
                            >
                              <span className="w-1/2 ml-2  text-sm">
                                เช็คชื่อไปแล้ว :
                              </span>
                              <span className="w-2/4 lg:text-2xl text-center ">
                                {p.Subject_Done}
                              </span>
                            </p>
                            {/* <p
                                                    href="#"
                                                    className="flex flex-row items-center w-full p-5 my-1 text-blue-500 bg-white border-2 border-blue-500 rounded-lg h-1/3 hover:text-white hover:bg-blue-500"
                                                >
                                                    <span className="w-1/2 ml-2 ">มีการบ้าน :</span>
                                                    <span className="w-2/3 lg:text-2xl text-center ">2</span>
                                                </p> */}
                          </>
                        ))
                        : ""}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Footer></Footer>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Main_student;
