const request = require("supertest");
const app = require("../src/app");
const mongoose = require("mongoose");
const User = require("../src/models/User");
const bcrypt = require("bcrypt");
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
    it("should return 400 if email is missing", async () => {
      const res = await request(app).post("/api/auth/register").send({ password: "123456" });
      expect(res.statusCode).toBe(400);
    });
    it("should return 400 if password is too short", async () => {
      const res = await request(app).post("/api/auth/register").send({ email: "short@pass.com", password: "123" });
      expect(res.statusCode).toBe(400);
    });
    it("should return 409 if user already exists", async () => {
      const email = `dup-${Date.now()}@example.com`;
      await User.create({ email, password: await bcrypt.hash("Password123", 10) });

      const res = await request(app).post("/api/auth/register").send({ email, password: "Password123" });
      expect(res.statusCode).toBe(409);
    });
    it("should return 401 if login credentials are invalid", async () => {
      const res = await request(app).post("/api/auth/login").send({ email: "notexist@example.com", password: "wrongpass" });
      expect(res.statusCode).toBe(401);
    });
  });

});