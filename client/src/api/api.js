import axios from "axios";

export const registerUser = async (name, email, password) => {
  try {
    const response = await axios.post("/user/register", {
      name,
      email,
      password,
    });
    if (response.status === 200 || response.status === 201) {
      const resData = await response.data;
      return resData;
    } else {
      // If the response status is not success (200 or 201), throw an error
      throw new Error("Unexpected Error Occurred!");
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};
