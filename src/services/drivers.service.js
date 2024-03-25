const Driver = require("../models/driver");

module.exports = {
  greeting() {
    return { hi: "there" };
  },
  index({ lng, lat }) {
    const point = {
      type: "Point",
      coordinates: [parseFloat(lng), parseFloat(lat)],
    };

    const options = {
      spherical: true,
      maxDistance: 100000, // 10 km
    };
    return Driver.aggregate([
      {
        $geoNear: {
          near: point,
          distanceField: "distance",
          spherical: true,
          maxDistance: options.maxDistance,
        },
      },
    ]);
  },
  create(driverData) {
    return Driver.create(driverData);
  },
  update(id, driverData) {
    return Driver.findByIdAndUpdate({ id }, driverData).then(() => {
      return Driver.findById({ id });
    });
  },
  remove(id) {
    return Driver.findByIdAndDelete({ id });
  },
};
