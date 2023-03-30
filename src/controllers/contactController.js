const { contactModel } = require("../models");
const { contactService, userService } = require("../services");

let contactController = {
  add: async (req, res, fn) => {
    try {
      console.log("SESSIONNNN", req.session.user);

      let formData = {
        name: req.body.name,
        relation: req.body.relation,
        phone_number: req.body.phone_number,
        user_id: req.session.user._id,
        created_at: new Date(),
      };
      const formDataAdd = await contactService.add(formData);
      return res.status(200).json({
        Success: true,
        message: "Form data added to Database",
        data: formDataAdd,
      });
    } catch (e) {
      fn(e);
    }
  },
  
  showContacts: async (req, res, fn) => {
    console.log("SESSIONNNN Show Contact", req.session.user);
    try {
      const findUser = await userService.findOne({_id: req.params.id})
      console.log("HELLPPPPP" , findUser);
      const findAllData = await contactModel.find({
        user_id: req.params.id,
      });
      console.log("HELLPPPPP" , findAllData);
    return res.status(200).json({
        Success: true,
        message: "All of the Data",
        data: findAllData,
      });
    } catch (e) {
      fn(e);
    }
  },
  delete: async (req, res, fn) => {
    try {
      let formData = await contactService.findOne({ _id: req.params.id });
      if (formData) {
        await contactService.deleteOne({ _id: req.params.id });
        return res.status(200).json({
          Success: true,
          message: "Successfully deleted",
        });
      }
    } catch (e) {
      fn(e);
    }
  },
};

module.exports = contactController;
