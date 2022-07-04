import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
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
import { getNews, putNews, postNews, deleteNews } from "../../action/news";
import { post_update_school_color, get_school_color } from "../../action/admin";
import { isAuth } from "../../action/auth";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

function setting() {
  const router = useRouter();
  const [addimage, setaddimage] = useState();
  const [SettingColor, setSettingColor] = useState({
    schooliconcolor: "",
    schoolfrontcolor: "",
    sidebarcolor: "",
    sidebarfrontcolor: "",
    iconcolor: "",
    logouticoncolor: "",
    hoversidebarfrontcolor: "",
    hovercolor: "",
    notifyiconcolor: "",
    notifyfrontcolor: "",
    dashbordfront: "",
    dashbordcolor: "",
    schoolname: "",
    schoolnameEN: "",
  });

  const Auth = isAuth();
  const [Theamcoler, setTheamcoler] = useState("#0000ff");
  const changecolor = async (name, e) => {
    SettingColor[name] = e.target.value;
    console.log(e.target.value);

    setSettingColor({ ...SettingColor });
    console.log(SettingColor);
  };

  const handleChange = async (name, e) => {
    console.log(name);
    console.log(e.target.value);
    let data = "";
    SettingColor[name] = e.target.value;
    setSettingColor({ ...SettingColor });
    console.log("SettingColor." + name, e.target.value);
  };
  const SaveClick = async () => {
    let data = "";
    let save = SettingColor;
    data = await post_update_school_color(save);

    console.log("save", save);
    console.log("data", data);
    Swal.fire({
      icon: "success",
      title: "บันทึกสำเร็จ",
      text: "กด OK เพื่อโหลดหน้าใหม่",
    }).then((result) => {
      if (result.isConfirmed) {
        router.reload();
      }
    });
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
  const Dataload = async () => {
    let data = await get_school_color();
    setSettingColor(data[0]);
    console.log("data", data);
  };
  const imageadd = async (file) => {
    console.log(file);
    // let data = file.name
    // values.picture = data

    let formData = new FormData();
    formData.append("name", moment(new Date()).format("YYYYMMDDHHmmss")) +
      file.name;
    formData.append("type", "icon");
    formData.append("image", file);
    // console.log(data)
    for (var value of formData.values()) {
      console.log("value--->", value);
    }
    let data1 = await upload(formData);

    console.log("schooliconcolor------>", data1.data);
    setaddimage({
      name: file.name,
      type: "register",
      image: file,
    });

    console.log("values", SettingColor);
    setSettingColor({ ...SettingColor, schooliconcolor: data1.data });
  };
  const [THdate, setTHdate] = useState("");
  useEffect(() => {
    Dataload();
    timezone();
  }, []);
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
            <div className="flex flex-col mb-4">
              <div className="flex flex-row w-full ">
                <div
                  className=" ml-1 mx-1 mb-1 py-3 px-5  border-solid  border border-gray-300 outline-none rounded-lg shadow w-1/3  "
                  for="colorpicker"
                >
                  <div className="flex flex-row w-full">
                    <label
                      className="p-2 font-bold text-xl text-center text-gray-900  w-full"
                      htmlFor=""
                    >
                      สีพื้นหลังของแถบด้านข้าง:
                      <label
                        className="p-2 font-bold text-lg text-center text-gray-900  w-1/3"
                        htmlFor=""
                      ></label>
                      <input
                        onChange={(e) => changecolor("sidebarcolor", e)}
                        type="color"
                        id="colorpicker"
                        className=" py-1 px-1 border-solid  border border-gray-300 outline-none  rounded-lg shadow  "
                        value={SettingColor.sidebarcolor}
                      />
                    </label>
                  </div>
                </div>

                <div
                  className="  mx-1 mb-1 py-3 px-5  border-solid  border border-gray-300 outline-none rounded-lg shadow w-1/3 "
                  for="colorpicker"
                >
                  <div className="flex flex-row w-full">
                    <label
                      className="p-2 font-bold text-xl text-center text-gray-900  w-full"
                      htmlFor=""
                    >
                      สีตัวอักษรของแถบด้านข้าง:
                      <label
                        className="p-2 font-bold text-lg text-center text-gray-900  w-1/3"
                        htmlFor=""
                      ></label>
                      <input
                        onChange={(e) => changecolor("sidebarfrontcolor", e)}
                        type="color"
                        id="colorpicker"
                        className=" py-1 px-1 border-solid  border border-gray-300 outline-none  rounded-lg shadow  "
                        value={SettingColor.sidebarfrontcolor}
                      />
                    </label>
                  </div>
                </div>

                <div
                  className="  mx-1 mb-1   py-3 px-5 border-solid  border border-gray-300 outline-none rounded-lg shadow w-1/3  "
                  for="colorpicker"
                >
                  <div className="flex flex-row w-full">
                    <label
                      className="p-2 font-bold text-xl text-center text-gray-900  w-full"
                      htmlFor=""
                    >
                      สีของสัญลักษณ์:
                      <label
                        className="p-2 font-bold text-lg text-center text-gray-900  w-1/3"
                        htmlFor=""
                      ></label>
                      <input
                        onChange={(e) => changecolor("iconcolor", e)}
                        type="color"
                        id="colorpicker"
                        className=" py-1 px-1 border-solid  border border-gray-300 outline-none  rounded-lg shadow  "
                        value={SettingColor.iconcolor}
                      />
                    </label>
                  </div>
                </div>
              </div>
              <div className="flex flex-row w-full h-2/6">
                <div
                  className=" ml-1 mx-1 mb-1 py-3 px-5  border-solid  border border-gray-300 outline-none rounded-lg shadow w-1/3  "
                  for="colorpicker"
                >
                  <div className="flex flex-row w-full">
                    <label
                      className="p-2 font-bold text-xl text-center text-gray-900  w-full"
                      htmlFor=""
                    >
                      สีของแถบเลือก:
                      <label
                        className="p-2 font-bold text-lg text-center text-gray-900  w-1/3"
                        htmlFor=""
                      ></label>
                      <input
                        onChange={(e) =>
                          changecolor("hoversidebarfrontcolor", e)
                        }
                        type="color"
                        id="colorpicker"
                        className=" py-1 px-1 border-solid  border border-gray-300 outline-none  rounded-lg shadow  "
                        value={SettingColor.hoversidebarfrontcolor}
                      />
                    </label>
                  </div>
                </div>

                <div
                  className="  mx-1 mb-1 py-3 px-5  border-solid  border border-gray-300 outline-none rounded-lg shadow w-1/3  "
                  for="colorpicker"
                >
                  <div className="flex flex-row w-full">
                    <label
                      className="p-2 font-bold text-xl text-center text-gray-900  w-full"
                      htmlFor=""
                    >
                      สีสัญลักษณ์ออกจากระบบ:
                      <label
                        className="p-2 font-bold text-lg text-center text-gray-900  w-1/3"
                        htmlFor=""
                      ></label>
                      <input
                        onChange={(e) => changecolor("logouticoncolor", e)}
                        type="color"
                        id="colorpicker"
                        className=" py-1 px-1 border-solid  border border-gray-300 outline-none  rounded-lg shadow  "
                        value={SettingColor.logouticoncolor}
                      />
                    </label>
                  </div>
                </div>

                <div
                  className=" ml-1 mx-1 mb-1 py-3 px-5  border-solid  border border-gray-300 outline-none rounded-lg shadow w-1/3  "
                  for="colorpicker"
                >
                  <div className="flex flex-row w-full">
                    <label
                      className="p-2 font-bold text-xl text-center text-gray-900  w-full"
                      htmlFor=""
                    >
                      สีสัญลักษณ์แจ้งเตือน:
                      <label
                        className="p-2 font-bold text-lg text-center text-gray-900  w-1/3"
                        htmlFor=""
                      ></label>
                      <input
                        onChange={(e) => changecolor("notifyiconcolor", e)}
                        type="color"
                        id="colorpicker"
                        className=" py-1 px-1 border-solid  border border-gray-300 outline-none  rounded-lg shadow  "
                        value={SettingColor.notifyiconcolor}
                      />
                    </label>
                  </div>
                </div>
              </div>
              <div className="flex flex-row w-full h-2/6 ">
                <div
                  className="  mx-1 mb-1 py-3 px-5  border-solid  border border-gray-300 outline-none rounded-lg shadow w-1/3  "
                  for="colorpicker"
                >
                  <div className="flex flex-row w-full">
                    <label
                      className="p-2 font-bold text-xl text-center text-gray-900  w-full"
                      htmlFor=""
                    >
                      สีตัวอักษรแจ้งเตือน:
                      <label
                        className="p-2 font-bold text-lg text-center text-gray-900  w-1/3"
                        htmlFor=""
                      ></label>
                      <input
                        onChange={(e) => changecolor("notifyfrontcolor", e)}
                        type="color"
                        id="colorpicker"
                        className=" py-1 px-1 border-solid  border border-gray-300 outline-none  rounded-lg shadow  "
                        value={SettingColor.notifyfrontcolor}
                      />
                    </label>
                  </div>
                </div>

                <div
                  className="  mx-1 mb-1 py-3 px-5  border-solid  border border-gray-300 outline-none rounded-lg shadow w-1/3  "
                  for="colorpicker"
                >
                  <div className="flex flex-row w-full">
                    <label
                      className="p-2 font-bold text-xl text-center text-gray-900  w-full"
                      htmlFor=""
                    >
                      สีของแถบเมื่อเลือก:
                      <label
                        className="p-2 font-bold text-lg text-center text-gray-900  w-1/3"
                        htmlFor=""
                      ></label>
                      <input
                        onChange={(e) => changecolor("hovercolor", e)}
                        type="color"
                        id="colorpicker"
                        className=" py-1 px-1 border-solid  border border-gray-300 outline-none  rounded-lg shadow  "
                        value={SettingColor.hovercolor}
                      />
                    </label>
                  </div>
                </div>

                <div
                  className="  mx-1 mb-1 py-3 px-5  border-solid  border border-gray-300 outline-none rounded-lg shadow w-1/3  "
                  for="colorpicker"
                >
                  <div className="flex flex-row w-full">
                    <label
                      className="p-2 font-bold text-xl text-center text-gray-900  w-full"
                      htmlFor=""
                    >
                      สีของตัวอักษรแดชบอร์ด:
                      <label
                        className="p-2 font-bold text-lg text-center text-gray-900  w-1/3"
                        htmlFor=""
                      ></label>
                      <input
                        onChange={(e) => changecolor("dashbordfront", e)}
                        type="color"
                        id="colorpicker"
                        className=" py-1 px-1 border-solid  border border-gray-300 outline-none  rounded-lg shadow  "
                        value={SettingColor.dashbordfront}
                      />
                    </label>
                  </div>
                </div>
              </div>
              <div className="flex flex-row w-full h-2/6">
                <div
                  className=" ml-1 mx-1 mb-1 py-3 px-5  border-solid  border border-gray-300 outline-none rounded-lg shadow w-1/3  "
                  for="colorpicker"
                >
                  <div className="flex flex-row w-full">
                    <label
                      className="p-2 font-bold text-xl text-center text-gray-900  w-full"
                      htmlFor=""
                    >
                      สีของแดชบอร์ด:
                      <label
                        className="p-2 font-bold text-lg text-center text-gray-900  w-1/3"
                        htmlFor=""
                      ></label>
                      <input
                        onChange={(e) => changecolor("dashbordcolor", e)}
                        type="color"
                        id="colorpicker"
                        className=" py-1 px-1 border-solid  border border-gray-300 outline-none  rounded-lg shadow  "
                        value={SettingColor.dashbordcolor}
                      />
                    </label>
                  </div>
                </div>

                <div
                  className="  mx-1 mb-1 py-3 px-5  border-solid  border border-gray-300 outline-none rounded-lg shadow w-1/3  "
                  for="colorpicker"
                >
                  <div className="flex flex-row w-full">
                    <label
                      className="p-2 font-bold text-xl text-center text-gray-900  w-full"
                      htmlFor=""
                    >
                      สีตัวอักษรโรงเรียน:
                      <label
                        className="p-2 font-bold text-lg text-center text-gray-900  w-1/3"
                        htmlFor=""
                      ></label>
                      <input
                        onChange={(e) => changecolor("schoolfrontcolor", e)}
                        type="color"
                        id="colorpicker"
                        className=" py-1 px-1 border-solid  border border-gray-300 outline-none  rounded-lg shadow  "
                        value={SettingColor.schoolfrontcolor}
                      />
                    </label>
                  </div>
                </div>

                <div
                  className=" ml-1 mx-1 mb-1 py-3 px-5  border-solid  border border-gray-300 outline-none rounded-lg shadow w-1/3  "
                  for="colorpicker"
                >
                  <div className="flex flex-row w-full">
                    <label
                      className="p-2 font-bold text-xl text-center text-gray-900  w-full"
                      htmlFor=""
                    >
                      รูปตราหรือโลโก้:
                      <label
                        className="p-2 font-bold text-lg text-center text-gray-900  w-1/3"
                        htmlFor=""
                      ></label>
                      <input
                        className="  border-gray-300  w-1/2"
                        onChange={(e) => imageadd(e.target.files[0])}
                        type="file"
                        id="myfile"
                      />
                    </label>
                  </div>
                </div>
              </div>
              <div className="flex flex-row w-full h-2/6">
                <div
                  className=" ml-1 mx-1 mb-1 py-3 px-5  border-solid  border border-gray-300 outline-none rounded-lg shadow w-1/3  "
                  for="colorpicker"
                >
                  <div className="flex flex-row w-full">
                    <label
                      className="p-2 font-bold text-xl text-center text-gray-900  w-full"
                      htmlFor=""
                    >
                      ชื่อโรงเรียนภาษาไทย:
                      <label
                        className="p-2 font-bold text-lg text-center text-gray-900  w-1/3"
                        htmlFor=""
                      ></label>
                      <input
                        onChange={(e) => handleChange("schoolname", e)}
                        type="text"
                        className=" py-1 px-1 border-solid  border border-gray-300 outline-none  rounded-lg shadow  "
                        value={SettingColor.schoolname}
                      />
                    </label>
                  </div>
                </div>

                <div
                  className="  mx-1 mb-1 py-3 px-5  border-solid  border border-gray-300 outline-none rounded-lg shadow w-1/3  "
                  for="colorpicker"
                >
                  <div className="flex flex-row w-full">
                    <label
                      className="p-2 font-bold text-xl text-center text-gray-900  w-full"
                      htmlFor=""
                    >
                      ชื่อโรงเรียนภาษาอังกฤษ:
                      <label
                        className="p-2 font-bold text-lg text-center text-gray-900  w-1/3"
                        htmlFor=""
                      ></label>
                      <input
                        onChange={(e) => handleChange("schoolnameEN", e)}
                        type="text"
                        className=" py-1 px-1 border-solid  border border-gray-300 outline-none  rounded-lg shadow  "
                        value={SettingColor.schoolnameEN}
                      />
                    </label>
                  </div>
                </div>
                <div className="  mx-1 mb-1  w-1/3  " for="colorpicker"></div>
              </div>
            </div>

            <div className="flex justify-center ">
              <button
                className=" shadow hover:shadow-lg text-white bg-green-600 hover:text-green-600   border-2   border-green-600  hover:border-green-600  hover:bg-white  rounded-lg background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 w-64"
                type="button"
                onClick={() => SaveClick()}
              >
                บันทึก
              </button>
            </div>
          </div>

          <Footer></Footer>
        </main>
      </div>
    </div>
  );
}

export default setting;
