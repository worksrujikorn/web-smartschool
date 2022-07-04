import React, { useEffect, useState } from "react";
import Clock from 'react-live-clock';
import moment from "moment";
import Sidebar from '../../component/layout/teacher/sidebar'
import Nav from '../../component/layout/teacher/nav'
import Footer from '../../component/layout/footer'
import Image from 'next/image'

import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import { columns, data } from "../../component/layout/data";

function Conductscore() {

    const tableData = {
        columns,
        data
    };



    const [THdate, setTHdate] = useState("")
    useEffect(() => {


        timezone()
    }, [])

    const timezone = () => {

        const result = new Date().toLocaleDateString('th-TH', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            weekday: 'long',
        })

        setTHdate(result);
        console.log(result)

    }

    const [showModal, setShowModal] =useState(false);
   



    return (
        <div>
            <div className="flex flex-row min-h-screen bg-gray-100 text-gray-800 ">


                <Sidebar></Sidebar>

                <main className="main w-4/5 flex flex-col flex-grow -ml-64 md:ml-0 transition-all duration-150 ease-in">
                    <Nav></Nav>
                    <div className="main-content flex flex-col flex-grow p-4">
                        <div className="flex md-4">

                            <h1 className="  w-3/4 text-xl text-center text-color-blue"></h1>
                            <h1 className="  w-1/4 text-xl text-right  text-color-blue">
                                <p >


                                    {THdate}
                                </p>
                            </h1>
                        </div>
                        <div className="flex flex-col ">


                            <h1 className="   text-xl text-right  text-color-blue">
                                <div  >
                                    <Clock format={'HH:mm:ss'} ticking={true} timezone={'Asia/Bangkok'} />
                                </div>

                            </h1>
                        </div>
                        <h1 className="   text-xl text-center text-color-blue">คะแนนความประพฤติ</h1>
                        {/* main */}
                        {/* <DataTableExtensions {...tableData}>
                            <DataTable
                                columns={columns}
                                data={data}
                                noHeader
                                defaultSortField="id"
                                defaultSortAsc={false}
                                pagination
                                highlightOnHover 
                                
                            />
                        </DataTableExtensions> */}

                        <div className="relative px-6 flex-auto  h-full  ">
                            <div className="flex flex-wrap items-stretch  w-1/4 mb-4 relative ">
                                <div className="flex -mr-px">
                                    <span className=" flex items-center leading-normal  rounded rounded-r-none   bg-blue-800 px-3 whitespace-no-wrap text-grey-dark text-xl   text-white">


                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 " fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                        </svg>
                                    </span>
                                </div>
                                <input type="text" className=" outline-none flex-shrink flex-grow flex-auto leading-normal w-px  border h-10 border-grey-light rounded rounded-l-none px-3 relative focus:border-blue focus:shadow" />
                            </div>


                            {/* <input className=" w-40 shadow hover:shadow-lg text-white bg-blue-600 hover:text-blue-600   border-2   border-blue-600 hover:border-blue-600  hover:bg-white rounded-lg background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" /> */}

                            <div className=" overflow-y-auto   h-screen">
                                <table className="  rounded-t-lg m-5  w-full mx-auto bg-blue-200 text-blue-800     ">
                                    <tr className=" border-b-2 border-blue-300 text-center">
                                        <th className="px-6 py-3">รหัสนักเรียน</th>
                                        <th className="px-6 py-3">คำนหน้า</th>
                                        <th className="px-6 py-3">ชื่อ</th>
                                        <th className="px-6 py-3">นามสกุล</th>
                                        <th className="px-6 py-3">ชั้น</th>
                                    </tr>

                                    <tr className="bg-blue-100 border-b border-blue-200 text-center">
                                        <td className="px-6 py-3">6011110001</td>
                                        <td className="px-6 py-3">นาย</td>
                                        <td className="px-6 py-3">ดอกไม้</td>
                                        <td className="px-6 py-3">สีเขียว</td>
                                        <td className="px-6 py-3">ม. 6/2</td>
                                        <td className="px-6 py-3">  <button type="button" className=" text-white bg-blue-800 hover:text-blue-800   border-2   border-blue-600 hover:border-blue-600  hover:bg-blue-200 m-auto p-2 rounded-lg " onClick={() => setShowModal(true)}>แสดงข้อมูล</button> </td>
                                        {/* <td className="px-6 py-3">  <button type="button" className=" text-white bg-blue-800 hover:text-blue-800   border-2   border-blue-600 hover:border-blue-600  hover:bg-blue-200 m-auto p-2 rounded-lg " onClick={() => setShowModal(true)}>แสดงข้อมูล</button> </td> */}
                                    </tr>
                                    <tr className="bg-blue-100 border-b border-blue-200 text-center">
                                        <td className="px-6 py-3">6011110001</td>
                                        <td className="px-6 py-3">นาย</td>
                                        <td className="px-6 py-3">ดอกไม้</td>
                                        <td className="px-6 py-3">สีเขียว</td>
                                        <td className="px-6 py-3">ม. 6/2</td>
                                        <td className="px-6 py-3">  <button type="button" className=" text-white bg-blue-800 hover:text-blue-800   border-2   border-blue-600 hover:border-blue-600  hover:bg-blue-200 m-auto p-2 rounded-lg ">แสดงข้อมูล</button> </td>
                                    </tr>
                                    <tr className="bg-blue-100 border-b border-blue-200 text-center">
                                        <td className="px-6 py-3">6011110001</td>
                                        <td className="px-6 py-3">นาย</td>
                                        <td className="px-6 py-3">ดอกไม้</td>
                                        <td className="px-6 py-3">สีเขียว</td>
                                        <td className="px-6 py-3">ม. 6/2</td>
                                        <td className="px-6 py-3">  <button type="button" className=" text-white bg-blue-800 hover:text-blue-800   border-2   border-blue-600 hover:border-blue-600  hover:bg-blue-200 m-auto p-2 rounded-lg ">แสดงข้อมูล</button> </td>
                                    </tr>
                                    <tr className="bg-blue-100 border-b border-blue-200 text-center">
                                        <td className="px-6 py-3">6011110001</td>
                                        <td className="px-6 py-3">นาย</td>
                                        <td className="px-6 py-3">ดอกไม้</td>
                                        <td className="px-6 py-3">สีเขียว</td>
                                        <td className="px-6 py-3">ม. 6/2</td>
                                        <td className="px-6 py-3">  <button type="button" className=" text-white bg-blue-800 hover:text-blue-800   border-2   border-blue-600 hover:border-blue-600  hover:bg-blue-200 m-auto p-2 rounded-lg ">แสดงข้อมูล</button> </td>
                                    </tr>
                                    <tr className="bg-blue-100 border-b border-blue-200 text-center">
                                        <td className="px-6 py-3">6011110001</td>
                                        <td className="px-6 py-3">นาย</td>
                                        <td className="px-6 py-3">ดอกไม้</td>
                                        <td className="px-6 py-3">สีเขียว</td>
                                        <td className="px-6 py-3">ม. 6/2</td>
                                        <td className="px-6 py-3">  <button type="button" className=" text-white bg-blue-800 hover:text-blue-800   border-2   border-blue-600 hover:border-blue-600  hover:bg-blue-200 m-auto p-2 rounded-lg ">แสดงข้อมูล</button> </td>
                                    </tr>
                                    <tr className="bg-blue-100 border-b border-blue-200 text-center">
                                        <td className="px-6 py-3">6011110001</td>
                                        <td className="px-6 py-3">นาย</td>
                                        <td className="px-6 py-3">ดอกไม้</td>
                                        <td className="px-6 py-3">สีเขียว</td>
                                        <td className="px-6 py-3">ม. 6/2</td>
                                        <td className="px-6 py-3">  <button type="button" className=" text-white bg-blue-800 hover:text-blue-800   border-2   border-blue-600 hover:border-blue-600  hover:bg-blue-200 m-auto p-2 rounded-lg ">แสดงข้อมูล</button> </td>
                                    </tr>
                                    <tr className="bg-blue-100 border-b border-blue-200 text-center">
                                        <td className="px-6 py-3">6011110001</td>
                                        <td className="px-6 py-3">นาย</td>
                                        <td className="px-6 py-3">ดอกไม้</td>
                                        <td className="px-6 py-3">สีเขียว</td>
                                        <td className="px-6 py-3">ม. 6/2</td>
                                        <td className="px-6 py-3">  <button type="button" className=" text-white bg-blue-800 hover:text-blue-800   border-2   border-blue-600 hover:border-blue-600  hover:bg-blue-200 m-auto p-2 rounded-lg ">แสดงข้อมูล</button> </td>
                                    </tr>
                                    <tr className="bg-blue-100 border-b border-blue-200 text-center">
                                        <td className="px-6 py-3">6011110001</td>
                                        <td className="px-6 py-3">นาย</td>
                                        <td className="px-6 py-3">ดอกไม้</td>
                                        <td className="px-6 py-3">สีเขียว</td>
                                        <td className="px-6 py-3">ม. 6/2</td>
                                        <td className="px-6 py-3">  <button type="button" className=" text-white bg-blue-800 hover:text-blue-800   border-2   border-blue-600 hover:border-blue-600  hover:bg-blue-200 m-auto p-2 rounded-lg ">แสดงข้อมูล</button> </td>
                                    </tr>
                                    <tr className="bg-blue-100 border-b border-blue-200 text-center">
                                        <td className="px-6 py-3">6011110001</td>
                                        <td className="px-6 py-3">นาย</td>
                                        <td className="px-6 py-3">ดอกไม้</td>
                                        <td className="px-6 py-3">สีเขียว</td>
                                        <td className="px-6 py-3">ม. 6/2</td>
                                        <td className="px-6 py-3">  <button type="button" className=" text-white bg-blue-800 hover:text-blue-800   border-2   border-blue-600 hover:border-blue-600  hover:bg-blue-200 m-auto p-2 rounded-lg ">แสดงข้อมูล</button> </td>
                                    </tr>
                                    <tr className="bg-blue-100 border-b border-blue-200 text-center">
                                        <td className="px-6 py-3">6011110001</td>
                                        <td className="px-6 py-3">นาย</td>
                                        <td className="px-6 py-3">ดอกไม้</td>
                                        <td className="px-6 py-3">สีเขียว</td>
                                        <td className="px-6 py-3">ม. 6/2</td>
                                        <td className="px-6 py-3">  <button type="button" className=" text-white bg-blue-800 hover:text-blue-800   border-2   border-blue-600 hover:border-blue-600  hover:bg-blue-200 m-auto p-2 rounded-lg ">แสดงข้อมูล</button> </td>
                                    </tr>
                                    <tr className="bg-blue-100 border-b border-blue-200 text-center">
                                        <td className="px-6 py-3">6011110001</td>
                                        <td className="px-6 py-3">นาย</td>
                                        <td className="px-6 py-3">ดอกไม้</td>
                                        <td className="px-6 py-3">สีเขียว</td>
                                        <td className="px-6 py-3">ม. 6/2</td>
                                        <td className="px-6 py-3">  <button type="button" className=" text-white bg-blue-800 hover:text-blue-800   border-2   border-blue-600 hover:border-blue-600  hover:bg-blue-200 m-auto p-2 rounded-lg ">แสดงข้อมูล</button> </td>
                                    </tr>
                                    <tr className="bg-blue-100 border-b border-blue-200 text-center">
                                        <td className="px-6 py-3">6011110001</td>
                                        <td className="px-6 py-3">นาย</td>
                                        <td className="px-6 py-3">ดอกไม้</td>
                                        <td className="px-6 py-3">สีเขียว</td>
                                        <td className="px-6 py-3">ม. 6/2</td>
                                        <td className="px-6 py-3">  <button type="button" className=" text-white bg-blue-800 hover:text-blue-800   border-2   border-blue-600 hover:border-blue-600  hover:bg-blue-200 m-auto p-2 rounded-lg ">แสดงข้อมูล</button> </td>
                                    </tr>
                                    <tr className="bg-blue-100 border-b border-blue-200 text-center">
                                        <td className="px-6 py-3">6011110001</td>
                                        <td className="px-6 py-3">นาย</td>
                                        <td className="px-6 py-3">ดอกไม้</td>
                                        <td className="px-6 py-3">สีเขียว</td>
                                        <td className="px-6 py-3">ม. 6/2</td>
                                        <td className="px-6 py-3">  <button type="button" className=" text-white bg-blue-800 hover:text-blue-800   border-2   border-blue-600 hover:border-blue-600  hover:bg-blue-200 m-auto p-2 rounded-lg ">แสดงข้อมูล</button> </td>
                                    </tr>
                                    <tr className="bg-blue-100 border-b border-blue-200 text-center">
                                        <td className="px-6 py-3">6011110001</td>
                                        <td className="px-6 py-3">นาย</td>
                                        <td className="px-6 py-3">ดอกไม้</td>
                                        <td className="px-6 py-3">สีเขียว</td>
                                        <td className="px-6 py-3">ม. 6/2</td>
                                        <td className="px-6 py-3">  <button type="button" className=" text-white bg-blue-800 hover:text-blue-800   border-2   border-blue-600 hover:border-blue-600  hover:bg-blue-200 m-auto p-2 rounded-lg ">แสดงข้อมูล</button> </td>
                                    </tr>

                                </table>
                            </div>






                        </div>

                        {/* Modal */}
                        {showModal ? (
                            <>
                                <div
                                    className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                                >
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
                                                    onClick={() => setShowModal(false)}
                                                >
                                                    <span className="bg-transparent text-black  h-6 w-6 text-2xl block outline-none focus:outline-none">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                                        </svg>
                                                    </span>
                                                </button>
                                            </div>
                                            {/*body*/}
                                            <div className="relative p-6 flex-auto  ">

                                                <div className=" flex my-4  text-lg leading-relaxed    h-52 ">

                                                    <div className="  h-full   rounded-lg border-2 bg-blue-800   w-2/6     mr-4   text-white  text-center  justify-items-center " >

                                                        <div className=" h-2/4  pt-4 text-white ">คะแนนรวมทั้งหมด</div>
                                                        <div className="h-2/4 text-3xl items-center text-white">100</div>


                                                    </div>

                                                    <div className=" flex flex-row  h-full   rounded-lg border-2 border-blue-800   w-4/6  p-4  pt-4    text-blue-800 " >
                                                        <div className="   border-2 border-blue-800   w-3/12  h-auto" >
                                                            <div className="   w-full  h-full  p-1  m-auto ">
                                                                <Image
                                                                    // src="/img-student/student-1.png"
                                                                    src="/img-student/student-2.jpg"
                                                                    alt=""
                                                                    height={540} width={400}
                                                                    layout="responsive" className=" h-auto " />

                                                            </div>

                                                        </div>
                                                        <div className="  border-t-2 border-r-2 border-b-2 border-blue-800 w-9/12 " >
                                                            <div className="flex flex-col  p-4">
                                                                <div>  ชื่อ นายดอกไม้ สีเขียว</div>
                                                                <div>  รหัส 6011110001</div>
                                                                <div>   ชั้น ม. 6/2</div>
                                                            </div>


                                                        </div>






                                                    </div>

                                                </div>
                                                <p className="my-4  text-lg leading-relaxed text-left  text-color-blue">

                                                </p>

                                                <div className=" w-full h-full border-2 border-blue-800 p-4 text-blue-800 rounded-lg">
                                                    <div className="mb-2">บันทึกคะแนนความประพฤติ</div>
                                                    <div className="flex flex-row mb-2  w-full border-2 border-blue-800 p-4 items-center rounded-lg">
                                                        <div className="mr-4  w-1/6" >
                                                            <input type="radio" id="1" name="switch-one" value="1" className="    w-5 h-5  ml-2" /><span className=" ml-2 -mt-4">เพิ่ม</span>
                                                        </div>
                                                        <div className="w-1/6">
                                                            <input type="radio" id="1" name="switch-one" value="1" className="    w-5 h-5 ml-2 " /> <span className="ml-2 -mt-4 ">ลบ</span>
                                                        </div>
                                                        <div className="mx-4 w-2/6  text-right ">
                                                            เลือกเหตุผล
                                                        </div>

                                                        <div className="w-2/6">
                                                            <select className="rounded  p-1  border-2 border-blue-800 text-color-blue outline-none w-full" >

                                                                <option value="1">การแต่งกาย 5 คะแนน </option>
                                                                <option value="2">การพูดจา 4 คะแนน </option>

                                                            </select>
                                                        </div>




                                                    </div>
                                                    <div className="mb-2" >ความคิดเห็นเพิ่มเติม</div>
                                                    <div className=" ">
                                                        <textarea name="" id="" cols="30" rows="10" className=" h-28 p-4  rounded-lg w-full resize-none border-2 border-blue-800  focus:border-blue-800 focus:border-2 outline-none text-blue-800">

                                                        </textarea>
                                                    </div>

                                                </div>



                                            </div>
                                            {/*footer*/}
                                            <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                                                <button
                                                    className=" shadow hover:shadow-lg text-white bg-red-600 hover:text-red-600   border-2   border-white hover:border-red-600  hover:bg-white rounded-lg background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                    type="button"
                                                    onClick={() => setShowModal(false)}
                                                >
                                                    ยกเลิก
                                                </button>
                                                <button
                                                    className=" shadow hover:shadow-lg text-white bg-green-600 hover:text-green-600   border-2   border-white hover:border-green-600  hover:bg-white rounded-lg background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                    type="button"
                                                    onClick={() => setShowModal(false)}
                                                >
                                                    บันทึก
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                            </>
                        ) : ""}

                        {/* end-main */}
                    </div >
                    <Footer></Footer>
                </main >


            </div >
        </div >
    )
}

export default Conductscore
