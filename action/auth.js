import axios from "axios";
import { API } from "../config";
import jscookie from "js-cookie";
// import cookie from 'js-cookie';
// import { getCookie, setCookie } from '../action/testapi'

export const Login = (user) => {
  // const user = {
  //     username: "student",
  //     password: "123456"

  // };
  return axios({
    method: "POST",
    url: `${API}/auth/signin`,
    headers: {
      // 'Authorization': 'bearer ' + token,
      "Content-Type": "application/json",
    },
    data: user,
  })
    .then((result) => {
      console.log("hasil axios", result.data);
      return result.data;
    })
    .catch((err) => {
      console.log(err);
      alert("Username หรือ Password ผิดค่ะ");
      return { error: err };
    });
};

export const Link = (user) => {
  return axios({
    method: "POST",
    url: `${API}/sso/link`,
    headers: {
      "Content-Type": "application/json",
    },
    data: user,
  })
    .then((result) => {
      console.log("hasil axios", result.data);
      return result.data;
    })
    .catch((err) => {
      console.log(err);
      alert("Username หรือ Password ผิดค่ะ");
      return { error: err };
    });
};

export const setCookie = (key, value) => {
  if (process.browser) {
    jscookie.set(key, value, {
      expires: 1,
    });
  }
};

export const removeCookie = (key) => {
  if (process.browser) {
    jscookie.remove(key, {
      expires: 1,
    });
  }
};

export const getCookie = (key) => {
  if (process.browser) {
    return jscookie.get(key);
  }
};

export const setLocalStorage = (key, value) => {
  if (process.browser) {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

export const removeLocalStorage = (key) => {
  if (process.browser) {
    localStorage.removeItem(key);
  }
};

export const getServerCookies = (req) => {
  console.log("process.browser", process.browser);
  console.log("process.browser", req);
  const cookies = process.browser
    ? jscookie.get()
    : cookie.parse(req.headers.cookie || "");
  return cookies;
};
export const getTestapi = () => {
  // const token = getCookie('token');
  // const user = {

  //     username: "student",
  //     password: "123456"

  // };
  // console.log("token", token)
  // const token = getCookie('token');
  // const port = ":3002";
  return axios({
    method: "POST",
    url: `${API}/smartschool/login`,
    headers: {
      // 'Authorization': 'bearer ' + token,
      "Content-Type": "application/json",
    },
    // data: user
  })
    .then((result) => {
      console.log("hasil axios", result.data);

      return result.data;
    })
    .catch((err) => {
      console.log(err);
      return { error: err };
    });
};

export const Authenticate = (data, next) => {
  console.log("Authenticate_data", data);

  setCookie("role", data.role);

  // setCookie('token', data.users.token)
  setLocalStorage("username", data.role);
  const cookieChecked = getCookie("username");
  console.log("cookieChecked", cookieChecked);
  next();
  return data;
};

export const isAuth = () => {
  if (process.browser) {
    const cookieChecked = getCookie("token");
    // console.log(cookieChecked);
    if (cookieChecked) {
      if (localStorage.getItem("user")) {
        return JSON.parse(localStorage.getItem("user"));
      } else {
        return false;
      }
    }
  }
};

// export const setCookie = (key, value) => {
//     if (process.browser) {
//         jscookie.set(key, value, {
//             expires: 1
//         })
//     }
// }
// export const removeCookie = (key) => {
//     if (process.browser) {
//         jscookie.remove(key, {
//             expires: 1
//         })
//     }
// }

// export const getCookie = (key) => {
//     if (process.browser) {
//         return jscookie.get(key)
//     }
// }

// export const getServerCookies = (req) => {
//     console.log("process.browser", process.browser);
//     console.log("process.browser", req);
//     const cookies = process.browser ? jscookie.get() : cookie.parse(req.headers.cookie || '');
//     return cookies;
// }

// export const setLocalStorage = (key, value) => {
//     if (process.browser) {
//         localStorage.setItem(key, JSON.stringify(value));
//     }
// }

// export const removeLocalStorage = (key) => {
//     if (process.browser) {
//         localStorage.removeItem(key);

//     }
// }

// export const Authenticate = (data, next) => {
//     console.log(data);

//     setCookie('username', data.users.username)
//     setCookie('token', data.users.token)
//     setLocalStorage('user', data.users)
//     next()
// }
