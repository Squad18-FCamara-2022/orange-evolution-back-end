import { AppError } from "../../utils/AppError";
import prisma from "../../prisma";
import { Class } from "@prisma/client";

interface ICreateUserClassService {
  message: string;
  userCategoryDoneClasses: Class[];
}
class CreateUserClassService {
  async execute(
    userId: string,
    classId: string,
    categoryId: string
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
      throw new AppError("userClass already exists", 409);
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

    // buscar todas as aulas que o usuário já fez da categoria
    const userCategoryDoneClasses = await prisma.class.findMany({
      where: {
        AND: [
          {
            categoryId,
          },
          {
            UsersOnClasses: {
              some: {
                userId,
              },
            },
          },
        ],
      },
    });

    return {
      message: "user class created successfully",
      userCategoryDoneClasses,
    };
  }
}

export { CreateUserClassService };
