const Driver = require("./driver");

module.exports = {
  async getDriversNear({ lng, lat }) {
    const point = {
      type: "Point",
      coordinates: [parseFloat(lng), parseFloat(lat)],
    };

    const options = {
      spherical: true,
      maxDistance: 100000, // 10 km
    };
    return await Driver.aggregate([
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
  async create(driverData) {
    return await Driver.create(driverData);
  },
  async update(id, driverData) {
    await Driver.findByIdAndUpdate({ id }, driverData);
    return await Driver.findById({ id });
  },
  async remove(id) {
    return await Driver.findByIdAndDelete({ id });
  },
};
