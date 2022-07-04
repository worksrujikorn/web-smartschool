import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Login, Authenticate, isAuth } from "../action/auth";
import { getDetailteacher } from "../action/teacher";
import { get_school_color } from "../action/admin";
import { getDetailstudent } from "../action/student";
import { getDetailparent } from "../action/parent";
import { getNewscount } from "../action/news";
import { registerLocale } from "react-datepicker";

export default function Home() {
  const Auth = isAuth();
  const router = useRouter();

  const [setting, setSetting] = useState({
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

  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  const gotomain = async (name) => {
    // router.push("/student/main_student")
    // window.open(`/student/main_student`)
    //

    if (values.L_Username == "student" && values.L_Password == "123456") {
      router.push("/student/main_student");
      console.log("ผ่าน");
    } else if (
      values.L_Username == "teacher" &&
      values.L_Password == "123456"
    ) {
      router.push("/teacher/main_teacher");
    } else if (values.L_Username == "parent" && values.L_Password == "123456") {
      router.push("/parent/main_parent");
    } else if (
      values.L_Username == "director" &&
      values.L_Password == "123456"
    ) {
      router.push("/director/main_director");
    } else if (values.L_Username == "admin" && values.L_Password == "123456") {
      router.push("/admin/main_admin");
    } else {
      console.log("ไม่ผ่าน");
    }

    // console.log(e.target.value);
  };
  const handleChange = (name, e) => {
    console.log(name, e);
    values[name] = e.target.value;
    // setValues(...values)
    console.log(values, "val");
  };

  console.log("test");
  const [THdate, setTHdate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, loading: true, error: false });
    const user = values;

    console.log("useruseruser1 ", user);

    Login(values).then((data) => {
      if (data.error) {
        console.log("error", data.error);

        setValues({ ...values, error: data.error, loading: false });
      } else {
        Authenticate(data, async () => {
          console.log("re", data);
          await localStorage.setItem("LoginToken", data.accessToken);
          await localStorage.setItem("LoginRole", data.role);
          await localStorage.setItem("LoginId", data.login_id);
          await localStorage.setItem("LoginUsername", data.username);

          if (data.role == 1) {
            router.push("/admin/main_admin");
          } else if (data.role == 2) {
            router.push("/director/main_director");
          } else if (data.role == 3) {
            let login = await getDetailteacher(data.login_id);
            await localStorage.setItem(
              "LoginRoomId",
              login[0].classroom_code ? login[0].classroom_code : ""
            );
            router.push("/teacher/main_teacher");
          } else if (data.role == 4) {
            let login = await getDetailstudent(data.login_id);
            await localStorage.setItem(
              "LoginRoomId",
              login[0].classroom_code ? login[0].classroom_code : ""
            );
            router.push("/student/main_student");
          } else if (data.role == 5) {
            console.log("datalogin", data.login_id);
            let login = await getDetailparent(data.login_id);
            console.log("datalogin", login);
            await localStorage.setItem(
              "parent_student_code",
              login[0].student_code ? login[0].student_code : ""
            );
            await localStorage.setItem(
              "LoginRoomId",
              login[0].classroom_code ? login[0].classroom_code : ""
            );
            router.push("/parent/main_parent");
          }
        });
      }
    });
  };
  useEffect(async () => {
    let data = await get_school_color();
    setSetting(data[0]);
    console.log(data, "");
  }, []);
  return (
    <>
      <form className="" onSubmit={handleSubmit}>
        <div className="w-screen h-screen flex fixed  justify-center items-center bg-gray-100 ">
          <div className=" w-4/5 h-4/5 font-extrabold bg-white  flex flex-row shadow-lg ">
            <div className="hidden md:block flex-1">
              <div
                style={{ backgroundColor: setting.sidebarcolor }}
                className="h-full flex flex-1 flex-col justify-center items-center "
              >
                <div className="">
                  <p className="text-2xl text-white font-normal text-center">
                    {setting.schoolname}
                  </p>
                  <p className="text-2xl text-white font-normal text-center">
                    {setting.schoolnameEN}
                  </p>
                  <img
                    layout="responsive"
                    src={"" + setting.schooliconcolor}
                    width={220}
                    height={200}
                  />
                </div>
              </div>
            </div>

            <div className=" md:hidden h-full flex flex-1 flex-col justify-center items-center login_form border-2 p-10 pt-16 shadow-sm mx-auto rounded bg-img-mobile bg-img-ipad">
              <div className="sec flex-1 ">
                <div className="flex flex-1 justify-center items-center lg:py-14 py-auto ">
                  <div className="">
                    <img
                      layout="responsive"
                      src={"" + setting.schooliconcolor}
                      width={220}
                      height={200}
                      alt=""
                      className="lg:hidden md:hidden w-8/12 m-auto"
                    />
                    <p className="font-normal   lg:text-xl text-center mb-4 ">
                      Sign in to your account
                    </p>
                  </div>
                </div>

                <span className="flex shadow-md mb-0 text-xs rounded-full">
                  <span className="  w-auto font-bold text-center text-gray-400 p-3 px-5 rounded-l-full    border-r-2  border-gray-300 bg-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 "
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </span>
                  <input
                    className="field text-sm text-gray-600 p-2 px-3 rounded-r-full w-full"
                    name="username"
                    onChange={(e) => handleChange("username", e)}
                    type="text"
                    placeholder="Username"
                  />
                </span>
                <div className="h-5 mt-2">
                  <div className="input-feedback text-red-500 ml-5"></div>
                </div>
                <span className="flex shadow-md mb-0 text-xs rounded-full  bg-white ">
                  <span className="  w-auto font-bold text-center text-gray-400 p-3 px-5 rounded-l-full    border-r-2  border-gray-300 bg-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </span>
                  <input
                    className="field text-sm text-gray-600 p-2 px-3 rounded-r-full w-full"
                    name="password"
                    onChange={(e) => handleChange("password", e)}
                    type="Password"
                    placeholder="Password"
                  />
                </span>
                <div className="h-5 mt-2">
                  <div className="input-feedback text-red-500 ml-5"></div>
                </div>
                <div className="flex  shadow-md flex-1 justify-center items-center rounded-full ">
                  <button className=" font-normal bg-telecorp w-full bg-color-blue  text-center text-gray-200 p-2 px-5 rounded-full ">
                    Login
                  </button>
                  {/* onClick={() => { gotomain() }} */}
                </div>
                <div className="">
                  <p className="text-2xl text-white font-normal text-center">
                    โรงเรียนเทเลคอร์ป กรุงเทพฯ
                  </p>
                </div>
              </div>
            </div>
            <div className=" hidden h-full md:flex flex-1 flex-col justify-center items-center login_form border-2 p-10 pt-16 shadow-sm mx-auto rounded  ">
              <div className="sec flex-1 ">
                <div className="flex flex-1 justify-center items-center lg:py-14 py-auto ">
                  <div className="">
                    <div className="lg:hidden md:hidden w-8/12 m-auto">
                      <img
                        layout="responsive"
                        src={"" + setting.schooliconcolor}
                        width={220}
                        height={200}
                        alt=""
                      />
                    </div>
                    <p className=" font-normal  lg:text-xl text-center mb-4">
                      Sign in to your account
                    </p>
                  </div>
                </div>

                <span className="flex shadow-md mb-0 text-xs rounded-full">
                  <span className="  w-auto font-bold text-center text-gray-400 p-3 px-5 rounded-l-full    border-r-2  border-gray-300 bg-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 "
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </span>
                  <input
                    className="field text-sm text-gray-600 p-2 px-3 rounded-r-full w-full"
                    name="username"
                    onChange={(e) => handleChange("username", e)}
                    type="text"
                    placeholder="Username"
                  />
                  {/* onKeyPress={e => { if (e.key === 'Enter') handleSubmit(); }} */}
                </span>
                <div className="h-5 mt-2">
                  <div className="input-feedback text-red-500 ml-5"></div>
                </div>
                <span className="flex shadow-md mb-0 text-xs rounded-full">
                  <span className="  w-auto font-bold text-center text-gray-400 p-3 px-5 rounded-l-full    border-r-2  border-gray-300 bg-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </span>
                  <input
                    className="field text-sm text-gray-600 p-2 px-3 rounded-r-full w-full"
                    name="password"
                    onChange={(e) => handleChange("password", e)}
                    type="Password"
                    placeholder="Password"
                  />
                  {/* onKeyPress={e => { if (e.key === 'Enter') handleSubmit(); }} */}
                </span>
                <div className="h-5 mt-2">
                  <div className="input-feedback text-red-500 ml-5"></div>
                </div>
                <div className="flex  shadow-md flex-1 justify-center items-center rounded-full ">
                  {/* <button className="bg-telecorp w-full bg-color-blue font-normal text-center text-gray-200 p-2 px-5 rounded-full  " onClick={(e) => { gotomain() }} >Login</button  > */}
                  <button
                    style={{ backgroundColor: setting.sidebarcolor }}
                    className="bg-telecorp w-full bg-color-blue font-normal text-center text-gray-200 p-2 px-5 rounded-full  "
                  >
                    Login
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
