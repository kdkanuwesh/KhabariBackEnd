"use strict";

const { formModel } = require("../models");

let formService = {};

formService.findAll = async (query) => {
  let forms = await formModel
    .find(query.where)
    // .populate("role_id")
    .sort(query.sort)
    .limit(query.limit)
    .skip(query.offset);
  return forms;
};

formService.count = async (whereCondition) => {
  const count = await formModel.find(whereCondition).countDocuments();
  return count;
};

formService.findOne = async (query) => {
  let formData = await formModel.findOne(query);
  return formData;
};

formService.add = async (data) => {
  console.log("DATA", data);
  let formData = await formModel.create(data);
  console.log("userNNNNN", formData);
  return formData;
};

formService.findOneAndUpdate = async (query, updateData) => {
  let formData = await formModel.findOneAndUpdate(query, updateData);
  return formData;
};

formService.deleteOne = async (query) => {
  return await formModel.deleteOne(query);
};

module.exports = formService;
