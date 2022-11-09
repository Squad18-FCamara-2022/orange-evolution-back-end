import { Router } from "express";
import { CreateUserAccountController } from "./controllers/createUserAccontController";
import { LoginController } from "./controllers/loginController";
import { GetTracksController } from "./controllers/getTracksController";
import { GetCategoriesController } from "./controllers/getCategoriesController";
import { ensureAuthenticated } from "./middleware/ensureAuthenticated";

// defino a variável router que vai representar o Router que vem do express
const router = Router();

// rota de cadastro
router.post("/signup", new CreateUserAccountController().handle);

// rota de login
router.post("/login", new LoginController().handle);

// rota de busca das trilhas
router.get("/getTracks", ensureAuthenticated, new GetTracksController().handle);

// rota de busca das categorias (as aulas vão junto)
router.get(
  "/getCategories/:id",
  ensureAuthenticated,
  new GetCategoriesController().handle
);

export { router };
