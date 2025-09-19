const request = require("supertest");
const app = require("../src/app");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require('dotenv').config();

let token;

// TODO: Set up user login check middleware to get a valid token
beforeAll(() => {
  token = jwt.sign({ userId: "test@gmail.com" }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
});

describe("Sweets API", () => {
  it("should not allow adding a sweet without token", async () => {
    const res = await request(app).post("/api/sweets").send({
      name: "Ladoo",
      category: "Indian",
      price: 10,
    });
    expect(res.status).toBe(401);
  });

  it("should allow adding a sweet with valid token", async () => {
    const res = await request(app)
      .post("/api/sweets")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Ladoo",
        category: "Indian",
        price: 10,
      });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("_id");
    expect(res.body.name).toBe("Ladoo");
  });
});
