"use strict";

const { feedbackModel } = require("../models");

let feedbackService = {};

feedbackService.findAll = async (query) => {
  let forms = await feedbackModel
    .find(query.where)
    // .populate("role_id")
    .sort(query.sort)
    .limit(query.limit)
    .skip(query.offset);
  return forms;
};

feedbackService.count = async (whereCondition) => {
  const count = await feedbackModel.find(whereCondition).countDocuments();
  return count;
};

feedbackService.findOne = async (query) => {
  let formData = await feedbackModel.findOne(query);
  return formData;
};

feedbackService.add = async (data) => {
  console.log("DATA", data);
  let formData = await feedbackModel.create(data);
  console.log("userNNNNN", formData);
  return formData;
};

feedbackService.findOneAndUpdate = async (query, updateData) => {
  let formData = await feedbackModel.findOneAndUpdate(query, updateData);
  return formData;
};

feedbackService.deleteOne = async (query) => {
  return await feedbackModel.deleteOne(query);
};

module.exports = feedbackService;
