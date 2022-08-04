module.exports = function (config) {
  if (!config.get("jsonprivateKey")) {
    throw new Error("JWT does not defined!!");
  }
};
