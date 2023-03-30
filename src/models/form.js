"use strict";

// const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let formSchema = new Schema({
  incident: { type: String, default: "" },
  medical: { type: Boolean, default: "" },
  description: { type: String, default: "" },
  image: [{type: String, default: "" }],
  urgency: { type: String, default: "" },
  latitude: { type: String, default: "" },
  longitude: { type: String, default: "" },
  status: {type: String, default: "Pending"},
  user_id: { type: Schema.Types.ObjectId, ref: "User" },
  respondedBy: {type: String, default: ""},
  responder_num: {type: String, default: ""},
  responder_image: {type: String, default: "/uploads/defaults/default.png"},
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },

});

formSchema.pre("save", function (next) {
  next();
});

formSchema.set("toObject", { virtuals: true });
formSchema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("Form", formSchema);
