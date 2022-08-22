import { VStack } from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/react";
import { useQuery, useMutation } from "@apollo/client";

import TodoItem from "./TodoItem";
import TotalCount from "./TotalCount";

import { ALL_TODOS, UPDATE_TODO } from "../apollo/todos";

const TodoList = () => {
  const { data, error, loading } = useQuery(ALL_TODOS);
  const [toggleTodo, { error: errorUpdate }] = useMutation(UPDATE_TODO);

  if (loading) {
    return <Spinner />;
  }

  if (error || errorUpdate) {
    return <h2>Error...</h2>;
  }

  return (
    <>
      <VStack spacing={2} mt={4}>
        {data.todos.map((todo) => (
          <TodoItem key={todo.id} {...todo} toggleTodo={toggleTodo} />
        ))}
      </VStack>
      <TotalCount />
    </>
  );
};

export default TodoList;
