const { formService, contactService, userService } = require("../services");

const { mkDirByPathSync, removeFile } = require("../helpers/fileHelper");

const { generateRandomString } = require("../helpers/commonHelper");
const { formModel, contactModel, userModel } = require("../models");

let formController = {
  add: async (req, res, fn) => {
    try {
      console.log("REQ FILES", req.files);
      const images = [];
      req.files.images = !req.files.images.length
        ? [req.files.images]
        : req.files.images;
      let dir = "public/backend/uploads/incidents/";
      mkDirByPathSync(dir);
      for (let i = 0; i < req.files.images.length; i++) {
        const image = req.files.images[i];
        console.log("IMAGE", image);
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
        let uploadPath = "public/backend/uploads/incidents/" + imageName;

        await new Promise((resolve) => {
          image.mv(uploadPath, (err) => {
            if (err) throw err;
            console.log(image);
            if (!err) images.push(`/uploads/incidents/${imageName}`);
            console.log("IMAGE ARRAY", images);
            resolve(true);
          });
        });
      }
      console.log(images);

      console.log("SESSIONNNN", req.session.user);
      // console.log("REQ FILESSSS", req.body);
      const formData = {
        incident: req.body.incident,
        medical: req.body.medical,
        description: req.body.description,
        urgency: req.body.urgency,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        image: images,
        user_id: req.session.user._id,
        created_at: new Date(),
      };

      // formData["image"] = images;

      const formDataAdd = await formService.add(formData);
      return res.status(200).json({
        Success: true,
        message: "Form data added to Database",
        data: formDataAdd,
      });
    } catch (e) {
      fn(e);
    }
  },
  pastincidents: async (req, res, fn) => {
    try {
      const findAllData = await formService.findAll({
        user_id: req.session.user._id,
      });
      console.log(findAllData);
      return res.status(200).json({
        Success: true,
        message: "All of the Data",
        data: findAllData,
      });
    } catch (e) {
      fn(e);
    }
  },
  pastincidentById: async (req, res, fn) => {
    try {
      const findUser = await userService.findOne({ _id: req.params.id });
      const findAllData = await formModel.find({
        user_id: req.params.id,
      });
      console.log(findAllData);
      return res.status(200).json({
        Success: true,
        message: "All of the Data",
        data: findAllData,
      });
    } catch (e) {
      fn(e);
    }
  },
  singleincident: async (req, res, fn) => {
    console.log("SESSIONNNN SINGLE INCIDENT", req.session.user);
    try {
      const findOneData = await formService.findOne({
        _id: req.params.id,
      });
      console.log("DATEWEEAS", findOneData);
      const userDetails = await userService.findOne({
        _id: findOneData.user_id,
      });
      const findAllContacts = await contactModel.find({
        user_id: userDetails.id,
      });
      return res.status(200).json({
        Success: true,
        message: "All of the Data",
        userDetails: userDetails,
        contacts: findAllContacts,
        incidentDetails: findOneData,
      });
    } catch (e) {
      fn(e);
    }
  },
  delete: async (req, res, fn) => {
    try {
      let formData = await formService.findOne({ _id: req.params.id });
      console.log(formData.image, "FORMDATAIMAGES");
      if (formData.image) {
        let rootDir = "public/backend";
        formData.image.map((i) => removeFile(rootDir + i));
      }
      await formService.deleteOne({ _id: req.params.id });
      return res.status(200).json({
        Success: true,
        message: "Successfully deleted",
      });
    } catch (e) {}
  },
  todaysForm: async (req, res, fn) => {
    try {
      const start = new Date();
      start.setHours(0, 0, 0, 0);
      console.log("STARTTTTT", start);
      const end = new Date();
      end.setHours(23, 59, 59, 999);
      console.log("ENDDD", end);

      let formData = await formModel.find({
        created_at: { $gte: start, $lt: end },
      });
      console.log("FORM ALL DATA", formData);
      return res.status(200).json({
        Success: true,
        message: "Todays Data",
        data: formData,
      });
    } catch (e) {
      console.log("Errorrrr", e);
    }
  },
  updateStatus: async (req, res, fn) => {
    try {
      let userData = await userService.findOne({ _id: req.session.user._id });
      console.log("USERDATA", userData.user_role);
      if (userData.user_role == 1) {
        let updateData = {
          status: req.body.status,
          respondedBy: req.session.user.fullname,
          responder_num: req.session.user.contact_number,
          responder_image: req.session.user.image,
        };
        let updatedForm = await formService.findOneAndUpdate(
          { _id: req.params.id },
          updateData
        );
        return res.status(200).json({
          Success: true,
          message: "Updated FormData",
          data: updatedForm,
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

  respondersList: async (req, res, fn) => {
    try {
      let userData = await userModel.find({ user_role: "1" });
      console.log("RESPONDER", userData);
      return res.status(200).json({
        Success: true,
        message: "List of responders",
        data: userData,
      });
    } catch (e) {
      console.log("ERR", e);
    }
  },
  deleteResponders: async (req, res, fn) => {
    try {
      let userData = await userModel.find({
        user_role: "1",
        _id: req.params.id,
      });
      console.log("RESPONDER", userData);

      if (userData) {
        if (userData.image) {
          let rootDir = "public/backend";
          removeFile(rootDir + userData.image);
        }
        deletedData = await userService.deleteOne({ _id: req.params.id });
        return res.status(200).json({
          Success: true,
          message: "Successfully Deleted",
        });
      } else {
        return res.status(404).json({
          Success: false,
          message: "Responder doesnot exist",
        });
      }
    } catch (e) {
      console.log("ERR", e);
    }
  },
};

module.exports = formController;
