import { Router } from "express";
import { CreateUserAccountController } from "./controllers/createUserAccontController";
import { LoginController } from "./controllers/loginController";
import { GetUserTrackController } from "./controllers/users/getUserTrackController";
import { ensureAuthenticated } from "./middleware/ensureAuthenticated";
import { DeleteUserClassController } from "./controllers/users/deleteUserClassController";
import { CreateUserClassController } from "./controllers/users/createUserClassController";
import { GetTracksAdminController } from "./controllers/admins/getTrakcsAdminController";
import { CreateNewClassAdminController } from "./controllers/admins/createNewClassAdminController";
import { DeleteClassAdminController } from "./controllers/admins/deleteClassAdminController";

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

// rota para criar uma aula na tabela userOnClasses
router.post(
  "/createUserClass/:id",
  ensureAuthenticated,
  new CreateUserClassController().handle
);

// rota para deletar uma aula feita pelo usuário
router.delete(
  "/deleteUserClass/:id",
  ensureAuthenticated,
  new DeleteUserClassController().handle
);

// rota para o admin buscar todas as aulas de todas as trilhas
router.get(
  "/getTracksAdmin",
  ensureAuthenticated,
  new GetTracksAdminController().handle
);

// rota para o admin criar uma aula nova
router.post(
  "/createNewClassAdmin/:id",
  ensureAuthenticated,
  new CreateNewClassAdminController().handle
);

// rota para o admin deletar uma aula
router.delete(
  "/deleteClassAdmin/:id",
  ensureAuthenticated,
  new DeleteClassAdminController().handle
);

export { router };
