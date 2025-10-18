import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeValideteCheckInUseCase } from "../../../use-cases/factories/make-validate-check-in-use-case";

export async function validate(request: FastifyRequest, reply: FastifyReply) {
  const validateCheckInParamsSchema = z.object({
    checkInId: z.string().uuid(),
  });

  const { checkInId } = validateCheckInParamsSchema.parse(request.params);

  const validateCheckInsUseCase = makeValideteCheckInUseCase();

  await validateCheckInsUseCase.execute({
    checkInId,
  });

  return reply.status(204).send();
}
