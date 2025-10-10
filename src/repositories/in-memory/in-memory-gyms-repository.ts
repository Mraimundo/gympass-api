import { Gym, Prisma } from "generated/prisma/client";
import { randomUUID } from "node:crypto";

export class InMemoryGymsRepository {
  public gyms: Gym[] = [];

  async findById(id: string) {
    const gym = this.gyms.find((gym) => gym.id === id);

    if (!gym) {
      return null;
    }

    return gym;
  }

  async searchMany(query: string, page: number) {
    return this.gyms
      .filter((gym) => gym.title.includes(query))
      .slice((page - 1) * 20, page * 20);
  }

  async create(data: Prisma.GymCreateInput) {
    const gym = {
      id: data.id ?? randomUUID(),
      title: data.title,
      description: data.description ?? null,
      phone: data.phone ?? null,
      latitude:
        typeof data.latitude === "number"
          ? data.latitude
          : Number(data.latitude),
      longitude:
        typeof data.longitude === "number"
          ? data.longitude
          : Number(data.longitude),
      created_at: new Date(),
    };

    this.gyms.push(gym);

    return gym;
  }
}
