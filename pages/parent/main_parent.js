import React, { useEffect, useState } from "react";
import Clock from 'react-live-clock';
import moment from "moment";
import Sidebar from '../../component/layout/parent/sidebar'
import Nav from '../../component/layout/parent/nav'
import Footer from '../../component/layout/footer'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination"
import "swiper/css/navigation"
import SwiperCore, {
    Autoplay, Pagination, Navigation
} from 'swiper';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { getNews, getstudent_score, getstudent_time, getStudent_One, getall_subjects } from '../../action/parent';
function Main_parent() {
    // const Tests = tests();
    const [newsmap, setnewsmap] = useState()
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
            classroom_checked: ""
        },


    })
    const [Student_Time, setStudent_Time] = useState({
        checkin: "--:--",
        checkin_line: "--:--",
        checkout: "--:--"

    });
    const Dataload = async (student_code) => {
        let date = new Date().getDay()

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


        console.log('date', date);



        let news = await getNews();

        let data_score = await getstudent_score(student_code);

        let student_time = await getstudent_time(student_code);
        let student_one = await getStudent_One(student_code);


        let date_subject = {
            student_code: student_code,
            classroom_code: student_one[0]?.classroom_code,
            date: "1"
        }
        let all_subjects = await getall_subjects(date_subject);


        console.log('student_one', student_one);
        console.log('date_subject', all_subjects);


        setAll_Subjects(all_subjects);


        let check_time = [];
        console.log(student_time.length)
        if (student_time.length == 1) {
            // console.log(' student_time.length == 1', student_time[0].scan_status)
            check_time = {
                checkin: student_time[0].time ? moment(student_time[0].time).utc().format(' HH:mm:ss ') : "--:--",
                checkin_line: student_time[0].time_line ? moment(student_time[0].time_line).utc().format(' HH:mm:ss ') : "--:--",
                checkout: "--:--"
            }

            setStudent_Time(check_time)
        }
        else if (student_time.length == 2) {
            // console.log(' student_time.length == 2', student_time[0].scan_status)
            check_time = {
                checkin: student_time[0].time ? moment(student_time[0].time).utc().format(' HH:mm:ss ') : "--:--",
                checkin_line: student_time[0].time_line ? moment(student_time[0].time_line).utc().format(' HH:mm:ss ') : "--:--",
                checkout: student_time[1].time ? moment(student_time[1].time).utc().format(' HH:mm:ss ') : "--:--"
            }
            setStudent_Time(check_time)
        }

        console.log('check_Time', check_time)

        if (data_score) {
            // console.log('data_score', data_score[0].score)

            setScore(data_score[0]?.score);

        }


        setnewsmap(news)
        console.log('news', news)


        // console.log('student_code', student_code)
        // console.log('values', values)

    }


    SwiperCore.use([Autoplay, Pagination, Navigation]);
    ChartJS.register(ArcElement, Tooltip, Legend);

    const data = {
        labels: ['มา', 'ขาด'],
        datasets: [
            {
                label: '# of Votes',
                data: [95, 5],
                backgroundColor: [

                    '#004AAD',
                    '#FF0000'
                ],
                // borderColor: [
                //     'rgba(255, 99, 132, 1)',
                //     '#004AAD'
                // ],
                borderWidth: 1,

            },
        ],
    };

    const options = {
        maintainAspectRatio: false	// Don't maintain w/h ratio
    }
    const plugins = [{
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
                textY = height / 1.90;
            ctx.fillText(text, textX, textY);
            ctx.save();
        }
    }]

    const [THdate, setTHdate] = useState("")
    useEffect(() => {

        let student_code = localStorage.getItem('parent_student_code');
        Dataload(student_code)
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





    return (
        <div>
            <div className="flex flex-row min-h-screen text-gray-800 bg-gray-100 z-40 absolute">
                <Sidebar></Sidebar>

                <main className="flex flex-col flex-grow w-4/5 -ml-64 transition-all duration-150 ease-in main md:ml-0">
                    <Nav></Nav>
                    <div className="ml-12">
                        <div className="main-content flex flex-col flex-grow p-4">
                            <div className="flex md-4">

                                <h1 className="  w-3/4 text-xl text-center text-color-blue"></h1>
                                <h1 className="  w-1/4 text-xl text-right  text-color-blue">
                                    <p >

                                        {/* {moment(new Date()).format('dddd : DD :MMMM :YYYY').toLocaleDateString("th-TH")}   */}
                                        {THdate}
                                    </p>
                                </h1>
                            </div>
                            <div className="flex flex-col ">


                                <h1 className="   text-xl text-right  text-color-blue">
                                    <Clock format={'HH:mm:ss'} ticking={true} timezone={'Asia/Bangkok'} />
                                </h1>
                            </div>
                            <div className="flex flex-row ">
                                <div className="  ml-4 text-xl text-left text-color-blue w-1/2">ข่าวประชาสัมพันธ์</div>
                                <div className="  ml-4 text-xl text-left text-color-blue w-1/2">คะแนนความประพฤติ</div>
                            </div>
                            <div className="flex flex-row   h-1/2 ">

                                <div className="w-3/6  rounded pt-4">
                                    <Swiper spaceBetween={30} centeredSlides={true} autoplay={{
                                        "delay": 2500,
                                        "disableOnInteraction": false
                                    }} pagination={{
                                        "clickable": true
                                    }} navigation={true} className="myswiper">
                                        {newsmap ? newsmap.map((p, index) => (
                                            <>
                                                <SwiperSlide><img src={p.news_picture} alt="" ></img></SwiperSlide>
                                                {/* <SwiperSlide><img src="/img-informaiton/information.jpg" alt="" ></img></SwiperSlide>
                                    <SwiperSlide><img src="/img-informaiton/information_6.jpg" alt="" className=" w-full  h-full"></img></SwiperSlide>
                                    <SwiperSlide><img src="/img-informaiton/information_7.jpg" alt=""></img></SwiperSlide>
                                    <SwiperSlide><img src="/img-informaiton/information_4.png" alt=""></img></SwiperSlide>
                                    <SwiperSlide><img src="/img-informaiton/information_5.png" alt=""></img></SwiperSlide> */}
                                            </>
                                        )) : ""}
                                    </Swiper>
                                </div>
                                <div className="  mt-4  flex-col   rounded  w-3/6 ml-4 border-2 border-blue-600  flex   max-h-auto items-center content-center text-blue-800 hover:text-white text-9xl justify-center hover:bg-blue-800  bg-white ">

                                    {(Score)}




                                </div>








                            </div>

                            <div className="flex flex-row   h-1/2">
                                <div className="  rounded mt-4 w-1/2 border-2 border-blue-600  ">
                                    <div className="p-4  h-full">


                                        <div className="flex flex-col  h-full">
                                            <div className=" w-1/2 text-left text-xl text-blue-800  mb-2">
                                                ข้อมูลเช็คชื่อ
                                            </div>

                                            <>

                                                <p
                                                    href="#"
                                                    className="flex flex-row items-center h-1/2 p-5  my-1 w-full  rounded-lg hover:text-white bg-white  border-green-500  border-2     text-green-500 hover:bg-green-500 "
                                                >
                                                    <span className=" ml-2 w-1/2">check-in เช้า :</span>
                                                    <span className=" text-center  w-2/3 text-2xl">{Student_Time.checkin} น.</span>
                                                </p>

                                                <p
                                                    href="#"
                                                    className="flex flex-row items-center h-1/2 p-5 my-1 w-full rounded-lg hover:text-white bg-white  border-yellow-500  border-2     text-yellow-500 hover:bg-yellow-500    "
                                                >
                                                    <span className=" ml-2 w-1/2">check-in เข้าแถว  :</span>
                                                    <span className=" text-center  w-2/3 text-2xl">{Student_Time.checkin_line} น.</span>
                                                </p>
                                                <p
                                                    href="#"
                                                    className="flex flex-row items-center h-1/2 p-5 my-1 w-full  rounded-lg hover:text-white bg-white  border-red-500  border-2     text-red-500 hover:bg-red-500 "
                                                >
                                                    <span className=" ml-2 w-1/2">check-out เย็น :</span>
                                                    <span className=" text-center  w-2/3 text-2xl">{Student_Time.checkout} น.</span>
                                                </p>
                                            </>

                                        </div>


                                    </div>
                                </div>
                                <div className="   rounded mt-4 w-1/2 ml-4 border-2 border-blue-600">
                                    <div className="p-4  h-full">

                                        <div className="flex flex-col  h-full">
                                            <div className=" w-1/2 text-left text-xl text-blue-800 mb-2 ">
                                                ข้อมูลการเรียน
                                            </div>
                                            {All_Subjects ? All_Subjects.map((p, index) => (

                                                <>
                                                    <p
                                                        href="#"
                                                        className="flex flex-row items-center h-1/2 p-5 my-1 w-full  rounded-lg hover:text-white bg-white  border-blue-500  border-2     text-blue-500 hover:bg-blue-500"
                                                    >
                                                        <span className=" ml-2 w-1/2">เรียนทั้งหมด  :</span>
                                                        <span className=" text-center  w-2/3 text-2xl">{p.All_Subject}</span>
                                                    </p>
                                                    <p
                                                        href="#"
                                                        className="flex flex-row items-center h-1/2 p-5 my-1 w-full rounded-lg hover:text-white bg-white  border-blue-500  border-2     text-blue-500 hover:bg-blue-500"
                                                    >
                                                        <span className=" ml-2 w-1/2">เช็คชื่อไปแล้ว :</span>
                                                        <span className=" text-center  w-2/3 text-2xl">{p.Subject_Done}</span>
                                                    </p>
                                                    {/* <p
                                                    href="#"
                                                    className="flex flex-row items-center h-1/3 p-5 my-1 w-full rounded-lg hover:text-white bg-white  border-blue-500  border-2     text-blue-500 hover:bg-blue-500"
                                                >
                                                    <span className=" ml-2 w-1/2">มีการบ้าน :</span>
                                                    <span className=" text-center  w-2/3 text-2xl">2</span>
                                                </p> */}
                                                </>

                                            )) : ""}

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
    )
}

export default Main_parent
