const express = require("express");

const server = express();

server.use(express.json());

const users = [
  "Paulo",
  "João Victor",
  "Vitor",
  "Rafaela",
  "Beatriz",
  "Gabriel",
  "Matheus"
];

//CRUD - Criação (Create), Leitura (Read), Atualização (Update) e Exclusão (Delete)

//Middleware - Função que recebe o request e response e executa algumas ações

//Middleware global
server.use((request, response, next) => {
  console.time("Request"); //Inicia contador de tempo
  console.log(`Log modelo01 - METHOD: ${request.method}; URL: ${request.url}`);
  next(); //Segue para a próxima atividade em fila de execução
  console.timeEnd("Request"); //Finaliza contador de tempo
});

function checkUsersInArray(request, response, next) {
  const user = users[request.params.index];

  if (!user) {
    return response.status(400).json({ Error: "Users does not exists" });
  }

  request.user = user;

  return next();
}

//Middleware - GET (Único usuário)
server.get("/users/:index", checkUsersInArray, (request, response) => {
  // const nome = request.query.nome;
  // const id = request.params.id;
  // const { index } = request.params; // Desestruturação

  // return response.json({
  //   message: `Hello World ${users[index]} your id is ${index}`
  // });
  return response.json({ message: `Hello ${request.user} how are you?` });
});

//Middleware - GET (Todos os usuários)
server.get("/users", (request, response) => {
  return response.json(users);
});

//Middleware local - Verificação do corpo da requisição
function checkUsersExists(request, response, next) {
  if (!request.body.name) {
    return response
      .status(400)
      .json({ Error: "User not found on request body" });
  }
  return next();
}

//Middleware - POST
server.post("/users", checkUsersExists, (request, response) => {
  const { name } = request.body;

  users.push(name);

  return response.json(users);
});

//Middleware - PUT
server.put(
  "/users/:index",
  checkUsersExists,
  checkUsersInArray,
  (request, response) => {
    const { index } = request.params;
    const { name } = request.body;

    users[index] = name;

    return response.json(users);
  }
);

//Middleware - DELETE
server.delete("/users/:index", (request, response) => {
  const { index } = request.params;

  users.splice(index, 1);

  return response.send();
});

server.listen(3000);
