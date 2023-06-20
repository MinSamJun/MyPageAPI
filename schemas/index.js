const mongoose = require("mongoose");

const connect = () => {
  mongoose
    .connect("mongodb://localhost:27017/prc")
    .catch(err => console.log(err));
};
// 몽구스로 몽고DB와 연결
mongoose.connection.on("error", err => {
  console.error("몽고디비 연결 에러", err);
});

module.exports = connect;