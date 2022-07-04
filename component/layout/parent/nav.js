import React, { useEffect, useState } from 'react'
import { getDetailparent } from "../../../action/parent";
function Nav() {
    const [LoginName, setLoginName] = useState()
    const [Picture, setPicture] = useState()
    useEffect(async () => {
        let data = await getDetailparent(localStorage.getItem('LoginId'))
 
        console.log(data, localStorage.getItem('LoginId'))
        setLoginName((data[0]?.firstname) + " " + (data[0]?.lastname))
        setPicture(data[0]?.picture)
    }, [])
    return (

        <header className="header bg-white shadow py-4 px-4">
            <div className="header-content flex items-center flex-row">
                <form action="#">
                    <div className="hidden md:flex relative">
                        {/* <div
                        className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400"
                    >
                        <svg
                            className="h-6 w-6"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div> */}

                        {/* <input
                        id="search"
                        type="text"
                        name="search"
                        className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-300 w-full h-10 focus:outline-none focus:border-indigo-400"
                        placeholder="Search..."
                    /> */}
                    </div>
                    <div className="flex md:hidden">
                        <a href="#" className="flex items-center justify-center h-10 w-10 border-transparent">
                            <svg
                                className="h-6 w-6 text-gray-500"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </a>
                    </div>
                </form>
                <div className="flex ml-auto">
                    <a href className="flex flex-row items-center">
                        {(Picture) ?
                            <img
                                src={Picture}
                                className="h-10 w-10 bg-gray-200 border rounded-full"
                                layout="responsive"
                            ></img>
                            : <img
                                src="/icon/blank-profile.png"
                                className="h-10 w-10 bg-gray-200 border rounded-full"
                                layout="responsive"
                            ></img>
                        }
                        <span className="flex flex-col ml-2">
                            <span className="truncate  font-semibold tracking-wide leading-none w-auto   ">{LoginName}</span>
                            <span className="truncate w-20 text-gray-500 text-xs leading-none mt-1">ผู้ปกครอง</span>
                        </span>
                    </a>
                </div>
            </div>
        </header>

    )
}

export default Nav
