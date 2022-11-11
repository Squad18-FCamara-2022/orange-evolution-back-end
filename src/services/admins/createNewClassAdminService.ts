import { AppError } from "../../utils/AppError";
import prisma from "../../prisma";

interface ICreateNewClassAdminService {
  title: string;
  contentType: string;
  author: string;
  duration: number;
  link: string;
  categoryId: string;
  userId: string;
}

interface ICreateNewClassAdminResponse {
  message: string;
}

class CreateNewClassAdminService {
  async execute({
    author,
    categoryId,
    contentType,
    duration,
    link,
    title,
    userId,
  }: ICreateNewClassAdminService): Promise<ICreateNewClassAdminResponse> {
    if (!author) {
      throw new AppError("author not found on request body", 422);
    } else if (!categoryId) {
      throw new AppError("categoryId not found on request body", 422);
    } else if (!contentType) {
      throw new AppError("contentType not found on reques body", 422);
    } else if (duration === undefined) {
      throw new AppError("duration not found on request body", 422);
    } else if (!link) {
      throw new AppError("link not found on request body", 422);
    } else if (!title) {
      throw new AppError("title not found on request body", 422);
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

    // se não for admin retornar um erro
    if (!user) {
      throw new AppError("only admins users can create new classes", 401);
    }

    // criar aula no banco
    await prisma.class.create({
      data: {
        author,
        contentType,
        duration,
        link,
        title,
        categoryId,
      },
    });

    return { message: "class created successfully" };
  }
}

export { CreateNewClassAdminService };
