const Driver = require("./driver");
const service = require("./drivers.service");

module.exports = {
  async getDriversNear(req, res, next) {
    const { lng, lat } = req.query;

    const results = await service.getDriversNear({ lng, lat });
    res.send(results);
  },
  async create(req, res, next) {
    const driverData = req.body;

    const results = await service.create(driverData);

    res.send(results);
  },
  async update(req, res, next) {
    const { id } = req.params;
    const driverData = req.body;

    const results = await service.update(id, driverData);

    res.send(results);
  },
  async remove(req, res, next) {
    const { id } = req.params;

    const results = await service.remove(id);

    res.status(204).send(results);
  },
};
