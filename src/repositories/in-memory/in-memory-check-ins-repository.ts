import { randomUUID } from "node:crypto";
import { CheckIn, Prisma } from "generated/prisma/client";
import { CheckInsRepository } from "../check-ins-repository";

export class InMemoryCheckInsRepository implements CheckInsRepository {
  public users: CheckIn[] = [];

  async findByUserIdOnDate(userId: string, data: Date) {
    const checkInOnSameDate = this.users.find(
      (checkIn) => checkIn.user_id === userId
    );

    if (!checkInOnSameDate) {
      return null;
    }

    return checkInOnSameDate;
  }

  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn = {
      id: randomUUID(),
      user_id: data.user_id,
      gym_id: data.gym_id,
      validated_at: data.validated_at ? new Date(data.validated_at) : null,
      created_at: new Date(),
    };

    this.users.push(checkIn);

    return checkIn;
  }
}
