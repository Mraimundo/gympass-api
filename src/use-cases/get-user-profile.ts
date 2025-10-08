import { User } from "generated/prisma";
import { UsersRepository } from "@/repositories/users-repository";
import { ResouceNotFoundError } from "./errors/resouce-not-found-error";

interface GetUserProfileUseCaseRequest {
  userId: string;
}

interface GetUserProfileUseCaseResponse {
  user: User;
}

export class GetUserProfileUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    userId,
  }: GetUserProfileUseCaseRequest): Promise<GetUserProfileUseCaseResponse> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new ResouceNotFoundError();
    }

    return { user };
  }
}
