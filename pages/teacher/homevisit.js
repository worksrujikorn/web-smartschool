import React, { useEffect, useState } from "react";
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
import Swal from "sweetalert2";
import SwiperCore, { Autoplay, Pagination, Navigation } from "swiper";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";



function homevisit() {
    const [THdate, setTHdate] = useState("");
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
    const imageadd = async (file) => {
        console.log(file);
        // let data = file.name
        // values.picture = data
        console.log(data);
        let formData = new FormData();
        formData.append("name", moment(new Date()).format("YYYYMMDDHHmmss")) +
            file.name;
        formData.append("type", "student");
        formData.append("image", file);
        // console.log(data)
        for (var value of formData.values()) {
            console.log("value--->", value);
        }
        let data1 = await upload(formData);
        console.log("picture------>", data1.data);
        // setaddimage({
        //     name: file.name,
        //     type: "news",
        //     image: file,
        // })

        console.log("values", values);
        setValues({ ...values, picture: data1.data });
    };
    useEffect(async () => {
        timezone();
    }, []);
    return (
        <div>
            <div className="flex flex-row min-h-screen bg-gray-100 text-gray-800 z-40 absolute w-full ">
                <Sidebar></Sidebar>

                <main className="flex flex-col flex-grow w-full transition-all duration-150 ease-in md:w-4/5 main md:ml-0">
                    <Nav></Nav>
                    <div className="ml-12 md:ml-2 ">
                        <div className="main-content flex flex-col">
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
                                <div className="   text-xl text-center  w-full">
                                    ???????????????????????????????????????????????????
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col  w-full px-2  ">


                            <div className="flex flex-col mb-4 mt-10">
                                <div className="flex flex-row  ">
                                    <label
                                        className="ml-2 mb-2 pl-1 font-bold text-lg text-gray-900  w-16"
                                        htmlFor="first_name"
                                    >

                                    </label>
                                    <label
                                        className="ml-2 mb-2 pl-1 font-bold text-lg text-gray-900  w-16"
                                        htmlFor="first_name"
                                    >
                                        ????????????????????????
                                    </label>

                                    <label
                                        className="ml-5 mb-2 pl-1 font-bold text-lg text-gray-900  w-1/6
                                        "
                                        htmlFor="first_name"
                                    >
                                        ????????????
                                    </label>

                                    <label
                                        className="ml-5 mb-2 pl-1 font-bold text-lg text-gray-900  w-1/6"
                                        htmlFor="first_name"
                                    >
                                        ?????????????????????
                                    </label>
                                    <label
                                        className="ml-5 mb-2 pl-1 font-bold text-lg text-gray-900  w-16"
                                        htmlFor="first_name"
                                    >
                                        ??????????????????
                                    </label>
                                    <label
                                        className="ml-1 mb-2 pl-1 font-bold text-lg text-gray-900  w-16"
                                        htmlFor="first_name"
                                    >
                                        ????????????
                                    </label>
                                    <label
                                        className="ml-5 mb-2 pl-1 font-bold text-lg text-gray-900  w-1/6"
                                        htmlFor="first_name"
                                    >
                                        ???????????????????????????????????????
                                    </label>
                                </div>
                                <div className="flex flex-row mb-4">
                                    <label
                                        className="ml-2 mb-2 pl-1 font-bold text-lg text-gray-900  w-16"
                                        htmlFor="first_name"
                                    >

                                    </label>
                                    <input
                                        className="ml-2 py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-16"
                                        type="text"

                                    />

                                    <input
                                        className="ml-5 py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-1/6"
                                        type="text"

                                    />

                                    <input
                                        className="ml-5 py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-1/6"
                                        type="text"

                                    />
                                    <input
                                        className="ml-5 py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-16"
                                        type="text"

                                    />

                                    <input
                                        className="ml-1 py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-16"
                                        type="text"

                                    />

                                    <input
                                        className="ml-5 py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-1/6"
                                        type="text"

                                    />
                                </div>



                            </div>
                            <div className="flex flex-col mb-4">
                                <div className="flex flex-row  ">
                                    <label
                                        className="ml-2 mb-2 pl-1 font-bold text-lg text-gray-900  w-16 md:w-1/16"
                                        htmlFor="first_name"
                                    >

                                    </label>
                                    <label
                                        className="ml-2 mb-2 pl-1 font-bold text-lg text-gray-900  w-16"
                                        htmlFor="first_name"
                                    >
                                        ????????????????????????
                                    </label>

                                    <label
                                        className="ml-5 mb-2 pl-1 font-bold text-lg text-gray-900  w-1/6
                                        "
                                        htmlFor="first_name"
                                    >
                                        ????????????(????????????)
                                    </label>

                                    <label
                                        className="ml-5 mb-2 pl-1 font-bold text-lg text-gray-900  w-1/6"
                                        htmlFor="first_name"
                                    >
                                        ?????????????????????
                                    </label>

                                    <label
                                        className="ml-5 mb-2 pl-1 font-bold text-lg text-gray-900  w-1/6"
                                        htmlFor="first_name"
                                    >
                                        ???????????????????????????????????????
                                    </label>
                                    <label
                                        className="ml-6 mb-2 pl-1 font-bold text-lg text-gray-900  w-1/6"
                                        htmlFor="first_name"
                                    >
                                        ???????????????
                                    </label>
                                </div>
                                <div className="flex flex-row mb-4">
                                    <label
                                        className="ml-2 mb-2 pl-1 font-bold text-lg text-gray-900  w-16"
                                        htmlFor="first_name"
                                    >

                                    </label>
                                    <input
                                        className="ml-2 py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-2/6"
                                        type="text"
                                        onChange={(e) =>
                                            modalhandleChange("father_name", e)
                                        }
                                    />

                                    <input
                                        className="ml-5 py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-1/4"
                                        type="text"
                                        onChange={(e) =>
                                            modalhandleChange(
                                                "father_phonenumber",
                                                e
                                            )
                                        }
                                    />
                                    <input
                                        className="ml-5 py-2 px-3  border-solid  border border-gray-300 outline-none  rounded-lg shadow w-1/4"
                                        type="text"
                                        onChange={(e) =>
                                            modalhandleChange(
                                                "father_occupation",
                                                e
                                            )
                                        }
                                    />
                                </div>



                            </div>
                            <div className="flex flex-col mb-4">
                                <div className="flex flex-row  ">
                                    <label
                                        className="ml-2 mb-2 pl-1 font-bold text-lg text-gray-900  w-16"
                                        htmlFor="first_name"
                                    >

                                    </label>
                                    <label
                                        className="ml-2 mb-2 pl-1 font-bold text-lg text-gray-900  w-16"
                                        htmlFor="first_name"
                                    >
                                        ????????????????????????
                                    </label>

                                    <label
                                        className="ml-5 mb-2 pl-1 font-bold text-lg text-gray-900  w-1/6
                                        "
                                        htmlFor="first_name"
                                    >
                                        ????????????(???????????????)
                                    </label>

                                    <label
                                        className="ml-5 mb-2 pl-1 font-bold text-lg text-gray-900  w-1/6"
                                        htmlFor="first_name"
                                    >
                                        ?????????????????????
                                    </label>

                                    <label
                                        className="ml-5 mb-2 pl-1 font-bold text-lg text-gray-900  w-1/6"
                                        htmlFor="first_name"
                                    >
                                        ???????????????????????????????????????
                                    </label>
                                    <label
                                        className="ml-5 mb-2 pl-1 font-bold text-lg text-gray-900  w-1/6"
                                        htmlFor="first_name"
                                    >
                                        ???????????????
                                    </label>
                                </div>
                                <div className="flex flex-row mb-4">
                                    <label
                                        className="ml-2 mb-2 pl-1 font-bold text-lg text-gray-900  w-16"
                                        htmlFor="first_name"
                                    >

                                    </label>
                                    <input
                                        className="ml-2 py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-2/6"
                                        type="text"
                                        onChange={(e) =>
                                            modalhandleChange("father_name", e)
                                        }
                                    />

                                    <input
                                        className="ml-5 py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-1/4"
                                        type="text"
                                        onChange={(e) =>
                                            modalhandleChange(
                                                "father_phonenumber",
                                                e
                                            )
                                        }
                                    />
                                    <input
                                        className="ml-5 py-2 px-3  border-solid  border border-gray-300 outline-none  rounded-lg shadow w-1/4"
                                        type="text"
                                        onChange={(e) =>
                                            modalhandleChange(
                                                "father_occupation",
                                                e
                                            )
                                        }
                                    />
                                </div>



                            </div>
                            <div className="flex flex-col mb-4">
                                <div className="flex flex-row pl-2">
                                    <div className="  ml-2 text-xl text-left  w-16">
                                    </div>
                                    <div className="   text-xl text-left  w-1/4">
                                        ????????????????????????????????????-???????????????
                                    </div>
                                </div>

                                <div class="flex flex-row pl-2">
                                    <div className="  ml-10 text-xl text-left  w-16">
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">?????????????????????????????????</span>
                                        </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">??????????????????????????????</span>
                                        </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">????????????????????????</span>
                                        </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">???????????????????????????????????????</span>
                                        </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">??????????????????????????????????????????</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-5 flex flex-col mb-4">
                                <div className="flex flex-row  ">
                                    <label
                                        className="ml-2 mb-2 pl-1 font-bold text-lg text-gray-900  w-16"
                                        htmlFor="first_name"
                                    >

                                    </label>
                                    <label
                                        className="ml-2 mb-2 pl-1 font-bold text-lg text-gray-900  w-full"
                                        htmlFor="first_name"
                                    >
                                        ???????????????????????????????????????????????????????????????(??????????????????????????????????????????-???????????????)?????????????????????????????????????????????????????????????????????????????????????????????????????????
                                    </label>


                                </div>
                                <div className="flex flex-row mb-4">
                                    <label
                                        className="ml-2 mb-2 pl-1 font-bold text-lg text-gray-900  w-16 md:w-1/16"
                                        htmlFor="first_name"
                                    >

                                    </label>
                                    <input
                                        className="ml-2 py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-1/4"
                                        type="text"

                                    />


                                </div>



                            </div>
                            <div className="flex flex-col mb-4">
                                <div className="flex flex-row  ">
                                    <label
                                        className="ml-2 mb-2 pl-1 font-bold text-lg text-gray-900  w-16 md:w-1/16"
                                        htmlFor="first_name"
                                    >

                                    </label>
                                    <label
                                        className="ml-2 mb-2 pl-1 font-bold text-lg text-gray-900  w-16"
                                        htmlFor="first_name"
                                    >
                                        ????????????????????????
                                    </label>

                                    <label
                                        className="ml-5 mb-2 pl-1 font-bold text-lg text-gray-900  w-1/6
                                        "
                                        htmlFor="first_name"
                                    >
                                        ????????????
                                    </label>

                                    <label
                                        className="ml-5 mb-2 pl-1 font-bold text-lg text-gray-900  w-1/6"
                                        htmlFor="first_name"
                                    >
                                        ?????????????????????
                                    </label>

                                    <label
                                        className="ml-5 mb-2 pl-1 font-bold text-lg text-gray-900  w-1/6"
                                        htmlFor="first_name"
                                    >
                                        ???????????????????????????????????????
                                    </label>
                                    <label
                                        className="ml-5 mb-2 pl-1 font-bold text-lg text-gray-900  w-1/6"
                                        htmlFor="first_name"
                                    >
                                        ???????????????
                                    </label>
                                </div>
                                <div className="flex flex-row mb-4">
                                    <label
                                        className="ml-2 mb-2 pl-1 font-bold text-lg text-gray-900  w-16 md:w-1/16"
                                        htmlFor="first_name"
                                    >

                                    </label>
                                    <input
                                        className="ml-2 py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-16"
                                        type="text"

                                    />

                                    <input
                                        className="ml-5 py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-1/6"
                                        type="text"

                                    />

                                    <input
                                        className="ml-5 py-2 px-3  border-solid  border border-gray-300 outline-none  rounded-lg shadow w-1/6"
                                        type="text"

                                    />


                                    <input
                                        className="ml-5 py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-1/6"
                                        type="text"

                                    />
                                    <input
                                        className="ml-6 py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-1/6"
                                        type="text"

                                    />
                                </div>



                            </div>
                            <div className="flex flex-col mb-4">
                                <div className="flex flex-row  ">
                                    <label
                                        className="ml-2 mb-2 pl-1 font-bold text-xl text-gray-900  w-16"
                                        htmlFor="first_name"
                                    >

                                    </label>
                                    <label
                                        className="ml-2 mb-2 pl-1 font-bold text-xl text-gray-900  w-full"
                                        htmlFor="first_name"
                                    >
                                        ??????????????????????????????????????????????????????????????????
                                    </label>


                                </div>

                                <div className="flex flex-row w-full ">
                                    <label
                                        className="ml-2 mb-2 pl-1 font-bold text-lg text-gray-900  w-16"
                                        htmlFor="first_name"
                                    >

                                    </label>
                                    <label
                                        className="ml-2 mb-2 pl-1 text-lg text-gray-900  w-1/4"
                                        htmlFor="first_name"

                                    >
                                        ?????????????????????????????????????????????????????????????????? (??????????????????????????????????????????)
                                    </label>

                                    <label
                                        className="ml-5 mb-2 pl-1 text-lg text-gray-900  w-1/4"
                                        htmlFor="first_name"

                                    >
                                        ???????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????(?????????????????????/?????????   )
                                    </label>



                                </div>
                                <div className="flex flex-row mb-4">
                                    <label
                                        className="ml-2 mb-2 pl-1 font-bold text-lg text-gray-900  w-16"
                                        htmlFor="first_name"
                                    >

                                    </label>

                                    <input
                                        className="ml-2 py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-1/4"
                                        type="text"

                                    />
                                    <input
                                        className="ml-5 py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-1/4"
                                        type="text"

                                    />

                                </div>
                            </div>
                            <div className="flex flex-col mb-4">
                                <div className="flex flex-row  ">
                                    <label
                                        className="ml-2 mb-2 pl-1 font-bold text-xl text-gray-900  w-16"
                                        htmlFor="first_name"
                                    >

                                    </label>
                                    <label
                                        className="ml-2 mb-2 pl-1 font-bold text-xl text-gray-900  w-full"
                                        htmlFor="first_name"
                                    >
                                        ??????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
                                    </label>


                                </div>
                                <div className="flex flex-row pl-2">
                                    <div className="  ml-2 text-xl text-left  w-16">
                                    </div>
                                    <div className="   text-xl text-left mt-3 w-1/4">
                                        ????????????
                                    </div>
                                </div>
                                <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-16">
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">?????????????????????</span>
                                        </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">????????? ???</span>
                                        </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class=" w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">????????????????????????</span>
                                        </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">?????????????????????</span>
                                        </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">???????????????</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col mb-4">
                                <div className="flex flex-row pl-2  ">
                                    <div className="  ml-2 text-xl text-left  w-16">
                                    </div>
                                    <div className="   text-xl text-left mt-3 w-1/4">
                                        ???????????????
                                    </div>
                                </div>
                                <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-16">
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">?????????????????????</span>
                                        </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">????????? ???</span>
                                        </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">????????????????????????</span>
                                        </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">?????????????????????</span>
                                        </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">???????????????</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col mb-4">
                                <div className="flex flex-row pl-2">
                                    <div className="  ml-2 text-xl text-left  w-16">
                                    </div>
                                    <div className="   text-xl text-left mt-3 w-1/4">
                                        ??????????????????/?????????????????????
                                    </div>
                                </div>
                                <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-16">
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">?????????????????????</span>
                                        </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">????????? ???</span>
                                        </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class=" w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">????????????????????????</span>
                                        </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">?????????????????????</span>
                                        </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">???????????????</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col mb-4">
                                <div className="flex flex-row pl-2">
                                    <div className="  ml-2 text-xl text-left  w-16">
                                    </div>
                                    <div className="   text-xl text-left mt-3 w-1/4">
                                        ??????????????????/?????????????????????
                                    </div>
                                </div>
                                <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-16">
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">?????????????????????</span>
                                        </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">????????? ???</span>
                                        </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class=" w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">????????????????????????</span>
                                        </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">?????????????????????</span>
                                        </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">???????????????</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col mb-4">
                                <div className="flex flex-row pl-2">
                                    <div className="  ml-2 text-xl text-left  w-16">
                                    </div>
                                    <div className="   text-xl text-left mt-3 w-1/4">
                                        ?????????/?????????/??????/?????????
                                    </div>
                                </div>
                                <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-16">
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">?????????????????????</span>
                                        </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">????????? ???</span>
                                        </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class=" w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">????????????????????????</span>
                                        </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">?????????????????????</span>
                                        </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">???????????????</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col mb-4">
                                <div className="flex flex-row pl-2">
                                    <div className="  ml-2 text-xl text-left  w-16">
                                    </div>
                                    <div className="   text-xl text-left mt-3 w-1/4">
                                        ????????????
                                    </div>
                                </div>
                                <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-16">
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">?????????????????????</span>
                                        </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">????????? ???</span>
                                        </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">????????????????????????</span>
                                        </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">?????????????????????</span>
                                        </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">???????????????</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col mb-4">
                                <div className="flex flex-row pl-2">
                                    <div className="  ml-2 text-xl text-left  w-16">
                                    </div>
                                    <div className="   text-xl text-left mt-3 w-1/4">
                                        ???????????????
                                    </div>
                                </div>
                                <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-16">
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">?????????????????????</span>
                                        </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">????????? ???</span>
                                        </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">????????????????????????</span>
                                        </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">?????????????????????</span>
                                        </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">???????????????</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col mb-4">
                                <div className="flex flex-row pl-2 mt-5">

                                    <label
                                        className="ml-2 mb-2 pl-1 font-bold text-xl text-gray-900  w-1/16 md:w-16"
                                        htmlFor="first_name"
                                    >

                                    </label>
                                    <label
                                        className="ml-2 mb-2 pl-1 font-bold text-xl text-gray-900  w-full"
                                        htmlFor="first_name"
                                    >
                                        ???????????????????????????????????????????????????????????????????????? ???????????????????????????????????????????????????????????????????????????
                                    </label>
                                </div>
                                <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-16">
                                    </div>

                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">????????????</span>
                                        </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">??????????????????????????????</span>
                                        </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">???????????????????????????????????????????????????????????????????????????</span>
                                        </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">???????????? ???</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col mb-4">
                                <div className="flex flex-row w-full mt-4">
                                    <label
                                        className="ml-2 mb-2 pl-1 font-bold text-lg text-gray-900  w-16"
                                        htmlFor="first_name"
                                    >

                                    </label>
                                    <label
                                        className="ml-2 mb-2 pl-1 text-lg text-gray-900  w-1/4"
                                        htmlFor="first_name"

                                    >
                                        ???????????????????????????????????????????????????????????????
                                    </label>




                                </div>
                                <div className="flex flex-row mb-4 mt-2">
                                    <label
                                        className="ml-2 mb-2 pl-1 font-bold text-lg text-gray-900  w-16"
                                        htmlFor="first_name"
                                    >

                                    </label>

                                    <input
                                        className="ml-2 py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-1/4"
                                        type="text"

                                    />

                                </div>
                            </div>
                            <div className="flex flex-col mb-4">
                                <div className="flex flex-row w-full mt-4">
                                    <label
                                        className="ml-2 mb-2 pl-1 font-bold text-lg text-gray-900  w-16"
                                        htmlFor="first_name"
                                    >

                                    </label>
                                    <label
                                        className="ml-2 mb-2 pl-1 text-lg text-gray-900  w-1/4"
                                        htmlFor="first_name"

                                    >
                                        ????????????????????????????????????????????????????????????????????????
                                    </label>
                                    <label
                                        className="ml-5 mb-2 pl-1 text-lg text-gray-900  w-1/4"
                                        htmlFor="first_name"

                                    >
                                        ??????????????????????????????????????????????????????????????????????????????????????????
                                    </label>





                                </div>
                                <div className="flex flex-row mb-4 mt-2">
                                    <label
                                        className="ml-2 mb-2 pl-1 font-bold text-lg text-gray-900  w-16"
                                        htmlFor="first_name"
                                    >

                                    </label>

                                    <input
                                        className="ml-2 py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-1/4"
                                        type="text"

                                    />
                                    <input
                                        className="ml-5 py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-1/4"
                                        type="text"

                                    />

                                </div>
                            </div>
                            <div className="flex flex-col mb-4">
                                <div className="flex flex-row w-full mt-4">
                                    <label
                                        className="ml-2 mb-2 pl-1 font-bold text-lg text-gray-900  w-16"
                                        htmlFor="first_name"
                                    >

                                    </label>
                                    <label
                                        className="ml-2 mb-2 pl-1 text-lg text-gray-900  w-1/4"
                                        htmlFor="first_name"

                                    >
                                        ??????????????????????????????????????????????????????????????? (???????????????)
                                    </label>
                                    <label
                                        className="ml-5 mb-2 pl-1 text-lg text-gray-900  w-1/4"
                                        htmlFor="first_name"

                                    >
                                        ?????????????????????????????????
                                    </label>





                                </div>
                                <div className="flex flex-row mb-4 mt-2">
                                    <label
                                        className="ml-2 mb-2 pl-1 font-bold text-lg text-gray-900  w-16"
                                        htmlFor="first_name"
                                    >

                                    </label>

                                    <input
                                        className="ml-2 py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-1/4"
                                        type="text"

                                    />
                                    <input
                                        className="ml-5 py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-1/4"
                                        type="text"

                                    />

                                </div>
                            </div>
                            <div className="flex flex-col mb-4">
                                <div className="flex flex-row pl-2 mt-5">

                                    <label
                                        className="ml-2 mb-2 pl-1 font-bold text-xl text-gray-900  w-1/16 md:w-16"
                                        htmlFor="first_name"
                                    >

                                    </label>
                                    <label
                                        className="ml-2 mb-2 pl-1 font-bold text-xl text-gray-900  w-full"
                                        htmlFor="first_name"
                                    >
                                        ?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
                                    </label>
                                </div>
                                <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-16">
                                    </div>

                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded md:w-6 md:h-6" />
                                            <span class="ml-5">????????????????????????????????????</span>
                                        </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded md:w-6 md:h-6" />
                                            <span class="ml-5">????????????????????????????????????</span>
                                        </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded md:w-6 md:h-6" />
                                            <span class="ml-5">????????????????????????????????????</span>
                                        </label>

                                    </div>
                                    <div class="mt-2 flex justify-center ">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">???????????? ???</span>
                                            <input
                                                className="ml-5 py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-1/4"
                                                type="text"

                                            />
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col mb-4">
                                <div className="flex flex-row pl-2 mt-5">

                                    <label
                                        className="ml-2 mb-2 pl-1 font-bold text-xl text-gray-900  w-1/16 md:w-16"
                                        htmlFor="first_name"
                                    >

                                    </label>
                                    <label
                                        className="ml-2 mb-2 pl-1 font-bold text-xl text-gray-900  w-full"
                                        htmlFor="first_name"
                                    >
                                        ???????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
                                    </label>
                                </div>
                                <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-16">
                                    </div>

                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">??????????????????????????????????????????</span>
                                        </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">?????????????????????????????? </span>
                                        </label>
                                    </div>

                                    <div class="mt-2 flex justify-center ">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">???????????????</span>
                                            <input
                                                className="ml-5 py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-1/4"
                                                type="text"

                                            />
                                        </label>
                                    </div>

                                </div>
                            </div>
                            <div className="flex flex-col mb-4">
                                <div className="flex flex-row pl-2 mt-5">

                                    <label
                                        className=" mb-2 pl-1 font-bold text-xl text-gray-900  w-16"
                                        htmlFor="first_name"
                                    >

                                    </label>
                                    <label
                                        className="ml-5 mb-2 pl-1 text-lg text-gray-900  w-full"
                                        htmlFor="first_name"

                                    >
                                        ??????????????????????????????????????????????????????????????????????????????????????????????????????????????????

                                    </label>
                                </div>
                                <div class="flex flex-row pl-2 mt-3">
                                    <label
                                        className="ml-2 mb-2 pl-1 font-bold text-xl text-gray-900  w-16"
                                        htmlFor="first_name"
                                    >

                                    </label>
                                    <textarea
                                        id="message"
                                        rows="4"
                                        class="block p-2.5 ml-2
                                w-1/2 
                                text-sm 
                                text-gray-900 
                                bg-gray-50 
                                rounded-lg 
                                border 
                                border-gray-300 
                                focus:ring-blue-500 
                                focus:border-blue-500 
                                dark:bg-gray-700 
                                dark:border-gray-600 
                                dark:placeholder-gray-400 
                                dark:text-white 
                                dark:focus:ring-blue-500 
                                dark:focus:border-blue-500"
                                        placeholder="Your message...">
                                    </textarea>
                                </div>
                            </div>
                            <div className="flex flex-col mb-4">
                                <div className="flex flex-row pl-2 mt-5">

                                    <label
                                        className="ml-2 mb-2 pl-1 font-bold text-xl text-gray-900  w-1/16 md:w-16"
                                        htmlFor="first_name"
                                    >

                                    </label>
                                    <label
                                        className="ml-2 mb-2 pl-1 font-bold text-xl text-gray-900  w-full"
                                        htmlFor="first_name"
                                    >
                                        ??????????????????????????????????????????????????? ????????????????????????????????????????????????????????????????????????????????????????????????????????????
                                    </label>
                                </div>
                                <div className="flex flex-row pl-2 mt-5">

                                    <label
                                        className=" mb-2 pl-1 font-bold text-xl text-gray-900  w-16"
                                        htmlFor="first_name"
                                    >

                                    </label>
                                    <label
                                        className="ml-5 mb-2 pl-1 text-lg text-gray-900  w-full"
                                        htmlFor="first_name"

                                    >
                                        ?????????????????????????????????????????????????????????????????? ??????????????????
                                    </label>
                                </div>
                                <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-16">
                                    </div>

                                    <div class="mt-2 flex justify-left w-1/3">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">???????????????????????????</span>
                                        </label>
                                    </div>
                                    <div class="mt-2 flex justify-left w-1/3">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">?????????????????????????????????????????? 60 ??????</span>
                                        </label>
                                    </div>


                                </div>
                                <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-16">
                                    </div>

                                    <div class="mt-2 flex justify-left w-1/3">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">?????????????????????/?????????????????????????????????????????????</span>
                                        </label>
                                    </div>
                                    <div class="mt-2 flex justify-left w-1/3">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                        </label>
                                        <span class="ml-5">???????????????????????? 15-65 ??????????????????????????? (???????????????????????????????????????????????????/????????????????????????)</span>

                                    </div>


                                </div>
                            </div>
                            <div className="flex flex-col mb-4">
                                <div className="flex flex-row pl-2 mt-5">

                                    <label
                                        className=" mb-2 pl-1 font-bold text-xl text-gray-900  w-16"
                                        htmlFor="first_name"
                                    >

                                    </label>
                                    <label
                                        className="ml-5 mb-2 pl-1 text-lg text-gray-900  w-1/4"
                                        htmlFor="first_name"

                                    >
                                        ?????????????????????????????????????????????????????? ???????????????
                                    </label>
                                </div>
                                <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-16">
                                    </div>

                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">???????????????????????????????????? </span>
                                        </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">????????????????????????</span>
                                        </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">?????????????????????????????????????????????????????????</span>
                                        </label>
                                    </div>


                                </div>
                            </div>
                            <div className="flex flex-col mb-4">
                                <div className="flex flex-row pl-2 mt-5">

                                    <label
                                        className=" mb-2 pl-1 font-bold text-xl text-gray-900  w-16"
                                        htmlFor="first_name"
                                    >

                                    </label>
                                    <label
                                        className="ml-5 mb-2 pl-1 text-lg text-gray-900  w-1/4"
                                        htmlFor="first_name"

                                    >
                                        ???????????????????????????????????????????????? ??????????????????
                                    </label>
                                </div>
                                <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-16">
                                    </div>

                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">??????????????????????????????????????????????????????????????? ???????????? ?????????????????????????????????????????????????????????????????? ???????????? ?????????????????? ?????????????????????????????????????????????????????????????????? </span>
                                        </label>
                                    </div>



                                </div>
                                <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-16">
                                    </div>


                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">????????????????????????????????????????????????????????????????????????????????????????????????????????????</span>
                                        </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">???????????? ???</span>
                                        </label>
                                    </div>


                                </div>
                            </div>
                            <div className="flex flex-col mb-4">
                                <div className="flex flex-row pl-2 mt-5">

                                    <label
                                        className="ml-2 mb-2 pl-1 font-bold text-xl text-gray-900  w-1/16 md:w-16"
                                        htmlFor="first_name"
                                    >

                                    </label>
                                    <label
                                        className="ml-2 mb-2 pl-1 font-bold text-xl text-gray-900  w-full"
                                        htmlFor="first_name"
                                    >
                                        ????????????????????????????????????????????????????????? (??????????????????????????????????????? 1 ?????????)

                                    </label>
                                </div>
                                <div className="flex flex-row pl-2 mt-5">

                                    <label
                                        className=" mb-2 pl-1 font-bold text-xl text-gray-900  w-16"
                                        htmlFor="first_name"
                                    >

                                    </label>
                                    <label
                                        className="ml-5 mb-2 pl-1 text-lg text-gray-900  w-1/4"
                                        htmlFor="first_name"

                                    >
                                        ???????????????????????????????????????
                                    </label>
                                </div>
                                <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-16">
                                    </div>


                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">??????</span>
                                        </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">???????????????</span>
                                        </label>
                                    </div>


                                </div>
                            </div>
                            <div className="flex flex-col mb-4">
                                <div className="flex flex-row pl-2 mt-5">

                                    <label
                                        className=" mb-2 pl-1 font-bold text-xl text-gray-900  w-16"
                                        htmlFor="first_name"
                                    >

                                    </label>
                                    <label
                                        className="ml-5 mb-2 pl-1 text-lg text-gray-900  w-1/4"
                                        htmlFor="first_name"

                                    >
                                        ????????????????????????????????????????????????
                                    </label>
                                </div>
                                <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-16">
                                    </div>


                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">??????</span>
                                        </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">???????????????</span>
                                        </label>
                                    </div>


                                </div>
                            </div>
                            <div className="flex flex-col mb-4">
                                <div className="flex flex-row pl-2 mt-5">

                                    <label
                                        className=" mb-2 pl-1 font-bold text-xl text-gray-900  w-16"
                                        htmlFor="first_name"
                                    >

                                    </label>
                                    <label
                                        className="ml-5 mb-2 pl-1 text-lg text-gray-900  w-1/4"
                                        htmlFor="first_name"

                                    >
                                        ????????????????????????????????????/???????????????
                                    </label>
                                </div>
                                <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-16">
                                    </div>


                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">??????</span>
                                        </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">???????????????</span>
                                        </label>
                                    </div>


                                </div>
                            </div>
                            <div className="flex flex-col mb-4">
                                <div className="flex flex-row pl-2 mt-5">

                                    <label
                                        className=" mb-2 pl-1 font-bold text-xl text-gray-900  w-16"
                                        htmlFor="first_name"
                                    >

                                    </label>
                                    <label
                                        className="ml-5 mb-2 pl-1 text-lg text-gray-900  w-full"
                                        htmlFor="first_name"

                                    >
                                        ????????????/??????????????????????????????/????????????????????????/????????????????????? ??????????????????????????????????????????
                                    </label>
                                </div>
                                <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-16">
                                    </div>


                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">??????</span>
                                        </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">???????????????</span>
                                        </label>
                                    </div>


                                </div>

                            </div>

                            <div className="flex flex-col mb-4">
                                <div className="flex flex-row pl-2 mt-5">

                                    <label
                                        className="ml-2 mb-2 pl-1 font-bold text-xl text-gray-900  w-1/16 md:w-16"
                                        htmlFor="first_name"
                                    >

                                    </label>
                                    <label
                                        className="ml-2 mb-2 pl-1 font-bold text-xl text-gray-900  w-full"
                                        htmlFor="first_name"
                                    >
                                        ????????????????????????????????? ??????????????????????????????????????? (?????????????????????)
                                    </label>
                                </div>
                                <div className="flex flex-row pl-2 mt-5">

                                    <label
                                        className=" mb-2 pl-1 font-bold text-xl text-gray-900  w-16"
                                        htmlFor="first_name"
                                    >

                                    </label>
                                    <label
                                        className="ml-5 mb-2 pl-1 text-lg text-gray-900  w-1/4"
                                        htmlFor="first_name"

                                    >
                                        ???????????????????????????????????????
                                    </label>
                                </div>
                                <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-16">
                                    </div>


                                    <div class="mt-2 flex justify-left w-1/6">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">????????????????????? 1 ?????????</span>
                                        </label>
                                    </div>
                                    <div class="mt-2 flex justify-left w-1/3">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">?????????????????????????????????????????????????????????????????????
                                            </span>


                                        </label>
                                    </div>


                                </div>
                                <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-16">
                                    </div>


                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">????????????????????????????????? ??????????????? </span>
                                            <input
                                                className="ml-2 py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-2/12"
                                                type="text"

                                            />
                                            <span class="ml-5">????????? </span>
                                        </label>
                                    </div>

                                </div>
                                <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-16">
                                    </div>


                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">??????????????????????????? </span>
                                            <input
                                                className="ml-2 py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-2/12"
                                                type="text"

                                            />
                                            <span class="ml-5">????????? </span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col mb-4">
                                <div className="flex flex-row pl-2 mt-5">

                                    <label
                                        className="ml-2 mb-2 pl-1 font-bold text-xl text-gray-900  w-1/16 md:w-16"
                                        htmlFor="first_name"
                                    >

                                    </label>
                                    <label
                                        className="ml-2 mb-2 pl-1 font-bold text-xl text-gray-900  w-full"
                                        htmlFor="first_name"
                                    >
                                        ???????????????????????????????????????????????????????????????
                                    </label>
                                </div>
                                <div className="flex flex-row pl-2 mt-5">

                                    <label
                                        className=" mb-2 pl-1 font-bold text-xl text-gray-900  w-16"
                                        htmlFor="first_name"
                                    >

                                    </label>
                                    <label
                                        className="ml-5 mb-2 pl-1 text-lg text-gray-900  w-1/4"
                                        htmlFor="first_name"

                                    >
                                        ??????????????????
                                    </label>
                                </div>
                                <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-16">
                                    </div>


                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">???????????????????????????????????????????????????</span>
                                        </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">???????????????????????????????????????????????????????????????????????????????????????</span>
                                        </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">???????????????????????????????????????????????????</span>
                                        </label>
                                    </div>

                                </div>

                                <div class="flex flex-row  pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-16">
                                    </div>


                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">??????????????????????????????????????????????????????/????????????????????????</span>
                                        </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">???????????????????????????????????????????????????????????????</span>
                                        </label>
                                    </div>


                                </div>
                            </div>
                            <div className="flex flex-col mb-4">
                                <div className="flex flex-row pl-2 mt-5">

                                    <label
                                        className=" mb-2 pl-1 font-bold text-xl text-gray-900  w-16"
                                        htmlFor="first_name"
                                    >

                                    </label>
                                    <label
                                        className="ml-5 mb-2 pl-1 text-lg text-gray-900  w-full"
                                        htmlFor="first_name"

                                    >
                                        ????????????????????????????????????????????????????????????????????????
                                    </label>
                                </div>
                                <div class="flex flex-row  pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-16">
                                    </div>


                                    <div class="mt-2 flex justify-left pl-50 w-1/2">
                                        <label class="inline-flex items-center ">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">????????????????????????????????????????????? ???????????? ?????????????????????????????????</span>
                                        </label>
                                    </div>
                                    <div class="mt-2 flex justify-left w-1/2">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">?????????????????????????????????</span>
                                        </label>
                                    </div>


                                </div>
                                <div class="flex flex-row  pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-16">
                                    </div>


                                    <div class="mt-2 flex justify-left w-1/2 ">
                                        <label class="inline-flex items-center ">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded " />

                                        </label>
                                        <span class="ml-5">?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????/????????????????????????/??????????????????</span>
                                    </div>
                                    <div class="mt-2 flex justify-left w-1/2">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">?????????????????????????????????????????????????????????????????????????????????</span>
                                        </label>
                                    </div>


                                </div>
                                <div class="flex flex-row  pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-16">
                                    </div>


                                    <div class="mt-2 flex justify-left w-1/2">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />

                                        </label>
                                        <span class="ml-5">??????????????????????????????????????????????????????????????????????????????</span>
                                    </div>
                                    <div class="mt-2 flex justify-left w-1/2">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />

                                        </label>
                                        <span class="ml-5">???????????????????????????????????????/?????????????????????????????????????????????????????????
                                        </span>
                                    </div>


                                </div>
                                <div class="flex flex-row   pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-16">
                                    </div>


                                    <div class="mt-2 flex justify-left w-1/2">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">???????????????????????????????????? </span>
                                        </label>
                                    </div>
                                    <div class="mt-2 flex justify-left w-1/2">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />

                                        </label>
                                        <span class="ml-5">??????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
                                        </span>
                                    </div>


                                </div>
                                <div class="flex flex-row   pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-16">
                                    </div>


                                    <div class="mt-2 flex justify-left w-1/2">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />

                                        </label>
                                        <span class="ml-5">????????????????????????/????????????????????????????????????????????????????????????????????????/??????????????????????????????</span>
                                    </div>
                                    <div class="mt-2 flex justify-left w-1/2">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                        </label>
                                        <span class="ml-5">?????????????????????????????????????????????????????????</span>
                                    </div>


                                </div>
                                <div class="flex flex-row  pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-16">
                                    </div>


                                    <div class="mt-2 flex justify-left w-1/2">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />

                                        </label>
                                        <span class="ml-5">????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????/????????????????????????????????????</span>
                                    </div>
                                    <div class="mt-2 flex justify-left w-1/2">

                                        <span class="ml-5"></span>
                                    </div>



                                </div>
                            </div>
                            <div className="flex flex-col mb-4">
                                <div className="flex flex-row mt-5 ">
                                    <label
                                        className="ml-2 mb-2 pl-1 font-bold text-xl text-gray-900  w-1/16 md:w-16"
                                        htmlFor="first_name"
                                    >

                                    </label>
                                    <label
                                        className="ml-2 mb-2 pl-1 font-bold text-xl text-gray-900  w-full"
                                        htmlFor="first_name"
                                    >
                                        ????????????????????????????????????????????????????????????????????????????????????
                                    </label>


                                </div>

                                <div className="flex flex-row w-full  mt-3">
                                    <label
                                        className="ml-2 mb-2 pl-1 font-bold text-lg text-gray-900  w-16"
                                        htmlFor="first_name"
                                    >

                                    </label>
                                    <label
                                        className="ml-2 mb-2 pl-1 text-lg text-gray-900  w-1/4"
                                        htmlFor="first_name"

                                    >
                                        ????????????????????????????????????????????????????????????????????????????????????
                                    </label>

                                    <label
                                        className="ml-5 mb-2 pl-1 text-lg text-gray-900  w-1/4"
                                        htmlFor="first_name"

                                    >
                                        ?????????????????????????????????????????? (??????)
                                    </label>
                                    <label
                                        className="ml-5 mb-2 pl-1 text-lg text-gray-900  w-1/4"
                                        htmlFor="first_name"

                                    >
                                        ????????????
                                    </label>



                                </div>
                                <div className="flex flex-row mb-4">
                                    <label
                                        className="ml-2 mb-2 pl-1 font-bold text-lg text-gray-900  w-16"
                                        htmlFor="first_name"
                                    >

                                    </label>

                                    <input
                                        className="ml-2 py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-1/4"
                                        type="text"

                                    />
                                    <input
                                        className="ml-5 py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-1/4"
                                        type="text"

                                    />
                                    <input
                                        className="ml-5 py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-1/4"
                                        type="text"

                                    />

                                </div>
                            </div>
                            <div className="flex flex-col mb-4">
                                <div className="flex flex-row pl-2 mt-5">

                                    <label
                                        className="ml-2 mb-2 pl-1 font-bold text-xl text-gray-900  w-1/16 md:w-16"
                                        htmlFor="first_name"
                                    >

                                    </label>
                                    <label
                                        className="ml-2 mb-2 pl-1 font-bold text-xl text-gray-900  w-full"
                                        htmlFor="first_name"
                                    >
                                        ?????????????????????????????????????????????????????????????????????????????????????????????
                                    </label>
                                </div>
                                <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-16">
                                    </div>


                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5"> ??????????????????????????????????????????</span>
                                        </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">???????????????????????????????????????????????? </span>
                                        </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">??????????????????????????????????????? </span>
                                        </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">??????????????????????????????</span>
                                        </label>
                                    </div>


                                </div>

                                <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-16">
                                    </div>


                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5"> ?????????????????? </span>
                                        </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">??????????????????????????? </span>
                                        </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">???????????? </span>
                                        </label>
                                    </div>



                                </div>
                                <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-16">
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">???????????????</span>
                                            <input
                                                className="ml-5 py-1 px-1 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-1/2"
                                                type="text"

                                            />
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col mb-4">
                                <div className="flex flex-row pl-2 mt-5">

                                    <label
                                        className="ml-2 mb-2 pl-1 font-bold text-xl text-gray-900  w-1/16 md:w-16"
                                        htmlFor="first_name"
                                    >

                                    </label>
                                    <label
                                        className="ml-2 mb-2 pl-1 font-bold text-xl text-gray-900  w-full "
                                        htmlFor="first_name"
                                    >
                                        ?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
                                    </label>
                                </div>
                                <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-16">
                                    </div>


                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">????????????????????????????????? </span>
                                        </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">????????????????????????????????????????????????????????????/???????????????</span>
                                        </label>
                                    </div>

                                </div>
                                <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-16">
                                    </div>


                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">???????????????????????????????????????????????????????????? </span>
                                        </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">??????????????????????????????????????????????????? </span>
                                        </label>
                                    </div>

                                </div>
                                <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-16">
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">?????????????????????????????????????????? </span>
                                        </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">???????????????</span>
                                            <input
                                                className="ml-5 py-1 px-1 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-1/2"
                                                type="text"

                                            />
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col mb-4">
                                <div className="flex flex-row pl-2 mt-5">

                                    <label
                                        className="ml-2 mb-2 pl-1 font-bold text-xl text-gray-900  w-1/16 md:w-16"
                                        htmlFor="first_name"
                                    >

                                    </label>
                                    <label
                                        className="ml-2 mb-2 pl-1 font-bold text-xl text-gray-900  w-full"
                                        htmlFor="first_name"
                                    >
                                        ?????????????????????????????????????????????????????????????????????????????????
                                    </label>
                                </div>
                                <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-16">
                                    </div>


                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">?????????????????? / ?????????????????????</span>
                                        </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">???????????????????????????????????? / ?????????????????? </span>
                                        </label>
                                    </div>

                                </div>
                                <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-16">
                                    </div>


                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">????????????????????????????????? </span>
                                        </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">?????????????????????????????? / ?????????????????? </span>
                                        </label>
                                    </div>

                                </div>
                                <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-16">
                                    </div>


                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">????????????/???????????????</span>
                                        </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">????????????????????? ?????????/??????????????????</span>
                                        </label>
                                    </div>

                                </div>
                                <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-16">
                                    </div>


                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">???????????????????????????????????? </span>
                                        </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">???????????????????????????
                                            </span>
                                        </label>
                                    </div>

                                </div>
                                <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-16">
                                    </div>

                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">???????????????</span>
                                            <input
                                                className="ml-5 py-1 px-1 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-1/2"
                                                type="text"

                                            />
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col mb-4">
                                <div className="flex flex-row pl-2 mt-5">

                                    <label
                                        className="ml-2 mb-2 pl-1 font-bold text-xl text-gray-900  w-1/16 md:w-16"
                                        htmlFor="first_name"
                                    >

                                    </label>
                                    <label
                                        className="ml-2 mb-2 pl-1 font-bold text-xl text-gray-900  w-full"
                                        htmlFor="first_name"
                                    >
                                        ?????????????????????????????????????????????????????????????????????
                                    </label>
                                </div>
                                <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-16">
                                    </div>


                                    <div class="mt-2 flex justify-left w-1/3">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />

                                        </label>
                                        <span class="ml-5">??????????????????????????????????????????????????????????????????????????????????????????</span>
                                    </div>
                                    <div class="mt-2 flex justify-left w-1/3">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded " />

                                        </label>
                                        <span class="ml-5">???????????????????????????????????????????????????????????????????????????????????????????????????????????????</span>
                                    </div>
                                    <div class="mt-2 flex justify-left w-1/3">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />

                                        </label>
                                        <span class="ml-5">????????????????????????????????????????????????????????????????????????????????????????????????</span>
                                    </div>

                                </div>
                                <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-16">
                                    </div>


                                    <div class="mt-2 flex justify-left w-1/3">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded " />

                                        </label>
                                        <span class="ml-5">?????????????????????????????????????????????????????????????????????????????????????????? </span>
                                    </div>
                                    <div class="mt-2 flex justify-left w-1/3">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded " />

                                        </label>
                                        <span class="ml-5">???????????????????????????????????????????????? ???????????? ????????????????????????????????????????????????????????????????????????</span>
                                    </div>
                                    <div class="mt-2 flex justify-left w-1/3">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 " />
                                            <span class="ml-5">???????????????</span>
                                        </label>

                                        <input
                                            className="ml-5 py-1 px-1 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-1/2"
                                            type="text"

                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col mb-4">
                                <div className="flex flex-row pl-2 mt-5">

                                    <label
                                        className="ml-2 mb-2 pl-1 font-bold text-xl text-gray-900  w-1/16 md:w-16"
                                        htmlFor="first_name"
                                    >

                                    </label>
                                    <label
                                        className="ml-2 mb-2 pl-1 font-bold text-xl text-gray-900  w-full"
                                        htmlFor="first_name"
                                    >
                                        ????????????????????????????????????????????????????????????????????????
                                    </label>
                                </div>
                                <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-16">
                                    </div>


                                    <div class="mt-2 flex justify-left w-1/3">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />

                                        </label>
                                        <span class="ml-5">???????????????????????????????????????????????? </span>
                                    </div>
                                    <div class="mt-2 flex justify-left w-1/3">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />

                                        </label>
                                        <span class="ml-5">???????????????????????? ????????????</span>
                                    </div>
                                    <div class="mt-2 flex justify-left w-1/3">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />

                                        </label>
                                        <span class="ml-5">????????????????????????????????????????????????????????????</span>
                                    </div>

                                </div>
                                <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-16">
                                    </div>


                                    <div class="mt-2 flex justify-left w-1/3">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />

                                        </label>
                                        <span class="ml-5">???????????????????????????????????????????????????????????? </span>
                                    </div>
                                    <div class="mt-2 flex justify-left w-1/3">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />

                                        </label>
                                        <span class="ml-5">???????????????????????????????????????????????????????????? </span>
                                    </div>
                                    <div class="mt-2 flex justify-left w-1/3">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">???????????????</span>
                                        </label>

                                    </div>

                                </div>
                            </div>
                            <div className="flex flex-col mb-4">
                                <div className="flex flex-row pl-2 mt-5">

                                    <label
                                        className="ml-2 mb-2 pl-1 font-bold text-xl text-gray-900  w-1/16 md:w-16"
                                        htmlFor="first_name"
                                    >

                                    </label>
                                    <label
                                        className="ml-2 mb-2 pl-1 font-bold text-xl text-gray-900  w-full"
                                        htmlFor="first_name"
                                    >
                                        ??????????????????????????????????????????
                                    </label>
                                </div>
                                <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-16">
                                    </div>


                                    <div class="mt-2 flex justify-left w-1/3">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded " />
                                            <span class="ml-5">????????????????????????????????????????????????????????????</span>
                                        </label>

                                    </div>
                                    <div class="mt-2 flex justify-left w-1/3">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded " />

                                        </label>
                                        <span class="ml-5">??????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????</span>
                                    </div>
                                    <div class="mt-2 flex justify-left w-1/3">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded " />
                                            <span class="ml-5">???????????????????????????</span>
                                        </label>

                                    </div>

                                </div>
                                <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-16">
                                    </div>


                                    <div class="mt-2 flex justify-left w-1/3">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded " />
                                            <span class="ml-3">????????????????????????????????????????????? </span>
                                        </label>

                                    </div>
                                    <div class="mt-2 flex justify-left w-1/3">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded " />

                                        </label>
                                        <span class="ml-3">?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????</span>
                                    </div>
                                    <div class="mt-2 flex justify-left w-1/3">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded " />
                                            <span class="ml-3">??????????????????????????????????????????????????????</span>
                                        </label>

                                    </div>

                                </div>
                            </div>
                            <div className="flex flex-col mb-4">
                                <div className="flex flex-row pl-2 mt-5">

                                    <label
                                        className="ml-2 mb-2 pl-1 font-bold text-xl text-gray-900  w-1/16 md:w-16"
                                        htmlFor="first_name"
                                    >

                                    </label>
                                    <label
                                        className="ml-2 mb-2 pl-1 font-bold text-xl text-gray-900  w-full"
                                        htmlFor="first_name"
                                    >
                                        ???????????????????????????
                                    </label>
                                </div>
                                <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-16">
                                    </div>


                                    <div class="mt-2 flex justify-left w-1/3">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">???????????????????????????????????????????????? 1 ????????????????????? </span>
                                        </label>

                                    </div>
                                    <div class="mt-2 flex justify-left w-1/3">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                        </label>
                                        <span class="ml-5">????????????????????????????????????????????????????????????????????????????????????????????????</span>
                                    </div>
                                    <div class="mt-2 flex justify-left w-1/3">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                        </label>
                                        <span class="ml-5">????????????????????? ????????????????????????????????????????????????????????????</span>
                                    </div>

                                </div>
                                <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-16">
                                    </div>


                                    <div class="mt-2 flex justify-left w-1/3">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">??????????????????????????????????????????????????????</span>
                                        </label>
                                    </div>
                                    <div class="mt-2 flex justify-left w-1/3">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">???????????????????????????????????????????????????????????????????????? </span>
                                        </label>
                                    </div>
                                    <div class="mt-2 flex justify-left w-1/3">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />

                                        </label>
                                        <span class="ml-5">?????????????????????????????????????????????????????????????????????????????????????????????</span>
                                    </div>

                                </div>
                                <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-16">
                                    </div>


                                    <div class="mt-2 flex justify-left w-1/3">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />

                                        </label>
                                        <span class="ml-5">?????????????????????????????????????????????????????? 2 ?????????????????????</span>
                                    </div>
                                    <div class="mt-2 flex justify-left w-1/3">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />

                                        </label>
                                        <span class="ml-5">????????????????????? ????????????????????????????????????????????????????????? </span>
                                    </div>
                                    <div class="mt-2 flex justify-left w-1/3">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />

                                        </label>
                                        <span class="ml-5">??????????????????????????????????????????????????? ???????????? ?????????????????????????????????????????????????????????????????????</span>
                                    </div>


                                </div>
                                <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-16">
                                    </div>
                                    <div class="mt-2 flex justify-left w-1/3">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">???????????????</span>
                                            <input
                                                className="ml-5 py-1 px-1 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-2/4"
                                                type="text"

                                            />
                                        </label>
                                    </div>
                                    <div class="mt-2 flex justify-left w-1/3">

                                    </div>
                                    <div class="mt-2 flex justify-left w-1/3">

                                    </div>

                                </div>

                            </div>
                            <div className="flex flex-col mb-4">
                                <div className="flex flex-row pl-2 mt-5">

                                    <label
                                        className="ml-2 mb-2 pl-1 font-bold text-xl text-gray-900  w-1/16 md:w-16"
                                        htmlFor="first_name"
                                    >

                                    </label>
                                    <label
                                        className="ml-2 mb-2 pl-1 font-bold text-xl text-gray-900  w-full"
                                        htmlFor="first_name"
                                    >
                                        ?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
                                    </label>
                                </div>
                                <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-16">
                                    </div>


                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">??????????????????????????????????????? Internet ???????????????????????????????????????</span>
                                        </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">???????????????????????????????????????????????? Internet ??????????????????????????????????????? </span>
                                        </label>
                                    </div>


                                </div>
                            </div>
                            <div className="flex flex-col mb-4">
                                <div className="flex flex-row pl-2 mt-5">

                                    <label
                                        className="ml-2 mb-2 pl-1 font-bold text-xl text-gray-900  w-1/16 md:w-16"
                                        htmlFor="first_name"
                                    >

                                    </label>
                                    <label
                                        className="ml-2 mb-2 pl-1 font-bold text-xl text-gray-900  w-full"
                                        htmlFor="first_name"
                                    >
                                        ???????????????????????????????????????????????????????????????????????????????????????????????????????????????
                                    </label>
                                </div>
                                <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-16">
                                    </div>

                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">????????? Social media/game (???????????????????????????????????? 3 ?????????????????????)</span>
                                        </label>
                                    </div>


                                </div>
                                <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-16">
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">????????? Social media/game (??????????????? 3 ???????????????????????????????????????)</span>
                                        </label>
                                    </div>


                                </div>
                            </div>
                            <div className="flex flex-col mb-4">
                                <div className="flex flex-row pl-2 mt-5">

                                    <label
                                        className="ml-2 mb-2 pl-1 font-bold text-xl text-gray-900  w-1/16 md:w-16"
                                        htmlFor="first_name"
                                    >

                                    </label>
                                    <label
                                        className="ml-2 mb-2 pl-1 font-bold text-xl text-gray-900  w-full"
                                        htmlFor="first_name"
                                    >
                                        ????????????????????????????????????????????????????????????
                                    </label>
                                </div>
                                <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-16">
                                    </div>

                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">???????????? </span>
                                        </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">???????????????</span>
                                        </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">??????????????????</span>
                                        </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">??????????????????</span>
                                        </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">?????????</span>
                                        </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">?????? </span>
                                        </label>
                                    </div>



                                </div>
                                <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-16">
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">?????????</span>
                                        </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">?????????</span>
                                        </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">?????????</span>
                                        </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">?????????</span>
                                        </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">?????? </span>
                                        </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">?????????</span>
                                        </label>
                                    </div>


                                </div>
                                <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-16">
                                    </div>

                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">?????????</span>
                                        </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">??????????????????????????? </span>
                                        </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">??????????????????????????? </span>
                                        </label>
                                    </div>


                                </div>
                            </div>
                            <div className="flex flex-col pl-2 mt-10">
                                <div className="   text-xl text-center  w-full">
                                    ???????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
                                </div>
                            </div>
                            <div className="flex flex-col mb-4 mt-5">
                                <div className="flex flex-row  ">
                                    <label
                                        className="ml-2 mb-2 pl-1 font-bold text-lg text-gray-900  w-16"
                                        htmlFor="first_name"
                                    >

                                    </label>
                                    <label
                                        className="ml-2 mb-2 pl-1 font-bold text-lg text-gray-900  w-16"
                                        htmlFor="first_name"
                                    >
                                        ????????????????????????
                                    </label>

                                    <label
                                        className="ml-5 mb-2 pl-1 font-bold text-lg text-gray-900  w-1/6
                                        "
                                        htmlFor="first_name"
                                    >
                                        ????????????
                                    </label>

                                    <label
                                        className="ml-5 mb-2 pl-1 font-bold text-lg text-gray-900  w-1/6"
                                        htmlFor="first_name"
                                    >
                                        ?????????????????????
                                    </label>
                                    <label
                                        className="ml-5 mb-2 pl-1 font-bold text-lg text-gray-900  w-16"
                                        htmlFor="first_name"
                                    >
                                        ??????????????????
                                    </label>
                                    <label
                                        className="ml-1 mb-2 pl-1 font-bold text-lg text-gray-900  w-16"
                                        htmlFor="first_name"
                                    >
                                        ????????????
                                    </label>
                                    <label
                                        className="ml-5 mb-2 pl-1 font-bold text-lg text-gray-900  w-1/6"
                                        htmlFor="first_name"
                                    >
                                        ???????????????????????????????????????
                                    </label>
                                </div>
                                <div className="flex flex-row mb-4">
                                    <label
                                        className="ml-2 mb-2 pl-1 font-bold text-lg text-gray-900  w-16"
                                        htmlFor="first_name"
                                    >

                                    </label>
                                    <input
                                        className="ml-2 py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-16"
                                        type="text"

                                    />

                                    <input
                                        className="ml-5 py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-1/6"
                                        type="text"

                                    />

                                    <input
                                        className="ml-5 py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-1/6"
                                        type="text"

                                    />
                                    <input
                                        className="ml-5 py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-16"
                                        type="text"

                                    />

                                    <input
                                        className="ml-1 py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-16"
                                        type="text"

                                    />

                                    <input
                                        className="ml-5 py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-1/6"
                                        type="text"

                                    />
                                </div>



                            </div>
                            <div className="flex flex-col mb-4">
                                <div className="flex flex-row pl-2 ">

                                    <label
                                        className=" mb-2 pl-1 font-bold text-xl text-gray-900  w-16"
                                        htmlFor="first_name"
                                    >

                                    </label>
                                    <label
                                        className="ml-5 mb-2 pl-1 text-lg text-gray-900  w-1/4"
                                        htmlFor="first_name"

                                    >
                                        ?????????????????????
                                    </label>
                                </div>
                                <div class="flex flex-row pl-2 mt-3">
                                    <label
                                        className="ml-2 mb-2 pl-1 font-bold text-xl text-gray-900  w-16"
                                        htmlFor="first_name"
                                    >

                                    </label>
                                    <textarea
                                        id="message"
                                        rows="4"
                                        class="block p-2.5 ml-2
                                w-1/2 
                                text-sm 
                                text-gray-900 
                                bg-gray-50 
                                rounded-lg 
                                border 
                                border-gray-300 
                                focus:ring-blue-500 
                                focus:border-blue-500 
                                dark:bg-gray-700 
                                dark:border-gray-600 
                                dark:placeholder-gray-400 
                                dark:text-white 
                                dark:focus:ring-blue-500 
                                dark:focus:border-blue-500"
                                        placeholder="Your message...">
                                    </textarea>
                                </div>
                            </div>
                            <div className="flex flex-col mb-4">


                                <div className="flex flex-row w-full  mt-3">
                                    <label
                                        className="ml-2 mb-2 pl-1 font-bold text-lg text-gray-900  w-16"
                                        htmlFor="first_name"
                                    >

                                    </label>
                                    <label
                                        className="ml-2 mb-2 pl-1 text-lg text-gray-900  w-full"
                                        htmlFor="first_name"

                                    >
                                        ????????????????????????????????????????????????(???????????? ?????????????????????????????????,?????????????????????????????????????????????-?????????????????????)
                                    </label>



                                </div>
                                <div className="flex flex-row mb-4">
                                    <label
                                        className="ml-2 mb-2 pl-1 font-bold text-lg text-gray-900  w-16"
                                        htmlFor="first_name"
                                    >

                                    </label>

                                    <input
                                        className="ml-2 py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-1/4"
                                        type="text"

                                    />


                                </div>
                            </div>
                            <div className="flex flex-col mb-4">

                                <div className="flex flex-row w-full  mt-3">
                                    <label
                                        className="ml-2 mb-2 pl-1 font-bold text-lg text-gray-900  w-16"
                                        htmlFor="first_name"
                                    >

                                    </label>
                                    <label
                                        className="ml-2 mb-2 pl-1 text-lg text-gray-900  w-full"
                                        htmlFor="first_name"

                                    >
                                        ??????????????????????????? ??????????????????????????????????????????????????????
                                    </label>



                                </div>
                                <div className="flex flex-row mb-4">
                                    <label
                                        className="ml-2 mb-2 pl-1 font-bold text-lg text-gray-900  w-16"
                                        htmlFor="first_name"
                                    >

                                    </label>

                                    <div class="mt-2 flex justify-left">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">??????????????????????????????????????????????????????????????????????????? (?????????????????????????????????/????????????) </span>
                                        </label>
                                    </div>


                                </div>
                                <div className="flex flex-row mb-4">
                                    <label
                                        className="ml-2 mb-2 pl-1 font-bold text-lg text-gray-900  w-16"
                                        htmlFor="first_name"
                                    >

                                    </label>

                                    <div class="mt-2 flex justify-left">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">?????????????????????????????????/?????????????????????????????????????????????????????????????????? </span>
                                        </label>
                                    </div>


                                </div>
                                <div className="flex flex-row mb-4">
                                    <label
                                        className="ml-2 mb-2 pl-1 font-bold text-lg text-gray-900  w-16"
                                        htmlFor="first_name"
                                    >

                                    </label>

                                    <div class="mt-2 flex justify-left">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">???????????????????????????????????????????????????????????? ????????? ????????????????????? ??????????????? ?????????????????? ??????????????????????????????????????????</span>
                                        </label>
                                    </div>


                                </div>
                                <div className="flex flex-row mb-4">
                                    <label
                                        className="ml-2 mb-2 pl-1 font-bold text-lg text-gray-900  w-16"
                                        htmlFor="first_name"
                                    >

                                    </label>

                                    <div class="mt-2 flex justify-left w-1/2">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded " />

                                        </label>
                                        <span class="ml-5 ">?????????????????????????????????????????????????????????????????????????????????????????? ?????????????????????????????????????????????????????????????????????????????? ??????????????????????????? ???????????????????????????????????????????????????/?????????????????????????????????/?????????????????????????????? ??????????????????????????????????????????????????????????????????????????????????????? </span>

                                    </div>


                                </div>
                            </div>
                            <div className="flex flex-col mb-4">

                                <div className="flex flex-row w-full  mt-3">
                                    <label
                                        className="ml-2 mb-2 pl-1 font-bold text-lg text-gray-900  w-16"
                                        htmlFor="first_name"
                                    >

                                    </label>
                                    <label
                                        className="ml-2 mb-2 pl-1 text-lg text-gray-900  w-1/2"
                                        htmlFor="first_name"

                                    >
                                        ?????????????????? 1 ?????????????????????????????????????????????????????????????????????
                                    </label>
                                    <label
                                        className="ml-2 mb-2 pl-1 text-lg text-gray-900  w-1/2"
                                        htmlFor="first_name"

                                    >
                                        ?????????????????? 2 ??????????????????????????????????????????????????????????????????????????????????????????????????????????????????
                                    </label>



                                </div>

                                <div className="flex flex-row mb-4">
                                    <label
                                        className="ml-2 mb-2 pl-1 font-bold text-lg text-gray-900  w-16"
                                        htmlFor="first_name"
                                    >

                                    </label>


                                    <input
                                        className="ml-2 py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-1/2"

                                        onChange={(e) => imageadd(e.target.files[0])} type="file" id="myfile"
                                    />
                                    <label
                                        className="ml-2 mb-2 pl-1 font-bold text-lg text-gray-900  w-16"
                                        htmlFor="first_name"
                                    >

                                    </label>
                                    <input
                                        className="ml-2 py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-1/2"

                                        onChange={(e) => imageadd(e.target.files[0])} type="file" id="myfile"
                                    />
                                    <label
                                        className="ml-2 mb-2 pl-1 font-bold text-lg text-gray-900  w-16"
                                        htmlFor="first_name"
                                    >

                                    </label>
                                </div>
                            </div>
                        </div>
                        <Footer></Footer>
                    </div>
                </main>

            </div >
        </div >
    );
}

export default homevisit;
