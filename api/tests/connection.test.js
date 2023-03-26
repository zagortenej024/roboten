const { chai, expect } = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app");


chai.use(chaiHttp);


describe("Test healthcheck endpoint", () => {
  it("Should return a valid healthcheck response", async () => {
    const res = await request(app).get("/healthcheck");
    expect(res.status).toEqual(200);
    expect(res.body).toHaveProperty({"message": "I am alive and well!"});
  });
});
