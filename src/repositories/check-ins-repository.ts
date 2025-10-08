import { CheckIn, Prisma } from "generated/prisma";

export interface CheckInsRepository {
  // countByUserId(userId: string): Promise<number>;
  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>;
  findByUserIdOnDate(userId: string, data: Date): Promise<CheckIn | null>;
}
