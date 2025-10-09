import { CheckIn, Prisma } from "generated/prisma";

export interface CheckInsRepository {
  findByUserIdOnDate(userId: string, data: Date): Promise<CheckIn | null>;
  findManyByUserId(userId: string, page: number): Promise<CheckIn[]>;
  countByUserId(userId: string): Promise<number>;
  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>;
}
