const mongoose = require("mongoose");

const adSchema = mongoose.Schema({
  name: String,
  description: String,
  category: String,
  image:String,
  location: String,
  postedAt: Date,
  price: String,
});

const AdModel = mongoose.model("ad", adSchema);

module.exports = {
  AdModel
};
