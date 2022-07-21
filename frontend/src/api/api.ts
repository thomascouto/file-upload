import axios from "axios";

const hostname = "http://localhost:3000/";
const addr = {
  get: hostname.concat("list"),
  upload: hostname.concat("upload"),
};

const api = {
  list: async () => {
    return await axios.get<{ response: string[] }>(addr.get);
  },

  upload: async (f: FormData) => {
    return await axios.post<{ response: string }>(addr.upload, f);
  },
};

export { api };
