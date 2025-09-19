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


describe("GET /api/sweets/search", () => {
  it("should not allow searching sweets without token", async () => {
    const res = await request(app)
      .get("/api/sweets/search?name=Ladoo");
    expect(res.status).toBe(401); // Expect unauthorized
  });

  it("should return sweets filtered by name with valid token", async () => {
    const res = await request(app)
      .get("/api/sweets/search?name=Ladoo")
      .set("Authorization", `Bearer ${token}`);

    // This will fail initially because the endpoint doesn't exist yet
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body[0]).toHaveProperty("name", "Ladoo");
  });

  it("should return sweets filtered by category with valid token", async () => {
    const res = await request(app)
      .get("/api/sweets/search?category=Indian")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("should return sweets filtered by price range with valid token", async () => {
    const res = await request(app)
      .get("/api/sweets/search?minPrice=5&maxPrice=15")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});


describe("PUT /api/sweets/:id", () => {
  it("should not allow updating a sweet without token", async () => {
    const sweet = await request(app)
      .post("/api/sweets")
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "Barfi", category: "Indian", price: 20 });

    const res = await request(app)
      .put(`/api/sweets/${sweet.body._id}`)
      .send({ name: "Barfi Updated" });

    expect(res.status).toBe(401);
  });

  it("should update a sweet with valid token", async () => {
    const sweet = await request(app)
      .post("/api/sweets")
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "Barfi", category: "Indian", price: 20 });

    const res = await request(app)
      .put(`/api/sweets/${sweet.body._id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "Barfi Updated", price: 25 });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("_id", sweet.body._id);
    expect(res.body.name).toBe("Barfi Updated");
    expect(res.body.price).toBe(25);
  });

  it("should return 404 if sweet not found", async () => {
    const fakeId = new mongoose.Types.ObjectId();
    const res = await request(app)
      .put(`/api/sweets/${fakeId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "Does Not Exist" });

    expect(res.status).toBe(404);
  });
});


describe("DELETE /api/sweets/:id", () => {
  let sweetId;

  beforeAll(async () => {
    // Create a sweet to delete
    const res = await request(app)
      .post("/api/sweets")
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "Barfi", category: "Indian", price: 20 });
    sweetId = res.body._id;
  });

  it("should not allow deleting a sweet without token", async () => {
    const res = await request(app).delete(`/api/sweets/${sweetId}`);
    expect(res.status).toBe(401);
  });

  it("should not allow deleting a sweet if not admin", async () => {
    const res = await request(app)
      .delete(`/api/sweets/${sweetId}`)
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(403); // Forbidden
  });

  it("should allow admin to delete a sweet", async () => {
    // First, register and login admin
    const adminEmail = `admin-${Date.now()}@example.com`;
    const adminPassword = "AdminPass123";

    await request(app)
      .post("/api/auth/register")
      .send({ email: adminEmail, password: adminPassword, role: "admin" });

    const loginRes = await request(app)
      .post("/api/auth/login")
      .send({ email: adminEmail, password: adminPassword });

    const adminToken = loginRes.body.token;

    const res = await request(app)
      .delete(`/api/sweets/${sweetId}`)
      .set("Authorization", `Bearer ${adminToken}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("message", "Sweet deleted successfully");
  });
});
