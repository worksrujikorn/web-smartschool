import ReactExport from "react-data-export";
import React, { useEffect, useState } from "react";
function test() {
    const ExcelFile = ReactExport.ExcelFile;
    const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
    const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;
    const borders = {
        top: { style: "medium" },
        bottom: { style: "medium" },
        left: { style: "medium" },
        right: { style: "medium" }
    }
    const borderleftright = {
        // top: { style: "medium" },
        // bottom: { style: "medium" },
        left: { style: "medium" },
        right: { style: "medium" }
    }
    const dataex1 = []
    useEffect(() => {
        for (let index = 0; index < 30; index++) {
            dataex1.push(
                [
                    { value: index, style: { fill: { fgColor: { rgb: "CCFFFF" }, border: borderleftright } } },
                    { value: index, style: { border: borderleftright } },
                    { value: index, style: { border: borderleftright } },
                    { value: index, style: { fill: { fgColor: { rgb: "5DE9BA" }, border: borderleftright } } },
                    { value: index, style: { border: { left: { style: "medium" } } } },
                    { value: index },
                    { value: index },
                    { value: index },
                    { value: index },
                    { value: index, style: { border: { left: { style: "medium" } } } },
                    { value: index },
                    { value: index },
                    { value: index },
                    { value: index },
                    { value: index, style: { border: { left: { style: "medium" } } } },
                    { value: index },
                    { value: index },
                    { value: index },
                    { value: index },
                    { value: index, style: { border: { left: { style: "medium" } } } },
                    { value: index },
                    { value: index },
                    { value: index },
                    { value: index },
                    { value: index, style: { border: { left: { style: "medium" } } } },
                    { value: index },
                    { value: index },
                    { value: index },
                    { value: index },
                    { value: index, style: { fill: { fgColor: { rgb: "CCFFFF" } }, border: borderleftright } },
                    { value: index, style: { fill: { fgColor: { rgb: "CCFFFF" } }, border: borderleftright } },
                    { value: index, style: { fill: { fgColor: { rgb: "CCFFFF" } }, border: borderleftright } },
                    { value: index, style: { fill: { fgColor: { rgb: "CCFFFF" } }, border: borderleftright } },
                    { value: index, style: { fill: { fgColor: { rgb: "CCFFFF" } }, border: borderleftright } },
                ]
            )
        }
    }, [])

    const exl1 = [
        {
            columns: [
                { title: "การแปรผลคะแนน SDQ ระบบดูแล ช่วยเหลือนักเรียน", width: { wch: 1000 }},
                { title: "", },
                { title: "", },
                { title: "", },
                { title: "(ฉบับ  นักเรียนประเมินตนเอง)", },
            ],
            data: []
        },
        {
            columns: [
                { title: "ชั้น ม.6/14 นายเอกวัชร  ทองศรี, นางจันจิรา  เตารัตน์", width: { wch: 40 } },
                { title: "", },
                { title: "", },
                { title: "", },
                { title: "ระดับคะแนน (ไม่จริง-0 / ค่อนข้างจริง-1 / จริง-2)", },
            ],
            data: []
        },
        {
            columns: [
                { title: "ที่", style: { fill: { fgColor: { rgb: "CCFFFF" } }, border: borders, font: { bold: true } }, width: { wch: 5 } },
                { title: "เลขประจำตัว", style: { fill: { fgColor: { rgb: "CCFFFF" } }, border: borders, font: { bold: true } }, width: { wch: 12 } },
                { title: "ชื่อ-สกุล", style: { fill: { fgColor: { rgb: "CCFFFF" } }, border: borders, font: { bold: true } }, width: { wch: 25 } },
                { title: "เพศ", style: { fill: { fgColor: { rgb: "CCFFFF" } }, border: borders, font: { bold: true } }, width: { wch: 10 } },
                { title: "1", style: { fill: { fgColor: { rgb: "CCFFFF" } }, border: borders, font: { bold: true } }, width: { wch: 2 } },
                { title: "2", style: { fill: { fgColor: { rgb: "CCFFFF" } }, border: borders, font: { bold: true } }, width: { wch: 2 } },
                { title: "2", style: { fill: { fgColor: { rgb: "CCFFFF" } }, border: borders, font: { bold: true } }, width: { wch: 2 } },
                { title: "4", style: { fill: { fgColor: { rgb: "CCFFFF" } }, border: borders, font: { bold: true } }, width: { wch: 2 } },
                { title: "5", style: { fill: { fgColor: { rgb: "CCFFFF" } }, border: borders, font: { bold: true } }, width: { wch: 2 } },
                { title: "6", style: { fill: { fgColor: { rgb: "CCFFFF" } }, border: borders, font: { bold: true } }, width: { wch: 2 } },
                { title: "7", style: { fill: { fgColor: { rgb: "CCFFFF" } }, border: borders, font: { bold: true } }, width: { wch: 2 } },
                { title: "8", style: { fill: { fgColor: { rgb: "CCFFFF" } }, border: borders, font: { bold: true } }, width: { wch: 2 } },
                { title: "9", style: { fill: { fgColor: { rgb: "CCFFFF" } }, border: borders, font: { bold: true } }, width: { wch: 2 } },
                { title: "10", style: { fill: { fgColor: { rgb: "CCFFFF" } }, border: borders, font: { bold: true } }, width: { wch: 2 } },
                { title: "11", style: { fill: { fgColor: { rgb: "CCFFFF" } }, border: borders, font: { bold: true } }, width: { wch: 2 } },
                { title: "12", style: { fill: { fgColor: { rgb: "CCFFFF" } }, border: borders, font: { bold: true } }, width: { wch: 2 } },
                { title: "13", style: { fill: { fgColor: { rgb: "CCFFFF" } }, border: borders, font: { bold: true } }, width: { wch: 2 } },
                { title: "14", style: { fill: { fgColor: { rgb: "CCFFFF" } }, border: borders, font: { bold: true } }, width: { wch: 2 } },
                { title: "15", style: { fill: { fgColor: { rgb: "CCFFFF" } }, border: borders, font: { bold: true } }, width: { wch: 2 } },
                { title: "16", style: { fill: { fgColor: { rgb: "CCFFFF" } }, border: borders, font: { bold: true } }, width: { wch: 2 } },
                { title: "17", style: { fill: { fgColor: { rgb: "CCFFFF" } }, border: borders, font: { bold: true } }, width: { wch: 2 } },
                { title: "18", style: { fill: { fgColor: { rgb: "CCFFFF" } }, border: borders, font: { bold: true } }, width: { wch: 2 } },
                { title: "19", style: { fill: { fgColor: { rgb: "CCFFFF" } }, border: borders, font: { bold: true } }, width: { wch: 2 } },
                { title: "20", style: { fill: { fgColor: { rgb: "CCFFFF" } }, border: borders, font: { bold: true } }, width: { wch: 2 } },
                { title: "21", style: { fill: { fgColor: { rgb: "CCFFFF" } }, border: borders, font: { bold: true } }, width: { wch: 2 } },
                { title: "22", style: { fill: { fgColor: { rgb: "CCFFFF" } }, border: borders, font: { bold: true } }, width: { wch: 2 } },
                { title: "23", style: { fill: { fgColor: { rgb: "CCFFFF" } }, border: borders, font: { bold: true } }, width: { wch: 2 } },
                { title: "24", style: { fill: { fgColor: { rgb: "CCFFFF" } }, border: borders, font: { bold: true } }, width: { wch: 2 } },
                { title: "25", style: { fill: { fgColor: { rgb: "CCFFFF" } }, border: borders, font: { bold: true } }, width: { wch: 2 } },
                { title: "อารมณ์", style: { alignment: { textRotation: 90 }, border: borders, font: { bold: true }, fill: { fgColor: { rgb: "CCFFFF" } } }, width: { wch: 2 } },
                { title: "ด้านเกเร", style: { alignment: { textRotation: 90 }, border: borders, font: { bold: true }, fill: { fgColor: { rgb: "CCFFFF" } } }, width: { wch: 2 } },
                { title: "ไม่อยู่นิ่ง", style: { alignment: { textRotation: 90 }, border: borders, font: { bold: true }, fill: { fgColor: { rgb: "CCFFFF" } } }, width: { wch: 2 } },
                { title: "สัมพันธ์เพื่อน", style: { alignment: { textRotation: 90 }, border: borders, font: { bold: true }, fill: { fgColor: { rgb: "CCFFFF" } } }, width: { wch: 2 } },
                { title: "ด้านสังคม", style: { alignment: { textRotation: 90 }, border: borders, font: { bold: true }, fill: { fgColor: { rgb: "CCFFFF" } } }, width: { wch: 2 } },
            ],
            data: dataex1
            // data: [
            //     [
            //         { value: 0,style: {fill: {fgColor: {rgb: "CCFFFF"},border: borderleftright}} },
            //         { value: 0,style: {border: borderleftright}},
            //         { value: 0,style: {border: borderleftright}},
            //         { value: 0,style: {fill: {fgColor: {rgb: "5DE9BA"},border: borderleftright}} },
            //         { value: 0,style: {border: {left: { style: "medium" }}} },
            //         { value: 0 },
            //         { value: 0 },
            //         { value: 0 },
            //         { value: 0 },
            //         { value: 0,style: {border: {left: { style: "medium" }}} },
            //         { value: 0 },
            //         { value: 0 },
            //         { value: 0 },
            //         { value: 0 },
            //         { value: 0,style: {border: {left: { style: "medium" }}} },
            //         { value: 0 },
            //         { value: 0 },
            //         { value: 0 },
            //         { value: 0 },
            //         { value: 0,style: {border: {left: { style: "medium" }}} },
            //         { value: 0 },
            //         { value: 0 },
            //         { value: 0 },
            //         { value: 0 },
            //         { value: 0,style: {border: {left: { style: "medium" }}} },
            //         { value: 0 },
            //         { value: 0 },
            //         { value: 0 },
            //         { value: 0 },
            //         { value: 0,style: {fill: {fgColor: {rgb: "CCFFFF"}},border: borderleftright} },
            //         { value: 0,style: {fill: {fgColor: {rgb: "CCFFFF"}},border: borderleftright} },
            //         { value: 0,style: {fill: {fgColor: {rgb: "CCFFFF"}},border: borderleftright} },
            //         { value: 0,style: {fill: {fgColor: {rgb: "CCFFFF"}},border: borderleftright} },
            //         { value: 0,style: {fill: {fgColor: {rgb: "CCFFFF"}},border: borderleftright} },
            //     ],
            // ]
        }
    ];
    return (
        <ExcelFile element={<button className="btn " style={{ backgroundColor: '#8edf50d4' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-filetype-xlsx" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M14 4.5V11h-1V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v9H2V2a2 2 0 0 1 2-2h5.5L14 4.5ZM7.86 14.841a1.13 1.13 0 0 0 .401.823c.13.108.29.192.479.252.19.061.411.091.665.091.338 0 .624-.053.858-.158.237-.105.416-.252.54-.44a1.17 1.17 0 0 0 .187-.656c0-.224-.045-.41-.135-.56a1.002 1.002 0 0 0-.375-.357 2.028 2.028 0 0 0-.565-.21l-.621-.144a.97.97 0 0 1-.405-.176.37.37 0 0 1-.143-.299c0-.156.061-.284.184-.384.125-.101.296-.152.513-.152.143 0 .266.023.37.068a.624.624 0 0 1 .245.181.56.56 0 0 1 .12.258h.75a1.093 1.093 0 0 0-.199-.566 1.21 1.21 0 0 0-.5-.41 1.813 1.813 0 0 0-.78-.152c-.293 0-.552.05-.777.15-.224.099-.4.24-.527.421-.127.182-.19.395-.19.639 0 .201.04.376.123.524.082.149.199.27.351.367.153.095.332.167.54.213l.618.144c.207.049.36.113.462.193a.387.387 0 0 1 .153.326.512.512 0 0 1-.085.29.558.558 0 0 1-.255.193c-.111.047-.25.07-.413.07-.117 0-.224-.013-.32-.04a.837.837 0 0 1-.249-.115.578.578 0 0 1-.255-.384h-.764Zm-3.726-2.909h.893l-1.274 2.007 1.254 1.992h-.908l-.85-1.415h-.035l-.853 1.415H1.5l1.24-2.016-1.228-1.983h.931l.832 1.438h.036l.823-1.438Zm1.923 3.325h1.697v.674H5.266v-3.999h.791v3.325Zm7.636-3.325h.893l-1.274 2.007 1.254 1.992h-.908l-.85-1.415h-.035l-.853 1.415h-.861l1.24-2.016-1.228-1.983h.931l.832 1.438h.036l.823-1.438Z" />
            </svg> {" "}
            Download</button>}>
            <ExcelSheet dataSet={exl1} name="สรุปข้อมูล MileStone Outcome" />
        </ExcelFile>
    )
}

export default test