const Driver = require("../models/driver");
const service = require("../services/drivers.service");

module.exports = {
  greeting(req, res, next) {
    service
      .greeting()
      .then((res) => {
        res.send({ hi: "there" });
      })
      .catch(next);
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

    service
      .create(driverData)
      .then((driver) => {
        res.send(driver);
      })
      .catch(next);
  },
  update(req, res, next) {
    const { id } = req.params;
    const driverData = req.body;

    service
      .update(id, driverData)
      .then((driver) => {
        res.send(driver);
      })
      .catch(next);
  },
  remove(req, res, next) {
    const { id } = req.params;

    service
      .remove(id)
      .then((driver) => {
        res.status(204).send(driver);
      })
      .catch(next);
  },
};
