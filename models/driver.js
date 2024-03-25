const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PointShema = new Schema({
  type: {
    type: String,
    default: "Point",
  },
  coordinates: { type: [Number], index: "2dsphere" },
});

const DriverSchema = new Schema({
  email: {
    type: String,
    require: true,
  },
  driving: {
    type: Boolean,
    default: false,
  },
  geometry: PointShema,
});

const Driver = mongoose.model("driver", DriverSchema);
module.exports = Driver;
