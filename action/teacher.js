import axios from "axios";
import { API } from "../config";

import jscookie from "js-cookie";
// import cookie from 'js-cookie';
import { getCookie, setCookie } from "../action/auth";

export const getnews = () => {
  return axios({
    method: "GET",
    url: `${API}/news/`,
    headers: {
      // 'Authorization': token,
      "Content-Type": "application/json",
    },
  })
    .then((result) => {
      // console.log('hasil axios', result.data)

      return result.data;
    })
    .catch((err) => {
      console.log(err);
      return { error: err };
    });
};
export const getnewsbyone = (data) => {
  return axios({
    method: "GET",
    url: `${API}/news/${data}`,
    headers: {
      // 'Authorization': token,
      "Content-Type": "application/json",
    },
  })
    .then((result) => {
      // console.log('hasil axios', result.data)

      return result.data;
    })
    .catch((err) => {
      console.log(err);
      return { error: err };
    });
};

export const getleave_count = (data) => {
  return axios({
    method: "GET",
    url: `${API}/teacher/leave_get_count/${data}`,
    headers: {
      // 'Authorization': token,
      "Content-Type": "application/json",
    },
  })
    .then((result) => {
      // console.log('hasil axios', result.data)

      return result.data;
    })
    .catch((err) => {
      console.log(err);
      return { error: err };
    });
};
export const getleave = (data) => {
  return axios({
    method: "GET",
    url: `${API}/teacher/leave_get/${data}`,
    headers: {
      // 'Authorization': token,
      "Content-Type": "application/json",
    },
  })
    .then((result) => {
      // console.log('hasil axios', result.data)

      return result.data;
    })
    .catch((err) => {
      console.log(err);
      return { error: err };
    });
};
export const getleave_category = (data) => {
  return axios({
    method: "GET",
    url: `${API}/teacher/leave_category/get`,
    headers: {
      // 'Authorization': token,
      "Content-Type": "application/json",
    },
  })
    .then((result) => {
      // console.log('hasil axios', result.data)

      return result.data;
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
      // 'Authorization': token,
      "Content-Type": "application/json",
    },
    data: data,
  })
    .then((result) => {
      // console.log('hasil axios', result.data)

      return result.data;
    })
    .catch((err) => {
      console.log(err);
      return { error: err };
    });
};
export const Gethomevisit = (data) => {
  return axios({
    method: "POST",
    url: `${API}/homevisit/report`,
    headers: {
      // 'Authorization': token,
      "Content-Type": "application/json",
    },
    data: data,
  })
    .then((result) => {
      // console.log('hasil axios', result.data)

      return result.data;
    })
    .catch((err) => {
      console.log(err);
      return { error: err };
    });
};

export const puthomevisitupdate = (data) => {
  return axios({
    method: "PUT",
    url: `${API}/homevisit/${data.home_visit_id}`,
    headers: {
      // 'Authorization': token,
      "Content-Type": "application/json",
    },
    data: data,
  })
    .then((result) => {
      // console.log('hasil axios', result.data)

      return result.data;
    })
    .catch((err) => {
      console.log(err);
      return { error: err };
    });
};

export const postreportHomeVisitbyOne = (data) => {
  return axios({
    method: "POST",
    url: `${API}/homevisit/findOne`,
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

export const postAddhomevisit = (data) => {
  return axios({
    method: "POST",
    url: `${API}/homevisit`,
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

export const getteacher = () => {
  return axios({
    method: "GET",
    url: `${API}/teacher`,
    headers: {
      // 'Authorization': token,
      "Content-Type": "application/json",
    },
  })
    .then((result) => {
      // console.log('hasil axios', result.data)

      return result.data;
    })
    .catch((err) => {
      console.log(err);
      return { error: err };
    });
};
export const getreporthomevisit = () => {
  return axios({
    method: "GET",
    url: `${API}/homevisit`,
    headers: {
      // 'Authorization': token,
      "Content-Type": "application/json",
    },
  })
    .then((result) => {
      // console.log('hasil axios', result.data)

      return result.data;
    })
    .catch((err) => {
      console.log(err);
      return { error: err };
    });
};
export const getchecklist_teacher = () => {
  return axios({
    method: "GET",
    url: `${API}/checkin_line/checkinlist_teacher`,
    headers: {
      // 'Authorization': token,
      "Content-Type": "application/json",
    },
  })
    .then((result) => {
      // console.log('hasil axios', result.data)

      return result.data;
    })
    .catch((err) => {
      console.log(err);
      return { error: err };
    });
};
export const getDetailteacher = (data) => {
  return axios({
    method: "GET",
    url: `${API}/teacher/${data}`,
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
export const getcheckin_line_View = (data) => {
  return axios({
    method: "POST",
    url: `${API}/checkin_line/getall/`,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
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

export const classroom_student = (data) => {
  return axios({
    method: "POST",
    url: `${API}/student/classroom_student`,
    headers: {
      // 'Authorization': token,
      "Content-Type": "application/json",
    },
    data: data,
  })
    .then((result) => {
      // console.log('hasil axios', result.data)

      return result.data;
    })
    .catch((err) => {
      console.log(err);
      return { error: err };
    });
};
export const postteacheradd = (data) => {
  return axios({
    method: "POST",
    url: `${API}/teacher/add`,
    headers: {
      // 'Authorization': token,
      "Content-Type": "application/json",
    },
    data: data,
  })
    .then((result) => {
      // console.log('hasil axios', result.data)

      return result.data;
    })
    .catch((err) => {
      console.log(err);
      return { error: err };
    });
};
export const postteachertime = (data) => {
  return axios({
    method: "POST",
    url: `${API}/teacher/dashboard/teachertime`,
    headers: {
      // 'Authorization': token,
      "Content-Type": "application/json",
    },
    data: data,
  })
    .then((result) => {
      // console.log('hasil axios', result.data)

      return result.data;
    })
    .catch((err) => {
      console.log(err);
      return { error: err };
    });
};
export const putcheckin_line = (data) => {
  return axios({
    method: "PUT",
    url: `${API}/checkin_line/update`,
    headers: {
      // 'Authorization': token,
      "Content-Type": "application/json",
    },
    data: data,
  })
    .then((result) => {
      // console.log('hasil axios', result.data)

      return result.data;
    })
    .catch((err) => {
      console.log(err);
      return { error: err };
    });
};
export const checkin_list_update_out = (data) => {
  return axios({
    method: "PUT",
    url: `${API}/teacher/checkin_list_update_out`,
    headers: {
      // 'Authorization': token,
      "Content-Type": "application/json",
    },
    data: data,
  })
    .then((result) => {
      // console.log('hasil axios', result.data)

      return result.data;
    })
    .catch((err) => {
      console.log(err);
      return { error: err };
    });
};
export const upload = (data) => {
  return axios({
    method: "POST",
    url: `${API}/upload`,
    headers: {
      // 'Authorization': token,
      "Content-Type": "application/json",
    },
    data: data,
  })
    .then((result) => {
      // console.log('hasil axios', result.data)

      return result.data;
    })
    .catch((err) => {
      console.log(err);
      return { error: err };
    });
};

export const checkin_list_update_in = (data) => {
  return axios({
    method: "PUT",
    url: `${API}/teacher/checkin_list_update_in`,
    headers: {
      // 'Authorization': token,
      "Content-Type": "application/json",
    },
    data: data,
  })
    .then((result) => {
      // console.log('hasil axios', result.data)

      return result.data;
    })
    .catch((err) => {
      console.log(err);
      return { error: err };
    });
};
export const checkinlist = (data) => {
  return axios({
    method: "GET",
    url: `${API}/checkin_line/checkinlist/${data}`,
    headers: {
      // 'Authorization': token,
      "Content-Type": "application/json",
    },
    data: data,
  })
    .then((result) => {
      // console.log('hasil axios', result.data)

      return result.data;
    })
    .catch((err) => {
      console.log(err);
      return { error: err };
    });
};
export const checkin_list_teacher_update_in = (data) => {
  return axios({
    method: "PUT",
    url: `${API}/teacher/checkin_list_teacher_update_in`,
    headers: {
      // 'Authorization': token,
      "Content-Type": "application/json",
    },
    data: data,
  })
    .then((result) => {
      // console.log('hasil axios', result.data)

      return result.data;
    })
    .catch((err) => {
      console.log(err);
      return { error: err };
    });
};
export const checkin_list_teacher_update_out = (data) => {
  return axios({
    method: "PUT",
    url: `${API}/teacher/checkin_list_teacher_update_out`,
    headers: {
      // 'Authorization': token,
      "Content-Type": "application/json",
    },
    data: data,
  })
    .then((result) => {
      // console.log('hasil axios', result.data)

      return result.data;
    })
    .catch((err) => {
      console.log(err);
      return { error: err };
    });
};
export const postschedulejobs = (data) => {
  return axios({
    method: "POST",
    url: `${API}/teacher/dashboard/schedulejobs`,
    headers: {
      // 'Authorization': token,
      "Content-Type": "application/json",
    },
    data: data,
  })
    .then((result) => {
      // console.log('hasil axios', result.data)

      return result.data;
    })
    .catch((err) => {
      console.log(err);
      return { error: err };
    });
};

export const studentgraph = (data) => {
  return axios({
    method: "GET",
    url: `${API}/teacher/dashboard/studentgraph/${data}`,
    headers: {
      // 'Authorization': token,
      "Content-Type": "application/json",
    },
    // data: data
  })
    .then((result) => {
      // console.log('hasil axios', result.data)

      return result.data;
    })
    .catch((err) => {
      console.log(err);
      return { error: err };
    });
};
export const postschedule_teacher_list = (data) => {
  return axios({
    method: "POST",
    url: `${API}/teacher/schedule_teacher_list`,
    headers: {
      // 'Authorization': token,
      "Content-Type": "application/json",
    },
    data: data,
  })
    .then((result) => {
      // console.log('hasil axios', result.data)

      return result.data;
    })
    .catch((err) => {
      console.log(err);
      return { error: err };
    });
};
export const putteacherupdate = (data) => {
  return axios({
    method: "PUT",
    url: `${API}/teacher/update/${data.teacher_code}`,
    headers: {
      // 'Authorization': token,
      "Content-Type": "application/json",
    },
    data: data,
  })
    .then((result) => {
      // console.log('hasil axios', result.data)

      return result.data;
    })
    .catch((err) => {
      console.log(err);
      return { error: err };
    });
};

export const deleteteacher = (id) => {
  return axios({
    method: "DELETE",
    url: `${API}/teacher/delete/${id}`,
    headers: {
      // 'Authorization': token,
      "Content-Type": "application/json",
    },
    // data: id
  })
    .then((result) => {
      // console.log('hasil axios', result.data)

      return result.data;
    })
    .catch((err) => {
      console.log(err);
      return { error: err };
    });
};

export const post_schedule_teacher_list = (data) => {
  return axios({
    method: "POST",
    url: `${API}/teacher/schedule_teacher_list`,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
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

export const post_schedule_teacher_view = (data) => {
  console.log(`${API}api/teacher/schedule_teacher_view`);
  return axios({
    method: "POST",
    url: `${API}/teacher/schedule_teacher_view`,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
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

export const postCheckin_classroom = (data) => {
  return axios({
    method: "POST",
    url: `${API}/checkin_classroom/create`,
    headers: {
      // 'Authorization': token,
      "Content-Type": "application/json",
    },
    data: data,
  })
    .then((result) => {
      // console.log('hasil axios', result.data)

      return result.data;
    })
    .catch((err) => {
      console.log(err);
      return { error: err };
    });
};

export const postScheduleTeacher = (data) => {
  return axios({
    method: "POST",
    url: `${API}/teacher/schedule_teacher`,
    headers: {
      // 'Authorization': token,
      "Content-Type": "application/json",
    },
    data: data,
  })
    .then((result) => {
      // console.log('hasil axios', result.data)

      return result.data;
    })
    .catch((err) => {
      console.log(err);
      return { error: err };
    });
};

export const postManageStudentsComment = (data) => {
  return axios({
    method: "POST",
    url: `${API}/teacher/Manage_students_comment`,
    headers: {
      // 'Authorization': token,
      "Content-Type": "application/json",
    },
    data: data,
  })
    .then((result) => {
      // console.log('hasil axios', result.data)

      return result.data;
    })
    .catch((err) => {
      console.log(err);
      return { error: err };
    });
};
export const getallbehaviour = (data) => {
  return axios({
    method: "GET",
    url: `${API}/behaviour/allbehaviour`,
    headers: {
      // 'Authorization': token,
      "Content-Type": "application/json",
    },
    data: data,
  })
    .then((result) => {
      // console.log('hasil axios', result.data)

      return result.data;
    })
    .catch((err) => {
      console.log(err);
      return { error: err };
    });
};

export const postfacescan = (data) => {
  return axios({
    method: "POST",
    url: `${API}/facescan/student`,
    headers: {
      // 'Authorization': token,
      "Content-Type": "application/json",
    },
    data: data,
  })
    .then((result) => {
      // console.log('hasil axios', result.data)

      return result.data;
    })
    .catch((err) => {
      console.log(err);
      return { error: err };
    });
};

export const facescan_by_admin = (data) => {
  return axios({
    method: "POST",
    url: `${API}/facescan/facescan_by_admin`,
    headers: {
      // 'Authorization': token,
      "Content-Type": "application/json",
    },
    data: data,
  })
    .then((result) => {
      // console.log('hasil axios', result.data)

      return result.data;
    })
    .catch((err) => {
      console.log(err);
      return { error: err };
    });
};

export const postfacescan_teacher = (data) => {
  return axios({
    method: "POST",
    url: `${API}/facescan/teacher`,
    headers: {
      // 'Authorization': token,
      "Content-Type": "application/json",
    },
    data: data,
  })
    .then((result) => {
      // console.log('hasil axios', result.data)

      return result.data;
    })
    .catch((err) => {
      console.log(err);
      return { error: err };
    });
};

export const postfacescan_teacher_by_admin = (data) => {
  return axios({
    method: "POST",
    url: `${API}/facescan/facescanteacher_by_admin`,
    headers: {
      // 'Authorization': token,
      "Content-Type": "application/json",
    },
    data: data,
  })
    .then((result) => {
      // console.log('hasil axios', result.data)

      return result.data;
    })
    .catch((err) => {
      console.log(err);
      return { error: err };
    });
};

export const postsendbehaviour = (data) => {
  return axios({
    method: "POST",
    url: `${API}/behaviour/sendbehaviour`,
    headers: {
      // 'Authorization': token,
      "Content-Type": "application/json",
    },
    data: data,
  })
    .then((result) => {
      // console.log('hasil axios', result.data)

      return result.data;
    })
    .catch((err) => {
      console.log(err);
      return { error: err };
    });
};

export const postscheduleteacherstatus = (data) => {
  return axios({
    method: "POST",
    url: `${API}/teacher/schedule_teacher_status`,
    headers: {
      // 'Authorization': token,
      "Content-Type": "application/json",
    },
    data: data,
  })
    .then((result) => {
      // console.log('hasil axios', result.data)

      return result.data;
    })
    .catch((err) => {
      console.log(err);
      return { error: err };
    });
};

export const get_year = () => {
  return axios({
    method: "GET",
    url: `${API}/school_year/get_year`,
    headers: {
      // 'Authorization': token,
      "Content-Type": "application/json",
    },
  })
    .then((result) => {
      // console.log('hasil axios', result.data)

      return result.data;
    })
    .catch((err) => {
      console.log(err);
      return { error: err };
    });
};

export const get_classroom_level = () => {
  return axios({
    method: "GET",
    url: `${API}/checkin_classroom/get_classroom_level`,
    headers: {
      // 'Authorization': token,
      "Content-Type": "application/json",
    },
  })
    .then((result) => {
      // console.log('hasil axios', result.data)

      return result.data;
    })
    .catch((err) => {
      console.log(err);
      return { error: err };
    });
};

export const get_term = () => {
  return axios({
    method: "GET",
    url: `${API}/school_year/get_term`,
    headers: {
      // 'Authorization': token,
      "Content-Type": "application/json",
    },
  })
    .then((result) => {
      // console.log('hasil axios', result.data)

      return result.data;
    })
    .catch((err) => {
      console.log(err);
      return { error: err };
    });
};
