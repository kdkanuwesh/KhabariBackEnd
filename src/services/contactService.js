"use strict";

const { contactModel } = require("../models");

let contactService = {};

contactService.findAll = async (query) => {
  let forms = await contactModel
    .find(query.where)
    // .populate("role_id")
    .sort(query.sort)
    .limit(query.limit)
    .skip(query.offset);
  return forms;
};

contactService.count = async (whereCondition) => {
  const count = await contactModel.find(whereCondition).countDocuments();
  return count;
};

contactService.findOne = async (query) => {
  let formData = await contactModel.findOne(query);
  return formData;
};

contactService.add = async (data) => {
  console.log("DATA", data);
  let formData = await contactModel.create(data);
  console.log("userNNNNN", formData);
  return formData;
};

contactService.findOneAndUpdate = async (query, updateData) => {
  let formData = await contactModel.findOneAndUpdate(query, updateData);
  return formData;
};

contactService.deleteOne = async (query) => {
  return await contactModel.deleteOne(query);
};

module.exports = contactService;
