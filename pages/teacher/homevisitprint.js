import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import moment from "moment";
import Swal from "sweetalert2";
import Image from "next/image";
function homevisitprint() {
  return (
    <div className="a4">
      <div className="flex flex-col items-center text-center section">
        <div className="flex flex-row w-full px-12">
          <div className="w-1/3 border-b border-black"></div>
          <div className="w-1/3 border-b border-black">
            <label className="mt-2 font-bold">บันทึกการเยี่ยมบ้าน</label>
          </div>
          <div className="w-1/3 border-b border-black flex flex-col items-end text-end">
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
                • การตอบแบบสอบถาม : ทำเครื่องหมำย ✓ ลงในช่อง{" "}
                <input disabled type="checkbox" /> ต่ำมความเป็นจริง
              </label>
            </div>
          </div>
          <div className=" flex flex-col w-1/6 border">รูปภาพ</div>
        </div>
        <div className=" flex flex-col mb-10 w-full">
          <div className="flex mt-1 flex-row text-start items-end">
            <div className="w-60">
              1. ชื่อ-สกุล นักเรียน (ด.ช./ด.ญ./นาย/น.ส.)
            </div>
            <label
              className=" border-dashed border-b border-black w-52"
              type="text"
            >
              {" "}
            </label>
            <div className="w-12">เลขที่</div>
            <label
              className=" border-dashed border-b border-black w-7"
              type="text"
            >
              {" "}
            </label>
            <div className="w-7">ชั้น</div>
            <label
              className=" border-dashed border-b border-black w-10"
              type="text"
            >
              {" "}
            </label>
            <div className="w-20">เบอร์โทรศัพท์</div>
            <label
              className=" border-dashed border-b border-black w-32"
              type="text"
            >
              {" "}
            </label>
          </div>
          <div className="flex mt-1 flex-row text-start items-end">
            <div className="w-24 pl-2">ชื่อ-สกุล บิดา</div>
            <label
              className=" border-dashed border-b border-black w-64"
              type="text"
            >
              {" "}
            </label>
            <div className="w-12">อาชีพ</div>
            <label
              className=" border-dashed border-b border-black w-48"
              type="text"
            >
              {" "}
            </label>
            <div className="w-20">เบอร์โทรศัพท์</div>
            <label
              className=" border-dashed border-b border-black w-32"
              type="text"
            >
              {" "}
            </label>
          </div>
          <div className="flex mt-1 flex-row text-start items-end">
            <div className="w-28 pl-2">ชื่อ-สกุล มารดา</div>
            <label
              className=" border-dashed border-b border-black w-60"
              type="text"
            >
              {" "}
            </label>
            <div className="w-12">อาชีพ</div>
            <label
              className=" border-dashed border-b border-black w-48"
              type="text"
            >
              {" "}
            </label>
            <div className="w-20">เบอร์โทรศัพท์</div>
            <label
              className=" border-dashed border-b border-black w-32"
              type="text"
            >
              {" "}
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default homevisitprint;
