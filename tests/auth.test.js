const request = require("supertest");
const app = require("../src/app");
const mongoose = require("mongoose");
const User = require("../src/models/User");
require('dotenv').config();


beforeAll(async () => {
  // Connect to MongoDB
  await mongoose.connect(process.env.MONGO_URI);
});

describe("Auth API", () => {
  describe("POST /api/auth/register", () => {
    it("should create a new user with email and password", async () => {
      const testEmail = `test-${Date.now()}@example.com`;
      const res = await request(app)
        .post("/api/auth/register")
        .send({ email: testEmail, password: "Password123" });

      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty("userId");
      expect(res.body).toHaveProperty("email", testEmail);
    });
  });

  describe("POST /api/auth/login", () => {
    it("should log in a user and return 200 with a token", async () => {
      const res = await request(app)
        .post("/api/auth/login")
        .send({ email: "test@example.com", password: "Password123" });

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("token");
    });
  });

});