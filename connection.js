const mongoose = require("mongoose");

async function connectDatabase(url) {
  return mongoose.connect(url)
        .then(() => console.log("MONGODB CONNECTED"))
        .catch((err) => console.log("DBerr", err));
}

module.exports = {
  connectDatabase,
};