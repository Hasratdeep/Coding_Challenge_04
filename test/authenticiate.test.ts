import { api } from "./testSetup";

describe("Authentication Middleware", () => {
  test("should reject missing Authorization header", async () => {
    const res = await api.get("/api/v1/users/profile");
    expect(res.status).toBe(401);
  });

  test("should reject invalid token", async () => {
    const res = await api
      .get("/api/v1/users/profile")
      .set("Authorization", "Bearer invalid-token");
    expect(res.status).toBe(401);
  });

  test("should allow valid token and return profile", async () => {
    const res = await api
      .get("/api/v1/users/profile")
      .set("Authorization", "Bearer valid-user-token");
    expect(res.status).toBe(200);
    expect(res.body.userId).toBe("user123");
  });
});
