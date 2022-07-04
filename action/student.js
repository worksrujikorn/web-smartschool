import axios from "axios";
import { API } from "../config";
import jscookie from "js-cookie";
// import cookie from 'js-cookie';
import { getCookie, setCookie } from "../action/auth";
import { data } from "autoprefixer";

export const getStudent = () => {
  return axios({
    method: "GET",
    url: `${API}/student/`,
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      console.log("hasil axios", res.data);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      return { error: err };
    });
};
export const findbyidcard = (data) => {
  return axios({
    method: "GET",
    url: `${API}/parent/findbyidcard/${data}`,
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      console.log("hasil axios", res.data);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      return { error: err };
    });
};

export const getStudent_One = (student_code) => {
  return axios({
    method: "GET",
    url: `${API}/student/${student_code}`,
    headers: {
      "Content-Type": "application/json",
    },
    data: student_code,
  })
    .then((res) => {
      console.log("getStudent_One axios", res.data);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      return { error: err };
    });
};
export const getDetailstudent = (data) => {
  return axios({
    method: "GET",
    url: `${API}/student/${data}`,
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      console.log("hasil axios", res.data);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      return { error: err };
    });
};

export const postStudentAdd = (data) => {
  return axios({
    method: "POST",
    url: `${API}/student/add`,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  })
    .then((res) => {
      console.log("Add axios", res.data);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      return { error: err };
    });
};

export const putStudentUpdate = (data) => {
  return axios({
    method: "PUT",
    url: `${API}/student/update/${data.student_code}`,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  })
    .then((res) => {
      console.log("Update axios", res.data);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      return { error: err };
    });
};

export const deleteStudent = (id) => {
  return axios({
    method: "DELETE",
    url: `${API}/student/delete/${id}`,
    headers: {},
    data: id,
  })
    .then((res) => {
      console.log("Delete axios", res.data);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      return { error: err };
    });
};

export const postSchedule = (student_code) => {
  return axios({
    method: "POST",
    url: `${API}/student/schedule`,
    headers: {
      "Content-Type": "application/json",
    },
    data: student_code,
  })
    .then((res) => {
      console.log("Schedule axios", res.data);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      return { error: err };
    });
};
export const postSchedule_Period = (data) => {
  return axios({
    method: "POST",
    url: `${API}/student/schedule_student_period`,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  })
    .then((res) => {
      console.log("ตารางสอนรายวัน", res.data);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      return { error: err };
    });
};

// api news
export const getNews = () => {
  return axios({
    method: "GET",
    url: `${API}/news/`,
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      console.log("News axios", res.data);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      return { error: err };
    });
};

export const getstudent_score = (student_code) => {
  return axios({
    method: "GET",
    url: `${API}/student/studentscore/${student_code}`,
    headers: {
      "Content-Type": "application/json",
    },
    data: student_code,
  })
    .then((res) => {
      console.log("News axios", res.data);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      return { error: err };
    });
};

export const getstudent_time = (student_code) => {
  return axios({
    method: "GET",
    url: `${API}/student/studenttime/${student_code}`,
    headers: {
      "Content-Type": "application/json",
    },
    data: student_code,
  })
    .then((res) => {
      console.log("getstudent_time axios", res.data);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      return { error: err };
    });
};

export const getall_subjects = (data) => {
  return axios({
    method: "POST",
    url: `${API}/student/allsubjects`,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  })
    .then((res) => {
      console.log("getall_subjects axios", res.data);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      return { error: err };
    });
};
// api leave
export const getleave_count = (student_code) => {
  return axios({
    method: "GET",
    url: `${API}/teacher/leave_get_count/${student_code}`,
    headers: {
      "Content-Type": "application/json",
    },
    data: student_code,
  })
    .then((res) => {
      console.log("Leave_count axios", res.data);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      return { error: err };
    });
};
export const getleave = (student_code) => {
  return axios({
    method: "GET",
    url: `${API}/teacher/leave_get/${student_code}`,
    headers: {
      "Content-Type": "application/json",
    },
    data: student_code,
  })
    .then((res) => {
      console.log("Leave axios", res.data);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      return { error: err };
    });
};

export const getleave_category = () => {
  return axios({
    method: "GET",
    url: `${API}/teacher/leave_category/get`,
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      console.log("leave_category axios", res.data);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      return { error: err };
    });
};

export const postleave = (data) => {
  return axios({
    method: "POST",
    url: `${API}/teacher/leave_post`,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      return { error: err };
    });
};

//export const tests = user => {
//     const Role = getCookie('role');
//     console.log('Cookie_Role', Role);
//     return Role
//     // return axios({
//     //     method: 'POST',
//     //     url: `${API}/smartschool/login`,
//     //     headers: {
//     //         // 'Authorization': 'bearer ' + token,
//     //         'Content-Type': 'application/json'
//     //     },
//     //     data: user
//     // }).then((result) => {
//     //     console.log('hasil axios', result.data)

//     //     return result.data

//     // }).catch(err => {
//     //     console.log(err);
//     //     return { error: err }
//     // });
// }
