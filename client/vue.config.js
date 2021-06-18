const fs = require("fs");

module.exports = {
  devServer: {
    disableHostCheck: true,
    port: 8082,
    public: "https://xornet.cloud",
    https: true,
    cert: fs.readFileSync("./cert.pem"),
    key: fs.readFileSync("./key.pem")
  }
};
