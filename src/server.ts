import { app } from "./app";

/* iniciando o servidor com o express (lembrando que app = express()), na porta
400, se estiver no ambiente de desenvolvimento ou na porta definida pelo servidor
se estiver em produção (process.env.PORT) */

app.listen(process.env.PORT || 4000, function () {
  console.log(
    "Express server listening on port %d in %s mode",
    this.address().port,
    app.settings.env
  );
});
