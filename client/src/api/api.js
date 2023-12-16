import axios from "axios";

export const registerUser = async (name, email, password) => {
  try {
    const response = await axios.post("/user/register", {
      name,
      email,
      password,
    });
    console.log(response);
  } catch (err) {
    console.log("Registration failed:", err.message);
    throw err;
  }
};
