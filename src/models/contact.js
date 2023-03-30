"use strict";

// const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let contactSchema = new Schema({
  name: { type: String, default: "" },
  relation: { type: String, default: "" },
  phone_number: { type: String, default: "" },
  user_id: { type: Schema.Types.ObjectId, ref: "User" },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

contactSchema.pre("save", function (next) {
  next();
});

contactSchema.set("toObject", { virtuals: true });
contactSchema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("Contact", contactSchema);
