import { v4 as uuidv4 } from "uuid";
export function createTodosModel(todos) {
   return {
      todosIds: [],
      todosById: {},
      addTodo: function ({ title }) {
         const todo = {
            title,
            done: false,
            id: uuidv4(),
         };

         this.todosIds.push(todo.id);
         this.todosById[todo.id] = todo;
         return todo;
      },
      setTodos: function (todos) {
         this.todosIds = [];
         this.todosById = {};
         todos.forEach((todo) => {
            this.todosIds.push(todo.id);
            this.todosById[todo.id] = todo;
         });
      },
      getTodos: function () {
         return {
            todosById: this.todosById,
            todosIds: this.todosIds,
         };
      },

      clear: function () {
         this.todosIds = [];
      },
      toggleTodo: function (id) {
         this.todosById[id].done = !this.todosById[id].done;
      },
   };
}
