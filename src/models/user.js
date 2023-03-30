"use strict";

const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let userSchema = new Schema({
  email: { type: String, unique: true, index: true },
  fullname: { type: String},
  password: { type: String },
  user_role: { type: String, default: "" },
  contact_number: { type: String },
  height: { type: String },
  weight: { type: String },
  allergies: { type: String, default: "" },
  blood_type: { type: String, default: "" },
  dob: { type: Date },
  verify_user: { type: Boolean, default: false },
  token: { type: String, default: "" },
  device_id: { type: String, default: "" },
  image: {type: String, default: "/uploads/defaults/default.png" },
  token_expires: { type: Date },
  reset_password_token: { type: String },
  reset_password_expires: { type: Date },
  verify_user_token: { type: String },
  verify_user_token_expires: { type: Date },
  verify_login_token: { type: String },
  verify_login_token_expires: { type: Date },
  two_way_auth: { type: Boolean, default: false },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

userSchema.pre("save", function (next) {
  let user = this;
  if (!user.isModified("password")) {
    return next();
  }

  user.password = generateHash(user.password);
  next();
});

let generateHash = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};

userSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

userSchema.set("toObject", { virtuals: true });
userSchema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("User", userSchema);
