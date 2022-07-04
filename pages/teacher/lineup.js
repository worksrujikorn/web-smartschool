import React, { useEffect, useState } from "react";
import Image from "next/image";
import Clock from "react-live-clock";
import moment from "moment";
import Sidebar from "../../component/layout/teacher/sidebar";
import Nav from "../../component/layout/teacher/nav";
import Footer from "../../component/layout/footer";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { getcheckin_line_View, putcheckin_line } from "../../action/teacher";
import Swal from "sweetalert2";
function Information() {
  const [Send, setSend] = useState(false);
  const [Unsend, setUnsend] = useState(true);
  const [ClassRoom, setClassRoom] = useState({
    classroom_code: "",
    teacher_code: "",
  });
  const [ShowModal_Alltime, setShowModal_Alltime] = useState(false);
  const [ToggleCheck, setToggleCheck] = useState(false);
  const [statuscb, setstatuscb] = useState(false);
  const [studentmap, setstudentmap] = useState([
    {
      check_type: "",
      classroom_name: "",
      firstname: "",
      firstname_en: "",
      lastname: "",
      lastname_en: "",
      picture: null,
      scan_status: "",
      student_code: "",
      time: "",
      title: ".",
    },
  ]);

  const [THdate, setTHdate] = useState("");
  useEffect(async () => {
    setClassRoom({
      classroom_code: localStorage.getItem("LoginRoomId"),
      teacher_code: localStorage.getItem("LoginId"),
    });

    let classteacher = {
      classroom_code: localStorage.getItem("LoginRoomId"),
      teacher_code: localStorage.getItem("LoginId"),
    };

    console.log(ClassRoom);
    let data = await getcheckin_line_View(classteacher);

    console.log(data);

    for (let index = 0; index < data.length; index++) {
      if (data[index].scan_status == "F" || data[index].scan_status == "Y") {
        data[index].scan_status = "Y";
      } else {
        data[index].scan_status = "N";
      }
    }

    setstudentmap(data);
    console.log(data);

    timezone();
  }, []);

  const clickstudent = (i, code) => {
    let data = [];
    for (let index = 0; index < studentmap.length; index++) {
      if (studentmap[index].student_code == code) {
        if (studentmap[index].scan_status == "Y") {
          studentmap[index].scan_status = "N";
        } else {
          studentmap[index].scan_status = "Y";
        }
      }
    }
    // console.log(studentmap[i]);
    // if (studentmap[i].scan_status == "Y") {
    //   studentmap[i].scan_status = "N";
    // } else {
    //   studentmap[i].scan_status = "Y";
    // }
    let checkall = studentmap.filter((x) => x.scan_status == "Y").length;
    let all = studentmap.length;
    if (checkall == all) {
      setstatuscb(true);
    } else {
      setstatuscb(false);
    }
    console.log(studentmap);

    setstudentmap([...studentmap]);
  };
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

  const all = (e) => {
    // let chk = document.getElementsByClassName('c_all')
    // if (e.target.checked == true) {
    //     for (let index = 0; index < ApiGet.length; index++) {
    //         // chk[index].checked = true
    //         setToggleCheck(true)

    //     }
    //     console.log(e.target.checked);
    // } else {
    //     for (let index = 0; index < chk.length; index++) {
    //         // chk[index].checked = false
    //         setToggleCheck(false)

    //     }
    //     console.log(e.target.checked);
    // }
    if (e.target.checked == true) {
      for (let index = 0; index < studentmap.length; index++) {
        studentmap[index].scan_status = "Y";
      }
      setToggleCheck(true);
      setstatuscb(true);
    } else {
      for (let index = 0; index < studentmap.length; index++) {
        studentmap[index].scan_status = "N";
      }
      setToggleCheck(false);
      setstatuscb(false);
    }
    setstudentmap([...studentmap]);
  };

  function createdataupdatestatus(studentstatus, studentcode) {
    return { studentstatus, studentcode };
  }

  const saveclick = async () => {
    Swal.fire("บันทึกข้อมูลสำเร็จ", "success", "success");
    let datastatus = [];
    for (let index = 0; index < studentmap.length; index++) {
      // let datastatus = {
      //   scan_status: studentmap[index].scan_status,
      //   student_code: studentmap[index].student_code,
      // };
      datastatus.push(
        createdataupdatestatus(
          studentmap[index].scan_status,
          studentmap[index].student_code
        )
      );
      // console.log(studentmap[index].scan_status);
      // console.log(respon);
      // let data1 = await getcheckin_line_View(ClassRoom);
      // setstudentmap(data1);
    }
    let respon = await putcheckin_line(datastatus);
    console.log(respon);
    console.log(datastatus);
  };
  const handleChange = (name, e) => {
    let chk_all = document.getElementsByClassName("m_all");

    for (let index = 0; index < chk_all.length; index++) {
      chk_all[index].checked = false;
    }
    console.log("showfalse", e.target);
    // if (name == 'index1') {
    //      console.log('showfalse', e.target);
    //     if (e.target == false) {

    //         console.log('showfalse', chk_all.length);
    //     }
    // }
  };

  const unsend = () => {
    setUnsend(true);
    setSend(false);
    console.log("ยังไม่ส่ง");
  };
  const send = () => {
    setUnsend(false);
    setSend(true);
    console.log("ส่ง");
  };

  const [showModal, setShowModal] = useState(false);

  // const testclick = async () => {
  // let praram = "";
  // let data = {
  //     praram : ""
  // };
  // let response = await getPatient(data);

  // console.log('response',response);

  // let response = await testcom();
  // console.log('Api',response.data.Hello)

  // 1
  // setStamp({
  //     ...Stamp,
  //     Hello : response.data.Hello,
  //     Kuy : response.data.Kuy
  // });

  //2
  // Stamp.Hello = response.data.Hello;
  // setStamp({
  //     ...Stamp
  // })

  //3
  // let data_json = {
  //     Hello : response.data.Hello,
  //     Kuy : response.data.Kuy
  // }
  // setStamp(data_json);

  //4
  // let name = 'Hello';
  // Stamp[name] = response.data.Hello;
  // Stamp.Hello = response.data.Hello;
  // console.log('Stamp',Stamp);
  // }

  return (
    <div>
      <div className="flex flex-row min-h-screen bg-gray-100 text-gray-800 z-40 absolute  w-full ">
        <Sidebar></Sidebar>
        <main className="flex flex-col flex-grow w-full transition-all duration-150 ease-in md:w-4/5 main md:ml-0">
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

              <h1 className="   text-xl text-center text-color-blue">
                เช็คชื่อเข้าแถว
              </h1>
              <div className="flex flex-col flex-grow  rounded-lg mt-4  border-blue-800  border h-4/6">
                <div className="flex flex-row  ">
                  <div className="relative p-6 flex-auto  ">
                    <div className=" flex flex-col w-full h-full  ">
                      <div className="flex felx-row">
                        <div className="lg:flex flex-wrap items-stretch  w-1/4 mb-4 relative hidden  ">
                          {/* <div className="flex -mr-px">
                          <span className=" flex items-center leading-normal  rounded rounded-r-none  border border-blue-800  bg-blue-800 px-3 whitespace-no-wrap text-grey-dark text-xl   text-white">
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
                                strokeWidth="3"
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                              />
                            </svg>
                          </span>
                        </div>
                        <input
                          type="text"
                          className="  outline-none flex-shrink flex-grow flex-auto leading-normal w-px   h-10  rounded rounded-l-none px-3 relative focus:border-blue focus:shadow"
                        /> */}
                        </div>
                        <div className="w-1/4"></div>
                        <div className="flex items-center  justify-end w-3/4  p-2 ">
                          <div className="mr-4 text-blue-800">เลือกทั้งหมด</div>
                          <label
                            for="toogleAll"
                            className="flex items-center cursor-pointer"
                          >
                            {/* <!-- toggle --> */}
                            <div className="relative">
                              {/* <!-- input --> */}
                              <input
                                id="toogleAll"
                                checked={statuscb}
                                type="checkbox"
                                className="sr-only m_all mt-2"
                                onChange={(e) => all(e)}
                              />

                              <div className="w-10 h-4 bg-gray-400 rounded-full shadow-inner"></div>
                              {/* <!-- dot --> */}
                              <div className="dot absolute w-6 h-6 bg-white rounded-full shadow -left-1 -top-1 transition"></div>
                            </div>
                          </label>
                        </div>
                      </div>

                      <div className="flex flex-row    w-full  items-center justify-center overflow-y-auto pt-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4 mt-10 print:hidden ">
                          {studentmap.length > 0
                            ? studentmap.map((p, index) => (
                              <div key={index + 1}>
                                <div
                                  className="flex flex-col text-black items-center justify-center bg-gradient-to-tr border-2 border-yellow-900 p-4 shadow rounded-lg"
                                  onClick={() =>
                                    clickstudent(index, p.student_code)
                                  }
                                >
                                  <button
                                    type="button"
                                    id="toogle1"
                                    className="icon-button bg-transparen"
                                  >
                                    <span>
                                      {p.picture ? (
                                        <img
                                          src={p.picture}
                                          className="object-scale-down w-48 h-48 rounded "
                                          layout="responsive"
                                        ></img>
                                      ) : (
                                        <img
                                          src="/icon/blank-profile.png"
                                          className="object-scale-down w-48 h-48 rounded "
                                          layout="responsive"
                                        ></img>
                                      )}
                                    </span>
                                    {p.scan_status == "Y" ? (
                                      <span className="icon-button__check">
                                        <span class="material-icons md-18">
                                          done
                                        </span>
                                      </span>
                                    ) : (
                                      <span className="icon-button__uncheck">
                                        <span class="material-icons md-18">
                                          clear
                                        </span>
                                      </span>
                                    )}
                                  </button>
                                  <h2 className="mt-4 font-bold text-xl">
                                    {p.firstname + " " + p.lastname}
                                  </h2>
                                  <h2 className="mt-4 font-bold text-xl">
                                    {p.student_code}
                                  </h2>
                                </div>
                              </div>
                            ))
                            : ""}
                        </div>
                      </div>
                      <div className="w-full  text-right ">
                        <button
                          className=" mt-2 w-22 shadow hover:shadow-lg text-white bg-blue-600 hover:text-blue-600   border-2   border-blue-600  hover:border-blue-600  hover:bg-white rounded-lg background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 "
                          type="button"
                          onClick={() => saveclick()}
                        >
                          บันทึก
                        </button>
                      </div>
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

export default Information;
