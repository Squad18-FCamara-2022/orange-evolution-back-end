import { AppError } from "../../utils/AppError";
import prisma from "../../prisma";
import { UsersOnClasses } from "@prisma/client";

interface ICreateUserClassService {
  message: string;
}
class CreateUserClassService {
  async execute(
    userId: string,
    classId: string
  ): Promise<ICreateUserClassService> {
    // validar se os parâmetros foram recebidos
    if (!userId) {
      throw new AppError("userId not found on request param", 422);
    } else if (!classId) {
      throw new AppError("classId not found on request params", 422);
    }

    // verificar se o usuário já fez aquela aula
    const usersOnClassAlreadyExists = await prisma.usersOnClasses.findFirst({
      where: {
        AND: [
          {
            classId,
          },
          {
            userId,
          },
        ],
      },
    });

    if (usersOnClassAlreadyExists) {
      throw new AppError("class already exist", 409);
    }

    // verificar se a aula existe
    const classExists = await prisma.class.findFirst({
      where: {
        id: classId,
      },
    });

    // se a aula não existir no banco retornar um erro
    if (!classExists) {
      throw new AppError("class does not exist", 404);
    }

    // criar aula no banco
    await prisma.usersOnClasses.create({
      data: {
        classId,
        userId,
      },
    });

    return { message: "class created successfuly" };
  }
}

export { CreateUserClassService };
