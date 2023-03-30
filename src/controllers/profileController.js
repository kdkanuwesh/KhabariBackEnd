const { userService } = require("../services");
const bcrypt = require("bcryptjs");
const { generateRandomString } = require("../helpers/commonHelper");
const { mkDirByPathSync, removeFile } = require("../helpers/fileHelper");

let profileController = {
  profile: async (req, res, next) => {
    try {
      let profile = await userService.findOne({ _id: req.session.user.id });
      console.log("PROFILE", profile);
      return res.status(200).json({
        Success: true,
        message: "User Profile",
        data: profile,
      });
    } catch (err) {
      next(err);
    }
  },
  editProfile: async (req, res, fn) => {
    try {
      let userData = await userService.findOne({ _id: req.session.user._id });

      if (userData) {
        let updateData = {
          fullname: req.body.fullname,
          contact_number: req.body.contact_number,
          height: req.body.height,
          weight: req.body.weight,
          allergies: req.body.allergies,
          blood_type: req.body.blood_type,
          dob: req.body.dob,
        };
        if (req.files) {
          let rootDir = "public/backend";
          let absDir = "/uploads/profile/";
          let dir = rootDir + absDir;
          mkDirByPathSync(dir);
          let image = req.files.image;
          imageName = image.name;
          let imageNameSplit = imageName.split(".");
          let updatedName = "";
          let ext;
          for (let i = 0; i < imageNameSplit.length; i++) {
            let name = imageNameSplit[i];
            if (i == imageNameSplit.length - 1) {
              ext = name;
            } else {
              if (i == 0) {
                updatedName = name;
              } else {
                updatedName = updatedName + "-" + name;
              }
            }
          }
          imageName = updatedName + "-" + generateRandomString(5);
          imageName =
            imageName.replace(/[^a-zA-Z0-9]/g, "-").toLowerCase() + "." + ext;

          image.mv(dir + imageName, function (err) {
            if (err) {
              imageName = "";
            }
          });
          imageName = absDir + imageName;
          if (userData.image) {
            removeFile(rootDir + userData.image);
          }
          updateData["image"] = imageName;
        }
        let updatedUser = await userService.findOneAndUpdate(
          { _id: req.params.id },
          updateData
        );
        if (updatedUser._id == req.session.user._id) {
          req.session.user["fullname"] = updatedUser["fullname"];
          req.session.user.image = updatedUser.image;
          req.session.user.contact_number = updatedUser.contact_number;
          req.session.user.height = updatedUser.height;
          req.session.user.weight = updatedUser.weight;
          req.session.user.allergies = updatedUser.allergies;
          req.session.user.blood_type = updatedUser.blood_type;
          req.session.user.dob = updatedUser.dob;
          req.session.user.fullname = updatedUser.fullname;
        }
        console.log(
          req.session.user,
          "USERRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR"
        );
        return res.status(200).json({
          Success: true,
          message: "Profile Edited.",
          data: updatedUser,
        });
      } else {
        return res
          .status(404)
          .json({ Success: false, message: "You dont have privelege" });
      }
    } catch (e) {
      console.log("Error", e);
    }
  },
  changePassword: async (req, res, fn) => {
    try {
      let user = await userService.findOne({ _id: req.params.id });
      if (!user) {
        return res
          .status(404)
          .json({ Success: false, message: "The user doesnot exist" });
      }
      let hashPassword = await bcrypt.hashSync(
        req.body.password,
        bcrypt.genSaltSync(10),
        null
      );
      await userService.findOneAndUpdate(
        { _id: req.params.id },
        { password: hashPassword, updated_at: new Date() }
      );
      return res.status(200).json({
        Success: true,
        message: "Password Changed.",
      });
    } catch (error) {
      fn(error);
    }
  },
};

module.exports = profileController;
