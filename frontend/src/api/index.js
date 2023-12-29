import createAxios from "./createAxios";

const browserAxios = createAxios();

// USERS APIS
export const getPosts =
  (axios = browserAxios) =>
  () =>
    axios.get({ url: "/" });
