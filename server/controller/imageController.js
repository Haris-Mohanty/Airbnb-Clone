import download from "image-downloader";

export const imageUploadByLink = async (req, res, next) => {
  try {
    const { link } = req.body;
    const newName = Date.now() + ".jpg";
    const dest = path.join(__dirname, "../uploads", newName);
    console.log(dest)

    return false;

    const options = {
      url: link,
      dest: "../uploads" + newName,
    };

    await download
      .image(options)
      .then(({ fileName }) => console.log("Saved to", fileName))
      .catch((err) => console.log(err));
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error!",
      error: err.message,
    });
  }
};
