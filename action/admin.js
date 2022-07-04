import axios from "axios";
import { API } from "../config";
import jscookie from "js-cookie";
// import cookie from 'js-cookie';
import { getCookie, setCookie } from "./auth";
import { data } from "autoprefixer";

// api news
export const poststaff = (data) => {
  return axios({
    method: "POST",
    url: `${API}/report/staff`,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  })
    .then((res) => {
      console.log("staff axios", res.data);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      return { error: err };
    });
};
export const postdaily_time_personnel = (data) => {
  return axios({
    method: "POST",
    url: `${API}/report/daily_time_personnel/`,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  })
    .then((res) => {
      console.log("daily_time_personnel axios", res.data);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      return { error: err };
    });
};
export const getClassroom = () => {
  return axios({
    method: "GET",
    url: `${API}/checkin_classroom/getall/`,
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      console.log("Classroom axios", res.data);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      return { error: err };
    });
};
export const get_group_all = () => {
  return axios({
    method: "GET",
    url: `${API}/group/get_group_all/`,
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      console.log("get_group_all axios", res.data);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      return { error: err };
    });
};
export const create_group = (data) => {
  return axios({
    method: "POST",
    url: `${API}/group/create_group`,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  })
    .then((res) => {
      console.log("create_group axios", res.data);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      return { error: err };
    });
};
export const delete_group = (id) => {
  return axios({
    method: "DELETE",
    url: `${API}/group/delete_group/${id}`,
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      console.log("delete_group axios", res.data);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      return { error: err };
    });
};
export const update_group = (data) => {
  return axios({
    method: "PUT",
    url: `${API}/group/update_group/${data.group_id}`,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  })
    .then((res) => {
      console.log("group_code axios", res.data);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      return { error: err };
    });
};

export const checkname_code_classroom = (data) => {
  return axios({
    method: "POST",
    url: `${API}/checkin_classroom/checkname_code_classroom`,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  })
    .then((res) => {
      console.log("checkname axios", res.data);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      return { error: err };
    });
};

export const postcreate_classroom = (data) => {
  return axios({
    method: "POST",
    url: `${API}/checkin_classroom/create_classroom`,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  })
    .then((res) => {
      console.log("create_classroom axios", res.data);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      return { error: err };
    });
};

export const putupdate_classroom = (data) => {
  return axios({
    method: "PUT",
    url: `${API}/checkin_classroom/update_classroom/${data.classroom_code}`,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  })
    .then((res) => {
      console.log("create_classroom axios", res.data);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      return { error: err };
    });
};

export const delete_classroom = (id) => {
  return axios({
    method: "DELETE",
    url: `${API}/checkin_classroom/delete_classroom/${id}`,
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      console.log("delete_classroom axios", res.data);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      return { error: err };
    });
};

export const getall_school_year = () => {
  return axios({
    method: "GET",
    url: `${API}/school_year/get_school_year_all/`,
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      console.log("get_school_year_all", res.data);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      return { error: err };
    });
};

export const get_school_year_all = () => {
  return axios({
    method: "GET",
    url: `${API}/school_year/get_school_year_all/ `,
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    console.log("get_school_year_all", res.data);
    return res.data;
  });
};

export const getone_school_year = (id) => {
  return axios({
    method: "GET",
    url: `${API}/school_year/get_school_year_one/${id}`,
    headers: {
      "Content-Type": "application/json",
    },
    data: id,
  })
    .then((res) => {
      console.log("getone_school_year", res.data);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      return { error: err };
    });
};

export const putupdate_school_year = (data) => {
  return axios({
    method: "PUT",
    url: `${API}/school_year/update_school_year/${data.school_year_id}`,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  })
    .then((res) => {
      console.log("/update_school_year axios", res.data);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      return { error: err };
    });
};
export const postcreate_school_year = (data) => {
  return axios({
    method: "POST",
    url: `${API}/school_year/create_school_year`,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  })
    .then((res) => {
      console.log("create_school_year axios", res.data);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      return { error: err };
    });
};

export const delete_school_year = (id) => {
  return axios({
    method: "DELETE",
    url: `${API}/school_year/delete_school_year/ ${id}`,
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      console.log("delete_school_year axios", res.data);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      return { error: err };
    });
};

export const report1 = (data) => {
  return axios({
    method: "POST",
    url: `${API}/report/report1`,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  })
    .then((res) => {
      console.log("report1 axios", res.data);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      return { error: err };
    });
};
export const daily_time_personnel = (data) => {
  return axios({
    method: "POST",
    url: `${API}/report/daily_time_personnel/ `,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  })
    .then((res) => {
      console.log("daily_time_personnel axios", res.data);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      return { error: err };
    });
};
export const daily_indiviual_personnel = (data) => {
  return axios({
    method: "POST",
    url: `${API}/report/daily_time_staff`,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  })
    .then((res) => {
      console.log("daily_indiviual_personnel axios", res.data);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      return { error: err };
    });
};

export const get_school_color = () => {
  return axios({
    method: "GET",
    url: `${API}/school_year/get_school_color`,
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    console.log("get_school_color", res.data);
    return res.data;
  });
};

export const post_update_school_color = (data) => {
  return axios({
    method: "POST",
    url: `${API}/school_year/post_update_school_color`,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  })
    .then((res) => {
      console.log("post_update_school_color axios", res.data);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      return { error: err };
    });
};

export const post_create_behaviour = (data) => {
  return axios({
    method: "POST",
    url: `${API}/behaviour/create_behaviour`,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  })
    .then((res) => {
      console.log("create_behaviour axios", res.data);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      return { error: err };
    });
};
export const get_one_behaviour = (id) => {
  return axios({
    method: "GET",
    url: `${API}/behaviour/onebehaviour/${id}`,
    headers: {
      "Content-Type": "application/json",
    },
    data: id,
  })
    .then((res) => {
      console.log("onebehaviour", res.data);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      return { error: err };
    });
};
export const get_all_behaviour = () => {
  return axios({
    method: "GET",
    url: `${API}/behaviour/allbehaviour/`,
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    console.log("get_all_behaviour", res.data);
    return res.data;
  });
};

export const post_update_behaviour = (data) => {
  return axios({
    method: "PUT",
    url: `${API}/behaviour/update_behaviour/${data.behaviour_id}`,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  })
    .then((res) => {
      console.log("update_behaviour axios", res.data);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      return { error: err };
    });
};

export const delete_behaviour = (id) => {
  return axios({
    method: "DELETE",
    url: `${API}/behaviour/delete_behaviour/${id}`,
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      console.log("delete_behaviour axios", res.data);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      return { error: err };
    });
};
