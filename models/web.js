const mongoose = require("mongoose")

const serverSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  id: String,
  maintenance: Boolean,
  berita: String
});

module.exports = mongoose.model("Server", serverSchema, "servers")
