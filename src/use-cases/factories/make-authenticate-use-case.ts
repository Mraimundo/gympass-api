import { PrismaUsersRepository } from "../../repositories/prisma/prisma-users-repository";
import { AuthenticateUseCase } from "../authenticate";

export function makeAuthenticateUseCase() {
  const pridmaUsersRepository = new PrismaUsersRepository();
  const authenticateUseCase = new AuthenticateUseCase(pridmaUsersRepository);
  return authenticateUseCase;
}
