import { AppError } from "../../utils/AppError";
import prisma from "../../prisma";

class DeleteClassAdminService {
  async execute(classId: string, userId: string) {
    // validar se os parâmetros foram recebidos
    if (!classId) {
      throw new AppError("classId not found on request params", 422);
    } else if (!userId) {
      throw new AppError("userId not found on request params", 422);
    }

    // verificar se o user é admin
    const user = await prisma.user.findFirst({
      where: {
        AND: [
          {
            id: userId,
          },
          {
            role: "admin",
          },
        ],
      },
    });

    // se não for retornar um erro
    if (!user) {
      throw new AppError("only admins can delete classes", 401);
    }

    // deletar aula do banco
    await prisma.class.delete({
      where: {
        id: classId,
      },
    });

    return { message: "class deleted succesfuly" };
  }
}

export { DeleteClassAdminService };
