const mongooseLoader = require("./mongoose");
const expressLoader = require("./express");

let init = async (app) => {
  await mongooseLoader.init();
  await expressLoader.init(app);
};

module.exports = { init };
