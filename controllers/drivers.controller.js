const Driver = require("../models/driver");

module.exports = {
  greeting(req, res) {
    res.send({ hi: "there" });
  },
  index(req, res, next) {
    console.log(req.query);
    const { lng, lat } = req.query;
    const point = {
      type: "Point",
      coordinates: [parseFloat(lng), parseFloat(lat)],
    };

    const options = {
      spherical: true,
      maxDistance: 100000, // 10 km
    };
    Driver.aggregate([
      {
        $geoNear: {
          near: point,
          distanceField: "distance",
          spherical: true,
          maxDistance: options.maxDistance,
        },
      },
    ])
      .then((drivers) => {
        res.send(drivers);
      })
      .catch(next);
  },
  create(req, res, next) {
    const driverData = req.body;

    Driver.create(driverData)
      .then((driver) => {
        res.send(driver);
      })
      .catch(next);
  },
  update(req, res, next) {
    const { id } = req.params;
    const driverData = req.body;

    Driver.findByIdAndUpdate({ id }, driverData)
      .then(() => {
        return Driver.findById({ id });
      })
      .then((driver) => {
        res.send(driver);
      })
      .catch(next);
  },
  remove(req, res, next) {
    const { id } = req.params;

    Driver.findByIdAndDelete({ id })
      .then((driver) => {
        res.status(204).send(driver);
      })
      .catch(next);
  },
};
