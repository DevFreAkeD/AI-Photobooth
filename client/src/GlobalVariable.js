export const BASE_API = "http://localhost:8080/api";
export const BASE_API2 = "";

export const validate = (name, value, type) => {
  console.log(name, value, type);
  let error = null;
  switch (name) {
    case "name":
      const nameRegex = /^[a-zA-Z\s]+$/;
      if (!value) {
        error = null;
      }
      if (value && !nameRegex.test(value)) {
        error =
          type === "hindi" ? "उपयोगकर्ता नाम अमान्य है." : "Name is invalid";
      }
      break;
    case "email":
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!value) {
        error = null;
      }
      if (value && !emailRegex.test(value)) {
        error = type === "hindi" ? "ईमेल अमान्य है" : "Email is invalid";
      }
      break;
    case "phone":
      const phoneRegex = /^[0-9]{10}$/;
      if (!value) {
        error = null;
      }
      if (value && !phoneRegex.test(value)) {
        error = type = "hindi" ? "फ़ोन अमान्य है" : "Phone number is invalid";
      }
      break;
    default:
      break;
  }
  return error;
};
