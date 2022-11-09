import { Router } from "express";
import { CreateUserAccountController } from "./controllers/createUserAccontController";
import { LoginController } from "./controllers/loginController";
import { GetTracksController } from "./controllers/getTracksController";
import { GetCategoriesController } from "./controllers/getCategoriesController";

// defino a variável router que vai representar o Router que vem do express
const router = Router();

// rota de cadastro
router.post("/signup", new CreateUserAccountController().handle);

// rota de login
router.post("/login", new LoginController().handle);

// rota de busca das trilhas
router.get("/gettracks", new GetTracksController().handle);

// rota de busca das categorias (as aulas vão junto)
router.get("/getcategories/:id", new GetCategoriesController().handle);

export { router };
