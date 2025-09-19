const request = require("supertest");
const app = require("../src/app");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require('dotenv').config();

let token; 
const testEmail = `test-${Date.now()}@example.com`;
const password = "Password123";

beforeAll(async () => {
  // Connect to MongoDB
  await mongoose.connect(process.env.MONGO_URI);

  // Register test user
  await request(app)
    .post("/api/auth/register")
    .send({ email: testEmail, password: password });

  // Login to get token
  const res = await request(app)
    .post("/api/auth/login")
    .send({ email: testEmail, password: password });

  token = res.body.token;
});

afterAll(async () => {
  await mongoose.connection.close();
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


describe("GET /api/sweets", () => {
  it("should return all sweets for authorized user", async () => {
    const res = await request(app)
      .get("/api/sweets")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true); // should return an array of sweets
    expect(res.body.length).toBeGreaterThan(0); // at least one sweet added in previous test
  });

  it("should not allow access without token", async () => {
    const res = await request(app).get("/api/sweets");
    expect(res.status).toBe(401);
  });
});