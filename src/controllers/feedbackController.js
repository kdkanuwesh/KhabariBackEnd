const { feedbackModel } = require("../models");
const { feedbackService } = require("../services");

let feedbackController = {
  add: async (req, res, fn) => {
    try {
        let formData = {
          rating: req.body.rating,
          description: req.body.description,
          feedbackBy: req.session.user.fullname,
          created_at: new Date(),
        };
        const formDataAdd = await feedbackService.add(formData);
        return res.status(200).json({
          Success: true,
          message: "Feedback is sent",
          data: formDataAdd,
        });
    } catch (e) {
      fn(e);
    }
  },
  feedbacks: async (req, res, fn) => {
    try {
      const feedbackData = await feedbackModel.find({});
      console.log("FEEDBACKDATA", feedbackData);
      return res.status(200).json({
        Success: true,
        message: "Total feedbacks",
        data: feedbackData,
      });
    } catch (e) {
      console.log(e);
    }
  },
};

module.exports = feedbackController;
