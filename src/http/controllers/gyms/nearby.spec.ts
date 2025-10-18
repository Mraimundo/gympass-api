import request from "supertest";
import { app } from "../../../app";
import { afterAll, beforeAll, describe, it, expect } from "vitest";
import { createAndAuthenticateUser } from "../../../utils/test/create-and-authenticate-user";

describe("Search Gym (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to list nearby gyms", async () => {
    const { token } = await createAndAuthenticateUser(app, true);

    await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "JavaScript Gym",
        description: "Same description.",
        phone: "11999999999",
        latitude: -23.6581103,
        longitude: -46.759936,
      });

    await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "TypeScript Gym",
        description: "Same description.",
        phone: "11999999999",
        latitude: -23.5422991,
        longitude: -46.6105856,
      });

    const response = await request(app.server)
      .get("/gyms/nearby")
      .query({ latitude: -23.6581103, longitude: -46.759936 })
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(response.body.gyms).toHaveLength(1);
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: "JavaScript Gym",
      }),
    ]);
  });
});
