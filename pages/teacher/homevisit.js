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
                                    ข้อมูลของนักเรียน
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
                                        คำนำหน้า
                                    </label>

                                    <label
                                        className="ml-5 mb-2 pl-1 font-bold text-lg text-gray-900  w-1/6
                                        "
                                        htmlFor="first_name"
                                    >
                                        ชื่อ
                                    </label>

                                    <label
                                        className="ml-5 mb-2 pl-1 font-bold text-lg text-gray-900  w-1/6"
                                        htmlFor="first_name"
                                    >
                                        นามสกุล
                                    </label>
                                    <label
                                        className="ml-5 mb-2 pl-1 font-bold text-lg text-gray-900  w-16"
                                        htmlFor="first_name"
                                    >
                                        เลขที่
                                    </label>
                                    <label
                                        className="ml-1 mb-2 pl-1 font-bold text-lg text-gray-900  w-16"
                                        htmlFor="first_name"
                                    >
                                        ชั้น
                                    </label>
                                    <label
                                        className="ml-5 mb-2 pl-1 font-bold text-lg text-gray-900  w-1/6"
                                        htmlFor="first_name"
                                    >
                                        เบอร์โทรศัพท์
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
                                        คำนำหน้า
                                    </label>

                                    <label
                                        className="ml-5 mb-2 pl-1 font-bold text-lg text-gray-900  w-1/6
                                        "
                                        htmlFor="first_name"
                                    >
                                        ชื่อ(บิดา)
                                    </label>

                                    <label
                                        className="ml-5 mb-2 pl-1 font-bold text-lg text-gray-900  w-1/6"
                                        htmlFor="first_name"
                                    >
                                        นามสกุล
                                    </label>

                                    <label
                                        className="ml-5 mb-2 pl-1 font-bold text-lg text-gray-900  w-1/6"
                                        htmlFor="first_name"
                                    >
                                        เบอร์โทรศัพท์
                                    </label>
                                    <label
                                        className="ml-6 mb-2 pl-1 font-bold text-lg text-gray-900  w-1/6"
                                        htmlFor="first_name"
                                    >
                                        อาชีพ
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
                                        คำนำหน้า
                                    </label>

                                    <label
                                        className="ml-5 mb-2 pl-1 font-bold text-lg text-gray-900  w-1/6
                                        "
                                        htmlFor="first_name"
                                    >
                                        ชื่อ(มารดา)
                                    </label>

                                    <label
                                        className="ml-5 mb-2 pl-1 font-bold text-lg text-gray-900  w-1/6"
                                        htmlFor="first_name"
                                    >
                                        นามสกุล
                                    </label>

                                    <label
                                        className="ml-5 mb-2 pl-1 font-bold text-lg text-gray-900  w-1/6"
                                        htmlFor="first_name"
                                    >
                                        เบอร์โทรศัพท์
                                    </label>
                                    <label
                                        className="ml-5 mb-2 pl-1 font-bold text-lg text-gray-900  w-1/6"
                                        htmlFor="first_name"
                                    >
                                        อาชีพ
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
                                        สถานะภาพบิดา-มารดา
                                    </div>
                                </div>

                                <div class="flex flex-row pl-2">
                                    <div className="  ml-10 text-xl text-left  w-16">
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">อยู่ร่วมกัน</span>
                                        </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">แยกกันอยู่</span>
                                        </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">หย่าร้าง</span>
                                        </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">บิดาเสียชีวิต</span>
                                        </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">มารดาเสียชีวิต</span>
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
                                        ชื่อผู้ปกครองนักเรียน(กรณีไม่ใช่บิดา-มารดา)ความสัมพันธ์ของผู้ปกครองกับนักเรียน
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
                                        คำนำหน้า
                                    </label>

                                    <label
                                        className="ml-5 mb-2 pl-1 font-bold text-lg text-gray-900  w-1/6
                                        "
                                        htmlFor="first_name"
                                    >
                                        ชื่อ
                                    </label>

                                    <label
                                        className="ml-5 mb-2 pl-1 font-bold text-lg text-gray-900  w-1/6"
                                        htmlFor="first_name"
                                    >
                                        นามสกุล
                                    </label>

                                    <label
                                        className="ml-5 mb-2 pl-1 font-bold text-lg text-gray-900  w-1/6"
                                        htmlFor="first_name"
                                    >
                                        เบอร์โทรศัพท์
                                    </label>
                                    <label
                                        className="ml-5 mb-2 pl-1 font-bold text-lg text-gray-900  w-1/6"
                                        htmlFor="first_name"
                                    >
                                        อาชีพ
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
                                        ความสัมพันธ์ในครอบครัว
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
                                        จำนวนสมาชิกในครัวเรือน (รวมตัวนักเรียน)
                                    </label>

                                    <label
                                        className="ml-5 mb-2 pl-1 text-lg text-gray-900  w-1/4"
                                        htmlFor="first_name"

                                    >
                                        สมาชิกในครอบครัวมีเวลาอยู่ร่วมกันกี่ชั่วโมงต่อวัน(ชั่วโมง/วัน   )
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
                                        ความสัมพันธ์ระหว่างนักเรียนกับสมาชิกในครอบครัว
                                    </label>


                                </div>
                                <div className="flex flex-row pl-2">
                                    <div className="  ml-2 text-xl text-left  w-16">
                                    </div>
                                    <div className="   text-xl text-left mt-3 w-1/4">
                                        บิดา
                                    </div>
                                </div>
                                <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-16">
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">สนิทสนม</span>
                                        </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">เฉย ๆ</span>
                                        </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class=" w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">ห่างเหิน</span>
                                        </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">ขัดแย้ง</span>
                                        </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">ไม่มี</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col mb-4">
                                <div className="flex flex-row pl-2  ">
                                    <div className="  ml-2 text-xl text-left  w-16">
                                    </div>
                                    <div className="   text-xl text-left mt-3 w-1/4">
                                        มารดา
                                    </div>
                                </div>
                                <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-16">
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">สนิทสนม</span>
                                        </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">เฉย ๆ</span>
                                        </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">ห่างเหิน</span>
                                        </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">ขัดแย้ง</span>
                                        </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">ไม่มี</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col mb-4">
                                <div className="flex flex-row pl-2">
                                    <div className="  ml-2 text-xl text-left  w-16">
                                    </div>
                                    <div className="   text-xl text-left mt-3 w-1/4">
                                        พี่ชาย/น้องชาย
                                    </div>
                                </div>
                                <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-16">
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">สนิทสนม</span>
                                        </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">เฉย ๆ</span>
                                        </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class=" w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">ห่างเหิน</span>
                                        </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">ขัดแย้ง</span>
                                        </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">ไม่มี</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col mb-4">
                                <div className="flex flex-row pl-2">
                                    <div className="  ml-2 text-xl text-left  w-16">
                                    </div>
                                    <div className="   text-xl text-left mt-3 w-1/4">
                                        พี่สาว/น้องสาว
                                    </div>
                                </div>
                                <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-16">
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">สนิทสนม</span>
                                        </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">เฉย ๆ</span>
                                        </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class=" w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">ห่างเหิน</span>
                                        </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">ขัดแย้ง</span>
                                        </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">ไม่มี</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col mb-4">
                                <div className="flex flex-row pl-2">
                                    <div className="  ml-2 text-xl text-left  w-16">
                                    </div>
                                    <div className="   text-xl text-left mt-3 w-1/4">
                                        ปู่/ย่า/ตา/ยาย
                                    </div>
                                </div>
                                <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-16">
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">สนิทสนม</span>
                                        </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">เฉย ๆ</span>
                                        </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class=" w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">ห่างเหิน</span>
                                        </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">ขัดแย้ง</span>
                                        </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">ไม่มี</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col mb-4">
                                <div className="flex flex-row pl-2">
                                    <div className="  ml-2 text-xl text-left  w-16">
                                    </div>
                                    <div className="   text-xl text-left mt-3 w-1/4">
                                        ญาติ
                                    </div>
                                </div>
                                <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-16">
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">สนิทสนม</span>
                                        </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">เฉย ๆ</span>
                                        </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">ห่างเหิน</span>
                                        </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">ขัดแย้ง</span>
                                        </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">ไม่มี</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col mb-4">
                                <div className="flex flex-row pl-2">
                                    <div className="  ml-2 text-xl text-left  w-16">
                                    </div>
                                    <div className="   text-xl text-left mt-3 w-1/4">
                                        อื่นๆ
                                    </div>
                                </div>
                                <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-16">
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">สนิทสนม</span>
                                        </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">เฉย ๆ</span>
                                        </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">ห่างเหิน</span>
                                        </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">ขัดแย้ง</span>
                                        </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">ไม่มี</span>
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
                                        กรณีผู้ปกครองไม่อยู่บ้าน ฝากนักเรียนอยู่บ้านกับใคร
                                    </label>
                                </div>
                                <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-16">
                                    </div>

                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">ญาติ</span>
                                        </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">เพื่อนบ้าน</span>
                                        </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">นักเรียนอยู่บ้านด้วยตนเอง</span>
                                        </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">อื่น ๆ</span>
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
                                        รายได้รวมของครัวเรือน
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
                                        นักเรียนได้ค่าใช้จ่ายจาก
                                    </label>
                                    <label
                                        className="ml-5 mb-2 pl-1 text-lg text-gray-900  w-1/4"
                                        htmlFor="first_name"

                                    >
                                        นักเรียนได้เงินมาโรงเรียนวันละ
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
                                        นักเรียนหารายได้พิเศษ (อาชีพ)
                                    </label>
                                    <label
                                        className="ml-5 mb-2 pl-1 text-lg text-gray-900  w-1/4"
                                        htmlFor="first_name"

                                    >
                                        รายได้วันละ
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
                                        สิ่งที่ผู้ปกครองต้องการให้โรงเรียนช่วยเหลือนักเรียน
                                    </label>
                                </div>
                                <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-16">
                                    </div>

                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded md:w-6 md:h-6" />
                                            <span class="ml-5">ด้านการเรียน</span>
                                        </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded md:w-6 md:h-6" />
                                            <span class="ml-5">ด้านพฤติกรรม</span>
                                        </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded md:w-6 md:h-6" />
                                            <span class="ml-5">ด้านเศรษฐกิจ</span>
                                        </label>

                                    </div>
                                    <div class="mt-2 flex justify-center ">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">อื่น ๆ</span>
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
                                        ความช่วยเหลือที่ครอบครัวเคยได้รับจากหน่วยงานหรือต้องการได้รับการช่วยเหลือ
                                    </label>
                                </div>
                                <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-16">
                                    </div>

                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">เบี้ยผู้สูงอาย</span>
                                        </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">เบี้ยพิการ </span>
                                        </label>
                                    </div>

                                    <div class="mt-2 flex justify-center ">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">อื่นๆ</span>
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
                                        ความห่วงใยของผู้ปกครองที่มีต่อนักเรียน

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
                                        สถานะของครัวเรือน กรอกเฉพาะบุคคลที่อาศัยในบ้านปัจจุบัน
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
                                        ครัวเรือนมีภาระพึ่งพิง ดังนี้
                                    </label>
                                </div>
                                <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-16">
                                    </div>

                                    <div class="mt-2 flex justify-left w-1/3">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">มีคนพิการ</span>
                                        </label>
                                    </div>
                                    <div class="mt-2 flex justify-left w-1/3">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">ผู้สูงอายุเกิน 60 ปี</span>
                                        </label>
                                    </div>


                                </div>
                                <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-16">
                                    </div>

                                    <div class="mt-2 flex justify-left w-1/3">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">เป็นพ่อ/แม่เลี้ยงเดี่ยว</span>
                                        </label>
                                    </div>
                                    <div class="mt-2 flex justify-left w-1/3">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                        </label>
                                        <span class="ml-5">มีคนอายุ 15-65 ปีว่างงาน (ที่ไม่ใช่นักเรียน/นักศึกษา)</span>

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
                                        ประเภทที่อยู่อาศัย ดังนี
                                    </label>
                                </div>
                                <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-16">
                                    </div>

                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">บ้านของตนเอง </span>
                                        </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">บ้านเช่า</span>
                                        </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">อาศัยอยู่กับผู้อื่น</span>
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
                                        สภาพที่อยู่อาศัย ดังนี้
                                    </label>
                                </div>
                                <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-16">
                                    </div>

                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">สภาพบ้านชำรุดทรุดโทรม หรือ บ้านทำจากวัสดุพื้นบ้าน เช่น ไม้ไผ่ ใบจากหรือวัสดุเหลือใช้ </span>
                                        </label>
                                    </div>



                                </div>
                                <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-16">
                                    </div>


                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">ไม่มีห้องส้วมในที่อยู่อาศัยและบริเวณ</span>
                                        </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">อื่น ๆ</span>
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
                                        ยานพาหนะของครอบครัว (ตอบได้มำกกว่ำ 1 ข้อ)

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
                                        รถมอเตอร์ไซค์
                                    </label>
                                </div>
                                <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-16">
                                    </div>


                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">มี</span>
                                        </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">ไม่มี</span>
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
                                        รถยนตร์ส่วนบุคคล
                                    </label>
                                </div>
                                <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-16">
                                    </div>


                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">มี</span>
                                        </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">ไม่มี</span>
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
                                        รถบรรทุกเล็ก/รถตู้
                                    </label>
                                </div>
                                <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-16">
                                    </div>


                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">มี</span>
                                        </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">ไม่มี</span>
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
                                        รถไถ/เกี่ยวข้าว/รถอีแต๋น/รถอื่นๆ ประเภทเดียวกัน
                                    </label>
                                </div>
                                <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-16">
                                    </div>


                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">มี</span>
                                        </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">ไม่มี</span>
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
                                        เป็นเกษตรกร มีที่ดินทำกิน (รวมเช่า)
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
                                        มีที่ดินทำกิน
                                    </label>
                                </div>
                                <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-16">
                                    </div>


                                    <div class="mt-2 flex justify-left w-1/6">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">ไม่เกิน 1 ไร่</span>
                                        </label>
                                    </div>
                                    <div class="mt-2 flex justify-left w-1/3">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">ไม่มีที่ดินเป็นของตนเอง
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
                                            <span class="ml-5">เป็นเจ้าของ จำนวน </span>
                                            <input
                                                className="ml-2 py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-2/12"
                                                type="text"

                                            />
                                            <span class="ml-5">ไร่ </span>
                                        </label>
                                    </div>

                                </div>
                                <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-16">
                                    </div>


                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">เช่าจำนวน </span>
                                            <input
                                                className="ml-2 py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-2/12"
                                                type="text"

                                            />
                                            <span class="ml-5">ไร่ </span>
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
                                        พฤติกรรมและความเสี่ยง
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
                                        สุขภาพ
                                    </label>
                                </div>
                                <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-16">
                                    </div>


                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">ร่างกายไม่แข็งแรง</span>
                                        </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">มีโรคประจำตัวหรือเจ็บป่วยบ่อย</span>
                                        </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">มีภาวะทุพโภชนาการ</span>
                                        </label>
                                    </div>

                                </div>

                                <div class="flex flex-row  pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-16">
                                    </div>


                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">ป่วยเป็นโรคร้ายแรง/เรื้อรัง</span>
                                        </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">สมรรถภาพทางร่างกายต่ำ</span>
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
                                        สวัสดิการหรือความปลอดภัย
                                    </label>
                                </div>
                                <div class="flex flex-row  pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-16">
                                    </div>


                                    <div class="mt-2 flex justify-left pl-50 w-1/2">
                                        <label class="inline-flex items-center ">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">พ่อแม่แยกทางกัน หรือ แต่งงานใหม่</span>
                                        </label>
                                    </div>
                                    <div class="mt-2 flex justify-left w-1/2">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">เล่นการพนัน</span>
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
                                        <span class="ml-5">มีบุคคลในครอบครัวเจ็บป่วยด้วยโรคร้ายแรง/เรื้อรัง/ติดต่อ</span>
                                    </div>
                                    <div class="mt-2 flex justify-left w-1/2">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">บุคคลในครอบครัวติดสารเสพติด</span>
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
                                        <span class="ml-5">บุคคลในครอบครัวเล่นการพนัน</span>
                                    </div>
                                    <div class="mt-2 flex justify-left w-1/2">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />

                                        </label>
                                        <span class="ml-5">มีความขัดแย้ง/ทะเลาะกันในครอบครัว
                                        </span>
                                    </div>


                                </div>
                                <div class="flex flex-row   pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-16">
                                    </div>


                                    <div class="mt-2 flex justify-left w-1/2">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">ไม่มีผู้ดูแล </span>
                                        </label>
                                    </div>
                                    <div class="mt-2 flex justify-left w-1/2">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />

                                        </label>
                                        <span class="ml-5">ความขัดแย้งและมีการใช้ความรุนแรงในครอบครัว
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
                                        <span class="ml-5">ถูกทารุณ/ทำร้ายจากบุคคลในครอบครัว/เพื่อนบ้าน</span>
                                    </div>
                                    <div class="mt-2 flex justify-left w-1/2">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                        </label>
                                        <span class="ml-5">ถูกล่วงละเมิดทางเพศ</span>
                                    </div>


                                </div>
                                <div class="flex flex-row  pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-16">
                                    </div>


                                    <div class="mt-2 flex justify-left w-1/2">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />

                                        </label>
                                        <span class="ml-5">พักอาศัยอยู่ในชุมชนแออัดหรือใกล้แหล่งมั่วสุม/สถานเริงรมย์</span>
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
                                        ระยะทางระหว่างบ้านไปโรงเรียน
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
                                        ระยะทางระหว่างบ้านไปโรงเรียน
                                    </label>

                                    <label
                                        className="ml-5 mb-2 pl-1 text-lg text-gray-900  w-1/4"
                                        htmlFor="first_name"

                                    >
                                        ใช้เวลาเดินทาง (ชม)
                                    </label>
                                    <label
                                        className="ml-5 mb-2 pl-1 text-lg text-gray-900  w-1/4"
                                        htmlFor="first_name"

                                    >
                                        นาที
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
                                        การเดินทางของนักเรียนไปโรงเรียน
                                    </label>
                                </div>
                                <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-16">
                                    </div>


                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5"> ผู้ปกครองมาส่ง</span>
                                        </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">รถโดยสารประจำทาง </span>
                                        </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">รถจักรยานยนต์ </span>
                                        </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">รถโรงเรียน</span>
                                        </label>
                                    </div>


                                </div>

                                <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-16">
                                    </div>


                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5"> รถยนต์ </span>
                                        </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">รถจักรยาน </span>
                                        </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">เดิน </span>
                                        </label>
                                    </div>



                                </div>
                                <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-16">
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">อื่นๆ</span>
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
                                        ภาระงานความรับผิดชอบของนักเรียนที่มีต่อครอบครัว
                                    </label>
                                </div>
                                <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-16">
                                    </div>


                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">ช่วยงานบ้าน </span>
                                        </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">ช่วยคนดูแลคนเจ็บป่วย/พิการ</span>
                                        </label>
                                    </div>

                                </div>
                                <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-16">
                                    </div>


                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">ช่วยค้าขายเล็กๆน้อยๆ </span>
                                        </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">ทำงานพิเศษแถวบ้าน </span>
                                        </label>
                                    </div>

                                </div>
                                <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-16">
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">ช่วยงานในนาไร่ </span>
                                        </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">อื่นๆ</span>
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
                                        กิจกรรมยามว่างหรืองานอดิเรก
                                    </label>
                                </div>
                                <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-16">
                                    </div>


                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">ดูทีวี / ฟังเพลง</span>
                                        </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">ไปเที่ยวห้าง / ดูหนัง </span>
                                        </label>
                                    </div>

                                </div>
                                <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-16">
                                    </div>


                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">อ่านหนังสือ </span>
                                        </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">ไปหาเพื่อน / เพื่อน </span>
                                        </label>
                                    </div>

                                </div>
                                <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-16">
                                    </div>


                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">แว้น/สก๊อย</span>
                                        </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">เล่นเกม คอม/มือถือ</span>
                                        </label>
                                    </div>

                                </div>
                                <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-16">
                                    </div>


                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">ไปสวนสาธารณะ </span>
                                        </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">เล่นดนตรี
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
                                            <span class="ml-5">อื่นๆ</span>
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
                                        พฤติกรรมการใช้สารเสพติด
                                    </label>
                                </div>
                                <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-16">
                                    </div>


                                    <div class="mt-2 flex justify-left w-1/3">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />

                                        </label>
                                        <span class="ml-5">คบเพื่อนในกลุ่มที่ใช้สารเสพติด</span>
                                    </div>
                                    <div class="mt-2 flex justify-left w-1/3">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded " />

                                        </label>
                                        <span class="ml-5">สมาชิกในครอบครัวข้องเกี่ยวกับยาเสพติด</span>
                                    </div>
                                    <div class="mt-2 flex justify-left w-1/3">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />

                                        </label>
                                        <span class="ml-5">อยู่ในสภาพแวดล้อมที่ใช้สารเสพติด</span>
                                    </div>

                                </div>
                                <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-16">
                                    </div>


                                    <div class="mt-2 flex justify-left w-1/3">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded " />

                                        </label>
                                        <span class="ml-5">ปัจจุบันเกี่ยวข้องกับสารเสพติด </span>
                                    </div>
                                    <div class="mt-2 flex justify-left w-1/3">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded " />

                                        </label>
                                        <span class="ml-5">เป็นผู้ติดบุหรี่ สุรา หรือการใช้สารเสพติดอื่นๆ</span>
                                    </div>
                                    <div class="mt-2 flex justify-left w-1/3">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 " />
                                            <span class="ml-5">อื่นๆ</span>
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
                                        พฤติกรรมการใช้ความรุนแรง
                                    </label>
                                </div>
                                <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-16">
                                    </div>


                                    <div class="mt-2 flex justify-left w-1/3">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />

                                        </label>
                                        <span class="ml-5">มีการทะเลาะวิวาท </span>
                                    </div>
                                    <div class="mt-2 flex justify-left w-1/3">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />

                                        </label>
                                        <span class="ml-5">ก้าวร้าว เกเร</span>
                                    </div>
                                    <div class="mt-2 flex justify-left w-1/3">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />

                                        </label>
                                        <span class="ml-5">ทะเลาะวิวาทเป็นประจำ</span>
                                    </div>

                                </div>
                                <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-16">
                                    </div>


                                    <div class="mt-2 flex justify-left w-1/3">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />

                                        </label>
                                        <span class="ml-5">ทำร้ายร่างกายผู้อื่น </span>
                                    </div>
                                    <div class="mt-2 flex justify-left w-1/3">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />

                                        </label>
                                        <span class="ml-5">ทำร้ายร่างกายผู้อื่น </span>
                                    </div>
                                    <div class="mt-2 flex justify-left w-1/3">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">อื่นๆ</span>
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
                                        พฤติกรรมทางเพศ
                                    </label>
                                </div>
                                <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-16">
                                    </div>


                                    <div class="mt-2 flex justify-left w-1/3">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded " />
                                            <span class="ml-5">อยู่ในกลุ่มขายบริการ</span>
                                        </label>

                                    </div>
                                    <div class="mt-2 flex justify-left w-1/3">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded " />

                                        </label>
                                        <span class="ml-5">ใช้เครื่องมือสื่อสารที่เกี่ยวข้องกับด้านเพศเป็นเวลานานและบ่อยครั้ง</span>
                                    </div>
                                    <div class="mt-2 flex justify-left w-1/3">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded " />
                                            <span class="ml-5">ตั้งครรภ์</span>
                                        </label>

                                    </div>

                                </div>
                                <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-16">
                                    </div>


                                    <div class="mt-2 flex justify-left w-1/3">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded " />
                                            <span class="ml-3">ขายบริการทางเพศ </span>
                                        </label>

                                    </div>
                                    <div class="mt-2 flex justify-left w-1/3">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded " />

                                        </label>
                                        <span class="ml-3">หมกมุ่นในการใช้เครื่องมือสื่อสารที่เกี่ยวข้องทางเพศ</span>
                                    </div>
                                    <div class="mt-2 flex justify-left w-1/3">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded " />
                                            <span class="ml-3">มีการมั่วสุมทางเพศ</span>
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
                                        การติดเกม
                                    </label>
                                </div>
                                <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-16">
                                    </div>


                                    <div class="mt-2 flex justify-left w-1/3">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">เล่นเกมเกินวันละ 1 ชั่วโมง </span>
                                        </label>

                                    </div>
                                    <div class="mt-2 flex justify-left w-1/3">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                        </label>
                                        <span class="ml-5">ขาดจินตนาการและความคิดสร้างสรรค์</span>
                                    </div>
                                    <div class="mt-2 flex justify-left w-1/3">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                        </label>
                                        <span class="ml-5">เก็บตัว แยกตัวจากกลุ่มเพื่อน</span>
                                    </div>

                                </div>
                                <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-16">
                                    </div>


                                    <div class="mt-2 flex justify-left w-1/3">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">ใช้จ่ายเงินผิดปกติ</span>
                                        </label>
                                    </div>
                                    <div class="mt-2 flex justify-left w-1/3">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">อยู่ในกลุ่มเพื่อนเล่นเกม </span>
                                        </label>
                                    </div>
                                    <div class="mt-2 flex justify-left w-1/3">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />

                                        </label>
                                        <span class="ml-5">ร้านเกมอยู่ใกล้บ้านหรือโรงเรียน</span>
                                    </div>

                                </div>
                                <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-16">
                                    </div>


                                    <div class="mt-2 flex justify-left w-1/3">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />

                                        </label>
                                        <span class="ml-5">ใช้เวลาเล่นเกมเกิน 2 ชั่วโมง</span>
                                    </div>
                                    <div class="mt-2 flex justify-left w-1/3">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />

                                        </label>
                                        <span class="ml-5">หมกมุ่น จริงจังในการเล่นเกม </span>
                                    </div>
                                    <div class="mt-2 flex justify-left w-1/3">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />

                                        </label>
                                        <span class="ml-5">ใช้เงินสิ้นเปลือง โกหก ลักขโมยเงินเพื่อเล่นเกม</span>
                                    </div>


                                </div>
                                <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-16">
                                    </div>
                                    <div class="mt-2 flex justify-left w-1/3">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">อื่นๆ</span>
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
                                        การเข้าถึงสื่อคอมพิวเตอร์และอินเตอร์เน็ตที่บ้าน
                                    </label>
                                </div>
                                <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-16">
                                    </div>


                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">สามารถเข้าถึง Internet ได้จากที่บ้าน</span>
                                        </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">ไม่สามารถเข้าถึง Internet ได้จากที่บ้าน </span>
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
                                        การใช้เครื่องมือสื่อสารอิเล็กทรอนิกส์
                                    </label>
                                </div>
                                <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-16">
                                    </div>

                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">ใช้ Social media/game (ไม่เกินวันละ 3 ชั่วโมง)</span>
                                        </label>
                                    </div>


                                </div>
                                <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-16">
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">ใช้ Social media/game (วันละ 3 ชั่วโมงขึ้นไป)</span>
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
                                        ผู้ให้ข้อมูลนักเรียน
                                    </label>
                                </div>
                                <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-16">
                                    </div>

                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">บิดา </span>
                                        </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">มารดา</span>
                                        </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">พี่ชาย</span>
                                        </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">พี่สาว</span>
                                        </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">น้า</span>
                                        </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">อา </span>
                                        </label>
                                    </div>



                                </div>
                                <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-16">
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">ป้า</span>
                                        </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">ลุง</span>
                                        </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">ปู่</span>
                                        </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">ย่า</span>
                                        </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">ตา </span>
                                        </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">ยาย</span>
                                        </label>
                                    </div>


                                </div>
                                <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-16">
                                    </div>

                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">ทวด</span>
                                        </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">พ่อเลี้ยง </span>
                                        </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="w-5 h-5 ml-5 rounded" />
                                            <span class="ml-5">แม่เลี้ยง </span>
                                        </label>
                                    </div>


                                </div>
                            </div>
                            <div className="flex flex-col pl-2 mt-10">
                                <div className="   text-xl text-center  w-full">
                                    ภาพถ่ายบ้านนักเรียนที่ได้รับการเยี่ยมบ้าน
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
                                        คำนำหน้า
                                    </label>

                                    <label
                                        className="ml-5 mb-2 pl-1 font-bold text-lg text-gray-900  w-1/6
                                        "
                                        htmlFor="first_name"
                                    >
                                        ชื่อ
                                    </label>

                                    <label
                                        className="ml-5 mb-2 pl-1 font-bold text-lg text-gray-900  w-1/6"
                                        htmlFor="first_name"
                                    >
                                        นามสกุล
                                    </label>
                                    <label
                                        className="ml-5 mb-2 pl-1 font-bold text-lg text-gray-900  w-16"
                                        htmlFor="first_name"
                                    >
                                        เลขที่
                                    </label>
                                    <label
                                        className="ml-1 mb-2 pl-1 font-bold text-lg text-gray-900  w-16"
                                        htmlFor="first_name"
                                    >
                                        ชั้น
                                    </label>
                                    <label
                                        className="ml-5 mb-2 pl-1 font-bold text-lg text-gray-900  w-1/6"
                                        htmlFor="first_name"
                                    >
                                        เบอร์โทรศัพท์
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
                                        ที่อยู่
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
                                        สถานที่ใกล้เคียง(เช่น วัดเขียนเขต,โลตัสสำขำรังสิต-นครนำยก)
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
                                        กรุณาระบุ ภาพถ่ายที่แนบมาคือ
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
                                            <span class="ml-5">บ้านที่อาศัยอยู่กับพ่อแม่ (เป็นเจ้าของ/เช่า) </span>
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
                                            <span class="ml-5">บ้านของญาติ/ผู้ปกครองที่ไม่ใช่ญาติ </span>
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
                                            <span class="ml-5">บ้านหรือที่พักประเภท วัด มูลนิธิ หอพัก โรงงาน อยู่กับนายจ้าง</span>
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
                                        <span class="ml-5 ">ภาพนักเรียนและป้ายชื่อโรงเรียน เนื่องจากถ่ายภาพบ้านไม่ได้ เนื่องจาก บ้านอยู่ต่างอำเภอ/ต่างจังหวัด/ต่างประเทศ หรือไม่ได้รับอนุญาตให้ถ่ายภาพ </span>

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
                                        รูปที่ 1 ภาพถ่ายสภาพบ้านนักเรียน
                                    </label>
                                    <label
                                        className="ml-2 mb-2 pl-1 text-lg text-gray-900  w-1/2"
                                        htmlFor="first_name"

                                    >
                                        รูปที่ 2 ภาพถ่ายครูที่ปรึกษากับครอบครัวนักเรียน
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
