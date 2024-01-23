export const bookingPlace = async (req, res, next) => {
  try {
    console.log(req.body);
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error!",
      error: err.message,
    });
  }
};
