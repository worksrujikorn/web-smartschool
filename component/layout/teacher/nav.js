import React, { useEffect, useState } from "react";
import { getDetailteacher } from "../../../action/teacher";
function Nav() {
  const [LoginName, setLoginName] = useState();
  const [Picture, setPicture] = useState();
  useEffect(async () => {
    let data = await getDetailteacher(localStorage.getItem("LoginId"));
    console.log(data, localStorage.getItem("LoginId"));
    setLoginName(data[0]?.firstname + " " + data[0]?.lastname);
    setPicture(data[0]?.picture);
  }, []);

  return (
    <header className="px-4 py-4 bg-white shadow header ">
      <div className="flex flex-row items-center header-content">
        <form action="#">
          <div className="relative hidden md:flex">
            {/* <div
                        className="absolute top-0 left-0 inline-flex items-center justify-center w-10 h-full text-gray-400"
                    >
                        <svg
                            className="w-6 h-6"
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
                        className="w-full h-10 pl-10 pr-4 text-sm placeholder-gray-500 border border-gray-300 rounded-lg sm:text-base focus:outline-none focus:border-indigo-400"
                        placeholder="Search..."
                    /> */}
          </div>
          <div className="flex md:flex">
            {/* <a href="#" className="flex items-center justify-center w-10 h-10 border-transparent">
                        <svg
                            className="w-6 h-6 text-gray-500"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </a> */}
          </div>
        </form>
        <div className="flex ml-auto">
          <a className="flex flex-row items-center">
            {Picture ? (
              <img
                src={Picture}
                className="w-10 h-10 bg-gray-200 border rounded-full"
                layout="responsive"
              ></img>
            ) : (
              <img
                src="/icon/blank-profile.png"
                className="w-10 h-10 bg-gray-200 border rounded-full"
                layout="responsive"
              ></img>
            )}
            <span className="flex flex-col ml-2">
              <span className="w-auto font-semibold leading-none tracking-wide truncate">
                {LoginName}
              </span>
              <span className="w-20 mt-1 text-xs leading-none text-gray-500 truncate">
                ครู
              </span>
            </span>
          </a>
        </div>
      </div>
    </header>
  );
}

export default Nav;
