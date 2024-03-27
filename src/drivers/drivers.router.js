const DriversController = require("./drivers.controller");
module.exports = (app) => {
  app.get("/api/drivers", DriversController.getDriversNear);
  app.post("/api/drivers", DriversController.create);
  app.put("/api/drivers/:id", DriversController.update);
  app.delete("/api/drivers/:id", DriversController.remove);
};
