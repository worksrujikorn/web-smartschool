import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import moment from "moment";
import Swal from "sweetalert2";
import Image from "next/image";
import { Markup } from "interweave";
import { postreportHomeVisitbyOne } from "../../action/teacher";
import { parse } from "node-html-parser";
function report() {
  const [reportmap, setreportmap] = useState({
    title: "",
    firstname_student: "",
    lastname_student: "",
    student_no: "",
    classroom_name: "",
    phonenumber: "",
    father_name: "",
    father_occupation: "",
    father_phonenumber: "",
    mother_name: "",
    mother_occupation: "",
    mother_phonenumber: "",
    fm_marital_status: "",
    parent_relation: "",
    parent_name: "",
    parent_occupaton: "",
    parent_phonenumber: "",
    household_member: "",
    hours_family_together: "",
    relationship_father_chk: "",
    relationship_mother_chk: "",
    relationship_brother_chk: "",
    relationship_sister_chk: "",
    relationship_grand: "",
    relationship_relative: "",
    relationship_other: "",
    relationship_other_name: "",
    parents_leave_child_with_someone: "",
    household_income: "",
    receive_expenses_from: "",
    money_to_school: "",
    work_to_earn: "",
    work_to_earn_inc_perday: "",
    want_schools_help: "",
    want_schools_help_other: "",
    agency_help: "",
    agency_help_other: "",
    Parents_concern: "",
    dependency: "",
    housing_type: "",
    housing_envir: "",
    housing_envir_other: "",
    fm_vehicle: "",
    farm_land: "",
    farm_land_number: "",
    health: "",
    welfare_safety: "",
    distance_school_km: "",
    distance_school_hr: "",
    distance_school_min: "",
    journey: "",
    journey_other: "",
    work_responsibility: "",
    work_responsibility_other: "",
    hobbies: "",
    hobbies_other: "",
    substance_abuse: "",
    violent: "",
    violent_other: "",
    sexual: "",
    game_addiction: "",
    game_addiction_other: "",
    com_internet: "",
    electronic_comm: "",
    informant: "",
    current_address: "",
    current_address_near: "",
    attached_photos: "",
    photo_house: "",
    photo_teacher_fm_student: "",
    picture: "",
    geolocation_house: "",
    teacher_signature1: "",
    teacher_signature2: "",
    teacher_signature3: "",
    Created_date: "",
    Cwho: "",
    iframe_google_map: "",
    google_map: "",
    picture: "",
    parents_leave_child_with_someone_other: "",
  });
  useEffect(async () => {
    let home_visit_id = localStorage.getItem("home_visit_id");
    localStorage.removeItem("home_visit_id");
    let value = { home_visit_id: home_visit_id };
    let data = await postreportHomeVisitbyOne(value);
    console.log(data[0]);
    console.log(reportmap.fm_marital_status);

    let json = JSON.parse(
      '{"closed":1,"casual":0,"distant":0,"oppose":0, "none":0}'
    );
    setreportmap({
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
      household_income: data[0].household_income,
      receive_expenses_from: data[0].receive_expenses_from,
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
      picture: data[0].picture,
      parents_leave_child_with_someone_other:
        data[0].parents_leave_child_with_someone_other,
    });
    setTimeout(() => {
      window.scrollTo(0, 0);
      setTimeout(() => {
        window.scrollTo(0, 99999);
        setTimeout(() => {
          window.print();
        }, 1000);
      }, 1000);
    }, 1000);
  }, []);

  const googlemap = () => {
    let data = reportmap.iframe_google_map;
    // console.log("data", data)
    var regex = /<iframe.*?src="(.*?)"/;
    var src = regex.exec(data)[1];

    console.log("test", src);

    return src;

    // data = data.replace(' style="border:0;"', "")
    // let root = parse(data);
    // console.log(root)
    // console.log('root', root.childNodes[0].rawAttrs);
    // return (
    //     <Markup content={data} />
    // )
  };
  return (
    <div className="a4">
      <div className="flex flex-col items-center text-center section mt-1">
        <div className="flex flex-row w-full px-12">
          <div className="w-1/3 border-b border-black"></div>
          <div className="w-1/3 flex flex-col border-b border-black">
            <div>
              <Image
                width={40}
                height={50}
                src="/img/logosorportor.png"
                alt="profile"
                className="mx-auto"
              />
            </div>

            <label className="mt-2 font-bold">บันทึกการเยี่ยมบ้าน</label>
          </div>
          <div className="w-1/3 border-b border-black flex flex-col justify-end items-end text-end">
            <div className="">
              <label className="mt-2 font-bold border border-black p-1">
                กนช.5
              </label>
            </div>
            <label className="mt-2 m-1">หน้า1/4</label>
          </div>
        </div>
        <div className="flex flex-row w-full pb-5">
          <div className=" flex flex-col w-5/6">
            <div className="flex mt-1 flex-row items-center text-center">
              <label className="w-1/6"> </label>
              <label className="w-5/6">
                งานระบบดูแลช่วยเหลือนักเรียน กลุ่มบริหารกิจการนักเรียน{" "}
              </label>
            </div>
            <div className="flex mt-1 flex-row items-center text-center">
              <label className="w-1/6"> </label>
              <label className="w-5/6">
                โรงเรียนเฉลิมพระเกียรติ ๖๐ พรรษา
                สำนักงานเขตพื้นที่การศึกษามัธยมศึกษาปทุมธานี
              </label>
            </div>
            <div className="flex mt-1 flex-row">
              <label>คำชี้แจง :</label>
            </div>
            <div className="flex mt-1 flex-row">
              <label>
                • แบบบันทึกฯฉบับนี้รวมการคัดกรองนักเรียนยากจนเข้าด้วยกัน
                เพื่อให้คุณครูสามารถลงพื้นที่ได้พร้อมกันในครั้งเดียว
              </label>
            </div>
            <div className="flex mt-1 flex-row">
              <label>
                • การตอบแบบสอบถาม : ทำเครื่องหมาย ✓ ลงในช่อง{" "}
                <input type="checkbox" /> ตามความเป็นจริง
              </label>
            </div>
          </div>
          <div className=" flex flex-col w-1/6 border justify-center items-center ">
            {reportmap.picture ? (
              <Image
                width={100}
                height={120}
                src={reportmap.picture}
                alt="profile"
                className="mx-auto"
              />
            ) : (
              <div>รูปภาพ</div>
            )}
          </div>
        </div>
        <div className=" flex flex-col mb-10 w-full">
          <div className="flex mt-1 flex-row text-start items-end">
            <div className="w-60">
              1. ชื่อ-สกุล นักเรียน (ด.ช./ด.ญ./นาย/น.ส.)
            </div>
            <label
              className=" border-dashed border-b border-black w-48 text-center"
              type="text"
            >
              {reportmap.firstname_student + " " + reportmap.lastname_student}
            </label>
            <div className="w-12">เลขที่</div>
            <label
              className=" border-dashed border-b border-black w-7 text-center"
              type="text"
            >
              {reportmap.student_no || ""}
            </label>
            <div className="w-7">ชั้น</div>
            <label
              className=" border-dashed border-b border-black w-10 text-center"
              type="text"
            >
              {reportmap.classroom_name || ""}
            </label>
            <div className="w-20 ml-1">เบอร์โทรศัพท์</div>
            <label
              className=" border-dashed border-b border-black w-32 text-center"
              type="text"
            >
              {reportmap.phonenumber || ""}
            </label>
          </div>
          <div className="flex mt-1 flex-row text-start items-end">
            <div className=" pl-3">ชื่อ-สกุล บิดา</div>
            <label
              className=" border-dashed border-b border-black w-64"
              type="text"
            >
              {reportmap.father_name || ""}
            </label>
            <div className="w-12">อาชีพ</div>
            <label
              className=" border-dashed border-b border-black w-48"
              type="text"
            >
              {reportmap.father_occupation || ""}
            </label>
            <div className="w-20 pr-1">เบอร์โทรศัพท์</div>
            <label
              className=" border-dashed border-b border-black w-32"
              type="text"
            >
              {reportmap.father_phonenumber || ""}
            </label>
          </div>
          <div className="flex mt-1 flex-row text-start items-end">
            <div className=" pl-3">ชื่อ-สกุล มารดา</div>
            <label
              className=" border-dashed border-b border-black w-60"
              type="text"
            >
              {reportmap.mother_name || ""}
            </label>
            <div className="w-12 pl-1">อาชีพ</div>
            <label
              className=" border-dashed border-b border-black w-48"
              type="text"
            >
              {reportmap.mother_occupation || ""}
            </label>
            <div className="w-20 pl-1">เบอร์โทรศัพท์</div>
            <label
              className=" border-dashed border-b border-black w-32"
              type="text"
            >
              {reportmap.mother_phonenumber || ""}
            </label>
          </div>
          <div className="flex mt-1 flex-row text-start items-center">
            <div className="px-3">สถานะภาพบิดา-มารดา</div>
            <input
              className="text-black"
              checked={reportmap.fm_marital_status == "1" ? true : false}
              type="checkbox"
            />
            <div className="px-2">อยู่ร่วมกัน</div>
            <input
              className="text-black"
              checked={reportmap.fm_marital_status == "2" ? true : false}
              type="checkbox"
            />
            <div className="px-2">แยกกันอยู่</div>
            <input
              className="text-black"
              checked={reportmap.fm_marital_status == "3" ? true : false}
              type="checkbox"
            />
            <div className="px-2">หย่าร้าง</div>
            <input
              className="text-black"
              checked={reportmap.fm_marital_status == "4" ? true : false}
              type="checkbox"
            />
            <div className="px-2">บิดาเสียชีวิต</div>
            <input
              className="text-black"
              checked={reportmap.fm_marital_status == "5" ? true : false}
              type="checkbox"
            />
            <div className="px-2">มารดาเสียชีวิต</div>
          </div>
          <div className="flex mt-1 flex-row text-start items-end">
            <div className="pl-3">
              ชื่อผู้ปกครองนักเรียน (กรณีผู้ปกครองไม่ใช่บิดา-มารดา)
              ความสัมพันธ์ของผู้ปกครองกับนักเรียน
            </div>
            <label
              className=" border-dashed border-b border-black w-60"
              type="text"
            >
              {reportmap.parent_relation || ""}
            </label>
          </div>
          <div className="flex mt-1 flex-row text-start items-end">
            <div className=" pl-3">ชื่อ-สกุล ผู้ปกครอง</div>
            <label
              className=" border-dashed border-b border-black w-56"
              type="text"
            >
              {reportmap.parent_name || ""}
            </label>
            <div className="w-10">อาชีพ</div>
            <label
              className=" border-dashed border-b border-black w-48"
              type="text"
            >
              {reportmap.parent_occupaton || ""}
            </label>
            <div className="w-20 pl-1">เบอร์โทรศัพท์</div>
            <label
              className=" border-dashed border-b border-black w-32"
              type="text"
            >
              {reportmap.parent_phonenumber || ""}
            </label>
          </div>
          <div className="flex mt-1 flex-row text-start items-end">
            <div className="">2. ความสัมพันธ์ในครอบครัว </div>
          </div>
          <div className="flex mt-1 flex-row text-start items-end">
            <div className=" pl-3">
              2.1 จำนวนสมาชิกในครัวเรือน (รวมตัวนักเรียน)
            </div>
            <label
              className=" border-dashed border-b border-black w-60"
              type="text"
            >
              {reportmap.household_member || ""}
            </label>
            <div className=" pl-3">คน</div>
          </div>
          <div className="flex mt-1 flex-row text-start items-end">
            <div className=" pl-3">
              2.2 สมาชิกในครอบครัวมีเวลาอยู่ร่วมกันกี่ชั่วโมงต่อวัน
            </div>
            <label
              className=" border-dashed border-b border-black w-60"
              type="text"
            >
              {reportmap.hours_family_together || ""}
            </label>
            <div className=" pl-3">ชั่วโมง/วัน</div>
          </div>
          <div className="flex mt-1 flex-row text-start items-end">
            <div className=" pl-3">
              2.3 ความสัมพันธ์ระหว่างนักเรียนกับสมาชิกในครอบครัว (ทำเครื่องหมำย
              ✓ ลงในช่อง)
            </div>
          </div>
          <div className="flex flex-row p-10 pt-3 pb-0">
            <div className="w-1/2 flex flex-row font-bold">
              <div className="w-3/4 border border-black">สมาชิก</div>
              <div className="w-1/4 border border-l-0 border-black">
                สนิทสนม
              </div>
            </div>
            <div className="w-1/2 flex flex-row font-bold">
              <div className="w-1/4 border border-l-0 border-black">เฉยๆ</div>
              <div className="w-1/4 border border-l-0 border-black">
                ห่างเหิน
              </div>
              <div className="w-1/4 border border-l-0 border-black">
                ขัดแย้ง
              </div>
              <div className="w-1/4 border border-l-0 border-black">ไม่มี</div>
            </div>
          </div>
          <div className="flex flex-row px-10">
            <div className="w-1/2 flex flex-row">
              <div className="w-3/4 border border-t-0 py-1 border-black text-start flex items-start pl-5">
                บิดา
              </div>
              <div className="w-1/4 border border-t-0 py-1 border-l-0 border-black">
                {reportmap.relationship_father_chk == 1 ? "✓" : " "}
              </div>
            </div>
            <div className="w-1/2 flex flex-row">
              <div className="w-1/4 border border-t-0 py-1 border-l-0 border-black">
                {reportmap.relationship_father_chk == 2 ? "✓" : " "}
              </div>
              <div className="w-1/4 border border-t-0 py-1 border-l-0 border-black">
                {reportmap.relationship_father_chk == 3 ? "✓" : " "}
              </div>
              <div className="w-1/4 border border-t-0 py-1 border-l-0 border-black">
                {reportmap.relationship_father_chk == 4 ? "✓" : " "}
              </div>
              <div className="w-1/4 border border-t-0 py-1 border-l-0 border-black">
                {reportmap.relationship_father_chk == 0 ? "✓" : " "}
              </div>
            </div>
          </div>
          <div className="flex flex-row px-10">
            <div className="w-1/2 flex flex-row">
              <div className="w-3/4 border border-t-0 py-1 border-black text-start flex items-start pl-5">
                มารดา
              </div>
              <div className="w-1/4 border border-t-0 py-1 border-l-0 border-black">
                {reportmap.relationship_mother_chk == 1 ? "✓" : " "}
              </div>
            </div>
            <div className="w-1/2 flex flex-row">
              <div className="w-1/4 border border-t-0 py-1 border-l-0 border-black">
                {reportmap.relationship_mother_chk == 2 ? "✓" : " "}
              </div>
              <div className="w-1/4 border border-t-0 py-1 border-l-0 border-black">
                {reportmap.relationship_mother_chk == 3 ? "✓" : " "}
              </div>
              <div className="w-1/4 border border-t-0 py-1 border-l-0 border-black">
                {reportmap.relationship_mother_chk == 4 ? "✓" : " "}
              </div>
              <div className="w-1/4 border border-t-0 py-1 border-l-0 border-black">
                {reportmap.relationship_mother_chk == 0 ? "✓" : " "}
              </div>
            </div>
          </div>
          <div className="flex flex-row px-10">
            <div className="w-1/2 flex flex-row">
              <div className="w-3/4 border border-t-0 py-1 border-black text-start flex items-start pl-5">
                พี่ชาย/น้องชาย
              </div>
              <div className="w-1/4 border border-t-0 py-1 border-l-0 border-black">
                {reportmap.relationship_brother_chk == 1 ? "✓" : " "}
              </div>
            </div>
            <div className="w-1/2 flex flex-row">
              <div className="w-1/4 border border-t-0 py-1 border-l-0 border-black">
                {reportmap.relationship_brother_chk == 2 ? "✓" : " "}
              </div>
              <div className="w-1/4 border border-t-0 py-1 border-l-0 border-black">
                {reportmap.relationship_brother_chk == 3 ? "✓" : " "}
              </div>
              <div className="w-1/4 border border-t-0 py-1 border-l-0 border-black">
                {reportmap.relationship_brother_chk == 4 ? "✓" : " "}
              </div>
              <div className="w-1/4 border border-t-0 py-1 border-l-0 border-black">
                {reportmap.relationship_brother_chk == 0 ? "✓" : " "}
              </div>
            </div>
          </div>
          <div className="flex flex-row px-10">
            <div className="w-1/2 flex flex-row">
              <div className="w-3/4 border border-t-0 py-1 border-black text-start flex items-start pl-5">
                พี่สาว/น้องสาว
              </div>
              <div className="w-1/4 border border-t-0 py-1 border-l-0 border-black">
                {reportmap.relationship_sister_chk == 1 ? "✓" : " "}
              </div>
            </div>
            <div className="w-1/2 flex flex-row">
              <div className="w-1/4 border border-t-0 py-1 border-l-0 border-black">
                {reportmap.relationship_sister_chk == 2 ? "✓" : " "}
              </div>
              <div className="w-1/4 border border-t-0 py-1 border-l-0 border-black">
                {reportmap.relationship_sister_chk == 3 ? "✓" : " "}
              </div>
              <div className="w-1/4 border border-t-0 py-1 border-l-0 border-black">
                {reportmap.relationship_sister_chk == 4 ? "✓" : " "}
              </div>
              <div className="w-1/4 border border-t-0 py-1 border-l-0 border-black">
                {reportmap.relationship_sister_chk == 0 ? "✓" : " "}
              </div>
            </div>
          </div>
          <div className="flex flex-row px-10">
            <div className="w-1/2 flex flex-row">
              <div className="w-3/4 border border-t-0 py-1 border-black text-start flex items-start pl-5">
                ปู่/ย่า/ตา/ยาย
              </div>
              <div className="w-1/4 border border-t-0 py-1 border-l-0 border-black">
                {reportmap.relationship_grand == 1 ? "✓" : " "}
              </div>
            </div>
            <div className="w-1/2 flex flex-row">
              <div className="w-1/4 border border-t-0 py-1 border-l-0 border-black">
                {reportmap.relationship_grand == 2 ? "✓" : " "}
              </div>
              <div className="w-1/4 border border-t-0 py-1 border-l-0 border-black">
                {reportmap.relationship_grand == 3 ? "✓" : " "}
              </div>
              <div className="w-1/4 border border-t-0 py-1 border-l-0 border-black">
                {reportmap.relationship_grand == 4 ? "✓" : " "}
              </div>
              <div className="w-1/4 border border-t-0 py-1 border-l-0 border-black">
                {reportmap.relationship_grand == 0 ? "✓" : " "}
              </div>
            </div>
          </div>
          <div className="flex flex-row px-10">
            <div className="w-1/2 flex flex-row">
              <div className="w-3/4 border border-t-0 py-1 border-black text-start flex items-start pl-5">
                ญาติ
              </div>
              <div className="w-1/4 border border-t-0 py-1 border-l-0 border-black">
                {reportmap.relationship_relative == 1 ? "✓" : " "}
              </div>
            </div>
            <div className="w-1/2 flex flex-row">
              <div className="w-1/4 border border-t-0 py-1 border-l-0 border-black">
                {reportmap.relationship_relative == 2 ? "✓" : " "}
              </div>
              <div className="w-1/4 border border-t-0 py-1 border-l-0 border-black">
                {reportmap.relationship_relative == 3 ? "✓" : " "}
              </div>
              <div className="w-1/4 border border-t-0 py-1 border-l-0 border-black">
                {reportmap.relationship_relative == 4 ? "✓" : " "}
              </div>
              <div className="w-1/4 border border-t-0 py-1 border-l-0 border-black">
                {reportmap.relationship_relative == 0 ? "✓" : " "}
              </div>
            </div>
          </div>
          <div className="flex flex-row px-10 pb-3">
            <div className="w-1/2 flex flex-row">
              <div className="w-3/4 border border-t-0 py-1 border-black text-start flex items-end pl-5">
                อื่นๆ
                <label
                  className=" border-dashed border-b border-black w-48"
                  type="text"
                >
                  {reportmap.relationship_other_name || ""}
                </label>
              </div>
              <div className="w-1/4 border border-t-0 py-1 border-l-0 border-black">
                {reportmap.relationship_other == 1 ? "✓" : " "}
              </div>
            </div>
            <div className="w-1/2 flex flex-row">
              <div className="w-1/4 border border-t-0 py-1 border-l-0 border-black">
                {reportmap.relationship_other == 2 ? "✓" : " "}
              </div>
              <div className="w-1/4 border border-t-0 py-1 border-l-0 border-black">
                {reportmap.relationship_other == 3 ? "✓" : " "}
              </div>
              <div className="w-1/4 border border-t-0 py-1 border-l-0 border-black">
                {reportmap.relationship_other == 4 ? "✓" : " "}
              </div>
              <div className="w-1/4 border border-t-0 py-1 border-l-0 border-black">
                {reportmap.relationship_other == 0 ? "✓" : " "}
              </div>
            </div>
          </div>
          <div className="flex mt-1 flex-row text-start items-end">
            <div className=" pl-3">
              2.4 กรณีที่ผู้ปกครองไม่อยู่บ้าน ฝากเด็กนักเรียนอยู่บ้านกับใคร
              (ตอบเพียง 1 ข้อ ){" "}
            </div>
          </div>
          <div className="flex mt-1 flex-row items-end">
            <div className="pl-20"></div>
            <input
              className="mb-1"
              checked={
                reportmap.parents_leave_child_with_someone == "1" ? true : false
              }
              type="checkbox"
            />
            <div className="px-5">ญาติ</div>
            <input
              className="mb-1"
              checked={
                reportmap.parents_leave_child_with_someone == "2" ? true : false
              }
              type="checkbox"
            />
            <div className="px-5">เพื่อนบ้าน</div>
            <input
              className="mb-1"
              checked={
                reportmap.parents_leave_child_with_someone == "3" ? true : false
              }
              type="checkbox"
            />
            <div className="px-5">นักเรียนอยู่บ้านด้วยตนเอง</div>
            <input
              className="mb-1"
              checked={
                reportmap.parents_leave_child_with_someone == "4" ? true : false
              }
              type="checkbox"
            />
            <div className="pl-5">อื่น ๆ ระบุ</div>
            <label
              className=" border-dashed border-b border-black w-48"
              type="text"
            >
              {reportmap.parents_leave_child_with_someone_other || ""}
            </label>
          </div>
          <div className="flex mt-1 flex-row text-start items-end">
            <div className=" pl-3">2.5 รายได้รวมของครัวเรือน</div>
            <label
              className=" border-dashed border-b border-black w-60"
              type="text"
            >
              {reportmap.household_income || ""}
            </label>
            <div className=" pl-3">บาท</div>
          </div>
          <div className="flex mt-1 flex-row text-start items-end">
            <div className=" pl-3">2.6 นักเรียนได้รับค่าใช้จ่ายจาก</div>
            <label
              className=" border-dashed border-b border-black w-48"
              type="text"
            >
              {reportmap.receive_expenses_from || ""}
            </label>
            <div className=" pl-3">นักเรียนได้เงินมาโรงเรียนวันละ</div>
            <label
              className=" border-dashed border-b border-black w-48"
              type="text"
            >
              {reportmap.money_to_school || ""}
            </label>
            <div className=" pl-3">บาท</div>
          </div>
          <div className="flex mt-1 flex-row text-start items-end">
            <div className=" pl-8">นักเรียนทำงานหารายได้พิเศษ อาชีพ</div>
            <label
              className=" border-dashed border-b border-black w-36"
              type="text"
            >
              {reportmap.work_to_earn || ""}
            </label>
            <div className=" pl-2">รายได้วันละ</div>
            <label
              className="ml-2 border-dashed border-b border-black w-72"
              type="text"
            >
              {reportmap.work_to_earn_inc_perday || ""}
            </label>
            <div className=" pl-3">บาท</div>
          </div>
          <div className="flex mt-1 flex-row text-start items-end">
            <div className=" pl-2">
              2.7 สิ่งที่ผู้ปกครองต้องการให้โรงเรียนช่วยเหลือนักเรียน
            </div>
          </div>
          <div className="flex mt-1 flex-row items-end">
            <div className="pl-20"></div>
            <input
              className="mb-1"
              checked={reportmap.want_schools_help.study == "1" ? true : false}
              type="checkbox"
            />
            <div className="px-5">ด้านการเรียน</div>
            <input
              className="mb-1"
              checked={
                reportmap.want_schools_help.behavior == "1" ? true : false
              }
              type="checkbox"
            />
            <div className="px-5">ด้านพฤติกรรม</div>
            <input
              className="mb-1"
              checked={reportmap.want_schools_help.eco == "1" ? true : false}
              type="checkbox"
            />
            <div className="px-5">ด้านเศรษฐกิจ (เช่น ขอรับทุน)</div>
            <input
              className="mb-1"
              checked={reportmap.want_schools_help.other == "1" ? true : false}
              type="checkbox"
            />
            <div className="pl-5">อื่น ๆ ระบุ</div>
            <label
              className=" border-dashed border-b border-black w-28"
              type="text"
            >
              {reportmap.want_schools_help_other || ""}
            </label>
          </div>
          <div className="flex mt-1 flex-row text-start items-end">
            <div className=" pl-2">
              2.8
              ความช่วยเหลือที่ครอบครัวเคยได้รับจากหน่วยงานหรือต้องการได้รับการช่วยเหลือ
            </div>
          </div>
          <div className="flex mt-1 flex-row items-end ">
            <div className="pl-20"></div>
            <input
              className="mb-1"
              checked={reportmap.agency_help.elderly == "1" ? true : false}
              type="checkbox"
            />
            <div className="px-5">เบี้ยผู้สูงอายุ</div>
            <input
              className="mb-1"
              checked={reportmap.agency_help.disability == "1" ? true : false}
              type="checkbox"
            />
            <div className="px-5">เบี้ยพิการ</div>
            <input
              className="mb-1"
              checked={reportmap.agency_help.other == "1" ? true : false}
              type="checkbox"
            />
            <div className="pl-5">อื่น ๆ ระบุ</div>
            <label
              className=" border-dashed border-b border-black w-80"
              type="text"
            >
              {reportmap.agency_help_other || ""}
            </label>
          </div>
          <div className="flex mt-1 flex-row text-start items-end">
            <div className=" pl-2">
              2.9 ความห่วงใยของผู้ปกครองที่มีต่อนักเรียน
            </div>
          </div>
          <div className="flex mt-1 flex-row text-start items-end">
            <label
              className=" border-dashed border-b border-black w-full pt-6 ml-10 text-left"
              type="text"
            >
              {reportmap.Parents_concern || ""}
            </label>
          </div>
          {/* <div className="flex mt-1 flex-row text-start items-end">
                        <label className=" border-dashed border-b border-black w-full pt-6 ml-10 text-left" type="text">{reportmap.Parents_concern || ""}</label>
                    </div>
                    <div className="flex mt-1 flex-row text-start items-end">
                        <label className=" border-dashed border-b border-black w-full pt-6 ml-10 text-left" type="text">{reportmap.Parents_concern || ""}</label>
                    </div> */}
        </div>
      </div>
      <div className="flex flex-col items-center text-center section mt-1">
        <div className="flex flex-row w-full px-12">
          <div className="w-1/3 border-b border-black"></div>
          <div className="w-1/3 flex flex-col border-b border-black">
            <div>
              <Image
                width={40}
                height={50}
                src="/img/logosorportor.png"
                alt="profile"
                className="mx-auto"
              />
            </div>
            <label className="mt-2 font-bold">บันทึกการเยี่ยมบ้าน</label>
          </div>
          <div className="w-1/3 border-b border-black flex flex-col justify-end items-end text-end">
            <div className="">
              <label className="mt-2 font-bold border border-black p-1">
                กนช.5
              </label>
            </div>
            <label className="mt-2 m-1">หน้า2/4</label>
          </div>
        </div>
        <div className=" flex flex-col mb-10 w-full">
          <div className="flex mt-1 flex-row text-start items-end">
            <div className="">
              3. สถานะของครัวเรือน กรอกเฉพาะบุคคลที่อาศัยในบ้านปัจจุบัน
              (ตอบได้มากกว่า 1 ข้อ)
            </div>
          </div>
          <div className="flex flex-row w-full">
            <div className="w-1/4">
              <div className=" pl-3 pr-4">
                3.1 ครัวเรือนมีภาระพึ่งพิง ดังนี้
              </div>
            </div>
            <div className="w-1/4 ">
              <div className="flex flex-col text-start justify-center items-start">
                <div className="flex flex-row">
                  <input
                    className="mt-1 mr-2"
                    checked={
                      reportmap.dependency.handicapped == "1" ? true : false
                    }
                    type="checkbox"
                  />
                  <div className="">มีคนพิการ</div>
                </div>
                <div className="flex flex-row">
                  <input
                    className="mt-1 mr-2"
                    checked={reportmap.dependency.elderly == "1" ? true : false}
                    type="checkbox"
                  />
                  <div className="">มีผู้สูงอายุเกิน 60 ปี </div>
                </div>
              </div>
            </div>
            <div className="w-2/4">
              <div className="flex flex-col text-start justify-center items-start">
                <div className="flex flex-row">
                  <input
                    className="mt-1 mr-2"
                    checked={
                      reportmap.dependency.singlefm == "1" ? true : false
                    }
                    type="checkbox"
                  />
                  <div className="">เป็นพ่อ/แม่เลี้ยงเดี่ยว</div>
                </div>
                <div className="flex flex-row">
                  <input
                    className="mt-1 mr-2"
                    checked={
                      reportmap.dependency.unemployed == "1" ? true : false
                    }
                    type="checkbox"
                  />
                  <div className="">
                    มีคนอายุ 15–65 ปีว่างงาน (ที่ไม่ใช่นักเรียน/นักศึกษา)
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-row w-full ">
            <div className="w-1/4 items-start flex">
              <div className=" pl-3 pr-4">3.2 ประเภทที่อยู่อาศัย ดังนี้</div>
            </div>
            <div className="w-1/4 ">
              <div className="flex flex-col text-start justify-center items-start">
                <div className="flex flex-row">
                  <input
                    className="mt-1 mr-2"
                    checked={reportmap.housing_type.house == "1" ? true : false}
                    type="checkbox"
                  />
                  <div className="">บ้านของตนเอง</div>
                </div>
              </div>
            </div>
            <div className="w-1/4">
              <div className="flex flex-col text-start justify-center items-start">
                <div className="flex flex-row">
                  <input
                    className="mt-1 mr-2"
                    checked={
                      reportmap.housing_type.rental_house == "1" ? true : false
                    }
                    type="checkbox"
                  />
                  <div className="">บ้านเช่า</div>
                </div>
              </div>
            </div>
            <div className="w-1/4">
              <div className="flex flex-col text-start justify-center items-start">
                <div className="flex flex-row">
                  <input
                    className="mt-1 mr-2"
                    checked={
                      reportmap.housing_type.with_others == "1" ? true : false
                    }
                    type="checkbox"
                  />
                  <div className="">อาศัยอยู่กับผู้อื่น</div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-row w-full ">
            <div className="w-1/4 items-start flex">
              <div className=" pl-3 pr-4">3.3 สภาพที่อยู่อาศัย ดังนี้</div>
            </div>
            <div className="w-3/4 ">
              <div className="flex flex-col text-start justify-center items-start">
                <div className="flex flex-row">
                  <input
                    className="mt-1 mr-2"
                    checked={
                      reportmap.housing_envir.dilapidated_house == "1"
                        ? true
                        : false
                    }
                    type="checkbox"
                  />
                  <div className="">
                    สภาพบ้านชำรุดทรุดโทรม หรือ บ้านทำจากวัสดุพื้นบ้าน เช่น
                    ไม้ไผ่ ใบจากหรือวัสดุเหลือใช้
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-row w-full ">
            <div className="w-1/4 items-start flex"></div>
            <div className="w-3/4 items-start flex">
              <div className="flex flex-row text-start justify-center items-start">
                <div className="flex flex-row">
                  <input
                    className="mt-1 mr-2"
                    checked={
                      reportmap.housing_envir.no_toilets == "1" ? true : false
                    }
                    type="checkbox"
                  />
                  <div className="mr-2">
                    ไม่มีห้องส้วมในที่อยู่อาศัยและบริเวณ
                  </div>
                </div>
                <div className="flex flex-row">
                  <input
                    className="mt-1 mr-2"
                    checked={
                      reportmap.housing_envir.other == "1" ? true : false
                    }
                    type="checkbox"
                  />
                  <div className="">อื่นๆ</div>
                  <label
                    className="border-dashed border-b border-black w-44"
                    type="text"
                  >
                    {reportmap.housing_envir_other || ""}
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="flex mt-1 flex-row text-start items-end">
            <div className=" pl-3">
              3.4 ยานพาหนะของครอบครัว (ตอบได้มำกกว่ำ 1 ข้อ)
            </div>
          </div>
          <div className="flex flex-row w-full ">
            <div className="w-1/6 items-start flex"></div>
            <div className="w-3/6 items-start flex flex-col">
              <div className=" pl-3 pr-4">-รถมอเตอร์ไซค์</div>
              <div className=" pl-3 pr-4">-รถยนต์ส่วนบุคคล</div>
              <div className=" pl-3 pr-4">-รถบรรทุกเล็ก/รถตู้</div>
              <div className=" pl-3 pr-4">
                -รถไถ/เกี่ยวข้าว/รถอีแต๋น/รถอื่นๆ ประเภทเดียวกัน
              </div>
            </div>
            <div className="w-1/4 ">
              <div className="flex flex-col text-start justify-center items-start">
                <div className="flex flex-row">
                  <input
                    className="mt-1 mr-2"
                    checked={reportmap.fm_vehicle.moto == "1" ? true : false}
                    type="checkbox"
                  />
                  <div className="">มี</div>
                </div>
                <div className="flex flex-row">
                  <input
                    className="mt-1 mr-2"
                    checked={reportmap.fm_vehicle.car == "1" ? true : false}
                    type="checkbox"
                  />
                  <div className="">มี</div>
                </div>
                <div className="flex flex-row">
                  <input
                    className="mt-1 mr-2"
                    checked={reportmap.fm_vehicle.truck == "1" ? true : false}
                    type="checkbox"
                  />
                  <div className="">มี</div>
                </div>
                <div className="flex flex-row">
                  <input
                    className="mt-1 mr-2"
                    checked={
                      reportmap.fm_vehicle.othertruck == "1" ? true : false
                    }
                    type="checkbox"
                  />
                  <div className="">มี</div>
                </div>
              </div>
            </div>
            <div className="w-1/4 ">
              <div className="flex flex-col text-start justify-center items-start">
                <div className="flex flex-row">
                  <input
                    className="mt-1 mr-2"
                    checked={reportmap.fm_vehicle.moto == "2" ? true : false}
                    type="checkbox"
                  />
                  <div className="">ไม่มี</div>
                </div>
                <div className="flex flex-row">
                  <input
                    className="mt-1 mr-2"
                    checked={reportmap.fm_vehicle.car == "2" ? true : false}
                    type="checkbox"
                  />
                  <div className="">ไม่มี</div>
                </div>
                <div className="flex flex-row">
                  <input
                    className="mt-1 mr-2"
                    checked={reportmap.fm_vehicle.truck == "2" ? true : false}
                    type="checkbox"
                  />
                  <div className="">ไม่มี</div>
                </div>
                <div className="flex flex-row">
                  <input
                    className="mt-1 mr-2"
                    checked={
                      reportmap.fm_vehicle.othertruck == "2" ? true : false
                    }
                    type="checkbox"
                  />
                  <div className="">ไม่มี</div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-row w-full ">
            <div className="w-4/6 items-start flex flex-col">
              <div className=" pl-3 pr-4">
                3.5เป็นเกษตรกร มีที่ดินทำกิน (รวมเช่า){" "}
              </div>
            </div>
            <div className="w-1/4 ">
              <div className="flex flex-col text-start justify-center items-start">
                <div className="flex flex-row">
                  <input
                    className="mt-1 mr-2"
                    checked={reportmap.farm_land == "1" ? true : false}
                    type="checkbox"
                  />
                  <div className="">ไม่เกิน 1 ไร่</div>
                </div>
              </div>
            </div>
            <div className="w-1/4 ">
              <div className="flex flex-col text-start justify-center items-start">
                <div className="flex flex-row">
                  <input
                    className="mt-1 mr-2"
                    checked={reportmap.farm_land == "2" ? true : false}
                    type="checkbox"
                  />
                  <div className="">ไม่มีที่ดินเป็นของตนเอง</div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-row w-full ">
            <div className="w-4/6 items-start flex flex-col">
              <div className=" pl-3 pr-4"> </div>
            </div>
            <div className="w-2/4 ">
              <div className="flex flex-col text-start justify-center items-start">
                <div className="flex flex-row">
                  <input
                    className="mt-1 mr-2"
                    checked={reportmap.farm_land == "3" ? true : false}
                    type="checkbox"
                  />
                  <div className="">เป็นเจ้าของ จำนวน</div>
                  <label
                    className="border-dashed border-b border-black w-14"
                    type="text"
                  >
                    {reportmap.farm_land == "3"
                      ? reportmap.farm_land_number || ""
                      : ""}
                  </label>
                  ไร่
                </div>
                <div className="flex flex-row">
                  <input
                    className="mt-1 mr-2"
                    checked={reportmap.farm_land == "4" ? true : false}
                    type="checkbox"
                  />
                  <div className="">เช่าจำนวน</div>
                  <label
                    className="border-dashed border-b border-black w-14"
                    type="text"
                  >
                    {reportmap.farm_land == "4"
                      ? reportmap.farm_land_number || ""
                      : ""}
                  </label>
                  ไร่
                </div>
              </div>
            </div>
          </div>
          <div className="flex mt-1 flex-row text-start items-end">
            <div className="">
              4. พฤติกรรมและความเสี่ยง (ตอบได้มากกว่า 1 ข้อ)
            </div>
          </div>
          <div className="flex mt-1 flex-row text-start items-end">
            <div className=" pl-2">4.1 สุขภาพ</div>
          </div>
          <div className="flex flex-row w-full px-12 ">
            <div className="w-2/6 items-start flex flex-col">
              <div className="flex flex-col text-start justify-center items-start">
                <div className="flex flex-row">
                  <input
                    className="mt-1 mr-2"
                    checked={reportmap.health.unhealthy == "1" ? true : false}
                    type="checkbox"
                  />
                  <div className="">ร่างกายไม่แข็งแรง</div>
                </div>
                <div className="flex flex-row">
                  <input
                    className="mt-1 mr-2"
                    checked={
                      reportmap.health.severe_chronic == "1" ? true : false
                    }
                    type="checkbox"
                  />
                  <div className="">ป่วยเป็นโรคร้ายแรง/เรื้อรัง</div>
                </div>
              </div>
            </div>
            <div className="w-2/6 items-start flex flex-col">
              <div className="flex flex-col text-start justify-center items-start">
                <div className="flex flex-row">
                  <input
                    className="mt-1 mr-2"
                    checked={
                      reportmap.health.congenital_disease == "1" ? true : false
                    }
                    type="checkbox"
                  />
                  <div className="">มีโรคประจำตัวหรือเจ็บป่วยบ่อย</div>
                </div>
                <div className="flex flex-row">
                  <input
                    className="mt-1 mr-2"
                    checked={
                      reportmap.health.low_physical_fitness == "1"
                        ? true
                        : false
                    }
                    type="checkbox"
                  />
                  <div className="">สมรรถภาพทางร่างกายต่ำ </div>
                </div>
              </div>
            </div>
            <div className="w-2/6 items-start flex flex-col">
              <div className="flex flex-col text-start justify-center items-start">
                <div className="flex flex-row">
                  <input
                    className="mt-1 mr-2"
                    checked={
                      reportmap.health.malnutrition == "1" ? true : false
                    }
                    type="checkbox"
                  />
                  <div className="">มีภาวะทุพโภชนาการ</div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex mt-1 flex-row text-start items-end">
            <div className=" pl-2">
              4.2 สวัสดิการหรือความปลอดภัย (ตอบได้มากกว่า 1 ข้อ)
            </div>
          </div>
          <div className="flex flex-row w-full px-10 ">
            <div className="w-6/12 items-start flex flex-col">
              <div className="flex flex-col text-start justify-center items-start">
                <div className="flex flex-row">
                  <input
                    className="mt-1 mr-2"
                    checked={
                      reportmap.welfare_safety.separated == "1" ? true : false
                    }
                    type="checkbox"
                  />
                  <div className="">พ่อแม่แยกทางกัน หรือ แต่งงานใหม่</div>
                </div>
                <div className="flex flex-row">
                  <input
                    className="mt-1 mr-2"
                    checked={
                      reportmap.welfare_safety.suffering_serious == "1"
                        ? true
                        : false
                    }
                    type="checkbox"
                  />
                  <div className="">
                    มีบุคคลในครอบครัวเจ็บป่วยด้วยโรคร้ายแรง/เรื้อรัง/ติดต่อ
                  </div>
                </div>
                <div className="flex flex-row">
                  <input
                    className="mt-1 mr-2"
                    checked={
                      reportmap.welfare_safety.members_gamble == "1"
                        ? true
                        : false
                    }
                    type="checkbox"
                  />
                  <div className="">บุคคลในครอบครัวเล่นการพนัน</div>
                </div>
                <div className="flex flex-row">
                  <input
                    className="mt-1 mr-2"
                    checked={
                      reportmap.welfare_safety.unsupervised == "1"
                        ? true
                        : false
                    }
                    type="checkbox"
                  />
                  <div className="">ไม่มีผู้ดูแล</div>
                </div>
                <div className="flex flex-row">
                  <input
                    className="mt-1 mr-2"
                    checked={
                      reportmap.welfare_safety.harmed_by_family == "1"
                        ? true
                        : false
                    }
                    type="checkbox"
                  />
                  <div className="">
                    ถูกทารุณ/ทำร้ายจากบุคคลในครอบครัว/เพื่อนบ้าน{" "}
                  </div>
                </div>
                <div className="flex flex-row">
                  <input
                    className="mt-1 mr-2"
                    checked={
                      reportmap.welfare_safety.residing_in_a_slum == "1"
                        ? true
                        : false
                    }
                    type="checkbox"
                  />
                  <div className="">
                    พักอาศัยอยู่ในชุมชนแออัดหรือใกล้แหล่งมั่วสุม/สถานเริงรมย์
                  </div>
                </div>
              </div>
            </div>
            <div className="w-6/12 items-start flex flex-col">
              <div className="flex flex-col text-start justify-center items-start">
                <div className="flex flex-row">
                  <input
                    className="mt-1 mr-2"
                    checked={
                      reportmap.welfare_safety.gamble == "1" ? true : false
                    }
                    type="checkbox"
                  />
                  <div className="">เล่นการพนัน</div>
                </div>
                <div className="flex flex-row">
                  <input
                    className="mt-1 mr-2"
                    checked={
                      reportmap.welfare_safety.addicted_to_drugs == "1"
                        ? true
                        : false
                    }
                    type="checkbox"
                  />
                  <div className="">บุคคลในครอบครัวติดสารเสพติด</div>
                </div>
                <div className="flex flex-row">
                  <input
                    className="mt-1 mr-2"
                    checked={
                      reportmap.welfare_safety.conflicts_in_family == "1"
                        ? true
                        : false
                    }
                    type="checkbox"
                  />
                  <div className="">มีความขัดแย้ง/ทะเลาะกันในครอบครัว</div>
                </div>
                <div className="flex flex-row">
                  <input
                    className="mt-1 mr-2"
                    checked={
                      reportmap.welfare_safety.domestic_violence == "1"
                        ? true
                        : false
                    }
                    type="checkbox"
                  />
                  <div className="">
                    ความขัดแย้งและมีการใช้ความรุนแรงในครอบครัว{" "}
                  </div>
                </div>
                <div className="flex flex-row">
                  <input
                    className="mt-1 mr-2"
                    checked={
                      reportmap.welfare_safety.sexually_harassed == "1"
                        ? true
                        : false
                    }
                    type="checkbox"
                  />
                  <div className="">ถูกล่วงละเมิดทางเพศ</div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex mt-1 flex-row text-start items-end">
            <div className="pl-2">4.3 ระยะทางระหว่างบ้านไปโรงเรียน</div>
            <label
              className=" border-dashed border-b border-black w-48"
              type="text"
            >
              {reportmap.distance_school_km || ""}
            </label>
            <div className="">กิโลเมตร ใช้เวลาเดินทาง</div>
            <label
              className=" border-dashed border-b border-black w-12"
              type="text"
            >
              {reportmap.distance_school_hr || ""}
            </label>
            <div className="">ชม.</div>
            <label
              className=" border-dashed border-b border-black w-12"
              type="text"
            >
              {reportmap.distance_school_min || ""}
            </label>
            <div className="">นาที</div>
          </div>
          <div className="flex mt-1 flex-row text-start items-end">
            <div className=" pl-2">
              4.4 การเดินทางของนักเรียนไปโรงเรียน ( ตอบเพียง 1 ข้อ )
            </div>
          </div>
          <div className="flex flex-row w-full px-12 ">
            <div className=" w-3/12 items-start flex flex-col">
              <div className="flex flex-col text-start justify-center items-start">
                <div className="flex flex-row">
                  <input
                    className="mt-1 mr-2"
                    checked={reportmap.journey == "1" ? true : false}
                    type="checkbox"
                  />
                  <div className="">ผู้ปกครองมาส่ง</div>
                </div>
                <div className="flex flex-row">
                  <input
                    className="mt-1 mr-2"
                    checked={reportmap.journey == "2" ? true : false}
                    type="checkbox"
                  />
                  <div className="">รถยนต์</div>
                </div>
              </div>
            </div>
            <div className=" w-3/12 items-start flex flex-col">
              <div className="flex flex-col text-start justify-center items-start">
                <div className="flex flex-row">
                  <input
                    className="mt-1 mr-2"
                    checked={reportmap.journey == "3" ? true : false}
                    type="checkbox"
                  />
                  <div className="">รถโดยสารประจำทาง</div>
                </div>
                <div className="flex flex-row">
                  <input
                    className="mt-1 mr-2"
                    checked={reportmap.journey == "4" ? true : false}
                    type="checkbox"
                  />
                  <div className="">รถจักรยาน</div>
                </div>
              </div>
            </div>
            <div className=" w-3/12 items-start flex flex-col">
              <div className="flex flex-col text-start justify-center items-start">
                <div className="flex flex-row">
                  <input
                    className="mt-1 mr-2"
                    checked={reportmap.journey == "5" ? true : false}
                    type="checkbox"
                  />
                  <div className="">รถจักรยานยนต์</div>
                </div>
                <div className="flex flex-row">
                  <input
                    className="mt-1 mr-2"
                    checked={reportmap.journey == "6" ? true : false}
                    type="checkbox"
                  />
                  <div className="">เดิน</div>
                </div>
              </div>
            </div>
            <div className=" w-3/12 items-start flex flex-col">
              <div className="flex flex-col text-start justify-center items-start">
                <div className="flex flex-row">
                  <input
                    className="mt-1 mr-2"
                    checked={reportmap.journey == "7" ? true : false}
                    type="checkbox"
                  />
                  <div className="">รถโรงเรียน</div>
                </div>
                <div className="flex flex-row">
                  <input
                    className="mt-1 mr-2"
                    checked={reportmap.journey == "8" ? true : false}
                    type="checkbox"
                  />
                  <div className="">อื่นๆ</div>
                  <label
                    className="border-dashed border-b border-black w-24"
                    type="text"
                  >
                    {reportmap.journey_other || ""}
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="flex mt-1 flex-row text-start items-end">
            <div className=" pl-2">
              4.5 ภาระงานความรับผิดชอบของนักเรียนที่มีต่อครอบครัว (ตอบได้มำกกว่า
              1 ข้อ)
            </div>
          </div>
          <div className="flex flex-row w-full px-12 ">
            <div className=" w-1/2 items-start flex flex-col">
              <div className="flex flex-col text-start justify-center items-start">
                <div className="flex flex-row">
                  <input
                    className="mt-1 mr-2"
                    checked={
                      reportmap.work_responsibility.housework == "1"
                        ? true
                        : false
                    }
                    type="checkbox"
                  />
                  <div className="">ช่วยงานบ้าน</div>
                </div>
                <div className="flex flex-row">
                  <input
                    className="mt-1 mr-2"
                    checked={
                      reportmap.work_responsibility.trade == "1" ? true : false
                    }
                    type="checkbox"
                  />
                  <div className="">ช่วยค้าขายเล็กๆน้อยๆ</div>
                </div>
                <div className="flex flex-row">
                  <input
                    className="mt-1 mr-2"
                    checked={
                      reportmap.work_responsibility.farm == "1" ? true : false
                    }
                    type="checkbox"
                  />
                  <div className="">ช่วยงานในนาไร่</div>
                </div>
              </div>
            </div>
            <div className=" w-1/2 items-start flex flex-col">
              <div className="flex flex-col text-start justify-center items-start">
                <div className="flex flex-row">
                  <input
                    className="mt-1 mr-2"
                    checked={
                      reportmap.work_responsibility.care_disabled == "1"
                        ? true
                        : false
                    }
                    type="checkbox"
                  />
                  <div className="">ช่วยคนดูแลคนเจ็บป่วย/พิการ</div>
                </div>
                <div className="flex flex-row">
                  <input
                    className="mt-1 mr-2"
                    checked={
                      reportmap.work_responsibility.extra_work == "1"
                        ? true
                        : false
                    }
                    type="checkbox"
                  />
                  <div className="">ทำงานพิเศษแถวบ้าน</div>
                </div>
                <div className="flex flex-row">
                  <input
                    className="mt-1 mr-2"
                    checked={
                      reportmap.work_responsibility.other == "1" ? true : false
                    }
                    type="checkbox"
                  />
                  <div className="">อื่นๆ</div>
                  <label
                    className="border-dashed border-b border-black w-24"
                    type="text"
                  >
                    {reportmap.work_responsibility_other || ""}
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="flex mt-1 flex-row text-start items-end">
            <div className=" pl-2">
              4.6 กิจกรรมยามว่างหรืองานอดิเรก (ตอบได้มากกว่า 1 ข้อ)
            </div>
          </div>
          <div className="flex flex-row w-full px-12 ">
            <div className=" w-1/2 items-start flex flex-col">
              <div className="flex flex-col text-start justify-center items-start">
                <div className="flex flex-row">
                  <input
                    className="mt-1 mr-2"
                    checked={reportmap.hobbies.TV == "1" ? true : false}
                    type="checkbox"
                  />
                  <div className="">ดูทีวี / ฟังเพลง</div>
                </div>
                <div className="flex flex-row">
                  <input
                    className="mt-1 mr-2"
                    checked={reportmap.hobbies.reading == "1" ? true : false}
                    type="checkbox"
                  />
                  <div className="">อ่านหนังสือ</div>
                </div>
                <div className="flex flex-row">
                  <input
                    className="mt-1 mr-2"
                    checked={reportmap.hobbies.vsco == "1" ? true : false}
                    type="checkbox"
                  />
                  <div className="">แว้น / สก๊อย</div>
                </div>
                <div className="flex flex-row">
                  <input
                    className="mt-1 mr-2"
                    checked={reportmap.hobbies.park == "1" ? true : false}
                    type="checkbox"
                  />
                  <div className="">ไปสวนสาธารณะ</div>
                </div>
                <div className="flex flex-row">
                  <input
                    className="mt-1 mr-2"
                    checked={reportmap.hobbies.other == "1" ? true : false}
                    type="checkbox"
                  />
                  <div className="">อื่นๆ</div>
                  <label
                    className="border-dashed border-b border-black w-24"
                    type="text"
                  >
                    {reportmap.hobbies_other || ""}
                  </label>
                </div>
              </div>
            </div>
            <div className=" w-1/2 items-start flex flex-col">
              <div className="flex flex-col text-start justify-center items-start">
                <div className="flex flex-row">
                  <input
                    className="mt-1 mr-2"
                    checked={reportmap.hobbies.go_to_mall == "1" ? true : false}
                    type="checkbox"
                  />
                  <div className="">ไปเที่ยวห้าง / ดูหนัง</div>
                </div>
                <div className="flex flex-row">
                  <input
                    className="mt-1 mr-2"
                    checked={reportmap.hobbies.friend == "1" ? true : false}
                    type="checkbox"
                  />
                  <div className="">ไปหาเพื่อน / เพื่อน</div>
                </div>
                <div className="flex flex-row">
                  <input
                    className="mt-1 mr-2"
                    checked={reportmap.hobbies.game == "1" ? true : false}
                    type="checkbox"
                  />
                  <div className="">เล่นเกม คอม / มือถือ</div>
                </div>
                <div className="flex flex-row">
                  <input
                    className="mt-1 mr-2"
                    checked={reportmap.hobbies.play_music == "1" ? true : false}
                    type="checkbox"
                  />
                  <div className="">เล่นดนตรี</div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex mt-1 flex-row text-start items-end">
            <div className=" pl-2">
              4.7 พฤติกรรมการใช้สารเสพติด (ตอบได้มากกว่า 1 ข้อ)
            </div>
          </div>
          <div className="flex flex-row w-full px-12 ">
            <div className=" w-2/6 items-start flex flex-col">
              <div className="flex flex-col text-start justify-center items-start">
                <div className="flex flex-row">
                  <input
                    className="mt-1 mr-2"
                    checked={
                      reportmap.substance_abuse.friends_uses_drugs == "1"
                        ? true
                        : false
                    }
                    type="checkbox"
                  />
                  <div className="">คบเพื่อนในกลุ่มที่ใช้สารเสพติด </div>
                </div>
              </div>
            </div>
            <div className=" w-4/6 items-start flex flex-col">
              <div className="flex flex-col text-start justify-center items-start">
                <div className="flex flex-row">
                  <input
                    className="mt-1 mr-2"
                    checked={
                      reportmap.substance_abuse.family_uses_drugs == "1"
                        ? true
                        : false
                    }
                    type="checkbox"
                  />
                  <div className="">สมาชิกในครอบครัวข้องเกี่ยวกับยาเสพติด</div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-row w-full px-12 ">
            <div className=" w-2/6 items-start flex flex-col">
              <div className="flex flex-col text-start justify-center items-start">
                <div className="flex flex-row">
                  <input
                    className="mt-1 mr-2"
                    checked={
                      reportmap.substance_abuse.drug_use_environment == "1"
                        ? true
                        : false
                    }
                    type="checkbox"
                  />
                  <div className="">อยู่ในสภาพแวดล้อมที่ใช้สารเสพติด</div>
                </div>
              </div>
            </div>
            <div className=" w-4/6 items-start flex flex-col">
              <div className="flex flex-col text-start justify-center items-start">
                <div className="flex flex-row">
                  <input
                    className="mt-1 mr-1"
                    checked={
                      reportmap.substance_abuse.dealing_with_drugs == "1"
                        ? true
                        : false
                    }
                    type="checkbox"
                  />
                  <div className="mr-1">ปัจจุบันเกี่ยวข้องกับสารเสพติด</div>
                  <input
                    className="mt-1 mr-1"
                    checked={
                      reportmap.substance_abuse.smoking == "1" ? true : false
                    }
                    type="checkbox"
                  />
                  <div className="">
                    เป็นผู้ติดบุหรี่ สุรา หรือการใช้สารเสพติดอื่นๆ
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center text-center section mt-1">
        <div className="flex flex-row w-full px-12">
          <div className="w-1/3 border-b border-black"></div>
          <div className="w-1/3 flex flex-col border-b border-black">
            <div>
              <Image
                width={40}
                height={50}
                src="/img/logosorportor.png"
                alt="profile"
                className="mx-auto"
              />
            </div>
            <label className="mt-2 font-bold">บันทึกการเยี่ยมบ้าน</label>
          </div>
          <div className="w-1/3 border-b border-black flex flex-col justify-end items-end text-end">
            <div className="">
              <label className="mt-2 font-bold border border-black p-1">
                กนช.5
              </label>
            </div>
            <label className="mt-2 m-1">หน้า3/4</label>
          </div>
        </div>
        <div className=" flex flex-col mb-10 w-full">
          <div className="flex mt-1 flex-row text-start items-end">
            <div className=" pl-2">
              4.8 พฤติกรรมการใช้ความรุนแรง (ตอบได้มากกว่า 1 ข้อ)
            </div>
          </div>
          <div className="flex flex-row w-full px-12 ">
            <div className="w-2/6 items-start flex flex-col">
              <div className="flex flex-col text-start justify-center items-start">
                <div className="flex flex-row">
                  <input
                    className="mt-1 mr-2"
                    checked={reportmap.violent.quarrel == "1" ? true : false}
                    type="checkbox"
                  />
                  <div className="">มีการทะเลาะวิวาท</div>
                </div>
                <div className="flex flex-row">
                  <input
                    className="mt-1 mr-2"
                    checked={
                      reportmap.violent.injure_another == "1" ? true : false
                    }
                    type="checkbox"
                  />
                  <div className="">ทำร้ายร่างกายผู้อื่น </div>
                </div>
              </div>
            </div>
            <div className="w-2/6 items-start flex flex-col">
              <div className="flex flex-col text-start justify-center items-start">
                <div className="flex flex-row">
                  <input
                    className="mt-1 mr-2"
                    checked={reportmap.violent.Aggressive == "1" ? true : false}
                    type="checkbox"
                  />
                  <div className="">ก้าวร้าว เกเร</div>
                </div>
                <div className="flex flex-row">
                  <input
                    className="mt-1 mr-2"
                    checked={
                      reportmap.violent.injure_yourself == "1" ? true : false
                    }
                    type="checkbox"
                  />
                  <div className="">ทำร้ายร่างกายตนเอง </div>
                </div>
              </div>
            </div>
            <div className="w-2/6 items-start flex flex-col">
              <div className="flex flex-col text-start justify-center items-start">
                <div className="flex flex-row">
                  <input
                    className="mt-1 mr-2"
                    checked={
                      reportmap.violent.frequent_quarrels == "1" ? true : false
                    }
                    type="checkbox"
                  />
                  <div className="">ทะเลาะวิวาทเป็นประจำ</div>
                </div>
                <div className="flex flex-row">
                  <input
                    className="mt-1 mr-2"
                    checked={reportmap.violent.other == "1" ? true : false}
                    type="checkbox"
                  />
                  <div className="">อื่นๆ</div>
                  <label
                    className="border-dashed border-b border-black w-24"
                    type="text"
                  >
                    {reportmap.violent_other || ""}
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="flex mt-1 flex-row text-start items-end">
            <div className=" pl-2">
              4.9 พฤติกรรมทางเพศ (ตอบได้มากกว่า 1 ข้อ)
            </div>
          </div>
          <div className="flex flex-row w-full px-2 ">
            <div className="w-1/4 items-start flex flex-col">
              <div className="flex flex-col text-start justify-center items-start">
                <div className="flex flex-row">
                  <input
                    className="mt-1 mr-2"
                    checked={
                      reportmap.sexual.service_group == "1" ? true : false
                    }
                    type="checkbox"
                  />
                  <div className="">อยู่ในกลุ่มขายบริการ</div>
                </div>
                <div className="flex flex-row">
                  <input
                    className="mt-1 mr-2"
                    checked={
                      reportmap.sexual.prostitution == "1" ? true : false
                    }
                    type="checkbox"
                  />
                  <div className="">ขายบริการทางเพศ </div>
                </div>
              </div>
            </div>
            <div className="w-2/4 items-start flex flex-col">
              <div className="flex flex-col text-start justify-center items-start">
                <div className="flex flex-row">
                  <input
                    className="mt-1 mr-1"
                    checked={
                      reportmap.sexual.use_of_sex_comtool == "1" ? true : false
                    }
                    type="checkbox"
                  />
                  <div className="">
                    ใช้เครื่องมือสื่อสารที่เกี่ยวข้องก
                    ับด้านเพศเป็นเวลานานและบ่อยครั้ง
                  </div>
                </div>
                <div className="flex flex-row">
                  <input
                    className="mt-1 mr-2"
                    checked={
                      reportmap.sexual.Obsessed_of_sex_comtool == "1"
                        ? true
                        : false
                    }
                    type="checkbox"
                  />
                  <div className="">
                    หมกมุ่นในการใช้เครื่องมือสื่อสารที่เกี่ยวข้องทางเพศ{" "}
                  </div>
                </div>
              </div>
            </div>
            <div className="w-1/4 items-start flex flex-col">
              <div className="flex flex-col text-start justify-center items-start">
                <div className="flex flex-row">
                  <input
                    className="mt-1 mr-2"
                    checked={reportmap.sexual.pregnant == "1" ? true : false}
                    type="checkbox"
                  />
                  <div className="">ตั้งครรภ์</div>
                </div>
                <div className="flex flex-row">
                  <input
                    className="mt-1 mr-2"
                    checked={
                      reportmap.sexual.sexually_mixed == "1" ? true : false
                    }
                    type="checkbox"
                  />
                  <div className="">มีการมั่วสุมทางเพศ</div>
                  {/* <label className="border-dashed border-b border-black w-24" type="text">{reportmap.firstname || ""}</label> */}
                </div>
              </div>
            </div>
          </div>
          <div className="flex mt-1 flex-row text-start items-end">
            <div className=" pl-2">4.10 การติดเกม (ตอบได้มากกว่า 1 ข้อ)</div>
          </div>
          <div className="flex flex-row w-full px-6 ">
            <div className="w-3/12 items-start flex flex-col">
              <div className="flex flex-col text-start justify-center items-start">
                <div className="flex flex-row">
                  <input
                    className="mt-1 mr-2"
                    checked={
                      reportmap.game_addiction.more_than_1_hour == "1"
                        ? true
                        : false
                    }
                    type="checkbox"
                  />
                  <div className="">เล่นเกมเกินวันละ 1 ชั่วโมง</div>
                </div>
                <div className="flex flex-row">
                  <input
                    className="mt-1 mr-2"
                    checked={
                      reportmap.game_addiction.unusual_spending == "1"
                        ? true
                        : false
                    }
                    type="checkbox"
                  />
                  <div className="">ใช้จ่ายเงินผิดปกติ </div>
                </div>
                <div className="flex flex-row">
                  <input
                    className="mt-1 mr-2"
                    checked={
                      reportmap.game_addiction.more_than_2_hour == "1"
                        ? true
                        : false
                    }
                    type="checkbox"
                  />
                  <div className="">ใช้เวลาเล่นเกมเกิน 2 ชั่วโมง</div>
                </div>
                <div className="flex flex-row">
                  <input
                    className="mt-1 mr-2"
                    checked={
                      reportmap.game_addiction.other == "1" ? true : false
                    }
                    type="checkbox"
                  />
                  <div className="">อื่นๆ</div>
                  <label
                    className="border-dashed border-b border-black w-24"
                    type="text"
                  >
                    {reportmap.game_addiction_other || ""}
                  </label>
                </div>
              </div>
            </div>
            <div className="w-4/12 items-start flex flex-col ml-1">
              <div className="flex flex-col text-start justify-center items-start">
                <div className="flex flex-row">
                  <input
                    className="mt-1 mr-2"
                    checked={
                      reportmap.game_addiction.Lack_of_imagination == "1"
                        ? true
                        : false
                    }
                    type="checkbox"
                  />
                  <div className="">ขาดจินตนาการและความคิดสร้างสรรค์</div>
                </div>
                <div className="flex flex-row">
                  <input
                    className="mt-1 mr-2"
                    checked={
                      reportmap.game_addiction.friends_playing_games == "1"
                        ? true
                        : false
                    }
                    type="checkbox"
                  />
                  <div className="">อยู่ในกลุ่มเพื่อนเล่นเกม</div>
                </div>
                <div className="flex flex-row">
                  <input
                    className="mt-1 mr-2"
                    checked={
                      reportmap.game_addiction.seriously_with_game == "1"
                        ? true
                        : false
                    }
                    type="checkbox"
                  />
                  <div className="">หมกมุ่น จริงจังในการเล่นเกม</div>
                </div>
              </div>
            </div>
            <div className="w-5/12 items-start flex flex-col">
              <div className="flex flex-col text-start justify-center items-start">
                <div className="flex flex-row">
                  <input
                    className="mt-1 mr-2"
                    checked={
                      reportmap.game_addiction.Isolated == "1" ? true : false
                    }
                    type="checkbox"
                  />
                  <div className="">เก็บตัว แยกตัวจากกลุ่มเพื่อน</div>
                </div>
                <div className="flex flex-row">
                  <input
                    className="mt-1 mr-2"
                    checked={
                      reportmap.game_addiction.game_store_near == "1"
                        ? true
                        : false
                    }
                    type="checkbox"
                  />
                  <div className="">ร้านเกมอยู่ใกล้บ้านหรือโรงเรียน</div>
                </div>
                <div className="flex flex-row">
                  <input
                    className="mt-1 mr-2"
                    checked={
                      reportmap.game_addiction.steal_money == "1" ? true : false
                    }
                    type="checkbox"
                  />
                  <div className="">
                    ใช้เงินสิ้นเปลือง โกหก ลักขโมยเงินเพื่อเล่นเกม
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex mt-1 flex-row text-start items-end">
            <div className=" pl-2">
              4.11 การเข้าถึงสื่อคอมพิวเตอร์และอินเตอร์เน็ตที่บ้าน
            </div>
          </div>
          <div className="flex flex-row w-full px-12 ">
            <div className=" w-1/2 items-start flex flex-col">
              <div className="flex flex-col text-start justify-center items-start">
                <div className="flex flex-row">
                  <input
                    className="mt-1 mr-2"
                    checked={reportmap.com_internet == "1" ? true : false}
                    type="checkbox"
                  />
                  <div className="">สามารถเข้าถึง Internet ได้จากที่บ้าน </div>
                </div>
              </div>
            </div>
            <div className=" w-1/2 items-start flex flex-col">
              <div className="flex flex-col text-start justify-center items-start">
                <div className="flex flex-row">
                  <input
                    className="mt-1 mr-2"
                    checked={reportmap.com_internet == "2" ? true : false}
                    type="checkbox"
                  />
                  <div className="">
                    ไม่สามารถเข้าถึง Internet ได้จากที่บ้าน
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex mt-1 flex-row text-start items-end">
            <div className=" pl-2">
              4.12 การใช้เครื่องมือสื่อสารอิเล็กทรอนิกส์{" "}
            </div>
          </div>
          <div className="flex flex-row w-full px-12 ">
            <div className=" items-start flex flex-col">
              <div className="flex flex-col text-start justify-center items-start">
                <div className="flex flex-row">
                  <input
                    className="mt-1 mr-2"
                    checked={reportmap.electronic_comm == "1" ? true : false}
                    type="checkbox"
                  />
                  <div className="">
                    ใช้ Social media/game (ไม่เกินวันละ 3 ชั่วโมง)
                  </div>
                </div>
                <div className="flex flex-row">
                  <input
                    className="mt-1 mr-2"
                    checked={reportmap.electronic_comm == "2" ? true : false}
                    type="checkbox"
                  />
                  <div className="">
                    ใช้ Social media/game (วันละ 3 ชั่วโมงขึ้นไป)
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex mt-1 flex-row text-start font-bold items-end">
            <div className=" pl-2">ผู้ให้ข้อมูลนักเรียน</div>
          </div>
          <div className="flex flex-row w-full px-12 ">
            <div className=" w-1/6 items-start flex flex-col">
              <div className="flex flex-col text-start justify-center items-start">
                <div className="flex flex-row">
                  <input
                    className="mt-1 mr-2"
                    checked={reportmap.informant.father == "1" ? true : false}
                    type="checkbox"
                  />
                  <div className="">บิดา</div>
                </div>
                <div className="flex flex-row">
                  <input
                    className="mt-1 mr-2"
                    checked={reportmap.informant.par == "1" ? true : false}
                    type="checkbox"
                  />
                  <div className="">ป้า</div>
                </div>
                <div className="flex flex-row">
                  <input
                    className="mt-1 mr-2"
                    checked={reportmap.informant.tuad == "1" ? true : false}
                    type="checkbox"
                  />
                  <div className="">ทวด</div>
                </div>
              </div>
            </div>
            <div className=" w-1/6 items-start flex flex-col">
              <div className="flex flex-col text-start justify-center items-start">
                <div className="flex flex-row">
                  <input
                    className="mt-1 mr-2"
                    checked={reportmap.informant.mother == "1" ? true : false}
                    type="checkbox"
                  />
                  <div className="">มารดา</div>
                </div>
                <div className="flex flex-row">
                  <input
                    className="mt-1 mr-2"
                    checked={reportmap.informant.lung == "1" ? true : false}
                    type="checkbox"
                  />
                  <div className="">ลุง</div>
                </div>
                <div className="flex flex-row">
                  <input
                    className="mt-1 mr-2"
                    checked={
                      reportmap.informant.stepfather == "1" ? true : false
                    }
                    type="checkbox"
                  />
                  <div className="">พ่อเลี้ยง</div>
                </div>
              </div>
            </div>
            <div className=" w-1/6 items-start flex flex-col">
              <div className="flex flex-col text-start justify-center items-start">
                <div className="flex flex-row">
                  <input
                    className="mt-1 mr-2"
                    checked={reportmap.informant.brother == "1" ? true : false}
                    type="checkbox"
                  />
                  <div className="">พี่ชาย</div>
                </div>
                <div className="flex flex-row">
                  <input
                    className="mt-1 mr-2"
                    checked={reportmap.informant.pu == "1" ? true : false}
                    type="checkbox"
                  />
                  <div className="">ปู่</div>
                </div>
                <div className="flex flex-row">
                  <input
                    className="mt-1 mr-2"
                    checked={
                      reportmap.informant.stepmother == "1" ? true : false
                    }
                    type="checkbox"
                  />
                  <div className="">แม่เลี้ยง</div>
                </div>
              </div>
            </div>
            <div className=" w-1/6 items-start flex flex-col">
              <div className="flex flex-col text-start justify-center items-start">
                <div className="flex flex-row">
                  <input
                    className="mt-1 mr-2"
                    checked={reportmap.informant.sister == "1" ? true : false}
                    type="checkbox"
                  />
                  <div className="">พี่สาว</div>
                </div>
                <div className="flex flex-row">
                  <input
                    className="mt-1 mr-2"
                    checked={reportmap.informant.ya == "1" ? true : false}
                    type="checkbox"
                  />
                  <div className="">ย่า</div>
                </div>
              </div>
            </div>
            <div className=" w-1/6 items-start flex flex-col">
              <div className="flex flex-col text-start justify-center items-start">
                <div className="flex flex-row">
                  <input
                    className="mt-1 mr-2"
                    checked={reportmap.informant.narr == "1" ? true : false}
                    type="checkbox"
                  />
                  <div className="">น้า</div>
                </div>
                <div className="flex flex-row">
                  <input
                    className="mt-1 mr-2"
                    checked={reportmap.informant.ta == "1" ? true : false}
                    type="checkbox"
                  />
                  <div className="">ตา</div>
                </div>
              </div>
            </div>
            <div className=" w-1/6 items-start flex flex-col">
              <div className="flex flex-col text-start justify-center items-start">
                <div className="flex flex-row">
                  <input
                    className="mt-1 mr-2"
                    checked={reportmap.informant.r == "1" ? true : false}
                    type="checkbox"
                  />
                  <div className="">อา</div>
                </div>
                <div className="flex flex-row">
                  <input
                    className="mt-1 mr-2"
                    checked={reportmap.informant.yai == "1" ? true : false}
                    type="checkbox"
                  />
                  <div className="">ยาย</div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-row w-full">
            <div className="flex flex-col w-1/2 items-end">
              <label className="w-28"></label>
            </div>
            <div className="flex flex-col w-1/2">
              <div className="flex flex-row text-left">
                <label className="w-14"> </label>
                <div className="w-60 mb-4">
                  ขอรับรองว่าข้อมูลดังกล่าวเป็นจริง
                </div>
              </div>
              <div className="flex flex-row">
                <label className="w-14">ลงชื่อ</label>
                <div className="border-dashed border-b border-black w-52">
                  {" "}
                </div>
                <label className="w-44">ผู้ปกครอง/ผู้แทน</label>
              </div>
              <div className="flex flex-row text-center">
                <label className="w-14"> </label>(
                <div className="border-dashed border-b border-black w-52">
                  {" "}
                </div>
                )<label className="w-44"> </label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center text-center section mt-1">
        <div className="flex flex-row w-full px-12">
          <div className="w-1/3 border-b border-black"></div>
          <div className="w-1/3 flex flex-col border-b border-black">
            <div>
              <Image
                width={40}
                height={50}
                src="/img/logosorportor.png"
                alt="profile"
                className="mx-auto"
              />
            </div>
            <label className="mt-2 font-bold">บันทึกการเยี่ยมบ้าน</label>
          </div>
          <div className="w-1/3 border-b border-black flex flex-col justify-end items-end text-end">
            <div className="">
              <label className="mt-2 font-bold border border-black p-1">
                กนช.5
              </label>
            </div>
            <label className="mt-2 m-1">หน้า4/4</label>
          </div>
        </div>
        <div className=" flex flex-col mb-10 w-full justify-center items-center text-center">
          <label className="font-bold">
            ภาพถ่ายบ้านนักเรียนที่ได้รับการเยี่ยมบ้าน
          </label>
        </div>

        <div className=" flex flex-col mb-10 w-full">
          <div className="flex mt-1 flex-row text-start items-end">
            <div className="w-60 pl-3">
              ชื่อ-สกุล นักเรียน (ด.ช./ด.ญ./นาย/น.ส.)
            </div>
            <label
              className=" border-dashed border-b border-black w-80 text-center"
              type="text"
            >
              {reportmap.firstname_student + " " + reportmap.lastname_student}
            </label>
            <div className="w-7">ชั้น</div>
            <label
              className=" border-dashed border-b border-black w-20"
              type="text"
            >
              {reportmap.classroom_name || ""}
            </label>
            <div className="w-12">เลขที่</div>
            <label
              className=" border-dashed border-b border-black w-20"
              type="text"
            >
              {reportmap.student_no || ""}
            </label>
          </div>
          <div className="flex mt-1 flex-row text-start items-end">
            <div className=" pl-3 w-32">ที่อยู่ปัจจุบัน</div>
            <label
              className=" border-dashed border-b border-black w-full text-left"
              type="text"
            >
              {reportmap.current_address || ""}
            </label>
          </div>
          {/* <div className="flex mt-1 pt-6 flex-row text-start items-end">
                        <label className="ml-3 border-dashed border-b border-black w-full" type="text">{reportmap.firstname || ""}</label>
                    </div> */}
          <div className="flex mt-1 flex-row w-full text-start items-end">
            <div className="w-1/2 items-start flex">
              <div className=" pl-3 pr-4">
                สถานที่ใกล้เคียง(เช่น วัดเขียนเขต,โลตัสสาขารังสิต-นครนายก)
              </div>
            </div>
            <div className="w-1/2 ">
              <div className="flex flex-col text-start justify-center items-start">
                <div className="flex flex-row">
                  <label
                    className=" border-dashed border-b border-black w-96 text-center"
                    type="text"
                  >
                    {reportmap.current_address_near || ""}
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-row w-full mb-10">
            <div className=" w-1/3 items-start flex flex-col">
              <div className="flex flex-col text-start justify-center items-start">
                <div className="flex flex-row">
                  <div className=" pl-2">กรุณาระบุ ภาพถ่ายที่แนบมาคือ </div>
                </div>
              </div>
            </div>
            <div className=" w-2/3 items-start flex flex-col">
              <div className="flex flex-col text-start justify-center items-start">
                <div className="flex flex-row">
                  <input
                    className="mt-1 mr-2"
                    checked={reportmap.attached_photos == "1" ? true : false}
                    type="checkbox"
                  />
                  <div className="">
                    บ้านที่อาศัยอยู่กับพ่อแม่ (เป็นเจ้าของ/เช่า)
                  </div>
                </div>
                <div className="flex flex-row">
                  <input
                    className="mt-1 mr-2"
                    checked={reportmap.attached_photos == "2" ? true : false}
                    type="checkbox"
                  />
                  <div className="">บ้านของญาติ/ผู้ปกครองที่ไม่ใช่ญาติ</div>
                </div>
                <div className="flex flex-row">
                  <input
                    className="mt-1 mr-2"
                    checked={reportmap.attached_photos == "3" ? true : false}
                    type="checkbox"
                  />
                  <div className="">
                    บ้านหรือที่พักประเภท วัด มูลนิธิ หอพัก โรงงาน อยู่กับนายจ้าง
                  </div>
                </div>
                <div className="flex flex-row">
                  <input
                    className="mt-1 mr-2"
                    checked={reportmap.attached_photos == "4" ? true : false}
                    type="checkbox"
                  />
                  <div className="">
                    ภาพนักเรียนและป้ายชื่อโรงเรียน เนื่องจากถ่ายภาพบ้านไม่ได้
                    เพราะบ้านอยู่ต่างอำเภอ/
                  </div>
                </div>
                <div className="flex flex-row">
                  <div className="pl-5">
                    ต่างจังหวัด/ต่างประเทศ หรือไม่ได้รับอนุญาตให้ถ่ายภาพ
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-row w-full h-60 mb-5">
            <div className=" w-1/2 items-center justify-center flex flex-col border border-black mx-2">
              <div className="flex flex-col text-start justify-center items-center">
                <div className="flex flex-row">
                  {reportmap.photo_house ? (
                    <Image
                      width={350}
                      height={220}
                      src={reportmap.photo_house}
                      alt="profile"
                      className="mx-auto"
                    />
                  ) : (
                    <div className=" pl-2">
                      รูปที่ 1
                      ภาพถ่ายสภาพบ้านนักเรียนภายในหรือภายนอกบ้านนักเรียน
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className=" w-1/2 items-center justify-center flex flex-col border border-black mx-2">
              <div className="flex flex-col text-start justify-center items-center">
                <div className="flex flex-row">
                  {reportmap.photo_teacher_fm_student ? (
                    <Image
                      width={350}
                      height={220}
                      src={reportmap.photo_teacher_fm_student}
                      alt="profile"
                      className="mx-auto"
                    />
                  ) : (
                    <div className=" pl-2">
                      รูปที่ 2 ภาพถ่ายครูที่ปรึกษากับครอบครัวนักเรียน
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-row w-full h-60 mb-5">
            <div className=" w-full items-center justify-center flex flex-col border border-black mx-2">
              <div className="flex flex-col text-start justify-center items-center">
                {reportmap.iframe_google_map ? (
                  <iframe width={750} height={220} src={googlemap()}></iframe>
                ) : (
                  <div width={750} height={350}>
                    แผนที่บ้าน
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-row w-full  h-44 mb-5">
            <div className="flex flex-col w-full border border-black mx-2">
              <div className="flex flex-row font-bold">
                <div className=" pl-2">
                  ขอรับรองว่าข้อมูล และภาพถ่ายบ้านของนักเรียนเป็นความจริง
                </div>
              </div>

              <div className="flex flex-row w-full h-96 mb-10">
                <div className=" w-full items-center justify-center flex flex-row ">
                  <div className="flex flex-col text-start justify-center items-center mr-2">
                    <div className="flex flex-row">
                      <label className="w-14">ลงชื่อ</label>
                      <div className="border-dashed border-b border-black w-40"></div>
                    </div>
                    <div className="flex flex-row text-center mt-2">
                      <label className="w-14"> </label>(
                      <div className="border-dashed border-b border-black w-40">
                        {reportmap.teacher_signature1 || ""}
                      </div>
                      )
                    </div>
                    <div className="flex flex-row text-center">
                      <label className="ml-10">(ครูที่ปรึกษา)</label>
                    </div>
                  </div>
                  <div className="flex flex-col text-start justify-center items-center mr-2">
                    <div className="flex flex-row">
                      <label className="w-14">ลงชื่อ</label>
                      <div className="border-dashed border-b border-black w-40"></div>
                    </div>
                    <div className="flex flex-row text-center mt-2">
                      <label className="w-14"> </label>(
                      <div className="border-dashed border-b border-black w-40">
                        {reportmap.teacher_signature2 || ""}
                      </div>
                      )
                    </div>
                    <div className="flex flex-row text-center">
                      <label className="ml-10">(ครูที่ปรึกษา)</label>
                    </div>
                  </div>
                  <div className="flex flex-col text-start justify-center items-center mt-5">
                    <div className="flex flex-row pb-7">
                      <div className="">วัน/เดือน/ปี</div>
                      <label
                        className="border-dashed border-b border-black w-24 text-center"
                        type="text"
                      >
                        {moment(reportmap.Created_date)
                          .add(543, "year")
                          .format("DD/MM/YY") == "Invalid date"
                          ? ""
                          : moment(reportmap.Created_date)
                              .add(543, "year")
                              .format("DD/MM/YY")}
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default report;
