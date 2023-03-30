"use strict";

// const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let feedbackSchema = new Schema({
  rating: { type: String, default: "" },
  description: { type: String, default: "" },
  feedbackBy: {type: String, default: ""},
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },

});

feedbackSchema.pre("save", function (next) {
  next();
});

feedbackSchema.set("toObject", { virtuals: true });
feedbackSchema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("Feedback", feedbackSchema);
