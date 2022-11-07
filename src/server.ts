import express, { Request } from "express";

interface IRequestNomeCompleto extends Request {
  body: {
    name: string;
    lastName: string;
  };
}

// o app é constante que vai representar o express
const app = express();

app.use(express.json());

// criar uma rota que não recebe nada (nem no hardears nem no body) e retorna uma 
// msg de boa tarde.

app.get("/boaTarde", (request, response) => {
  return response.status(200).json({ message: "boa tarde" });
});

app.get("/HelloWorld", (request, response) => {
  return response.status(200).json({ message: "Hello Word" });
});

//criar uma rota que recebe o nome e sobrenome separados e retorna o nome completo 
// ao contrario.

app.post("/nomeCompletoInvertido", (request: IRequestNomeCompleto, response) => {
  // constante que vai receber o nome completo retirado de dentro do body (corpo) 
  // da request
  const nomeCompletoInvertido = request.body.lastName + " " + request.body.name;
  //imprimindo o que tem dentro do headers da msg
  console.log(request.headers) 

return response.status(200).json(nomeCompletoInvertido);
});

  app.post("/nomeCompleto", (request: IRequestNomeCompleto, response) => {
    // constante que vai receber o nome completo retirado de dentro do body (corpo) 
    // da request
    const nomeCompleto = request.body.name + " " + request.body.lastName;
    //imprimindo o que tem dentro do headers da msg
    console.log(request.headers)
  
  
      return response.status(200).json(nomeCompleto);
});


// rota do tipo GET que retorna uma mensagem Hello World


// rota do tipo POST que recebe o nome e sobrenome separados e retorna eles juntos


// até o momento só tem 2 rotas nesse servidor, preciso criar mais 2 para no final ter duas rotas do tipo get(uma retorna "hello world" e a outra 
// retorna boa tarde) e 2 rotas do tipo Post(uma retorna o nome completo e a outra retorna o nome completo invertido.) 


// Porta que o servidor esta rodando
app.listen(3333);



// a request é como se fosse um documento dividido em varias partes
// quando a gente quer acessar uma informação procuramos em uma dessas partes
