import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository";
import { SearchGymsUseCase } from "../seach-gyms";

export function makeSearchGymsUseCase() {
  const gymsRepository = new PrismaGymsRepository();
  const useCase = new SearchGymsUseCase(gymsRepository);
  return useCase;
}
