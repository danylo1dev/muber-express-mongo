const mongoose = require("mongoose");

beforeEach((done) => {
  const { drivers } = mongoose.connection.collections;

  drivers
    .drop()
    .then(() => {
      drivers.ensureIndex({ "geometry.coordinates": "2dsphere" });
    })
    .finally(() => {
      done();
    });
});
