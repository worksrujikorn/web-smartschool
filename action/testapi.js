import axios from "axios";
import { API } from "../config";

// import cookie from 'js-cookie';
// import { getCookie, setCookie } from '../action/auth'

// export const getTestapi = (data) => {

//     const port = ""

//     return axios({
//         method: 'GET',
//         url: `${API}`

//     }).then((result) => {
//         console.log('hasil axios', result.data)
//         return result.data

//     }).catch(err => {

//         return { error: err }
//     });

// }

export const getTestapi = () => {
  // const token = getCookie('token');
  // const port = ":3002";
  return axios({
    method: "GET",
    url: `${API}`,
    headers: {
      // 'Authorization': 'bearer ' + token,
      // 'Content-Type': 'application/json'
    },
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
// export const testcom = () => {

//     return axios({
//         method: 'GET',
//         url: API + '',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//     }).then((res) => {
//         // console.log('response',res);
//         return res;
//     }).catch((err) => {
//         // console.log(err.response);
//         return err.response
//     })
// }
export const getPatient = (data) => {
  let token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IuC4iuC4peC4nuC4tOC4iuC4jOC4suC4ouC5jCIsInJvbGUiOiIxIiwiSUQiOiIyIiwiVXNlcm5hbWUiOiJzdXBlcnZpc29yIiwiT3JnYW5pemF0aW9uIjoiMSIsIkhlYWRxdWFydGVyIjoiMSIsIlJvbGUiOiI2IiwibmJmIjoxNjQ2MTE4MTY3LCJleHAiOjE2NDYyMDQ1NjcsImlhdCI6MTY0NjExODE2N30.kwkg0UDzOCJTXO4B5vV74nHT82Lku7VHQPQjXZPpLXs";
  return axios({
    method: "POST",
    url: API + "/patient/searchPatientList",
    headers: {
      Authorization: "bearer " + token,
      "Content-Type": "application/json",
    },
    data: data,
  })
    .then((res) => {
      // console.log('response',res);
      return res;
    })
    .catch((err) => {
      // console.log(err.response);
      return err.response;
    });
};
