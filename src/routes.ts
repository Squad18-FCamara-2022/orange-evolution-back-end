import { Router } from "express";
import { CreateUserAccountController } from "./controllers/createUserAccontController";
import { LoginController } from "./controllers/loginController";
import { GetUserTrackController } from "./controllers/getUserTrackController";
import { ensureAuthenticated } from "./middleware/ensureAuthenticated";

// defino a variável router que vai representar o Router que vem do express
const router = Router();

// rota de cadastro
router.post("/signup", new CreateUserAccountController().handle);

// rota de login
router.post("/login", new LoginController().handle);

// rota de buscar a trilha. Retorna todas as categorias e todas as aulas de uma trilha
router.get(
  "/getUserTrack/:id",
  ensureAuthenticated,
  new GetUserTrackController().handle
);

export { router };
