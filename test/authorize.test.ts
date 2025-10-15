import { api } from "./utils/testSetup";

describe("Authorization Middleware", () => {
  test("should deny access if user role is not admin", async () => {
    const res = await api
      .delete("/api/v1/users/target123")
      .set("Authorization", "Bearer valid-user-token");
    expect(res.status).toBe(403);
  });

  test("should allow admin role to delete user", async () => {
    const res = await api
      .delete("/api/v1/users/target123")
      .set("Authorization", "Bearer valid-admin-token");
    expect(res.status).toBe(200);
    expect(res.body.message).toContain("deleted by admin");
  });
});
