import { TODOS_STORAGE_KEY } from "./constants";
import { createTodosModel } from "./model";
import { createStorage } from "./storage";
import { createView } from "./view";

const inputNode = document.querySelector(".js-input");
const btnNode = document.querySelector(".js-btn");
const btnClearNode = document.querySelector(".js-clear-btn");

const initialTodos = [];
const model = createTodosModel(initialTodos);
const view = createView(".js-output", handleClick);
const storage = createStorage(TODOS_STORAGE_KEY);

storage.pull().then((todos) => {
   model.setTodos(todos);
   view.render(model.getTodos());
});

btnNode.addEventListener("click", function () {
   const todoTitle = inputNode.value;

   const todo = model.addTodo({ title: todoTitle });

   view.addTodo(todo);

   storage.push(todo);
});

btnClearNode.addEventListener("click", function () {
   storage.delete(model.getTodos());

   model.setTodos([]);

   view.clear();
});

function handleClick(id) {
   model.toggleTodo(id);
   storage.update(model.getTodos(id));
}
