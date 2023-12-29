import axios from "axios";

const getErrorsInArray = (errorResponse) => {
  let errors = [];

  if (
    Array.isArray(errorResponse.data) &&
    typeof errorResponse.data[0].message === "string"
  ) {
    //fastest-validator error format
    // console.log("fastest-validation");
    errorResponse.data.forEach((error) => {
      errors.push(error.message);
    });
  } else if (
    Array.isArray(errorResponse.data.error) &&
    typeof errorResponse.data.error[0] === "string"
  ) {
    //manual array format error
    // console.log("manual array");
    errorResponse.data.error.forEach((error) => {
      errors.push(error);
    });
  } else if (
    Array.isArray(errorResponse.data.error) &&
    typeof errorResponse.data.error[0].details[0].message === "string"
  ) {
    //joi error validation
    // console.log("joi array");
    errors.push(errorResponse.data.error[0].details[0].message);
  } else if (typeof errorResponse.data.error === "string") {
    //manual error contain only one object

    // console.log("manual one object");
    errors.push(errorResponse.data.error);
  } else if (typeof errorResponse.data.message === "string") {
    //manual error contain only one object
    // console.log("custom error ars");
    errors.push(errorResponse.data.message);
  } else errors.push("Something Went Wrong");

  return errors;
};

const displayErrors = (errorResponse) => {
  if (errorResponse?.status >= 400 && errorResponse?.status <= 500) {
    return getErrorsInArray(errorResponse);
  } else return [];
};

const createAxios = () => {
  const config = { baseURL: "" };
console.log(process.env.BACKEND_API, 'here');
  let baseURL = process.env.BACKEND_API || "";

  config.baseURL = baseURL;

  const axiosInstance = axios.create(config);

  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      const errorResponse = error.response;
      const errors = displayErrors(errorResponse);
      errors.map((error) => {
        console.log(error);
        //   add error snackbar
        //   message.error(error);
      });
      return Promise.reject(error);
    }
  );

  const get = ({ url, params }) =>
    axiosInstance.request({
      method: "GET",
      url,
      params,
    });

  const post = ({ url, data, config = {} }) =>
    axiosInstance.request({
      method: "POST",
      url,
      data,
      ...config,
    });

  return {
    instance: axiosInstance,
    get,
    post,
  };
};

export default createAxios;
