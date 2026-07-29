import { uploadImage } from "../services/upload.service.js";
import User from "../models/User.js";
import { success } from "../utils/response.js";

export const uploadProfileImage = async (req, res, next) => {
  try {
    if (!req.file) {
      throw new Error("No image file received");
    }

    const result = await uploadImage(req.file);

    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        profileImage: result.secure_url,
      },
      {
        new: true,
      }
    );

    if (!user) {
      throw new Error("User not found");
    }

    const userObj = user.toObject();
    delete userObj.password;

    return success(res, "Profile image uploaded", userObj);
  } catch (err) {
    next(err);
  }
};
