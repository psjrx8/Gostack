const express = require("express");

const server = express();

server.use(express.json());

const projects = [];

var requests = 0;

// Middleware global para controle de requisições
server.use((request, response, next) => {
  console.time("Request");
  next();
  console.log(`Total requests: ${++requests}`);
  console.timeEnd("Request");
});

// Lista de projetos no array
server.get("/projects", (request, response) => {
  return response.json(projects);
});

// Incluir projeto
server.post("/projects", (request, response) => {
  const { id, title, tasks } = request.body;
  var index = findIndexById(id);

  // Dois métodos
  if (index < 0) {
    if (tasks) {
      // Tarefas no corpo da requisição
      index = projects.push({ id, title, tasks }) - 1;
    } else {
      // Tarefas não definidas
      index = projects.push({ id, title, tasks: [] }) - 1;
    }
  } else {
    // Log de inclusão pra id existente
    console.log(`Project id ${id} already existis`);
  }

  return response.json(projects[index]);
});

// Inclusão de tarefas no projeto
server.post("/projects/:id/tasks", validInputId, (request, response) => {
  const { id } = request.params;
  const { title } = request.body;
  const index = findIndexById(id);

  projects[index].tasks.push(title);

  return response.json(projects[index]);
});

// Alteração do título de um projeto
server.put("/projects/:id", validInputId, (request, response) => {
  const { id } = request.params;
  const { title } = request.body;
  const index = findIndexById(id);

  projects[index].title = title;

  return response.json(projects[index]);
});

// Exclusão de um projeto
server.delete("/projects/:id", validInputId, (request, response) => {
  const { id } = request.params;
  const index = findIndexById(id);

  projects.splice(index, 1);

  return response.send();
});

// Identifica o índice no array com base no id do projeto
function findIndexById(id) {
  return projects.findIndex(project => project.id == id);
}

// Middleware local
// Valida se o id já foi cadastrado previamente
function validInputId(request, response, next) {
  const { id } = request.params;

  if (findIndexById(id) >= 0) return next();
  else return response.status(400).json({ message: "Project is not found" });
}

server.listen(3000);
