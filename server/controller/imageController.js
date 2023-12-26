import download from "image-downloader";
export const imageUploadByLink = async (req, res, next) => {
  try {
    const { link } = req.body;
    download.image({
      url: link,
      dest: "uploads",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error!",
      error: err.message,
    });
  }
};
