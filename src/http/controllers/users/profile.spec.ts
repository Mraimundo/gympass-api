import request from "supertest";
import { app } from "@/app";
import { afterAll, beforeAll, describe, it, expect } from "vitest";

describe("Profile (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to get user profile", async () => {
    await request(app.server).post("/users").send({
      name: "John Doe",
      email: "johndoe@gmail.com",
      password: "123456",
    });

    const authResponse = await request(app.server).post("/sessions").send({
      email: "johndoe@gmail.com",
      password: "123456",
    });

    expect(authResponse.statusCode).toEqual(200);
    expect(authResponse.body).toHaveProperty("token");

    const { token } = authResponse.body;

    const profileResponse = await request(app.server)
      .get("/me")
      .set("Authorization", `Bearer ${token}`);

    expect(profileResponse.statusCode).toEqual(200);

    const userData = profileResponse.body.user ?? profileResponse.body;

    expect(userData).toEqual(
      expect.objectContaining({
        email: "johndoe@gmail.com",
      })
    );
  });
});
