const request = require("supertest");
const app = require("../src/app");

describe("Auth API", () => {
  describe("POST /api/auth/register", () => {
    it("should create a new user with email and password", async () => {
      const res = await request(app)
        .post("/api/auth/register")
        .send({ email: "test@example.com", password: "Password123" });

      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty("userId");
      expect(res.body).toHaveProperty("email", "test@example.com");
    });
  });
});