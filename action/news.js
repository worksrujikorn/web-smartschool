import axios from "axios";
import { API } from "../config";
import jscookie from "js-cookie";
// import cookie from 'js-cookie';
import { getCookie, setCookie } from "./auth";
import { data } from "autoprefixer";

export const postreadnews = (data) => {
  return axios({
    method: "POST",
    url: `${API}/notification/news`,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
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

export const postnewsstatus = (data) => {
  return axios({
    method: "POST",
    url: `${API}/news/getstatus`,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
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

// api news
export const postNewscount = (data) => {
  return axios({
    method: "POST",
    url: `${API}/news/countactive/allnews`,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
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

export const getNews = () => {
  return axios({
    method: "GET",
    url: `${API}/news/get/all`,
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
export const putNews = (data) => {
  return axios({
    method: "PUT",
    url: `${API}/news/update/${data.news_id}`,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
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

export const postNews = (data) => {
  return axios({
    method: "POST",
    url: `${API}/news/add`,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
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
export const deleteNews = (data) => {
  return axios({
    method: "DELETE",
    url: `${API}/news/delete/${data}`,
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
