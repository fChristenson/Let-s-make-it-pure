const app = require("./src/app.js");

app.listen(3000);

process.on("unhandledRejection", (reason, promise) => {
  console.log(reason.stack || reason);
  console.log("--------------------------");
  process.exit(1);
});
