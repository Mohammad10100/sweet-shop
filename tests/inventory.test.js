const request = require("supertest");
const app = require("../src/app");
const mongoose = require("mongoose");
require("dotenv").config();

let token;
let sweetId;
const testEmail = `test-${Date.now()}@example.com`;
const password = "Password123";

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);

  // Register and login user
  await request(app)
    .post("/api/auth/register")
    .send({ email: testEmail, password });
  const res = await request(app)
    .post("/api/auth/login")
    .send({ email: testEmail, password });

  token = res.body.token;

  // Add a sweet to purchase
  const sweetRes = await request(app)
    .post("/api/sweets")
    .set("Authorization", `Bearer ${token}`)
    .send({ name: "Gulab Jamun", category: "Indian", price: 20, quantity: 5 });
  
  sweetId = sweetRes.body._id;
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("POST /api/sweets/:id/purchase", () => {
  it("should decrease the sweet quantity when purchased", async () => {
    const res = await request(app)
      .post(`/api/sweets/${sweetId}/purchase`)
      .set("Authorization", `Bearer ${token}`)
      .send({ quantity: 2 });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("message", "Purchase successful");
    expect(res.body.sweet.quantity).toBe(3); // 5 - 2 = 3
  });

  it("should not allow purchase without token", async () => {
    const res = await request(app)
      .post(`/api/sweets/${sweetId}/purchase`)
      .send({ quantity: 1 });
    
    expect(res.status).toBe(401);
  });

  it("should not allow purchase of more than available quantity", async () => {
    const res = await request(app)
      .post(`/api/sweets/${sweetId}/purchase`)
      .set("Authorization", `Bearer ${token}`)
      .send({ quantity: 10 });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("error", "Insufficient quantity");
  });
});
