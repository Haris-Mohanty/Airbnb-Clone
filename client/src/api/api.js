import axios from "axios";

//***************** REGISTER USER *************/
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
    console.log(err.message);
    throw err;
  }
};

//***************** LOGIN USER *******************/
export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(
      "/user/login",
      { email, password },
      { withCredentials: true }
    );

    if (response.status === 200) {
      const resData = await response.data;
      return resData;
    } else {
      throw new Error("Unexpected Error Occurred!");
    }
  } catch (err) {
    console.log(err.message);
    throw err;
  }
};

//***************** GET LOGIN USER DETAILS *************/
export const getLoginUserDetails = async () => {
  try {
    const response = await axios.get("/user/profile");

    const resData = await response.data;
    return resData;
  } catch (err) {
    console.log(err.message);
    throw err;
  }
};

//***************** IMAGE UPLOAD BY LINK *************/
export const imageUpload = async (link) => {
  try {
    const response = await axios.post("/image/upload-by-link", { link });

    if (response.status === 200) {
      const resData = await response.data;
      return resData;
    } else {
      throw new Error("Unexpected Error Occurred!");
    }
  } catch (err) {
    console.log(err.message);
    throw err;
  }
};

//***************** IMAGE UPLOAD FROM DEVICE *************/
export const imageUploadFromDevice = async (formData) => {
  try {
    const response = await axios.post("/image/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (response.status === 200) {
      const resData = await response.data;
      return resData;
    } else {
      throw new Error("Unexpected Error Occurred!");
    }
  } catch (err) {
    console.log(err.message);
    throw err;
  }
};

//***************** ADD NEW PLACE *************/
export const addNewPlace = async (data) => {
  try {
    const response = await axios.post("/place/add-new-place", data);

    if (response.status === 201) {
      const resData = await response.data;
      return resData;
    } else {
      throw new Error("Unexpected Error Occurred!");
    }
  } catch (err) {
    console.log(err.message);
    throw err;
  }
};

//********* ALL ADDED PLACE SHOW *************/
export const allAddedPlaces = async () => {
  try {
    const response = await axios.get("/place/added-places");

    if (response.status === 200) {
      const resData = await response.data;
      return resData;
    } else {
      throw new Error("Unexpected Error Occurred!");
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};

//**************** GET PLACES BY ID ***********/
export const getPlacesById = async (id) => {
  try {
    const response = await axios.get(`/place/places/${id}`);

    if (response.status === 200) {
      const resData = await response.data;
      return resData;
    } else {
      throw new Error("Unexpected Error Occurred!");
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};

//**************** UPDATE PLACES ***********/
export const updatePlace = async (id, data) => {
  try {
    const response = await axios.put("/place/updatePlace", { id, ...data });
    if (response.status === 200) {
      const resData = await response.data;
      return resData;
    } else {
      throw new Error("Unexpected Error Occurred!");
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};

//********* GET ALL ADDED PLACES (BY ALL USER) ********/
export const getAllAddedPlaces = async () => {
  try {
    const response = await axios.get("/place/all-added-places");

    if (response.status === 200) {
      const resData = await response.data;
      return resData;
    } else {
      throw new Error("Unexpected Error Occurred!");
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};

//************ BOOKING NEW PLACE *************/
export const bookingPlace = async (data) => {
  try {
    const response = await axios.post("/book/bookings", data);

    if (response.status === 201) {
      const resData = await response.data;
      return resData;
    } else {
      throw new Error("Unexpected Error Occurred!");
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};

//************ GET ALL BOOKINGS OF USER *************/
export const getAllBookingOfUser = async () => {
  try {
    const response = await axios.get("/book/getBookings");
    if (response.status === 200) {
      const resData = await response.data;
      return resData;
    } else {
      throw new Error("Unexpected Error Occurred!");
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};
