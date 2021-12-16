import { TodosLocalStorage } from '@/modules/todos/infrastructure/todos.local-storage';

const outputs = {
  todosOutput: new TodosLocalStorage(),
};

export { outputs }