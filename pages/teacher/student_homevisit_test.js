import React, { useEffect, useState } from "react";
import ReactExport from "react-data-export";
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
import {
  get_year,
  get_classroom_level,
  get_term,
  getteacher,
  postteacheradd,
  putteacherupdate,
  deleteteacher,
  postAddhomevisit,
  postreportHomeVisitbyOne,
  upload,
  Gethomevisit,
} from "../../action/teacher";
import { getClassroom } from "../../action/admin";
import { isAuth } from "../../action/auth";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { parse } from "node-html-parser";

function student_homevisit_test() {
  const Auth = isAuth();
  const [showModaladd, setShowModaladd] = useState(false);
  const [showModaledit, setShowModaledit] = useState(false);
  const [showModalview, setShowModalview] = useState(false);
  const [showIconadd, setShowIconadd] = useState(false);
  const [classroommap, setClassroommap] = useState([{}]);
  const [classroomselect, setClassroomselect] = useState([{}]);
  const [school_termmap, setSchool_termmap] = useState([
    {
      school_term: "",
    },
  ]);
  const [classroomlevelmap, setClassroomlevelmap] = useState([
    {
      classroom_level: "",
    },
  ]);
  const [schoolyearmap, setSchoolyearmap] = useState([
    {
      school_year: "",
    },
  ]);

  const [homevisit, sethomeVisit] = useState([
    {
      picture: "",
      firstname_student: "",
      lastname_student: "",
      homevisit_status: "",
      homevisit_date: "",
      homevisit_savedate: "",
      school_term: "",
      recorder: "",
      parent: "",
      parent_tel: "",
      student_code: "",
    },
  ]);

  const [values, setValues] = useState({
    classroom_level: "",
    classroom_code: "",
    school_term: "",
    teacher_code: "",
    school_year: "",
    classroom_teacher_code: "",
  });

  const [lastsearchvalues, setLastsearchvalues] = useState({
    classroom_level: "",
    classroom_code: "",
    school_term: "",
    teacher_code: "",
    school_year: "",
  });

  const [testdata, setTestdata] = useState({
    home_visit_id: "",
    school_id: 1, //check
    school_year: "", //check
    school_term: "", //check
    visit_date: moment(new Date()).format("YYYY-MM-DD"),
    student_id: "", //check
    teacher_id: "", //check
    title: "", //check
    firstname_student: "", //check
    lastname_student: "", //check
    student_no: "", //check
    classroom_code: "", //check
    phonenumber: "",
    father_name: "",
    father_occupation: "",
    father_phonenumber: "",
    mother_name: "",
    mother_occupation: "",
    mother_phonenumber: "",
    fm_marital_status: "",
    parent_name: "", //check
    parent_occupaton: "", //check
    parent_phonenumber: "", //check
    household_member: "", //check
    hours_family_together: "", //check
    relationship_father_chk: "4", //check
    relationship_mother_chk: "", //check
    relationship_brother_chk: "", //check
    relationship_sister_chk: "", //check
    relationship_grand: "", //check
    relationship_relative: "", //check
    relationship_other: "",
    relationship_other_name: "",
    parents_leave_child_with_someone: "", //check
    parents_leave_child_with_someone_other: "",
    household_income: "", //check
    receive_expenses_from: "", //check
    money_to_school: "", //check
    work_to_earn: "",
    work_to_earn_inc_perday: "",
    want_schools_help: { study: "", behavior: "", eco: "", other: "" },
    want_schools_help_other: "",
    agency_help: { elderly: "", disability: "", other: "" },
    agency_help_other: "",
    Parents_concern: "",
    dependency: {
      handicapped: "",
      elderly: "",
      singlefm: "",
      unemployed: "",
    },
    housing_type: { house: "", rental_house: "", with_others: "" }, //check
    housing_envir: { dilapidated_house: "", no_toilets: "", other: "" },
    housing_envir_other: "????????????????????????",
    fm_vehicle: { moto: "", car: "", truck: "", othertruck: "" }, //check
    farm_land: "", //check
    farm_land_number: "",
    health: {
      unhealthy: "",
      congenital_disease: "",
      malnutrition: "",
      severe_chronic: "",
      low_physical_fitness: "",
    },
    welfare_safety: {
      separated: "",
      gamble: "",
      suffering_serious: "",
      addicted_to_drugs: "",
      members_gamble: "",
      conflicts_in_family: "",
      unsupervised: "",
      domestic_violence: "",
      harmed_by_family: "",
      sexually_harassed: "",
      residing_in_a_slum: "",
    },
    distance_school_km: "", //check
    distance_school_hr: "", //check
    distance_school_min: "", //check
    journey: "", //check
    journey_other: "",
    work_responsibility: {
      housework: "",
      care_disabled: "",
      trade: "",
      extra_work: "",
      farm: "",
      other: "",
    },
    work_responsibility_other: "",
    hobbies: {
      TV: "",
      go_to_mall: "",
      reading: "",
      friend: "",
      vsco: "",
      game: "",
      park: "",
      play_music: "",
      other: "",
    },
    hobbies_other: "",
    substance_abuse: {
      friends_uses_drugs: "",
      family_uses_drugs: "",
      drug_use_environment: "",
      dealing_with_drugs: "",
      smoking: "",
    },
    violent: {
      quarrel: "",
      Aggressive: "",
      frequent_quarrels: "",
      injure_another: "",
      injure_yourself: "",
      other: "",
    },
    violent_other: "",
    sexual: {
      service_group: "",
      use_of_sex_comtool: "",
      pregnant: "",
      prostitution: "",
      Obsessed_of_sex_comtool: "",
      sexually_mixed: "",
    },
    game_addiction: {
      more_than_1_hour: "",
      Lack_of_imagination: "",
      Isolated: "",
      unusual_spending: "",
      friends_playing_games: "",
      game_store_near: "",
      more_than_2_hour: "",
      seriously_with_game: "",
      steal_money: "",
      other: "",
    },
    game_addiction_other: "",
    com_internet: "", //check
    electronic_comm: "", //check
    informant: {
      father: "",
      mother: "",
      brother: "",
      sister: "",
      narr: "",
      r: "",
      par: "",
      lung: "",
      pu: "",
      ya: "",
      ta: "",
      yai: "",
      tuad: "",
      stepfather: "",
      stepmother: "",
    }, //check
    current_address: "", //check
    current_address_near: "", //check
    attached_photos: "", //check
    photo_house: "", //check
    photo_teacher_fm_student: "", //check
    teacher_signature1: "",
    teacher_signature2: "",
    teacher_signature3: "",
    Cwho: "",
    iframe_google_map: "", //check
    google_map: "", //check
    parent_relation: "", //check
  });

  SwiperCore.use([Autoplay, Pagination, Navigation]);
  ChartJS.register(ArcElement, Tooltip, Legend);

  useEffect(() => {
    timezone();
    Dataload();
  }, []);

  const Dataload = async () => {
    const schoolyear = await get_year();
    const classroom = await getClassroom();
    const classroomlevel = await get_classroom_level();
    const schoolterm = await get_term();
    setSchool_termmap(schoolterm);
    setSchoolyearmap(schoolyear);
    setClassroomselect(classroom);
    console.log("check classroom", classroom);
    setClassroomlevelmap(classroomlevel);

    let result = classroom.filter(
      (data) => data.classroom_level == classroom[0].classroom_level
    );
    setClassroommap(result);

    console.log("data load");
    setValues({
      ...values,
      school_year: schoolyear[0].school_year,
      classroom_code: classroom[0].classroom_code,
      classroom_level: classroomlevel[0].classroom_level,
      school_term: schoolterm[0].school_term,
      teacher_code: localStorage.getItem("LoginId"),
      classroom_teacher_code: localStorage.getItem("LoginRoomId"),
    });
    // let dataset = {
    //   classroom_code: classroom[0].classroom_code,
    //   classroom_level: classroomlevel[0].classroom_level,
    //   school_term: schoolterm[0].school_term,
    //   school_year: schoolyear[0].school_year,
    //   teacher_code: localStorage.getItem("LoginId"),
    // };
    // console.log(dataset);
    let getdata = await Gethomevisit(values);
    console.log(getdata);
    sethomeVisit(getdata);
  };
  const imageadd = async (name, file) => {
    if (name == "photo_house") {
      console.log(file);
      console.log(name);

      let formData = new FormData();
      formData.append("name", moment(new Date()).format("YYYYMMDDHHmmss")) +
        file.name;
      formData.append("type", "home_visit");
      formData.append("image", file);
      console.log(testdata);
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

      console.log("testdata", testdata);
      setValues({ ...testdata, photo_house: data1.data });
    } else {
      console.log(file);
      console.log(name);

      let formData = new FormData();
      formData.append("name", moment(new Date()).format("YYYYMMDDHHmmss")) +
        file.name;
      formData.append("type", "home_visit");
      formData.append("image", file);
      console.log(testdata);
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

      console.log("testdata", testdata);
      setValues({ ...testdata, photo_teacher_fm_student: data1.data });
    }
  };

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

  function isEmpty(obj) {
    if (
      obj.teacher_code === "" ||
      obj.school_year === "" ||
      obj.classroom_code === "" ||
      obj.school_term === ""
    ) {
      return true;
    }
    return false;
  }

  const searchClick = async () => {
    if (!isEmpty(values)) {
      let getdata = await Gethomevisit(values);
      console.log("homevisitdata", getdata);
      sethomeVisit(getdata);
      Swal.fire({
        icon: "success",
        title: "??????????????????",
        text: "??????????????????????????????????????????????????????",
      });
      setLastsearchvalues(values);
    } else {
      Swal.fire({
        icon: "error",
        title: "?????????????????????",
        text: "?????????????????????????????????????????????",
      });
      console.log("??????????????????????????????????????????????????????????????????????????????");
    }
  };

  const handleChange = async (name, e) => {
    console.log(name);
    console.log(e);
    values[name] = e.target.value;
    setValues({ ...values });
    console.log(values);
    if (name == "classroom_level") {
      let getclassroomfil = await getClassroom();
      console.log(getclassroomfil);
      let result = getclassroomfil.filter(
        (data) => data.classroom_level == e.target.value
      );
      setClassroommap(result);
      setValues({ ...values, classroom_code: result[0].classroom_code });
      console.log("data after filter classlevel", result);
    }
  };

  /////////////////////////////////modal func///////////////////////////////////////

  const setdefaulttestdatta = async () => {
    setTestdata({
      home_visit_id: "",
      school_id: 1, //check
      school_year: "", //check
      school_term: "", //check
      visit_date: moment(new Date()).format("YYYY-MM-DD"),
      student_id: "", //check
      teacher_id: "", //check
      title: "", //check
      firstname_student: "", //check
      lastname_student: "", //check
      student_no: "", //check
      classroom_code: "", //check
      phonenumber: "",
      father_name: "",
      father_occupation: "",
      father_phonenumber: "",
      mother_name: "",
      mother_occupation: "",
      mother_phonenumber: "",
      fm_marital_status: "",
      parent_name: "", //check
      parent_occupaton: "", //check
      parent_phonenumber: "", //check
      household_member: "", //check
      hours_family_together: "", //check
      relationship_father_chk: "", //check
      relationship_mother_chk: "", //check
      relationship_brother_chk: "", //check
      relationship_sister_chk: "", //check
      relationship_grand: "", //check
      relationship_relative: "", //check
      relationship_other: "",
      relationship_other_name: "",
      parents_leave_child_with_someone: "", //check
      parents_leave_child_with_someone_other: "",
      household_income: "", //check
      receive_expenses_from: "", //check
      money_to_school: "", //check
      work_to_earn: "",
      work_to_earn_inc_perday: "",
      want_schools_help: { study: "", behavior: "", eco: "", other: "" },
      want_schools_help_other: "",
      agency_help: { elderly: "", disability: "", other: "" },
      agency_help_other: "",
      Parents_concern: "",
      dependency: {
        handicapped: "",
        elderly: "",
        singlefm: "",
        unemployed: "",
      },
      housing_type: { house: "", rental_house: "", with_others: "" }, //check
      housing_envir: { dilapidated_house: "", no_toilets: "", other: "" },
      housing_envir_other: "????????????????????????",
      fm_vehicle: { moto: "", car: "", truck: "", othertruck: "" }, //check
      farm_land: "", //check
      farm_land_number: "",
      health: {
        unhealthy: "",
        congenital_disease: "",
        malnutrition: "",
        severe_chronic: "",
        low_physical_fitness: "",
      },
      welfare_safety: {
        separated: "",
        gamble: "",
        suffering_serious: "",
        addicted_to_drugs: "",
        members_gamble: "",
        conflicts_in_family: "",
        unsupervised: "",
        domestic_violence: "",
        harmed_by_family: "",
        sexually_harassed: "",
        residing_in_a_slum: "",
      },
      distance_school_km: "", //check
      distance_school_hr: "", //check
      distance_school_min: "", //check
      journey: "", //check
      journey_other: "",
      work_responsibility: {
        housework: "",
        care_disabled: "",
        trade: "",
        extra_work: "",
        farm: "",
        other: "",
      },
      work_responsibility_other: "",
      hobbies: {
        TV: "",
        go_to_mall: "",
        reading: "",
        friend: "",
        vsco: "",
        game: "",
        park: "",
        play_music: "",
        other: "",
      },
      hobbies_other: "",
      substance_abuse: {
        friends_uses_drugs: "",
        family_uses_drugs: "",
        drug_use_environment: "",
        dealing_with_drugs: "",
        smoking: "",
      },
      violent: {
        quarrel: "",
        Aggressive: "",
        frequent_quarrels: "",
        injure_another: "",
        injure_yourself: "",
        other: "",
      },
      violent_other: "",
      sexual: {
        service_group: "",
        use_of_sex_comtool: "",
        pregnant: "",
        prostitution: "",
        Obsessed_of_sex_comtool: "",
        sexually_mixed: "",
      },
      game_addiction: {
        more_than_1_hour: "",
        Lack_of_imagination: "",
        Isolated: "",
        unusual_spending: "",
        friends_playing_games: "",
        game_store_near: "",
        more_than_2_hour: "",
        seriously_with_game: "",
        steal_money: "",
        other: "",
      },
      game_addiction_other: "",
      com_internet: "", //check
      electronic_comm: "", //check
      informant: {
        father: "",
        mother: "",
        brother: "",
        sister: "",
        narr: "",
        r: "",
        par: "",
        lung: "",
        pu: "",
        ya: "",
        ta: "",
        yai: "",
        tuad: "",
        stepfather: "",
        stepmother: "",
      }, //check
      current_address: "", //check
      current_address_near: "", //check
      attached_photos: "", //check
      photo_house: "", //check
      photo_teacher_fm_student: "", //check
      teacher_signature1: "",
      teacher_signature2: "",
      teacher_signature3: "",
      Cwho: "",
      iframe_google_map: "", //check
      google_map: "", //check
      parent_relation: "", //check
    });
  };

  const closeAddmodal = async () => {
    setdefaulttestdatta();
    setShowModaladd(false);
  };

  const closeViewmodal = async () => {
    setdefaulttestdatta();
    setShowModalview(false);
  };

  const modalhandleChange = async (name, e) => {
    if (name == "visit_date") {
      testdata[name] = e;
    } else {
      console.log(name);
      console.log(e.target.value);
      testdata[name] = e.target.value;
      setTestdata({ ...testdata });
      console.log(testdata[name]);
    }
    setTestdata({ ...testdata });
    console.log(testdata[name]);
  };

  const checkboxclick = async (name, subname, s) => {
    console.log("name", name);
    console.log("subname", subname);
    console.log(s.target.value);
    // if(name == "want_schools_help"){
    if (s.target.value == "0" || s.target.value == "") {
      testdata[name][subname] = "1";
    } else if (s.target.value == "1") {
      testdata[name][subname] = "0";
    }
    setTestdata({ ...testdata });
    console.log("checkbox test", testdata[name][subname]);

    // }
  };

  const onclick = async (name, s) => {
    console.log(name);
    console.log(s.target.value);
    if (name == "motorcycle") {
      testdata.fm_vehicle.moto = s.target.value;
      // setTestdata({ ...testdata });
      console.log(testdata);
    } else if (name == "car") {
      testdata.fm_vehicle.car = s.target.value;
      // setTestdata({ ...testdata });
      console.log(testdata);
    } else if (name == "truck") {
      testdata.fm_vehicle.truck = s.target.value;
      // setTestdata({ ...testdata });
      console.log(testdata);
    } else if (name == "othertruck") {
      testdata.fm_vehicle.othertruck = s.target.value;
      // setTestdata({ ...testdata });
      console.log(testdata);
    } else {
      testdata[name] = s.target.value;
      console.log(name, s.target.value);
    }
    setTestdata({ ...testdata });
  };
  const Addhomevisit = async (student_code, i) => {
    //let data = await getStudent_One(i);
    setTestdata({
      ...testdata,
      title: homevisit[i].title,
      firstname_student: homevisit[i].firstname_student,
      lastname_student: homevisit[i].lastname_student,
      classroom_code: values.classroom_code,
      phonenumber: homevisit[i].phonenumber,
      school_year: values.school_year, //check
      school_term: values.school_term,
      student_id: student_code,
      teacher_id: values.teacher_code,
      relationship_relative: "3",
      relationship_father_chk: "4",
      visit_date: moment(new Date()).format("YYYY-MM-DD"),
      parent_name: "",
      parent_phonenumber: "",
    });
    //sethomeVisit({ ...homevisit });
    console.log("1", values.school_year);
    console.log("2", values.school_term);
    console.log("2", student_code);
    console.log("2", values.teacher_code);

    //openModaltest();

    setShowModaladd(true);
  };

  const Edithomevisit = async (student_code, i) => {
    //let data = await getStudent_One(i);

    setShowModaledit(true);
  };

  const Viewhomevisit = async (student_code, i) => {
    //let data = await getStudent_One(i);

    let data = await postreportHomeVisitbyOne({
      home_visit_id: homevisit[i].home_visit_id,
    });
    console.log(data);
    setTestdata({
      title: data[0].title,
      firstname_student: data[0].firstname_student,
      lastname_student: data[0].lastname_student,
      student_no: data[0].student_no,
      classroom_name: data[0].classroom_name,
      phonenumber: data[0].phonenumber,
      father_name: data[0].father_name,
      father_occupation: data[0].father_occupation,
      father_phonenumber: data[0].father_phonenumber,
      mother_name: data[0].mother_name,
      mother_occupation: data[0].mother_occupation,
      mother_phonenumber: data[0].mother_phonenumber,
      // fm_marital_status: JSON.parse(data[0].fm_marital_status),
      fm_marital_status: data[0].fm_marital_status,
      parent_relation: data[0].parent_relation,
      parent_name: data[0].parent_name,
      parent_occupaton: data[0].parent_occupaton,
      parent_phonenumber: data[0].parent_phonenumber,
      household_member: data[0].household_member,
      hours_family_together: data[0].hours_family_together,
      relationship_father_chk: data[0].relationship_father_chk,
      relationship_mother_chk: data[0].relationship_mother_chk,
      relationship_brother_chk: data[0].relationship_brother_chk,
      relationship_sister_chk: data[0].relationship_sister_chk,
      relationship_grand: data[0].relationship_grand,
      relationship_relative: data[0].relationship_relative,
      relationship_other: data[0].relationship_other,
      relationship_other_name: data[0].relationship_other_name,
      parents_leave_child_with_someone:
        data[0].parents_leave_child_with_someone,
      household_income: data[0].household_income1,
      receive_expenses_from: data[0].receive_expenses_from1,
      money_to_school: data[0].money_to_school,
      work_to_earn: data[0].work_to_earn,
      work_to_earn_inc_perday: data[0].work_to_earn_inc_perday,
      want_schools_help: JSON.parse(data[0].want_schools_help),
      want_schools_help_other: data[0].want_schools_help_other,
      agency_help: JSON.parse(data[0].agency_help),
      agency_help_other: data[0].agency_help_other,
      Parents_concern: data[0].Parents_concern,
      dependency: JSON.parse(data[0].dependency),
      housing_type: JSON.parse(data[0].housing_type),
      housing_envir: JSON.parse(data[0].housing_envir),
      housing_envir_other: data[0].housing_envir_other,
      fm_vehicle: JSON.parse(data[0].fm_vehicle),
      farm_land: data[0].farm_land,
      farm_land_number: data[0].farm_land_number,
      health: JSON.parse(data[0].health),
      welfare_safety: JSON.parse(data[0].welfare_safety),
      distance_school_km: data[0].distance_school_km,
      distance_school_hr: data[0].distance_school_hr,
      distance_school_min: data[0].distance_school_min,
      journey: data[0].journey,
      journey_other: data[0].journey_other,
      work_responsibility: JSON.parse(data[0].work_responsibility),
      work_responsibility_other: data[0].work_responsibility_other,
      hobbies: JSON.parse(data[0].hobbies),
      hobbies_other: data[0].hobbies_other,
      substance_abuse: JSON.parse(data[0].substance_abuse),
      violent: JSON.parse(data[0].violent),
      violent_other: data[0].violent_other,
      sexual: JSON.parse(data[0].sexual),
      game_addiction: JSON.parse(data[0].game_addiction),
      game_addiction_other: data[0].game_addiction_other,
      com_internet: data[0].com_internet,
      electronic_comm: data[0].electronic_comm,
      informant: JSON.parse(data[0].informant),
      current_address: data[0].current_address,
      current_address_near: data[0].current_address_near,
      attached_photos: data[0].attached_photos,
      photo_house: data[0].photo_house,
      photo_teacher_fm_student: data[0].photo_teacher_fm_student,
      picture: data[0].picture,
      geolocation_house: data[0].geolocation_house,
      teacher_signature1: data[0].teacher_signature1,
      teacher_signature2: data[0].teacher_signature2,
      teacher_signature3: data[0].teacher_signature3,
      Created_date: data[0].Created_date,
      Cwho: data[0].Cwho,
      iframe_google_map: data[0].iframe_google_map,
      google_map: data[0].google_map,
      visit_date: data[0].visit_date,
      picture: data[0].picture,
      parents_leave_child_with_someone_other:
        data[0].parents_leave_child_with_someone_other,
    });

    setShowModalview(true);
    //setShowModalview(false);
  };

  const addcommit = async () => {
    Swal.fire({
      icon: "success",
      title: "??????????????????",
    });
    console.log(testdata);
    const resdata = await postAddhomevisit(testdata);
    let getdata = await Gethomevisit(lastsearchvalues);
    console.log("homevisitdata", getdata);
    sethomeVisit(getdata);
    await closeAddmodal();
  };

  const editcommit = async () => {
    Swal.fire({
      icon: "success",
      title: "??????????????????",
    });
    setShowModaledit(false);
  };

  return (
    <div>
      {/* {console.log("start values", values)} */}
      <div className="flex flex-row min-h-screen bg-gray-100 text-gray-800 z-40 absolute w-full  ">
        <Sidebar></Sidebar>

        <main className="flex flex-col flex-grow w-full transition-all duration-150 ease-in md:w-4/5 main md:ml-0 ">
          <Nav></Nav>
          <div className="ml-12 mr-6">
            <div className="main-content flex flex-col flex-grow ">
              <div className="flex md-4 pr-4 pt-4">
                <h1 className="   lg:w-3/4 w-1/4  lg:text-xl text-base text-center text-color-blue"></h1>
                <h1 className=" lg:w-1/4 w-3/4 lg:text-xl text-base text-right  text-color-blue">
                  <p>{THdate}</p>
                </h1>
              </div>
              <div className="flex flex-col   pr-4">
                <h1 className="   lg:text-xl text-base text-right  text-color-blue">
                  <Clock
                    format={"HH:mm:ss"}
                    ticking={true}
                    timezone={"Asia/Bangkok"}
                  />
                </h1>
              </div>

              <div className="flex flex-col pl-2">
                <div className="  pl-2 text-md lg:text-xl text-left  w-full">
                  ?????????????????????????????????????????????????????????????????????
                </div>
              </div>
              <div className="p-2 text-center w-4/5 mx-auto">
                <div className="flex flex-col mb-4">
                  <div className="flex flex-col sm:flex-row">
                    <label
                      className="p-2 font-bold text-sm lg:text-lg text-gray-900 lg:w-1/4  md:w-2/4 w-full"
                      htmlFor=""
                    >
                      ??????????????????????????????
                    </label>
                    <div class="ml-2 relative inline-flex lg:w-1/4  md:w-2/4  w-full">
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
                      {}
                      <select
                        class="border border-gray-300 text-sm lg:text-lg rounded-lg text-gray-600 h-10 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none w-full"
                        value={values.school_year}
                        onChange={(e) => handleChange("school_year", e)}
                      >
                        {schoolyearmap
                          ? schoolyearmap.map((p, index) => (
                              <option value={p.school_year}>
                                {p.school_year}
                              </option>
                            ))
                          : ""}
                      </select>
                    </div>
                    <label
                      className="p-2 font-bold text-sm lg:text-lg text-gray-900  lg:w-1/4  md:w-2/4 w-full "
                      htmlFor=""
                    >
                      ?????????/??????????????????????????????
                    </label>
                    <div class="ml-2 relative inline-flex lg:w-1/4  md:w-2/4  w-full">
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
                      {}
                      <select
                        class="border border-gray-300 text-sm lg:text-lg rounded-lg text-gray-600 h-10 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none w-full"
                        value={values.school_term}
                        onChange={(e) => handleChange("school_term", e)}
                      >
                        <option value={1}>????????????????????????????????? 1</option>
                        <option value={2}>????????????????????????????????? 2</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col mb-4">
                  <div className="flex flex-col sm:flex-row">
                    <label
                      className="p-2 font-bold text-sm lg:text-lg text-gray-900  lg:w-1/4  md:w-2/4 w-full "
                      htmlFor=""
                    >
                      ???????????????
                    </label>
                    <div class="ml-2 relative inline-flex lg:w-1/4  md:w-2/4  w-full">
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
                      {}
                      <select
                        class="border border-gray-300 text-sm lg:text-lg rounded-lg text-gray-600 h-10 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none w-full"
                        value={values.classroom_level}
                        onChange={(e) => handleChange("classroom_level", e)}
                      >
                        {classroomlevelmap
                          ? classroomlevelmap.map((p, index) => (
                              <option value={p.classroom_level}>
                                ?????????????????????????????????????????????{" " + p.classroom_level}
                              </option>
                            ))
                          : ""}
                      </select>
                    </div>
                    <label
                      className="p-2 font-bold text-sm lg:text-lg text-gray-900  lg:w-1/4  md:w-2/4 w-full "
                      htmlFor=""
                    >
                      ???????????????????????????
                    </label>
                    <div class="ml-2 relative inline-flex lg:w-1/4  md:w-2/4  w-full">
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
                      {}
                      <select
                        class="border border-gray-300 text-sm lg:text-lg rounded-lg text-gray-600 h-10 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none w-full"
                        value={values.classroom_code}
                        onChange={(e) => handleChange("classroom_code", e)}
                      >
                        {classroommap
                          ? classroommap.map((p, index) => (
                              <option value={p.classroom_code}>
                                {p.classroom_name}
                              </option>
                            ))
                          : ""}
                      </select>
                    </div>
                  </div>
                </div>
                <button
                  className="mt-1 w-auto shadow hover:shadow-lg text-white bg-green-500 hover:text-green-500   border-2   border-green-500  hover:border-green-500  hover:bg-white rounded-lg background-transparent  uppercase px-6 py-1 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => searchClick()}
                >
                  <div className="flex flex-row items-center justify-center content-center    ">
                    <div className=" mt-1 text-center">???????????????</div>
                  </div>
                </button>
                <div className="w-full flex justify-end mb-2"></div>
              </div>

              <div className="flex flex-row   h-full ">
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
                      <th className="py-2 text-gray-500 w-2/12 pr-10">
                        ????????????-?????????????????????
                      </th>
                      <th className="py-2 text-gray-500 w-1/12 pr-10">
                        ??????????????????????????????????????????????????????
                      </th>
                      <th className="py-2 text-gray-500 w-1/12 pr-10">
                        ????????????????????????????????????????????????
                      </th>
                      <th className="py-2 text-gray-500 w-1/12 pr-10">
                        ???????????????????????????????????????????????????????????????????????????
                      </th>
                      <th className="py-2 text-gray-500 w-1/12 pr-10">
                        ?????????????????????????????????
                      </th>
                      <th className="py-2 text-gray-500 w-1/12 pr-10">
                        ???????????????????????????
                      </th>
                      <th className="py-2 text-gray-500 w-2/12 pr-10">
                        ???????????????????????????????????????
                      </th>
                      <th className="py-2 text-gray-500 w-1/12 pr-10">
                        ???????????????????????????????????????????????????
                      </th>
                      <th className="py-2 text-gray-500 w-1/12 "></th>
                    </tr>

                    {homevisit
                      ? homevisit.map((p, index) => (
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
                            <td className="py-2 pr-10"> {p.st_name}</td>
                            <td className="py-2 pr-10 font-bold">
                              {p.status_home == "1" ? "????" : "???"}
                            </td>
                            <td className="py-2 pr-10">
                              {moment(p.visit_date)
                                .add(543, "year")
                                .format("DD-MM-YYYY") == "Invalid date"
                                ? ""
                                : moment(p.visit_date)
                                    .add(543, "year")
                                    .format("DD-MM-YYYY")}
                            </td>
                            <td className="py-2 pr-10">
                              {moment(p.Created_date)
                                .add(543, "year")
                                .utc()
                                .format("DD-MM-YYYY") == "Invalid date"
                                ? ""
                                : moment(p.Created_date)
                                    .add(543, "year")
                                    .utc()
                                    .format("DD-MM-YYYY")}
                            </td>
                            <td className="py-2 pr-10">{p.school_term}</td>
                            <td className="py-2 pr-10">{p.Cwho}</td>
                            <td className="py-2 pr-10">{p.parent_name}</td>
                            <td className="py-2 pr-10">
                              {p.parent_phonenumber}
                            </td>
                            {p.status_edit == "2" ? (
                              <td className="w-1/12 text-center  ">
                                <button
                                  title="?????????????????????????????????"
                                  className="mt-1  shadow hover:shadow-lg text-white  bg-purple-400 hover:text-purple-400   border-2   border-purple-400  hover:border-purple-400  hover:bg-white rounded-lg background-transparent  uppercase px-6 py-1 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                  type="button"
                                  onClick={() =>
                                    Addhomevisit(p.student_code, index)
                                  }
                                >
                                  <div className=" items-center justify-center content-center    ">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      class="h-6 w-6"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                      stroke-width="2"
                                    >
                                      <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M12 4v16m8-8H4"
                                      />
                                    </svg>
                                  </div>
                                </button>
                              </td>
                            ) : (
                              ""
                            )}
                            {p.status_edit == "1" ? (
                              <td className="w-1/12 text-center  ">
                                <button
                                  title="?????????????????????????????????"
                                  className="mt-1  shadow hover:shadow-lg text-white  bg-purple-400 hover:text-purple-400   border-2   border-purple-400  hover:border-purple-400  hover:bg-white rounded-lg background-transparent  uppercase px-6 py-1 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                  type="button"
                                  onClick={() =>
                                    Edithomevisit(p.student_code, index)
                                  }
                                >
                                  <div className=" items-center justify-center content-center    ">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      class="h-6 w-6"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                      stroke-width="2"
                                    >
                                      <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                      />
                                    </svg>
                                  </div>
                                </button>
                              </td>
                            ) : (
                              ""
                            )}
                            {p.status_edit == "3" ? (
                              <td className="w-1/12 text-center  "></td>
                            ) : (
                              ""
                            )}
                            {p.status_edit == "0" ? (
                              <td className="w-1/12 text-center  ">
                                <button
                                  title="????????????????????????"
                                  className="mt-1  shadow hover:shadow-lg text-white  bg-purple-400 hover:text-purple-400   border-2   border-purple-400  hover:border-purple-400  hover:bg-white rounded-lg background-transparent  uppercase px-6 py-1 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                  type="button"
                                  onClick={() =>
                                    Viewhomevisit(p.student_code, index)
                                  }
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
                            ) : (
                              ""
                            )}
                          </tr>
                        ))
                      : ""}
                  </table>
                </div>
              </div>
            </div>
            {/* addModal */}
            {showModaladd ? (
              <>
                <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                  <div className="relative w-8/12  mt-28 mb-6 mx-auto max-w-4xl  max-h-auto ">
                    {/*content*/}
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                      {/*header*/}
                      <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t text-color-blue">
                        <h3 className="text-2xl font-semibold text-center w-full ml-3">
                          ???????????????????????????????????????
                        </h3>
                        <button
                          className="p-1 ml-auto bg-transparent border-0 text-black  float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                          onClick={() => closeAddmodal()}
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
                      <div
                        className="relative  flex-auto  overflow-y-auto w-full "
                        style={{ height: "80vh" }}
                      >
                        <div className="flex flex-row min-h-screen bg-gray-100 text-gray-800 z-40 absolute w-full ">
                          <main className="flex flex-col flex-grow w-full transition-all duration-150 ease-in md:w-4/5 main md:ml-0 ml-0">
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
                                      className="ml-2 mb-2 pl-1 font-bold text-lg text-gray-900  w-12"
                                      htmlFor="first_name"
                                    ></label>
                                    <label
                                      className="ml-2 mb-2 pl-1 font-bold text-lg text-gray-900  w-1/12"
                                      htmlFor="first_name"
                                    >
                                      ????????????????????????
                                    </label>

                                    <label
                                      className="ml-3 mb-2 pl-1 font-bold text-lg text-gray-900  w-1/6
                                        "
                                      htmlFor="first_name"
                                    >
                                      ????????????
                                    </label>

                                    <label
                                      className="ml-3 mb-2 pl-1 font-bold text-lg text-gray-900  w-1/6"
                                      htmlFor="first_name"
                                    >
                                      ?????????????????????
                                    </label>
                                    <label
                                      className="ml-3 mb-2 pl-1 font-bold text-lg text-gray-900  w-1/12"
                                      htmlFor="first_name"
                                    >
                                      ??????????????????
                                    </label>
                                    <label
                                      className="ml-1 mb-2 pl-1 font-bold text-lg text-gray-900  w-1/12"
                                      htmlFor="first_name"
                                    >
                                      ????????????
                                    </label>
                                    <label
                                      className="ml-3 mb-2 pl-1 font-bold text-lg text-gray-900  w-1/6"
                                      htmlFor="first_name"
                                    >
                                      ???????????????????????????????????????
                                    </label>
                                  </div>
                                  <div className="flex flex-row mb-4">
                                    <label
                                      className="ml-2 mb-2 pl-1 font-bold text-lg text-gray-900  w-12"
                                      htmlFor="first_name"
                                    ></label>
                                    <input
                                      className="ml-2 py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-1/12"
                                      value={testdata.title}
                                      type="text"
                                      onChange={(e) =>
                                        modalhandleChange("title", e)
                                      }
                                    />
                                    <input
                                      className="ml-3 py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-1/6"
                                      value={testdata.firstname_student}
                                      type="text"
                                      onChange={(e) =>
                                        modalhandleChange(
                                          "firstname_student",
                                          e
                                        )
                                      }
                                    />
                                    <input
                                      className="ml-3 py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-1/6"
                                      type="text"
                                      value={testdata.lastname_student}
                                      onChange={(e) =>
                                        modalhandleChange("lastname_student", e)
                                      }
                                    />
                                    <input
                                      className="ml-3 py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-1/12"
                                      type="text"
                                      value={testdata.student_no}
                                      onChange={(e) =>
                                        modalhandleChange("student_no", e)
                                      }
                                    />
                                    {/* classroomselect */}
                                    <div class="ml-2 relative inline-flex  w-2/12">
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
                                      {}
                                      <select
                                        class="border border-gray-300 text-sm lg:text-lg rounded-lg text-gray-600 h-10 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none w-full"
                                        value={testdata.classroom_code}
                                        onChange={(e) =>
                                          modalhandleChange("classroom_code", e)
                                        }
                                      >
                                        {classroommap
                                          ? classroommap.map((p, index) => (
                                              <option value={p.classroom_code}>
                                                {p.classroom_name}
                                              </option>
                                            ))
                                          : ""}
                                      </select>
                                    </div>
                                    <input
                                      className="ml-3 py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-1/6"
                                      type="text"
                                      value={testdata.phonenumber}
                                      onChange={(e) =>
                                        modalhandleChange("phonenumber", e)
                                      }
                                    />
                                  </div>
                                </div>
                                <div className="flex flex-col mb-4">
                                  <div className="flex flex-row  ">
                                    <label
                                      className="ml-2 mb-2 pl-1 font-bold text-lg text-gray-900  w-12"
                                      htmlFor="first_name"
                                    ></label>
                                    <label
                                      className="ml-3 mb-2 pl-1 font-bold text-lg text-gray-900  w-2/6
                                        "
                                      htmlFor="first_name"
                                    >
                                      ????????????(????????????)-?????????????????????
                                    </label>

                                    <label
                                      className="ml-3 mb-2 pl-1 font-bold text-lg text-gray-900  w-1/4"
                                      htmlFor="first_name"
                                    >
                                      ???????????????????????????????????????
                                    </label>
                                    <label
                                      className="ml-6 mb-2 pl-1 font-bold text-lg text-gray-900  w-1/4"
                                      htmlFor="first_name"
                                    >
                                      ???????????????
                                    </label>
                                  </div>
                                  <div className="flex flex-row mb-4">
                                    <label
                                      className="ml-2 mb-2 pl-1 font-bold text-lg text-gray-900  w-12"
                                      htmlFor="first_name"
                                    ></label>
                                    <input
                                      className="ml-2 py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-2/6"
                                      type="text"
                                      value={testdata.father_name}
                                      onChange={(e) =>
                                        modalhandleChange("father_name", e)
                                      }
                                    />

                                    <input
                                      className="ml-3 py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-2/10"
                                      type="text"
                                      value={testdata.father_phonenumber}
                                      onChange={(e) =>
                                        modalhandleChange(
                                          "father_phonenumber",
                                          e
                                        )
                                      }
                                    />
                                    <input
                                      className="ml-3 py-2 px-3  border-solid  border border-gray-300 outline-none  rounded-lg shadow w-2/10"
                                      type="text"
                                      value={testdata.father_occupation}
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
                                      className="ml-2 mb-2 pl-1 font-bold text-lg text-gray-900  w-12"
                                      htmlFor="first_name"
                                    ></label>

                                    <label
                                      className="ml-3 mb-2 pl-1 font-bold text-lg text-gray-900  w-2/6
                                        "
                                      htmlFor="first_name"
                                    >
                                      ????????????(???????????????)-?????????????????????
                                    </label>

                                    <label
                                      className="ml-3 mb-2 pl-1 font-bold text-lg text-gray-900  w-1/4"
                                      htmlFor="first_name"
                                    >
                                      ???????????????????????????????????????
                                    </label>
                                    <label
                                      className="ml-3 mb-2 pl-1 font-bold text-lg text-gray-900  w-1/4"
                                      htmlFor="first_name"
                                    >
                                      ???????????????
                                    </label>
                                  </div>
                                  <div className="flex flex-row mb-4">
                                    <label
                                      className="ml-2 mb-2 pl-1 font-bold text-lg text-gray-900  w-12"
                                      htmlFor="first_name"
                                    ></label>
                                    <input
                                      className="ml-2 py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-2/6"
                                      type="text"
                                      value={testdata.mother_name}
                                      onChange={(e) =>
                                        modalhandleChange("mother_name", e)
                                      }
                                    />

                                    <input
                                      className="ml-3 py-2 px-3  border-solid  border border-gray-300 outline-none  rounded-lg shadow w-2/10"
                                      type="text"
                                      value={testdata.mother_phonenumber}
                                      onChange={(e) =>
                                        modalhandleChange(
                                          "mother_phonenumber",
                                          e
                                        )
                                      }
                                    />

                                    <input
                                      className="ml-3 py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-2/10"
                                      type="text"
                                      value={testdata.mother_occupation}
                                      onChange={(e) =>
                                        modalhandleChange(
                                          "mother_occupation",
                                          e
                                        )
                                      }
                                    />
                                  </div>
                                </div>
                                <div className="flex flex-col mb-4">
                                  <div className="flex flex-row pl-2">
                                    <div className="  ml-2 text-xl text-left  w-1/12 md:w-1/16"></div>
                                    <div className="   text-xl text-left  w-1/4">
                                      ????????????????????????????????????-???????????????
                                    </div>
                                  </div>

                                  <div class="flex flex-row pl-2">
                                    <div className="  ml-10 text-xl text-left  w-1/12 md:w-1/16"></div>
                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          class="w-5 h-5 ml-3 rounded"
                                          id="familystatus-1"
                                          type="radio"
                                          value="1"
                                          name="fm_marital_status"
                                          onChange={(e) =>
                                            onclick("fm_marital_status", e)
                                          }
                                          // checked={
                                          //   testdata.fm_marital_status == 1
                                          //     ? true
                                          //     : false
                                          // }
                                        />

                                        <span class="ml-3" for="familystatus-1">
                                          ?????????????????????????????????
                                        </span>
                                      </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          class="w-5 h-5 ml-3 rounded"
                                          id="familystatus-2"
                                          type="radio"
                                          value="2"
                                          name="fm_marital_status"
                                          onChange={(e) =>
                                            onclick("fm_marital_status", e)
                                          }
                                          // checked={
                                          //   testdata.fm_marital_status == 2
                                          //     ? true
                                          //     : false
                                          // }
                                        />

                                        <span class="ml-3" for="familystatus-2">
                                          ??????????????????????????????
                                        </span>
                                      </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          class="w-5 h-5 ml-3 rounded"
                                          id="familystatus-3"
                                          type="radio"
                                          value="3"
                                          name="fm_marital_status"
                                          onChange={(e) =>
                                            onclick("fm_marital_status", e)
                                          }
                                          // checked={
                                          //   testdata.fm_marital_status == 3
                                          //     ? true
                                          //     : false
                                          // }
                                        />

                                        <span class="ml-3" for="familystatus-3">
                                          ????????????????????????
                                        </span>
                                      </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          class="w-5 h-5 ml-3 rounded"
                                          id="familystatus-4"
                                          type="radio"
                                          value="4"
                                          name="fm_marital_status"
                                          onChange={(e) =>
                                            onclick("fm_marital_status", e)
                                          }
                                          // checked={
                                          //   testdata.fm_marital_status == 4
                                          //     ? true
                                          //     : false
                                          // }
                                        />

                                        <span class="ml-3" for="familystatus-4">
                                          ???????????????????????????????????????
                                        </span>
                                      </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          class="w-5 h-5 ml-3 rounded"
                                          id="familystatus-5"
                                          type="radio"
                                          value="5"
                                          name="fm_marital_status"
                                          onChange={(e) =>
                                            onclick("fm_marital_status", e)
                                          }
                                          // checked={
                                          //   testdata.fm_marital_status == 5
                                          //     ? true
                                          //     : false
                                          // }
                                        />

                                        <span class="ml-3" for="familystatus-5">
                                          ??????????????????????????????????????????
                                        </span>
                                      </label>
                                    </div>
                                  </div>
                                </div>
                                <div className="mt-5 flex flex-col mb-4">
                                  <div className="flex flex-row  ">
                                    <label
                                      className="ml-2 mb-2 pl-1 font-bold text-lg text-gray-900  w-1/16 md:w-1/12"
                                      htmlFor="first_name"
                                    ></label>
                                    <label
                                      className="ml-2 mb-2 pl-1 font-bold text-lg text-gray-900  w-full"
                                      htmlFor="first_name"
                                    >
                                      ???????????????????????????????????????????????????????????????(??????????????????????????????????????????-???????????????)?????????????????????????????????????????????????????????????????????????????????????????????????????????
                                    </label>
                                  </div>
                                  <div className="flex flex-row mb-4">
                                    <label
                                      className="ml-2 mb-2 pl-1 font-bold text-lg text-gray-900  w-12"
                                      htmlFor="first_name"
                                    ></label>
                                    <input
                                      className="ml-2 py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-1/4"
                                      type="text"
                                      value={testdata.parent_relation}
                                      onChange={(e) =>
                                        modalhandleChange("parent_relation", e)
                                      }
                                    />
                                  </div>
                                </div>
                                <div className="flex flex-col mb-4">
                                  <div className="flex flex-row  ">
                                    <label
                                      className="ml-2 mb-2 pl-1 font-bold text-lg text-gray-900  w-12"
                                      htmlFor="first_name"
                                    ></label>

                                    <label
                                      className="ml-3 mb-2 pl-1 font-bold text-lg text-gray-900  w-2/6
                                        "
                                      htmlFor="first_name"
                                    >
                                      ????????????-?????????????????????
                                    </label>

                                    <label
                                      className="ml-3 mb-2 pl-1 font-bold text-lg text-gray-900  w-1/4"
                                      htmlFor="first_name"
                                    >
                                      ???????????????????????????????????????
                                    </label>
                                    <label
                                      className="ml-3 mb-2 pl-1 font-bold text-lg text-gray-900  w-1/4"
                                      htmlFor="first_name"
                                    >
                                      ???????????????
                                    </label>
                                  </div>
                                  <div className="flex flex-row mb-4">
                                    <label
                                      className="ml-2 mb-2 pl-1 font-bold text-lg text-gray-900  w-12"
                                      htmlFor="first_name"
                                    ></label>
                                    <input
                                      className="ml-2 py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-2/6"
                                      type="text"
                                      value={testdata.parent_name}
                                      onChange={(e) =>
                                        modalhandleChange("parent_name", e)
                                      }
                                    />

                                    <input
                                      className="ml-3 py-2 px-3  border-solid  border border-gray-300 outline-none  rounded-lg shadow w-2/10"
                                      type="text"
                                      value={testdata.parent_phonenumber}
                                      onChange={(e) =>
                                        modalhandleChange(
                                          "parent_phonenumber",
                                          e
                                        )
                                      }
                                    />

                                    <input
                                      className="ml-3 py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-2/10"
                                      type="text"
                                      value={testdata.parent_occupaton}
                                      onChange={(e) =>
                                        modalhandleChange("parent_occupaton", e)
                                      }
                                    />
                                  </div>
                                </div>
                                <div className="flex flex-col mb-4">
                                  <div className="flex flex-row  ">
                                    <label
                                      className="ml-2 mb-2 pl-1 font-bold text-xl text-gray-900  w-12"
                                      htmlFor="first_name"
                                    ></label>
                                    <label
                                      className="ml-2 mb-2 pl-1 font-bold text-xl text-gray-900  w-full"
                                      htmlFor="first_name"
                                    >
                                      ??????????????????????????????????????????????????????????????????
                                    </label>
                                  </div>

                                  <div className="flex flex-row w-full ">
                                    <label
                                      className="ml-2 mb-2 pl-1 font-bold text-lg text-gray-900  w-12"
                                      htmlFor="first_name"
                                    ></label>
                                    <label
                                      className="ml-2 mb-2 pl-1 text-lg text-gray-900  w-1/4"
                                      htmlFor="first_name"
                                    >
                                      ?????????????????????????????????????????????????????????????????? (??????????????????????????????????????????)
                                    </label>

                                    <label
                                      className="ml-3 mb-2 pl-1 text-lg text-gray-900  w-1/4"
                                      htmlFor="first_name"
                                    >
                                      ???????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????(?????????????????????/?????????
                                      )
                                    </label>
                                  </div>
                                  <div className="flex flex-row mb-4">
                                    <label
                                      className="ml-2 mb-2 pl-1 font-bold text-lg text-gray-900  w-12"
                                      htmlFor="first_name"
                                    ></label>

                                    <input
                                      className="ml-2 py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-1/4"
                                      type="text"
                                      value={testdata.household_member}
                                      onChange={(e) =>
                                        modalhandleChange("household_member", e)
                                      }
                                    />
                                    <input
                                      className="ml-3 py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-1/4"
                                      type="text"
                                      value={testdata.hours_family_together}
                                      onChange={(e) =>
                                        modalhandleChange(
                                          "hours_family_together",
                                          e
                                        )
                                      }
                                    />
                                  </div>
                                </div>
                                <div className="flex flex-col mb-4">
                                  <div className="flex flex-row  ">
                                    <label
                                      className="ml-2 mb-2 pl-1 font-bold text-xl text-gray-900  w-12"
                                      htmlFor="first_name"
                                    ></label>
                                    <label
                                      className="ml-2 mb-2 pl-1 font-bold text-xl text-gray-900  w-full"
                                      htmlFor="first_name"
                                    >
                                      ??????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
                                    </label>
                                  </div>
                                  <div className="flex flex-row pl-2">
                                    <div className="  ml-2 text-xl text-left  w-1/12"></div>
                                    <div className="   text-xl text-left mt-3 w-1/4">
                                      ????????????
                                    </div>
                                  </div>
                                  <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-12"></div>
                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          class="w-5 h-5 ml-3 rounded"
                                          id="father-1"
                                          type="radio"
                                          value="1"
                                          name="relationship_father_chk"
                                          onChange={(e) =>
                                            onclick(
                                              "relationship_father_chk",
                                              e
                                            )
                                          }
                                          checked={
                                            testdata.relationship_father_chk ==
                                            "1"
                                              ? true
                                              : false
                                          }
                                        />
                                        <span class="ml-3" for="father-1">
                                          ?????????????????????
                                        </span>
                                      </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          class="w-5 h-5 ml-3 rounded"
                                          id="father-2"
                                          type="radio"
                                          value="2"
                                          name="relationship_father_chk"
                                          onChange={(e) =>
                                            onclick(
                                              "relationship_father_chk",
                                              e
                                            )
                                          }
                                          checked={
                                            testdata.relationship_father_chk ==
                                            "2"
                                              ? true
                                              : false
                                          }
                                        />
                                        <span class="ml-3" for="father-2">
                                          ????????? ???
                                        </span>
                                      </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          class="w-5 h-5 ml-3 rounded"
                                          id="father-3"
                                          type="radio"
                                          value="3"
                                          name="relationship_father_chk"
                                          onChange={(e) =>
                                            onclick(
                                              "relationship_father_chk",
                                              e
                                            )
                                          }
                                          checked={
                                            testdata.relationship_father_chk ==
                                            "3"
                                              ? true
                                              : false
                                          }
                                        />
                                        <span class="ml-3" for="father-3">
                                          ????????????????????????
                                        </span>
                                      </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          class="w-5 h-5 ml-3 rounded"
                                          id="father-4"
                                          type="radio"
                                          value="4"
                                          name="relationship_father_chk"
                                          onChange={(e) =>
                                            onclick(
                                              "relationship_father_chk",
                                              e
                                            )
                                          }
                                          checked={
                                            testdata.relationship_father_chk ==
                                            "4"
                                              ? true
                                              : false
                                          }
                                        />
                                        <span class="ml-3" for="father-4">
                                          ?????????????????????
                                        </span>
                                      </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          class="w-5 h-5 ml-3 rounded"
                                          id="father-5"
                                          type="radio"
                                          value="5"
                                          name="relationship_father_chk"
                                          onChange={(e) =>
                                            onclick(
                                              "relationship_father_chk",
                                              e
                                            )
                                          }
                                          checked={
                                            testdata.relationship_father_chk ==
                                            "5"
                                              ? true
                                              : false
                                          }
                                        />
                                        <span class="ml-3" for="father-5">
                                          ???????????????
                                        </span>
                                      </label>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex flex-col mb-4">
                                  <div className="flex flex-row pl-2  ">
                                    <div className="  ml-2 text-xl text-left  w-1/12"></div>
                                    <div className="   text-xl text-left mt-3 w-1/4">
                                      ???????????????
                                    </div>
                                  </div>
                                  <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-12"></div>
                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          class="w-5 h-5 ml-3 rounded"
                                          id="mother-1"
                                          type="radio"
                                          value="1"
                                          name="relationship_mother_chk"
                                          onChange={(e) =>
                                            onclick(
                                              "relationship_mother_chk",
                                              e
                                            )
                                          }
                                          // checked={
                                          //   testdata.relationship_mother_chk ==
                                          //   1
                                          //     ? true
                                          //     : false
                                          // }
                                        />
                                        <span class="ml-3" for="mother-1">
                                          ?????????????????????
                                        </span>
                                      </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          class="w-5 h-5 ml-3 rounded"
                                          id="mother-2"
                                          type="radio"
                                          value="2"
                                          name="relationship_mother_chk"
                                          onChange={(e) =>
                                            onclick(
                                              "relationship_mother_chk",
                                              e
                                            )
                                          }
                                          // checked={
                                          //   testdata.relationship_mother_chk ==
                                          //   2
                                          //     ? true
                                          //     : false
                                          // }
                                        />
                                        <span class="ml-3" for="mother-2">
                                          ????????? ???
                                        </span>
                                      </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          class="w-5 h-5 ml-3 rounded"
                                          id="mother-3"
                                          type="radio"
                                          value="3"
                                          name="relationship_mother_chk"
                                          onChange={(e) =>
                                            onclick(
                                              "relationship_mother_chk",
                                              e
                                            )
                                          }
                                          // checked={
                                          //   testdata.relationship_mother_chk ==
                                          //   3
                                          //     ? true
                                          //     : false
                                          // }
                                        />
                                        <span class="ml-3" for="mother-3">
                                          ????????????????????????
                                        </span>
                                      </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          class="w-5 h-5 ml-3 rounded"
                                          id="mother-4"
                                          type="radio"
                                          value="4"
                                          name="relationship_mother_chk"
                                          onChange={(e) =>
                                            onclick(
                                              "relationship_mother_chk",
                                              e
                                            )
                                          }
                                          // checked={
                                          //   testdata.relationship_mother_chk ==
                                          //   4
                                          //     ? true
                                          //     : false
                                          // }
                                        />
                                        <span class="ml-3" for="mother-4">
                                          ?????????????????????
                                        </span>
                                      </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          class="w-5 h-5 ml-3 rounded"
                                          id="mother-5"
                                          type="radio"
                                          value="5"
                                          name="relationship_mother_chk"
                                          onChange={(e) =>
                                            onclick(
                                              "relationship_mother_chk",
                                              e
                                            )
                                          }
                                          // checked={
                                          //   testdata.relationship_mother_chk ==
                                          //   5
                                          //     ? true
                                          //     : false
                                          // }
                                        />
                                        <span class="ml-3" for="mother-5">
                                          ???????????????
                                        </span>
                                      </label>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex flex-col mb-4">
                                  <div className="flex flex-row pl-2">
                                    <div className="  ml-2 text-xl text-left  w-1/12"></div>
                                    <div className="   text-xl text-left mt-3 w-1/4">
                                      ??????????????????/?????????????????????
                                    </div>
                                  </div>
                                  <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-12"></div>
                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          class="w-5 h-5 ml-3 rounded"
                                          id="sibling-1"
                                          type="radio"
                                          value="1"
                                          name="relationship_brother_chk"
                                          onChange={(e) =>
                                            onclick(
                                              "relationship_brother_chk",
                                              e
                                            )
                                          }
                                          // checked={
                                          //   testdata.relationship_brother_chk ==
                                          //   1
                                          //     ? true
                                          //     : false
                                          // }
                                        />
                                        <span class="ml-3" for="sibling-1">
                                          ?????????????????????
                                        </span>
                                      </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          class="w-5 h-5 ml-3 rounded"
                                          id="sibling-2"
                                          type="radio"
                                          value="2"
                                          name="relationship_brother_chk"
                                          onChange={(e) =>
                                            onclick(
                                              "relationship_brother_chk",
                                              e
                                            )
                                          }
                                          // checked={
                                          //   testdata.relationship_brother_chk ==
                                          //   2
                                          //     ? true
                                          //     : false
                                          // }
                                        />
                                        <span class="ml-3" for="sibling-2">
                                          ????????? ???
                                        </span>
                                      </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          class="w-5 h-5 ml-3 rounded"
                                          id="sibling-3"
                                          type="radio"
                                          value="3"
                                          name="relationship_brother_chk"
                                          onChange={(e) =>
                                            onclick(
                                              "relationship_brother_chk",
                                              e
                                            )
                                          }
                                          // checked={
                                          //   testdata.relationship_brother_chk ==
                                          //   3
                                          //     ? true
                                          //     : false
                                          // }
                                        />
                                        <span class="ml-3" for="sibling-3">
                                          ????????????????????????
                                        </span>
                                      </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          class="w-5 h-5 ml-3 rounded"
                                          id="sibling-4"
                                          type="radio"
                                          value="4"
                                          name="relationship_brother_chk"
                                          onChange={(e) =>
                                            onclick(
                                              "relationship_brother_chk",
                                              e
                                            )
                                          }
                                          // checked={
                                          //   testdata.relationship_brother_chk ==
                                          //   4
                                          //     ? true
                                          //     : false
                                          // }
                                        />
                                        <span class="ml-3" for="sibling-4">
                                          ?????????????????????
                                        </span>
                                      </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          class="w-5 h-5 ml-3 rounded"
                                          id="sibling-5"
                                          type="radio"
                                          value="5"
                                          name="relationship_brother_chk"
                                          onChange={(e) =>
                                            onclick(
                                              "relationship_brother_chk",
                                              e
                                            )
                                          }
                                          // checked={
                                          //   testdata.relationship_brother_chk ==
                                          //   5
                                          //     ? true
                                          //     : false
                                          // }
                                        />
                                        <span class="ml-3" for="sibling-5">
                                          ???????????????
                                        </span>
                                      </label>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex flex-col mb-4">
                                  <div className="flex flex-row pl-2">
                                    <div className="  ml-2 text-xl text-left  w-1/12"></div>
                                    <div className="   text-xl text-left mt-3 w-1/4">
                                      ??????????????????/?????????????????????
                                    </div>
                                  </div>
                                  <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-12"></div>
                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          class="w-5 h-5 ml-3 rounded"
                                          id="sister-1"
                                          type="radio"
                                          value="1"
                                          name="relationship_sister_chk"
                                          onChange={(e) =>
                                            onclick(
                                              "relationship_sister_chk",
                                              e
                                            )
                                          }
                                          // checked={
                                          //   testdata.relationship_sister_chk ==
                                          //   1
                                          //     ? true
                                          //     : false
                                          // }
                                        />
                                        <span class="ml-3" for="sister-1">
                                          ?????????????????????
                                        </span>
                                      </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          class="w-5 h-5 ml-3 rounded"
                                          id="sister-2"
                                          type="radio"
                                          value="2"
                                          name="relationship_sister_chk"
                                          onChange={(e) =>
                                            onclick(
                                              "relationship_sister_chk",
                                              e
                                            )
                                          }
                                          // checked={
                                          //   testdata.relationship_sister_chk ==
                                          //   2
                                          //     ? true
                                          //     : false
                                          // }
                                        />
                                        <span class="ml-3" for="sister-2">
                                          ????????? ???
                                        </span>
                                      </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          class="w-5 h-5 ml-3 rounded"
                                          id="sister-3"
                                          type="radio"
                                          value="3"
                                          name="relationship_sister_chk"
                                          onChange={(e) =>
                                            onclick(
                                              "relationship_sister_chk",
                                              e
                                            )
                                          }
                                          // checked={
                                          //   testdata.relationship_sister_chk ==
                                          //   3
                                          //     ? true
                                          //     : false
                                          // }
                                        />
                                        <span class="ml-3" for="sister-3">
                                          ????????????????????????
                                        </span>
                                      </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          class="w-5 h-5 ml-3 rounded"
                                          id="sister-4"
                                          type="radio"
                                          value="4"
                                          name="relationship_sister_chk"
                                          onChange={(e) =>
                                            onclick(
                                              "relationship_sister_chk",
                                              e
                                            )
                                          }
                                          // checked={
                                          //   testdata.relationship_sister_chk ==
                                          //   4
                                          //     ? true
                                          //     : false
                                          // }
                                        />
                                        <span class="ml-3" for="sister-4">
                                          ?????????????????????
                                        </span>
                                      </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          class="w-5 h-5 ml-3 rounded"
                                          id="sister-5"
                                          type="radio"
                                          value="5"
                                          name="relationship_sister_chk"
                                          onChange={(e) =>
                                            onclick(
                                              "relationship_sister_chk",
                                              e
                                            )
                                          }
                                          // checked={
                                          //   testdata.relationship_sister_chk ==
                                          //   5
                                          //     ? true
                                          //     : false
                                          // }
                                        />
                                        <span class="ml-3" for="sister-5">
                                          ???????????????
                                        </span>
                                      </label>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex flex-col mb-4">
                                  <div className="flex flex-row pl-2">
                                    <div className="  ml-2 text-xl text-left  w-1/12"></div>
                                    <div className="   text-xl text-left mt-3 w-1/4">
                                      ?????????/?????????/??????/?????????
                                    </div>
                                  </div>
                                  <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-12"></div>
                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          class="w-5 h-5 ml-3 rounded"
                                          id="grandparents-1"
                                          type="radio"
                                          value="1"
                                          name="relationship_grand"
                                          onChange={(e) =>
                                            onclick("relationship_grand", e)
                                          }
                                          // checked={
                                          //   testdata.relationship_grand == 1
                                          //     ? true
                                          //     : false
                                          // }
                                        />
                                        <span class="ml-3" for="grandparents-1">
                                          ?????????????????????
                                        </span>
                                      </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          class="w-5 h-5 ml-3 rounded"
                                          id="grandparents-2"
                                          type="radio"
                                          value="2"
                                          name="relationship_grand"
                                          onChange={(e) =>
                                            onclick("relationship_grand", e)
                                          }
                                          // checked={
                                          //   testdata.relationship_grand == 2
                                          //     ? true
                                          //     : false
                                          // }
                                        />
                                        <span class="ml-3" for="grandparents-2">
                                          ????????? ???
                                        </span>
                                      </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          class="w-5 h-5 ml-3 rounded"
                                          id="grandparents-3"
                                          type="radio"
                                          value="3"
                                          name="relationship_grand"
                                          onChange={(e) =>
                                            onclick("relationship_grand", e)
                                          }
                                          // checked={
                                          //   testdata.relationship_grand == 3
                                          //     ? true
                                          //     : false
                                          // }
                                        />
                                        <span class="ml-3" for="grandparents-3">
                                          ????????????????????????
                                        </span>
                                      </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          class="w-5 h-5 ml-3 rounded"
                                          id="grandparents-4"
                                          type="radio"
                                          value="4"
                                          name="relationship_grand"
                                          onChange={(e) =>
                                            onclick("relationship_grand", e)
                                          }
                                          // checked={
                                          //   testdata.relationship_grand == 4
                                          //     ? true
                                          //     : false
                                          // }
                                        />
                                        <span class="ml-3" for="grandparents-4">
                                          ?????????????????????
                                        </span>
                                      </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          class="w-5 h-5 ml-3 rounded"
                                          id="grandparents-5"
                                          type="radio"
                                          value="5"
                                          name="relationship_grand"
                                          onChange={(e) =>
                                            onclick("relationship_grand", e)
                                          }
                                          // checked={
                                          //   testdata.relationship_grand == 5
                                          //     ? true
                                          //     : false
                                          // }
                                        />
                                        <span class="ml-3" for="grandparents-5">
                                          ???????????????
                                        </span>
                                      </label>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex flex-col mb-4">
                                  <div className="flex flex-row pl-2">
                                    <div className="  ml-2 text-xl text-left  w-1/12"></div>
                                    <div className="   text-xl text-left mt-3 w-1/4">
                                      ????????????
                                    </div>
                                  </div>
                                  <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-12"></div>
                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          class="w-5 h-5 ml-3 rounded"
                                          id="relative-1"
                                          type="radio"
                                          value="1"
                                          name="relationship_relative"
                                          onChange={(e) =>
                                            onclick("relationship_relative", e)
                                          }
                                          checked={
                                            testdata.relationship_relative == 1
                                              ? true
                                              : false
                                          }
                                        />
                                        <span class="ml-3" for="relative-1">
                                          ?????????????????????
                                        </span>
                                      </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          class="w-5 h-5 ml-3 rounded"
                                          id="relative-2"
                                          type="radio"
                                          value="2"
                                          name="relationship_relative"
                                          onChange={(e) =>
                                            onclick("relationship_relative", e)
                                          }
                                          checked={
                                            testdata.relationship_relative == 2
                                              ? true
                                              : false
                                          }
                                        />
                                        <span class="ml-3" for="relative-2">
                                          ????????? ???
                                        </span>
                                      </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          class="w-5 h-5 ml-3 rounded"
                                          id="relative-3"
                                          type="radio"
                                          value="3"
                                          name="relationship_relative"
                                          onChange={(e) =>
                                            onclick("relationship_relative", e)
                                          }
                                          checked={
                                            testdata.relationship_relative == 3
                                              ? true
                                              : false
                                          }
                                        />
                                        <span class="ml-3" for="relative-3">
                                          ????????????????????????
                                        </span>
                                      </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          class="w-5 h-5 ml-3 rounded"
                                          id="relative-4"
                                          type="radio"
                                          value="4"
                                          name="relationship_relative"
                                          onChange={(e) =>
                                            onclick("relationship_relative", e)
                                          }
                                          checked={
                                            testdata.relationship_relative == 4
                                              ? true
                                              : false
                                          }
                                        />
                                        <span class="ml-3" for="relative-4">
                                          ?????????????????????
                                        </span>
                                      </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          class="w-5 h-5 ml-3 rounded"
                                          id="relative-5"
                                          type="radio"
                                          value="5"
                                          name="relationship_relative"
                                          onChange={(e) =>
                                            onclick("relationship_relative", e)
                                          }
                                          checked={
                                            testdata.relationship_relative == 5
                                              ? true
                                              : false
                                          }
                                        />
                                        <span class="ml-3" for="relative-5">
                                          ???????????????
                                        </span>
                                      </label>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex flex-col mb-4">
                                  <div className="flex flex-row pl-2">
                                    <div className="  ml-2 text-xl text-left  w-1/12"></div>
                                    <div className="   text-xl text-left mt-3 ">
                                      ???????????????
                                    </div>
                                    <input
                                      className="ml-2 py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-2/6"
                                      type="text"
                                      onChange={(e) =>
                                        modalhandleChange(
                                          "relationship_other_name",
                                          e
                                        )
                                      }
                                    />
                                  </div>
                                  <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-12"></div>
                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          class="w-5 h-5 ml-3 rounded"
                                          id="other-1"
                                          type="radio"
                                          value="1"
                                          name="relationship_other"
                                          onChange={(e) =>
                                            onclick("relationship_other", e)
                                          }
                                          // checked={
                                          //   testdata.relationship_other == 1
                                          //     ? true
                                          //     : false
                                          // }
                                        />
                                        <span class="ml-3" for="other-1">
                                          ?????????????????????
                                        </span>
                                      </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          class="w-5 h-5 ml-3 rounded"
                                          id="other-2"
                                          type="radio"
                                          value="2"
                                          name="relationship_other"
                                          onChange={(e) =>
                                            onclick("relationship_other", e)
                                          }
                                          // checked={
                                          //   testdata.relationship_other == 2
                                          //     ? true
                                          //     : false
                                          // }
                                        />
                                        <span class="ml-3" for="other-2">
                                          ????????? ???
                                        </span>
                                      </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          class="w-5 h-5 ml-3 rounded"
                                          id="other-3"
                                          type="radio"
                                          value="3"
                                          name="relationship_other"
                                          onChange={(e) =>
                                            onclick("relationship_other", e)
                                          }
                                          // checked={
                                          //   testdata.relationship_other == 3
                                          //     ? true
                                          //     : false
                                          // }
                                        />
                                        <span class="ml-3" for="other-3">
                                          ????????????????????????
                                        </span>
                                      </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          class="w-5 h-5 ml-3 rounded"
                                          id="other-4"
                                          type="radio"
                                          value="4"
                                          name="relationship_other"
                                          onChange={(e) =>
                                            onclick("relationship_other", e)
                                          }
                                          // checked={
                                          //   testdata.relationship_other == 4
                                          //     ? true
                                          //     : false
                                          // }
                                        />
                                        <span class="ml-3" for="other-4">
                                          ?????????????????????
                                        </span>
                                      </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          class="w-5 h-5 ml-3 rounded"
                                          id="other-5"
                                          type="radio"
                                          value="5"
                                          name="relationship_other"
                                          onChange={(e) =>
                                            onclick("relationship_other", e)
                                          }
                                          // checked={
                                          //   testdata.relationship_other == 5
                                          //     ? true
                                          //     : false
                                          // }
                                        />
                                        <span class="ml-3" for="other-5">
                                          ???????????????
                                        </span>
                                      </label>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex flex-col mb-4">
                                  <div className="flex flex-row pl-2 mt-5">
                                    <label
                                      className="ml-2 mb-2 pl-1 font-bold text-xl text-gray-900  w-12"
                                      htmlFor="first_name"
                                    ></label>
                                    <label
                                      className="ml-2 mb-2 pl-1 font-bold text-xl text-gray-900  w-full"
                                      htmlFor="first_name"
                                    >
                                      ????????????????????????????????????????????????????????????????????????
                                      ???????????????????????????????????????????????????????????????????????????
                                    </label>
                                  </div>
                                  <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-12"></div>
                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          class="w-5 h-5 ml-3 rounded"
                                          id="housevisit-1"
                                          type="radio"
                                          value="1"
                                          name="parents_leave_child_with_someone"
                                          onChange={(e) =>
                                            onclick(
                                              "parents_leave_child_with_someone",
                                              e
                                            )
                                          }
                                          // checked={
                                          //   testdata.parents_leave_child_with_someone ==
                                          //   1
                                          //     ? true
                                          //     : false
                                          // }
                                        />
                                        <span class="ml-3" for="housevisit-1">
                                          ????????????
                                        </span>
                                      </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          class="w-5 h-5 ml-3 rounded"
                                          id="housevisit-2"
                                          type="radio"
                                          value="2"
                                          name="parents_leave_child_with_someone"
                                          onChange={(e) =>
                                            onclick(
                                              "parents_leave_child_with_someone",
                                              e
                                            )
                                          }
                                          // checked={
                                          //   testdata.parents_leave_child_with_someone ==
                                          //   2
                                          //     ? true
                                          //     : false
                                          // }
                                        />
                                        <span class="ml-3" for="housevisit-2">
                                          ??????????????????????????????
                                        </span>
                                      </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          class="w-5 h-5 ml-3 rounded"
                                          id="housevisit-3"
                                          type="radio"
                                          value="3"
                                          name="parents_leave_child_with_someone"
                                          onChange={(e) =>
                                            onclick(
                                              "parents_leave_child_with_someone",
                                              e
                                            )
                                          }
                                          // checked={
                                          //   testdata.parents_leave_child_with_someone ==
                                          //   3
                                          //     ? true
                                          //     : false
                                          // }
                                        />
                                        <span class="ml-3" for="housevisit-3">
                                          ???????????????????????????????????????????????????????????????????????????
                                        </span>
                                      </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          class="w-5 h-5 ml-3 rounded"
                                          id="housevisit-4"
                                          type="radio"
                                          value="4"
                                          name="parents_leave_child_with_someone"
                                          onChange={(e) =>
                                            onclick(
                                              "parents_leave_child_with_someone",
                                              e
                                            )
                                          }
                                          // checked={
                                          //   testdata.parents_leave_child_with_someone ==
                                          //   4
                                          //     ? true
                                          //     : false
                                          // }
                                        />
                                        <span class="ml-3" for="housevisit-4">
                                          ???????????? ???{" "}
                                        </span>
                                        <input
                                          className="ml-2 py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-1/4"
                                          type="text"
                                          value={
                                            testdata.parents_leave_child_with_someone_other
                                          }
                                          onChange={(e) =>
                                            onclick(
                                              "parents_leave_child_with_someone_other",
                                              e
                                            )
                                          }
                                        />
                                      </label>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex flex-col mb-4">
                                  <div className="flex flex-row w-full mt-4">
                                    <label
                                      className="ml-2 mb-2 pl-1 font-bold text-lg text-gray-900  w-12"
                                      htmlFor="first_name"
                                    ></label>
                                    <label
                                      className="ml-2 mb-2 pl-1 text-lg text-gray-900  w-1/4"
                                      htmlFor="first_name"
                                    >
                                      ???????????????????????????????????????????????????????????????
                                    </label>
                                  </div>
                                  <div className="flex flex-row mb-4 mt-2">
                                    <label
                                      className="ml-2 mb-2 pl-1 font-bold text-lg text-gray-900  w-12"
                                      htmlFor="first_name"
                                    ></label>

                                    <input
                                      className="ml-2 py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-1/4"
                                      type="text"
                                      value={testdata.household_income}
                                      onChange={(e) =>
                                        onclick("household_income", e)
                                      }
                                    />
                                  </div>
                                </div>
                                <div className="flex flex-col mb-4">
                                  <div className="flex flex-row w-full mt-4">
                                    <label
                                      className="ml-2 mb-2 pl-1 font-bold text-lg text-gray-900  w-12"
                                      htmlFor="first_name"
                                    ></label>
                                    <label
                                      className="ml-2 mb-2 pl-1 text-lg text-gray-900  w-1/4"
                                      htmlFor="first_name"
                                    >
                                      ????????????????????????????????????????????????????????????????????????
                                    </label>
                                    <label
                                      className="ml-3 mb-2 pl-1 text-lg text-gray-900  w-1/4"
                                      htmlFor="first_name"
                                    >
                                      ??????????????????????????????????????????????????????????????????????????????????????????
                                    </label>
                                  </div>
                                  <div className="flex flex-row mb-4 mt-2">
                                    <label
                                      className="ml-2 mb-2 pl-1 font-bold text-lg text-gray-900  w-12"
                                      htmlFor="first_name"
                                    ></label>

                                    <input
                                      className="ml-2 py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-1/4"
                                      type="text"
                                      value={testdata.receive_expenses_from}
                                      onChange={(e) =>
                                        onclick("receive_expenses_from", e)
                                      }
                                    />
                                    <input
                                      className="ml-3 py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-1/4"
                                      type="text"
                                      value={testdata.money_to_school}
                                      onChange={(e) =>
                                        onclick("money_to_school", e)
                                      }
                                    />
                                  </div>
                                </div>
                                <div className="flex flex-col mb-4">
                                  <div className="flex flex-row w-full mt-4">
                                    <label
                                      className="ml-2 mb-2 pl-1 font-bold text-lg text-gray-900  w-12"
                                      htmlFor="first_name"
                                    ></label>
                                    <label
                                      className="ml-2 mb-2 pl-1 text-lg text-gray-900  w-1/4"
                                      htmlFor="first_name"
                                    >
                                      ??????????????????????????????????????????????????????????????? (???????????????)
                                    </label>
                                    <label
                                      className="ml-3 mb-2 pl-1 text-lg text-gray-900  w-1/4"
                                      htmlFor="first_name"
                                    >
                                      ?????????????????????????????????
                                    </label>
                                  </div>
                                  <div className="flex flex-row mb-4 mt-2">
                                    <label
                                      className="ml-2 mb-2 pl-1 font-bold text-lg text-gray-900  w-12"
                                      htmlFor="first_name"
                                    ></label>

                                    <input
                                      className="ml-2 py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-1/4"
                                      type="text"
                                      value={testdata.work_to_earn}
                                      onChange={(e) =>
                                        onclick("work_to_earn", e)
                                      }
                                    />
                                    <input
                                      className="ml-3 py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-1/4"
                                      type="text"
                                      value={testdata.work_to_earn_inc_perday}
                                      onChange={(e) =>
                                        onclick("work_to_earn_inc_perday", e)
                                      }
                                    />
                                  </div>
                                </div>
                                <div className="flex flex-col mb-4">
                                  <div className="flex flex-row pl-2 mt-5">
                                    <label
                                      className="ml-2 mb-2 pl-1 font-bold text-xl text-gray-900  w-12"
                                      htmlFor="first_name"
                                    ></label>
                                    <label
                                      className="ml-2 mb-2 pl-1 font-bold text-xl text-gray-900  w-full"
                                      htmlFor="first_name"
                                    >
                                      ?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
                                    </label>
                                  </div>
                                  <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-12"></div>

                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          type="checkbox"
                                          class="w-5 h-5 ml-3 rounded md:w-5 md:h-5"
                                          value={
                                            testdata.want_schools_help.study
                                          }
                                          onChange={(e) =>
                                            checkboxclick(
                                              "want_schools_help",
                                              "study",
                                              e
                                            )
                                          }
                                          checked={
                                            testdata.want_schools_help.study ==
                                            1
                                              ? true
                                              : false
                                          }
                                        />
                                        <span class="ml-3">????????????????????????????????????</span>
                                      </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          type="checkbox"
                                          class="w-5 h-5 ml-3 rounded md:w-5 md:h-5"
                                          value={
                                            testdata.want_schools_help.behavior
                                          }
                                          onChange={(e) =>
                                            checkboxclick(
                                              "want_schools_help",
                                              "behavior",
                                              e
                                            )
                                          }
                                          checked={
                                            testdata.want_schools_help
                                              .behavior == 1
                                              ? true
                                              : false
                                          }
                                        />
                                        <span class="ml-3">????????????????????????????????????</span>
                                      </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          type="checkbox"
                                          class="w-5 h-5 ml-3 rounded md:w-5 md:h-5"
                                          value={testdata.want_schools_help.eco}
                                          onChange={(e) =>
                                            checkboxclick(
                                              "want_schools_help",
                                              "eco",
                                              e
                                            )
                                          }
                                          checked={
                                            testdata.want_schools_help.eco == 1
                                              ? true
                                              : false
                                          }
                                        />
                                        <span class="ml-3">????????????????????????????????????</span>
                                      </label>
                                    </div>
                                    <div class="mt-2 flex justify-center ">
                                      <label class="inline-flex items-center">
                                        <input
                                          type="checkbox"
                                          class="w-5 h-5 ml-3 rounded"
                                          value={
                                            testdata.want_schools_help.other
                                          }
                                          onChange={(e) =>
                                            checkboxclick(
                                              "want_schools_help",
                                              "other",
                                              e
                                            )
                                          }
                                          checked={
                                            testdata.want_schools_help.other ==
                                            1
                                              ? true
                                              : false
                                          }
                                        />
                                        <span class="ml-3">???????????? ???</span>
                                        <input
                                          className="ml-3 py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-1/4"
                                          type="text"
                                          value={
                                            testdata.want_schools_help_other
                                          }
                                          onChange={(e) =>
                                            modalhandleChange(
                                              "want_schools_help_other",
                                              e
                                            )
                                          }
                                        />
                                      </label>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex flex-col mb-4">
                                  <div className="flex flex-row pl-2 mt-5">
                                    <label
                                      className="ml-2 mb-2 pl-1 font-bold text-xl text-gray-900  w-12"
                                      htmlFor="first_name"
                                    ></label>
                                    <label
                                      className="ml-2 mb-2 pl-1 font-bold text-xl text-gray-900  w-full"
                                      htmlFor="first_name"
                                    >
                                      ???????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
                                    </label>
                                  </div>
                                  <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-12"></div>

                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          type="checkbox"
                                          class="w-5 h-5 ml-3 rounded"
                                          value={testdata.agency_help.elderly}
                                          onChange={(e) =>
                                            checkboxclick(
                                              "agency_help",
                                              "elderly",
                                              e
                                            )
                                          }
                                          checked={
                                            testdata.agency_help.elderly == 1
                                              ? true
                                              : false
                                          }
                                        />
                                        <span class="ml-3">??????????????????????????????????????????</span>
                                      </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          type="checkbox"
                                          class="w-5 h-5 ml-3 rounded"
                                          value={
                                            testdata.agency_help.disability
                                          }
                                          onChange={(e) =>
                                            checkboxclick(
                                              "agency_help",
                                              "disability",
                                              e
                                            )
                                          }
                                          checked={
                                            testdata.agency_help.disability == 1
                                              ? true
                                              : false
                                          }
                                        />
                                        <span class="ml-3">?????????????????????????????? </span>
                                      </label>
                                    </div>

                                    <div class="mt-2 flex justify-center ">
                                      <label class="inline-flex items-center">
                                        <input
                                          type="checkbox"
                                          class="w-5 h-5 ml-3 rounded"
                                          value={testdata.agency_help.other}
                                          onChange={(e) =>
                                            checkboxclick(
                                              "agency_help",
                                              "other",
                                              e
                                            )
                                          }
                                          checked={
                                            testdata.agency_help.other == 1
                                              ? true
                                              : false
                                          }
                                        />
                                        <span class="ml-3">???????????????</span>
                                        <input
                                          className="ml-3 py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-1/4"
                                          type="text"
                                          value={testdata.agency_help_other}
                                          onChange={(e) =>
                                            modalhandleChange(
                                              "agency_help_other",
                                              e
                                            )
                                          }
                                        />
                                      </label>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex flex-col mb-4">
                                  <div className="flex flex-row pl-2 mt-5">
                                    <label
                                      className=" mb-2 pl-1 font-bold text-xl text-gray-900  w-1/12"
                                      htmlFor="first_name"
                                    ></label>
                                    <label
                                      className="ml-3 mb-2 pl-1 text-lg text-gray-900  w-full"
                                      htmlFor="first_name"
                                    >
                                      ??????????????????????????????????????????????????????????????????????????????????????????????????????????????????
                                    </label>
                                  </div>
                                  <div class="flex flex-row pl-2 mt-3">
                                    <label
                                      className="ml-2 mb-2 pl-1 font-bold text-lg text-gray-900  w-12"
                                      htmlFor="first_name"
                                    ></label>
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
                                      placeholder="Your message..."
                                      onChange={(e) =>
                                        modalhandleChange("Parents_concern", e)
                                      }
                                    ></textarea>
                                  </div>
                                </div>
                                <div className="flex flex-col mb-4">
                                  <div className="flex flex-row pl-2 mt-5">
                                    <label
                                      className="ml-2 mb-2 pl-1 font-bold text-xl text-gray-900  w-12"
                                      htmlFor="first_name"
                                    ></label>

                                    <label
                                      className="ml-2 mb-2 pl-1 font-bold text-xl text-gray-900  w-full"
                                      htmlFor="first_name"
                                    >
                                      ???????????????????????????????????????????????????
                                      ????????????????????????????????????????????????????????????????????????????????????????????????????????????
                                    </label>
                                  </div>
                                  <div className="flex flex-row pl-2 mt-5">
                                    <label
                                      className=" mb-2 pl-1 font-bold text-xl text-gray-900  w-1/12"
                                      htmlFor="first_name"
                                    ></label>
                                    <label
                                      className="ml-3 mb-2 pl-1 text-lg text-gray-900  w-full"
                                      htmlFor="first_name"
                                    >
                                      ?????????????????????????????????????????????????????????????????? ??????????????????
                                    </label>
                                  </div>
                                  <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-12"></div>

                                    <div class="mt-2 flex justify-left w-1/3">
                                      <label class="inline-flex items-center">
                                        <input
                                          type="checkbox"
                                          class="w-5 h-5 ml-3 rounded"
                                          value={
                                            testdata.dependency.handicapped
                                          }
                                          onChange={(e) =>
                                            checkboxclick(
                                              "dependency",
                                              "handicapped",
                                              e
                                            )
                                          }
                                          checked={
                                            testdata.dependency.handicapped == 1
                                              ? true
                                              : false
                                          }
                                        />
                                        <span class="ml-3">???????????????????????????</span>
                                      </label>
                                    </div>
                                    <div class="mt-2 flex justify-left w-1/3">
                                      <label class="inline-flex items-center">
                                        <input
                                          type="checkbox"
                                          class="w-5 h-5 ml-3 rounded"
                                          value={testdata.dependency.elderly}
                                          onChange={(e) =>
                                            checkboxclick(
                                              "dependency",
                                              "elderly",
                                              e
                                            )
                                          }
                                          checked={
                                            testdata.dependency.elderly == 1
                                              ? true
                                              : false
                                          }
                                        />
                                        <span class="ml-3">
                                          ?????????????????????????????????????????? 60 ??????
                                        </span>
                                      </label>
                                    </div>
                                  </div>
                                  <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-12"></div>

                                    <div class="mt-2 flex justify-left w-1/3">
                                      <label class="inline-flex items-center">
                                        <input
                                          type="checkbox"
                                          class="w-5 h-5 ml-3 rounded"
                                          value={testdata.dependency.singlefm}
                                          onChange={(e) =>
                                            checkboxclick(
                                              "dependency",
                                              "singlefm",
                                              e
                                            )
                                          }
                                          checked={
                                            testdata.dependency.singlefm == 1
                                              ? true
                                              : false
                                          }
                                        />
                                        <span class="ml-3">
                                          ?????????????????????/?????????????????????????????????????????????
                                        </span>
                                      </label>
                                    </div>
                                    <div class="mt-2 flex justify-left w-1/3">
                                      <label class="inline-flex items-center">
                                        <input
                                          type="checkbox"
                                          class="w-5 h-5 ml-3 rounded"
                                          value={testdata.dependency.unemployed}
                                          onChange={(e) =>
                                            checkboxclick(
                                              "dependency",
                                              "unemployed",
                                              e
                                            )
                                          }
                                          checked={
                                            testdata.dependency.unemployed == 1
                                              ? true
                                              : false
                                          }
                                        />
                                      </label>
                                      <span class="ml-3">
                                        ???????????????????????? 15-65 ???????????????????????????
                                        (???????????????????????????????????????????????????/????????????????????????)
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex flex-col mb-4">
                                  <div className="flex flex-row pl-2 mt-5">
                                    <label
                                      className=" mb-2 pl-1 font-bold text-xl text-gray-900  w-1/12"
                                      htmlFor="first_name"
                                    ></label>
                                    <label
                                      className="ml-3 mb-2 pl-1 text-lg text-gray-900  w-1/4"
                                      htmlFor="first_name"
                                    >
                                      ?????????????????????????????????????????????????????? ???????????????
                                    </label>
                                  </div>
                                  <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-12"></div>

                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          type="checkbox"
                                          class="w-5 h-5 ml-3 rounded"
                                          value={testdata.housing_type.house}
                                          onChange={(e) =>
                                            checkboxclick(
                                              "housing_type",
                                              "house",
                                              e
                                            )
                                          }
                                          checked={
                                            testdata.housing_type.house == 1
                                              ? true
                                              : false
                                          }
                                        />
                                        <span class="ml-3">???????????????????????????????????? </span>
                                      </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          type="checkbox"
                                          class="w-5 h-5 ml-3 rounded"
                                          value={
                                            testdata.housing_type.rental_house
                                          }
                                          onChange={(e) =>
                                            checkboxclick(
                                              "housing_type",
                                              "rental_house",
                                              e
                                            )
                                          }
                                          checked={
                                            testdata.housing_type
                                              .rental_house == 1
                                              ? true
                                              : false
                                          }
                                        />
                                        <span class="ml-3">????????????????????????</span>
                                      </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          type="checkbox"
                                          class="w-5 h-5 ml-3 rounded"
                                          value={
                                            testdata.housing_type.with_others
                                          }
                                          onChange={(e) =>
                                            checkboxclick(
                                              "housing_type",
                                              "with_others",
                                              e
                                            )
                                          }
                                          checked={
                                            testdata.housing_type.with_others ==
                                            1
                                              ? true
                                              : false
                                          }
                                        />
                                        <span class="ml-3">
                                          ?????????????????????????????????????????????????????????
                                        </span>
                                      </label>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex flex-col mb-4">
                                  <div className="flex flex-row pl-2 mt-5">
                                    <label
                                      className=" mb-2 pl-1 font-bold text-xl text-gray-900  w-1/12"
                                      htmlFor="first_name"
                                    ></label>
                                    <label
                                      className="ml-3 mb-2 pl-1 text-lg text-gray-900  w-1/4"
                                      htmlFor="first_name"
                                    >
                                      ???????????????????????????????????????????????? ??????????????????
                                    </label>
                                  </div>
                                  <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-12"></div>

                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          type="checkbox"
                                          class="w-5 h-5 ml-3 rounded"
                                          value={
                                            testdata.housing_envir
                                              .dilapidated_house
                                          }
                                          onChange={(e) =>
                                            checkboxclick(
                                              "housing_envir",
                                              "dilapidated_house",
                                              e
                                            )
                                          }
                                          checked={
                                            testdata.housing_envir
                                              .dilapidated_house == 1
                                              ? true
                                              : false
                                          }
                                        />
                                        <span class="ml-3">
                                          ??????????????????????????????????????????????????????????????? ????????????
                                          ?????????????????????????????????????????????????????????????????? ???????????? ??????????????????
                                          ??????????????????????????????????????????????????????????????????{" "}
                                        </span>
                                      </label>
                                    </div>
                                  </div>
                                  <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-12"></div>

                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          type="checkbox"
                                          class="w-5 h-5 ml-3 rounded"
                                          value={
                                            testdata.housing_envir.no_toilets
                                          }
                                          onChange={(e) =>
                                            checkboxclick(
                                              "housing_envir",
                                              "no_toilets",
                                              e
                                            )
                                          }
                                          checked={
                                            testdata.housing_envir.no_toilets ==
                                            1
                                              ? true
                                              : false
                                          }
                                        />
                                        <span class="ml-3">
                                          ????????????????????????????????????????????????????????????????????????????????????????????????????????????
                                        </span>
                                      </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          type="checkbox"
                                          class="w-5 h-5 ml-3 rounded"
                                          value={testdata.housing_envir.other}
                                          onChange={(e) =>
                                            checkboxclick(
                                              "housing_envir",
                                              "other",
                                              e
                                            )
                                          }
                                          checked={
                                            testdata.housing_envir.other == 1
                                              ? true
                                              : false
                                          }
                                        />
                                        <span class="ml-3">???????????? ???</span>
                                        <input
                                          className="ml-2 py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-2/6"
                                          type="text"
                                          value={testdata.housing_envir_other}
                                          onChange={(e) =>
                                            modalhandleChange(
                                              "housing_envir_other",
                                              e
                                            )
                                          }
                                        />
                                      </label>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex flex-col mb-4">
                                  <div className="flex flex-row pl-2 mt-5">
                                    <label
                                      className="ml-2 mb-2 pl-1 font-bold text-xl text-gray-900  w-12"
                                      htmlFor="first_name"
                                    ></label>
                                    <label
                                      className="ml-2 mb-2 pl-1 font-bold text-xl text-gray-900  w-full"
                                      htmlFor="first_name"
                                    >
                                      ????????????????????????????????????????????????????????? (??????????????????????????????????????? 1 ?????????)
                                    </label>
                                  </div>
                                  <div className="flex flex-row pl-2 mt-5">
                                    <label
                                      className=" mb-2 pl-1 font-bold text-xl text-gray-900  w-1/12"
                                      htmlFor="first_name"
                                    ></label>
                                    <label
                                      className="ml-3 mb-2 pl-1 text-lg text-gray-900  w-1/4"
                                      htmlFor="first_name"
                                    >
                                      ???????????????????????????????????????
                                    </label>
                                  </div>
                                  <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-12"></div>

                                    <div class="mt-2 flex justify-center form-check form-check-inline">
                                      <label class="inline-flex items-center">
                                        <input
                                          class="w-5 h-5 ml-3 rounded"
                                          id="motorcycle-1"
                                          type="radio"
                                          value="1"
                                          name="motorcycle"
                                          onChange={(e) =>
                                            onclick("motorcycle", e)
                                          }
                                          // checked={
                                          //   testdata.fm_vehicle.moto == 1
                                          //     ? true
                                          //     : false
                                          // }
                                        />
                                        <span class="ml-3" for="motorcycle">
                                          ??????
                                        </span>
                                      </label>
                                    </div>
                                    <div class="mt-2 flex justify-center form-check form-check-inline">
                                      <label class="inline-flex items-center ">
                                        <input
                                          class="w-5 h-5 ml-3 rounded"
                                          id="motorcycle-2"
                                          type="radio"
                                          value="2"
                                          name="motorcycle"
                                          onChange={(e) =>
                                            onclick("motorcycle", e)
                                          }
                                          // checked={
                                          //   testdata.fm_vehicle.moto == 2
                                          //     ? true
                                          //     : false
                                          // }
                                        />
                                        <span class="ml-3 " for="motorcycle-2">
                                          ???????????????
                                        </span>
                                      </label>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex flex-col mb-4">
                                  <div className="flex flex-row pl-2 mt-5">
                                    <label
                                      className=" mb-2 pl-1 font-bold text-xl text-gray-900  w-1/12"
                                      htmlFor="first_name"
                                    ></label>
                                    <label
                                      className="ml-3 mb-2 pl-1 text-lg text-gray-900  w-1/4"
                                      htmlFor="first_name"
                                    >
                                      ????????????????????????????????????????????????
                                    </label>
                                  </div>
                                  <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-12"></div>

                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          class="w-5 h-5 ml-3 rounded"
                                          id="car-1"
                                          type="radio"
                                          value="1"
                                          name="car"
                                          onChange={(e) => onclick("car", e)}
                                          // checked={
                                          //   testdata.fm_vehicle.car == 1
                                          //     ? true
                                          //     : false
                                          // }
                                        />
                                        <span class="ml-3" for="car-1">
                                          ??????
                                        </span>
                                      </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          class="w-5 h-5 ml-3 rounded"
                                          id="car-2"
                                          type="radio"
                                          value="2"
                                          name="car"
                                          onChange={(e) => onclick("car", e)}
                                          // checked={
                                          //   testdata.fm_vehicle.car == 2
                                          //     ? true
                                          //     : false
                                          // }
                                        />
                                        <span class="ml-3" for="car-2">
                                          ???????????????
                                        </span>
                                      </label>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex flex-col mb-4">
                                  <div className="flex flex-row pl-2 mt-5">
                                    <label
                                      className=" mb-2 pl-1 font-bold text-xl text-gray-900  w-1/12"
                                      htmlFor="first_name"
                                    ></label>
                                    <label
                                      className="ml-3 mb-2 pl-1 text-lg text-gray-900  w-1/4"
                                      htmlFor="first_name"
                                    >
                                      ????????????????????????????????????/???????????????
                                    </label>
                                  </div>
                                  <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-12"></div>

                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          class="w-5 h-5 ml-3 rounded"
                                          id="truck-1"
                                          type="radio"
                                          value="1"
                                          name="truck"
                                          onChange={(e) => onclick("truck", e)}
                                          // checked={
                                          //   testdata.fm_vehicle.truck == 1
                                          //     ? true
                                          //     : false
                                          // }
                                        />
                                        <span class="ml-3" for="truck-1">
                                          ??????
                                        </span>
                                      </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          class="w-5 h-5 ml-3 rounded"
                                          id="truck-2"
                                          type="radio"
                                          value="2"
                                          name="truck"
                                          onChange={(e) => onclick("truck", e)}
                                          // checked={
                                          //   testdata.fm_vehicle.truck == 2
                                          //     ? true
                                          //     : false
                                          // }
                                        />
                                        <span class="ml-3" for="truck-2">
                                          ???????????????
                                        </span>
                                      </label>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex flex-col mb-4">
                                  <div className="flex flex-row pl-2 mt-5">
                                    <label
                                      className=" mb-2 pl-1 font-bold text-xl text-gray-900  w-1/12"
                                      htmlFor="first_name"
                                    ></label>
                                    <label
                                      className="ml-3 mb-2 pl-1 text-lg text-gray-900  w-full"
                                      htmlFor="first_name"
                                    >
                                      ????????????/??????????????????????????????/????????????????????????/?????????????????????
                                      ??????????????????????????????????????????
                                    </label>
                                  </div>
                                  <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-12"></div>

                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          class="w-5 h-5 ml-3 rounded"
                                          id="othertruck-1"
                                          type="radio"
                                          value="1"
                                          name="othertruck"
                                          onChange={(e) =>
                                            onclick("othertruck", e)
                                          }
                                          // checked={
                                          //   testdata.fm_vehicle.othertruck == 1
                                          //     ? true
                                          //     : false
                                          // }
                                        />
                                        <span class="ml-3" for="othertruck-1">
                                          ??????
                                        </span>
                                      </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          class="w-5 h-5 ml-3 rounded"
                                          id="othertruck-2"
                                          type="radio"
                                          value="2"
                                          name="othertruck"
                                          onChange={(e) =>
                                            onclick("othertruck", e)
                                          }
                                          // checked={
                                          //   testdata.fm_vehicle.othertruck == 2
                                          //     ? true
                                          //     : false
                                          // }
                                        />
                                        <span class="ml-3" for="othertruck-2">
                                          ???????????????
                                        </span>
                                      </label>
                                    </div>
                                  </div>
                                </div>

                                <div className="flex flex-col mb-4">
                                  <div className="flex flex-row pl-2 mt-5">
                                    <label
                                      className="ml-2 mb-2 pl-1 font-bold text-xl text-gray-900  w-12"
                                      htmlFor="first_name"
                                    ></label>
                                    <label
                                      className="ml-2 mb-2 pl-1 font-bold text-xl text-gray-900  w-full"
                                      htmlFor="first_name"
                                    >
                                      ????????????????????????????????? ??????????????????????????????????????? (?????????????????????)
                                    </label>
                                  </div>
                                  <div className="flex flex-row pl-2 mt-5">
                                    <label
                                      className=" mb-2 pl-1 font-bold text-xl text-gray-900  w-1/12"
                                      htmlFor="first_name"
                                    ></label>
                                    <label
                                      className="ml-3 mb-2 pl-1 text-lg text-gray-900  w-1/4"
                                      htmlFor="first_name"
                                    >
                                      ???????????????????????????????????????
                                    </label>
                                  </div>
                                  <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-12"></div>

                                    <div class="mt-2 flex justify-left w-1/6">
                                      <label class="inline-flex items-center">
                                        <input
                                          class="w-5 h-5 ml-3 rounded"
                                          id="farm_land-1"
                                          type="radio"
                                          value="1"
                                          name="farm_land"
                                          onChange={(e) =>
                                            onclick("farm_land", e)
                                          }
                                          // checked={
                                          //   testdata.farm_land == 1
                                          //     ? true
                                          //     : false
                                          // }
                                        />

                                        <span class="ml-3" for="farm_land-1">
                                          ????????????????????? 1 ?????????
                                        </span>
                                      </label>
                                    </div>
                                    <div class="mt-2 flex justify-left w-1/3">
                                      <label class="inline-flex items-center">
                                        <input
                                          class="w-5 h-5 ml-3 rounded"
                                          id="farm_land-2"
                                          type="radio"
                                          value="2"
                                          name="farm_land"
                                          onChange={(e) =>
                                            onclick("farm_land", e)
                                          }
                                          // checked={
                                          //   testdata.farm_land == 2
                                          //     ? true
                                          //     : false
                                          // }
                                        />

                                        <span class="ml-3" for="farm_land-2">
                                          ?????????????????????????????????????????????????????????????????????
                                        </span>
                                      </label>
                                    </div>
                                  </div>
                                  <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-12"></div>

                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          class="w-5 h-5 ml-3 rounded"
                                          id="farm_land-3"
                                          type="radio"
                                          value="3"
                                          name="farm_land"
                                          onChange={(e) =>
                                            onclick("farm_land", e)
                                          }
                                          // checked={
                                          //   testdata.farm_land == 3
                                          //     ? true
                                          //     : false
                                          // }
                                        />

                                        <span
                                          class="ml-3"
                                          for="farm_land_number-3"
                                        >
                                          ????????????????????????????????? ??????????????????{" "}
                                        </span>
                                      </label>
                                    </div>
                                  </div>
                                  <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-12"></div>

                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          class="w-5 h-5 ml-3 rounded"
                                          id="farm_land-4"
                                          type="radio"
                                          value="4"
                                          name="farm_land"
                                          onChange={(e) =>
                                            onclick("farm_land", e)
                                          }
                                          // checked={
                                          //   testdata.farm_land == 4
                                          //     ? true
                                          //     : false
                                          // }
                                        />

                                        <span class="ml-3" for="farm_land-4">
                                          ??????????????????????????????{" "}
                                        </span>
                                      </label>
                                    </div>
                                  </div>
                                  <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-12"></div>
                                    <span class="ml-3 mt-3" for="farm_land-4">
                                      ????????????????????????????????????????????? ???????????? ?????????????????????????????????????????????{" "}
                                    </span>
                                    <input
                                      className="ml-2 py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-2/12"
                                      type="text"
                                      value={testdata.farm_land_number}
                                      onChange={(e) =>
                                        modalhandleChange("farm_land_number", e)
                                      }
                                    />
                                    <span class="ml-3  mt-3">????????? </span>
                                  </div>
                                </div>
                                <div className="flex flex-col mb-4">
                                  <div className="flex flex-row pl-2 mt-5">
                                    <label
                                      className="ml-2 mb-2 pl-1 font-bold text-xl text-gray-900  w-12"
                                      htmlFor="first_name"
                                    ></label>
                                    <label
                                      className="ml-2 mb-2 pl-1 font-bold text-xl text-gray-900  w-full"
                                      htmlFor="first_name"
                                    >
                                      ???????????????????????????????????????????????????????????????
                                    </label>
                                  </div>
                                  <div className="flex flex-row pl-2 mt-5">
                                    <label
                                      className=" mb-2 pl-1 font-bold text-xl text-gray-900  w-1/12"
                                      htmlFor="first_name"
                                    ></label>
                                    <label
                                      className="ml-3 mb-2 pl-1 text-lg text-gray-900  w-1/4"
                                      htmlFor="first_name"
                                    >
                                      ??????????????????
                                    </label>
                                  </div>
                                  <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-12"></div>

                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          type="checkbox"
                                          class="w-5 h-5 ml-3 rounded"
                                          value={testdata.health.unhealthy}
                                          onChange={(e) =>
                                            checkboxclick(
                                              "health",
                                              "unhealthy",
                                              e
                                            )
                                          }
                                          checked={
                                            testdata.health.unhealthy == 1
                                              ? true
                                              : false
                                          }
                                        />
                                        <span class="ml-3">
                                          ???????????????????????????????????????????????????
                                        </span>
                                      </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          type="checkbox"
                                          class="w-5 h-5 ml-3 rounded"
                                          value={
                                            testdata.health.congenital_disease
                                          }
                                          onChange={(e) =>
                                            checkboxclick(
                                              "health",
                                              "congenital_disease",
                                              e
                                            )
                                          }
                                          checked={
                                            testdata.health
                                              .congenital_disease == 1
                                              ? true
                                              : false
                                          }
                                        />
                                        <span class="ml-3">
                                          ???????????????????????????????????????????????????????????????????????????????????????
                                        </span>
                                      </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          type="checkbox"
                                          class="w-5 h-5 ml-3 rounded"
                                          value={testdata.health.malnutrition}
                                          onChange={(e) =>
                                            checkboxclick(
                                              "health",
                                              "malnutrition",
                                              e
                                            )
                                          }
                                          checked={
                                            testdata.health.malnutrition == 1
                                              ? true
                                              : false
                                          }
                                        />
                                        <span class="ml-3">
                                          ???????????????????????????????????????????????????
                                        </span>
                                      </label>
                                    </div>
                                  </div>

                                  <div class="flex flex-row  pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-12"></div>

                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          type="checkbox"
                                          class="w-5 h-5 ml-3 rounded"
                                          value={testdata.health.severe_chronic}
                                          onChange={(e) =>
                                            checkboxclick(
                                              "health",
                                              "severe_chronic",
                                              e
                                            )
                                          }
                                          checked={
                                            testdata.health.severe_chronic == 1
                                              ? true
                                              : false
                                          }
                                        />
                                        <span class="ml-3">
                                          ??????????????????????????????????????????????????????/????????????????????????
                                        </span>
                                      </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          type="checkbox"
                                          class="w-5 h-5 ml-3 rounded"
                                          value={
                                            testdata.health.low_physical_fitness
                                          }
                                          onChange={(e) =>
                                            checkboxclick(
                                              "health",
                                              "low_physical_fitness",
                                              e
                                            )
                                          }
                                          checked={
                                            testdata.health
                                              .low_physical_fitness == 1
                                              ? true
                                              : false
                                          }
                                        />
                                        <span class="ml-3">
                                          ???????????????????????????????????????????????????????????????
                                        </span>
                                      </label>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex flex-col mb-4">
                                  <div className="flex flex-row pl-2 mt-5">
                                    <label
                                      className=" mb-2 pl-1 font-bold text-xl text-gray-900  w-1/12"
                                      htmlFor="first_name"
                                    ></label>
                                    <label
                                      className="ml-3 mb-2 pl-1 text-lg text-gray-900  w-full"
                                      htmlFor="first_name"
                                    >
                                      ????????????????????????????????????????????????????????????????????????
                                    </label>
                                  </div>
                                  <div class="flex flex-row  pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-12"></div>

                                    <div class="mt-2 flex justify-left pl-50 w-1/2">
                                      <label class="inline-flex items-center ">
                                        <input
                                          type="checkbox"
                                          class="w-5 h-5 ml-3 rounded"
                                          value={
                                            testdata.welfare_safety.separated
                                          }
                                          onChange={(e) =>
                                            checkboxclick(
                                              "welfare_safety",
                                              "separated",
                                              e
                                            )
                                          }
                                          checked={
                                            testdata.welfare_safety.separated ==
                                            1
                                              ? true
                                              : false
                                          }
                                        />
                                        <span class="ml-3">
                                          ????????????????????????????????????????????? ???????????? ?????????????????????????????????
                                        </span>
                                      </label>
                                    </div>
                                    <div class="mt-2 flex justify-left w-1/2">
                                      <label class="inline-flex items-center">
                                        <input
                                          type="checkbox"
                                          class="w-5 h-5 ml-3 rounded"
                                          value={testdata.welfare_safety.gamble}
                                          onChange={(e) =>
                                            checkboxclick(
                                              "welfare_safety",
                                              "gamble",
                                              e
                                            )
                                          }
                                          checked={
                                            testdata.welfare_safety.gamble == 1
                                              ? true
                                              : false
                                          }
                                        />
                                        <span class="ml-3">?????????????????????????????????</span>
                                      </label>
                                    </div>
                                  </div>
                                  <div class="flex flex-row  pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-12"></div>

                                    <div class="mt-2 flex justify-left w-1/2 ">
                                      <label class="inline-flex items-center ">
                                        <input
                                          type="checkbox"
                                          class="w-5 h-5 ml-3 rounded "
                                          value={
                                            testdata.welfare_safety
                                              .suffering_serious
                                          }
                                          onChange={(e) =>
                                            checkboxclick(
                                              "welfare_safety",
                                              "suffering_serious",
                                              e
                                            )
                                          }
                                          checked={
                                            testdata.welfare_safety
                                              .suffering_serious == 1
                                              ? true
                                              : false
                                          }
                                        />
                                      </label>
                                      <span class="ml-3">
                                        ?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????/????????????????????????/??????????????????
                                      </span>
                                    </div>
                                    <div class="mt-2 flex justify-left w-1/2">
                                      <label class="inline-flex items-center">
                                        <input
                                          type="checkbox"
                                          class="w-5 h-5 ml-3 rounded"
                                          value={
                                            testdata.welfare_safety
                                              .addicted_to_drugs
                                          }
                                          onChange={(e) =>
                                            checkboxclick(
                                              "welfare_safety",
                                              "addicted_to_drugs",
                                              e
                                            )
                                          }
                                          checked={
                                            testdata.welfare_safety
                                              .addicted_to_drugs == 1
                                              ? true
                                              : false
                                          }
                                        />
                                        <span class="ml-3">
                                          ?????????????????????????????????????????????????????????????????????????????????
                                        </span>
                                      </label>
                                    </div>
                                  </div>
                                  <div class="flex flex-row  pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-12"></div>

                                    <div class="mt-2 flex justify-left w-1/2">
                                      <label class="inline-flex items-center">
                                        <input
                                          type="checkbox"
                                          class="w-5 h-5 ml-3 rounded"
                                          value={
                                            testdata.welfare_safety
                                              .members_gamble
                                          }
                                          onChange={(e) =>
                                            checkboxclick(
                                              "welfare_safety",
                                              "members_gamble",
                                              e
                                            )
                                          }
                                          checked={
                                            testdata.welfare_safety
                                              .members_gamble == 1
                                              ? true
                                              : false
                                          }
                                        />
                                      </label>
                                      <span class="ml-3">
                                        ??????????????????????????????????????????????????????????????????????????????
                                      </span>
                                    </div>
                                    <div class="mt-2 flex justify-left w-1/2">
                                      <label class="inline-flex items-center">
                                        <input
                                          type="checkbox"
                                          class="w-5 h-5 ml-3 rounded"
                                          value={
                                            testdata.welfare_safety
                                              .conflicts_in_family
                                          }
                                          onChange={(e) =>
                                            checkboxclick(
                                              "welfare_safety",
                                              "conflicts_in_family",
                                              e
                                            )
                                          }
                                          checked={
                                            testdata.welfare_safety
                                              .conflicts_in_family == 1
                                              ? true
                                              : false
                                          }
                                        />
                                      </label>
                                      <span class="ml-3">
                                        ???????????????????????????????????????/?????????????????????????????????????????????????????????
                                      </span>
                                    </div>
                                  </div>
                                  <div class="flex flex-row   pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-12"></div>

                                    <div class="mt-2 flex justify-left w-1/2">
                                      <label class="inline-flex items-center">
                                        <input
                                          type="checkbox"
                                          class="w-5 h-5 ml-3 rounded"
                                          value={
                                            testdata.welfare_safety.unsupervised
                                          }
                                          onChange={(e) =>
                                            checkboxclick(
                                              "welfare_safety",
                                              "unsupervised",
                                              e
                                            )
                                          }
                                          checked={
                                            testdata.welfare_safety
                                              .unsupervised == 1
                                              ? true
                                              : false
                                          }
                                        />
                                        <span class="ml-3">???????????????????????????????????? </span>
                                      </label>
                                    </div>
                                    <div class="mt-2 flex justify-left w-1/2">
                                      <label class="inline-flex items-center">
                                        <input
                                          type="checkbox"
                                          class="w-5 h-5 ml-3 rounded"
                                          value={
                                            testdata.welfare_safety
                                              .domestic_violence
                                          }
                                          onChange={(e) =>
                                            checkboxclick(
                                              "welfare_safety",
                                              "domestic_violence",
                                              e
                                            )
                                          }
                                          checked={
                                            testdata.welfare_safety
                                              .domestic_violence == 1
                                              ? true
                                              : false
                                          }
                                        />
                                      </label>
                                      <span class="ml-3">
                                        ??????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
                                      </span>
                                    </div>
                                  </div>
                                  <div class="flex flex-row   pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-12"></div>

                                    <div class="mt-2 flex justify-left w-1/2">
                                      <label class="inline-flex items-center">
                                        <input
                                          type="checkbox"
                                          class="w-5 h-5 ml-3 rounded"
                                          value={
                                            testdata.welfare_safety
                                              .harmed_by_family
                                          }
                                          onChange={(e) =>
                                            checkboxclick(
                                              "welfare_safety",
                                              "harmed_by_family",
                                              e
                                            )
                                          }
                                          checked={
                                            testdata.welfare_safety
                                              .harmed_by_family == 1
                                              ? true
                                              : false
                                          }
                                        />
                                      </label>
                                      <span class="ml-3">
                                        ????????????????????????/????????????????????????????????????????????????????????????????????????/??????????????????????????????
                                      </span>
                                    </div>
                                    <div class="mt-2 flex justify-left w-1/2">
                                      <label class="inline-flex items-center">
                                        <input
                                          type="checkbox"
                                          class="w-5 h-5 ml-3 rounded"
                                          value={
                                            testdata.welfare_safety
                                              .sexually_harassed
                                          }
                                          onChange={(e) =>
                                            checkboxclick(
                                              "welfare_safety",
                                              "sexually_harassed",
                                              e
                                            )
                                          }
                                          checked={
                                            testdata.welfare_safety
                                              .sexually_harassed == 1
                                              ? true
                                              : false
                                          }
                                        />
                                      </label>
                                      <span class="ml-3">
                                        ?????????????????????????????????????????????????????????
                                      </span>
                                    </div>
                                  </div>
                                  <div class="flex flex-row  pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-12"></div>

                                    <div class="mt-2 flex justify-left w-1/2">
                                      <label class="inline-flex items-center">
                                        <input
                                          type="checkbox"
                                          class="w-5 h-5 ml-3 rounded"
                                          value={
                                            testdata.welfare_safety
                                              .residing_in_a_slum
                                          }
                                          onChange={(e) =>
                                            checkboxclick(
                                              "welfare_safety",
                                              "residing_in_a_slum",
                                              e
                                            )
                                          }
                                          checked={
                                            testdata.welfare_safety
                                              .residing_in_a_slum == 1
                                              ? true
                                              : false
                                          }
                                        />
                                      </label>
                                      <span class="ml-3">
                                        ????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????/????????????????????????????????????
                                      </span>
                                    </div>
                                    <div class="mt-2 flex justify-left w-1/2">
                                      <span class="ml-3"></span>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex flex-col mb-4">
                                  <div className="flex flex-row mt-5 ">
                                    <label
                                      className="ml-2 mb-2 pl-1 font-bold text-xl text-gray-900  w-12"
                                      htmlFor="first_name"
                                    ></label>
                                    <label
                                      className="ml-2 mb-2 pl-1 font-bold text-xl text-gray-900  w-full"
                                      htmlFor="first_name"
                                    >
                                      ????????????????????????????????????????????????????????????????????????????????????
                                    </label>
                                  </div>

                                  <div className="flex flex-row w-full  mt-3">
                                    <label
                                      className="ml-2 mb-2 pl-1 font-bold text-lg text-gray-900  w-12"
                                      htmlFor="first_name"
                                    ></label>
                                    <label
                                      className="ml-2 mb-2 pl-1 text-lg text-gray-900  w-1/4"
                                      htmlFor="first_name"
                                    >
                                      ????????????????????????????????????????????????????????????????????????????????????
                                    </label>

                                    <label
                                      className="ml-3 mb-2 pl-1 text-lg text-gray-900  w-1/4"
                                      htmlFor="first_name"
                                    >
                                      ?????????????????????????????????????????? (??????)
                                    </label>
                                    <label
                                      className="ml-3 mb-2 pl-1 text-lg text-gray-900  w-1/4"
                                      htmlFor="first_name"
                                    >
                                      ????????????
                                    </label>
                                  </div>
                                  <div className="flex flex-row mb-4">
                                    <label
                                      className="ml-2 mb-2 pl-1 font-bold text-lg text-gray-900  w-12"
                                      htmlFor="first_name"
                                    ></label>

                                    <input
                                      className="ml-2 py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-1/4"
                                      type="text"
                                      value={testdata.distance_school_km}
                                      onChange={(e) =>
                                        modalhandleChange(
                                          "distance_school_km",
                                          e
                                        )
                                      }
                                    />
                                    <input
                                      className="ml-3 py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-1/4"
                                      type="text"
                                      value={testdata.distance_school_hr}
                                      onChange={(e) =>
                                        modalhandleChange(
                                          "distance_school_hr",
                                          e
                                        )
                                      }
                                    />
                                    <input
                                      className="ml-3 py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-1/4"
                                      type="text"
                                      value={testdata.distance_school_min}
                                      onChange={(e) =>
                                        modalhandleChange(
                                          "distance_school_min",
                                          e
                                        )
                                      }
                                    />
                                  </div>
                                </div>
                                <div className="flex flex-col mb-4">
                                  <div className="flex flex-row pl-2 mt-5">
                                    <label
                                      className="ml-2 mb-2 pl-1 font-bold text-xl text-gray-900  w-12"
                                      htmlFor="first_name"
                                    ></label>
                                    <label
                                      className="ml-2 mb-2 pl-1 font-bold text-xl text-gray-900  w-full"
                                      htmlFor="first_name"
                                    >
                                      ?????????????????????????????????????????????????????????????????????????????????????????????
                                    </label>
                                  </div>
                                  <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-12"></div>

                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          class="w-5 h-5 ml-3 rounded"
                                          id="journey-1"
                                          type="radio"
                                          value="1"
                                          name="journey"
                                          onChange={(e) =>
                                            onclick("journey", e)
                                          }
                                          // checked={
                                          //   testdata.journey == 1 ? true : false
                                          // }
                                        />
                                        <span class="ml-3" for="journey-1">
                                          ??????????????????????????????????????????
                                        </span>
                                      </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          class="w-5 h-5 ml-3 rounded"
                                          id="journey-2"
                                          type="radio"
                                          value="2"
                                          name="journey"
                                          onChange={(e) =>
                                            onclick("journey", e)
                                          }
                                          // checked={
                                          //   testdata.journey == 2 ? true : false
                                          // }
                                        />
                                        <span class="ml-3" for="journey-2">
                                          ??????????????????????????????
                                        </span>
                                      </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          class="w-5 h-5 ml-3 rounded"
                                          id="journey-3"
                                          type="radio"
                                          value="3"
                                          name="journey"
                                          onChange={(e) =>
                                            onclick("journey", e)
                                          }
                                          // checked={
                                          //   testdata.journey == 3 ? true : false
                                          // }
                                        />
                                        <span class="ml-3" for="journey-3">
                                          ??????????????????????????????????????????
                                        </span>
                                      </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          class="w-5 h-5 ml-3 rounded"
                                          id="journey-4"
                                          type="radio"
                                          value="4"
                                          name="journey"
                                          onChange={(e) =>
                                            onclick("journey", e)
                                          }
                                          // checked={
                                          //   testdata.journey == 4 ? true : false
                                          // }
                                        />
                                        <span class="ml-3" for="journey-4">
                                          ??????????????????????????????
                                        </span>
                                      </label>
                                    </div>
                                  </div>

                                  <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-12"></div>

                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          class="w-5 h-5 ml-3 rounded"
                                          id="journey-5"
                                          type="radio"
                                          value="5"
                                          name="journey"
                                          onChange={(e) =>
                                            onclick("journey", e)
                                          }
                                          // checked={
                                          //   testdata.journey == 5 ? true : false
                                          // }
                                        />
                                        <span class="ml-3" for="journey-5">
                                          ?????????????????????
                                        </span>
                                      </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          class="w-5 h-5 ml-3 rounded"
                                          id="journey-6"
                                          type="radio"
                                          value="6"
                                          name="journey"
                                          onChange={(e) =>
                                            onclick("journey", e)
                                          }
                                          // checked={
                                          //   testdata.journey == 6 ? true : false
                                          // }
                                        />
                                        <span class="ml-3" for="journey-6">
                                          ?????????????????????
                                        </span>
                                      </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          class="w-5 h-5 ml-3 rounded"
                                          id="journey-7"
                                          type="radio"
                                          value="7"
                                          name="journey"
                                          onChange={(e) =>
                                            onclick("journey", e)
                                          }
                                          // checked={
                                          //   testdata.journey == 7 ? true : false
                                          // }
                                        />
                                        <span class="ml-3" for="journey-7">
                                          ????????????
                                        </span>
                                      </label>
                                    </div>
                                  </div>
                                  <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-12"></div>
                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          class="w-5 h-5 ml-3 rounded"
                                          id="journey-8"
                                          type="radio"
                                          value="8"
                                          name="journey"
                                          onChange={(e) =>
                                            onclick("journey", e)
                                          }
                                          // checked={
                                          //   testdata.journey == 8 ? true : false
                                          // }
                                        />
                                        <span class="ml-3" for="journey-8">
                                          ???????????????
                                        </span>
                                        <input
                                          className="ml-3 py-1 px-1 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-1/2"
                                          type="text"
                                          value={testdata.journey_other}
                                          onChange={(e) =>
                                            modalhandleChange(
                                              "journey_other",
                                              e
                                            )
                                          }
                                        />
                                      </label>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex flex-col mb-4">
                                  <div className="flex flex-row pl-2 mt-5">
                                    <label
                                      className="ml-2 mb-2 pl-1 font-bold text-xl text-gray-900  w-12"
                                      htmlFor="first_name"
                                    ></label>
                                    <label
                                      className="ml-2 mb-2 pl-1 font-bold text-xl text-gray-900  w-full "
                                      htmlFor="first_name"
                                    >
                                      ?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
                                    </label>
                                  </div>
                                  <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-12"></div>

                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          type="checkbox"
                                          class="w-5 h-5 ml-3 rounded"
                                          value={
                                            testdata.work_responsibility
                                              .housework
                                          }
                                          onChange={(e) =>
                                            checkboxclick(
                                              "work_responsibility",
                                              "housework",
                                              e
                                            )
                                          }
                                          checked={
                                            testdata.work_responsibility
                                              .housework == 1
                                              ? true
                                              : false
                                          }
                                        />
                                        <span class="ml-3">????????????????????????????????? </span>
                                      </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          type="checkbox"
                                          class="w-5 h-5 ml-3 rounded"
                                          value={
                                            testdata.work_responsibility
                                              .care_disabled
                                          }
                                          onChange={(e) =>
                                            checkboxclick(
                                              "work_responsibility",
                                              "care_disabled",
                                              e
                                            )
                                          }
                                          checked={
                                            testdata.work_responsibility
                                              .care_disabled == 1
                                              ? true
                                              : false
                                          }
                                        />
                                        <span class="ml-3">
                                          ????????????????????????????????????????????????????????????/???????????????
                                        </span>
                                      </label>
                                    </div>
                                  </div>
                                  <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-12"></div>

                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          type="checkbox"
                                          class="w-5 h-5 ml-3 rounded"
                                          value={
                                            testdata.work_responsibility.trade
                                          }
                                          onChange={(e) =>
                                            checkboxclick(
                                              "work_responsibility",
                                              "trade",
                                              e
                                            )
                                          }
                                          checked={
                                            testdata.work_responsibility
                                              .trade == 1
                                              ? true
                                              : false
                                          }
                                        />
                                        <span class="ml-3">
                                          ????????????????????????????????????????????????????????????{" "}
                                        </span>
                                      </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          type="checkbox"
                                          class="w-5 h-5 ml-3 rounded"
                                          value={
                                            testdata.work_responsibility
                                              .extra_work
                                          }
                                          onChange={(e) =>
                                            checkboxclick(
                                              "work_responsibility",
                                              "extra_work",
                                              e
                                            )
                                          }
                                          checked={
                                            testdata.work_responsibility
                                              .extra_work == 1
                                              ? true
                                              : false
                                          }
                                        />
                                        <span class="ml-3">
                                          ???????????????????????????????????????????????????{" "}
                                        </span>
                                      </label>
                                    </div>
                                  </div>
                                  <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-12"></div>
                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          type="checkbox"
                                          class="w-5 h-5 ml-3 rounded"
                                          value={
                                            testdata.work_responsibility.farm
                                          }
                                          onChange={(e) =>
                                            checkboxclick(
                                              "work_responsibility",
                                              "farm",
                                              e
                                            )
                                          }
                                          checked={
                                            testdata.work_responsibility.farm ==
                                            1
                                              ? true
                                              : false
                                          }
                                        />
                                        <span class="ml-3">
                                          ??????????????????????????????????????????{" "}
                                        </span>
                                      </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          type="checkbox"
                                          class="w-5 h-5 ml-3 rounded"
                                          value={
                                            testdata.work_responsibility.other
                                          }
                                          onChange={(e) =>
                                            checkboxclick(
                                              "work_responsibility",
                                              "other",
                                              e
                                            )
                                          }
                                          checked={
                                            testdata.work_responsibility
                                              .other == 1
                                              ? true
                                              : false
                                          }
                                        />
                                        <span class="ml-3">???????????????</span>
                                        <input
                                          className="ml-3 py-1 px-1 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-1/2"
                                          type="text"
                                          value={
                                            testdata.work_responsibility_other
                                          }
                                          onChange={(e) =>
                                            modalhandleChange(
                                              "work_responsibility_other",
                                              e
                                            )
                                          }
                                        />
                                      </label>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex flex-col mb-4">
                                  <div className="flex flex-row pl-2 mt-5">
                                    <label
                                      className="ml-2 mb-2 pl-1 font-bold text-xl text-gray-900  w-12"
                                      htmlFor="first_name"
                                    ></label>
                                    <label
                                      className="ml-2 mb-2 pl-1 font-bold text-xl text-gray-900  w-full"
                                      htmlFor="first_name"
                                    >
                                      ?????????????????????????????????????????????????????????????????????????????????
                                    </label>
                                  </div>
                                  <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-12"></div>

                                    <div class="mt-2 flex justify-center ">
                                      <label class="inline-flex items-center ">
                                        <input
                                          type="checkbox"
                                          class="w-5 h-5 ml-3 rounded"
                                          value={testdata.hobbies.TV}
                                          onChange={(e) =>
                                            checkboxclick("hobbies", "TV", e)
                                          }
                                          checked={
                                            testdata.hobbies.TV == 1
                                              ? true
                                              : false
                                          }
                                        />
                                        <span class="ml-3">
                                          ?????????????????? / ?????????????????????
                                        </span>
                                      </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          type="checkbox"
                                          class="w-5 h-5 ml-3 rounded"
                                          value={testdata.hobbies.go_to_mall}
                                          onChange={(e) =>
                                            checkboxclick(
                                              "hobbies",
                                              "go_to_mall",
                                              e
                                            )
                                          }
                                          checked={
                                            testdata.hobbies.go_to_mall == 1
                                              ? true
                                              : false
                                          }
                                        />
                                        <span class="ml-3">
                                          ???????????????????????????????????? / ??????????????????{" "}
                                        </span>
                                      </label>
                                    </div>
                                  </div>
                                  <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-12"></div>

                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          type="checkbox"
                                          class="w-5 h-5 ml-3 rounded"
                                          value={testdata.hobbies.reading}
                                          onChange={(e) =>
                                            checkboxclick(
                                              "hobbies",
                                              "reading",
                                              e
                                            )
                                          }
                                          checked={
                                            testdata.hobbies.reading == 1
                                              ? true
                                              : false
                                          }
                                        />
                                        <span class="ml-3">????????????????????????????????? </span>
                                      </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          type="checkbox"
                                          class="w-5 h-5 ml-3 rounded"
                                          value={testdata.hobbies.friend}
                                          onChange={(e) =>
                                            checkboxclick(
                                              "hobbies",
                                              "friend",
                                              e
                                            )
                                          }
                                          checked={
                                            testdata.hobbies.friend == 1
                                              ? true
                                              : false
                                          }
                                        />
                                        <span class="ml-3">
                                          ?????????????????????????????? / ??????????????????{" "}
                                        </span>
                                      </label>
                                    </div>
                                  </div>
                                  <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-12"></div>

                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          type="checkbox"
                                          class="w-5 h-5 ml-3 rounded"
                                          value={testdata.hobbies.vsco}
                                          onChange={(e) =>
                                            checkboxclick("hobbies", "vsco", e)
                                          }
                                          checked={
                                            testdata.hobbies.vsco == 1
                                              ? true
                                              : false
                                          }
                                        />
                                        <span class="ml-3">????????????/???????????????</span>
                                      </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          type="checkbox"
                                          class="w-5 h-5 ml-3 rounded"
                                          value={testdata.hobbies.game}
                                          onChange={(e) =>
                                            checkboxclick("hobbies", "game", e)
                                          }
                                          checked={
                                            testdata.hobbies.game == 1
                                              ? true
                                              : false
                                          }
                                        />
                                        <span class="ml-3">
                                          ????????????????????? ?????????/??????????????????
                                        </span>
                                      </label>
                                    </div>
                                  </div>
                                  <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-12"></div>

                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          type="checkbox"
                                          class="w-5 h-5 ml-3 rounded"
                                          value={testdata.hobbies.park}
                                          onChange={(e) =>
                                            checkboxclick("hobbies", "park", e)
                                          }
                                          checked={
                                            testdata.hobbies.park == 1
                                              ? true
                                              : false
                                          }
                                        />
                                        <span class="ml-3">???????????????????????????????????? </span>
                                      </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          type="checkbox"
                                          class="w-5 h-5 ml-3 rounded"
                                          value={testdata.hobbies.play_music}
                                          onChange={(e) =>
                                            checkboxclick(
                                              "hobbies",
                                              "play_music",
                                              e
                                            )
                                          }
                                          checked={
                                            testdata.hobbies.play_music == 1
                                              ? true
                                              : false
                                          }
                                        />
                                        <span class="ml-3">???????????????????????????</span>
                                      </label>
                                    </div>
                                  </div>
                                  <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-12"></div>

                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          type="checkbox"
                                          class="w-5 h-5 ml-3 rounded"
                                          value={testdata.hobbies.other}
                                          onChange={(e) =>
                                            checkboxclick("hobbies", "other", e)
                                          }
                                          checked={
                                            testdata.hobbies.other == 1
                                              ? true
                                              : false
                                          }
                                        />
                                        <span class="ml-3">???????????????</span>
                                        <input
                                          className="ml-3 py-1 px-1 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-1/2"
                                          type="text"
                                          onChange={(e) =>
                                            modalhandleChange(
                                              "hobbies_other",
                                              e
                                            )
                                          }
                                        />
                                      </label>
                                    </div>
                                  </div>
                                </div>

                                <div className="flex flex-col mb-4">
                                  <div className="flex flex-row pl-2 mt-5">
                                    <label
                                      className="ml-2 mb-2 pl-1 font-bold text-xl text-gray-900  w-12"
                                      htmlFor="first_name"
                                    ></label>
                                    <label
                                      className="ml-2 mb-2 pl-1 font-bold text-xl text-gray-900  w-full"
                                      htmlFor="first_name"
                                    >
                                      ?????????????????????????????????????????????????????????????????????
                                    </label>
                                  </div>
                                  <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-12"></div>

                                    <div class="mt-2 flex justify-left w-1/3">
                                      <label class="inline-flex items-center">
                                        <input
                                          type="checkbox"
                                          class="w-5 h-5 ml-3 rounded"
                                          value={
                                            testdata.substance_abuse
                                              .friends_uses_drugs
                                          }
                                          onChange={(e) =>
                                            checkboxclick(
                                              "substance_abuse",
                                              "friends_uses_drugs",
                                              e
                                            )
                                          }
                                          checked={
                                            testdata.substance_abuse
                                              .friends_uses_drugs == 1
                                              ? true
                                              : false
                                          }
                                        />
                                      </label>
                                      <span class="ml-3">
                                        ??????????????????????????????????????????????????????????????????????????????????????????
                                      </span>
                                    </div>
                                    <div class="mt-2 flex justify-left w-1/3">
                                      <label class="inline-flex items-center">
                                        <input
                                          type="checkbox"
                                          class="w-5 h-5 ml-3 rounded "
                                          value={
                                            testdata.substance_abuse
                                              .family_uses_drugs
                                          }
                                          onChange={(e) =>
                                            checkboxclick(
                                              "substance_abuse",
                                              "family_uses_drugs",
                                              e
                                            )
                                          }
                                          checked={
                                            testdata.substance_abuse
                                              .family_uses_drugs == 1
                                              ? true
                                              : false
                                          }
                                        />
                                      </label>
                                      <span class="ml-3">
                                        ???????????????????????????????????????????????????????????????????????????????????????????????????????????????
                                      </span>
                                    </div>
                                    <div class="mt-2 flex justify-left w-1/3">
                                      <label class="inline-flex items-center">
                                        <input
                                          type="checkbox"
                                          class="w-5 h-5 ml-3 rounded"
                                          value={
                                            testdata.substance_abuse
                                              .drug_use_environment
                                          }
                                          onChange={(e) =>
                                            checkboxclick(
                                              "substance_abuse",
                                              "drug_use_environment",
                                              e
                                            )
                                          }
                                          checked={
                                            testdata.substance_abuse
                                              .drug_use_environment == 1
                                              ? true
                                              : false
                                          }
                                        />
                                      </label>
                                      <span class="ml-3">
                                        ????????????????????????????????????????????????????????????????????????????????????????????????
                                      </span>
                                    </div>
                                  </div>
                                  <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-12"></div>

                                    <div class="mt-2 flex justify-left w-1/3">
                                      <label class="inline-flex items-center">
                                        <input
                                          type="checkbox"
                                          class="w-5 h-5 ml-3 rounded "
                                          value={
                                            testdata.substance_abuse
                                              .dealing_with_drugs
                                          }
                                          onChange={(e) =>
                                            checkboxclick(
                                              "substance_abuse",
                                              "dealing_with_drugs",
                                              e
                                            )
                                          }
                                          checked={
                                            testdata.substance_abuse
                                              .dealing_with_drugs == 1
                                              ? true
                                              : false
                                          }
                                        />
                                      </label>
                                      <span class="ml-3">
                                        ??????????????????????????????????????????????????????????????????????????????????????????{" "}
                                      </span>
                                    </div>
                                    <div class="mt-2 flex justify-left w-1/3">
                                      <label class="inline-flex items-center">
                                        <input
                                          type="checkbox"
                                          class="w-5 h-5 ml-3 rounded "
                                          value={
                                            testdata.substance_abuse.smoking
                                          }
                                          onChange={(e) =>
                                            checkboxclick(
                                              "substance_abuse",
                                              "smoking",
                                              e
                                            )
                                          }
                                          checked={
                                            testdata.substance_abuse.smoking ==
                                            1
                                              ? true
                                              : false
                                          }
                                        />
                                      </label>
                                      <span class="ml-3">
                                        ???????????????????????????????????????????????? ????????????
                                        ????????????????????????????????????????????????????????????????????????
                                      </span>
                                    </div>
                                    <div class="mt-2 flex justify-left w-1/3">
                                      <span class="ml-3"></span>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex flex-col mb-4">
                                  <div className="flex flex-row pl-2 mt-5">
                                    <label
                                      className="ml-2 mb-2 pl-1 font-bold text-xl text-gray-900  w-12"
                                      htmlFor="first_name"
                                    ></label>
                                    <label
                                      className="ml-2 mb-2 pl-1 font-bold text-xl text-gray-900  w-full"
                                      htmlFor="first_name"
                                    >
                                      ????????????????????????????????????????????????????????????????????????
                                    </label>
                                  </div>
                                  <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-12"></div>

                                    <div class="mt-2 flex justify-left w-1/3">
                                      <label class="inline-flex items-center">
                                        <input
                                          type="checkbox"
                                          class="w-5 h-5 ml-3 rounded"
                                          value={testdata.violent.quarrel}
                                          onChange={(e) =>
                                            checkboxclick(
                                              "violent",
                                              "quarrel",
                                              e
                                            )
                                          }
                                          checked={
                                            testdata.violent.quarrel == 1
                                              ? true
                                              : false
                                          }
                                        />
                                      </label>
                                      <span class="ml-3">
                                        ????????????????????????????????????????????????{" "}
                                      </span>
                                    </div>
                                    <div class="mt-2 flex justify-left w-1/3">
                                      <label class="inline-flex items-center">
                                        <input
                                          type="checkbox"
                                          class="w-5 h-5 ml-3 rounded"
                                          value={testdata.violent.Aggressive}
                                          onChange={(e) =>
                                            checkboxclick(
                                              "violent",
                                              "Aggressive",
                                              e
                                            )
                                          }
                                          checked={
                                            testdata.violent.Aggressive == 1
                                              ? true
                                              : false
                                          }
                                        />
                                      </label>
                                      <span class="ml-3">???????????????????????? ????????????</span>
                                    </div>
                                    <div class="mt-2 flex justify-left w-1/3">
                                      <label class="inline-flex items-center">
                                        <input
                                          type="checkbox"
                                          class="w-5 h-5 ml-3 rounded"
                                          value={
                                            testdata.violent.frequent_quarrels
                                          }
                                          onChange={(e) =>
                                            checkboxclick(
                                              "violent",
                                              "frequent_quarrels",
                                              e
                                            )
                                          }
                                          checked={
                                            testdata.violent
                                              .frequent_quarrels == 1
                                              ? true
                                              : false
                                          }
                                        />
                                      </label>
                                      <span class="ml-3">
                                        ????????????????????????????????????????????????????????????
                                      </span>
                                    </div>
                                  </div>
                                  <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-12"></div>

                                    <div class="mt-2 flex justify-left w-1/3">
                                      <label class="inline-flex items-center">
                                        <input
                                          type="checkbox"
                                          class="w-5 h-5 ml-3 rounded"
                                          value={
                                            testdata.violent.injure_another
                                          }
                                          onChange={(e) =>
                                            checkboxclick(
                                              "violent",
                                              "injure_another",
                                              e
                                            )
                                          }
                                          checked={
                                            testdata.violent.injure_another == 1
                                              ? true
                                              : false
                                          }
                                        />
                                      </label>
                                      <span class="ml-3">
                                        ????????????????????????????????????????????????????????????{" "}
                                      </span>
                                    </div>
                                    <div class="mt-2 flex justify-left w-1/3">
                                      <label class="inline-flex items-center">
                                        <input
                                          type="checkbox"
                                          class="w-5 h-5 ml-3 rounded"
                                          value={
                                            testdata.violent.injure_yourself
                                          }
                                          onChange={(e) =>
                                            checkboxclick(
                                              "violent",
                                              "injure_yourself",
                                              e
                                            )
                                          }
                                          checked={
                                            testdata.violent.injure_yourself ==
                                            1
                                              ? true
                                              : false
                                          }
                                        />
                                      </label>
                                      <span class="ml-3">
                                        ????????????????????????????????????????????????????????????{" "}
                                      </span>
                                    </div>
                                    <div class="mt-2 flex justify-left w-1/3">
                                      <label class="inline-flex items-center">
                                        <input
                                          type="checkbox"
                                          class="w-5 h-5 ml-3 rounded"
                                          value={testdata.violent.other}
                                          onChange={(e) =>
                                            checkboxclick("violent", "other", e)
                                          }
                                          checked={
                                            testdata.violent.other == 1
                                              ? true
                                              : false
                                          }
                                        />
                                        <span class="ml-3">???????????????</span>
                                        <input
                                          className="ml-3 py-1 px-1 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-1/2"
                                          type="text"
                                          value={testdata.violent_other}
                                          onChange={(e) =>
                                            modalhandleChange(
                                              "violent_other",
                                              e
                                            )
                                          }
                                        />
                                      </label>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex flex-col mb-4">
                                  <div className="flex flex-row pl-2 mt-5">
                                    <label
                                      className="ml-2 mb-2 pl-1 font-bold text-xl text-gray-900  w-12"
                                      htmlFor="first_name"
                                    ></label>
                                    <label
                                      className="ml-2 mb-2 pl-1 font-bold text-xl text-gray-900  w-full"
                                      htmlFor="first_name"
                                    >
                                      ??????????????????????????????????????????
                                    </label>
                                  </div>
                                  <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-12"></div>

                                    <div class="mt-2 flex justify-left w-1/3">
                                      <label class="inline-flex items-center">
                                        <input
                                          type="checkbox"
                                          class="w-5 h-5 ml-3 rounded "
                                          value={testdata.sexual.service_group}
                                          onChange={(e) =>
                                            checkboxclick(
                                              "sexual",
                                              "service_group",
                                              e
                                            )
                                          }
                                          checked={
                                            testdata.sexual.service_group == 1
                                              ? true
                                              : false
                                          }
                                        />
                                        <span class="ml-3">
                                          ????????????????????????????????????????????????????????????
                                        </span>
                                      </label>
                                    </div>
                                    <div class="mt-2 flex justify-left w-1/3">
                                      <label class="inline-flex items-center">
                                        <input
                                          type="checkbox"
                                          class="w-5 h-5 ml-3 rounded "
                                          value={
                                            testdata.sexual.use_of_sex_comtool
                                          }
                                          onChange={(e) =>
                                            checkboxclick(
                                              "sexual",
                                              "use_of_sex_comtool",
                                              e
                                            )
                                          }
                                          checked={
                                            testdata.sexual
                                              .use_of_sex_comtool == 1
                                              ? true
                                              : false
                                          }
                                        />
                                      </label>
                                      <span class="ml-3">
                                        ??????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
                                      </span>
                                    </div>
                                    <div class="mt-2 flex justify-left w-1/3">
                                      <label class="inline-flex items-center">
                                        <input
                                          type="checkbox"
                                          class="w-5 h-5 ml-3 rounded "
                                          value={testdata.sexual.pregnant}
                                          onChange={(e) =>
                                            checkboxclick(
                                              "sexual",
                                              "pregnant",
                                              e
                                            )
                                          }
                                          checked={
                                            testdata.sexual.pregnant == 1
                                              ? true
                                              : false
                                          }
                                        />
                                        <span class="ml-3">???????????????????????????</span>
                                      </label>
                                    </div>
                                  </div>
                                  <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-12"></div>

                                    <div class="mt-2 flex justify-left w-1/3">
                                      <label class="inline-flex items-center">
                                        <input
                                          type="checkbox"
                                          class="w-5 h-5 ml-3 rounded "
                                          value={testdata.sexual.prostitution}
                                          onChange={(e) =>
                                            checkboxclick(
                                              "sexual",
                                              "prostitution",
                                              e
                                            )
                                          }
                                          checked={
                                            testdata.sexual.prostitution == 1
                                              ? true
                                              : false
                                          }
                                        />
                                        <span class="ml-3">
                                          ?????????????????????????????????????????????{" "}
                                        </span>
                                      </label>
                                    </div>
                                    <div class="mt-2 flex justify-left w-1/3">
                                      <label class="inline-flex items-center">
                                        <input
                                          type="checkbox"
                                          class="w-5 h-5 ml-3 rounded "
                                          value={
                                            testdata.sexual
                                              .Obsessed_of_sex_comtool
                                          }
                                          onChange={(e) =>
                                            checkboxclick(
                                              "sexual",
                                              "Obsessed_of_sex_comtool",
                                              e
                                            )
                                          }
                                          checked={
                                            testdata.sexual
                                              .Obsessed_of_sex_comtool == 1
                                              ? true
                                              : false
                                          }
                                        />
                                      </label>
                                      <span class="ml-3">
                                        ?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
                                      </span>
                                    </div>
                                    <div class="mt-2 flex justify-left w-1/3">
                                      <label class="inline-flex items-center">
                                        <input
                                          type="checkbox"
                                          class="w-5 h-5 ml-3 rounded "
                                          value={testdata.sexual.sexually_mixed}
                                          onChange={(e) =>
                                            checkboxclick(
                                              "sexual",
                                              "sexually_mixed",
                                              e
                                            )
                                          }
                                          checked={
                                            testdata.sexual.sexually_mixed == 1
                                              ? true
                                              : false
                                          }
                                        />
                                        <span class="ml-3">
                                          ??????????????????????????????????????????????????????
                                        </span>
                                      </label>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex flex-col mb-4">
                                  <div className="flex flex-row pl-2 mt-5">
                                    <label
                                      className="ml-2 mb-2 pl-1 font-bold text-xl text-gray-900  w-12"
                                      htmlFor="first_name"
                                    ></label>
                                    <label
                                      className="ml-2 mb-2 pl-1 font-bold text-xl text-gray-900  w-full"
                                      htmlFor="first_name"
                                    >
                                      ???????????????????????????
                                    </label>
                                  </div>
                                  <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-12"></div>

                                    <div class="mt-2 flex justify-left w-1/3">
                                      <label class="inline-flex items-center">
                                        <input
                                          type="checkbox"
                                          class="w-5 h-5 ml-3 rounded"
                                          value={
                                            testdata.game_addiction
                                              .more_than_1_hour
                                          }
                                          onChange={(e) =>
                                            checkboxclick(
                                              "game_addiction",
                                              "more_than_1_hour",
                                              e
                                            )
                                          }
                                          checked={
                                            testdata.game_addiction
                                              .more_than_1_hour == 1
                                              ? true
                                              : false
                                          }
                                        />
                                        <span class="ml-3">
                                          ???????????????????????????????????????????????? 1 ?????????????????????{" "}
                                        </span>
                                      </label>
                                    </div>
                                    <div class="mt-2 flex justify-left w-1/3">
                                      <label class="inline-flex items-center">
                                        <input
                                          type="checkbox"
                                          class="w-5 h-5 ml-3 rounded"
                                          value={
                                            testdata.game_addiction
                                              .Lack_of_imagination
                                          }
                                          onChange={(e) =>
                                            checkboxclick(
                                              "game_addiction",
                                              "Lack_of_imagination",
                                              e
                                            )
                                          }
                                          checked={
                                            testdata.game_addiction
                                              .Lack_of_imagination == 1
                                              ? true
                                              : false
                                          }
                                        />
                                      </label>
                                      <span class="ml-3">
                                        ????????????????????????????????????????????????????????????????????????????????????????????????
                                      </span>
                                    </div>
                                    <div class="mt-2 flex justify-left w-1/3">
                                      <label class="inline-flex items-center">
                                        <input
                                          type="checkbox"
                                          class="w-5 h-5 ml-3 rounded"
                                          value={
                                            testdata.game_addiction.Isolated
                                          }
                                          onChange={(e) =>
                                            checkboxclick(
                                              "game_addiction",
                                              "Isolated",
                                              e
                                            )
                                          }
                                          checked={
                                            testdata.game_addiction.Isolated ==
                                            1
                                              ? true
                                              : false
                                          }
                                        />
                                      </label>
                                      <span class="ml-3">
                                        ????????????????????? ????????????????????????????????????????????????????????????
                                      </span>
                                    </div>
                                  </div>
                                  <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-12"></div>

                                    <div class="mt-2 flex justify-left w-1/3">
                                      <label class="inline-flex items-center">
                                        <input
                                          type="checkbox"
                                          class="w-5 h-5 ml-3 rounded"
                                          value={
                                            testdata.game_addiction
                                              .unusual_spending
                                          }
                                          onChange={(e) =>
                                            checkboxclick(
                                              "game_addiction",
                                              "unusual_spending",
                                              e
                                            )
                                          }
                                          checked={
                                            testdata.game_addiction
                                              .unusual_spending == 1
                                              ? true
                                              : false
                                          }
                                        />
                                        <span class="ml-3">
                                          ??????????????????????????????????????????????????????
                                        </span>
                                      </label>
                                    </div>
                                    <div class="mt-2 flex justify-left w-1/3">
                                      <label class="inline-flex items-center">
                                        <input
                                          type="checkbox"
                                          class="w-5 h-5 ml-3 rounded"
                                          value={
                                            testdata.game_addiction
                                              .friends_playing_games
                                          }
                                          onChange={(e) =>
                                            checkboxclick(
                                              "game_addiction",
                                              "friends_playing_games",
                                              e
                                            )
                                          }
                                          checked={
                                            testdata.game_addiction
                                              .friends_playing_games == 1
                                              ? true
                                              : false
                                          }
                                        />
                                        <span class="ml-3">
                                          ????????????????????????????????????????????????????????????????????????{" "}
                                        </span>
                                      </label>
                                    </div>
                                    <div class="mt-2 flex justify-left w-1/3">
                                      <label class="inline-flex items-center">
                                        <input
                                          type="checkbox"
                                          class="w-5 h-5 ml-3 rounded"
                                          value={
                                            testdata.game_addiction
                                              .game_store_near
                                          }
                                          onChange={(e) =>
                                            checkboxclick(
                                              "game_addiction",
                                              "game_store_near",
                                              e
                                            )
                                          }
                                          checked={
                                            testdata.game_addiction
                                              .game_store_near == 1
                                              ? true
                                              : false
                                          }
                                        />
                                      </label>
                                      <span class="ml-3">
                                        ?????????????????????????????????????????????????????????????????????????????????????????????
                                      </span>
                                    </div>
                                  </div>
                                  <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-12"></div>

                                    <div class="mt-2 flex justify-left w-1/3">
                                      <label class="inline-flex items-center">
                                        <input
                                          type="checkbox"
                                          class="w-5 h-5 ml-3 rounded"
                                          value={
                                            testdata.game_addiction
                                              .more_than_2_hour
                                          }
                                          onChange={(e) =>
                                            checkboxclick(
                                              "game_addiction",
                                              "more_than_2_hour",
                                              e
                                            )
                                          }
                                          checked={
                                            testdata.game_addiction
                                              .more_than_2_hour == 1
                                              ? true
                                              : false
                                          }
                                        />
                                      </label>
                                      <span class="ml-3">
                                        ?????????????????????????????????????????????????????? 2 ?????????????????????{" "}
                                      </span>
                                    </div>
                                    <div class="mt-2 flex justify-left w-1/3">
                                      <label class="inline-flex items-center">
                                        <input
                                          type="checkbox"
                                          class="w-5 h-5 ml-3 rounded"
                                          value={
                                            testdata.game_addiction
                                              .seriously_with_game
                                          }
                                          onChange={(e) =>
                                            checkboxclick(
                                              "game_addiction",
                                              "seriously_with_game",
                                              e
                                            )
                                          }
                                          checked={
                                            testdata.game_addiction
                                              .seriously_with_game == 1
                                              ? true
                                              : false
                                          }
                                        />
                                      </label>
                                      <span class="ml-3">
                                        ????????????????????? ?????????????????????????????????????????????????????????{" "}
                                      </span>
                                    </div>
                                    <div class="mt-2 flex justify-left w-1/3">
                                      <label class="inline-flex items-center">
                                        <input
                                          type="checkbox"
                                          class="w-5 h-5 ml-3 rounded"
                                          value={
                                            testdata.game_addiction.steal_money
                                          }
                                          onChange={(e) =>
                                            checkboxclick(
                                              "game_addiction",
                                              "steal_money",
                                              e
                                            )
                                          }
                                          checked={
                                            testdata.game_addiction
                                              .steal_money == 1
                                              ? true
                                              : false
                                          }
                                        />
                                      </label>
                                      <span class="ml-3">
                                        ??????????????????????????????????????????????????? ????????????
                                        ?????????????????????????????????????????????????????????????????????
                                      </span>
                                    </div>
                                  </div>
                                  <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-12"></div>
                                    <div class="mt-2 flex justify-left w-1/3">
                                      <label class="inline-flex items-center">
                                        <input
                                          type="checkbox"
                                          class="w-5 h-5 ml-3 rounded"
                                          value={testdata.game_addiction.other}
                                          onChange={(e) =>
                                            checkboxclick(
                                              "game_addiction",
                                              "other",
                                              e
                                            )
                                          }
                                          checked={
                                            testdata.game_addiction.other == 1
                                              ? true
                                              : false
                                          }
                                        />
                                        <span class="ml-3">???????????????</span>
                                        <input
                                          className="ml-3 py-1 px-1 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-2/4"
                                          type="text"
                                          onChange={(e) =>
                                            modalhandleChange(
                                              "game_addiction_other",
                                              e
                                            )
                                          }
                                        />
                                      </label>
                                    </div>
                                    <div class="mt-2 flex justify-left w-1/3"></div>
                                    <div class="mt-2 flex justify-left w-1/3"></div>
                                  </div>
                                </div>
                                <div className="flex flex-col mb-4">
                                  <div className="flex flex-row pl-2 mt-5">
                                    <label
                                      className="ml-2 mb-2 pl-1 font-bold text-xl text-gray-900  w-12"
                                      htmlFor="first_name"
                                    ></label>
                                    <label
                                      className="ml-2 mb-2 pl-1 font-bold text-xl text-gray-900  w-full"
                                      htmlFor="first_name"
                                    >
                                      ?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
                                    </label>
                                  </div>
                                  <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-12"></div>

                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          class="w-5 h-5 ml-3 rounded"
                                          id="com_internet-1"
                                          type="radio"
                                          value="1"
                                          name="com_internet"
                                          onChange={(e) =>
                                            onclick("com_internet", e)
                                          }
                                          // checked={
                                          //   testdata.com_internet == 1
                                          //     ? true
                                          //     : false
                                          // }
                                        />
                                        <span class="ml-3" for="com_internet-1">
                                          ??????????????????????????????????????? Internet ???????????????????????????????????????
                                        </span>
                                      </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          class="w-5 h-5 ml-3 rounded"
                                          id="com_internet-2"
                                          type="radio"
                                          value="2"
                                          name="com_internet"
                                          onChange={(e) =>
                                            onclick("com_internet", e)
                                          }
                                          // checked={
                                          //   testdata.com_internet == 2
                                          //     ? true
                                          //     : false
                                          // }
                                        />
                                        <span class="ml-3" for="com_internet-2">
                                          ???????????????????????????????????????????????? Internet
                                          ???????????????????????????????????????{" "}
                                        </span>
                                      </label>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex flex-col mb-4">
                                  <div className="flex flex-row pl-2 mt-5">
                                    <label
                                      className="ml-2 mb-2 pl-1 font-bold text-xl text-gray-900  w-12"
                                      htmlFor="first_name"
                                    ></label>
                                    <label
                                      className="ml-2 mb-2 pl-1 font-bold text-xl text-gray-900  w-full"
                                      htmlFor="first_name"
                                    >
                                      ???????????????????????????????????????????????????????????????????????????????????????????????????????????????
                                    </label>
                                  </div>
                                  <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-12"></div>

                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          class="w-5 h-5 ml-3 rounded"
                                          id="electronic_comm-1"
                                          type="radio"
                                          value="1"
                                          name="electronic_comm"
                                          onChange={(e) =>
                                            onclick("electronic_comm", e)
                                          }
                                          // checked={
                                          //   testdata.electronic_comm == 1
                                          //     ? true
                                          //     : false
                                          // }
                                        />
                                        <span
                                          class="ml-3"
                                          for="electronic_comm-1"
                                        >
                                          ????????? Social media/game (???????????????????????????????????? 3
                                          ?????????????????????)
                                        </span>
                                      </label>
                                    </div>
                                  </div>
                                  <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-12"></div>
                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          class="w-5 h-5 ml-3 rounded"
                                          id="electronic_comm-2"
                                          type="radio"
                                          value="2"
                                          name="electronic_comm"
                                          onChange={(e) =>
                                            onclick("electronic_comm", e)
                                          }
                                          // checked={
                                          //   testdata.electronic_comm == 2
                                          //     ? true
                                          //     : false
                                          // }
                                        />
                                        <span
                                          class="ml-3"
                                          for="electronic_comm-2"
                                        >
                                          ????????? Social media/game (??????????????? 3
                                          ???????????????????????????????????????)
                                        </span>
                                      </label>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex flex-col mb-4">
                                  <div className="flex flex-row pl-2 mt-5">
                                    <label
                                      className="ml-2 mb-2 pl-1 font-bold text-xl text-gray-900  w-12"
                                      htmlFor="first_name"
                                    ></label>
                                    <label
                                      className="ml-2 mb-2 pl-1 font-bold text-xl text-gray-900  w-full"
                                      htmlFor="first_name"
                                    >
                                      ????????????????????????????????????????????????????????????
                                    </label>
                                  </div>
                                  <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-12"></div>

                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          type="checkbox"
                                          class="w-5 h-5 ml-3 rounded"
                                          value={testdata.informant.father}
                                          onChange={(e) =>
                                            checkboxclick(
                                              "informant",
                                              "father",
                                              e
                                            )
                                          }
                                          checked={
                                            testdata.informant.father == 1
                                              ? true
                                              : false
                                          }
                                        />
                                        <span class="ml-3">???????????? </span>
                                      </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          type="checkbox"
                                          class="w-5 h-5 ml-3 rounded"
                                          value={testdata.informant.mother}
                                          onChange={(e) =>
                                            checkboxclick(
                                              "informant",
                                              "mother",
                                              e
                                            )
                                          }
                                          checked={
                                            testdata.informant.mother == 1
                                              ? true
                                              : false
                                          }
                                        />
                                        <span class="ml-3">???????????????</span>
                                      </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          type="checkbox"
                                          class="w-5 h-5 ml-3 rounded"
                                          value={testdata.informant.brother}
                                          onChange={(e) =>
                                            checkboxclick(
                                              "informant",
                                              "brother",
                                              e
                                            )
                                          }
                                          checked={
                                            testdata.informant.brother == 1
                                              ? true
                                              : false
                                          }
                                        />
                                        <span class="ml-3">??????????????????</span>
                                      </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          type="checkbox"
                                          class="w-5 h-5 ml-3 rounded"
                                          value={testdata.informant.sister}
                                          onChange={(e) =>
                                            checkboxclick(
                                              "informant",
                                              "sister",
                                              e
                                            )
                                          }
                                          checked={
                                            testdata.informant.sister == 1
                                              ? true
                                              : false
                                          }
                                        />
                                        <span class="ml-3">??????????????????</span>
                                      </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          type="checkbox"
                                          class="w-5 h-5 ml-3 rounded"
                                          value={testdata.informant.narr}
                                          onChange={(e) =>
                                            checkboxclick(
                                              "informant",
                                              "narr",
                                              e
                                            )
                                          }
                                          checked={
                                            testdata.informant.narr == 1
                                              ? true
                                              : false
                                          }
                                        />
                                        <span class="ml-3">?????????</span>
                                      </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          type="checkbox"
                                          class="w-5 h-5 ml-3 rounded"
                                          value={testdata.informant.r}
                                          onChange={(e) =>
                                            checkboxclick("informant", "r", e)
                                          }
                                          checked={
                                            testdata.informant.r == 1
                                              ? true
                                              : false
                                          }
                                        />
                                        <span class="ml-3">?????? </span>
                                      </label>
                                    </div>
                                  </div>
                                  <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-12"></div>
                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          type="checkbox"
                                          class="w-5 h-5 ml-3 rounded"
                                          value={testdata.informant.par}
                                          onChange={(e) =>
                                            checkboxclick("informant", "par", e)
                                          }
                                          checked={
                                            testdata.informant.par == 1
                                              ? true
                                              : false
                                          }
                                        />
                                        <span class="ml-3">?????????</span>
                                      </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          type="checkbox"
                                          class="w-5 h-5 ml-3 rounded"
                                          value={testdata.informant.lung}
                                          onChange={(e) =>
                                            checkboxclick(
                                              "informant",
                                              "lung",
                                              e
                                            )
                                          }
                                          checked={
                                            testdata.informant.lung == 1
                                              ? true
                                              : false
                                          }
                                        />
                                        <span class="ml-3">?????????</span>
                                      </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          type="checkbox"
                                          class="w-5 h-5 ml-3 rounded"
                                          value={testdata.informant.pu}
                                          onChange={(e) =>
                                            checkboxclick("informant", "pu", e)
                                          }
                                          checked={
                                            testdata.informant.pu == 1
                                              ? true
                                              : false
                                          }
                                        />
                                        <span class="ml-3">?????????</span>
                                      </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          type="checkbox"
                                          class="w-5 h-5 ml-3 rounded"
                                          value={testdata.informant.ya}
                                          onChange={(e) =>
                                            checkboxclick("informant", "ya", e)
                                          }
                                          checked={
                                            testdata.informant.ya == 1
                                              ? true
                                              : false
                                          }
                                        />
                                        <span class="ml-3">?????????</span>
                                      </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          type="checkbox"
                                          class="w-5 h-5 ml-3 rounded"
                                          value={testdata.informant.ta}
                                          onChange={(e) =>
                                            checkboxclick("informant", "ta", e)
                                          }
                                          checked={
                                            testdata.informant.ta == 1
                                              ? true
                                              : false
                                          }
                                        />
                                        <span class="ml-3">?????? </span>
                                      </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          type="checkbox"
                                          class="w-5 h-5 ml-3 rounded"
                                          value={testdata.informant.yai}
                                          onChange={(e) =>
                                            checkboxclick("informant", "yai", e)
                                          }
                                          checked={
                                            testdata.informant.yai == 1
                                              ? true
                                              : false
                                          }
                                        />
                                        <span class="ml-3">?????????</span>
                                      </label>
                                    </div>
                                  </div>
                                  <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-12"></div>

                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          type="checkbox"
                                          class="w-5 h-5 ml-3 rounded"
                                          value={testdata.informant.tuad}
                                          onChange={(e) =>
                                            checkboxclick(
                                              "informant",
                                              "tuad",
                                              e
                                            )
                                          }
                                          checked={
                                            testdata.informant.tuad == 1
                                              ? true
                                              : false
                                          }
                                        />
                                        <span class="ml-3">?????????</span>
                                      </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          type="checkbox"
                                          class="w-5 h-5 ml-3 rounded"
                                          value={testdata.informant.stepfather}
                                          onChange={(e) =>
                                            checkboxclick(
                                              "informant",
                                              "stepfather",
                                              e
                                            )
                                          }
                                          checked={
                                            testdata.informant.stepfather == 1
                                              ? true
                                              : false
                                          }
                                        />
                                        <span class="ml-3">??????????????????????????? </span>
                                      </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          type="checkbox"
                                          class="w-5 h-5 ml-3 rounded"
                                          value={testdata.informant.stepmother}
                                          onChange={(e) =>
                                            checkboxclick(
                                              "informant",
                                              "stepmother",
                                              e
                                            )
                                          }
                                          checked={
                                            testdata.informant.stepmother == 1
                                              ? true
                                              : false
                                          }
                                        />
                                        <span class="ml-3">??????????????????????????? </span>
                                      </label>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex flex-col pl-2 mt-10">
                                  <div className="   text-xl text-center  w-full">
                                    ???????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
                                  </div>
                                  <div className="flex flex-col mb-4">
                                    <div className="flex flex-row pl-2 ">
                                      <label
                                        className=" mb-2 pl-1 font-bold text-xl text-gray-900  w-12"
                                        htmlFor="first_name"
                                      ></label>
                                      <label
                                        className="ml-3 mb-2 pl-1 text-lg text-gray-900  w-1/4"
                                        htmlFor="first_name"
                                      >
                                        ?????????????????????????????????????????????????????????????????????
                                      </label>
                                    </div>
                                    <div class="flex flex-row pl-2 mt-3">
                                      <label
                                        className=" mb-2 pl-1 font-bold text-xl text-gray-900  w-12"
                                        htmlFor="first_name"
                                      ></label>
                                      <DatePicker
                                        dateFormat="yyyy-MM-dd"
                                        className=" py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-1/4 "
                                        selected={new Date(testdata.visit_date)}
                                        onChange={(e) =>
                                          modalhandleChange("visit_date", e)
                                        }
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="flex flex-col mb-4">
                                  <div className="flex flex-row pl-2 ">
                                    <label
                                      className=" mb-2 pl-1 font-bold text-xl text-gray-900  w-12"
                                      htmlFor="first_name"
                                    ></label>
                                    <label
                                      className="ml-3 mb-2 pl-1 text-lg text-gray-900  w-1/4"
                                      htmlFor="first_name"
                                    >
                                      ?????????????????????
                                    </label>
                                  </div>
                                  <div class="flex flex-row pl-2 mt-3">
                                    <label
                                      className=" mb-2 pl-1 font-bold text-xl text-gray-900  w-12"
                                      htmlFor="first_name"
                                    ></label>
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
                                      placeholder="Your message..."
                                      value={testdata.current_address}
                                      onChange={(e) =>
                                        modalhandleChange("current_address", e)
                                      }
                                    ></textarea>
                                  </div>
                                </div>
                                <div className="flex flex-col mb-4">
                                  <div className="flex flex-row w-full  mt-3">
                                    <label
                                      className="ml-2 mb-2 pl-1 font-bold text-lg text-gray-900  w-12"
                                      htmlFor="first_name"
                                    ></label>
                                    <label
                                      className="ml-2 mb-2 pl-1 text-lg text-gray-900  w-full"
                                      htmlFor="first_name"
                                    >
                                      ????????????????????????????????????????????????(????????????
                                      ?????????????????????????????????,?????????????????????????????????????????????-?????????????????????)
                                    </label>
                                  </div>
                                  <div className="flex flex-row mb-4">
                                    <label
                                      className="ml-2 mb-2 pl-1 font-bold text-lg text-gray-900  w-12"
                                      htmlFor="first_name"
                                    ></label>

                                    <input
                                      className="ml-2 py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-1/3"
                                      type="text"
                                      value={testdata.current_address_near}
                                      onChange={(e) =>
                                        modalhandleChange(
                                          "current_address_near",
                                          e
                                        )
                                      }
                                    />
                                  </div>
                                </div>
                                <div className="flex flex-col mb-4">
                                  <div className="flex flex-row w-full  mt-3">
                                    <label
                                      className="ml-2 mb-2 pl-1 font-bold text-lg text-gray-900  w-12"
                                      htmlFor="first_name"
                                    ></label>
                                    <label
                                      className="ml-2 mb-2 pl-1 text-lg text-gray-900  w-full"
                                      htmlFor="first_name"
                                    >
                                      ??????????????????????????? ??????????????????????????????????????????????????????
                                    </label>
                                  </div>
                                  <div className="flex flex-row mb-4">
                                    <label
                                      className="ml-2 mb-2 pl-1 font-bold text-lg text-gray-900  w-12"
                                      htmlFor="first_name"
                                    ></label>

                                    <div class="mt-2 flex justify-left">
                                      <label class="inline-flex items-center">
                                        <input
                                          class="w-5 h-5 ml-3 rounded"
                                          id="attached_photos-1"
                                          type="radio"
                                          value="1"
                                          name="attached_photos"
                                          onChange={(e) =>
                                            onclick("attached_photos", e)
                                          }
                                          // checked={
                                          //   testdata.attached_photos == 1
                                          //     ? true
                                          //     : false
                                          // }
                                        />
                                        <span
                                          class="ml-3"
                                          for="attached_photos-1"
                                        >
                                          ???????????????????????????????????????????????????????????????????????????
                                          (?????????????????????????????????/????????????){" "}
                                        </span>
                                      </label>
                                    </div>
                                  </div>
                                  <div className="flex flex-row mb-4">
                                    <label
                                      className="ml-2 mb-2 pl-1 font-bold text-lg text-gray-900  w-12"
                                      htmlFor="first_name"
                                    ></label>

                                    <div class="mt-2 flex justify-left">
                                      <label class="inline-flex items-center">
                                        <input
                                          class="w-5 h-5 ml-3 rounded"
                                          id="attached_photos-2"
                                          type="radio"
                                          value="2"
                                          name="attached_photos"
                                          onChange={(e) =>
                                            onclick("attached_photos", e)
                                          }
                                          // checked={
                                          //   testdata.attached_photos == 2
                                          //     ? true
                                          //     : false
                                          // }
                                        />
                                        <span
                                          class="ml-3"
                                          for="attached_photos-2"
                                        >
                                          ?????????????????????????????????/??????????????????????????????????????????????????????????????????{" "}
                                        </span>
                                      </label>
                                    </div>
                                  </div>
                                  <div className="flex flex-row mb-4">
                                    <label
                                      className="ml-2 mb-2 pl-1 font-bold text-lg text-gray-900  w-12"
                                      htmlFor="first_name"
                                    ></label>

                                    <div class="mt-2 flex justify-left">
                                      <label class="inline-flex items-center">
                                        <input
                                          class="w-5 h-5 ml-3 rounded"
                                          id="attached_photos-3"
                                          type="radio"
                                          value="3"
                                          name="attached_photos"
                                          onChange={(e) =>
                                            onclick("attached_photos", e)
                                          }
                                          // checked={
                                          //   testdata.attached_photos == 3
                                          //     ? true
                                          //     : false
                                          // }
                                        />
                                      </label>
                                      <span
                                        class="ml-3"
                                        for="attached_photos-3"
                                      >
                                        ???????????????????????????????????????????????????????????? ????????? ????????????????????? ???????????????
                                        ?????????????????? ??????????????????????????????????????????
                                      </span>
                                    </div>
                                  </div>
                                  <div className="flex flex-row mb-4">
                                    <label
                                      className="ml-2 mb-2 pl-1 font-bold text-lg text-gray-900  w-12"
                                      htmlFor="first_name"
                                    ></label>

                                    <div class="mt-2 flex justify-left w-1/2">
                                      <label class="inline-flex items-center">
                                        <input
                                          class="w-5 h-5 ml-3 rounded"
                                          id="attached_photos-4"
                                          type="radio"
                                          value="4"
                                          name="attached_photos"
                                          onChange={(e) =>
                                            onclick("attached_photos", e)
                                          }
                                          // checked={
                                          //   testdata.attached_photos == 4
                                          //     ? true
                                          //     : false
                                          // }
                                        />
                                      </label>
                                      <span
                                        class="ml-3"
                                        for="attached_photos-4"
                                      >
                                        ??????????????????????????????????????????????????????????????????????????????????????????
                                        ?????????????????????????????????????????????????????????????????????????????? ???????????????????????????
                                        ???????????????????????????????????????????????????/?????????????????????????????????/??????????????????????????????
                                        ???????????????????????????????????????????????????????????????????????????????????????{" "}
                                      </span>
                                    </div>
                                  </div>
                                </div>

                                <div className="flex flex-col mb-4">
                                  <div className="flex flex-row mt-5 ">
                                    <label
                                      className="ml-2 mb-2 pl-1 font-bold text-xl text-gray-900  w-12"
                                      htmlFor="first_name"
                                    ></label>
                                    <label
                                      className="ml-2 mb-2 pl-1 font-bold text-xl text-gray-900  w-full"
                                      htmlFor="first_name"
                                    >
                                      ??????????????????????????????
                                    </label>
                                  </div>

                                  <div className="flex flex-row w-full  mt-3">
                                    <label
                                      className="ml-2 mb-2 pl-1 font-bold text-lg text-gray-900  w-12"
                                      htmlFor="first_name"
                                    ></label>
                                    <label
                                      className="ml-2 mb-2 pl-1 text-lg text-gray-900  w-3/4"
                                      htmlFor="first_name"
                                      onmousemove="this.value=event.clientX+':'+event.clientY"
                                      value="Mouse over me"
                                    >
                                      ??????????????? iframe ??????????????????
                                    </label>
                                  </div>
                                  <div className="flex flex-row mb-4">
                                    <label
                                      className="ml-2 mb-2 pl-1 font-bold text-lg text-gray-900  w-12"
                                      htmlFor="first_name"
                                    ></label>
                                    <Image
                                      width={700}
                                      height={450}
                                      src="/img/iframemap.gif"
                                      alt="profile"
                                      className="mx-auto"
                                    />
                                  </div>
                                  <div className="flex flex-row mb-4">
                                    <label
                                      className="ml-2 mb-2 pl-1 font-bold text-lg text-gray-900  w-12"
                                      htmlFor="first_name"
                                    ></label>

                                    <input
                                      className="ml-2 py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-3/4"
                                      type="text"
                                      placeholder='<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1893.8216169426996!2d99.39656997594824!3d18.317916543161907!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x57a536bb8651802b!2zMTjCsDE5JzA0LjUiTiA5OcKwMjMnNTEuNiJF!5e0!3m2!1sth!2sth!4v1654154264086!5m2!1sth!2sth" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>'
                                      onChange={(e) =>
                                        modalhandleChange(
                                          "iframe_google_map",
                                          e
                                        )
                                      }
                                    />
                                  </div>
                                </div>
                                <div className="flex flex-col mb-4">
                                  <div className="flex flex-row w-full  mt-3">
                                    <label
                                      className="ml-2 mb-2 pl-1 font-bold text-lg text-gray-900  w-12"
                                      htmlFor="first_name"
                                    ></label>
                                    <label
                                      className="ml-2 mb-2 pl-1 text-lg text-gray-900  w-3/4"
                                      htmlFor="first_name"
                                      onmousemove="this.value=event.clientX+':'+event.clientY"
                                      value="Mouse over me"
                                    >
                                      Google map
                                    </label>
                                  </div>
                                  <div className="flex flex-row mb-4">
                                    <label
                                      className="ml-2 mb-2 pl-1 font-bold text-lg text-gray-900  w-12"
                                      htmlFor="first_name"
                                    ></label>
                                    <Image
                                      width={700}
                                      height={450}
                                      src="/img/googlemap.gif"
                                      alt="profile"
                                      className="mx-auto"
                                    />
                                  </div>
                                  <div className="flex flex-row mb-4">
                                    <label
                                      className="ml-2 mb-2 pl-1 font-bold text-lg text-gray-900  w-12"
                                      htmlFor="first_name"
                                    ></label>

                                    <input
                                      className="ml-2 py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-3/4"
                                      type="text"
                                      placeholder="URL Google Map"
                                      onChange={(e) =>
                                        modalhandleChange("google_map", e)
                                      }
                                    />
                                  </div>
                                </div>
                                <div className="flex flex-col mb-4">
                                  <div className="flex flex-row w-full  mt-3">
                                    <label
                                      className="ml-2 mb-2 pl-1 font-bold text-lg text-gray-900  w-12"
                                      htmlFor="first_name"
                                    ></label>
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
                                      ?????????????????? 2
                                      ??????????????????????????????????????????????????????????????????????????????????????????????????????????????????
                                    </label>
                                  </div>

                                  <div className="flex flex-row mb-4">
                                    <label
                                      className="ml-2 mb-2 pl-1 font-bold text-lg text-gray-900  w-12"
                                      htmlFor="first_name"
                                    ></label>

                                    <input
                                      className="ml-2 py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-1/2"
                                      onChange={(e) =>
                                        imageadd(
                                          "photo_house",
                                          e.target.files[0]
                                        )
                                      }
                                      type="file"
                                      id="myfile"
                                    />
                                    <label
                                      className="ml-2 mb-2 pl-1 font-bold text-lg text-gray-900  w-12"
                                      htmlFor="first_name"
                                    ></label>
                                    <input
                                      className="ml-2 py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-1/2"
                                      onChange={(e) =>
                                        imageadd(
                                          "photo_teacher_fm_student",
                                          e.target.files[0]
                                        )
                                      }
                                      type="file"
                                      id="myfile"
                                    />
                                    <label
                                      className="ml-2 mb-2 pl-1 font-bold text-lg text-gray-900  w-12"
                                      htmlFor="first_name"
                                    ></label>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </main>
                        </div>
                      </div>
                      {/*footer*/}
                      <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                        <button
                          className=" shadow hover:shadow-lg text-white bg-red-600 hover:text-red-600   border-2   border-white hover:border-red-600  hover:bg-white rounded-lg background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                          type="button"
                          onClick={() => closeAddmodal()}
                        >
                          Close
                        </button>
                        <button
                          className=" shadow hover:shadow-lg text-white bg-green-600 hover:text-green-600   border-2   border-white hover:border-green-600  hover:bg-white rounded-lg background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                          type="button"
                          onClick={() => addcommit()}
                        >
                          ??????????????????
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
            {showModaledit ? "" : ""}
            {/* viewModal */}
            {showModalview ? (
              <>
                <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                  <div className="relative w-8/12  mt-28 mb-6 mx-auto max-w-4xl  max-h-auto ">
                    {/*content*/}
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                      {/*header*/}
                      <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t text-color-blue">
                        <h3 className="text-2xl font-semibold text-center w-full ml-3">
                          ???????????????????????????????????????
                        </h3>
                        <button
                          className="p-1 ml-auto bg-transparent border-0 text-black  float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                          onClick={() => closeViewmodal()}
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
                      <div
                        className="relative  flex-auto  overflow-y-auto w-full "
                        style={{ height: "80vh" }}
                      >
                        <div className="flex flex-row min-h-screen bg-gray-100 text-gray-800 z-40 absolute w-full ">
                          <main className="flex flex-col flex-grow w-full transition-all duration-150 ease-in md:w-4/5 main md:ml-0 ml-0">
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
                                      className="ml-2 mb-2 pl-1 font-bold text-lg text-gray-900  w-12"
                                      htmlFor="first_name"
                                    ></label>
                                    <label
                                      className="ml-2 mb-2 pl-1 font-bold text-lg text-gray-900  w-1/12"
                                      htmlFor="first_name"
                                    >
                                      ????????????????????????
                                    </label>

                                    <label
                                      className="ml-3 mb-2 pl-1 font-bold text-lg text-gray-900  w-1/6
                                        "
                                      htmlFor="first_name"
                                    >
                                      ????????????
                                    </label>

                                    <label
                                      className="ml-3 mb-2 pl-1 font-bold text-lg text-gray-900  w-1/6"
                                      htmlFor="first_name"
                                    >
                                      ?????????????????????
                                    </label>
                                    <label
                                      className="ml-3 mb-2 pl-1 font-bold text-lg text-gray-900  w-1/12"
                                      htmlFor="first_name"
                                    >
                                      ??????????????????
                                    </label>
                                    <label
                                      className="ml-1 mb-2 pl-1 font-bold text-lg text-gray-900  w-1/12"
                                      htmlFor="first_name"
                                    >
                                      ????????????
                                    </label>
                                    <label
                                      className="ml-3 mb-2 pl-1 font-bold text-lg text-gray-900  w-1/6"
                                      htmlFor="first_name"
                                    >
                                      ???????????????????????????????????????
                                    </label>
                                  </div>
                                  <div className="flex flex-row mb-4">
                                    <label
                                      className="ml-2 mb-2 pl-1 font-bold text-lg text-gray-900  w-12"
                                      htmlFor="first_name"
                                    ></label>
                                    <input
                                      className="ml-2 py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-1/12"
                                      value={testdata.title}
                                      type="text"
                                      disabled
                                      // onChange={(e) =>
                                      //   modalhandleChange("title", e)
                                      // }
                                    />
                                    <input
                                      className="ml-3 py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-1/6"
                                      value={testdata.firstname_student}
                                      type="text"
                                      disabled
                                      // onChange={(e) =>
                                      //   modalhandleChange("firstname_student", e)
                                      // }
                                    />
                                    <input
                                      className="ml-3 py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-1/6"
                                      type="text"
                                      value={testdata.lastname_student}
                                      disabled
                                      // onChange={(e) =>
                                      //   modalhandleChange("lastname_student", e)
                                      // }
                                    />
                                    <input
                                      className="ml-3 py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-1/12"
                                      type="text"
                                      value={testdata.student_no}
                                      disabled
                                      // onChange={(e) =>
                                      //   modalhandleChange("student_no", e)
                                      // }
                                    />
                                    {/* classroomselect */}
                                    <div class="ml-2 relative inline-flex  w-2/12">
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
                                      {}
                                      <select
                                        class="border border-gray-300 shadow text-sm lg:text-lg rounded-lg text-gray-600 h-10 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none w-full"
                                        value={testdata.classroom_code}
                                        disabled
                                        // onChange={(e) =>
                                        //   modalhandleChange("classroom_code", e)
                                        // }
                                      >
                                        {classroommap
                                          ? classroommap.map((p, index) => (
                                              <option value={p.classroom_code}>
                                                {p.classroom_name}
                                              </option>
                                            ))
                                          : ""}
                                      </select>
                                    </div>
                                    <input
                                      className="ml-3 py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-1/6"
                                      type="text"
                                      value={testdata.phonenumber}
                                      disabled
                                      // onChange={(e) =>
                                      //   modalhandleChange("phonenumber", e)
                                      // }
                                    />
                                  </div>
                                </div>
                                <div className="flex flex-col mb-4">
                                  <div className="flex flex-row  ">
                                    <label
                                      className="ml-2 mb-2 pl-1 font-bold text-lg text-gray-900  w-12"
                                      htmlFor="first_name"
                                    ></label>
                                    <label
                                      className="ml-3 mb-2 pl-1 font-bold text-lg text-gray-900  w-2/6
                                        "
                                      htmlFor="first_name"
                                    >
                                      ????????????(????????????)-?????????????????????
                                    </label>

                                    <label
                                      className="ml-3 mb-2 pl-1 font-bold text-lg text-gray-900  w-1/4"
                                      htmlFor="first_name"
                                    >
                                      ???????????????????????????????????????
                                    </label>
                                    <label
                                      className="ml-6 mb-2 pl-1 font-bold text-lg text-gray-900  w-1/4"
                                      htmlFor="first_name"
                                    >
                                      ???????????????
                                    </label>
                                  </div>
                                  <div className="flex flex-row mb-4">
                                    <label
                                      className="ml-2 mb-2 pl-1 font-bold text-lg text-gray-900  w-12"
                                      htmlFor="first_name"
                                    ></label>
                                    <input
                                      className="ml-2 py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-2/6"
                                      type="text"
                                      value={testdata.father_name}
                                      disabled
                                      // onChange={(e) =>
                                      //   modalhandleChange("father_name", e)
                                      // }
                                    />

                                    <input
                                      className="ml-3 py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-2/10"
                                      type="text"
                                      value={testdata.father_phonenumber}
                                      disabled
                                      // onChange={(e) =>
                                      //   modalhandleChange(
                                      //     "father_phonenumber",
                                      //     e
                                      //   )
                                      // }
                                    />
                                    <input
                                      className="ml-3 py-2 px-3  border-solid  border border-gray-300 outline-none  rounded-lg shadow w-2/10"
                                      type="text"
                                      value={testdata.father_occupation}
                                      disabled
                                      // onChange={(e) =>
                                      //   modalhandleChange(
                                      //     "father_occupation",
                                      //     e
                                      //   )
                                      // }
                                    />
                                  </div>
                                </div>
                                <div className="flex flex-col mb-4">
                                  <div className="flex flex-row  ">
                                    <label
                                      className="ml-2 mb-2 pl-1 font-bold text-lg text-gray-900  w-12"
                                      htmlFor="first_name"
                                    ></label>

                                    <label
                                      className="ml-3 mb-2 pl-1 font-bold text-lg text-gray-900  w-2/6
                                        "
                                      htmlFor="first_name"
                                    >
                                      ????????????(???????????????)-?????????????????????
                                    </label>

                                    <label
                                      className="ml-3 mb-2 pl-1 font-bold text-lg text-gray-900  w-1/4"
                                      htmlFor="first_name"
                                    >
                                      ???????????????????????????????????????
                                    </label>
                                    <label
                                      className="ml-3 mb-2 pl-1 font-bold text-lg text-gray-900  w-1/4"
                                      htmlFor="first_name"
                                    >
                                      ???????????????
                                    </label>
                                  </div>
                                  <div className="flex flex-row mb-4">
                                    <label
                                      className="ml-2 mb-2 pl-1 font-bold text-lg text-gray-900  w-12"
                                      htmlFor="first_name"
                                    ></label>
                                    <input
                                      className="ml-2 py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-2/6"
                                      type="text"
                                      value={testdata.mother_name}
                                      disabled
                                      // onChange={(e) =>
                                      //   modalhandleChange("mother_name", e)
                                      // }
                                    />

                                    <input
                                      className="ml-3 py-2 px-3  border-solid  border border-gray-300 outline-none  rounded-lg shadow w-2/10"
                                      type="text"
                                      value={testdata.mother_phonenumber}
                                      disabled
                                      // onChange={(e) =>
                                      //   modalhandleChange(
                                      //     "mother_phonenumber",
                                      //     e
                                      //   )
                                      // }
                                    />

                                    <input
                                      className="ml-3 py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-2/10"
                                      type="text"
                                      value={testdata.mother_occupation}
                                      disabled
                                      // onChange={(e) =>
                                      //   modalhandleChange(
                                      //     "mother_occupation",
                                      //     e
                                      //   )
                                      // }
                                    />
                                  </div>
                                </div>
                                <div className="flex flex-col mb-4">
                                  <div className="flex flex-row pl-2">
                                    <div className="  ml-2 text-xl text-left  w-1/12 md:w-1/16"></div>
                                    <div className="   text-xl text-left  w-1/4">
                                      ????????????????????????????????????-???????????????
                                    </div>
                                  </div>

                                  <div class="flex flex-row pl-2">
                                    <div className="  ml-10 text-xl text-left  w-1/12 md:w-1/16"></div>
                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          class="w-5 h-5 ml-3 rounded"
                                          id="familystatus-1"
                                          type="radio"
                                          value="1"
                                          name="fm_marital_status"
                                          // onChange={(e) =>
                                          //   onclick("fm_marital_status", e)
                                          // }
                                          checked={
                                            testdata.fm_marital_status == 1
                                              ? true
                                              : false
                                          }
                                          disabled
                                        />

                                        <span class="ml-3" for="familystatus-1">
                                          ?????????????????????????????????
                                        </span>
                                      </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          class="w-5 h-5 ml-3 rounded"
                                          id="familystatus-2"
                                          type="radio"
                                          value="2"
                                          name="fm_marital_status"
                                          // onChange={(e) =>
                                          //   onclick("fm_marital_status", e)
                                          // }
                                          checked={
                                            testdata.fm_marital_status == 2
                                              ? true
                                              : false
                                          }
                                          disabled
                                        />

                                        <span class="ml-3" for="familystatus-2">
                                          ??????????????????????????????
                                        </span>
                                      </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          class="w-5 h-5 ml-3 rounded"
                                          id="familystatus-3"
                                          type="radio"
                                          value="3"
                                          name="fm_marital_status"
                                          // onChange={(e) =>
                                          //   onclick("fm_marital_status", e)
                                          // }
                                          checked={
                                            testdata.fm_marital_status == 3
                                              ? true
                                              : false
                                          }
                                          disabled
                                        />

                                        <span class="ml-3" for="familystatus-3">
                                          ????????????????????????
                                        </span>
                                      </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          class="w-5 h-5 ml-3 rounded"
                                          id="familystatus-4"
                                          type="radio"
                                          value="4"
                                          name="fm_marital_status"
                                          // onChange={(e) =>
                                          //   onclick("fm_marital_status", e)
                                          // }
                                          checked={
                                            testdata.fm_marital_status == 4
                                              ? true
                                              : false
                                          }
                                          disabled
                                        />

                                        <span class="ml-3" for="familystatus-4">
                                          ???????????????????????????????????????
                                        </span>
                                      </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          class="w-5 h-5 ml-3 rounded"
                                          id="familystatus-5"
                                          type="radio"
                                          value="5"
                                          name="fm_marital_status"
                                          // onChange={(e) =>
                                          //   onclick("fm_marital_status", e)
                                          // }
                                          checked={
                                            testdata.fm_marital_status == 5
                                              ? true
                                              : false
                                          }
                                          disabled
                                        />

                                        <span class="ml-3" for="familystatus-5">
                                          ??????????????????????????????????????????
                                        </span>
                                      </label>
                                    </div>
                                  </div>
                                </div>
                                <div className="mt-5 flex flex-col mb-4">
                                  <div className="flex flex-row  ">
                                    <label
                                      className="ml-2 mb-2 pl-1 font-bold text-lg text-gray-900  w-1/16 md:w-1/12"
                                      htmlFor="first_name"
                                    ></label>
                                    <label
                                      className="ml-2 mb-2 pl-1 font-bold text-lg text-gray-900  w-full"
                                      htmlFor="first_name"
                                    >
                                      ???????????????????????????????????????????????????????????????(??????????????????????????????????????????-???????????????)?????????????????????????????????????????????????????????????????????????????????????????????????????????
                                    </label>
                                  </div>
                                  <div className="flex flex-row mb-4">
                                    <label
                                      className="ml-2 mb-2 pl-1 font-bold text-lg text-gray-900  w-12"
                                      htmlFor="first_name"
                                    ></label>
                                    <input
                                      className="ml-2 py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-1/4"
                                      type="text"
                                      value={testdata.parent_relation}
                                      disabled
                                      // onChange={(e) =>
                                      //   modalhandleChange("parent_relation", e)
                                      // }
                                    />
                                  </div>
                                </div>
                                <div className="flex flex-col mb-4">
                                  <div className="flex flex-row  ">
                                    <label
                                      className="ml-2 mb-2 pl-1 font-bold text-lg text-gray-900  w-12"
                                      htmlFor="first_name"
                                    ></label>

                                    <label
                                      className="ml-3 mb-2 pl-1 font-bold text-lg text-gray-900  w-2/6
                                        "
                                      htmlFor="first_name"
                                    >
                                      ????????????-?????????????????????
                                    </label>

                                    <label
                                      className="ml-3 mb-2 pl-1 font-bold text-lg text-gray-900  w-1/4"
                                      htmlFor="first_name"
                                    >
                                      ???????????????????????????????????????
                                    </label>
                                    <label
                                      className="ml-3 mb-2 pl-1 font-bold text-lg text-gray-900  w-1/4"
                                      htmlFor="first_name"
                                    >
                                      ???????????????
                                    </label>
                                  </div>
                                  <div className="flex flex-row mb-4">
                                    <label
                                      className="ml-2 mb-2 pl-1 font-bold text-lg text-gray-900  w-12"
                                      htmlFor="first_name"
                                    ></label>
                                    <input
                                      className="ml-2 py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-2/6"
                                      type="text"
                                      value={testdata.parent_name}
                                      // onChange={(e) =>
                                      //   modalhandleChange("parent_name", e)
                                      // }
                                      disabled
                                    />

                                    <input
                                      className="ml-3 py-2 px-3  border-solid  border border-gray-300 outline-none  rounded-lg shadow w-2/10"
                                      type="text"
                                      value={testdata.parent_phonenumber}
                                      // onChange={(e) =>
                                      //   modalhandleChange(
                                      //     "parent_phonenumber",
                                      //     e
                                      //   )
                                      // }
                                      disabled
                                    />

                                    <input
                                      className="ml-3 py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-2/10"
                                      type="text"
                                      value={testdata.parent_occupaton}
                                      // onChange={(e) =>
                                      //   modalhandleChange("parent_occupaton", e)
                                      // }
                                      disabled
                                    />
                                  </div>
                                </div>
                                <div className="flex flex-col mb-4">
                                  <div className="flex flex-row  ">
                                    <label
                                      className="ml-2 mb-2 pl-1 font-bold text-xl text-gray-900  w-12"
                                      htmlFor="first_name"
                                    ></label>
                                    <label
                                      className="ml-2 mb-2 pl-1 font-bold text-xl text-gray-900  w-full"
                                      htmlFor="first_name"
                                    >
                                      ??????????????????????????????????????????????????????????????????
                                    </label>
                                  </div>

                                  <div className="flex flex-row w-full ">
                                    <label
                                      className="ml-2 mb-2 pl-1 font-bold text-lg text-gray-900  w-12"
                                      htmlFor="first_name"
                                    ></label>
                                    <label
                                      className="ml-2 mb-2 pl-1 text-lg text-gray-900  w-1/4"
                                      htmlFor="first_name"
                                    >
                                      ?????????????????????????????????????????????????????????????????? (??????????????????????????????????????????)
                                    </label>

                                    <label
                                      className="ml-3 mb-2 pl-1 text-lg text-gray-900  w-1/4"
                                      htmlFor="first_name"
                                    >
                                      ???????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????(?????????????????????/?????????
                                      )
                                    </label>
                                  </div>
                                  <div className="flex flex-row mb-4">
                                    <label
                                      className="ml-2 mb-2 pl-1 font-bold text-lg text-gray-900  w-12"
                                      htmlFor="first_name"
                                    ></label>

                                    <input
                                      className="ml-2 py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-1/4"
                                      type="text"
                                      value={testdata.household_member}
                                      disabled
                                      // onChange={(e) =>
                                      //   modalhandleChange("household_member", e)
                                      // }
                                    />
                                    <input
                                      className="ml-3 py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-1/4"
                                      type="text"
                                      value={testdata.hours_family_together}
                                      disabled
                                      // onChange={(e) =>
                                      //   modalhandleChange(
                                      //     "hours_family_together",
                                      //     e
                                      //   )
                                      // }
                                    />
                                  </div>
                                </div>
                                <div className="flex flex-col mb-4">
                                  <div className="flex flex-row  ">
                                    <label
                                      className="ml-2 mb-2 pl-1 font-bold text-xl text-gray-900  w-12"
                                      htmlFor="first_name"
                                    ></label>
                                    <label
                                      className="ml-2 mb-2 pl-1 font-bold text-xl text-gray-900  w-full"
                                      htmlFor="first_name"
                                    >
                                      ??????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
                                    </label>
                                  </div>
                                  <div className="flex flex-row pl-2">
                                    <div className="  ml-2 text-xl text-left  w-1/12"></div>
                                    <div className="   text-xl text-left mt-3 w-1/4">
                                      ????????????
                                    </div>
                                  </div>
                                  <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-12"></div>
                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          class="w-5 h-5 ml-3 rounded"
                                          id="father-1"
                                          type="radio"
                                          value="1"
                                          name="relationship_father_chk"
                                          // onChange={(e) =>
                                          //   onclick(
                                          //     "relationship_father_chk",
                                          //     e
                                          //   )
                                          // }
                                          checked={
                                            testdata.relationship_father_chk ==
                                            "1"
                                              ? true
                                              : false
                                          }
                                          disabled
                                        />
                                        <span class="ml-3" for="father-1">
                                          ?????????????????????
                                        </span>
                                      </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          class="w-5 h-5 ml-3 rounded"
                                          id="father-2"
                                          type="radio"
                                          value="2"
                                          name="relationship_father_chk"
                                          // onChange={(e) =>
                                          //   onclick(
                                          //     "relationship_father_chk",
                                          //     e
                                          //   )
                                          // }
                                          checked={
                                            testdata.relationship_father_chk ==
                                            "2"
                                              ? true
                                              : false
                                          }
                                          disabled
                                        />
                                        <span class="ml-3" for="father-2">
                                          ????????? ???
                                        </span>
                                      </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          class="w-5 h-5 ml-3 rounded"
                                          id="father-3"
                                          type="radio"
                                          value="3"
                                          name="relationship_father_chk"
                                          // onChange={(e) =>
                                          //   onclick(
                                          //     "relationship_father_chk",
                                          //     e
                                          //   )
                                          // }
                                          checked={
                                            testdata.relationship_father_chk ==
                                            "3"
                                              ? true
                                              : false
                                          }
                                          disabled
                                        />
                                        <span class="ml-3" for="father-3">
                                          ????????????????????????
                                        </span>
                                      </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          class="w-5 h-5 ml-3 rounded"
                                          id="father-4"
                                          type="radio"
                                          value="4"
                                          name="relationship_father_chk"
                                          // onChange={(e) =>
                                          //   onclick(
                                          //     "relationship_father_chk",
                                          //     e
                                          //   )
                                          // }
                                          checked={
                                            testdata.relationship_father_chk ==
                                            "4"
                                              ? true
                                              : false
                                          }
                                          disabled
                                        />
                                        <span class="ml-3" for="father-4">
                                          ?????????????????????
                                        </span>
                                      </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          class="w-5 h-5 ml-3 rounded"
                                          id="father-5"
                                          type="radio"
                                          value="5"
                                          name="relationship_father_chk"
                                          // onChange={(e) =>
                                          //   onclick(
                                          //     "relationship_father_chk",
                                          //     e
                                          //   )
                                          // }
                                          checked={
                                            testdata.relationship_father_chk ==
                                            "5"
                                              ? true
                                              : false
                                          }
                                          disabled
                                        />
                                        <span class="ml-3" for="father-5">
                                          ???????????????
                                        </span>
                                      </label>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex flex-col mb-4">
                                  <div className="flex flex-row pl-2  ">
                                    <div className="  ml-2 text-xl text-left  w-1/12"></div>
                                    <div className="   text-xl text-left mt-3 w-1/4">
                                      ???????????????
                                    </div>
                                  </div>
                                  <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-12"></div>
                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          class="w-5 h-5 ml-3 rounded"
                                          id="mother-1"
                                          type="radio"
                                          value="1"
                                          name="relationship_mother_chk"
                                          // onChange={(e) =>
                                          //   onclick(
                                          //     "relationship_mother_chk",
                                          //     e
                                          //   )
                                          // }
                                          checked={
                                            testdata.relationship_mother_chk ==
                                            1
                                              ? true
                                              : false
                                          }
                                          disabled
                                        />
                                        <span class="ml-3" for="mother-1">
                                          ?????????????????????
                                        </span>
                                      </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          class="w-5 h-5 ml-3 rounded"
                                          id="mother-2"
                                          type="radio"
                                          value="2"
                                          name="relationship_mother_chk"
                                          // onChange={(e) =>
                                          //   onclick(
                                          //     "relationship_mother_chk",
                                          //     e
                                          //   )
                                          // }
                                          checked={
                                            testdata.relationship_mother_chk ==
                                            2
                                              ? true
                                              : false
                                          }
                                          disabled
                                        />
                                        <span class="ml-3" for="mother-2">
                                          ????????? ???
                                        </span>
                                      </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          class="w-5 h-5 ml-3 rounded"
                                          id="mother-3"
                                          type="radio"
                                          value="3"
                                          name="relationship_mother_chk"
                                          // onChange={(e) =>
                                          //   onclick(
                                          //     "relationship_mother_chk",
                                          //     e
                                          //   )
                                          // }
                                          checked={
                                            testdata.relationship_mother_chk ==
                                            3
                                              ? true
                                              : false
                                          }
                                          disabled
                                        />
                                        <span class="ml-3" for="mother-3">
                                          ????????????????????????
                                        </span>
                                      </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          class="w-5 h-5 ml-3 rounded"
                                          id="mother-4"
                                          type="radio"
                                          value="4"
                                          name="relationship_mother_chk"
                                          // onChange={(e) =>
                                          //   onclick(
                                          //     "relationship_mother_chk",
                                          //     e
                                          //   )
                                          // }
                                          checked={
                                            testdata.relationship_mother_chk ==
                                            4
                                              ? true
                                              : false
                                          }
                                          disabled
                                        />
                                        <span class="ml-3" for="mother-4">
                                          ?????????????????????
                                        </span>
                                      </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          class="w-5 h-5 ml-3 rounded"
                                          id="mother-5"
                                          type="radio"
                                          value="5"
                                          name="relationship_mother_chk"
                                          // onChange={(e) =>
                                          //   onclick(
                                          //     "relationship_mother_chk",
                                          //     e
                                          //   )
                                          // }
                                          checked={
                                            testdata.relationship_mother_chk ==
                                            5
                                              ? true
                                              : false
                                          }
                                          disabled
                                        />
                                        <span class="ml-3" for="mother-5">
                                          ???????????????
                                        </span>
                                      </label>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex flex-col mb-4">
                                  <div className="flex flex-row pl-2">
                                    <div className="  ml-2 text-xl text-left  w-1/12"></div>
                                    <div className="   text-xl text-left mt-3 w-1/4">
                                      ??????????????????/?????????????????????
                                    </div>
                                  </div>
                                  <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-12"></div>
                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          class="w-5 h-5 ml-3 rounded"
                                          id="sibling-1"
                                          type="radio"
                                          value="1"
                                          name="relationship_brother_chk"
                                          // onChange={(e) =>
                                          //   onclick(
                                          //     "relationship_brother_chk",
                                          //     e
                                          //   )
                                          // }
                                          checked={
                                            testdata.relationship_brother_chk ==
                                            1
                                              ? true
                                              : false
                                          }
                                          disabled
                                        />
                                        <span class="ml-3" for="sibling-1">
                                          ?????????????????????
                                        </span>
                                      </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          class="w-5 h-5 ml-3 rounded"
                                          id="sibling-2"
                                          type="radio"
                                          value="2"
                                          name="relationship_brother_chk"
                                          // onChange={(e) =>
                                          //   onclick(
                                          //     "relationship_brother_chk",
                                          //     e
                                          //   )
                                          // }
                                          checked={
                                            testdata.relationship_brother_chk ==
                                            2
                                              ? true
                                              : false
                                          }
                                          disabled
                                        />
                                        <span class="ml-3" for="sibling-2">
                                          ????????? ???
                                        </span>
                                      </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          class="w-5 h-5 ml-3 rounded"
                                          id="sibling-3"
                                          type="radio"
                                          value="3"
                                          name="relationship_brother_chk"
                                          // onChange={(e) =>
                                          //   onclick(
                                          //     "relationship_brother_chk",
                                          //     e
                                          //   )
                                          // }
                                          checked={
                                            testdata.relationship_brother_chk ==
                                            3
                                              ? true
                                              : false
                                          }
                                          disabled
                                        />
                                        <span class="ml-3" for="sibling-3">
                                          ????????????????????????
                                        </span>
                                      </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          class="w-5 h-5 ml-3 rounded"
                                          id="sibling-4"
                                          type="radio"
                                          value="4"
                                          name="relationship_brother_chk"
                                          // onChange={(e) =>
                                          //   onclick(
                                          //     "relationship_brother_chk",
                                          //     e
                                          //   )
                                          // }
                                          checked={
                                            testdata.relationship_brother_chk ==
                                            4
                                              ? true
                                              : false
                                          }
                                          disabled
                                        />
                                        <span class="ml-3" for="sibling-4">
                                          ?????????????????????
                                        </span>
                                      </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          class="w-5 h-5 ml-3 rounded"
                                          id="sibling-5"
                                          type="radio"
                                          value="5"
                                          name="relationship_brother_chk"
                                          // onChange={(e) =>
                                          //   onclick(
                                          //     "relationship_brother_chk",
                                          //     e
                                          //   )
                                          // }
                                          checked={
                                            testdata.relationship_brother_chk ==
                                            5
                                              ? true
                                              : false
                                          }
                                          disabled
                                        />
                                        <span class="ml-3" for="sibling-5">
                                          ???????????????
                                        </span>
                                      </label>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex flex-col mb-4">
                                  <div className="flex flex-row pl-2">
                                    <div className="  ml-2 text-xl text-left  w-1/12"></div>
                                    <div className="   text-xl text-left mt-3 w-1/4">
                                      ??????????????????/?????????????????????
                                    </div>
                                  </div>
                                  <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-12"></div>
                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          class="w-5 h-5 ml-3 rounded"
                                          id="sister-1"
                                          type="radio"
                                          value="1"
                                          name="relationship_sister_chk"
                                          // onChange={(e) =>
                                          //   onclick(
                                          //     "relationship_sister_chk",
                                          //     e
                                          //   )
                                          // }
                                          checked={
                                            testdata.relationship_sister_chk ==
                                            1
                                              ? true
                                              : false
                                          }
                                          disabled
                                        />
                                        <span class="ml-3" for="sister-1">
                                          ?????????????????????
                                        </span>
                                      </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          class="w-5 h-5 ml-3 rounded"
                                          id="sister-2"
                                          type="radio"
                                          value="2"
                                          name="relationship_sister_chk"
                                          // onChange={(e) =>
                                          //   onclick(
                                          //     "relationship_sister_chk",
                                          //     e
                                          //   )
                                          // }
                                          checked={
                                            testdata.relationship_sister_chk ==
                                            2
                                              ? true
                                              : false
                                          }
                                          disabled
                                        />
                                        <span class="ml-3" for="sister-2">
                                          ????????? ???
                                        </span>
                                      </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          class="w-5 h-5 ml-3 rounded"
                                          id="sister-3"
                                          type="radio"
                                          value="3"
                                          name="relationship_sister_chk"
                                          // onChange={(e) =>
                                          //   onclick(
                                          //     "relationship_sister_chk",
                                          //     e
                                          //   )
                                          // }
                                          checked={
                                            testdata.relationship_sister_chk ==
                                            3
                                              ? true
                                              : false
                                          }
                                          disabled
                                        />
                                        <span class="ml-3" for="sister-3">
                                          ????????????????????????
                                        </span>
                                      </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          class="w-5 h-5 ml-3 rounded"
                                          id="sister-4"
                                          type="radio"
                                          value="4"
                                          name="relationship_sister_chk"
                                          // onChange={(e) =>
                                          //   onclick(
                                          //     "relationship_sister_chk",
                                          //     e
                                          //   )
                                          // }
                                          checked={
                                            testdata.relationship_sister_chk ==
                                            4
                                              ? true
                                              : false
                                          }
                                          disabled
                                        />
                                        <span class="ml-3" for="sister-4">
                                          ?????????????????????
                                        </span>
                                      </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          class="w-5 h-5 ml-3 rounded"
                                          id="sister-5"
                                          type="radio"
                                          value="5"
                                          name="relationship_sister_chk"
                                          // onChange={(e) =>
                                          //   onclick(
                                          //     "relationship_sister_chk",
                                          //     e
                                          //   )
                                          // }
                                          checked={
                                            testdata.relationship_sister_chk ==
                                            5
                                              ? true
                                              : false
                                          }
                                          disabled
                                        />
                                        <span class="ml-3" for="sister-5">
                                          ???????????????
                                        </span>
                                      </label>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex flex-col mb-4">
                                  <div className="flex flex-row pl-2">
                                    <div className="  ml-2 text-xl text-left  w-1/12"></div>
                                    <div className="   text-xl text-left mt-3 w-1/4">
                                      ?????????/?????????/??????/?????????
                                    </div>
                                  </div>
                                  <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-12"></div>
                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          class="w-5 h-5 ml-3 rounded"
                                          id="grandparents-1"
                                          type="radio"
                                          value="1"
                                          name="relationship_grand"
                                          // onChange={(e) =>
                                          //   onclick("relationship_grand", e)
                                          // }
                                          checked={
                                            testdata.relationship_grand == 1
                                              ? true
                                              : false
                                          }
                                          disabled
                                        />
                                        <span class="ml-3" for="grandparents-1">
                                          ?????????????????????
                                        </span>
                                      </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          class="w-5 h-5 ml-3 rounded"
                                          id="grandparents-2"
                                          type="radio"
                                          value="2"
                                          name="relationship_grand"
                                          // onChange={(e) =>
                                          //   onclick("relationship_grand", e)
                                          // }
                                          checked={
                                            testdata.relationship_grand == 2
                                              ? true
                                              : false
                                          }
                                          disabled
                                        />
                                        <span class="ml-3" for="grandparents-2">
                                          ????????? ???
                                        </span>
                                      </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          class="w-5 h-5 ml-3 rounded"
                                          id="grandparents-3"
                                          type="radio"
                                          value="3"
                                          name="relationship_grand"
                                          // onChange={(e) =>
                                          //   onclick("relationship_grand", e)
                                          // }
                                          checked={
                                            testdata.relationship_grand == 3
                                              ? true
                                              : false
                                          }
                                          disabled
                                        />
                                        <span class="ml-3" for="grandparents-3">
                                          ????????????????????????
                                        </span>
                                      </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          class="w-5 h-5 ml-3 rounded"
                                          id="grandparents-4"
                                          type="radio"
                                          value="4"
                                          name="relationship_grand"
                                          // onChange={(e) =>
                                          //   onclick("relationship_grand", e)
                                          // }
                                          checked={
                                            testdata.relationship_grand == 4
                                              ? true
                                              : false
                                          }
                                          disabled
                                        />
                                        <span class="ml-3" for="grandparents-4">
                                          ?????????????????????
                                        </span>
                                      </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          class="w-5 h-5 ml-3 rounded"
                                          id="grandparents-5"
                                          type="radio"
                                          value="5"
                                          name="relationship_grand"
                                          // onChange={(e) =>
                                          //   onclick("relationship_grand", e)
                                          // }
                                          checked={
                                            testdata.relationship_grand == 5
                                              ? true
                                              : false
                                          }
                                          disabled
                                        />
                                        <span class="ml-3" for="grandparents-5">
                                          ???????????????
                                        </span>
                                      </label>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex flex-col mb-4">
                                  <div className="flex flex-row pl-2">
                                    <div className="  ml-2 text-xl text-left  w-1/12"></div>
                                    <div className="   text-xl text-left mt-3 w-1/4">
                                      ????????????
                                    </div>
                                  </div>
                                  <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-12"></div>
                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          class="w-5 h-5 ml-3 rounded"
                                          id="relative-1"
                                          type="radio"
                                          value="1"
                                          name="relationship_relative"
                                          // onChange={(e) =>
                                          //   onclick("relationship_relative", e)
                                          // }
                                          checked={
                                            testdata.relationship_relative == 1
                                              ? true
                                              : false
                                          }
                                          disabled
                                        />
                                        <span class="ml-3" for="relative-1">
                                          ?????????????????????
                                        </span>
                                      </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          class="w-5 h-5 ml-3 rounded"
                                          id="relative-2"
                                          type="radio"
                                          value="2"
                                          name="relationship_relative"
                                          // onChange={(e) =>
                                          //   onclick("relationship_relative", e)
                                          // }
                                          checked={
                                            testdata.relationship_relative == 2
                                              ? true
                                              : false
                                          }
                                          disabled
                                        />
                                        <span class="ml-3" for="relative-2">
                                          ????????? ???
                                        </span>
                                      </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          class="w-5 h-5 ml-3 rounded"
                                          id="relative-3"
                                          type="radio"
                                          value="3"
                                          name="relationship_relative"
                                          // onChange={(e) =>
                                          //   onclick("relationship_relative", e)
                                          // }
                                          checked={
                                            testdata.relationship_relative == 3
                                              ? true
                                              : false
                                          }
                                          disabled
                                        />
                                        <span class="ml-3" for="relative-3">
                                          ????????????????????????
                                        </span>
                                      </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          class="w-5 h-5 ml-3 rounded"
                                          id="relative-4"
                                          type="radio"
                                          value="4"
                                          name="relationship_relative"
                                          // onChange={(e) =>
                                          //   onclick("relationship_relative", e)
                                          // }
                                          checked={
                                            testdata.relationship_relative == 4
                                              ? true
                                              : false
                                          }
                                          disabled
                                        />
                                        <span class="ml-3" for="relative-4">
                                          ?????????????????????
                                        </span>
                                      </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          class="w-5 h-5 ml-3 rounded"
                                          id="relative-5"
                                          type="radio"
                                          value="5"
                                          name="relationship_relative"
                                          // onChange={(e) =>
                                          //   onclick("relationship_relative", e)
                                          // }
                                          checked={
                                            testdata.relationship_relative == 5
                                              ? true
                                              : false
                                          }
                                          disabled
                                        />
                                        <span class="ml-3" for="relative-5">
                                          ???????????????
                                        </span>
                                      </label>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex flex-col mb-4">
                                  <div className="flex flex-row pl-2">
                                    <div className="  ml-2 text-xl text-left  w-1/12"></div>
                                    <div className="   text-xl text-left mt-3 ">
                                      ???????????????
                                    </div>
                                    <input
                                      className="ml-2 py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-2/6"
                                      type="text"
                                      // onChange={(e) =>
                                      //   modalhandleChange(
                                      //     "relationship_other_name",
                                      //     e
                                      //   )
                                      // }
                                      disabled
                                    />
                                  </div>
                                  <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-12"></div>
                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          class="w-5 h-5 ml-3 rounded"
                                          id="other-1"
                                          type="radio"
                                          value="1"
                                          name="relationship_other"
                                          // onChange={(e) =>
                                          //   onclick("relationship_other", e)
                                          // }
                                          checked={
                                            testdata.relationship_other == 1
                                              ? true
                                              : false
                                          }
                                          disabled
                                        />
                                        <span class="ml-3" for="other-1">
                                          ?????????????????????
                                        </span>
                                      </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          class="w-5 h-5 ml-3 rounded"
                                          id="other-2"
                                          type="radio"
                                          value="2"
                                          name="relationship_other"
                                          // onChange={(e) =>
                                          //   onclick("relationship_other", e)
                                          // }
                                          checked={
                                            testdata.relationship_other == 2
                                              ? true
                                              : false
                                          }
                                          disabled
                                        />
                                        <span class="ml-3" for="other-2">
                                          ????????? ???
                                        </span>
                                      </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          class="w-5 h-5 ml-3 rounded"
                                          id="other-3"
                                          type="radio"
                                          value="3"
                                          name="relationship_other"
                                          // onChange={(e) =>
                                          //   onclick("relationship_other", e)
                                          // }
                                          checked={
                                            testdata.relationship_other == 3
                                              ? true
                                              : false
                                          }
                                          disabled
                                        />
                                        <span class="ml-3" for="other-3">
                                          ????????????????????????
                                        </span>
                                      </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          class="w-5 h-5 ml-3 rounded"
                                          id="other-4"
                                          type="radio"
                                          value="4"
                                          name="relationship_other"
                                          // onChange={(e) =>
                                          //   onclick("relationship_other", e)
                                          // }
                                          checked={
                                            testdata.relationship_other == 4
                                              ? true
                                              : false
                                          }
                                          disabled
                                        />
                                        <span class="ml-3" for="other-4">
                                          ?????????????????????
                                        </span>
                                      </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          class="w-5 h-5 ml-3 rounded"
                                          id="other-5"
                                          type="radio"
                                          value="5"
                                          name="relationship_other"
                                          // onChange={(e) =>
                                          //   onclick("relationship_other", e)
                                          // }
                                          checked={
                                            testdata.relationship_other == 5
                                              ? true
                                              : false
                                          }
                                          disabled
                                        />
                                        <span class="ml-3" for="other-5">
                                          ???????????????
                                        </span>
                                      </label>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex flex-col mb-4">
                                  <div className="flex flex-row pl-2 mt-5">
                                    <label
                                      className="ml-2 mb-2 pl-1 font-bold text-xl text-gray-900  w-12"
                                      htmlFor="first_name"
                                    ></label>
                                    <label
                                      className="ml-2 mb-2 pl-1 font-bold text-xl text-gray-900  w-full"
                                      htmlFor="first_name"
                                    >
                                      ????????????????????????????????????????????????????????????????????????
                                      ???????????????????????????????????????????????????????????????????????????
                                    </label>
                                  </div>
                                  <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-12"></div>
                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          class="w-5 h-5 ml-3 rounded"
                                          id="housevisit-1"
                                          type="radio"
                                          value="1"
                                          name="parents_leave_child_with_someone"
                                          // onChange={(e) =>
                                          //   onclick(
                                          //     "parents_leave_child_with_someone",
                                          //     e
                                          //   )
                                          // }
                                          checked={
                                            testdata.parents_leave_child_with_someone ==
                                            1
                                              ? true
                                              : false
                                          }
                                          disabled
                                        />
                                        <span class="ml-3" for="housevisit-1">
                                          ????????????
                                        </span>
                                      </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          class="w-5 h-5 ml-3 rounded"
                                          id="housevisit-2"
                                          type="radio"
                                          value="2"
                                          name="parents_leave_child_with_someone"
                                          // onChange={(e) =>
                                          //   onclick(
                                          //     "parents_leave_child_with_someone",
                                          //     e
                                          //   )
                                          // }
                                          checked={
                                            testdata.parents_leave_child_with_someone ==
                                            2
                                              ? true
                                              : false
                                          }
                                          disabled
                                        />
                                        <span class="ml-3" for="housevisit-2">
                                          ??????????????????????????????
                                        </span>
                                      </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          class="w-5 h-5 ml-3 rounded"
                                          id="housevisit-3"
                                          type="radio"
                                          value="3"
                                          name="parents_leave_child_with_someone"
                                          // onChange={(e) =>
                                          //   onclick(
                                          //     "parents_leave_child_with_someone",
                                          //     e
                                          //   )
                                          // }
                                          checked={
                                            testdata.parents_leave_child_with_someone ==
                                            3
                                              ? true
                                              : false
                                          }
                                          disabled
                                        />
                                        <span class="ml-3" for="housevisit-3">
                                          ???????????????????????????????????????????????????????????????????????????
                                        </span>
                                      </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          class="w-5 h-5 ml-3 rounded"
                                          id="housevisit-4"
                                          type="radio"
                                          value="4"
                                          name="parents_leave_child_with_someone"
                                          // onChange={(e) =>
                                          //   onclick(
                                          //     "parents_leave_child_with_someone",
                                          //     e
                                          //   )
                                          // }
                                          checked={
                                            testdata.parents_leave_child_with_someone ==
                                            4
                                              ? true
                                              : false
                                          }
                                          disabled
                                        />
                                        <span class="ml-3" for="housevisit-4">
                                          ???????????? ???{" "}
                                        </span>
                                        <input
                                          className="ml-2 py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-1/4"
                                          type="text"
                                          value={
                                            testdata.parents_leave_child_with_someone_other
                                          }
                                          // onChange={(e) =>
                                          //   onclick(
                                          //     "parents_leave_child_with_someone_other",
                                          //     e
                                          //   )
                                          // }
                                          disabled
                                        />
                                      </label>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex flex-col mb-4">
                                  <div className="flex flex-row w-full mt-4">
                                    <label
                                      className="ml-2 mb-2 pl-1 font-bold text-lg text-gray-900  w-12"
                                      htmlFor="first_name"
                                    ></label>
                                    <label
                                      className="ml-2 mb-2 pl-1 text-lg text-gray-900  w-1/4"
                                      htmlFor="first_name"
                                    >
                                      ???????????????????????????????????????????????????????????????
                                    </label>
                                  </div>
                                  <div className="flex flex-row mb-4 mt-2">
                                    <label
                                      className="ml-2 mb-2 pl-1 font-bold text-lg text-gray-900  w-12"
                                      htmlFor="first_name"
                                    ></label>

                                    <input
                                      className="ml-2 py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-1/4"
                                      type="text"
                                      value={testdata.household_income}
                                      disabled
                                      // onChange={(e) =>
                                      //   onclick("household_income", e)
                                      // }
                                    />
                                  </div>
                                </div>
                                <div className="flex flex-col mb-4">
                                  <div className="flex flex-row w-full mt-4">
                                    <label
                                      className="ml-2 mb-2 pl-1 font-bold text-lg text-gray-900  w-12"
                                      htmlFor="first_name"
                                    ></label>
                                    <label
                                      className="ml-2 mb-2 pl-1 text-lg text-gray-900  w-1/4"
                                      htmlFor="first_name"
                                    >
                                      ????????????????????????????????????????????????????????????????????????
                                    </label>
                                    <label
                                      className="ml-3 mb-2 pl-1 text-lg text-gray-900  w-1/4"
                                      htmlFor="first_name"
                                    >
                                      ??????????????????????????????????????????????????????????????????????????????????????????
                                    </label>
                                  </div>
                                  <div className="flex flex-row mb-4 mt-2">
                                    <label
                                      className="ml-2 mb-2 pl-1 font-bold text-lg text-gray-900  w-12"
                                      htmlFor="first_name"
                                    ></label>

                                    <input
                                      className="ml-2 py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-1/4"
                                      type="text"
                                      value={testdata.receive_expenses_from}
                                      disabled
                                      // onChange={(e) =>
                                      //   onclick("receive_expenses_from", e)
                                      // }
                                    />
                                    <input
                                      className="ml-3 py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-1/4"
                                      type="text"
                                      value={testdata.money_to_school}
                                      disabled
                                      // onChange={(e) =>
                                      //   onclick("money_to_school", e)
                                      // }
                                    />
                                  </div>
                                </div>
                                <div className="flex flex-col mb-4">
                                  <div className="flex flex-row w-full mt-4">
                                    <label
                                      className="ml-2 mb-2 pl-1 font-bold text-lg text-gray-900  w-12"
                                      htmlFor="first_name"
                                    ></label>
                                    <label
                                      className="ml-2 mb-2 pl-1 text-lg text-gray-900  w-1/4"
                                      htmlFor="first_name"
                                    >
                                      ??????????????????????????????????????????????????????????????? (???????????????)
                                    </label>
                                    <label
                                      className="ml-3 mb-2 pl-1 text-lg text-gray-900  w-1/4"
                                      htmlFor="first_name"
                                    >
                                      ?????????????????????????????????
                                    </label>
                                  </div>
                                  <div className="flex flex-row mb-4 mt-2">
                                    <label
                                      className="ml-2 mb-2 pl-1 font-bold text-lg text-gray-900  w-12"
                                      htmlFor="first_name"
                                    ></label>

                                    <input
                                      className="ml-2 py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-1/4"
                                      type="text"
                                      value={testdata.work_to_earn}
                                      disabled
                                      // onChange={(e) =>
                                      //   onclick("work_to_earn", e)
                                      // }
                                    />
                                    <input
                                      className="ml-3 py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-1/4"
                                      type="text"
                                      value={testdata.work_to_earn_inc_perday}
                                      disabled
                                      // onChange={(e) =>
                                      //   onclick("work_to_earn_inc_perday", e)
                                      // }
                                    />
                                  </div>
                                </div>
                                <div className="flex flex-col mb-4">
                                  <div className="flex flex-row pl-2 mt-5">
                                    <label
                                      className="ml-2 mb-2 pl-1 font-bold text-xl text-gray-900  w-12"
                                      htmlFor="first_name"
                                    ></label>
                                    <label
                                      className="ml-2 mb-2 pl-1 font-bold text-xl text-gray-900  w-full"
                                      htmlFor="first_name"
                                    >
                                      ?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
                                    </label>
                                  </div>
                                  <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-12"></div>

                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          type="checkbox"
                                          class="w-5 h-5 ml-3 rounded md:w-5 md:h-5"
                                          // value={
                                          //   testdata.want_schools_help.study
                                          // }
                                          // onChange={(e) =>
                                          //   checkboxclick(
                                          //     "want_schools_help",
                                          //     "study",
                                          //     e
                                          //   )
                                          // }
                                          checked={
                                            testdata.want_schools_help.study ==
                                            1
                                              ? true
                                              : false
                                          }
                                          disabled
                                        />
                                        <span class="ml-3">????????????????????????????????????</span>
                                      </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          type="checkbox"
                                          class="w-5 h-5 ml-3 rounded md:w-5 md:h-5"
                                          // value={
                                          //   testdata.want_schools_help.behavior
                                          // }
                                          // onChange={(e) =>
                                          //   checkboxclick(
                                          //     "want_schools_help",
                                          //     "behavior",
                                          //     e
                                          //   )
                                          // }
                                          checked={
                                            testdata.want_schools_help
                                              .behavior == 1
                                              ? true
                                              : false
                                          }
                                          disabled
                                        />
                                        <span class="ml-3">????????????????????????????????????</span>
                                      </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          type="checkbox"
                                          class="w-5 h-5 ml-3 rounded md:w-5 md:h-5"
                                          // value={testdata.want_schools_help.eco}
                                          // onChange={(e) =>
                                          //   checkboxclick(
                                          //     "want_schools_help",
                                          //     "eco",
                                          //     e
                                          //   )
                                          // }
                                          checked={
                                            testdata.want_schools_help.eco == 1
                                              ? true
                                              : false
                                          }
                                          disabled
                                        />
                                        <span class="ml-3">????????????????????????????????????</span>
                                      </label>
                                    </div>
                                    <div class="mt-2 flex justify-center ">
                                      <label class="inline-flex items-center">
                                        <input
                                          type="checkbox"
                                          class="w-5 h-5 ml-3 rounded"
                                          // value={
                                          //   testdata.want_schools_help.other
                                          // }
                                          // onChange={(e) =>
                                          //   checkboxclick(
                                          //     "want_schools_help",
                                          //     "other",
                                          //     e
                                          //   )
                                          // }
                                          checked={
                                            testdata.want_schools_help.other ==
                                            1
                                              ? true
                                              : false
                                          }
                                          disabled
                                        />
                                        <span class="ml-3">???????????? ???</span>
                                        <input
                                          className="ml-3 py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-1/4"
                                          type="text"
                                          value={
                                            testdata.want_schools_help_other
                                          }
                                          // onChange={(e) =>
                                          //   modalhandleChange(
                                          //     "want_schools_help_other",
                                          //     e
                                          //   )
                                          // }
                                          disabled
                                        />
                                      </label>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex flex-col mb-4">
                                  <div className="flex flex-row pl-2 mt-5">
                                    <label
                                      className="ml-2 mb-2 pl-1 font-bold text-xl text-gray-900  w-12"
                                      htmlFor="first_name"
                                    ></label>
                                    <label
                                      className="ml-2 mb-2 pl-1 font-bold text-xl text-gray-900  w-full"
                                      htmlFor="first_name"
                                    >
                                      ???????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
                                    </label>
                                  </div>
                                  <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-12"></div>

                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          type="checkbox"
                                          class="w-5 h-5 ml-3 rounded"
                                          // value={testdata.agency_help.elderly}
                                          // onChange={(e) =>
                                          //   checkboxclick(
                                          //     "agency_help",
                                          //     "elderly",
                                          //     e
                                          //   )
                                          // }
                                          checked={
                                            testdata.agency_help.elderly == 1
                                              ? true
                                              : false
                                          }
                                          disabled
                                        />
                                        <span class="ml-3">??????????????????????????????????????????</span>
                                      </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          type="checkbox"
                                          class="w-5 h-5 ml-3 rounded"
                                          // value={
                                          //   testdata.agency_help.disability
                                          // }
                                          // onChange={(e) =>
                                          //   checkboxclick(
                                          //     "agency_help",
                                          //     "disability",
                                          //     e
                                          //   )
                                          // }
                                          checked={
                                            testdata.agency_help.disability == 1
                                              ? true
                                              : false
                                          }
                                          disabled
                                        />

                                        <span class="ml-3">?????????????????????????????? </span>
                                      </label>
                                    </div>

                                    <div class="mt-2 flex justify-center ">
                                      <label class="inline-flex items-center">
                                        <input
                                          type="checkbox"
                                          class="w-5 h-5 ml-3 rounded"
                                          // value={testdata.agency_help.other}
                                          // onChange={(e) =>
                                          //   checkboxclick(
                                          //     "agency_help",
                                          //     "other",
                                          //     e
                                          //   )
                                          // }
                                          checked={
                                            testdata.agency_help.other == 1
                                              ? true
                                              : false
                                          }
                                          disabled
                                        />
                                        <span class="ml-3">???????????????</span>
                                        <input
                                          className="ml-3 py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-1/4"
                                          type="text"
                                          value={testdata.agency_help_other}
                                          // onChange={(e) =>
                                          //   modalhandleChange(
                                          //     "agency_help_other",
                                          //     e
                                          //   )
                                          // }
                                          disabled
                                        />
                                      </label>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex flex-col mb-4">
                                  <div className="flex flex-row pl-2 mt-5">
                                    <label
                                      className=" mb-2 pl-1 font-bold text-xl text-gray-900  w-1/12"
                                      htmlFor="first_name"
                                    ></label>
                                    <label
                                      className="ml-3 mb-2 pl-1 text-lg text-gray-900  w-full"
                                      htmlFor="first_name"
                                    >
                                      ??????????????????????????????????????????????????????????????????????????????????????????????????????????????????
                                    </label>
                                  </div>
                                  <div class="flex flex-row pl-2 mt-3">
                                    <label
                                      className="ml-2 mb-2 pl-1 font-bold text-lg text-gray-900  w-12"
                                      htmlFor="first_name"
                                    ></label>
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
                                      placeholder="Your message..."
                                      // onChange={(e) =>
                                      //   modalhandleChange("Parents_concern", e)
                                      // }
                                      disabled
                                    ></textarea>
                                  </div>
                                </div>
                                <div className="flex flex-col mb-4">
                                  <div className="flex flex-row pl-2 mt-5">
                                    <label
                                      className="ml-2 mb-2 pl-1 font-bold text-xl text-gray-900  w-12"
                                      htmlFor="first_name"
                                    ></label>

                                    <label
                                      className="ml-2 mb-2 pl-1 font-bold text-xl text-gray-900  w-full"
                                      htmlFor="first_name"
                                    >
                                      ???????????????????????????????????????????????????
                                      ????????????????????????????????????????????????????????????????????????????????????????????????????????????
                                    </label>
                                  </div>
                                  <div className="flex flex-row pl-2 mt-5">
                                    <label
                                      className=" mb-2 pl-1 font-bold text-xl text-gray-900  w-1/12"
                                      htmlFor="first_name"
                                    ></label>
                                    <label
                                      className="ml-3 mb-2 pl-1 text-lg text-gray-900  w-full"
                                      htmlFor="first_name"
                                    >
                                      ?????????????????????????????????????????????????????????????????? ??????????????????
                                    </label>
                                  </div>
                                  <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-12"></div>

                                    <div class="mt-2 flex justify-left w-1/3">
                                      <label class="inline-flex items-center">
                                        <input
                                          type="checkbox"
                                          class="w-5 h-5 ml-3 rounded"
                                          // value={
                                          //   testdata.dependency.handicapped
                                          // }
                                          // onChange={(e) =>
                                          //   checkboxclick(
                                          //     "dependency",
                                          //     "handicapped",
                                          //     e
                                          //   )
                                          // }
                                          checked={
                                            testdata.dependency.handicapped == 1
                                              ? true
                                              : false
                                          }
                                          disabled
                                        />
                                        <span class="ml-3">???????????????????????????</span>
                                      </label>
                                    </div>
                                    <div class="mt-2 flex justify-left w-1/3">
                                      <label class="inline-flex items-center">
                                        <input
                                          type="checkbox"
                                          class="w-5 h-5 ml-3 rounded"
                                          // value={testdata.dependency.elderly}
                                          // onChange={(e) =>
                                          //   checkboxclick(
                                          //     "dependency",
                                          //     "elderly",
                                          //     e
                                          //   )
                                          // }
                                          checked={
                                            testdata.dependency.elderly == 1
                                              ? true
                                              : false
                                          }
                                          disabled
                                        />
                                        <span class="ml-3">
                                          ?????????????????????????????????????????? 60 ??????
                                        </span>
                                      </label>
                                    </div>
                                  </div>
                                  <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-12"></div>

                                    <div class="mt-2 flex justify-left w-1/3">
                                      <label class="inline-flex items-center">
                                        <input
                                          type="checkbox"
                                          class="w-5 h-5 ml-3 rounded"
                                          // value={testdata.dependency.singlefm}
                                          // onChange={(e) =>
                                          //   checkboxclick(
                                          //     "dependency",
                                          //     "singlefm",
                                          //     e
                                          //   )
                                          // }
                                          checked={
                                            testdata.dependency.singlefm == 1
                                              ? true
                                              : false
                                          }
                                          disabled
                                        />
                                        <span class="ml-3">
                                          ?????????????????????/?????????????????????????????????????????????
                                        </span>
                                      </label>
                                    </div>
                                    <div class="mt-2 flex justify-left w-1/3">
                                      <label class="inline-flex items-center">
                                        <input
                                          type="checkbox"
                                          class="w-5 h-5 ml-3 rounded"
                                          // value={testdata.dependency.unemployed}
                                          // onChange={(e) =>
                                          //   checkboxclick(
                                          //     "dependency",
                                          //     "unemployed",
                                          //     e
                                          //   )
                                          // }
                                          checked={
                                            testdata.dependency.unemployed == 1
                                              ? true
                                              : false
                                          }
                                          disabled
                                        />
                                      </label>
                                      <span class="ml-3">
                                        ???????????????????????? 15-65 ???????????????????????????
                                        (???????????????????????????????????????????????????/????????????????????????)
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex flex-col mb-4">
                                  <div className="flex flex-row pl-2 mt-5">
                                    <label
                                      className=" mb-2 pl-1 font-bold text-xl text-gray-900  w-1/12"
                                      htmlFor="first_name"
                                    ></label>
                                    <label
                                      className="ml-3 mb-2 pl-1 text-lg text-gray-900  w-1/4"
                                      htmlFor="first_name"
                                    >
                                      ?????????????????????????????????????????????????????? ???????????????
                                    </label>
                                  </div>
                                  <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-12"></div>

                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          type="checkbox"
                                          class="w-5 h-5 ml-3 rounded"
                                          // value={testdata.housing_type.house}
                                          // onChange={(e) =>
                                          //   checkboxclick(
                                          //     "housing_type",
                                          //     "house",
                                          //     e
                                          //   )
                                          // }
                                          checked={
                                            testdata.housing_type.house == 1
                                              ? true
                                              : false
                                          }
                                          disabled
                                        />
                                        <span class="ml-3">???????????????????????????????????? </span>
                                      </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          type="checkbox"
                                          class="w-5 h-5 ml-3 rounded"
                                          // value={
                                          //   testdata.housing_type.rental_house
                                          // }
                                          // onChange={(e) =>
                                          //   checkboxclick(
                                          //     "housing_type",
                                          //     "rental_house",
                                          //     e
                                          //   )
                                          // }
                                          checked={
                                            testdata.housing_type
                                              .rental_house == 1
                                              ? true
                                              : false
                                          }
                                          disabled
                                        />
                                        <span class="ml-3">????????????????????????</span>
                                      </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          type="checkbox"
                                          class="w-5 h-5 ml-3 rounded"
                                          // value={
                                          //   testdata.housing_type.with_others
                                          // }
                                          // onChange={(e) =>
                                          //   checkboxclick(
                                          //     "housing_type",
                                          //     "with_others",
                                          //     e
                                          //   )
                                          // }
                                          checked={
                                            testdata.housing_type.with_others ==
                                            1
                                              ? true
                                              : false
                                          }
                                          disabled
                                        />
                                        <span class="ml-3">
                                          ?????????????????????????????????????????????????????????
                                        </span>
                                      </label>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex flex-col mb-4">
                                  <div className="flex flex-row pl-2 mt-5">
                                    <label
                                      className=" mb-2 pl-1 font-bold text-xl text-gray-900  w-1/12"
                                      htmlFor="first_name"
                                    ></label>
                                    <label
                                      className="ml-3 mb-2 pl-1 text-lg text-gray-900  w-1/4"
                                      htmlFor="first_name"
                                    >
                                      ???????????????????????????????????????????????? ??????????????????
                                    </label>
                                  </div>
                                  <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-12"></div>

                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          type="checkbox"
                                          class="w-5 h-5 ml-3 rounded"
                                          // value={
                                          //   testdata.housing_envir
                                          //     .dilapidated_house
                                          // }
                                          // onChange={(e) =>
                                          //   checkboxclick(
                                          //     "housing_envir",
                                          //     "dilapidated_house",
                                          //     e
                                          //   )
                                          // }
                                          checked={
                                            testdata.housing_envir
                                              .dilapidated_house == 1
                                              ? true
                                              : false
                                          }
                                          disabled
                                        />
                                        <span class="ml-3">
                                          ??????????????????????????????????????????????????????????????? ????????????
                                          ?????????????????????????????????????????????????????????????????? ???????????? ??????????????????
                                          ??????????????????????????????????????????????????????????????????{" "}
                                        </span>
                                      </label>
                                    </div>
                                  </div>
                                  <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-12"></div>

                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          type="checkbox"
                                          class="w-5 h-5 ml-3 rounded"
                                          // value={
                                          //   testdata.housing_envir.no_toilets
                                          // }
                                          // onChange={(e) =>
                                          //   checkboxclick(
                                          //     "housing_envir",
                                          //     "no_toilets",
                                          //     e
                                          //   )
                                          // }
                                          checked={
                                            testdata.housing_envir.no_toilets ==
                                            1
                                              ? true
                                              : false
                                          }
                                          disabled
                                        />
                                        <span class="ml-3">
                                          ????????????????????????????????????????????????????????????????????????????????????????????????????????????
                                        </span>
                                      </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          type="checkbox"
                                          class="w-5 h-5 ml-3 rounded"
                                          // value={testdata.housing_envir.other}
                                          // onChange={(e) =>
                                          //   checkboxclick(
                                          //     "housing_envir",
                                          //     "other",
                                          //     e
                                          //   )
                                          // }
                                          checked={
                                            testdata.housing_envir.other == 1
                                              ? true
                                              : false
                                          }
                                          disabled
                                        />
                                        <span class="ml-3">???????????? ???</span>
                                        <input
                                          className="ml-2 py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-2/6"
                                          type="text"
                                          value={testdata.housing_envir_other}
                                          // onChange={(e) =>
                                          //   modalhandleChange(
                                          //     "housing_envir_other",
                                          //     e
                                          //   )
                                          // }
                                          disabled
                                        />
                                      </label>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex flex-col mb-4">
                                  <div className="flex flex-row pl-2 mt-5">
                                    <label
                                      className="ml-2 mb-2 pl-1 font-bold text-xl text-gray-900  w-12"
                                      htmlFor="first_name"
                                    ></label>
                                    <label
                                      className="ml-2 mb-2 pl-1 font-bold text-xl text-gray-900  w-full"
                                      htmlFor="first_name"
                                    >
                                      ????????????????????????????????????????????????????????? (??????????????????????????????????????? 1 ?????????)
                                    </label>
                                  </div>
                                  <div className="flex flex-row pl-2 mt-5">
                                    <label
                                      className=" mb-2 pl-1 font-bold text-xl text-gray-900  w-1/12"
                                      htmlFor="first_name"
                                    ></label>
                                    <label
                                      className="ml-3 mb-2 pl-1 text-lg text-gray-900  w-1/4"
                                      htmlFor="first_name"
                                    >
                                      ???????????????????????????????????????
                                    </label>
                                  </div>
                                  <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-12"></div>

                                    <div class="mt-2 flex justify-center form-check form-check-inline">
                                      <label class="inline-flex items-center">
                                        <input
                                          class="w-5 h-5 ml-3 rounded"
                                          id="motorcycle-1"
                                          type="radio"
                                          value="1"
                                          name="motorcycle"
                                          // onChange={(e) =>
                                          //   onclick("motorcycle", e)
                                          // }
                                          checked={
                                            testdata.fm_vehicle.moto == 1
                                              ? true
                                              : false
                                          }
                                          disabled
                                        />
                                        <span class="ml-3" for="motorcycle">
                                          ??????
                                        </span>
                                      </label>
                                    </div>
                                    <div class="mt-2 flex justify-center form-check form-check-inline">
                                      <label class="inline-flex items-center ">
                                        <input
                                          class="w-5 h-5 ml-3 rounded"
                                          id="motorcycle-2"
                                          type="radio"
                                          value="2"
                                          name="motorcycle"
                                          // onChange={(e) =>
                                          //   onclick("motorcycle", e)
                                          // }
                                          checked={
                                            testdata.fm_vehicle.moto == 2
                                              ? true
                                              : false
                                          }
                                          disabled
                                        />
                                        <span class="ml-3 " for="motorcycle-2">
                                          ???????????????
                                        </span>
                                      </label>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex flex-col mb-4">
                                  <div className="flex flex-row pl-2 mt-5">
                                    <label
                                      className=" mb-2 pl-1 font-bold text-xl text-gray-900  w-1/12"
                                      htmlFor="first_name"
                                    ></label>
                                    <label
                                      className="ml-3 mb-2 pl-1 text-lg text-gray-900  w-1/4"
                                      htmlFor="first_name"
                                    >
                                      ????????????????????????????????????????????????
                                    </label>
                                  </div>
                                  <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-12"></div>

                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          class="w-5 h-5 ml-3 rounded"
                                          id="car-1"
                                          type="radio"
                                          value="1"
                                          name="car"
                                          // onChange={(e) => onclick("car", e)}
                                          checked={
                                            testdata.fm_vehicle.car == 1
                                              ? true
                                              : false
                                          }
                                          disabled
                                        />
                                        <span class="ml-3" for="car-1">
                                          ??????
                                        </span>
                                      </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          class="w-5 h-5 ml-3 rounded"
                                          id="car-2"
                                          type="radio"
                                          value="2"
                                          name="car"
                                          // onChange={(e) => onclick("car", e)}
                                          checked={
                                            testdata.fm_vehicle.car == 2
                                              ? true
                                              : false
                                          }
                                          disabled
                                        />
                                        <span class="ml-3" for="car-2">
                                          ???????????????
                                        </span>
                                      </label>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex flex-col mb-4">
                                  <div className="flex flex-row pl-2 mt-5">
                                    <label
                                      className=" mb-2 pl-1 font-bold text-xl text-gray-900  w-1/12"
                                      htmlFor="first_name"
                                    ></label>
                                    <label
                                      className="ml-3 mb-2 pl-1 text-lg text-gray-900  w-1/4"
                                      htmlFor="first_name"
                                    >
                                      ????????????????????????????????????/???????????????
                                    </label>
                                  </div>
                                  <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-12"></div>

                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          class="w-5 h-5 ml-3 rounded"
                                          id="truck-1"
                                          type="radio"
                                          value="1"
                                          name="truck"
                                          // onChange={(e) => onclick("truck", e)}
                                          checked={
                                            testdata.fm_vehicle.truck == 1
                                              ? true
                                              : false
                                          }
                                          disabled
                                        />
                                        <span class="ml-3" for="truck-1">
                                          ??????
                                        </span>
                                      </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          class="w-5 h-5 ml-3 rounded"
                                          id="truck-2"
                                          type="radio"
                                          value="2"
                                          name="truck"
                                          // onChange={(e) => onclick("truck", e)}
                                          checked={
                                            testdata.fm_vehicle.truck == 2
                                              ? true
                                              : false
                                          }
                                          disabled
                                        />
                                        <span class="ml-3" for="truck-2">
                                          ???????????????
                                        </span>
                                      </label>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex flex-col mb-4">
                                  <div className="flex flex-row pl-2 mt-5">
                                    <label
                                      className=" mb-2 pl-1 font-bold text-xl text-gray-900  w-1/12"
                                      htmlFor="first_name"
                                    ></label>
                                    <label
                                      className="ml-3 mb-2 pl-1 text-lg text-gray-900  w-full"
                                      htmlFor="first_name"
                                    >
                                      ????????????/??????????????????????????????/????????????????????????/?????????????????????
                                      ??????????????????????????????????????????
                                    </label>
                                  </div>
                                  <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-12"></div>

                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          class="w-5 h-5 ml-3 rounded"
                                          id="othertruck-1"
                                          type="radio"
                                          value="1"
                                          name="othertruck"
                                          // onChange={(e) =>
                                          //   onclick("othertruck", e)
                                          // }
                                          checked={
                                            testdata.fm_vehicle.othertruck == 1
                                              ? true
                                              : false
                                          }
                                          disabled
                                        />
                                        <span class="ml-3" for="othertruck-1">
                                          ??????
                                        </span>
                                      </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          class="w-5 h-5 ml-3 rounded"
                                          id="othertruck-2"
                                          type="radio"
                                          value="2"
                                          name="othertruck"
                                          // onChange={(e) =>
                                          //   onclick("othertruck", e)
                                          // }
                                          checked={
                                            testdata.fm_vehicle.othertruck == 2
                                              ? true
                                              : false
                                          }
                                          disabled
                                        />
                                        <span class="ml-3" for="othertruck-2">
                                          ???????????????
                                        </span>
                                      </label>
                                    </div>
                                  </div>
                                </div>

                                <div className="flex flex-col mb-4">
                                  <div className="flex flex-row pl-2 mt-5">
                                    <label
                                      className="ml-2 mb-2 pl-1 font-bold text-xl text-gray-900  w-12"
                                      htmlFor="first_name"
                                    ></label>
                                    <label
                                      className="ml-2 mb-2 pl-1 font-bold text-xl text-gray-900  w-full"
                                      htmlFor="first_name"
                                    >
                                      ????????????????????????????????? ??????????????????????????????????????? (?????????????????????)
                                    </label>
                                  </div>
                                  <div className="flex flex-row pl-2 mt-5">
                                    <label
                                      className=" mb-2 pl-1 font-bold text-xl text-gray-900  w-1/12"
                                      htmlFor="first_name"
                                    ></label>
                                    <label
                                      className="ml-3 mb-2 pl-1 text-lg text-gray-900  w-1/4"
                                      htmlFor="first_name"
                                    >
                                      ???????????????????????????????????????
                                    </label>
                                  </div>
                                  <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-12"></div>

                                    <div class="mt-2 flex justify-left w-1/6">
                                      <label class="inline-flex items-center">
                                        <input
                                          class="w-5 h-5 ml-3 rounded"
                                          id="farm_land-1"
                                          type="radio"
                                          value="1"
                                          name="farm_land"
                                          // onChange={(e) =>
                                          //   onclick("farm_land", e)
                                          // }
                                          checked={
                                            testdata.farm_land == 1
                                              ? true
                                              : false
                                          }
                                          disabled
                                        />

                                        <span class="ml-3" for="farm_land-1">
                                          ????????????????????? 1 ?????????
                                        </span>
                                      </label>
                                    </div>
                                    <div class="mt-2 flex justify-left w-1/3">
                                      <label class="inline-flex items-center">
                                        <input
                                          class="w-5 h-5 ml-3 rounded"
                                          id="farm_land-2"
                                          type="radio"
                                          value="2"
                                          name="farm_land"
                                          // onChange={(e) =>
                                          //   onclick("farm_land", e)
                                          // }
                                          checked={
                                            testdata.farm_land == 2
                                              ? true
                                              : false
                                          }
                                          disabled
                                        />

                                        <span class="ml-3" for="farm_land-2">
                                          ?????????????????????????????????????????????????????????????????????
                                        </span>
                                      </label>
                                    </div>
                                  </div>
                                  <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-12"></div>

                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          class="w-5 h-5 ml-3 rounded"
                                          id="farm_land-3"
                                          type="radio"
                                          value="3"
                                          name="farm_land"
                                          // onChange={(e) =>
                                          //   onclick("farm_land", e)
                                          // }
                                          checked={
                                            testdata.farm_land == 3
                                              ? true
                                              : false
                                          }
                                          disabled
                                        />

                                        <span
                                          class="ml-3"
                                          for="farm_land_number-3"
                                        >
                                          ????????????????????????????????? ??????????????????{" "}
                                        </span>
                                      </label>
                                    </div>
                                  </div>
                                  <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-12"></div>

                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          class="w-5 h-5 ml-3 rounded"
                                          id="farm_land-4"
                                          type="radio"
                                          value="4"
                                          name="farm_land"
                                          // onChange={(e) =>
                                          //   onclick("farm_land", e)
                                          // }
                                          checked={
                                            testdata.farm_land == 4
                                              ? true
                                              : false
                                          }
                                          disabled
                                        />

                                        <span class="ml-3" for="farm_land-4">
                                          ??????????????????????????????{" "}
                                        </span>
                                      </label>
                                    </div>
                                  </div>
                                  <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-12"></div>
                                    <span class="ml-3 mt-3" for="farm_land-4">
                                      ????????????????????????????????????????????? ???????????? ?????????????????????????????????????????????{" "}
                                    </span>
                                    <input
                                      className="ml-2 py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-2/12"
                                      type="text"
                                      value={testdata.farm_land_number}
                                      // onChange={(e) =>
                                      //   modalhandleChange("farm_land_number", e)
                                      // }
                                      disabled
                                    />
                                    <span class="ml-3  mt-3">????????? </span>
                                  </div>
                                </div>
                                <div className="flex flex-col mb-4">
                                  <div className="flex flex-row pl-2 mt-5">
                                    <label
                                      className="ml-2 mb-2 pl-1 font-bold text-xl text-gray-900  w-12"
                                      htmlFor="first_name"
                                    ></label>
                                    <label
                                      className="ml-2 mb-2 pl-1 font-bold text-xl text-gray-900  w-full"
                                      htmlFor="first_name"
                                    >
                                      ???????????????????????????????????????????????????????????????
                                    </label>
                                  </div>
                                  <div className="flex flex-row pl-2 mt-5">
                                    <label
                                      className=" mb-2 pl-1 font-bold text-xl text-gray-900  w-1/12"
                                      htmlFor="first_name"
                                    ></label>
                                    <label
                                      className="ml-3 mb-2 pl-1 text-lg text-gray-900  w-1/4"
                                      htmlFor="first_name"
                                    >
                                      ??????????????????
                                    </label>
                                  </div>
                                  <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-12"></div>

                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          type="checkbox"
                                          class="w-5 h-5 ml-3 rounded"
                                          disabled
                                          // value={testdata.health.unhealthy}
                                          // onChange={(e) =>
                                          //   checkboxclick(
                                          //     "health",
                                          //     "unhealthy",
                                          //     e
                                          //   )
                                          // }
                                          checked={
                                            testdata.health.unhealthy == 1
                                              ? true
                                              : false
                                          }
                                        />
                                        <span class="ml-3">
                                          ???????????????????????????????????????????????????
                                        </span>
                                      </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          type="checkbox"
                                          class="w-5 h-5 ml-3 rounded"
                                          disabled
                                          // value={
                                          //   testdata.health.congenital_disease
                                          // }
                                          // onChange={(e) =>
                                          //   checkboxclick(
                                          //     "health",
                                          //     "congenital_disease",
                                          //     e
                                          //   )
                                          // }
                                          checked={
                                            testdata.health
                                              .congenital_disease == 1
                                              ? true
                                              : false
                                          }
                                        />
                                        <span class="ml-3">
                                          ???????????????????????????????????????????????????????????????????????????????????????
                                        </span>
                                      </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          type="checkbox"
                                          class="w-5 h-5 ml-3 rounded"
                                          disabled
                                          // value={testdata.health.malnutrition}
                                          // onChange={(e) =>
                                          //   checkboxclick(
                                          //     "health",
                                          //     "malnutrition",
                                          //     e
                                          //   )
                                          // }
                                          checked={
                                            testdata.health.malnutrition == 1
                                              ? true
                                              : false
                                          }
                                        />
                                        <span class="ml-3">
                                          ???????????????????????????????????????????????????
                                        </span>
                                      </label>
                                    </div>
                                  </div>

                                  <div class="flex flex-row  pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-12"></div>

                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          type="checkbox"
                                          class="w-5 h-5 ml-3 rounded"
                                          disabled
                                          // value={testdata.health.severe_chronic}
                                          // onChange={(e) =>
                                          //   checkboxclick(
                                          //     "health",
                                          //     "severe_chronic",
                                          //     e
                                          //   )
                                          // }
                                          checked={
                                            testdata.health.severe_chronic == 1
                                              ? true
                                              : false
                                          }
                                        />
                                        <span class="ml-3">
                                          ??????????????????????????????????????????????????????/????????????????????????
                                        </span>
                                      </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          type="checkbox"
                                          class="w-5 h-5 ml-3 rounded"
                                          disabled
                                          // value={
                                          //   testdata.health.low_physical_fitness
                                          // }
                                          // onChange={(e) =>
                                          //   checkboxclick(
                                          //     "health",
                                          //     "low_physical_fitness",
                                          //     e
                                          //   )
                                          // }
                                          checked={
                                            testdata.health
                                              .low_physical_fitness == 1
                                              ? true
                                              : false
                                          }
                                        />
                                        <span class="ml-3">
                                          ???????????????????????????????????????????????????????????????
                                        </span>
                                      </label>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex flex-col mb-4">
                                  <div className="flex flex-row pl-2 mt-5">
                                    <label
                                      className=" mb-2 pl-1 font-bold text-xl text-gray-900  w-1/12"
                                      htmlFor="first_name"
                                    ></label>
                                    <label
                                      className="ml-3 mb-2 pl-1 text-lg text-gray-900  w-full"
                                      htmlFor="first_name"
                                    >
                                      ????????????????????????????????????????????????????????????????????????
                                    </label>
                                  </div>
                                  <div class="flex flex-row  pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-12"></div>

                                    <div class="mt-2 flex justify-left pl-50 w-1/2">
                                      <label class="inline-flex items-center ">
                                        <input
                                          type="checkbox"
                                          class="w-5 h-5 ml-3 rounded"
                                          disabled
                                          // value={
                                          //   testdata.welfare_safety.separated
                                          // }
                                          // onChange={(e) =>
                                          //   checkboxclick(
                                          //     "welfare_safety",
                                          //     "separated",
                                          //     e
                                          //   )
                                          // }
                                          checked={
                                            testdata.welfare_safety.separated ==
                                            1
                                              ? true
                                              : false
                                          }
                                        />
                                        <span class="ml-3">
                                          ????????????????????????????????????????????? ???????????? ?????????????????????????????????
                                        </span>
                                      </label>
                                    </div>
                                    <div class="mt-2 flex justify-left w-1/2">
                                      <label class="inline-flex items-center">
                                        <input
                                          type="checkbox"
                                          class="w-5 h-5 ml-3 rounded"
                                          disabled
                                          // value={testdata.welfare_safety.gamble}
                                          // onChange={(e) =>
                                          //   checkboxclick(
                                          //     "welfare_safety",
                                          //     "gamble",
                                          //     e
                                          //   )
                                          // }
                                          checked={
                                            testdata.welfare_safety.gamble == 1
                                              ? true
                                              : false
                                          }
                                        />
                                        <span class="ml-3">?????????????????????????????????</span>
                                      </label>
                                    </div>
                                  </div>
                                  <div class="flex flex-row  pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-12"></div>

                                    <div class="mt-2 flex justify-left w-1/2 ">
                                      <label class="inline-flex items-center ">
                                        <input
                                          type="checkbox"
                                          class="w-5 h-5 ml-3 rounded "
                                          disabled
                                          // value={
                                          //   testdata.welfare_safety
                                          //     .suffering_serious
                                          // }
                                          // onChange={(e) =>
                                          //   checkboxclick(
                                          //     "welfare_safety",
                                          //     "suffering_serious",
                                          //     e
                                          //   )
                                          // }
                                          checked={
                                            testdata.welfare_safety
                                              .suffering_serious == 1
                                              ? true
                                              : false
                                          }
                                        />
                                      </label>
                                      <span class="ml-3">
                                        ?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????/????????????????????????/??????????????????
                                      </span>
                                    </div>
                                    <div class="mt-2 flex justify-left w-1/2">
                                      <label class="inline-flex items-center">
                                        <input
                                          type="checkbox"
                                          class="w-5 h-5 ml-3 rounded"
                                          disabled
                                          // value={
                                          //   testdata.welfare_safety
                                          //     .addicted_to_drugs
                                          // }
                                          // onChange={(e) =>
                                          //   checkboxclick(
                                          //     "welfare_safety",
                                          //     "addicted_to_drugs",
                                          //     e
                                          //   )
                                          // }
                                          checked={
                                            testdata.welfare_safety
                                              .addicted_to_drugs == 1
                                              ? true
                                              : false
                                          }
                                        />
                                        <span class="ml-3">
                                          ?????????????????????????????????????????????????????????????????????????????????
                                        </span>
                                      </label>
                                    </div>
                                  </div>
                                  <div class="flex flex-row  pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-12"></div>

                                    <div class="mt-2 flex justify-left w-1/2">
                                      <label class="inline-flex items-center">
                                        <input
                                          type="checkbox"
                                          class="w-5 h-5 ml-3 rounded"
                                          disabled
                                          // value={
                                          //   testdata.welfare_safety
                                          //     .members_gamble
                                          // }
                                          // onChange={(e) =>
                                          //   checkboxclick(
                                          //     "welfare_safety",
                                          //     "members_gamble",
                                          //     e
                                          //   )
                                          // }
                                          checked={
                                            testdata.welfare_safety
                                              .members_gamble == 1
                                              ? true
                                              : false
                                          }
                                        />
                                      </label>
                                      <span class="ml-3">
                                        ??????????????????????????????????????????????????????????????????????????????
                                      </span>
                                    </div>
                                    <div class="mt-2 flex justify-left w-1/2">
                                      <label class="inline-flex items-center">
                                        <input
                                          type="checkbox"
                                          class="w-5 h-5 ml-3 rounded"
                                          disabled
                                          // value={
                                          //   testdata.welfare_safety
                                          //     .conflicts_in_family
                                          // }
                                          // onChange={(e) =>
                                          //   checkboxclick(
                                          //     "welfare_safety",
                                          //     "conflicts_in_family",
                                          //     e
                                          //   )
                                          // }
                                          checked={
                                            testdata.welfare_safety
                                              .conflicts_in_family == 1
                                              ? true
                                              : false
                                          }
                                        />
                                      </label>
                                      <span class="ml-3">
                                        ???????????????????????????????????????/?????????????????????????????????????????????????????????
                                      </span>
                                    </div>
                                  </div>
                                  <div class="flex flex-row   pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-12"></div>

                                    <div class="mt-2 flex justify-left w-1/2">
                                      <label class="inline-flex items-center">
                                        <input
                                          type="checkbox"
                                          class="w-5 h-5 ml-3 rounded"
                                          disabled
                                          // value={
                                          //   testdata.welfare_safety.unsupervised
                                          // }
                                          // onChange={(e) =>
                                          //   checkboxclick(
                                          //     "welfare_safety",
                                          //     "unsupervised",
                                          //     e
                                          //   )
                                          // }
                                          checked={
                                            testdata.welfare_safety
                                              .unsupervised == 1
                                              ? true
                                              : false
                                          }
                                        />
                                        <span class="ml-3">???????????????????????????????????? </span>
                                      </label>
                                    </div>
                                    <div class="mt-2 flex justify-left w-1/2">
                                      <label class="inline-flex items-center">
                                        <input
                                          type="checkbox"
                                          class="w-5 h-5 ml-3 rounded"
                                          disabled
                                          // value={
                                          //   testdata.welfare_safety
                                          //     .domestic_violence
                                          // }
                                          // onChange={(e) =>
                                          //   checkboxclick(
                                          //     "welfare_safety",
                                          //     "domestic_violence",
                                          //     e
                                          //   )
                                          // }
                                          checked={
                                            testdata.welfare_safety
                                              .domestic_violence == 1
                                              ? true
                                              : false
                                          }
                                        />
                                      </label>
                                      <span class="ml-3">
                                        ??????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
                                      </span>
                                    </div>
                                  </div>
                                  <div class="flex flex-row   pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-12"></div>

                                    <div class="mt-2 flex justify-left w-1/2">
                                      <label class="inline-flex items-center">
                                        <input
                                          type="checkbox"
                                          class="w-5 h-5 ml-3 rounded"
                                          disabled
                                          // value={
                                          //   testdata.welfare_safety
                                          //     .harmed_by_family
                                          // }
                                          // onChange={(e) =>
                                          //   checkboxclick(
                                          //     "welfare_safety",
                                          //     "harmed_by_family",
                                          //     e
                                          //   )
                                          // }
                                          checked={
                                            testdata.welfare_safety
                                              .harmed_by_family == 1
                                              ? true
                                              : false
                                          }
                                        />
                                      </label>
                                      <span class="ml-3">
                                        ????????????????????????/????????????????????????????????????????????????????????????????????????/??????????????????????????????
                                      </span>
                                    </div>
                                    <div class="mt-2 flex justify-left w-1/2">
                                      <label class="inline-flex items-center">
                                        <input
                                          type="checkbox"
                                          class="w-5 h-5 ml-3 rounded"
                                          disabled
                                          // value={
                                          //   testdata.welfare_safety
                                          //     .sexually_harassed
                                          // }
                                          // onChange={(e) =>
                                          //   checkboxclick(
                                          //     "welfare_safety",
                                          //     "sexually_harassed",
                                          //     e
                                          //   )
                                          // }
                                          checked={
                                            testdata.welfare_safety
                                              .sexually_harassed == 1
                                              ? true
                                              : false
                                          }
                                        />
                                      </label>
                                      <span class="ml-3">
                                        ?????????????????????????????????????????????????????????
                                      </span>
                                    </div>
                                  </div>
                                  <div class="flex flex-row  pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-12"></div>

                                    <div class="mt-2 flex justify-left w-1/2">
                                      <label class="inline-flex items-center">
                                        <input
                                          type="checkbox"
                                          class="w-5 h-5 ml-3 rounded"
                                          disabled
                                          // value={
                                          //   testdata.welfare_safety
                                          //     .residing_in_a_slum
                                          // }
                                          // onChange={(e) =>
                                          //   checkboxclick(
                                          //     "welfare_safety",
                                          //     "residing_in_a_slum",
                                          //     e
                                          //   )
                                          // }
                                          checked={
                                            testdata.welfare_safety
                                              .residing_in_a_slum == 1
                                              ? true
                                              : false
                                          }
                                        />
                                      </label>
                                      <span class="ml-3">
                                        ????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????/????????????????????????????????????
                                      </span>
                                    </div>
                                    <div class="mt-2 flex justify-left w-1/2">
                                      <span class="ml-3"></span>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex flex-col mb-4">
                                  <div className="flex flex-row mt-5 ">
                                    <label
                                      className="ml-2 mb-2 pl-1 font-bold text-xl text-gray-900  w-12"
                                      htmlFor="first_name"
                                    ></label>
                                    <label
                                      className="ml-2 mb-2 pl-1 font-bold text-xl text-gray-900  w-full"
                                      htmlFor="first_name"
                                    >
                                      ????????????????????????????????????????????????????????????????????????????????????
                                    </label>
                                  </div>

                                  <div className="flex flex-row w-full  mt-3">
                                    <label
                                      className="ml-2 mb-2 pl-1 font-bold text-lg text-gray-900  w-12"
                                      htmlFor="first_name"
                                    ></label>
                                    <label
                                      className="ml-2 mb-2 pl-1 text-lg text-gray-900  w-1/4"
                                      htmlFor="first_name"
                                    >
                                      ????????????????????????????????????????????????????????????????????????????????????
                                    </label>

                                    <label
                                      className="ml-3 mb-2 pl-1 text-lg text-gray-900  w-1/4"
                                      htmlFor="first_name"
                                    >
                                      ?????????????????????????????????????????? (??????)
                                    </label>
                                    <label
                                      className="ml-3 mb-2 pl-1 text-lg text-gray-900  w-1/4"
                                      htmlFor="first_name"
                                    >
                                      ????????????
                                    </label>
                                  </div>
                                  <div className="flex flex-row mb-4">
                                    <label
                                      className="ml-2 mb-2 pl-1 font-bold text-lg text-gray-900  w-12"
                                      htmlFor="first_name"
                                    ></label>

                                    <input
                                      className="ml-2 py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-1/4"
                                      type="text"
                                      value={testdata.distance_school_km}
                                      disabled
                                      // onChange={(e) =>
                                      //   modalhandleChange(
                                      //     "distance_school_km",
                                      //     e
                                      //   )
                                      // }
                                    />
                                    <input
                                      className="ml-3 py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-1/4"
                                      type="text"
                                      value={testdata.distance_school_hr}
                                      disabled
                                      // onChange={(e) =>
                                      //   modalhandleChange(
                                      //     "distance_school_hr",
                                      //     e
                                      //   )
                                      // }
                                    />
                                    <input
                                      className="ml-3 py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-1/4"
                                      type="text"
                                      value={testdata.distance_school_min}
                                      disabled
                                      // onChange={(e) =>
                                      //   modalhandleChange(
                                      //     "distance_school_min",
                                      //     e
                                      //   )
                                      // }
                                    />
                                  </div>
                                </div>
                                <div className="flex flex-col mb-4">
                                  <div className="flex flex-row pl-2 mt-5">
                                    <label
                                      className="ml-2 mb-2 pl-1 font-bold text-xl text-gray-900  w-12"
                                      htmlFor="first_name"
                                    ></label>
                                    <label
                                      className="ml-2 mb-2 pl-1 font-bold text-xl text-gray-900  w-full"
                                      htmlFor="first_name"
                                    >
                                      ?????????????????????????????????????????????????????????????????????????????????????????????
                                    </label>
                                  </div>
                                  <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-12"></div>

                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          class="w-5 h-5 ml-3 rounded"
                                          id="journey-1"
                                          type="radio"
                                          value="1"
                                          name="journey"
                                          disabled
                                          // onChange={(e) =>
                                          //   onclick("journey", e)
                                          // }
                                          checked={
                                            testdata.journey == 1 ? true : false
                                          }
                                        />
                                        <span class="ml-3" for="journey-1">
                                          ??????????????????????????????????????????
                                        </span>
                                      </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          class="w-5 h-5 ml-3 rounded"
                                          id="journey-2"
                                          type="radio"
                                          value="2"
                                          name="journey"
                                          disabled
                                          // onChange={(e) =>
                                          //   onclick("journey", e)
                                          // }
                                          checked={
                                            testdata.journey == 2 ? true : false
                                          }
                                        />
                                        <span class="ml-3" for="journey-2">
                                          ??????????????????????????????
                                        </span>
                                      </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          class="w-5 h-5 ml-3 rounded"
                                          id="journey-3"
                                          type="radio"
                                          value="3"
                                          name="journey"
                                          disabled
                                          // onChange={(e) =>
                                          //   onclick("journey", e)
                                          // }
                                          checked={
                                            testdata.journey == 3 ? true : false
                                          }
                                        />
                                        <span class="ml-3" for="journey-3">
                                          ??????????????????????????????????????????
                                        </span>
                                      </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          class="w-5 h-5 ml-3 rounded"
                                          id="journey-4"
                                          type="radio"
                                          value="4"
                                          name="journey"
                                          disabled
                                          // onChange={(e) =>
                                          //   onclick("journey", e)
                                          // }
                                          checked={
                                            testdata.journey == 4 ? true : false
                                          }
                                        />
                                        <span class="ml-3" for="journey-4">
                                          ??????????????????????????????
                                        </span>
                                      </label>
                                    </div>
                                  </div>

                                  <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-12"></div>

                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          class="w-5 h-5 ml-3 rounded"
                                          id="journey-5"
                                          type="radio"
                                          value="5"
                                          name="journey"
                                          disabled
                                          // onChange={(e) =>
                                          //   onclick("journey", e)
                                          // }
                                          checked={
                                            testdata.journey == 5 ? true : false
                                          }
                                        />
                                        <span class="ml-3" for="journey-5">
                                          ?????????????????????
                                        </span>
                                      </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          class="w-5 h-5 ml-3 rounded"
                                          id="journey-6"
                                          type="radio"
                                          value="6"
                                          name="journey"
                                          disabled
                                          // onChange={(e) =>
                                          //   onclick("journey", e)
                                          // }
                                          checked={
                                            testdata.journey == 6 ? true : false
                                          }
                                        />
                                        <span class="ml-3" for="journey-6">
                                          ?????????????????????
                                        </span>
                                      </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          class="w-5 h-5 ml-3 rounded"
                                          id="journey-7"
                                          type="radio"
                                          value="7"
                                          name="journey"
                                          disabled
                                          // onChange={(e) =>
                                          //   onclick("journey", e)
                                          // }
                                          checked={
                                            testdata.journey == 7 ? true : false
                                          }
                                        />
                                        <span class="ml-3" for="journey-7">
                                          ????????????
                                        </span>
                                      </label>
                                    </div>
                                  </div>
                                  <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-12"></div>
                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          class="w-5 h-5 ml-3 rounded"
                                          id="journey-8"
                                          type="radio"
                                          value="8"
                                          name="journey"
                                          disabled
                                          // onChange={(e) =>
                                          //   onclick("journey", e)
                                          // }
                                          checked={
                                            testdata.journey == 8 ? true : false
                                          }
                                        />
                                        <span class="ml-3" for="journey-8">
                                          ???????????????
                                        </span>
                                        <input
                                          className="ml-3 py-1 px-1 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-1/2"
                                          type="text"
                                          value={testdata.journey_other}
                                          disabled
                                          // onChange={(e) =>
                                          //   modalhandleChange(
                                          //     "journey_other",
                                          //     e
                                          //   )
                                          // }
                                        />
                                      </label>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex flex-col mb-4">
                                  <div className="flex flex-row pl-2 mt-5">
                                    <label
                                      className="ml-2 mb-2 pl-1 font-bold text-xl text-gray-900  w-12"
                                      htmlFor="first_name"
                                    ></label>
                                    <label
                                      className="ml-2 mb-2 pl-1 font-bold text-xl text-gray-900  w-full "
                                      htmlFor="first_name"
                                    >
                                      ?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
                                    </label>
                                  </div>
                                  <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-12"></div>

                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          type="checkbox"
                                          class="w-5 h-5 ml-3 rounded"
                                          disabled
                                          // value={
                                          //   testdata.work_responsibility
                                          //     .housework
                                          // }
                                          // onChange={(e) =>
                                          //   checkboxclick(
                                          //     "work_responsibility",
                                          //     "housework",
                                          //     e
                                          //   )
                                          // }
                                          checked={
                                            testdata.work_responsibility
                                              .housework == 1
                                              ? true
                                              : false
                                          }
                                        />
                                        <span class="ml-3">????????????????????????????????? </span>
                                      </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          type="checkbox"
                                          class="w-5 h-5 ml-3 rounded"
                                          disabled
                                          // value={
                                          //   testdata.work_responsibility
                                          //     .care_disabled
                                          // }
                                          // onChange={(e) =>
                                          //   checkboxclick(
                                          //     "work_responsibility",
                                          //     "care_disabled",
                                          //     e
                                          //   )
                                          // }
                                          checked={
                                            testdata.work_responsibility
                                              .care_disabled == 1
                                              ? true
                                              : false
                                          }
                                        />
                                        <span class="ml-3">
                                          ????????????????????????????????????????????????????????????/???????????????
                                        </span>
                                      </label>
                                    </div>
                                  </div>
                                  <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-12"></div>

                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          type="checkbox"
                                          class="w-5 h-5 ml-3 rounded"
                                          disabled
                                          // value={
                                          //   testdata.work_responsibility.trade
                                          // }
                                          // onChange={(e) =>
                                          //   checkboxclick(
                                          //     "work_responsibility",
                                          //     "trade",
                                          //     e
                                          //   )
                                          // }
                                          checked={
                                            testdata.work_responsibility
                                              .trade == 1
                                              ? true
                                              : false
                                          }
                                        />
                                        <span class="ml-3">
                                          ????????????????????????????????????????????????????????????{" "}
                                        </span>
                                      </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          type="checkbox"
                                          class="w-5 h-5 ml-3 rounded"
                                          disabled
                                          // value={
                                          //   testdata.work_responsibility
                                          //     .extra_work
                                          // }
                                          // onChange={(e) =>
                                          //   checkboxclick(
                                          //     "work_responsibility",
                                          //     "extra_work",
                                          //     e
                                          //   )
                                          // }
                                          checked={
                                            testdata.work_responsibility
                                              .extra_work == 1
                                              ? true
                                              : false
                                          }
                                        />
                                        <span class="ml-3">
                                          ???????????????????????????????????????????????????{" "}
                                        </span>
                                      </label>
                                    </div>
                                  </div>
                                  <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-12"></div>
                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          type="checkbox"
                                          class="w-5 h-5 ml-3 rounded"
                                          disabled
                                          // value={
                                          //   testdata.work_responsibility.farm
                                          // }
                                          // onChange={(e) =>
                                          //   checkboxclick(
                                          //     "work_responsibility",
                                          //     "farm",
                                          //     e
                                          //   )
                                          // }
                                          checked={
                                            testdata.work_responsibility.farm ==
                                            1
                                              ? true
                                              : false
                                          }
                                        />
                                        <span class="ml-3">
                                          ??????????????????????????????????????????{" "}
                                        </span>
                                      </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          type="checkbox"
                                          class="w-5 h-5 ml-3 rounded"
                                          disabled
                                          // value={
                                          //   testdata.work_responsibility.other
                                          // }
                                          // onChange={(e) =>
                                          //   checkboxclick(
                                          //     "work_responsibility",
                                          //     "other",
                                          //     e
                                          //   )
                                          // }
                                          checked={
                                            testdata.work_responsibility
                                              .other == 1
                                              ? true
                                              : false
                                          }
                                        />
                                        <span class="ml-3">???????????????</span>
                                        <input
                                          className="ml-3 py-1 px-1 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-1/2"
                                          type="text"
                                          value={
                                            testdata.work_responsibility_other
                                          }
                                          disabled
                                          // onChange={(e) =>
                                          //   modalhandleChange(
                                          //     "work_responsibility_other",
                                          //     e
                                          //   )
                                          // }
                                        />
                                      </label>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex flex-col mb-4">
                                  <div className="flex flex-row pl-2 mt-5">
                                    <label
                                      className="ml-2 mb-2 pl-1 font-bold text-xl text-gray-900  w-12"
                                      htmlFor="first_name"
                                    ></label>
                                    <label
                                      className="ml-2 mb-2 pl-1 font-bold text-xl text-gray-900  w-full"
                                      htmlFor="first_name"
                                    >
                                      ?????????????????????????????????????????????????????????????????????????????????
                                    </label>
                                  </div>
                                  <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-12"></div>

                                    <div class="mt-2 flex justify-center ">
                                      <label class="inline-flex items-center ">
                                        <input
                                          type="checkbox"
                                          class="w-5 h-5 ml-3 rounded"
                                          disabled
                                          // value={testdata.hobbies.TV}
                                          // onChange={(e) =>
                                          //   checkboxclick("hobbies", "TV", e)
                                          // }
                                          checked={
                                            testdata.hobbies.TV == 1
                                              ? true
                                              : false
                                          }
                                        />
                                        <span class="ml-3">
                                          ?????????????????? / ?????????????????????
                                        </span>
                                      </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          type="checkbox"
                                          class="w-5 h-5 ml-3 rounded"
                                          disabled
                                          // value={testdata.hobbies.go_to_mall}
                                          // onChange={(e) =>
                                          //   checkboxclick(
                                          //     "hobbies",
                                          //     "go_to_mall",
                                          //     e
                                          //   )
                                          // }
                                          checked={
                                            testdata.hobbies.go_to_mall == 1
                                              ? true
                                              : false
                                          }
                                        />
                                        <span class="ml-3">
                                          ???????????????????????????????????? / ??????????????????{" "}
                                        </span>
                                      </label>
                                    </div>
                                  </div>
                                  <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-12"></div>

                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          type="checkbox"
                                          class="w-5 h-5 ml-3 rounded"
                                          disabled
                                          // value={testdata.hobbies.reading}
                                          // onChange={(e) =>
                                          //   checkboxclick(
                                          //     "hobbies",
                                          //     "reading",
                                          //     e
                                          //   )
                                          // }
                                          checked={
                                            testdata.hobbies.reading == 1
                                              ? true
                                              : false
                                          }
                                        />
                                        <span class="ml-3">????????????????????????????????? </span>
                                      </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          type="checkbox"
                                          class="w-5 h-5 ml-3 rounded"
                                          disabled
                                          // value={testdata.hobbies.friend}
                                          // onChange={(e) =>
                                          //   checkboxclick(
                                          //     "hobbies",
                                          //     "friend",
                                          //     e
                                          //   )
                                          // }
                                          checked={
                                            testdata.hobbies.friend == 1
                                              ? true
                                              : false
                                          }
                                        />
                                        <span class="ml-3">
                                          ?????????????????????????????? / ??????????????????{" "}
                                        </span>
                                      </label>
                                    </div>
                                  </div>
                                  <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-12"></div>

                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          type="checkbox"
                                          class="w-5 h-5 ml-3 rounded"
                                          disabled
                                          // value={testdata.hobbies.vsco}
                                          // onChange={(e) =>
                                          //   checkboxclick("hobbies", "vsco", e)
                                          // }
                                          checked={
                                            testdata.hobbies.vsco == 1
                                              ? true
                                              : false
                                          }
                                        />
                                        <span class="ml-3">????????????/???????????????</span>
                                      </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          type="checkbox"
                                          class="w-5 h-5 ml-3 rounded"
                                          disabled
                                          // value={testdata.hobbies.game}
                                          // onChange={(e) =>
                                          //   checkboxclick("hobbies", "game", e)
                                          // }
                                          checked={
                                            testdata.hobbies.game == 1
                                              ? true
                                              : false
                                          }
                                        />
                                        <span class="ml-3">
                                          ????????????????????? ?????????/??????????????????
                                        </span>
                                      </label>
                                    </div>
                                  </div>
                                  <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-12"></div>

                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          type="checkbox"
                                          class="w-5 h-5 ml-3 rounded"
                                          disabled
                                          // value={testdata.hobbies.park}
                                          // onChange={(e) =>
                                          //   checkboxclick("hobbies", "park", e)
                                          // }
                                          checked={
                                            testdata.hobbies.park == 1
                                              ? true
                                              : false
                                          }
                                        />
                                        <span class="ml-3">???????????????????????????????????? </span>
                                      </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          type="checkbox"
                                          class="w-5 h-5 ml-3 rounded"
                                          disabled
                                          // value={testdata.hobbies.play_music}
                                          // onChange={(e) =>
                                          //   checkboxclick(
                                          //     "hobbies",
                                          //     "play_music",
                                          //     e
                                          //   )
                                          // }
                                          checked={
                                            testdata.hobbies.play_music == 1
                                              ? true
                                              : false
                                          }
                                        />
                                        <span class="ml-3">???????????????????????????</span>
                                      </label>
                                    </div>
                                  </div>
                                  <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-12"></div>

                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          type="checkbox"
                                          class="w-5 h-5 ml-3 rounded"
                                          disabled
                                          // value={testdata.hobbies.other}
                                          // onChange={(e) =>
                                          //   checkboxclick("hobbies", "other", e)
                                          // }
                                          checked={
                                            testdata.hobbies.other == 1
                                              ? true
                                              : false
                                          }
                                        />
                                        <span class="ml-3">???????????????</span>
                                        <input
                                          className="ml-3 py-1 px-1 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-1/2"
                                          type="text"
                                          disabled
                                          // onChange={(e) =>
                                          //   modalhandleChange(
                                          //     "hobbies_other",
                                          //     e
                                          //   )
                                          // }
                                        />
                                      </label>
                                    </div>
                                  </div>
                                </div>

                                <div className="flex flex-col mb-4">
                                  <div className="flex flex-row pl-2 mt-5">
                                    <label
                                      className="ml-2 mb-2 pl-1 font-bold text-xl text-gray-900  w-12"
                                      htmlFor="first_name"
                                    ></label>
                                    <label
                                      className="ml-2 mb-2 pl-1 font-bold text-xl text-gray-900  w-full"
                                      htmlFor="first_name"
                                    >
                                      ?????????????????????????????????????????????????????????????????????
                                    </label>
                                  </div>
                                  <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-12"></div>

                                    <div class="mt-2 flex justify-left w-1/3">
                                      <label class="inline-flex items-center">
                                        <input
                                          type="checkbox"
                                          class="w-5 h-5 ml-3 rounded"
                                          disabled
                                          // value={
                                          // testdata.substance_abuse
                                          // .friends_uses_drugs
                                          // }
                                          // onChange={(e) =>
                                          //   checkboxclick(
                                          //     "substance_abuse",
                                          //     "friends_uses_drugs",
                                          //     e
                                          //   )
                                          // }
                                          checked={
                                            testdata.substance_abuse
                                              .friends_uses_drugs == 1
                                              ? true
                                              : false
                                          }
                                        />
                                      </label>
                                      <span class="ml-3">
                                        ??????????????????????????????????????????????????????????????????????????????????????????
                                      </span>
                                    </div>
                                    <div class="mt-2 flex justify-left w-1/3">
                                      <label class="inline-flex items-center">
                                        <input
                                          type="checkbox"
                                          class="w-5 h-5 ml-3 rounded "
                                          disabled
                                          // value={
                                          //   testdata.substance_abuse
                                          //     .family_uses_drugs
                                          // }
                                          // onChange={(e) =>
                                          //   checkboxclick(
                                          //     "substance_abuse",
                                          //     "family_uses_drugs",
                                          //     e
                                          //   )
                                          // }
                                          checked={
                                            testdata.substance_abuse
                                              .family_uses_drugs == 1
                                              ? true
                                              : false
                                          }
                                        />
                                      </label>
                                      <span class="ml-3">
                                        ???????????????????????????????????????????????????????????????????????????????????????????????????????????????
                                      </span>
                                    </div>
                                    <div class="mt-2 flex justify-left w-1/3">
                                      <label class="inline-flex items-center">
                                        <input
                                          type="checkbox"
                                          class="w-5 h-5 ml-3 rounded"
                                          disabled
                                          // value={
                                          //   testdata.substance_abuse
                                          //     .drug_use_environment
                                          // }
                                          // onChange={(e) =>
                                          //   checkboxclick(
                                          //     "substance_abuse",
                                          //     "drug_use_environment",
                                          //     e
                                          //   )
                                          // }
                                          checked={
                                            testdata.substance_abuse
                                              .drug_use_environment == 1
                                              ? true
                                              : false
                                          }
                                        />
                                      </label>
                                      <span class="ml-3">
                                        ????????????????????????????????????????????????????????????????????????????????????????????????
                                      </span>
                                    </div>
                                  </div>
                                  <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-12"></div>

                                    <div class="mt-2 flex justify-left w-1/3">
                                      <label class="inline-flex items-center">
                                        <input
                                          type="checkbox"
                                          class="w-5 h-5 ml-3 rounded "
                                          disabled
                                          // value={
                                          //   testdata.substance_abuse
                                          //     .dealing_with_drugs
                                          // }
                                          // onChange={(e) =>
                                          //   checkboxclick(
                                          //     "substance_abuse",
                                          //     "dealing_with_drugs",
                                          //     e
                                          //   )
                                          // }
                                          checked={
                                            testdata.substance_abuse
                                              .dealing_with_drugs == 1
                                              ? true
                                              : false
                                          }
                                        />
                                      </label>
                                      <span class="ml-3">
                                        ??????????????????????????????????????????????????????????????????????????????????????????{" "}
                                      </span>
                                    </div>
                                    <div class="mt-2 flex justify-left w-1/3">
                                      <label class="inline-flex items-center">
                                        <input
                                          type="checkbox"
                                          class="w-5 h-5 ml-3 rounded "
                                          disabled
                                          // value={
                                          //   testdata.substance_abuse.smoking
                                          // }
                                          // onChange={(e) =>
                                          //   checkboxclick(
                                          //     "substance_abuse",
                                          //     "smoking",
                                          //     e
                                          //   )
                                          // }
                                          checked={
                                            testdata.substance_abuse.smoking ==
                                            1
                                              ? true
                                              : false
                                          }
                                        />
                                      </label>
                                      <span class="ml-3">
                                        ???????????????????????????????????????????????? ????????????
                                        ????????????????????????????????????????????????????????????????????????
                                      </span>
                                    </div>
                                    <div class="mt-2 flex justify-left w-1/3">
                                      <span class="ml-3"></span>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex flex-col mb-4">
                                  <div className="flex flex-row pl-2 mt-5">
                                    <label
                                      className="ml-2 mb-2 pl-1 font-bold text-xl text-gray-900  w-12"
                                      htmlFor="first_name"
                                    ></label>
                                    <label
                                      className="ml-2 mb-2 pl-1 font-bold text-xl text-gray-900  w-full"
                                      htmlFor="first_name"
                                    >
                                      ????????????????????????????????????????????????????????????????????????
                                    </label>
                                  </div>
                                  <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-12"></div>

                                    <div class="mt-2 flex justify-left w-1/3">
                                      <label class="inline-flex items-center">
                                        <input
                                          type="checkbox"
                                          class="w-5 h-5 ml-3 rounded"
                                          disabled
                                          // value={testdata.violent.quarrel}
                                          // onChange={(e) =>
                                          //   checkboxclick(
                                          //     "violent",
                                          //     "quarrel",
                                          //     e
                                          //   )
                                          // }
                                          checked={
                                            testdata.violent.quarrel == 1
                                              ? true
                                              : false
                                          }
                                        />
                                      </label>
                                      <span class="ml-3">
                                        ????????????????????????????????????????????????{" "}
                                      </span>
                                    </div>
                                    <div class="mt-2 flex justify-left w-1/3">
                                      <label class="inline-flex items-center">
                                        <input
                                          type="checkbox"
                                          class="w-5 h-5 ml-3 rounded"
                                          disabled
                                          // value={testdata.violent.Aggressive}
                                          // onChange={(e) =>
                                          //   checkboxclick(
                                          //     "violent",
                                          //     "Aggressive",
                                          //     e
                                          //   )
                                          // }
                                          checked={
                                            testdata.violent.Aggressive == 1
                                              ? true
                                              : false
                                          }
                                        />
                                      </label>
                                      <span class="ml-3">???????????????????????? ????????????</span>
                                    </div>
                                    <div class="mt-2 flex justify-left w-1/3">
                                      <label class="inline-flex items-center">
                                        <input
                                          type="checkbox"
                                          class="w-5 h-5 ml-3 rounded"
                                          disabled
                                          // value={
                                          //   testdata.violent.frequent_quarrels
                                          // }
                                          // onChange={(e) =>
                                          //   checkboxclick(
                                          //     "violent",
                                          //     "frequent_quarrels",
                                          //     e
                                          //   )
                                          // }
                                          checked={
                                            testdata.violent
                                              .frequent_quarrels == 1
                                              ? true
                                              : false
                                          }
                                        />
                                      </label>
                                      <span class="ml-3">
                                        ????????????????????????????????????????????????????????????
                                      </span>
                                    </div>
                                  </div>
                                  <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-12"></div>

                                    <div class="mt-2 flex justify-left w-1/3">
                                      <label class="inline-flex items-center">
                                        <input
                                          type="checkbox"
                                          class="w-5 h-5 ml-3 rounded"
                                          disabled
                                          // value={
                                          //   testdata.violent.injure_another
                                          // }
                                          // onChange={(e) =>
                                          //   checkboxclick(
                                          //     "violent",
                                          //     "injure_another",
                                          //     e
                                          //   )
                                          // }
                                          checked={
                                            testdata.violent.injure_another == 1
                                              ? true
                                              : false
                                          }
                                        />
                                      </label>
                                      <span class="ml-3">
                                        ????????????????????????????????????????????????????????????{" "}
                                      </span>
                                    </div>
                                    <div class="mt-2 flex justify-left w-1/3">
                                      <label class="inline-flex items-center">
                                        <input
                                          type="checkbox"
                                          class="w-5 h-5 ml-3 rounded"
                                          disabled
                                          // value={
                                          //   testdata.violent.injure_yourself
                                          // }
                                          // onChange={(e) =>
                                          //   checkboxclick(
                                          //     "violent",
                                          //     "injure_yourself",
                                          //     e
                                          //   )
                                          // }
                                          checked={
                                            testdata.violent.injure_yourself ==
                                            1
                                              ? true
                                              : false
                                          }
                                        />
                                      </label>
                                      <span class="ml-3">
                                        ????????????????????????????????????????????????????????????{" "}
                                      </span>
                                    </div>
                                    <div class="mt-2 flex justify-left w-1/3">
                                      <label class="inline-flex items-center">
                                        <input
                                          type="checkbox"
                                          class="w-5 h-5 ml-3 rounded"
                                          disabled
                                          // value={testdata.violent.other}
                                          // onChange={(e) =>
                                          //   checkboxclick("violent", "other", e)
                                          // }
                                          checked={
                                            testdata.violent.other == 1
                                              ? true
                                              : false
                                          }
                                        />
                                        <span class="ml-3">???????????????</span>
                                        <input
                                          className="ml-3 py-1 px-1 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-1/2"
                                          type="text"
                                          value={testdata.violent_other}
                                          disabled
                                          // onChange={(e) =>
                                          //   modalhandleChange(
                                          //     "violent_other",
                                          //     e
                                          //   )
                                          // }
                                        />
                                      </label>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex flex-col mb-4">
                                  <div className="flex flex-row pl-2 mt-5">
                                    <label
                                      className="ml-2 mb-2 pl-1 font-bold text-xl text-gray-900  w-12"
                                      htmlFor="first_name"
                                    ></label>
                                    <label
                                      className="ml-2 mb-2 pl-1 font-bold text-xl text-gray-900  w-full"
                                      htmlFor="first_name"
                                    >
                                      ??????????????????????????????????????????
                                    </label>
                                  </div>
                                  <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-12"></div>

                                    <div class="mt-2 flex justify-left w-1/3">
                                      <label class="inline-flex items-center">
                                        <input
                                          type="checkbox"
                                          class="w-5 h-5 ml-3 rounded "
                                          disabled
                                          // value={testdata.sexual.service_group}
                                          // onChange={(e) =>
                                          //   checkboxclick(
                                          //     "sexual",
                                          //     "service_group",
                                          //     e
                                          //   )
                                          // }
                                          checked={
                                            testdata.sexual.service_group == 1
                                              ? true
                                              : false
                                          }
                                        />
                                        <span class="ml-3">
                                          ????????????????????????????????????????????????????????????
                                        </span>
                                      </label>
                                    </div>
                                    <div class="mt-2 flex justify-left w-1/3">
                                      <label class="inline-flex items-center">
                                        <input
                                          type="checkbox"
                                          class="w-5 h-5 ml-3 rounded "
                                          disabled
                                          // value={
                                          //   testdata.sexual.use_of_sex_comtool
                                          // }
                                          // onChange={(e) =>
                                          //   checkboxclick(
                                          //     "sexual",
                                          //     "use_of_sex_comtool",
                                          //     e
                                          //   )
                                          // }
                                          checked={
                                            testdata.sexual
                                              .use_of_sex_comtool == 1
                                              ? true
                                              : false
                                          }
                                        />
                                      </label>
                                      <span class="ml-3">
                                        ??????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
                                      </span>
                                    </div>
                                    <div class="mt-2 flex justify-left w-1/3">
                                      <label class="inline-flex items-center">
                                        <input
                                          type="checkbox"
                                          class="w-5 h-5 ml-3 rounded "
                                          disabled
                                          // value={testdata.sexual.pregnant}
                                          // onChange={(e) =>
                                          //   checkboxclick(
                                          //     "sexual",
                                          //     "pregnant",
                                          //     e
                                          //   )
                                          // }
                                          checked={
                                            testdata.sexual.pregnant == 1
                                              ? true
                                              : false
                                          }
                                        />
                                        <span class="ml-3">???????????????????????????</span>
                                      </label>
                                    </div>
                                  </div>
                                  <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-12"></div>

                                    <div class="mt-2 flex justify-left w-1/3">
                                      <label class="inline-flex items-center">
                                        <input
                                          type="checkbox"
                                          class="w-5 h-5 ml-3 rounded "
                                          disabled
                                          // value={testdata.sexual.prostitution}
                                          // onChange={(e) =>
                                          //   checkboxclick(
                                          //     "sexual",
                                          //     "prostitution",
                                          //     e
                                          //   )
                                          // }
                                          checked={
                                            testdata.sexual.prostitution == 1
                                              ? true
                                              : false
                                          }
                                        />
                                        <span class="ml-3">
                                          ?????????????????????????????????????????????{" "}
                                        </span>
                                      </label>
                                    </div>
                                    <div class="mt-2 flex justify-left w-1/3">
                                      <label class="inline-flex items-center">
                                        <input
                                          type="checkbox"
                                          class="w-5 h-5 ml-3 rounded "
                                          disabled
                                          // value={
                                          //   testdata.sexual
                                          //     .Obsessed_of_sex_comtool
                                          // }
                                          // onChange={(e) =>
                                          //   checkboxclick(
                                          //     "sexual",
                                          //     "Obsessed_of_sex_comtool",
                                          //     e
                                          //   )
                                          // }
                                          checked={
                                            testdata.sexual
                                              .Obsessed_of_sex_comtool == 1
                                              ? true
                                              : false
                                          }
                                        />
                                      </label>
                                      <span class="ml-3">
                                        ?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
                                      </span>
                                    </div>
                                    <div class="mt-2 flex justify-left w-1/3">
                                      <label class="inline-flex items-center">
                                        <input
                                          type="checkbox"
                                          class="w-5 h-5 ml-3 rounded "
                                          disabled
                                          // value={testdata.sexual.sexually_mixed}
                                          // onChange={(e) =>
                                          //   checkboxclick(
                                          //     "sexual",
                                          //     "sexually_mixed",
                                          //     e
                                          //   )
                                          // }
                                          checked={
                                            testdata.sexual.sexually_mixed == 1
                                              ? true
                                              : false
                                          }
                                        />
                                        <span class="ml-3">
                                          ??????????????????????????????????????????????????????
                                        </span>
                                      </label>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex flex-col mb-4">
                                  <div className="flex flex-row pl-2 mt-5">
                                    <label
                                      className="ml-2 mb-2 pl-1 font-bold text-xl text-gray-900  w-12"
                                      htmlFor="first_name"
                                    ></label>
                                    <label
                                      className="ml-2 mb-2 pl-1 font-bold text-xl text-gray-900  w-full"
                                      htmlFor="first_name"
                                    >
                                      ???????????????????????????
                                    </label>
                                  </div>
                                  <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-12"></div>

                                    <div class="mt-2 flex justify-left w-1/3">
                                      <label class="inline-flex items-center">
                                        <input
                                          type="checkbox"
                                          class="w-5 h-5 ml-3 rounded"
                                          disabled
                                          // value={
                                          //   testdata.game_addiction
                                          //     .more_than_1_hour
                                          // }
                                          // onChange={(e) =>
                                          //   checkboxclick(
                                          //     "game_addiction",
                                          //     "more_than_1_hour",
                                          //     e
                                          //   )
                                          // }
                                          checked={
                                            testdata.game_addiction
                                              .more_than_1_hour == 1
                                              ? true
                                              : false
                                          }
                                        />
                                        <span class="ml-3">
                                          ???????????????????????????????????????????????? 1 ?????????????????????{" "}
                                        </span>
                                      </label>
                                    </div>
                                    <div class="mt-2 flex justify-left w-1/3">
                                      <label class="inline-flex items-center">
                                        <input
                                          type="checkbox"
                                          class="w-5 h-5 ml-3 rounded"
                                          disabled
                                          // value={
                                          //   testdata.game_addiction
                                          //     .Lack_of_imagination
                                          // }
                                          // onChange={(e) =>
                                          //   checkboxclick(
                                          //     "game_addiction",
                                          //     "Lack_of_imagination",
                                          //     e
                                          //   )
                                          // }
                                          checked={
                                            testdata.game_addiction
                                              .Lack_of_imagination == 1
                                              ? true
                                              : false
                                          }
                                        />
                                      </label>
                                      <span class="ml-3">
                                        ????????????????????????????????????????????????????????????????????????????????????????????????
                                      </span>
                                    </div>
                                    <div class="mt-2 flex justify-left w-1/3">
                                      <label class="inline-flex items-center">
                                        <input
                                          type="checkbox"
                                          class="w-5 h-5 ml-3 rounded"
                                          disabled
                                          // value={
                                          //   testdata.game_addiction.Isolated
                                          // }
                                          // onChange={(e) =>
                                          //   checkboxclick(
                                          //     "game_addiction",
                                          //     "Isolated",
                                          //     e
                                          //   )
                                          // }
                                          checked={
                                            testdata.game_addiction.Isolated ==
                                            1
                                              ? true
                                              : false
                                          }
                                        />
                                        <span class="ml-3">
                                          ????????????????????? ????????????????????????????????????????????????????????????
                                        </span>
                                      </label>
                                    </div>
                                  </div>
                                  <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-12"></div>

                                    <div class="mt-2 flex justify-left w-1/3">
                                      <label class="inline-flex items-center">
                                        <input
                                          type="checkbox"
                                          class="w-5 h-5 ml-3 rounded"
                                          disabled
                                          // value={
                                          //   testdata.game_addiction
                                          //     .unusual_spending
                                          // }
                                          // onChange={(e) =>
                                          //   checkboxclick(
                                          //     "game_addiction",
                                          //     "unusual_spending",
                                          //     e
                                          //   )
                                          // }
                                          checked={
                                            testdata.game_addiction
                                              .unusual_spending == 1
                                              ? true
                                              : false
                                          }
                                        />
                                        <span class="ml-3">
                                          ??????????????????????????????????????????????????????
                                        </span>
                                      </label>
                                    </div>
                                    <div class="mt-2 flex justify-left w-1/3">
                                      <label class="inline-flex items-center">
                                        <input
                                          type="checkbox"
                                          class="w-5 h-5 ml-3 rounded"
                                          disabled
                                          // value={
                                          //   testdata.game_addiction
                                          //     .friends_playing_games
                                          // }
                                          // onChange={(e) =>
                                          //   checkboxclick(
                                          //     "game_addiction",
                                          //     "friends_playing_games",
                                          //     e
                                          //   )
                                          // }
                                          checked={
                                            testdata.game_addiction
                                              .friends_playing_games == 1
                                              ? true
                                              : false
                                          }
                                        />
                                        <span class="ml-3">
                                          ????????????????????????????????????????????????????????????????????????{" "}
                                        </span>
                                      </label>
                                    </div>
                                    <div class="mt-2 flex justify-left w-1/3">
                                      <label class="inline-flex items-center">
                                        <input
                                          type="checkbox"
                                          class="w-5 h-5 ml-3 rounded"
                                          disabled
                                          // value={
                                          //   testdata.game_addiction
                                          //     .game_store_near
                                          // }
                                          // onChange={(e) =>
                                          //   checkboxclick(
                                          //     "game_addiction",
                                          //     "game_store_near",
                                          //     e
                                          //   )
                                          // }
                                          checked={
                                            testdata.game_addiction
                                              .game_store_near == 1
                                              ? true
                                              : false
                                          }
                                        />
                                      </label>
                                      <span class="ml-3">
                                        ?????????????????????????????????????????????????????????????????????????????????????????????
                                      </span>
                                    </div>
                                  </div>
                                  <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-12"></div>

                                    <div class="mt-2 flex justify-left w-1/3">
                                      <label class="inline-flex items-center">
                                        <input
                                          type="checkbox"
                                          class="w-5 h-5 ml-3 rounded"
                                          disabled
                                          // value={
                                          //   testdata.game_addiction
                                          //     .more_than_2_hour
                                          // }
                                          // onChange={(e) =>
                                          //   checkboxclick(
                                          //     "game_addiction",
                                          //     "more_than_2_hour",
                                          //     e
                                          //   )
                                          // }
                                          checked={
                                            testdata.game_addiction
                                              .more_than_2_hour == 1
                                              ? true
                                              : false
                                          }
                                        />
                                        <span class="ml-3">
                                          ?????????????????????????????????????????????????????? 2 ?????????????????????
                                        </span>
                                      </label>
                                    </div>
                                    <div class="mt-2 flex justify-left w-1/3">
                                      <label class="inline-flex items-center">
                                        <input
                                          type="checkbox"
                                          class="w-5 h-5 ml-3 rounded"
                                          disabled
                                          // value={
                                          //   testdata.game_addiction
                                          //     .seriously_with_game
                                          // }
                                          // onChange={(e) =>
                                          //   checkboxclick(
                                          //     "game_addiction",
                                          //     "seriously_with_game",
                                          //     e
                                          //   )
                                          // }
                                          checked={
                                            testdata.game_addiction
                                              .seriously_with_game == 1
                                              ? true
                                              : false
                                          }
                                        />
                                      </label>
                                      <span class="ml-3">
                                        ????????????????????? ?????????????????????????????????????????????????????????{" "}
                                      </span>
                                    </div>
                                    <div class="mt-2 flex justify-left w-1/3">
                                      <label class="inline-flex items-center">
                                        <input
                                          type="checkbox"
                                          class="w-5 h-5 ml-3 rounded"
                                          disabled
                                          // value={
                                          //   testdata.game_addiction.steal_money
                                          // }
                                          // onChange={(e) =>
                                          //   checkboxclick(
                                          //     "game_addiction",
                                          //     "steal_money",
                                          //     e
                                          //   )
                                          // }
                                          checked={
                                            testdata.game_addiction
                                              .steal_money == 1
                                              ? true
                                              : false
                                          }
                                        />
                                      </label>
                                      <span class="ml-3">
                                        ??????????????????????????????????????????????????? ????????????
                                        ?????????????????????????????????????????????????????????????????????
                                      </span>
                                    </div>
                                  </div>
                                  <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-12"></div>
                                    <div class="mt-2 flex justify-left w-1/3">
                                      <label class="inline-flex items-center">
                                        <input
                                          type="checkbox"
                                          class="w-5 h-5 ml-3 rounded"
                                          disabled
                                          // value={testdata.game_addiction.other}
                                          // onChange={(e) =>
                                          //   checkboxclick(
                                          //     "game_addiction",
                                          //     "other",
                                          //     e
                                          //   )
                                          // }
                                          checked={
                                            testdata.game_addiction.other == 1
                                              ? true
                                              : false
                                          }
                                        />
                                        <span class="ml-3">???????????????</span>
                                        <input
                                          className="ml-3 py-1 px-1 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-2/4"
                                          type="text"
                                          disabled
                                          // onChange={(e) =>
                                          //   modalhandleChange(
                                          //     "game_addiction_other",
                                          //     e
                                          //   )
                                          // }
                                        />
                                      </label>
                                    </div>
                                    <div class="mt-2 flex justify-left w-1/3"></div>
                                    <div class="mt-2 flex justify-left w-1/3"></div>
                                  </div>
                                </div>
                                <div className="flex flex-col mb-4">
                                  <div className="flex flex-row pl-2 mt-5">
                                    <label
                                      className="ml-2 mb-2 pl-1 font-bold text-xl text-gray-900  w-12"
                                      htmlFor="first_name"
                                    ></label>
                                    <label
                                      className="ml-2 mb-2 pl-1 font-bold text-xl text-gray-900  w-full"
                                      htmlFor="first_name"
                                    >
                                      ?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
                                    </label>
                                  </div>
                                  <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-12"></div>

                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          class="w-5 h-5 ml-3 rounded"
                                          id="com_internet-1"
                                          type="radio"
                                          value="1"
                                          name="com_internet"
                                          disabled
                                          // onChange={(e) =>
                                          //   onclick("com_internet", e)
                                          // }
                                          checked={
                                            testdata.com_internet == 1
                                              ? true
                                              : false
                                          }
                                        />
                                        <span class="ml-3" for="com_internet-1">
                                          ??????????????????????????????????????? Internet ???????????????????????????????????????
                                        </span>
                                      </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          class="w-5 h-5 ml-3 rounded"
                                          id="com_internet-2"
                                          type="radio"
                                          value="2"
                                          name="com_internet"
                                          disabled
                                          // onChange={(e) =>
                                          //   onclick("com_internet", e)
                                          // }
                                          checked={
                                            testdata.com_internet == 2
                                              ? true
                                              : false
                                          }
                                        />
                                        <span class="ml-3" for="com_internet-2">
                                          ???????????????????????????????????????????????? Internet
                                          ???????????????????????????????????????{" "}
                                        </span>
                                      </label>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex flex-col mb-4">
                                  <div className="flex flex-row pl-2 mt-5">
                                    <label
                                      className="ml-2 mb-2 pl-1 font-bold text-xl text-gray-900  w-12"
                                      htmlFor="first_name"
                                    ></label>
                                    <label
                                      className="ml-2 mb-2 pl-1 font-bold text-xl text-gray-900  w-full"
                                      htmlFor="first_name"
                                    >
                                      ???????????????????????????????????????????????????????????????????????????????????????????????????????????????
                                    </label>
                                  </div>
                                  <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-12"></div>

                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          class="w-5 h-5 ml-3 rounded"
                                          id="electronic_comm-1"
                                          type="radio"
                                          value="1"
                                          name="electronic_comm"
                                          disabled
                                          // onChange={(e) =>
                                          //   onclick("electronic_comm", e)
                                          // }
                                          checked={
                                            testdata.electronic_comm == 1
                                              ? true
                                              : false
                                          }
                                        />
                                        <span
                                          class="ml-3"
                                          for="electronic_comm-1"
                                        >
                                          ????????? Social media/game (???????????????????????????????????? 3
                                          ?????????????????????)
                                        </span>
                                      </label>
                                    </div>
                                  </div>
                                  <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-12"></div>
                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          class="w-5 h-5 ml-3 rounded"
                                          id="electronic_comm-2"
                                          type="radio"
                                          value="2"
                                          name="electronic_comm"
                                          disabled
                                          // onChange={(e) =>
                                          //   onclick("electronic_comm", e)
                                          // }
                                          checked={
                                            testdata.electronic_comm == 2
                                              ? true
                                              : false
                                          }
                                        />
                                        <span
                                          class="ml-3"
                                          for="electronic_comm-2"
                                        >
                                          ????????? Social media/game (??????????????? 3
                                          ???????????????????????????????????????)
                                        </span>
                                      </label>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex flex-col mb-4">
                                  <div className="flex flex-row pl-2 mt-5">
                                    <label
                                      className="ml-2 mb-2 pl-1 font-bold text-xl text-gray-900  w-12"
                                      htmlFor="first_name"
                                    ></label>
                                    <label
                                      className="ml-2 mb-2 pl-1 font-bold text-xl text-gray-900  w-full"
                                      htmlFor="first_name"
                                    >
                                      ????????????????????????????????????????????????????????????
                                    </label>
                                  </div>
                                  <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-12"></div>

                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          type="checkbox"
                                          class="w-5 h-5 ml-3 rounded"
                                          disabled
                                          // value={testdata.informant.father}
                                          // onChange={(e) =>
                                          //   checkboxclick(
                                          //     "informant",
                                          //     "father",
                                          //     e
                                          //   )
                                          // }
                                          checked={
                                            testdata.informant.father == 1
                                              ? true
                                              : false
                                          }
                                        />
                                        <span class="ml-3">???????????? </span>
                                      </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          type="checkbox"
                                          class="w-5 h-5 ml-3 rounded"
                                          disabled
                                          // value={testdata.informant.mother}
                                          // onChange={(e) =>
                                          //   checkboxclick(
                                          //     "informant",
                                          //     "mother",
                                          //     e
                                          //   )
                                          // }
                                          checked={
                                            testdata.informant.mother == 1
                                              ? true
                                              : false
                                          }
                                        />
                                        <span class="ml-3">???????????????</span>
                                      </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          type="checkbox"
                                          class="w-5 h-5 ml-3 rounded"
                                          disabled
                                          // value={testdata.informant.brother}
                                          // onChange={(e) =>
                                          //   checkboxclick(
                                          //     "informant",
                                          //     "brother",
                                          //     e
                                          //   )
                                          // }
                                          checked={
                                            testdata.informant.brother == 1
                                              ? true
                                              : false
                                          }
                                        />
                                        <span class="ml-3">??????????????????</span>
                                      </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          type="checkbox"
                                          class="w-5 h-5 ml-3 rounded"
                                          disabled
                                          // value={testdata.informant.sister}
                                          // onChange={(e) =>
                                          //   checkboxclick(
                                          //     "informant",
                                          //     "sister",
                                          //     e
                                          //   )
                                          // }
                                          checked={
                                            testdata.informant.sister == 1
                                              ? true
                                              : false
                                          }
                                        />
                                        <span class="ml-3">??????????????????</span>
                                      </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          type="checkbox"
                                          class="w-5 h-5 ml-3 rounded"
                                          disabled
                                          // value={testdata.informant.narr}
                                          // onChange={(e) =>
                                          //   checkboxclick(
                                          //     "informant",
                                          //     "narr",
                                          //     e
                                          //   )
                                          // }
                                          checked={
                                            testdata.informant.narr == 1
                                              ? true
                                              : false
                                          }
                                        />
                                        <span class="ml-3">?????????</span>
                                      </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          type="checkbox"
                                          class="w-5 h-5 ml-3 rounded"
                                          disabled
                                          // value={testdata.informant.r}
                                          // onChange={(e) =>
                                          //   checkboxclick("informant", "r", e)
                                          // }
                                          checked={
                                            testdata.informant.r == 1
                                              ? true
                                              : false
                                          }
                                        />
                                        <span class="ml-3">?????? </span>
                                      </label>
                                    </div>
                                  </div>
                                  <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-12"></div>
                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          type="checkbox"
                                          class="w-5 h-5 ml-3 rounded"
                                          disabled
                                          // value={testdata.informant.par}
                                          // onChange={(e) =>
                                          //   checkboxclick("informant", "par", e)
                                          // }
                                          checked={
                                            testdata.informant.par == 1
                                              ? true
                                              : false
                                          }
                                        />
                                        <span class="ml-3">?????????</span>
                                      </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          type="checkbox"
                                          class="w-5 h-5 ml-3 rounded"
                                          disabled
                                          // value={testdata.informant.lung}
                                          // onChange={(e) =>
                                          //   checkboxclick(
                                          //     "informant",
                                          //     "lung",
                                          //     e
                                          //   )
                                          // }
                                          checked={
                                            testdata.informant.lung == 1
                                              ? true
                                              : false
                                          }
                                        />
                                        <span class="ml-3">?????????</span>
                                      </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          type="checkbox"
                                          class="w-5 h-5 ml-3 rounded"
                                          disabled
                                          // value={testdata.informant.pu}
                                          // onChange={(e) =>
                                          //   checkboxclick("informant", "pu", e)
                                          // }
                                          checked={
                                            testdata.informant.pu == 1
                                              ? true
                                              : false
                                          }
                                        />
                                        <span class="ml-3">?????????</span>
                                      </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          type="checkbox"
                                          class="w-5 h-5 ml-3 rounded"
                                          disabled
                                          // value={testdata.informant.ya}
                                          // onChange={(e) =>
                                          //   checkboxclick("informant", "ya", e)
                                          // }
                                          checked={
                                            testdata.informant.ya == 1
                                              ? true
                                              : false
                                          }
                                        />
                                        <span class="ml-3">?????????</span>
                                      </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          type="checkbox"
                                          class="w-5 h-5 ml-3 rounded"
                                          disabled
                                          // value={testdata.informant.ta}
                                          // onChange={(e) =>
                                          //   checkboxclick("informant", "ta", e)
                                          // }
                                          checked={
                                            testdata.informant.ta == 1
                                              ? true
                                              : false
                                          }
                                        />
                                        <span class="ml-3">?????? </span>
                                      </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          type="checkbox"
                                          class="w-5 h-5 ml-3 rounded"
                                          disabled
                                          // value={testdata.informant.yai}
                                          // onChange={(e) =>
                                          //   checkboxclick("informant", "yai", e)
                                          // }
                                          checked={
                                            testdata.informant.yai == 1
                                              ? true
                                              : false
                                          }
                                        />
                                        <span class="ml-3">?????????</span>
                                      </label>
                                    </div>
                                  </div>
                                  <div class="flex flex-row pl-2 mt-3">
                                    <div className="  ml-10 text-xl text-left  w-12"></div>

                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          type="checkbox"
                                          class="w-5 h-5 ml-3 rounded"
                                          disabled
                                          // value={testdata.informant.tuad}
                                          // onChange={(e) =>
                                          //   checkboxclick(
                                          //     "informant",
                                          //     "tuad",
                                          //     e
                                          //   )
                                          // }
                                          checked={
                                            testdata.informant.tuad == 1
                                              ? true
                                              : false
                                          }
                                        />
                                        <span class="ml-3">?????????</span>
                                      </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          type="checkbox"
                                          class="w-5 h-5 ml-3 rounded"
                                          disabled
                                          // value={testdata.informant.stepfather}
                                          // onChange={(e) =>
                                          //   checkboxclick(
                                          //     "informant",
                                          //     "stepfather",
                                          //     e
                                          //   )
                                          // }
                                          checked={
                                            testdata.informant.stepfather == 1
                                              ? true
                                              : false
                                          }
                                        />
                                        <span class="ml-3">??????????????????????????? </span>
                                      </label>
                                    </div>
                                    <div class="mt-2 flex justify-center">
                                      <label class="inline-flex items-center">
                                        <input
                                          type="checkbox"
                                          class="w-5 h-5 ml-3 rounded"
                                          disabled
                                          // value={testdata.informant.stepmother}
                                          // onChange={(e) =>
                                          //   checkboxclick(
                                          //     "informant",
                                          //     "stepmother",
                                          //     e
                                          //   )
                                          // }
                                          checked={
                                            testdata.informant.stepmother == 1
                                              ? true
                                              : false
                                          }
                                        />
                                        <span class="ml-3">??????????????????????????? </span>
                                      </label>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex flex-col pl-2 mt-10">
                                  <div className="   text-xl text-center  w-full">
                                    ???????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
                                  </div>
                                  <div className="flex flex-col mb-4">
                                    <div className="flex flex-row pl-2 ">
                                      <label
                                        className=" mb-2 pl-1 font-bold text-xl text-gray-900  w-12"
                                        htmlFor="first_name"
                                      ></label>
                                      <label
                                        className="ml-3 mb-2 pl-1 text-lg text-gray-900  w-1/4"
                                        htmlFor="first_name"
                                      >
                                        ?????????????????????????????????????????????????????????????????????
                                      </label>
                                    </div>
                                    <div class="flex flex-row pl-2 mt-3">
                                      <label
                                        className=" mb-2 pl-1 font-bold text-xl text-gray-900  w-12"
                                        htmlFor="first_name"
                                      ></label>
                                      <DatePicker
                                        dateFormat="yyyy-MM-dd"
                                        className=" py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-1/4 "
                                        disabled
                                        selected={new Date(testdata.visit_date)}
                                        // onChange={(e) =>
                                        //   modalhandleChange("visit_date", e)
                                        // }
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="flex flex-col mb-4">
                                  <div className="flex flex-row pl-2 ">
                                    <label
                                      className=" mb-2 pl-1 font-bold text-xl text-gray-900  w-12"
                                      htmlFor="first_name"
                                    ></label>
                                    <label
                                      className="ml-3 mb-2 pl-1 text-lg text-gray-900  w-1/4"
                                      htmlFor="first_name"
                                    >
                                      ?????????????????????
                                    </label>
                                  </div>
                                  <div class="flex flex-row pl-2 mt-3">
                                    <label
                                      className=" mb-2 pl-1 font-bold text-xl text-gray-900  w-12"
                                      htmlFor="first_name"
                                    ></label>
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
                                      placeholder="Your message..."
                                      value={testdata.current_address}
                                      disabled
                                      // onChange={(e) =>
                                      //   modalhandleChange("current_address", e)
                                      // }
                                    ></textarea>
                                  </div>
                                </div>
                                <div className="flex flex-col mb-4">
                                  <div className="flex flex-row w-full  mt-3">
                                    <label
                                      className="ml-2 mb-2 pl-1 font-bold text-lg text-gray-900  w-12"
                                      htmlFor="first_name"
                                    ></label>
                                    <label
                                      className="ml-2 mb-2 pl-1 text-lg text-gray-900  w-full"
                                      htmlFor="first_name"
                                    >
                                      ????????????????????????????????????????????????(????????????
                                      ?????????????????????????????????,?????????????????????????????????????????????-?????????????????????)
                                    </label>
                                  </div>
                                  <div className="flex flex-row mb-4">
                                    <label
                                      className="ml-2 mb-2 pl-1 font-bold text-lg text-gray-900  w-12"
                                      htmlFor="first_name"
                                    ></label>

                                    <input
                                      className="ml-2 py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-1/3"
                                      type="text"
                                      value={testdata.current_address_near}
                                      disabled
                                      // onChange={(e) =>
                                      //   modalhandleChange(
                                      //     "current_address_near",
                                      //     e
                                      //   )
                                      // }
                                    />
                                  </div>
                                </div>
                                <div className="flex flex-col mb-4">
                                  <div className="flex flex-row w-full  mt-3">
                                    <label
                                      className="ml-2 mb-2 pl-1 font-bold text-lg text-gray-900  w-12"
                                      htmlFor="first_name"
                                    ></label>
                                    <label
                                      className="ml-2 mb-2 pl-1 text-lg text-gray-900  w-full"
                                      htmlFor="first_name"
                                    >
                                      ??????????????????????????? ??????????????????????????????????????????????????????
                                    </label>
                                  </div>
                                  <div className="flex flex-row mb-4">
                                    <label
                                      className="ml-2 mb-2 pl-1 font-bold text-lg text-gray-900  w-12"
                                      htmlFor="first_name"
                                    ></label>

                                    <div class="mt-2 flex justify-left">
                                      <label class="inline-flex items-center">
                                        <input
                                          class="w-5 h-5 ml-3 rounded"
                                          id="attached_photos-1"
                                          type="radio"
                                          value="1"
                                          name="attached_photos"
                                          disabled
                                          // onChange={(e) =>
                                          //   onclick("attached_photos", e)
                                          // }
                                          checked={
                                            testdata.attached_photos == 1
                                              ? true
                                              : false
                                          }
                                        />
                                        <span
                                          class="ml-3"
                                          for="attached_photos-1"
                                        >
                                          ???????????????????????????????????????????????????????????????????????????
                                          (?????????????????????????????????/????????????){" "}
                                        </span>
                                      </label>
                                    </div>
                                  </div>
                                  <div className="flex flex-row mb-4">
                                    <label
                                      className="ml-2 mb-2 pl-1 font-bold text-lg text-gray-900  w-12"
                                      htmlFor="first_name"
                                    ></label>

                                    <div class="mt-2 flex justify-left">
                                      <label class="inline-flex items-center">
                                        <input
                                          class="w-5 h-5 ml-3 rounded"
                                          id="attached_photos-2"
                                          type="radio"
                                          value="2"
                                          name="attached_photos"
                                          disabled
                                          // onChange={(e) =>
                                          //   onclick("attached_photos", e)
                                          // }
                                          checked={
                                            testdata.attached_photos == 2
                                              ? true
                                              : false
                                          }
                                        />
                                        <span
                                          class="ml-3"
                                          for="attached_photos-2"
                                        >
                                          ?????????????????????????????????/??????????????????????????????????????????????????????????????????{" "}
                                        </span>
                                      </label>
                                    </div>
                                  </div>
                                  <div className="flex flex-row mb-4">
                                    <label
                                      className="ml-2 mb-2 pl-1 font-bold text-lg text-gray-900  w-12"
                                      htmlFor="first_name"
                                    ></label>

                                    <div class="mt-2 flex justify-left">
                                      <label class="inline-flex items-center">
                                        <input
                                          class="w-5 h-5 ml-3 rounded"
                                          id="attached_photos-3"
                                          type="radio"
                                          value="3"
                                          name="attached_photos"
                                          disabled
                                          // onChange={(e) =>
                                          //   onclick("attached_photos", e)
                                          // }
                                          checked={
                                            testdata.attached_photos == 3
                                              ? true
                                              : false
                                          }
                                        />
                                      </label>
                                      <span
                                        class="ml-3"
                                        for="attached_photos-3"
                                      >
                                        ???????????????????????????????????????????????????????????? ????????? ????????????????????? ???????????????
                                        ?????????????????? ??????????????????????????????????????????
                                      </span>
                                    </div>
                                  </div>
                                  <div className="flex flex-row mb-4">
                                    <label
                                      className="ml-2 mb-2 pl-1 font-bold text-lg text-gray-900  w-12"
                                      htmlFor="first_name"
                                    ></label>

                                    <div class="mt-2 flex justify-left w-1/2">
                                      <label class="inline-flex items-center">
                                        <input
                                          class="w-5 h-5 ml-3 rounded"
                                          id="attached_photos-4"
                                          type="radio"
                                          value="4"
                                          name="attached_photos"
                                          disabled
                                          // onChange={(e) =>
                                          //   onclick("attached_photos", e)
                                          // }
                                          checked={
                                            testdata.attached_photos == 4
                                              ? true
                                              : false
                                          }
                                        />
                                      </label>
                                      <span
                                        class="ml-3"
                                        for="attached_photos-4"
                                      >
                                        ??????????????????????????????????????????????????????????????????????????????????????????
                                        ?????????????????????????????????????????????????????????????????????????????? ???????????????????????????
                                        ???????????????????????????????????????????????????/?????????????????????????????????/??????????????????????????????
                                        ???????????????????????????????????????????????????????????????????????????????????????{" "}
                                      </span>
                                    </div>
                                  </div>
                                </div>

                                <div className="flex flex-col mb-4">
                                  <div className="flex flex-row mt-5 ">
                                    <label
                                      className="ml-2 mb-2 pl-1 font-bold text-xl text-gray-900  w-12"
                                      htmlFor="first_name"
                                    ></label>
                                    <label
                                      className="ml-2 mb-2 pl-1 font-bold text-xl text-gray-900  w-full"
                                      htmlFor="first_name"
                                    >
                                      ??????????????????????????????
                                    </label>
                                  </div>

                                  <div className="flex flex-row w-full  mt-3">
                                    <label
                                      className="ml-2 mb-2 pl-1 font-bold text-lg text-gray-900  w-12"
                                      htmlFor="first_name"
                                    ></label>
                                    <label
                                      className="ml-2 mb-2 pl-1 text-lg text-gray-900  w-3/4"
                                      htmlFor="first_name"
                                      onmousemove="this.value=event.clientX+':'+event.clientY"
                                      value="Mouse over me"
                                    >
                                      ??????????????? iframe ??????????????????
                                    </label>
                                  </div>
                                  <div className="flex flex-row mb-4">
                                    <label
                                      className="ml-2 mb-2 pl-1 font-bold text-lg text-gray-900  w-12"
                                      htmlFor="first_name"
                                    ></label>
                                    <Image
                                      width={700}
                                      height={450}
                                      src="/img/iframemap.gif"
                                      alt="profile"
                                      className="mx-auto"
                                    />
                                  </div>
                                  <div className="flex flex-row mb-4">
                                    <label
                                      className="ml-2 mb-2 pl-1 font-bold text-lg text-gray-900  w-12"
                                      htmlFor="first_name"
                                    ></label>

                                    <input
                                      className="ml-2 py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-3/4"
                                      type="text"
                                      placeholder='<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1893.8216169426996!2d99.39656997594824!3d18.317916543161907!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x57a536bb8651802b!2zMTjCsDE5JzA0LjUiTiA5OcKwMjMnNTEuNiJF!5e0!3m2!1sth!2sth!4v1654154264086!5m2!1sth!2sth" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>'
                                      // onChange={(e) =>
                                      //   modalhandleChange(
                                      //     "iframe_google_map",
                                      //     e
                                      //   )
                                      // }
                                      disabled
                                    />
                                  </div>
                                </div>
                                <div className="flex flex-col mb-4">
                                  <div className="flex flex-row w-full  mt-3">
                                    <label
                                      className="ml-2 mb-2 pl-1 font-bold text-lg text-gray-900  w-12"
                                      htmlFor="first_name"
                                    ></label>
                                    <label
                                      className="ml-2 mb-2 pl-1 text-lg text-gray-900  w-3/4"
                                      htmlFor="first_name"
                                      onmousemove="this.value=event.clientX+':'+event.clientY"
                                      value="Mouse over me"
                                    >
                                      Google map
                                    </label>
                                  </div>
                                  <div className="flex flex-row mb-4">
                                    <label
                                      className="ml-2 mb-2 pl-1 font-bold text-lg text-gray-900  w-12"
                                      htmlFor="first_name"
                                    ></label>
                                    <Image
                                      width={700}
                                      height={450}
                                      src="/img/googlemap.gif"
                                      alt="profile"
                                      className="mx-auto"
                                    />
                                  </div>
                                  <div className="flex flex-row mb-4">
                                    <label
                                      className="ml-2 mb-2 pl-1 font-bold text-lg text-gray-900  w-12"
                                      htmlFor="first_name"
                                    ></label>

                                    <input
                                      className="ml-2 py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-3/4"
                                      type="text"
                                      placeholder="URL Google Map"
                                      // onChange={(e) =>
                                      //   modalhandleChange("google_map", e)
                                      // }
                                      disabled
                                    />
                                  </div>
                                </div>
                                <div className="flex flex-col mb-4">
                                  <div className="flex flex-row w-full  mt-3">
                                    <label
                                      className="ml-2 mb-2 pl-1 font-bold text-lg text-gray-900  w-12"
                                      htmlFor="first_name"
                                    ></label>
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
                                      ?????????????????? 2
                                      ??????????????????????????????????????????????????????????????????????????????????????????????????????????????????
                                    </label>
                                  </div>

                                  <div className="flex flex-row mb-4">
                                    <label
                                      className="ml-2 mb-2 pl-1 font-bold text-lg text-gray-900  w-12"
                                      htmlFor="first_name"
                                    ></label>

                                    <input
                                      className="ml-2 py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-1/2 disabled"
                                      // onChange={(e) =>
                                      //   imageadd(
                                      //     "photo_house",
                                      //     e.target.files[0]
                                      //   )
                                      // }
                                      disabled
                                      type="file"
                                      id="myfile"
                                    />
                                    <label
                                      className="ml-2 mb-2 pl-1 font-bold text-lg text-gray-900  w-12"
                                      htmlFor="first_name"
                                    ></label>
                                    <input
                                      className="ml-2 py-2 px-3 border-solid  border border-gray-300 outline-none  rounded-lg shadow w-1/2 disabled"
                                      // onChange={(e) =>
                                      //   imageadd(
                                      //     "photo_teacher_fm_student",
                                      //     e.target.files[0]
                                      //   )
                                      // }
                                      disabled
                                      type="file"
                                      id="myfile"
                                    />
                                    <label
                                      className="ml-2 mb-2 pl-1 font-bold text-lg text-gray-900  w-12"
                                      htmlFor="first_name"
                                    ></label>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </main>
                        </div>
                      </div>
                      {/*footer*/}
                      <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                        <button
                          className=" shadow hover:shadow-lg text-white bg-red-600 hover:text-red-600   border-2   border-white hover:border-red-600  hover:bg-white rounded-lg background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                          type="button"
                          onClick={() => closeViewmodal()}
                        >
                          Close
                        </button>
                        {/* <button
                          className=" shadow hover:shadow-lg text-white bg-green-600 hover:text-green-600   border-2   border-white hover:border-green-600  hover:bg-white rounded-lg background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                          type="button"
                          onClick={() => addcommit()}
                        >
                          ??????????????????
                        </button> */}
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

export default student_homevisit_test;
