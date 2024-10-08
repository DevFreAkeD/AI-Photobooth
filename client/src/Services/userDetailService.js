import axios from "axios";
import { BASE_API, BASE_API2 } from "../GlobalVariable";

// #region RegistrationService
export const userDetailService = async (data) => {
  try {
    console.log("data", data);
    // Url
    const url = `${BASE_API}/user`;

    // Config
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const formdata = new FormData();
    formdata.append("name", "data?.name");
    formdata.append("email", "data?.email");
    formdata.append("type", 1);
    formdata.append("gender", data?.gender);
    formdata.append("image", data?.image);

    const result = await axios.post(url, formdata, config);
    return Promise.resolve(result);
  } catch (err) {
    return Promise.reject(err);
  }
};
// #endregion

// #region RegistrationService
export const userImageService = async (data) => {
  try {
    const url = `${BASE_API}/user`;

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const formdata = new FormData();
    let location;
    switch (data?.avatar) {
      case "1":
        location = "Kashmir";
        break;
      case "2":
        location = "Tamil";
        break;
      case "3":
        location = "Assam";
        break;
      case "4":
        location = "Rajasthan";
        break;
      default:
        location = "MP";
        break;
    }

    formdata.append("type", data?.avatar);
    formdata.append("gender", data?.gender);
    formdata.append("image", data?.image);  // Make sure 'data.image' is a valid file object (e.g. from an <input> element)

    const result = await axios.post(url, formdata, config);
    return Promise.resolve(result?.data?.result);
  } catch (err) {
    return Promise.reject(err);
  }
};
// #endregion

//#region Ping API
export const PingService = async (data) => {
  try {
    // Url
    const url = `${BASE_API}/ping`;

    // Config
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const result = await axios.get(url, config);

    return Promise.resolve(result?.data);
  } catch (err) {
    return Promise.reject(err);
  }
};
//#endregion
// #region Get User Data
export const userDetailListService = async (data) => {
  try {
    // Url
    const url =
      "https://commonservertwo.collab.exchange/TestBackendServerapi/hyndaiCretaDeepfake/user/get-registeredData";
    // const url="http://localhost:6001/api/hyndaiCretaDeepfake/user/get-registeredData";

    // Config
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer token`,
      },
    };

    const result = await axios.get(url);

    return Promise.resolve(result?.data?.result);
  } catch (err) {
    return Promise.reject(err);
  }
};
// #endregion

// #region Get User Data
export const sendEmailService = async (data) => {
  try {
    // Url
    const url = `${BASE_API}/email`;
    console.log("data", data);
    // Config
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const result = await axios.post(url, data);

    return Promise.resolve(result?.data?.result);
  } catch (err) {
    return Promise.reject(err);
  }
};
// #endregion
