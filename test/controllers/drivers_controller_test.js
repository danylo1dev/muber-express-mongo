const assert = require("express");
const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../../app");

const Driver = mongoose.model("driver");

describe("Drivers controller", () => {
  let driver;
  beforeEach((done) => {
    driver = new Driver({ email: "t@test.com", driving: false });
    driver.save().then((driver) => {
      done();
    });
  });
  it("Post to /api/drivers create a new driver ", (done) => {
    Driver.countDocuments().then((count) => {
      request(app)
        .post("/api/drivers")
        .send({
          email: "test@email.com",
          geometry: {
            type: "Point",
            coordinates: [-122.4759902, 47.6147628],
          },
        })
        .end((err, response) => {
          Driver.countDocuments().then((newCount) => {
            assert(count + 1 === newCount);
            done();
          });
        });
    });
  });
  it("Put to /api/drivers update a driver ", (done) => {
    request(app)
      .put("/api/drivers/" + driver._id)
      .send({ driving: true })
      .end((err, response) => {
        Driver.findOne({ email: "t@test.com" }).then((driver) => {
          assert(driver.driving);
          done();
        });
      });
  });
  it("DELETE to /api/drivers cand delete a driver ", (done) => {
    request(app)
      .delete("/api/drivers/" + driver._id)
      .end((err, response) => {
        Driver.findOne({ email: "t@test.com" }).then((driver) => {
          assert(driver === null);
          done();
        });
      });
  });
  it("Get to /api/drivers find drivers in location", (done) => {
    const seattleDriver = new Driver({
      email: "seattle@test.com",
      geometry: {
        type: "Point",
        coordinates: [-122.4759902, 47.6147628],
      },
    });
    const miamiDriver = new Driver({
      email: "miami@test.com",
      geometry: {
        type: "Point",
        coordinates: [-80.253, 25.791],
      },
    });

    Promise.all(seattleDriver.save(), miamiDriver.save())
      .then(() => {
        request(app)
          .get("/api/drivers?lng=80&lat=25")
          .end((err, response) => {
            console.log(response);
            assert(response.body.length === 1);
            assert(response.body[0].obj.email === "miami@test.com");
            done();
          });
      })
      .finally(() => {
        done();
      });
  });
});
