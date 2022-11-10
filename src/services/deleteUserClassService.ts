import prisma from "../prisma";
import { AppError } from "../utils/AppError";

interface IDeleteUserClassResponse {
  message: string;
}

class DeleteUserClassService {
  async execute(
    userId: string,
    classId: string
  ): Promise<IDeleteUserClassResponse> {
    // validar se os parâmetros foram recebidos
    if (!userId) {
      throw new AppError("userId not found on request param", 422);
    } else if (!classId) {
      throw new AppError("classId not found on request params", 422);
    }

    // verificar se a aula existe
    const classExists = await prisma.class.findFirst({
      where: {
        id: classId,
      },
    });

    // de a aula não existir no banco retornar um erro
    if (!classExists) {
      throw new AppError("class does not exist", 404);
    }

    // deletar a aula
    await prisma.usersOnClasses.delete({
      where: {
        classId_userId: {
          classId,
          userId,
        },
      },
    });

    return { message: "class deleted succesfully" };
  }
}

export { DeleteUserClassService };
