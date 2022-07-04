import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Clock from "react-live-clock";
import moment from "moment";
import Swal from "sweetalert2";
import Sidebar from "../../component/layout/teacher/sidebar";
import Nav from "../../component/layout/teacher/nav";
import Footer from "../../component/layout/footer";
import Image from "next/image";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import { upload } from "../../action/teacher";
import { columns, data } from "../../component/layout/data";
import {
  classroom_student,
  postManageStudentsComment,
  getallbehaviour,
  postsendbehaviour,
} from "../../action/teacher";

import {
  getStudent,
  postStudentAdd,
  putStudentUpdate,
  deleteStudent,
  findbyidcard,
} from "../../action/student";
import { getParent, postParentAdd, putParentUpdate } from "../../action/parent";
import { getClassroom } from "../../action/admin";
import { getStudent_One } from "../../action/student";
function Comments() {
  const router = useRouter();
  const [Open, setOpen] = useState(false);
  const [Teacher_Code, setTeacher_Code] = useState("");
  const [StudentMap, setStudentMap] = useState("");
  const [allBehaviour, setAllBehaviour] = useState("");
  const [classRoom, setclassRoom] = useState();
  const [IncreaseDecrease, SetIncreaseDecrease] = useState("");
  const [CommentMap, setCommentMap] = useState({
    birthday: "",
    classroom_code: "",
    classroom_name: "",
    comment_detail: "",
    detail: "",
    firstname: "",
    firstname_en: "",
    lastname: "",
    lastname_en: "",
    phonenumber: "",
    picture: "",
    score: 0,
    student_code: "",
    title: "F",
  });

  const [BehaviourSave, setBehaviourSave] = useState({
    behaviour: "",
    score_type: "",
    score_amount: "",
    student_code: "",
    teacher_code: "",
    detail: "",
  });
  const [CommentSave, setCommentSave] = useState({
    student_code: "",
    teacher_code: "",
    comment_code: null,
    comment_detail: "",
  });
  const [THdate, setTHdate] = useState("");
  const [Showmodaledit, setShowmodaledit] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showModalscore, setShowModalscore] = useState(false);
  const [Familys, setFamilys] = useState([]);

  const [GetIdparent, setGetIdparent] = useState();

  const [StartDate, setStartDate] = useState(new Date());
  const [EndDate, setEndDate] = useState(new Date());
  const options = {
    maintainAspectRatio: false, // Don't maintain w/h ratio
  };
  const [Who, setWho] = useState();
  const [Enablemorning, setEnablemorning] = useState(true);
  const [Enablelate, setEnablelate] = useState(true);
  const [Enableevening, setEnableevening] = useState(true);

  const [Showmodaladd, setShowmodaladd] = useState(false);

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

  const idcardcheck = async (e) => {
    let data;
    console.log(e.target.value.length);
    if (String(e.target.value).length == 13) {
      data = await findbyidcard(e.target.value);
      console.log(data.length);
    }
  };
  const Dataload = async () => {
    let data = await classroom_student({
      classroom_code: localStorage.getItem("LoginRoomId"),
    });
    if (data) {
      setStudentMap(data);
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
    let save_student = values;
    let data_p1 = "";
    let data_p2 = "";
    let data_p3 = "";
    save_student.createdate = moment().format("YYYY-MM-DD HH:mm:ss");
    // save_student.parent_1 = Parent1.parent_code
    // save_student.parent_2 = Parent2.parent_code
    // save_student.parent_3 = Parent3.parent_code
    save_student.who = Who;

    // console.log(Parent1)
    console.log(Familys, "fam");
    console.log(values, "data");

    data_p1 = await postParentAdd(Familys);
    console.log(data_p1, "data_p1");
    data = await putStudentUpdate(values);
    console.log(values, "update data");

    // data_p2 = await putParentUpdate(Parent2)
    // data_p3 = await putParentUpdate(Parent3)
    // data = await putStudentUpdate(save_student)
    console.log("modaledit", Showmodaledit);
    setShowmodaledit(false);

    Dataload();
    Pull_dataparent();
    console.log("Values", values);
  };

  const Deatailstudent = async (i) => {
    let data = await getStudent_One(i);
    if (data.length) {
      setValues(data[0]);
    }
    let res_parent = await getParent();
    let parent_arr = res_parent.filter(
      (x) => x.student_code == data[0].student_code
    );
    Familys = parent_arr;
    // let datafix = [{
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
    //     parent1 = datafix
    // }

    setFamilys([...Familys]);
    setShowmodaledit(true);
  };
  const DetailClick = (i) => {
    console.log(StudentMap[i]);
    setCommentSave({
      student_code: StudentMap[i].student_code,
      teacher_code: Teacher_Code,
      comment_code: null,
      comment_detail: "",
    });
    setBehaviourSave({
      student_code: StudentMap[i].student_code,
      teacher_code: Teacher_Code,
      behaviour: "",
      score_type: "",
      score_amount: "",
      detail: "",
    });
    setCommentMap(StudentMap[i]);
    setShowModal(true);
  };
  const ScoreClick = (i) => {
    console.log(StudentMap[i]);
    setCommentSave({
      student_code: StudentMap[i].student_code,
      teacher_code: Teacher_Code,
      comment_code: null,
      comment_detail: "",
    });
    setBehaviourSave({
      student_code: StudentMap[i].student_code,
      teacher_code: Teacher_Code,
      behaviour: "",
      score_type: "",
      score_amount: "",
      detail: "",
    });
    setCommentMap(StudentMap[i]);
    setShowModalscore(true);
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
  const handleChange = (name, e) => {
    if (name == "birthday") {
      // console.log('dob', moment(e).format('YYYY-MM-DD'))
      values[name] = moment(e).format("YYYY-MM-DD");
    } else {
      console.log("ข้อมูลอัพเดท", e.target.value);
      values[name] = e.target.value;
    }

    setValues({ ...values });
  };
  const search = (e) => {
    async function getdatapersondate_() {
      let check = [];
      let search = [];
      let event = e.target.value.toUpperCase();
      let data = await classroom_student({
        classroom_code: localStorage.getItem("LoginRoomId"),
      });
      console.log(data);
      check = data;
      if (data) {
        var matches = check.filter(function (x) {
          return (
            x.firstname?.toUpperCase().includes(event) ||
            x.lastname?.toUpperCase().includes(event) ||
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
  
  const hadleChange_Comment = (name, e) => {
    CommentSave[name] = e.target.value;

    console.log(e.target.value);

    setCommentSave({ ...CommentSave });
  };
  const handleChangestudent = (name, e) => {
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
    } else {
      // console.log('event',e.target.value);
      values[name] = e.target.value;
    }

    setValues({ ...values });
    // console.log('Values', e.target.value);
    // }
  };
  const handleInput = async (name, e) => {
    Parent1[name] = e.target.value;
    setParent1({ ...Parent1 });
    if (name == "parent_idcard" && String(e.target.value).length == 13) {
      let data = await findbyidcard(e.target.value);
      console.log(e.target.value);
      console.log(data.length);
      if (data.length > 0) {
        setParent1({
          parent_idcard: data[0].parent_idcard,
          title: data[0].title,
          firstname: data[0].firstname,
          lastname: data[0].lastname,
          phonenumber: data[0].phonenumber,
          Address: data[0].Address,
          email: data[0].email,
          picture: data[0].picture,
          username: data[0].username,
          password: data[0].password,
          role: 5,
          detail: data[0].detail,
          createdate: moment().format("YYYY-MM-DD HH:mm:ss"),
          who: data[0].who,
        });
      }
    }
  };

  const addcommit = async () => {
    console.log(CommentSave, "CommentSave");
    let data = await postManageStudentsComment(CommentSave);

    console.log(data, "data");
    setShowModal(false);
  };

  const handleFamilys = (i, e, name) => {
    Familys[i][name] = e.target.value;
    setFamilys([...Familys]);
  };

  const deleteFamilys = (i) => {
    Familys.splice(i, 1);
    setFamilys([...Familys]);
  };

  const onInsertFamilys = () => {
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
  };

  const hadleChange_behaviour = (name, e) => {
    const ee = "";

    if (name == "behaviour") {
      console.log(
        e.target.options[e.target.selectedIndex].attributes.name.value,
        "setamount"
      );

      ee = e.target.options[e.target.selectedIndex].attributes.name.value;
      console.log(ee);
      setBehaviourSave({
        ...BehaviourSave,
        behaviour: e.target.value,
        score_amount: ee,
      });
    } else {
      BehaviourSave[name] = e.target.value;
      setBehaviourSave({ ...BehaviourSave });
    }

    console.log(e.target.value, "value");
  };

  const addbehaviour = async () => {
    if (BehaviourSave.behaviour != 0) {
      console.log(BehaviourSave, "BehaviourSave");
      console.log(CommentSave);
      let data = await postsendbehaviour(BehaviourSave);
      console.log(data, "data");
      setShowModalscore(false);
    } else {
      Swal.fire("กรอกข้อมูลไม่ครบ!", "กรุณาเลือกเหตุผล.", "warning");
    }
    let data = await classroom_student({
      classroom_code: localStorage.getItem("LoginRoomId"),
    });
    if (data) {
      setStudentMap(data);
    }
    let behaviour = await getallbehaviour();
    setAllBehaviour(behaviour);
    console.log("behaviour-data", behaviour);
    setTeacher_Code(localStorage.getItem("LoginId"));
    console.log(data);
  };
  useEffect(async () => {
    Dataload();
    let behaviour = await getallbehaviour();
    setAllBehaviour(behaviour);
    console.log("behaviour-data", behaviour);
    let data = await getClassroom();
    console.log(data);
    setclassRoom(data);
    setTeacher_Code(localStorage.getItem("LoginId"));
    console.log(data);
    timezone();
  }, []);

  return (
    <div>
      <div className="flex flex-row min-h-screen bg-gray-100 text-gray-800 z-40 absolute w-full  ">
        <Sidebar></Sidebar>

        <main className="flex flex-col flex-grow w-full transition-all duration-150 ease-in md:w-4/5 main md:ml-0">
          <Nav></Nav>
          <div className="ml-12">
            <div className="main-content flex flex-col flex-grow p-4 w-full">
              <div className="flex md-4">

                <h1 className="   lg:w-3/4 w-1/4  lg:text-xl sm:text-sm text-base text-center text-color-blue"></h1>
                <h1 className=" lg:w-1/4 w-3/4 lg:text-xl m:text-sm text-base text-right  text-color-blue">
                  <p>{THdate}</p>
                </h1>

              </div>
              <div className="flex flex-col ">


                <h1 className="  lg:text-xl m:text-sm text-base text-right  text-color-blue">
                  <div>
                    <Clock
                      format={"HH:mm:ss"}
                      ticking={true}
                      timezone={"Asia/Bangkok"}
                    />
                  </div>
                </h1>
              </div>
              <h1 className="  lg:text-xl text-lg text-center text-color-blue">
                จัดการนักเรียน
              </h1>
              {/* main */}

              <div className="   text-base text-left  my-2  lg:w-1/4 w-3/5 ">
                <input
                  onChange={(e) => search(e)}
                  className=" p-2 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-full "
                  placeholder="Search for users"
                />
              </div>

              <div className="flex flex-row   h-full  w-full">
                <div className="px-1 w-full text-left overflow-x-auto">
                  <table className="w-full ">
                    <tr className=" bg-gray-300 ">
                      {/* <th className="py-2 w-1/12 text-center" >
                                            <label class="inline-flex items-center mt-3  rounded-lg">
                                                <input id="toogleAll" type="checkbox" class="form-checkbox h-5 w-5 text-blue-600  outline-none  m_all " onChange={(e) => all(e)} />
                                            </label>
                                        </th> */}

                      <th className="py-2 pl-2 pr-3 text-gray-500 w-1/12 text-center">
                        <div className="h-10 w-10"></div>
                      </th>
                      <th className="py-2 text-gray-500 w-2/12 pr-10">ชื่อ</th>
                      <th className="py-2 text-gray-500 w-2/12 pr-10">
                        นามสกุล
                      </th>
                      <th className="py-2 text-gray-500 w-2/12 pr-10">ชั้น</th>
                      <th className="py-2 text-gray-500 w-4/12 "></th>
                    </tr>

                    {StudentMap
                      ? StudentMap.map((p, index) => (
                        <tr
                          key={index + 1}
                          className="border border-gray-300 "
                        >
                          <td className="flex pl-2 pr-3 py-2 text-center justify-center ">
                            {p.picture ? (
                              <img
                                src={p.picture}
                                alt
                                className="h-10 w-10 bg-gray-200 border rounded-full"
                              />
                            ) : (
                              <img
                                src="/icon/blank-profile.png"
                                alt
                                className="h-10 w-10 bg-gray-200 border rounded-full"
                              />
                            )}
                          </td>
                          <td className="py-2 pr-10">{p.firstname}</td>
                          <td className="py-2 pr-10">{p.lastname}</td>
                          <td className="py-2 pr-10">{p.classroom_name}</td>

                          <td className=" grid-flow-col  gap-4 w-full ">
                            <td className="w-1/12 text-center">
                              <button
                                title="แสดงความคิดเห็น"
                                className="mt-1  shadow hover:shadow-lg text-white bg-blue-500 hover:text-blue-500   border-2   border-blue-500  hover:border-blue-500  hover:bg-white rounded-lg background-transparent  uppercase px-6 py-1 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={() => DetailClick(index)}
                              >
                                <div className=" items-center justify-center content-center    ">
                                  <svg
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    className="h-6 w-6"
                                  >
                                    <path d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                                  </svg>
                                  {/* <div className="ml-3 mt-1"></div> */}
                                </div>
                              </button>
                            </td>
                            <td className="w-1/12 text-center">
                              <button
                                title="คะแนนความประพฤติ"
                                className="mt-1  shadow hover:shadow-lg text-white bg-indigo-500 hover:text-indigo-500   border-2   border-indigo-500  hover:border-indigo-500  hover:bg-white rounded-lg background-transparent  uppercase px-6 py-1 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={() => ScoreClick(index)}
                              >
                                <div className=" items-center justify-center content-center    ">
                                  <svg
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    className="h-6 w-6"
                                  >
                                    <path d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                                  </svg>
                                  {/* <div className="ml-3 mt-1"></div> */}
                                </div>
                              </button>
                            </td>
                            <td className="w-1/12 text-center  ">
                              <button
                                title="แก้ไขข้อมูล"
                                className="mt-1  shadow hover:shadow-lg text-white  bg-purple-400 hover:text-purple-400   border-2   border-purple-400  hover:border-purple-400  hover:bg-white rounded-lg background-transparent  uppercase px-6 py-1 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={() => Deatailstudent(p.student_code)}
                              >
                                <div className=" items-center justify-center content-center    ">
                                  <svg
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    className="h-6 w-6"
                                  >
                                    <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                                  </svg>
                                </div>
                              </button>
                            </td>
                            <td className="w-1/12 text-center  ">
                              <a
                                href="https://smartschool.noodee.net/teacher/assessment"
                                title="แบบประเมิน"
                                className="mt-1 shadow hover:shadow-lg text-white  bg-purple-500 hover:text-purple-500   border-2   border-purple-500  hover:border-purple-500  hover:bg-white rounded-lg background-transparent  uppercase px-6 py-1 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                              // onClick={() => Deatailstudent(p.student_code)}
                              >
                                <div className="items-center justify-center content-center    ">
                                  <svg
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    className="h-6 w-6"
                                  >
                                    <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                                  </svg>
                                </div>
                              </a>
                            </td>
                          </td>
                        </tr>
                      ))
                      : ""}
                  </table>
                </div>
              </div>
              {/* Modal */}
              {showModal ? (
                <>
                  <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                    <div className="relative w-8/12   mt-28 mb-6 mx-auto max-w-2xl  max-h-auto ">
                      {/*content*/}
                      <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        {/*header*/}
                        <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t text-color-blue">
                          <h3 className="text-2xl font-semibold text-center w-full ml-5">
                            แสดงความคิดเห็น
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
                        <div className="relative p-6 flex-auto  ">
                          <div className=" flex my-4  text-lg leading-relaxed   h-44 ">
                            {/* <img src="/public/img-informaiton/information.jpg" className=" w-100" alt="" /> */}
                            <div className="flex  h-full  rounded-lg  w-3/12 mr-4 ">
                              {/* <Image
                                                            src="/img-student/student-2.jpg"
                                                            alt=""
                                                            height={450} width={400}
                                                            layout="responsive" className="rounded-lg" /> */}
                              {CommentMap.picture ? (
                                <img
                                  src={CommentMap.picture}
                                  alt
                                  className=" w-full  rounded-lg"
                                />
                              ) : (
                                <img
                                  src="/icon/blank-profile.png"
                                  alt
                                  className=" w-full  rounded-lg"
                                />
                              )}
                              {/* <img src="/img-student/student-2.jpg" alt="" className=" w-full  rounded-lg  " /> */}
                            </div>
                            <div className="  h-full   rounded-lg border-2 border-blue-800   w-9/12  pl-4  pt-4  text  text-blue-800 ">
                              <div>
                                ชื่อ{" "}
                                {CommentMap.firstname +
                                  " " +
                                  CommentMap.lastname}
                              </div>
                              <div>รหัส {CommentMap.student_code}</div>
                              <div>ชั้น {CommentMap.classroom_name}</div>
                            </div>
                          </div>
                          <p className="my-4  text-lg leading-relaxed text-left  text-color-blue ">
                            ความคิดเห็น
                          </p>
                          <div className="mt-4  ">
                            <textarea
                              onChange={(e) =>
                                hadleChange_Comment("comment_detail", e)
                              }
                              name=""
                              id=""
                              cols="30"
                              rows="10"
                              className=" p-4  rounded-lg w-full resize-none border-2 border-blue-800  focus:border-blue-800 focus:border-2 outline-none text-blue-800"
                            ></textarea>
                          </div>
                        </div>
                        {/*footer*/}
                        <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                          <button
                            className=" shadow hover:shadow-lg text-white bg-red-600 hover:text-red-600   border-2   border-white hover:border-red-600  hover:bg-white rounded-lg background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={() => setShowModal(false)}
                          >
                            Close
                          </button>
                          <button
                            className=" shadow hover:shadow-lg text-white bg-green-600 hover:text-green-600   border-2   border-white hover:border-green-600  hover:bg-white rounded-lg background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={() => addcommit()}
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
              {/* Modal */}
              {showModalscore ? (
                <>
                  <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                    <div className="relative w-8/12   mt-28 mb-6 mx-auto max-w-4xl  max-h-auto ">
                      {/*content*/}
                      <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        {/*header*/}
                        <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t text-color-blue">
                          <h3 className="text-2xl font-semibold text-center w-full ml-5">
                            คะแนนความประพฤติ
                          </h3>
                          <button
                            className="p-1 ml-auto bg-transparent border-0 text-black  float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                            onClick={() => setShowModalscore(false)}
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
                        <div className="relative p-6 flex-auto  ">
                          <div className=" flex my-4  text-lg leading-relaxed    h-52 ">
                            <div className="  h-full   rounded-lg border-2 bg-blue-800   w-2/6     mr-4   text-white  text-center  justify-items-center ">
                              <div className=" h-2/4  pt-4 text-white ">
                                คะแนนรวมทั้งหมด
                              </div>
                              <div className="h-2/4 text-3xl items-center text-white">
                                {CommentMap.score}
                              </div>
                            </div>

                            <div className=" flex flex-row  h-full   rounded-lg border-2 border-blue-800   w-4/6  p-4  pt-4    text-blue-800 ">
                              <div className="   border-2 border-blue-800   w-3/12  h-auto">
                                <div className="   w-full  h-full  p-1  m-auto ">
                                  {CommentMap.picture ? (
                                    <Image
                                      // src="/img-student/student-1.png"
                                      src={CommentMap.picture}
                                      alt=""
                                      height={540}
                                      width={400}
                                      layout="responsive"
                                      className=" h-auto "
                                    />
                                  ) : (
                                    <Image
                                      // src="/img-student/student-1.png"
                                      src="/icon/blank-profile.png"
                                      alt=""
                                      height={540}
                                      width={400}
                                      layout="responsive"
                                      className=" h-auto "
                                    />
                                  )}
                                </div>
                              </div>
                              <div className="  border-t-2 border-r-2 border-b-2 border-blue-800 w-9/12 ">
                                <div className="flex flex-col  p-4">
                                  <div>
                                    {" "}
                                    ชื่อ{" "}
                                    {CommentMap.firstname +
                                      " " +
                                      CommentMap.lastname}
                                  </div>
                                  <div> รหัส {CommentMap.student_code}</div>
                                  <div> ชั้น {CommentMap.classroom_name}</div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <p className="my-4  text-lg leading-relaxed text-left  text-color-blue"></p>

                          <div className=" w-full h-full border-2 border-blue-800 p-4 text-blue-800 rounded-lg">
                            <div className="mb-2">บันทึกคะแนนความประพฤติ</div>
                            <div className="flex flex-row mb-2  w-full border-2 border-blue-800 p-4 items-center rounded-lg">
                              <div className="mr-4  w-1/6">
                                <input
                                  type="radio"
                                  id="1"
                                  name="switch-one"
                                  value="Y"
                                  className="    w-5 h-5  ml-2"
                                  onChange={(e) =>
                                    hadleChange_behaviour("score_type", e)
                                  }
                                />
                                <span className=" ml-2 -mt-4 ">เพิ่ม</span>
                              </div>
                              <div className="w-1/6">
                                <input
                                  type="radio"
                                  id="2"
                                  name="switch-one"
                                  value="N"
                                  className="    w-5 h-5 ml-2 "
                                  onChange={(e) =>
                                    hadleChange_behaviour("score_type", e)
                                  }
                                />{" "}
                                <span className="ml-2 -mt-4 ">ลบ</span>
                              </div>
                              <div className="mx-4 w-2/6  text-right ">
                                เลือกเหตุผล
                              </div>

                              <div className="w-2/6">
                                <select
                                  className="rounded  p-1  border-2 border-blue-800 text-color-blue outline-none w-full"
                                  onChange={(e) =>
                                    hadleChange_behaviour("behaviour", e)
                                  }
                                >
                                  <option value={0} name={0}>
                                    {" "}
                                    กรุณาเลือกข้อมูล{" "}
                                  </option>

                                  {allBehaviour.data
                                    ? allBehaviour.data.map((p, index) => (
                                      <option
                                        key={index + 1}
                                        value={p.behaviour_id}
                                        name={p.score}
                                      >
                                        {p.behaviour_name} {p.score} คะแนน
                                      </option>
                                    ))
                                    : ""}
                                </select>
                              </div>
                            </div>
                            <div className="mb-2">ความคิดเห็นเพิ่มเติม</div>
                            <div className=" ">
                              <textarea
                                onChange={(e) =>
                                  hadleChange_behaviour("detail", e)
                                }
                                name=""
                                id=""
                                cols="30"
                                rows="10"
                                className=" h-28 p-4  rounded-lg w-full resize-none border-2 border-blue-800  focus:border-blue-800 focus:border-2 outline-none text-blue-800"
                              ></textarea>
                            </div>
                          </div>
                        </div>
                        {/*footer*/}
                        <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                          <button
                            className=" shadow hover:shadow-lg text-white bg-red-600 hover:text-red-600   border-2   border-white hover:border-red-600  hover:bg-white rounded-lg background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={() => setShowModalscore(false)}
                          >
                            ยกเลิก
                          </button>
                          <button
                            className=" shadow hover:shadow-lg text-white bg-green-600 hover:text-green-600   border-2   border-white hover:border-green-600  hover:bg-white rounded-lg background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button"
                            // onClick={() => setShowModalscore(false)}
                            onClick={() => addbehaviour()}
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
                                    <option value="">
                                      --กรุณาเลือกคำนำหน้า--
                                    </option>
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
                                  onChange={(e) =>
                                    handleChange("firstname_en", e)
                                  }
                                />
                                <input
                                  className="ml-2 py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-1/2"
                                  type="text"
                                  value={values.lastname_en}
                                  maxLength="13"
                                  onChange={(e) =>
                                    handleChange("lastname_en", e)
                                  }
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
                                    onChange={(e) =>
                                      handleChange("birthday", e)
                                    }
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
                                  onChange={(e) =>
                                    handleChange("phonenumber", e)
                                  }
                                />
                                <input
                                  className="ml-2 py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-1/2"

                                  onChange={(e) => imageadd(e.target.files[0])} type="file" id="myfile"
                                />
                                {/* <input className="ml-2 py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-1/2" type="text" value={values.classroom_code} onChange={(e) => handleChange('classroom_code', e)} /> */}
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
                                onClick={() => onInsertFamilys()}
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
                                          className="mb-4 pl-1 font-bold text-lg text-blue-500 w-full"
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
                                                            <label className="mb-4 pl-1 font-bold text-lg  text-blue-500 w-full" htmlFor="first_name">ผู้ปกครองคนที่1</label>
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
              {/* end-main */}
            </div>
          </div>
          <Footer></Footer>
        </main>
      </div>
    </div>
  );
}

export default Comments;
