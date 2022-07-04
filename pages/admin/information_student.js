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
  getStudent,
  postStudentAdd,
  putStudentUpdate,
  deleteStudent,
  findbyidcard,
} from "../../action/student";
import { getClassroom } from "../../action/admin";
import { getParent, postParentAdd, putParentUpdate } from "../../action/parent";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { isAuth } from "../../action/auth";
import { upload } from "../../action/teacher";

function Information_student() {
  const [values, setValues] = useState({
    student_code: "",
    student_idcard: "",
    title: "",
    firstname: "",
    lastname: "",
    firstname_en: "",
    lastname_en: "",
    birthday: moment(new Date()).format("YYYY-MM-DD"),
    phonenumber: "",
    Address: "",
    email: "",
    picture: "",
    parent_1: "",
    parent_2: "",
    parent_3: "",
    username: "",
    password: "",
    role: 4,
    detail: "",
    classroom_code: "",
    createdate: moment(new Date()).format("YYYY-MM-DD"),
    who: "",
  });
  const [Who, setWho] = useState();
  const [classRoom, setclassRoom] = useState([]);
  const [Familys, setFamilys] = useState([]);

  // const [Parent1, setParent1] = useState({
  //     "parent_idcard": "",
  //     "title": "",
  //     "firstname": "",
  //     "lastname": "",
  //     "phonenumber": "",
  //     "Address": "",
  //     "email": "",
  //     "picture": "",
  //     "username": "",
  //     "password": "",
  //     "role": 5,
  //     "detail": "",
  //     "createdate": moment(new Date()).format('YYYY-MM-DD'),
  //     "who": ""
  // });
  // const [Parent2, setParent2] = useState({
  //     "parent_idcard": "",
  //     "title": "",
  //     "firstname": "",
  //     "lastname": "",
  //     "phonenumber": "",
  //     "Address": "",
  //     "email": "",
  //     "picture": "",
  //     "username": "",
  //     "password": "",
  //     "role": 5,
  //     "detail": "",
  //     "createdate": moment(new Date()).format('YYYY-MM-DD'),
  //     "who": ""
  // });
  // const [Parent3, setParent3] = useState({
  //     "parent_idcard": "",
  //     "title": "",
  //     "firstname": "",
  //     "lastname": "",
  //     "phonenumber": "",
  //     "Address": "",
  //     "email": "",
  //     "picture": "",
  //     "username": "",
  //     "password": "",
  //     "role": 5,
  //     "detail": "",
  //     "createdate": moment(new Date()).format('YYYY-MM-DD'),
  //     "who": ""
  // });

  const [StudentMap, setStudentMap] = useState();
  const [GetIdparent, setGetIdparent] = useState();

  const [StartDate, setStartDate] = useState(new Date());
  const [EndDate, setEndDate] = useState(new Date());
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
    labels: ["มา", "ลา", "ขาด", "สาย"],
    datasets: [
      {
        label: "# of Votes",
        data: [30, 5, 0, 3],
        backgroundColor: ["#2563EB", "#3B82F6", "#60A5FA", "#93C5FD"],
        // borderColor: [
        //     'rgba(255, 99, 132, 1)',
        //     '#004AAD'
        // ],
        borderWidth: 1,
      },
    ],
  };

  const Pull_dataparent = async () => {
    let parent_data1 = await getParent();
    setGetIdparent(parent_data1);
    console.log("Pull_dataparent", parent_data1);
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

  const EditClick = async (i) => {
    setShowmodaledit(true);

    // let parent1 = GetIdparent.filter((p) => p.parent_code == StudentMap[i].parent_1);
    // let parent2 = GetIdparent.filter((p) => p.parent_code == StudentMap[i].parent_2);
    // let parent3 = GetIdparent.filter((p) => p.parent_code == StudentMap[i].parent_3);
    // let parent = GetIdparent.filter((p) => p.parent_code);
    // console.log('StudentMap[i]', GetIdparent, StudentMap[i])
    // console.log('ผู้ปกครอง', parent1)
    // console.log('ผู้ปกครอง2', parent2)
    // console.log('ผู้ปกครอง3', parent3)
    // console.log(parent1.length)
    // let data = [{
    //     "parent_code": "",
    //     "parent_idcard": "",
    //     "title": "",
    //     "firstname": "",
    //     "lastname": "",
    //     "phonenumber": "",
    //     "Address": "",
    //     "email": "",
    //     "picture": "",
    //     "username": "",
    //     "password": "",
    //     "role": 5,
    //     "detail": "",
    //     "createdate": moment(new Date()).format('YYYY-MM-DD'),
    //     "who": ""
    // }]
    // if (parent1.length < 1) {
    //     parent1 = data
    // }
    // if (parent2.length < 1) {
    //     parent2 = data
    // }
    // if (parent3.length < 1) {
    //     parent3 = data
    // }
    // console.log('ผู้ปกครอง', parent1)
    // console.log('ผู้ปกครอง2', parent2)
    // console.log('ผู้ปกครอง3', parent3)
    // setParent1(parent1[0])
    // setParent2(parent2[0])
    // setParent3(parent3[0])

    let parent_arr = GetIdparent.filter(
      (x) => x.student_code == StudentMap[i].student_code
    );
    console.log("test", parent_arr);
    console.log("arrrrrrrrrrrr", GetIdparent);
    Familys = parent_arr;
    setFamilys([...Familys]);
    setValues(StudentMap[i]);
  };

  const chkroom = (roomcode) => {
    // for (let index = 0; index < classRoom.length; index++) {

    //     if (roomcode == classRoom[index].classroom_code) {

    //         return (<td className="py-2 ">{classRoom[index].classroom_name || ""}</td>)
    //     } else {
    //         return (<td className="py-2 ">{""}</td>)

    //     }
    // }
    let res = classRoom.find((x) => x.classroom_code == roomcode);
    if (res) {
      return <td className="py-2 ">{res.classroom_name}</td>;
    } else {
      return <td className="py-2 "></td>;
    }
  };
  const idcardcheck = async (e) => {
    let data;
    console.log(e.target.value.length);
    if (String(e.target.value).length == 13) {
      data = await findbyidcard(e.target.value);
      console.log(data.length);
    }
  };

  const CancelClick = async () => {
    Dataload();
    setOpen(false);
    setShowmodaledit(false);
    setShowmodaladd(false);
    setFamilys([]);
    setValues({
      student_code: "",
      student_idcard: "",
      title: "",
      firstname: "",
      lastname: "",
      firstname_en: "",
      lastname_en: "",
      birthday: moment(new Date()).format("YYYY-MM-DD"),
      phonenumber: "",
      Address: "",
      email: "",
      picture: "",
      parent_1: "",
      parent_2: "",
      parent_3: "",
      username: "",
      password: "",
      role: 4,
      detail: "",
      classroom_code: "",
      createdate: moment(new Date()).format("YYYY-MM-DD"),
      who: "",
    });
  };

  const SaveSubmit = async () => {
    let data = "";
    let save_student = {
      Address: values.Address,
      birthday: values.birthday,
      classroom_code: values.classroom_code,
      createdate: values.createdate,
      detail: values.detail,
      email: values.email,
      firstname: values.firstname,
      firstname_en: values.firstname_en,
      lastname: values.lastname,
      lastname_en: values.lastname_en,
      password: values.password,
      phonenumber: values.phonenumber,
      picture: values.picture,
      role: values.role,
      student_code: values.student_code,
      student_id: values.student_id,
      student_idcard: values.student_idcard,
      title: values.title,
      username: values.username,
      who: values.who,
    };
    let data_p1 = "";
    let data_p2 = "";
    let data_p3 = "";

    save_student.createdate = moment().format("YYYY-MM-DD HH:mm:ss");
    // save_student.parent_1 = Parent1.parent_code
    // save_student.parent_2 = Parent2.parent_code
    // save_student.parent_3 = Parent3.parent_code
    save_student.who = Who;
    console.log("save_student", save_student);
    if (Showmodaladd) {
      // if (Parent1.parent_idcard) {
      data_p1 = await postParentAdd(Familys);
      // }
      // if (Parent2.parent_idcard) {
      //     data_p2 = await postParentAdd(Parent2)
      // }
      // if (Parent3.parent_idcard) {
      //     data_p3 = await postParentAdd(Parent3)
      // }

      // console.log("data_p1", data_p1)
      // console.log("data_p1", data_p1)
      // console.log("data_p2", data_p2)
      console.log("data_p1", data_p1);
      // console.log("data_p3", data_p3)
      // save_student.createdate = moment().format("YYYY-MM-DD HH:mm:ss")
      // if (data_p1) {
      //     save_student.parent_1 = data_p1.data.parent_code
      // }
      // else {
      //     save_student.parent_1 = ""
      // }
      // if (data_p2) {
      //     save_student.parent_2 = data_p2.data.parent_code
      // }
      // else {
      //     save_student.parent_2 = ""
      // }
      // if (data_p3) {
      //     save_student.parent_3 = data_p3.data.parent_code
      // }
      // else {
      //     save_student.parent_3 = ""
      // }
      save_student.who = Who;

      data = await postStudentAdd(save_student);
      console.log(data);
    } else if (Showmodaledit) {
      // console.log(Parent1)
      console.log(Familys, "fam");
      data_p1 = await postParentAdd(Familys);

      // data_p2 = await putParentUpdate(Parent2)
      // data_p3 = await putParentUpdate(Parent3)
      data = await putStudentUpdate(save_student);
      console.log("update data", save_student);
    }

    Dataload();
    Pull_dataparent();
    console.log("Values", values);
    // console.log("Pa1", Parent1)
    // console.log("Pa2", Parent2)
    // console.log("Pa3", Parent3)

    setShowmodaladd(false);
    setShowmodaledit(false);
  };
  const search = (e) => {
    async function getdatapersondate_() {
      let check = [];
      let search = [];
      let event = e.target.value.toUpperCase();
      let data = await getStudent();
      let data1 = await getClassroom();

      console.log(data1);
      let newarr_student = [];
      for (const item of data) {
        let res_clr = data1.find(
          (x) => x.classroom_code == item.classroom_code
        );
        newarr_student.push({ ...item, ...res_clr });
      }
      console.log(newarr_student, "new");
      setStudentMap(newarr_student);

      console.log(data);
      check = data;
      if (newarr_student) {
        var matches = newarr_student.filter(function (x) {
          return (
            x.firstname?.toUpperCase().includes(event) ||
            x.lastname?.toUpperCase().includes(event) ||
            x.classroom_code?.toUpperCase().includes(event) ||
            x.classroom_name?.toUpperCase().includes(event)
          );
        });
        search = matches;
      }
      if (e.target.value != "") {
        setStudentMap(search);
      } else {
        setStudentMap(check);
      }
    }
    getdatapersondate_();
  };
  const DeleteStudent = async (id) => {
    Swal.fire({
      title: "ลบข้อมูล",
      text: "คุณต้องการลบขอมูลหรือไม่",
      icon: "warning",
      showCancelButton: true,
      cancelButtonColor: "#d33",
      confirmButtonColor: "#55D055",
      cancelButtonText: "ยกเลิก",
      confirmButtonText: "ยืนยัน",
    }).then(async (result) => {
      if (await result.isConfirmed) {
        // console.log('id', id)
        deleteStudent(id);
        Swal.fire("สำเร็จ!", "ข้อมูลของคุณถูกลบแล้ว.", "success")
        Dataload();
        ;
      }

      Dataload();
    });
    // await deleteStudent(id);
    // Dataload();
    // alert(id);
  };

  const Dataload = async () => {
    let data = await getStudent();

    console.log("Getstudent", data);

    let data1 = await getClassroom();

    console.log(data1);
    let newarr_student = [];
    for (const item of data) {
      let res_clr = data1.find((x) => x.classroom_code == item.classroom_code);
      newarr_student.push({ ...item, ...res_clr });
    }
    setStudentMap(newarr_student);
    // let student = [];
    // data.filter((x) => {
    //     if (data1.indexOf(x.classroom_code) > -1) {
    //         student.push({ ...x, ...data1.indexOf(x.classroom_code) > -1 })
    //     }
    // });

    // console.log('testtttttttttttttt',student);

    // let sum = [];

    // for (let index = 0; index < data.length; index++) {
    //     for (let index1 = 0; index1 < data1.length; index1++) {

    //         if (data[index].classroom_code == data1[index1].classroom_code) {

    //             data[index] = {
    //                 ...data,classroom_name: data1[index1].classroom_name

    //             }
    //             sum.push(data[index])
    //         }

    //     }

    // }
    setclassRoom(data1);
    // console.log('sum',sum)
  };
  const [THdate, setTHdate] = useState("");

  useEffect(async () => {
    let admin_username = localStorage.getItem("LoginUsername");
    console.log(admin_username);
    setWho(admin_username);

    Pull_dataparent();
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
    // if (name == 'index1') {

    //     let chk_all = document.getElementsByClassName('m_all');

    //     for (let index = 0; index < chk_all.length; index++) {
    //         chk_all[index].checked = false

    //     }
    //     console.log('showfalse', e.target.checked);
    // } else {
    if (name == "birthday") {
      // console.log('dob', moment(e).format('YYYY-MM-DD'))
      values[name] = moment(e).format("YYYY-MM-DD");
    } else if (name == "student_code") {
      values[name] = e.target.value;
      if (Familys.length > 0) {
        for (let i = 0; i < Familys.length; i++) {
          Familys[i].student_code = e.target.value;
        }
        setFamilys([...Familys]);
      }
    } else {
      // console.log('event',e.target.value);
      values[name] = e.target.value;
    }

    setValues({ ...values });
    // console.log('Values', e.target.value);
    // }
  };
  // const handleInput = async (name, e) => {
  //     Parent1[name] = e.target.value;
  //     setParent1({ ...Parent1 });
  //     if (name == "parent_idcard" && String(e.target.value).length == 13) {
  //         let data = await findbyidcard(e.target.value)
  //         console.log(e.target.value)
  //         console.log(data.length)
  //         if (data.length > 0) {
  //             setParent1({
  //                 parent_idcard: data[0].parent_idcard,
  //                 title: data[0].title,
  //                 firstname: data[0].firstname,
  //                 lastname: data[0].lastname,
  //                 phonenumber: data[0].phonenumber,
  //                 Address: data[0].Address,
  //                 email: data[0].email,
  //                 picture: data[0].picture,
  //                 username: data[0].username,
  //                 password: data[0].password,
  //                 role: 5,
  //                 detail: data[0].detail,
  //                 createdate: moment().format('YYYY-MM-DD HH:mm:ss'),
  //                 who: data[0].who
  //             })
  //         }
  //     }
  // }
  // const handleInput2 = async (name, e) => {
  //     Parent2[name] = e.target.value;
  //     setParent2({ ...Parent2 });
  //     if (name == "parent_idcard" && String(e.target.value).length == 13) {
  //         let data = await findbyidcard(e.target.value)
  //         console.log(e.target.value)
  //         console.log(data.length)
  //         if (data.length > 0) {
  //             setParent2({
  //                 parent_idcard: data[0].parent_idcard,
  //                 title: data[0].title,
  //                 firstname: data[0].firstname,
  //                 lastname: data[0].lastname,
  //                 phonenumber: data[0].phonenumber,
  //                 Address: data[0].Address,
  //                 email: data[0].email,
  //                 picture: data[0].picture,
  //                 username: data[0].username,
  //                 password: data[0].password,
  //                 role: 5,
  //                 detail: data[0].detail,
  //                 createdate: moment().format('YYYY-MM-DD HH:mm:ss'),
  //                 who: data[0].who
  //             })
  //         }
  //     }
  // }
  // const handleInput3 = async (name, e) => {
  //     Parent3[name] = e.target.value;
  //     setParent3({ ...Parent3 });
  //     if (name == "parent_idcard" && String(e.target.value).length == 13) {
  //         let data = await findbyidcard(e.target.value)
  //         console.log(e.target.value)
  //         console.log(data.length)
  //         if (data.length > 0) {
  //             setParent3({
  //                 parent_idcard: data[0].parent_idcard,
  //                 title: data[0].title,
  //                 firstname: data[0].firstname,
  //                 lastname: data[0].lastname,
  //                 phonenumber: data[0].phonenumber,
  //                 Address: data[0].Address,
  //                 email: data[0].email,
  //                 picture: data[0].picture,
  //                 username: data[0].username,
  //                 password: data[0].password,
  //                 role: 5,
  //                 detail: data[0].detail,
  //                 createdate: moment().format('YYYY-MM-DD HH:mm:ss'),
  //                 who: data[0].who
  //             })
  //         }
  //     }
  // }
  const [Showmodaladd, setShowmodaladd] = useState(false);
  const [Showmodaledit, setShowmodaledit] = useState(false);

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
  const handleFamilys = (i, e, name) => {
    Familys[i][name] = e.target.value;
    setFamilys([...Familys]);
  };

  const deleteFamilys = (i) => {
    Familys.splice(i, 1);
    setFamilys([...Familys]);
  };

  const onInsert = async (type) => {
    if (type == "student") {
      setShowmodaladd(true);
    } else {
      setOpen(true);
      let data = {
        parent_id: 0,
        student_code: values.student_code,
        parent_idcard: "",
        title: "",
        firstname: "",
        lastname: "",
        phonenumber: "",
        Address: "",
        email: "",
        picture: "",
        username: "",
        password: "",
        role: 5,
        detail: "",
        createdate: moment().format("YYYY-MM-DD HH:mm:ss"),
        who: localStorage.getItem("LoginUsername"),
      };
      setFamilys([...Familys, data]);
    }
    // setParent1({
    //     "parent_id": 0,
    //     "parent_idcard": "",
    //     "title": "",
    //     "firstname": "",
    //     "lastname": "",
    //     "phonenumber": "",
    //     "Address": "",
    //     "email": "",
    //     "picture": "",
    //     "username": "",
    //     "password": "",
    //     "role": 5,
    //     "detail": "",
    //     "createdate": moment().format('YYYY-MM-DD HH:mm:ss'),
    //     "who": localStorage.getItem('LoginUsername'),
    // })
    // setParent2({
    //     "parent_id": 0,
    //     "parent_idcard": "",
    //     "title": "",
    //     "firstname": "",
    //     "lastname": "",
    //     "phonenumber": "",
    //     "Address": "",
    //     "email": "",
    //     "picture": "",
    //     "username": "",
    //     "password": "",
    //     "role": 5,
    //     "detail": "",
    //     "createdate": moment().format('YYYY-MM-DD HH:mm:ss'),
    //     "who": localStorage.getItem('LoginUsername'),
    // })
    // setParent3({
    //     "parent_id": 0,
    //     "parent_idcard": "",
    //     "title": "",
    //     "firstname": "",
    //     "lastname": "",
    //     "phonenumber": "",
    //     "Address": "",
    //     "email": "",
    //     "picture": "",
    //     "username": "",
    //     "password": "",
    //     "role": 5,
    //     "detail": "",
    //     "createdate": moment().format('YYYY-MM-DD HH:mm:ss'),
    //     "who": localStorage.getItem('LoginUsername'),
    // })
  };

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
                ข้อมูลของนักเรียน
              </div>
              <div className="flex flex-row w-full">
                <div className="   text-base text-left   my-2   w-1/5  ">
                  <input
                    onChange={(e) => search(e)}
                    className=" p-2 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-full "
                    placeholder="Search for users"
                  />
                </div>
                <div className="p-2 text-right w-full">
                  <button
                    className="mt-1 w-auto shadow hover:shadow-lg text-white bg-green-500 hover:text-green-500   border-2   border-green-500  hover:border-green-500  hover:bg-white rounded-lg background-transparent  uppercase px-6 py-1 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => onInsert("student")}
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
                        <path d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>

                      <div className="ml-3 mt-1">เพิ่ม</div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
            <div className="flex flex-row   h-full ">
              <div className="px-1 w-full text-left">
                <table className="w-full ">
                  <tr className=" bg-gray-300 ">
                    <th className="py-2 w-1/12 text-center">ลำดับ</th>

                    <th className="py-2   text-gray-500 w-1/12 text-center"></th>
                    <th className="py-2 text-gray-500 w-2/12 ">ชื่อ</th>
                    <th className="py-2 text-gray-500 w-2/12">นามสกุล</th>
                    <th className="py-2 text-gray-500 w-2/12">ชั้น</th>
                    <th className="py-2 text-gray-500 w-1/12"></th>
                    <th className="py-2 text-gray-500 w-1/12"></th>
                    <td className="w-1/12  "></td>
                  </tr>
                  {StudentMap
                    ? StudentMap.map((p, index) => (
                      <tr key={index + 1} className="border border-gray-300">
                        <td className="py-2 w-1/12 text-center ">
                          {index + 1}
                        </td>
                        <td className="flex py-2  text-center justify-center ">
                          <img
                            src={
                              p.picture
                                ? p.picture
                                : "/icon/blank-profile.png"
                            }
                            alt
                            className="h-10 w-10 bg-gray-200 border rounded-full"
                          />
                        </td>
                        <td className="py-2 ">{p.firstname}</td>
                        <td className="py-2 ">{p.lastname}</td>
                        <td className="py-2" hidden>
                          {p.classroom_code}
                        </td>
                        <td className="py-2"> {chkroom(p.classroom_code)}</td>
                        <td className="w-1/12  ">
                          <button
                            className="mt-1 w-auto shadow hover:shadow-lg text-white bg-blue-500 hover:text-blue-500   border-2   border-blue-500  hover:border-blue-500  hover:bg-white rounded-lg background-transparent  uppercase px-6 py-1 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={() => EditClick(index)}
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
                                <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                              <div className="ml-3 mt-1">แก้ไข</div>
                            </div>
                          </button>
                        </td>
                        <td className="w-1/12  ">
                          <button
                            className="mt-1 w-auto shadow hover:shadow-lg text-white bg-red-500 hover:text-red-500   border-2   border-red-500  hover:border-red-500  hover:bg-white rounded-lg background-transparent  uppercase px-6 py-1 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={() => DeleteStudent(p.student_code)}
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
                                <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                              <div className="ml-3 mt-1">ลบ</div>
                            </div>
                          </button>
                        </td>
                        <td className="w-1/12  "></td>
                      </tr>
                    ))
                    : ""}
                </table>
              </div>
            </div>
          </div>
          {/* Modal */}
          {Showmodaladd ? (
            <>
              <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ">
                <div className="relative w-full m-auto mb-6 mx-auto max-w-6xl  max-h-auto ">
                  {/*content*/}
                  <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    {/*header*/}
                    <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t text-color-blue">
                      <h3 className="text-2xl font-semibold text-center w-full ml-5">
                        เพิ่มข้อมูลนักเรียน
                      </h3>
                      <button
                        className="p-1 ml-auto bg-transparent border-0 text-black  float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                        onClick={() => CancelClick()}
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
                      <div className="flex flex-col  w-full px-2  ">
                        <div className="flex flex-col mb-4">
                          <label
                            className="ml-2 mb-2 pl-1 font-bold text-lg text-gray-900"
                            htmlFor="first_name"
                          >
                            รหัสนักเรียน
                          </label>
                          <input
                            className="ml-2 py-2 px-3 border-solid w-1/4 border border-gray-300 outline-none  rounded-lg shadow"
                            type="text"
                            name="student_id"
                            id="student_id"
                            maxLength="7"
                            onChange={(e) => handleChange("student_code", e)}
                          />
                        </div>
                        <div className="flex flex-col mb-4">
                          <div className="flex flex-row  ">
                            <label
                              className="ml-2 mb-2 pl-1 font-bold text-lg text-gray-900  w-1/2"
                              htmlFor="first_name"
                            >
                              คำนำหน้า
                            </label>
                            <label
                              className="mb-2 pl-1 font-bold text-lg text-gray-900  w-1/2"
                              htmlFor="first_name"
                            >
                              ชื่อ
                            </label>
                            <label
                              className="ml-2 mb-2 pl-1 font-bold text-lg text-gray-900  w-1/2"
                              htmlFor="first_name"
                            >
                              นามสกุล
                            </label>
                          </div>
                          <div className="flex flex-row mb-4">
                            <div class="ml-2 relative inline-flex w-1/2">
                              <svg
                                class="ml-2 w-2 h-2 absolute top-0 right-0 m-4 pointer-events-none"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 412 232"
                              >
                                <path
                                  d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z"
                                  fill="#648299"
                                  fill-rule="nonzero"
                                />
                              </svg>
                              <select
                                class="border border-gray-300 rounded-lg text-gray-600 h-10 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none w-full"
                                value={values.title}
                                onChange={(e) => handleChange("title", e)}
                              >
                                <option value="">--กรุณาเลือกคำนำหน้า--</option>
                                <option value="เด็กชาย">เด็กชาย</option>
                                <option value="เด็กหญิง">เด็กหญิง</option>
                                <option value="นาย">นาย</option>
                                <option value="นางสาว">นางสาว</option>
                                <option value="นาง">นาง</option>
                              </select>
                            </div>
                            {/* <input className="ml-2 py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-1/2" type="text" name="id_card" id="id_card" onChange={(e) => handleChange('title', e)} /> */}
                            <input
                              className="ml-2 py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-1/2"
                              type="text"
                              onChange={(e) => handleChange("firstname", e)}
                            />
                            <input
                              className="ml-2 py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-1/2"
                              type="text"
                              name="last_name"
                              id="last_name"
                              onChange={(e) => handleChange("lastname", e)}
                            />
                          </div>
                          <div className="flex flex-row">
                            <label
                              className="ml-2 mb-2 pl-1 font-bold text-lg text-gray-900  w-1/2"
                              htmlFor=""
                            >
                              รหัสบัตรประชาชน
                            </label>
                            <label
                              className="mb-2 pl-1 font-bold text-lg text-gray-900  w-1/2"
                              htmlFor="first_name"
                            >
                              ชื่อ (ภาษาอังกฤษ)
                            </label>
                            <label
                              className="ml-2 mb-2 pl-1 font-bold text-lg text-gray-900  w-1/2"
                              htmlFor="first_name"
                            >
                              นามสกุล (ภาษาอังกฤษ)
                            </label>
                          </div>

                          <div className="flex flex-row mb-4">
                            <input
                              className="ml-2 py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-1/2"
                              type="text"
                              name="id_card"
                              id="id_card"
                              maxLength="13"
                              onChange={(e) =>
                                handleChange("student_idcard", e)
                              }
                            />
                            <input
                              className="ml-2 py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-1/2"
                              type="text"
                              onChange={(e) => handleChange("firstname_en", e)}
                            />
                            <input
                              className="ml-2 py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-1/2"
                              type="text"
                              name="last_name"
                              id="last_name"
                              onChange={(e) => handleChange("lastname_en", e)}
                            />
                          </div>
                        </div>
                        <div className="flex flex-col mb-4">
                          <div className="flex flex-row">
                            <label
                              className=" ml-2 mb-2 pl-1 font-bold text-lg text-gray-900  w-1/2"
                              htmlFor=""
                            >
                              วันเกิด
                            </label>
                            <label
                              className=" mb-2 pl-1 font-bold text-lg text-gray-900  w-1/2"
                              htmlFor="first_name"
                            >
                              ที่อยู่
                            </label>
                            <label
                              className="mb-2 pl-1 font-bold text-lg text-gray-900  w-1/2"
                              htmlFor="first_name"
                            >
                              อีเมล
                            </label>
                          </div>
                          <div className="flex flex-row">
                            <div className="ml-2 ">
                              <DatePicker
                                dateFormat="yyyy-MM-dd"
                                className=" py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-full "
                                maxDate={new Date()}
                                selected={new Date(values.birthday)}
                                onChange={(e) => handleChange("birthday", e)}
                              />
                            </div>
                            <input
                              className="ml-2 py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-1/2"
                              name="address"
                              id="address"
                              onChange={(e) => handleChange("Address", e)}
                            />
                            <input
                              className="ml-2 py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-1/2"
                              type="email"
                              name="email"
                              id="emaill"
                              onChange={(e) => handleChange("email", e)}
                            />
                          </div>
                        </div>

                        <div className="flex flex-col mb-4">
                          <div className="flex flex-row  ">
                            <label
                              className="ml-2 mb-2 pl-1 font-bold text-lg text-gray-900  w-1/2"
                              htmlFor="first_name"
                            >
                              เบอร์โทรศัพท์
                            </label>
                            <label
                              className="mb-2 pl-1 font-bold text-lg text-gray-900  w-1/2"
                              htmlFor="first_name"
                            >
                              รูปถ่าย
                            </label>
                            <label
                              className="ml-2 mb-2 pl-1 font-bold text-lg text-gray-900  w-1/2"
                              htmlFor="first_name"
                            >
                              ชั้นเรียนปัจจุบัน
                            </label>
                          </div>
                          <div className="flex flex-row">
                            <input
                              className="ml-2 py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-1/2"
                              type="text"
                              name="telnum"
                              id="telnum"
                              maxLength="10"
                              onChange={(e) => handleChange("phonenumber", e)}
                            />
                            <input
                              className="ml-2 py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-1/2"
                              type="file"
                              id="myfile"
                              onChange={(e) => imageadd(e.target.files[0])}
                            />
                            <select
                              className="ml-2 py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-1/2"
                              onChange={(e) =>
                                handleChange("classroom_code", e)
                              }
                            >
                              <option value={""}>กรุณาเลือกข้อมูล</option>
                              {classRoom
                                ? classRoom.map((p, index) => (
                                  <option
                                    key={index + 1}
                                    value={p.classroom_code}
                                  >
                                    {p.classroom_name}
                                  </option>
                                ))
                                : ""}
                            </select>
                            {/* <input className="ml-2 py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-1/2" type="text" name="grade" id="grade" onChange={(e) => handleChange('classroom_code', e)} /> */}
                          </div>
                        </div>

                        <div className="flex flex-col mb-4">
                          <div className="flex flex-row  ">
                            <label
                              className="ml-2 mb-2 pl-1 font-bold text-lg text-gray-900  w-1/2"
                              htmlFor="first_name"
                            >
                              ชื่อผู้ใช้
                            </label>
                            <label
                              className="ml-2 mb-2 pl-1 font-bold text-lg text-gray-900  w-1/2"
                              htmlFor="first_name"
                            >
                              รหัสผ่าน
                            </label>
                          </div>
                          <div className="flex flex-row">
                            <input
                              className="ml-2 py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-1/2"
                              type="text"
                              name="usaer_name"
                              id="user_name"
                              onChange={(e) => handleChange("username", e)}
                            />
                            <input
                              className="ml-2 py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-1/2"
                              type="password"
                              name="pass_word"
                              id="pass_word"
                              onChange={(e) => handleChange("password", e)}
                            />
                          </div>
                        </div>
                        <div className="flex flex-col mb-4">
                          <div className="flex flex-row  ">
                            <label
                              className="ml-2 mb-2 pl-1 font-bold text-lg text-gray-900  w-1/3"
                              htmlFor="first_name"
                            >
                              รายละเอียด
                            </label>
                          </div>
                          <div className="flex flex-row">
                            <textarea
                              className="ml-2 py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-full"
                              name="detail"
                              id="detail"
                              onChange={(e) => handleChange("detail", e)}
                            />
                          </div>
                          <hr className="mb-3" />
                          <div className="flex flex-row">
                            <button
                              type="button"
                              disabled={!values.student_code}
                              onClick={() => onInsert("parent")}
                              className={`mb-3   m-auto p-2 rounded-lg ml-2 w-full hover:text-white  text-blue-500 border-2  border-blue-500 ${!values.student_code
                                ? "bg-gray-200"
                                : "bg-white hover:bg-blue-500"
                                }`}
                            >
                              <labels className="">เพิ่มผู้ปกครองคน </labels>
                            </button>
                          </div>
                        </div>

                        {Open
                          ? Familys?.map((p, i) => (
                            <div className="flex flex-col mb-4" key={i}>
                              <label
                                className="mb-2 pl-1 font-bold text-lg text-gray-900  w-full"
                                htmlFor="first_name"
                              >
                                ข้อมูลผู้ปกครอง
                              </label>

                              <div className="border-2 border-blue-500 rounded  py-2 px-3 mb-3">
                                {/* ผู้ปกครองคนที่1 */}
                                <div>
                                  <div className="flex flex-row">
                                    <div className="w-1/2 self-center">
                                      <label
                                        className="mb-4 pl-1 font-bold text-lg text-gray-900 text-blue-500 w-full"
                                        htmlFor="first_name"
                                      >
                                        ผู้ปกครองคนที่{i + 1}
                                      </label>
                                    </div>
                                    <div className="w-1/2 text-right self-center">
                                      <button
                                        onClick={() => deleteFamilys(i)}
                                        className="mt-1 w-auto shadow hover:shadow-lg text-white bg-red-500 hover:text-red-500   border-2   border-red-500  hover:border-red-500  hover:bg-white rounded-lg background-transparent  uppercase px-6 py-1 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                      >
                                        <svg
                                          fill="none"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth="2"
                                          viewBox="0 0 24 24"
                                          stroke="currentColor"
                                          className="h-6 w-6"
                                        >
                                          <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                      </button>
                                    </div>
                                  </div>
                                  <hr className="mb-3" />
                                  <div className="flex flex-row mb-3">
                                    <label
                                      className="mb-2 pl-1 font-bold text-lg text-gray-900  w-full"
                                      htmlFor="first_name"
                                    >
                                      บัตรประชาชน
                                    </label>
                                  </div>
                                  <div className="flex flex-row mb-3">
                                    <input
                                      className=" py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-25"
                                      type="text"
                                      value={p.parent_idcard}
                                      onChange={(e) =>
                                        handleFamilys(i, e, "parent_idcard")
                                      }
                                      maxLength="13"
                                    // readOnly
                                    />
                                  </div>

                                  <div className="flex flex-row ">
                                    <label
                                      className="mb-2 pl-1 font-bold text-lg text-gray-900  w-full"
                                      htmlFor="first_name"
                                    >
                                      คำนำหน้า
                                    </label>
                                    <label
                                      className="mb-2 pl-1 font-bold text-lg text-gray-900  w-full"
                                      htmlFor="first_name"
                                    >
                                      ชื่อ
                                    </label>
                                    <label
                                      className="mb-2 pl-1 font-bold text-lg text-gray-900  w-full"
                                      htmlFor="first_name"
                                    >
                                      นามสกุล
                                    </label>
                                  </div>
                                  <div className="flex flex-row mb-3">
                                    <div class="relative inline-flex w-full">
                                      <svg
                                        class="w-2 h-2 absolute top-0 right-0 m-4 pointer-events-none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 412 232"
                                      >
                                        <path
                                          d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z"
                                          fill="#648299"
                                          fill-rule="nonzero"
                                        />
                                      </svg>
                                      <select
                                        value={p.title != "" ? p.title : ""}
                                        onChange={(e) =>
                                          handleFamilys(i, e, "title")
                                        }
                                        class="border border-gray-300 rounded-lg text-gray-600 h-10 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none w-full"
                                      >
                                        <option value={""} disabled>
                                          --กรุณาเลือกคำนำหน้า--
                                        </option>
                                        <option value={"นาย"}>นาย</option>
                                        <option value={"นาย"}>นางสาว</option>
                                        <option value={"นาย"}>นาง</option>
                                      </select>
                                    </div>
                                    {/* <input className=" py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-full" type="text"  onChange={(e) => handleInput('title', e)} /> */}
                                    <input
                                      className="ml-2 py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-full"
                                      type="text"
                                      value={p.firstname}
                                      onChange={(e) =>
                                        handleFamilys(i, e, "firstname")
                                      }
                                    />
                                    <input
                                      className="ml-2 py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-full"
                                      type="text"
                                      value={p.lastname}
                                      onChange={(e) =>
                                        handleFamilys(i, e, "lastname")
                                      }
                                    />
                                  </div>

                                  <div className="flex flex-row ">
                                    <label
                                      className="mb-2 pl-1 font-bold text-lg text-gray-900  w-1/2"
                                      htmlFor="first_name"
                                    >
                                      เบอร์โทรศัพท์
                                    </label>
                                    <label
                                      className="mb-2 pl-1 font-bold text-lg text-gray-900  w-1/2"
                                      htmlFor="first_name"
                                    >
                                      E-mail
                                    </label>
                                  </div>
                                  <div className="flex flex-row  mb-3">
                                    <input
                                      className=" py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-1/2"
                                      type="text"
                                      value={p.phonenumber}
                                      onChange={(e) =>
                                        handleFamilys(i, e, "phonenumber")
                                      }
                                    />
                                    <input
                                      className="ml-2 py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-1/2"
                                      type="text"
                                      value={p.email}
                                      onChange={(e) =>
                                        handleFamilys(i, e, "email")
                                      }
                                    />
                                  </div>
                                  <div className="flex flex-row ">
                                    <label
                                      className="mb-2 pl-1 font-bold text-lg text-gray-900  w-1/2"
                                      htmlFor="first_name"
                                    >
                                      username
                                    </label>
                                    <label
                                      className="mb-2 pl-1 font-bold text-lg text-gray-900  w-1/2"
                                      htmlFor="first_name"
                                    >
                                      password
                                    </label>
                                  </div>
                                  <div className="flex flex-row  mb-3">
                                    <input
                                      className=" py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-1/2"
                                      type="text"
                                      value={p.username}
                                      onChange={(e) =>
                                        handleFamilys(i, e, "username")
                                      }
                                    />
                                    <input
                                      className="ml-2 py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-1/2"
                                      type="text"
                                      value={p.password}
                                      onChange={(e) =>
                                        handleFamilys(i, e, "password")
                                      }
                                    />
                                  </div>
                                  <div className="flex flex-row ">
                                    <label
                                      className="pl-1 font-bold text-lg text-gray-900  w-full"
                                      htmlFor="first_name"
                                    >
                                      รายละเอียด
                                    </label>
                                  </div>
                                  <div className="flex flex-row  mb-3">
                                    <textarea
                                      className=" py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-full"
                                      value={p.detail}
                                      onChange={(e) =>
                                        handleFamilys(i, e, "detail")
                                      }
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))
                          : ""}

                        <div className="flex flex-col mb-4">
                          <div className="flex flex-row  ">
                            <label className="mb-2 pl-1  w-1/2">
                              <button onClick={() => console.log(Familys)}>
                                ClickFamilys
                              </button>
                            </label>
                            <label
                              className="ml-2 mb-2 pl-1 font-bold text-lg text-gray-900  w-1/2"
                              htmlFor="first_name"
                            >
                              ผู้สร้าง
                            </label>
                          </div>
                          <div className="flex flex-row">
                            <label className="mb-2 pl-1  w-1/2"></label>
                            <input
                              className=" py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow  w-1/2"
                              type="password"
                              name="password"
                              id="password"
                              disabled
                            />
                          </div>
                        </div>
                      </div>
                    </>

                    {/*footer*/}
                    <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                      {/* <button
                                                className=" shadow hover:shadow-lg text-white bg-red-600 hover:text-red-600   border-2   border-red-600 hover:border-red-600  hover:bg-white rounded-lg background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                type="button"
                                                onClick={() => showData()}
                                            >
                                                ShowData
                                            </button> */}
                      <button
                        className=" shadow hover:shadow-lg text-white bg-red-600 hover:text-red-600   border-2   border-red-600 hover:border-red-600  hover:bg-white rounded-lg background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => CancelClick()}
                      >
                        ยกเลิก
                      </button>
                      <button
                        className=" shadow hover:shadow-lg text-white bg-green-600 hover:text-green-600   border-2   border-green-600  hover:border-green-600  hover:bg-white rounded-lg background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => SaveSubmit()}
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
          {Showmodaledit ? (
            <>
              <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-full  m-auto mb-6 mx-auto max-w-6xl  max-h-full ">
                  {/*content*/}
                  <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    {/*header*/}
                    <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t text-color-blue">
                      <h3 className="text-2xl font-semibold text-center w-full ml-5">
                        แก้ไขข้อมูลนักเรียน
                      </h3>
                      <button
                        className="p-1 ml-auto bg-transparent border-0 text-black  float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                        onClick={() => CancelClick()}
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
                      <div className="flex flex-col  w-full px-2  ">
                        <div className="flex flex-col mb-4">
                          <label
                            className="mb-2 pl-1 font-bold text-lg text-gray-900"
                            htmlFor="first_name"
                          >
                            รหัสนักเรียน
                          </label>
                          <input
                            className=" py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-1/2"
                            type="text"
                            value={values.student_code}
                          />
                        </div>
                        <div className="flex flex-col mb-4">
                          <div className="flex flex-row  ">
                            <label className="mb-2 pl-1 font-bold text-lg text-gray-900  w-1/2">
                              คำนำหน้า
                            </label>
                            <label className="mb-2 pl-1 font-bold text-lg text-gray-900  w-1/2">
                              ชื่อ
                            </label>
                            <label className="ml-2 mb-2 pl-1 font-bold text-lg text-gray-900  w-1/2">
                              นามสกุล
                            </label>
                          </div>
                          <div className="flex flex-row">
                            <div class="relative inline-flex w-1/2">
                              <svg
                                class="w-2 h-2 absolute top-0 right-0 m-4 pointer-events-none"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 412 232"
                              >
                                <path
                                  d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z"
                                  fill="#648299"
                                  fill-rule="nonzero"
                                />
                              </svg>
                              <select
                                class="border border-gray-300 rounded-lg text-gray-600 h-10 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none w-full"
                                value={values.title}
                                onChange={(e) => handleChange("title", e)}
                              >
                                <option value="">--กรุณาเลือกคำนำหน้า--</option>
                                <option value="เด็กชาย">เด็กชาย</option>
                                <option value="เด็กหญิง">เด็กหญิง</option>
                                <option value="นาย">นาย</option>
                                <option value="นางสาว">นางสาว</option>
                                <option value="นาง">นาง</option>
                              </select>
                            </div>
                            <input
                              className="ml-2 py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-1/2"
                              type="text"
                              value={values.firstname}
                              onChange={(e) => handleChange("firstname", e)}
                            />
                            <input
                              className="ml-2 py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-1/2"
                              type="text"
                              value={values.lastname}
                              onChange={(e) => handleChange("lastname", e)}
                            />
                          </div>
                        </div>
                        <div className="flex flex-col mb-4">
                          <div className="flex flex-row  ">
                            <label
                              className=" mb-2 pl-1 font-bold text-lg text-gray-900  w-1/2"
                              htmlFor=""
                            >
                              รหัสบัตรประชาชน
                            </label>
                            <label
                              className=" mb-2 pl-1 font-bold text-lg text-gray-900  w-1/2"
                              htmlFor=""
                            >
                              ชื่อ (ภาษาอังกฤษ)
                            </label>
                            <label
                              className=" mb-2 pl-1 font-bold text-lg text-gray-900  w-1/2"
                              htmlFor=""
                            >
                              นามสกุล (ภาษาอังกฤษ)
                            </label>
                          </div>
                          <div className="flex flex-row mb-4">
                            <input
                              className=" py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-1/2"
                              type="text"
                              value={values.student_idcard}
                              maxLength="13"
                              onChange={(e) =>
                                handleChange("student_idcard", e)
                              }
                            />
                            <input
                              className="ml-2 py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-1/2"
                              type="text"
                              value={values.firstname_en}
                              maxLength="13"
                              onChange={(e) => handleChange("firstname_en", e)}
                            />
                            <input
                              className="ml-2 py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-1/2"
                              type="text"
                              value={values.lastname_en}
                              maxLength="13"
                              onChange={(e) => handleChange("lastname_en", e)}
                            />
                          </div>
                          <div className="flex flex-row ">
                            <label
                              className=" mb-2 pl-1 font-bold text-lg text-gray-900  w-1/2"
                              htmlFor=""
                            >
                              วันเกิด
                            </label>
                            <label
                              className=" mb-2 pl-1 font-bold text-lg text-gray-900  w-1/2"
                              htmlFor=""
                            >
                              ที่อยู่
                            </label>
                            <label
                              className="mb-2 pl-1 font-bold text-lg text-gray-900  w-1/2"
                              htmlFor=""
                            >
                              อีเมล
                            </label>
                          </div>
                          <div className="flex flex-row mb-4">
                            <div className="w-1/2">
                              <DatePicker
                                dateFormat="yyyy-MM-dd"
                                className=" py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-full "
                                maxDate={new Date()}
                                selected={new Date(values.birthday)}
                                onChange={(e) => handleChange("birthday", e)}
                              />
                            </div>
                            <input
                              className="ml-2 py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-1/2"
                              type="text"
                              value={values.Address}
                              onChange={(e) => handleChange("Address", e)}
                            />
                            <input
                              className="ml-2 py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-1/2"
                              type="text"
                              value={values.email}
                              onChange={(e) => handleChange("email", e)}
                            />
                          </div>
                        </div>
                        <div className="flex flex-col mb-4">
                          <div className="flex flex-row  ">
                            <label
                              className="mb-2 pl-1 font-bold text-lg text-gray-900  w-1/2"
                              htmlFor="first_name"
                            >
                              เบอร์โทรศัพท์
                            </label>
                            <label
                              className="mb-2 pl-1 font-bold text-lg text-gray-900  w-1/2"
                              htmlFor="first_name"
                            >
                              รูปถ่าย
                            </label>
                            <label
                              className="ml-2 mb-2 pl-1 font-bold text-lg text-gray-900  w-1/2"
                              htmlFor="first_name"
                            >
                              ชั้นเรียนปัจจุบัน
                            </label>
                          </div>
                          <div className="flex flex-row">
                            <input
                              className="py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-1/2"
                              type="text"
                              maxLength="10"
                              value={values.phonenumber}
                              onChange={(e) => handleChange("phonenumber", e)}
                            />
                            <input
                              className="ml-2 py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-1/2"
                              type="file"
                              id="myfile"
                              onChange={(e) => imageadd(e.target.files[0])}
                            />
                            <select
                              className="ml-2 py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-1/2"
                              value={values.classroom_code || ""}
                              onChange={(e) =>
                                handleChange("classroom_code", e)
                              }
                            >
                              <option value={""}>กรุณาเลือกข้อมูล</option>
                              {classRoom
                                ? classRoom.map((p, index) => (
                                  <option
                                    key={index + 1}
                                    value={p.classroom_code}
                                  >
                                    {p.classroom_name}
                                  </option>
                                ))
                                : ""}
                            </select>
                            {/* <input className="ml-2 py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-1/2" type="text" value={values.classroom_code} onChange={(e) => handleChange('classroom_code', e)} /> */}
                          </div>
                        </div>

                        <div className="flex flex-col mb-4">
                          <div className="flex flex-row  ">
                            <label
                              className="mb-2 pl-1 font-bold text-lg text-gray-900  w-1/2"
                              htmlFor="first_name"
                            >
                              ชื่อผู้ใช้
                            </label>
                            <label
                              className="ml-2 mb-2 pl-1 font-bold text-lg text-gray-900  w-1/2"
                              htmlFor="first_name"
                            >
                              รหัสผ่าน
                            </label>
                          </div>
                          <div className="flex flex-row">
                            <input
                              className=" py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-1/2"
                              type="text"
                              disabled
                              value={values.username}
                              onChange={(e) => handleChange("username", e)}
                            />
                            <input
                              className="ml-2 py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-1/2"
                              type="password"
                              name="password"
                              id="password"
                              value={values.password}
                              onChange={(e) => handleChange("password", e)}
                            />
                          </div>
                        </div>
                        <div className="flex flex-col mb-4">
                          <div className="flex flex-row  ">
                            <label
                              className=" mb-2 pl-1 font-bold text-lg text-gray-900  w-1/3"
                              htmlFor="first_name"
                            >
                              รายละเอียด
                            </label>
                          </div>
                          <div className="flex flex-row">
                            <textarea
                              className=" py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-full"
                              value={values.detail}
                              onChange={(e) => handleChange("detail", e)}
                            />
                          </div>
                        </div>
                        <div className="mb-3 flex flex-row ">
                          <button
                            type="button"
                            disabled={!values.student_code}
                            onClick={() => onInsert("parent")}
                            className="  hover:bg-blue-500 m-auto p-2 rounded-lg ml-2 w-full hover:text-white  text-blue-500 border-2  border-blue-500 bg-white  "
                          >
                            <labels className="">เพิ่มผู้ปกครองคน</labels>
                          </button>
                        </div>

                        {Familys?.map((p, i) => (
                          <div className="flex flex-col mb-4" key={i}>
                            <label
                              className="mb-2 pl-1 font-bold text-lg text-gray-900  w-full"
                              htmlFor="first_name"
                            >
                              ข้อมูลผู้ปกครอง
                            </label>

                            <div className="border-2 border-blue-500 rounded  py-2 px-3 mb-3">
                              {/* ผู้ปกครองคนที่1 */}
                              <div>
                                <div className="flex flex-row">
                                  <div className="w-1/2 self-center">
                                    <label
                                      className="mb-4 pl-1 font-bold text-lg text-gray-900 text-blue-500 w-full"
                                      htmlFor="first_name"
                                    >
                                      ผู้ปกครองคนที่{i + 1}
                                    </label>
                                  </div>
                                  <div className="w-1/2 text-right self-center">
                                    <button
                                      onClick={() => deleteFamilys(i)}
                                      className="mt-1 w-auto shadow hover:shadow-lg text-white bg-red-500 hover:text-red-500   border-2   border-red-500  hover:border-red-500  hover:bg-white rounded-lg background-transparent  uppercase px-6 py-1 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                    >
                                      <svg
                                        fill="none"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        className="h-6 w-6"
                                      >
                                        <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                      </svg>
                                    </button>
                                  </div>
                                </div>
                                <hr className="mb-3" />
                                <div className="flex flex-row mb-3">
                                  <label
                                    className="mb-2 pl-1 font-bold text-lg text-gray-900  w-full"
                                    htmlFor="first_name"
                                  >
                                    บัตรประชาชน
                                  </label>
                                </div>
                                <div className="flex flex-row mb-3">
                                  <input
                                    className=" py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-25"
                                    type="text"
                                    value={p.parent_idcard}
                                    onChange={(e) =>
                                      handleFamilys(i, e, "parent_idcard")
                                    }
                                    maxLength="13"
                                  // readOnly
                                  />
                                </div>

                                <div className="flex flex-row ">
                                  <label
                                    className="mb-2 pl-1 font-bold text-lg text-gray-900  w-full"
                                    htmlFor="first_name"
                                  >
                                    คำนำหน้า
                                  </label>
                                  <label
                                    className="mb-2 pl-1 font-bold text-lg text-gray-900  w-full"
                                    htmlFor="first_name"
                                  >
                                    ชื่อ
                                  </label>
                                  <label
                                    className="mb-2 pl-1 font-bold text-lg text-gray-900  w-full"
                                    htmlFor="first_name"
                                  >
                                    นามสกุล
                                  </label>
                                </div>
                                <div className="flex flex-row mb-3">
                                  <div class="relative inline-flex w-full">
                                    <svg
                                      class="w-2 h-2 absolute top-0 right-0 m-4 pointer-events-none"
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="0 0 412 232"
                                    >
                                      <path
                                        d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z"
                                        fill="#648299"
                                        fill-rule="nonzero"
                                      />
                                    </svg>
                                    <select
                                      value={p.title != "" ? p.title : ""}
                                      onChange={(e) =>
                                        handleFamilys(i, e, "title")
                                      }
                                      class="border border-gray-300 rounded-lg text-gray-600 h-10 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none w-full"
                                    >
                                      <option value={""} disabled>
                                        --กรุณาเลือกคำนำหน้า--
                                      </option>
                                      <option value={"นาย"}>นาย</option>
                                      <option value={"นาย"}>นางสาว</option>
                                      <option value={"นาย"}>นาง</option>
                                    </select>
                                  </div>
                                  {/* <input className=" py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-full" type="text"  onChange={(e) => handleInput('title', e)} /> */}
                                  <input
                                    className="ml-2 py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-full"
                                    type="text"
                                    value={p.firstname}
                                    onChange={(e) =>
                                      handleFamilys(i, e, "firstname")
                                    }
                                  />
                                  <input
                                    className="ml-2 py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-full"
                                    type="text"
                                    value={p.lastname}
                                    onChange={(e) =>
                                      handleFamilys(i, e, "lastname")
                                    }
                                  />
                                </div>

                                <div className="flex flex-row ">
                                  <label
                                    className="mb-2 pl-1 font-bold text-lg text-gray-900  w-1/2"
                                    htmlFor="first_name"
                                  >
                                    เบอร์โทรศัพท์
                                  </label>
                                  <label
                                    className="mb-2 pl-1 font-bold text-lg text-gray-900  w-1/2"
                                    htmlFor="first_name"
                                  >
                                    E-mail
                                  </label>
                                </div>
                                <div className="flex flex-row  mb-3">
                                  <input
                                    className=" py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-1/2"
                                    type="text"
                                    value={p.phonenumber}
                                    onChange={(e) =>
                                      handleFamilys(i, e, "phonenumber")
                                    }
                                  />
                                  <input
                                    className="ml-2 py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-1/2"
                                    type="text"
                                    value={p.email}
                                    onChange={(e) =>
                                      handleFamilys(i, e, "email")
                                    }
                                  />
                                </div>
                                <div className="flex flex-row ">
                                  <label
                                    className="mb-2 pl-1 font-bold text-lg text-gray-900  w-1/2"
                                    htmlFor="first_name"
                                  >
                                    username
                                  </label>
                                  <label
                                    className="mb-2 pl-1 font-bold text-lg text-gray-900  w-1/2"
                                    htmlFor="first_name"
                                  >
                                    password
                                  </label>
                                </div>
                                <div className="flex flex-row  mb-3">
                                  <input
                                    className=" py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-1/2"
                                    type="text"
                                    value={p.username}
                                    onChange={(e) =>
                                      handleFamilys(i, e, "username")
                                    }
                                  />
                                  <input
                                    className="ml-2 py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-1/2"
                                    type="text"
                                    value={p.password}
                                    onChange={(e) =>
                                      handleFamilys(i, e, "password")
                                    }
                                  />
                                </div>
                                <div className="flex flex-row ">
                                  <label
                                    className="pl-1 font-bold text-lg text-gray-900  w-full"
                                    htmlFor="first_name"
                                  >
                                    รายละเอียด
                                  </label>
                                </div>
                                <div className="flex flex-row  mb-3">
                                  <textarea
                                    className=" py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-full"
                                    value={p.detail}
                                    onChange={(e) =>
                                      handleFamilys(i, e, "detail")
                                    }
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                        {/* <div className="flex flex-col mb-4">
                                                    <label className="mb-2 pl-1 font-bold text-lg text-gray-900  w-full" htmlFor="first_name">ข้อมูลผู้ปกครอง</label>

                                                    <div className="border-2 border-blue-500 rounded  py-2 px-3 mb-3">
                                                        <div>
                                                            <label className="mb-4 pl-1 font-bold text-lg text-gray-900 text-blue-500 w-full" htmlFor="first_name">ผู้ปกครองคนที่1</label>
                                                            <hr className="mb-3" />
                                                            <div className="flex flex-row ">

                                                                <label className="mb-2 pl-1 font-bold text-lg text-gray-900  w-full" htmlFor="first_name">คำนำหน้า</label>
                                                                <label className="mb-2 pl-1 font-bold text-lg text-gray-900  w-full" htmlFor="first_name">ชื่อ</label>
                                                                <label className="mb-2 pl-1 font-bold text-lg text-gray-900  w-full" htmlFor="first_name">นามสกุล</label>
                                                            </div>
                                                            <div className="flex flex-row mb-3">
                                                                <div class="relative inline-flex w-full">
                                                                    <svg class="w-2 h-2 absolute top-0 right-0 m-4 pointer-events-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 412 232"><path d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z" fill="#648299" fill-rule="nonzero" /></svg>
                                                                    <select class="border border-gray-300 rounded-lg text-gray-600 h-10 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none w-full" onChange={(e) => handleInput('title', e)}>
                                                                        <option>--กรุณาเลือกคำนำหน้า--</option>
                                                                        <option>นาย</option>
                                                                        <option>นางสาว</option>
                                                                        <option>นาง</option>
                                                                    </select>
                                                                </div>

                                                                <input className="ml-2 py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-full" type="text" onChange={(e) => handleInput('firstname', e)} />
                                                                <input className="ml-2 py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-full" type="text" onChange={(e) => handleInput('lastname', e)} />
                                                            </div>

                                                            <div className="flex flex-row ">
                                                                <label className="mb-2 pl-1 font-bold text-lg text-gray-900  w-1/2" htmlFor="first_name">เบอร์โทรศัพท์</label>
                                                                <label className="mb-2 pl-1 font-bold text-lg text-gray-900  w-1/2" htmlFor="first_name">E-mail</label>
                                                            </div>
                                                            <div className="flex flex-row  mb-3">
                                                                <input className="py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-1/2" type="text" onChange={(e) => handleInput('phonenumber', e)} />
                                                                <input className="ml-2 py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-1/2" type="text" onChange={(e) => handleInput('email', e)} />
                                                            </div>
                                                            <div className="flex flex-row ">
                                                                <label className="mb-2 pl-1 font-bold text-lg text-gray-900  w-1/2" htmlFor="first_name">username</label>
                                                                <label className="mb-2 pl-1 font-bold text-lg text-gray-900  w-1/2" htmlFor="first_name">password</label>
                                                            </div>
                                                            <div className="flex flex-row  mb-3">
                                                                <input className=" py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-1/2" disabled type="text" onChange={(e) => handleInput('username', e)} />
                                                                <input className="ml-2 py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-1/2" type="text" onChange={(e) => handleInput('password', e)} />
                                                            </div>
                                                            <div className="flex flex-row ">
                                                                <label className="pl-1 font-bold text-lg text-gray-900  w-full" htmlFor="first_name">รายละเอียด</label>

                                                            </div>
                                                            <div className="flex flex-row  mb-3">

                                                                <textarea className=" py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-full" onChange={(e) => handleInput('detail', e)} />
                                                            </div>
                                                        </div>
                                                        <hr className="mb-3" />


                                                    </div>
                                                </div> */}

                        <div className="flex flex-col mb-4">
                          <div className="flex flex-row  ">
                            <label className="mb-2 pl-1  w-1/2"></label>
                            <label
                              className="ml-2 mb-2 pl-1 font-bold text-lg text-gray-900  w-1/2"
                              htmlFor="first_name"
                            >
                              ผู้สร้าง
                            </label>
                          </div>
                          <div className="flex flex-row">
                            <label className="mb-2 pl-1  w-1/2"></label>
                            <input
                              className=" py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow  w-1/2"
                              type="password"
                              name="password"
                              id="password"
                              disabled
                              value={values.who}
                              onChange={(e) => handleChange("who", e)}
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
                        onClick={() => CancelClick()}
                      >
                        ยกเลิก
                      </button>
                      <button
                        className=" shadow hover:shadow-lg text-white bg-green-600 hover:text-green-600   border-2   border-green-600  hover:border-green-600  hover:bg-white rounded-lg background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => SaveSubmit()}
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

export default Information_student;
