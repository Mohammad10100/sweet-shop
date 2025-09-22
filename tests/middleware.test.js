const request = require("supertest");
const express = require("express");
const jwt = require("jsonwebtoken");
const { authMiddleware, isAdmin } = require("../src/middleware/auth");

const app = express();

// Routes to test the middleware
app.get("/protected", authMiddleware, (req, res) => {
  res.json({ message: "Access granted", user: req.user });
});

app.get("/admin", isAdmin, (req, res) => {
  res.json({ message: "Admin access granted", user: req.user });
});

describe("Auth Middleware", () => {
  const secret = "testsecret"; // use a test secret

  it("should block request without token", async () => {
    const res = await request(app).get("/protected");
    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty("error", "Access denied. No token provided.");
  });

  it("should block request with invalid token", async () => {
    const res = await request(app).get("/protected").set("Authorization", "Bearer invalidtoken");
    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty("error", "Invalid token.");
  });

  it("should allow request with valid token", async () => {
    const token = jwt.sign({ id: "user1", role: "user" }, secret);
    process.env.JWT_SECRET = secret; // override for test

    const res = await request(app).get("/protected").set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("message", "Access granted");
    expect(res.body.user).toMatchObject({ id: "user1", role: "user" });
  });
});

describe("isAdmin Middleware", () => {
  const secret = "testsecret";

  it("should block request without token", async () => {
    const res = await request(app).get("/admin");
    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty("error", "Access denied. No token provided.");
  });

  it("should block request with invalid token", async () => {
    const res = await request(app).get("/admin").set("Authorization", "Bearer invalidtoken");
    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty("error", "Invalid token.");
  });

  it("should block non-admin user", async () => {
    const token = jwt.sign({ id: "user2", role: "user" }, secret);
    process.env.JWT_SECRET = secret;

    const res = await request(app).get("/admin").set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(403);
    expect(res.body).toHaveProperty("error", "Access denied: Admins only");
  });

  it("should allow admin user", async () => {
    const token = jwt.sign({ id: "admin1", role: "admin" }, secret);
    process.env.JWT_SECRET = secret;

    const res = await request(app).get("/admin").set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("message", "Admin access granted");
    expect(res.body.user).toMatchObject({ id: "admin1", role: "admin" });
  });
});
