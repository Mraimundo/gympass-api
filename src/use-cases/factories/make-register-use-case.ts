import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { RegisterUseCase } from "../register";

export function makeRegisterUseCase() {
  const pridmaUsersRepository = new PrismaUsersRepository();
  const registerUseCase = new RegisterUseCase(pridmaUsersRepository);
  return registerUseCase;
}
