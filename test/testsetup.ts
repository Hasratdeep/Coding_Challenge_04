import app from "../app";

// Mock Firebase Admin SDK
jest.mock("firebase-admin", () => ({
  initializeApp: jest.fn(),
  credential: { cert: jest.fn() },
}));

jest.mock("firebase-admin/auth", () => ({
  getAuth: () => ({
    verifyIdToken: jest.fn().mockImplementation((token) => {
      if (token === "valid-user-token") {
        return Promise.resolve({ uid: "user123", role: "user" });
      } else if (token === "valid-admin-token") {
        return Promise.resolve({ uid: "admin123", role: "admin" });
      } else {
        throw new Error("Invalid token");
      }
    }),
  }),
}));

// supertest instance for your Express app
export const api = request(app);
