module.exports = function () {
  process.on("uncaughtException", (err, origin) => {
    console.log(err + "\n" + origin);
  });
  process.on("unhandledRejection", (reason, promise) => {
    console.log("Unhandled Rejection at:", promise, "reason:", reason);
  });
};
