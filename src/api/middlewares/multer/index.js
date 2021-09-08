import path from "path";
import { existsSync, mkdirSync } from "fs";
import multer from "multer";

const uploadDir = path.join(__dirname, "../../../../uploads");

const storage = multer.diskStorage({
  destination: (req, file, done) => {
    if (!existsSync(uploadDir)) mkdirSync(uploadDir);

    done(null, uploadDir);
  },
  filename: (req, file, done) => {
    const extension = file.mimetype.split("/")[1];
    done(null, "profile-" + Date.now() + "." + extension);
  },
});

const fileFilter = (req, file, done) => {
  const extension = file.mimetype.split("/")[1];
  if (extension == "jpg" || extension == "jpeg" || extension == "png") {
    done(null, true);
  } else {
    done({ message: "확장자명이 *.jpg, *.jpeg, *.png 파일만 업로드가 가능합니다." }, false);
  }
};
const profileUpload = multer({ storage, fileFilter });

export default profileUpload;
