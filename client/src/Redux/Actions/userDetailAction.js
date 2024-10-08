import { USER_DETAIL } from "./Types";
import {
  userDetailService,
  userImageService,
} from "../../Services/userDetailService";

function base64ToPngFile(base64String, filename = "image") {
  // Remove data URL prefix (e.g., 'data:image/png;base64,')
  const base64WithoutPrefix = base64String.replace(
    /^data:image\/\w+;base64,/,
    "",
  );

  // Decode Base64 string to binary data
  const binaryData = atob(base64WithoutPrefix);

  // Convert binary data to Uint8Array
  const uint8Array = new Uint8Array(binaryData.length);
  for (let i = 0; i < binaryData.length; i++) {
    uint8Array[i] = binaryData.charCodeAt(i);
  }

  // Create Blob from Uint8Array
  const blob = new Blob([uint8Array], { type: "image/png" });

  // Create a File object
  const file = new File([blob], `${filename}.png`, { type: "image/png" });

  return file;
}

//#region userDetailsAction
export const userDetailAction = (data, selectedImage) => async (dispatch) => {
  try {
    // Adding selectedImage to the data object
    const newData = {
      ...data,
      avatar: selectedImage,
    };

    // Dispatching To Reducer
    dispatch({
      type: USER_DETAIL,
      payload: newData,
    });
  } catch (err) {
    // Errors
    let errors = err.response.data.errors;

    if (errors !== undefined) {
      for (let x of errors) {
        // Errors Alert
        dispatch((x.msg, "error", 3000));
      }
    } else {
      return Promise.reject(err);
    }
  }
};
// #endregion

export const userImageAction = (data) => async (dispatch) => {
  try {
    // Calling Service

    const result = await userImageService(data);
    dispatch({
      type: USER_DETAIL,
      payload: { image: result },
    });
    return Promise.resolve(result);

    //  const Resultdata="data:image/png;base64,"+result;

    // const resultFile1 = base64ToPngFile(Resultdata);

    //  // Dispatching To Reducer
    //  const resultData={
    //   ...data,
    //   imageBase64:Resultdata,
    //   output1:resultFile1,
    //  }
    //  dispatch({
    //   type: USER_DETAIL,
    //   payload: resultData,
    // });

    //  return Resultdata;
  } catch (err) {
    // Errors
    let errors = err.response.data.errors;

    if (errors !== undefined) {
      for (let x of errors) {
        // Errors Alert
        dispatch((x.msg, "error", 3000));
      }
    } else {
      return Promise.reject(err);
    }
  }
};
