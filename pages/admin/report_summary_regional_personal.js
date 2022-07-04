import React, { useEffect, useState } from "react";
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
} from "../../action/teacher";
import {
  getClassroom,
  checkname_code_classroom,
  postcreate_classroom,
  putupdate_classroom,
  delete_classroom,
} from "../../action/admin";
import { isAuth } from "../../action/auth";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

function report_summary_regional_personal() {
  const Auth = isAuth();
  const [values, setValues] = useState([
    [{
      firstname: "",
      lastname: "",
      absent: "",
      leavework: "",
      sickleave: "",
      personalleave: "",
      militaryserviceleave: "",
      other: "",
      late: "",
      latetime: "",
      checkoutunrec: "",
      description: "",
      startdatetime: moment(new Date()).format("YYYY-MM-DD"),
      enddatetime: moment(new Date()).format("YYYY-MM-DD")
    }],
  ]);


  const [EndDate, setEndDate] = useState(new Date());
  const options = {
    maintainAspectRatio: false, // Don't maintain w/h ratio
  };

  SwiperCore.use([Autoplay, Pagination, Navigation]);
  ChartJS.register(ArcElement, Tooltip, Legend);

  const Dataload = async () => {
    setValues({
      valueisreal: [
        {
          firstname: "ทดลอง1",
          lastname: "เทส1",
          absent: "1",
          leavework: "2",
          sickleave: "3",
          personalleave: "4",
          militaryserviceleave: "5",
          other: "0",
          late: "6",
          latetime: "7",
          checkoutunrec: "8",
          description: "9",
          startdatetime: moment(new Date()).format("YYYY-MM-DD"),
          enddatetime: moment(new Date()).format("YYYY-MM-DD")
        }
      ]
    });
    console.log(valueisreal)
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
    console.log(name)
    console.log(e)

    let data = ""
    if (name == "startdatetime" || name == "enddatetime") {
      values[name] = e
    }
    else {
      values[name] = e.target.value
      console.log(e.target.value)
    }

    setValues({ ...values })
    console.log(values)
    console.log(values.map)


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
                รายงานสรุปการขาด ลา มาสาย บุคลากร
              </div>
            </div>

            <div className="p-2 text-center w-5/6 mx-auto">
              <div className="flex flex-col mb-4">
                <div className="flex flex-row">
                  <label
                    className="p-2 font-bold text-lg text-gray-900  w-1/4"
                    htmlFor=""
                  >
                    ตั้งแต่วันที่
                  </label>
                  <div className="ml-2 w-1/2">
                    <DatePicker
                      dateFormat="dd-MM-yyyy"
                      className=" py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-full "

                      value={moment(values.startdatetime).format("YYYY-MM-DD")}
                      onChange={(e) => handleChange('startdatetime', e)}
                    />
                  </div>
                  <label
                    className="p-2 font-bold text-lg text-gray-900  w-1/4"
                    htmlFor=""
                  >
                    ถึงวันที่
                  </label>
                  <div className="ml-2 w-1/2">
                    <DatePicker
                      dateFormat="dd-MM-yyyy"
                      className=" py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-full "

                      value={moment(values.enddatetime).format("YYYY-MM-DD")}
                      onChange={(e) => handleChange('enddatetime', e)}

                    />
                  </div>
                </div>
              </div>



              <button
                className="mt-1 w-auto shadow hover:shadow-lg text-white bg-green-500 hover:text-green-500   border-2   border-green-500  hover:border-green-500  hover:bg-white rounded-lg background-transparent  uppercase px-6 py-1 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
              // onClick={() => AddClick()}
              >
                <div className="flex flex-row items-center justify-center content-center    ">
                  <div className=" mt-1 text-center">ค้นหา</div>
                </div>
              </button>
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
                      ชื่อ-นามสกุล
                    </th>
                    <th className="py-2 text-gray-500 w-32 text-center">
                      ไม่เข้างาน(วัน)
                    </th>
                    <th className="py-2 text-gray-500 w-32 text-center">
                      ลา(ครั้ง)
                    </th>
                    <th className="py-2 text-gray-500 w-24 text-center">
                      ลากิจ
                    </th>
                    <th className="py-2 text-gray-500 w-24 text-center">
                      ลาป่วย
                    </th>
                    <th className="py-2 text-gray-500 w-32 text-center ">
                      ไปราชการ
                    </th>
                    <th className="py-2 text-gray-500 w-16 text-center ">
                      อื่นๆ
                    </th>
                    <th className="py-2 text-gray-500 w-32 text-center">
                      มาสาย(ครั้ง)
                    </th>
                    <th className="py-2 text-gray-500 w-32 text-center">
                      มาสาย(นาที)
                    </th>
                    <th className="py-2 text-gray-500 w-48 text-center ">
                      ไม่บันทึกเวลาออก(ครั้ง)
                    </th>
                    <th className="py-2 text-gray-500 w-32 text-center ">
                      หมายเหตุ
                    </th>
                    <th className="py-2 text-gray-500 w-32 text-center ">

                    </th>
                  </tr>
                  {values.valueisreal
                    ? values.valueisreal.map((p, index) => (
                      <tr key={index + 1} className="border border-gray-300">
                        <td className="py-2  text-center ">{index + 1}</td>
                        <td className="py-2  text-center ">
                          {p.firstname + " "}
                          {p.lastname ? p.lastname : ""}
                        </td>
                        <td className="py-2  text-center ">{p.absent}</td>
                        <td className="py-2  text-center ">{p.leavework}</td>
                        <td className="py-2  text-center ">{p.sickleave}</td>
                        <td className="py-2  text-center ">
                          {p.personalleave}
                        </td>
                        <td className="py-2  text-center ">
                          {p.militaryserviceleave}
                        </td>
                        <td className="py-2  text-center ">{p.other}</td>
                        <td className="py-2  text-center ">{p.late}</td>
                        <td className="py-2  text-center ">{p.latetime}</td>
                        <td className="py-2  text-center ">
                          {p.checkoutunrec}
                        </td>
                        <td className="py-2  text-center ">
                          {p.description}
                        </td>
                        <td className="py-2  text-center ">
                          {p.checkoutunrec}
                        </td>
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

export default report_summary_regional_personal;
