import { Category } from "@prisma/client";
import prisma from "../prisma";

class GetCategoriesService {
  async execute(trackId: string): Promise<Category[]> {
    // pegar todas as categorias no banco
    const categories = await prisma.category.findMany({
      where: {
        trackId,
      },
      include: {
        classes: true,
      },
    });

    return categories;
  }
}

export { GetCategoriesService };
