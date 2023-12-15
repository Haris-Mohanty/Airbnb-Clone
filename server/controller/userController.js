//****************** USER REGISTRATION ******************/
export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    //Validation
    if (!name || !email || !password) {
      return res.status(422).json({
        message: "Please Provide All Fields!",
      });
    }
    if (password.length < 6) {
      return res.status(422).json({
        message: "Password length should be greater than 6 character!",
      });
    }


  } catch (err) {
    return res.status(500).json({
      message: "Error in register user API!",
      error: err.message,
    });
  }
};
