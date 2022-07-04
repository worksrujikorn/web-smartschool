import React, { useEffect, useState } from "react";
import Image from "next/image";
import Clock from "react-live-clock";
import moment from "moment";
import Sidebar from "../../component/layout/teacher/sidebar";
import Nav from "../../component/layout/teacher/nav";
import Footer from "../../component/layout/footer";
import { Swiper, SwiperSlide } from "swiper/react";
import Swal from "sweetalert2";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import {
  checkinlist,
  checkin_list_update_out,
  checkin_list_update_in,
  postfacescan,
  facescan_by_admin,
} from "../../action/teacher";

function Information() {
  const [Send, setSend] = useState(false);
  const [Unsend, setUnsend] = useState(true);
  const [ClassRoom, setClassRoom] = useState();
  const [Open, setOpen] = useState(false);
  const [FSvalue, setFSvalue] = useState({
    datetime: "",
    personId: "",
    description: "",
  });
  const [Enablemorning, setEnablemorning] = useState(true);
  const [Enablelate, setEnablelate] = useState(true);
  const [addfacescan, setaddfacescan] = useState(false);
  const [Enableevening, setEnableevening] = useState(true);
  const [checkin, setcheckin] = useState({
    checkin_facescan_id: "",
    time: "",
    who: "",
    description: "",
  });
  const [checkout, setcheckout] = useState({
    checkin_facescan_id: "",
    time: "",
  });
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
    if (localStorage.getItem("LoginRoomId") !== "") {
      setClassRoom(localStorage.getItem("LoginRoomId"));
      let data = await checkinlist(localStorage.getItem("LoginRoomId"));
      setstudentmap(data);
      console.log(data);
    } else {
      setstudentmap([]);
    }

    // let firstdata = []
    // let secdata = []
    // for (let index = 0; index < data.length; index++) {
    //     if (data[index].check_type == "IN") {
    //         let sum = {
    //             ...data[index],
    //             chkdateout: "",
    //             timeout: "",
    //             check_type: data[index].check_type
    //         }
    //         firstdata.push(sum)
    //     }
    // }
    // console.log("firstdata", firstdata)

    // for (let index = 0; index < data.length; index++) {
    //     for (let index1 = 0; index1 < firstdata.length; index1++) {
    //         if (data[index].check_type == "OUT" && data[index].student_code == firstdata[index1].student_code) {
    //             let sum = {
    //                 ...firstdata[index1],
    //                 chkdateout: data[index].chkdate,
    //                 timeout: data[index].time,
    //                 check_type: data[index].check_type
    //             }
    //             secdata.push(sum)
    //         }
    //     }
    // }

    // for (let index = 0; index < firstdata.length; index++) {
    //     for (let index1 = 0; index1 < secdata.length; index1++) {
    //         if (firstdata[index].student_code == secdata[index1].student_code) {
    //             firstdata[index] = secdata[index1]
    //         }
    //     }
    // }
    // console.log('firstdata--->', firstdata)
    // console.log("secdata", secdata)

    timezone();
  }, []);
  const search = (e) => {
    async function getdatapersondate_() {
      let check = [];
      let search = [];
      let event = e.target.value.toUpperCase();
      let data = await checkinlist(ClassRoom);
      check = data;
      if (data) {
        var matches = check.filter(function (x) {
          return (
            x.firstname?.toUpperCase().includes(event) ||
            x.lastname?.toUpperCase().includes(event) ||
            x.student_code?.toUpperCase().includes(event)
          );
        });
        search = matches;
      }
      if (e.target.value != "") {
        setstudentmap(search);
      } else {
        setstudentmap(check);
      }
    }
    getdatapersondate_();
  };
  const clickstudent = (i) => {
    console.log(studentmap[i]);
    if (studentmap[i].checkin_facescan_id) {
      setcheckin({
        checkin_facescan_id: studentmap[i].checkin_facescan_id,
        time: moment(studentmap[i].timein).format("HH:mm"),
        who: localStorage.getItem("LoginUsername"),
        description: "",
      });
      setcheckout({
        checkin_facescan_id: studentmap[i].checkin_facescan_id,
        time: moment(studentmap[i].timeout).format("HH:mm"),
      });
      setShowModal(true);
    } else {
      Swal.fire({
        title:
          studentmap[i].firstname +
          " " +
          studentmap[i].lastname +
          "ยังไม่ได้สแกนหน้าที่เครื่อง FaceScan",
        text: "ต้องการที่จะเช็คเวลาหรือไม่",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#55D055",
        cancelButtonColor: "#d33",
        confirmButtonText: "ยืนยัน",
        cancelButtonText: "ยกเลิก",
      }).then((result) => {
        if (result.isConfirmed) {
          setaddfacescan(true);
          setFSvalue({ ...FSvalue, personId: studentmap[i].student_code });
        }
      });
    }
  };
  const FSSaveClick = async () => {
    let val = [
      {
        datetime:
          moment(new Date()).format("YYYY-MM-DD") +
          " " +
          FSvalue.datetime +
          ":00",
        data: {
          personId: FSvalue.personId,
          who: localStorage.getItem("LoginUsername"),
          description: FSvalue.description,
        },
      },
    ];
    console.log(val);
    let data1 = await facescan_by_admin(val);
    setFSvalue({
      datetime: "",
      personId: "",
      description: "",
    });
    let data = await checkinlist(ClassRoom);
    setstudentmap(data);
    console.log(data);
    setaddfacescan(false);
    console.log(data);
  };
  const SaveClick = async () => {
    console.log(checkin);
    console.log(checkout);
    let dataa;
    let dataa1;
    if (checkin.time != "Invalid date") {
      dataa = await checkin_list_update_in(checkin);
    }
    if (checkout.time != "Invalid date") {
      dataa1 = await checkin_list_update_out(checkout);
    }
    console.log(dataa);
    console.log(dataa1);
    let data = await checkinlist(ClassRoom);
    setstudentmap(data);
    console.log(data);
    setShowModal(false);
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
  const [showModal, setShowModal] = useState(false);
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

              <h1 className="   lg:text-xl text-lg text-center text-color-blue">
                จัดการเวลา
              </h1>
              <div className="flex flex-col flex-grow  rounded-lg mt-4  border-blue-800  border h-4/6">
                <div className="flex flex-row  ">
                  <div className="relative p-6 flex-auto  ">
                    <div className=" flex flex-col w-full h-full  ">
                      <div className="flex flex-row w-full">
                        <div className="flex flex-wrap items-stretch  lg:w-1/4 w-3/4  mb-4 relative ">
                          <div className="flex -mr-px">
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
                            <input
                              type="text"
                              placeholder="ค้นหา"
                              onChange={(e) => search(e)}
                              className="outline-none flex-shrink flex-grow flex-auto leading-normal h-10  rounded rounded-l-none px-3 relative focus:border-blue focus:shadow w-full"
                            />
                          </div>
                        </div>
                        <div className="flex flex-wrap items-stretch  lg:w-3/4 w-1/4 mb-4 relative  justify-end">
                          {/* <button
                                                    className="mt-1 w-auto shadow hover:shadow-lg text-white bg-green-500 hover:text-green-500   border-2   border-green-500  hover:border-green-500  hover:bg-white rounded-lg background-transparent  uppercase px-6 py-1 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                    type="button"
                                                >
                                                    <div className="flex flex-row items-center justify-center content-center    ">
                                                        <svg
                                                            fill="none"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            viewBox="0 0 24 24"
                                                            stroke="currentColor"
                                                            className="h-6 w-6"
                                                        >
                                                            <path
                                                                d="M12 6v6m0 0v6m0-6h6m-6 0H6" />

                                                        </svg>

                                                        <div className="ml-3 mt-1">เพิ่ม</div>

                                                    </div>
                                                </button> */}
                        </div>
                      </div>
                      <div className="flex flex-row    w-full  items-center justify-center overflow-y-auto  lg:pt-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4 mt-10 print:hidden ">
                          {studentmap.length > 0
                            ? studentmap.map((p, index) => (
                                <div key={index + 1}>
                                  <div
                                    className="flex flex-col text-black items-center justify-center bg-gradient-to-tr border-2 border-yellow-900 p-4 shadow rounded-lg"
                                    onClick={() => clickstudent(index)}
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
                                    </button>
                                    <h2 className="mt-4 font-bold text-xl">
                                      {p.firstname + " " + p.lastname}
                                    </h2>
                                    <h2 className="mt-4 font-bold text-xl">
                                      เข้า{" "}
                                      {moment(p.timein).format("HH:mm") ==
                                      "Invalid date"
                                        ? "--: --"
                                        : moment(p.timein).format("HH:mm")}{" "}
                                      น.
                                    </h2>
                                    <h2 className="mt-4 font-bold text-xl">
                                      ออก{" "}
                                      {moment(p.timeout).format("HH:mm") ==
                                      "Invalid date"
                                        ? "--: --"
                                        : moment(p.timeout).format(
                                            "HH:mm"
                                          )}{" "}
                                      น.
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
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Modal */}
            {showModal ? (
              <>
                <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                  <div className="relative w-full   mt-28 mb-6 mx-auto max-w-xl  max-h-auto ">
                    {/*content*/}
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                      {/*header*/}
                      <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t text-color-blue">
                        <h3 className="text-2xl font-semibold text-center w-full ml-5">
                          แก้ไขเวลาของนักเรียน
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
                      <>
                        <div className="flex flex-col text-center ">
                          <div className=" flex flex-wrap items-stretch  w-full  relative   text-center  ">
                            <div className="flex flex-row w-full mx-10 my-4  text-center">
                              <span className=" w-1/4  flex items-center leading-normal  rounded rounded-r-none   bg-blue-800 px-3 whitespace-no-wrap text-grey-dark text-sm   text-white">
                                check-in เช้า :
                              </span>
                              <input
                                type="time"
                                value={checkin.time}
                                onChange={(e) =>
                                  setcheckin({
                                    ...checkin,
                                    time: e.target.value,
                                  })
                                }
                                className="outline-none flex-shrink flex-grow flex-auto leading-normal w-1/4  border h-10 border-grey-light rounded rounded-l-none px-3 relative focus:border-blue focus:shadow"
                              />
                            </div>
                          </div>

                          <div className=" flex flex-wrap items-stretch  w-full  relative   text-center  ">
                            <div className="flex flex-row w-full mx-10 my-4  text-center">
                              <span className=" w-1/4  flex items-center leading-normal  rounded rounded-r-none   bg-blue-800 px-3 whitespace-no-wrap text-grey-dark text-sm   text-white">
                                check-in เย็น :
                              </span>
                              <input
                                type="time"
                                value={checkout.time}
                                onChange={(e) =>
                                  setcheckout({
                                    ...checkout,
                                    time: e.target.value,
                                  })
                                }
                                className="   outline-none flex-shrink flex-grow flex-auto leading-normal w-1/4  border h-10 border-grey-light rounded rounded-l-none px-3 relative focus:border-blue focus:shadow"
                              />
                            </div>
                          </div>
                          <div className=" flex flex-wrap items-stretch  w-full  relative   text-center  ">
                            <div className="flex flex-row w-full mx-10 my-4  text-center">
                              <span className=" w-1/4  flex items-center leading-normal  rounded rounded-r-none   bg-blue-800 px-3 whitespace-no-wrap text-grey-dark text-sm   text-white">
                                หมายเหตุ:
                              </span>
                              <input
                                type="text"
                                value={checkin.description}
                                onChange={(e) =>
                                  setcheckin({
                                    ...checkin,
                                    description: e.target.value,
                                  })
                                }
                                className="outline-none flex-shrink flex-grow flex-auto leading-normal w-1/4  border h-10 border-grey-light rounded rounded-l-none px-3 relative focus:border-blue focus:shadow"
                              />
                            </div>
                          </div>
                        </div>
                      </>

                      {/*footer*/}
                      <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                        <button
                          className=" shadow hover:shadow-lg text-white bg-red-600 hover:text-red-600   border-2   border-red-600 hover:border-red-600  hover:bg-white rounded-lg background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                          type="button"
                          onClick={() => setShowModal(false)}
                        >
                          กลับ
                        </button>
                        <button
                          className=" shadow hover:shadow-lg text-white bg-green-600 hover:text-green-600   border-2   border-green-600  hover:border-green-600  hover:bg-white rounded-lg background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                          type="button"
                          onClick={() => SaveClick()}
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
            {addfacescan ? (
              <>
                <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                  <div className="relative w-full   mt-28 mb-6 mx-auto max-w-xl  max-h-auto ">
                    {/*content*/}
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                      {/*header*/}
                      <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t text-color-blue">
                        <h3 className="text-2xl font-semibold text-center w-full ml-5">
                          เพิ่มเวลาของนักเรียน
                        </h3>
                        <button
                          className="p-1 ml-auto bg-transparent border-0 text-black  float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                          onClick={() => setaddfacescan(false)}
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
                      <>
                        <div className="flex flex-col text-center ">
                          <div className=" flex flex-wrap items-stretch  w-full  relative   text-center  ">
                            <div className="flex flex-row w-full mx-10 my-4  text-center">
                              <span className=" w-1/4  flex items-center leading-normal  rounded rounded-r-none   bg-blue-800 px-3 whitespace-no-wrap text-grey-dark text-sm   text-white">
                                เช็คชื่อFaceScan:
                              </span>
                              <input
                                type="time"
                                value={FSvalue.datetime}
                                onChange={(e) =>
                                  setFSvalue({
                                    ...FSvalue,
                                    datetime: e.target.value,
                                  })
                                }
                                className="outline-none flex-shrink flex-grow flex-auto leading-normal w-1/4  border h-10 border-grey-light rounded rounded-l-none px-3 relative focus:border-blue focus:shadow"
                              />
                            </div>
                          </div>
                          <div className=" flex flex-wrap items-stretch  w-full  relative   text-center  ">
                            <div className="flex flex-row w-full mx-10 my-4  text-center">
                              <span className=" w-1/4  flex items-center leading-normal  rounded rounded-r-none   bg-blue-800 px-3 whitespace-no-wrap text-grey-dark text-sm   text-white">
                                หมายเหตุ:
                              </span>
                              <input
                                type="text"
                                value={FSvalue.description}
                                onChange={(e) => {
                                  setFSvalue({
                                    ...FSvalue,
                                    description: e.target.value,
                                  });
                                  console.log(e.target.value);
                                }}
                                className="outline-none flex-shrink flex-grow flex-auto leading-normal w-1/4  border h-10 border-grey-light rounded rounded-l-none px-3 relative focus:border-blue focus:shadow"
                              />
                            </div>
                          </div>
                        </div>
                      </>
                      {/*footer*/}
                      <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                        <button
                          className=" shadow hover:shadow-lg text-white bg-red-600 hover:text-red-600   border-2   border-red-600 hover:border-red-600  hover:bg-white rounded-lg background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                          type="button"
                          onClick={() => setaddfacescan(false)}
                        >
                          กลับ
                        </button>
                        <button
                          className=" shadow hover:shadow-lg text-white bg-green-600 hover:text-green-600   border-2   border-green-600  hover:border-green-600  hover:bg-white rounded-lg background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                          type="button"
                          onClick={() => FSSaveClick()}
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
          </div>
        </main>
      </div>
    </div>
  );
}

export default Information;
