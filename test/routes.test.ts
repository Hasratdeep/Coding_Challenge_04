import { api } from "./utils/testSetup";

describe("Routes Integration", () => {
  test("GET /api/v1/users/profile returns user data", async () => {
    const res = await api
      .get("/api/v1/users/profile")
      .set("Authorization", "Bearer valid-user-token");
    expect(res.status).toBe(200);
    expect(res.body.userId).toBe("user123");
  });

  test("DELETE /api/v1/users/:id - admin can delete", async () => {
    const res = await api
      .delete("/api/v1/users/target123")
      .set("Authorization", "Bearer valid-admin-token");
    expect(res.status).toBe(200);
  });
});
