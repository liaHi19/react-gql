import { VStack } from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/react";
import { useQuery, useMutation } from "@apollo/client";

import TodoItem from "./TodoItem";
import TotalCount from "./TotalCount";

import { ALL_TODOS, UPDATE_TODO, REMOVE_TODO } from "../apollo/todos";

const TodoList = () => {
  const { data, error, loading } = useQuery(ALL_TODOS);
  const [toggleTodo, { error: updateError }] = useMutation(UPDATE_TODO);
  const [removeTodo, { error: removeError }] = useMutation(REMOVE_TODO, {
    update(cache, { data: { removeTodo } }) {
      cache.modify({
        fields: {
          allTodos(currentTodos = []) {
            return currentTodos.filter(
              (todo) => todo.__ref !== `Todo:${removeTodo.id}`
            );
          },
        },
      });
    },
  });

  if (loading) {
    return <Spinner />;
  }

  if (error || updateError || removeError) {
    return <h2>Error...</h2>;
  }

  return (
    <>
      <VStack spacing={2} mt={4}>
        {data.todos.map((todo) => (
          <TodoItem
            key={todo.id}
            {...todo}
            toggleTodo={toggleTodo}
            onDelete={removeTodo}
          />
        ))}
      </VStack>
      <TotalCount />
    </>
  );
};

export default TodoList;
