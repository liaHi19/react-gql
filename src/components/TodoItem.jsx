import { Checkbox, Text, CloseButton, HStack } from "@chakra-ui/react";

const TodoItem = ({ id, title, completed, toggleTodo, onDelete }) => {
  const onDeleteTodo = () => {
    onDelete({
      variables: {
        id,
      },
    });
  };
  return (
    <HStack spacing={3}>
      <Checkbox
        isChecked={completed}
        onChange={() =>
          toggleTodo({
            variables: {
              id,
              completed: !completed,
            },
          })
        }
      />
      <Text>{title}</Text>
      <CloseButton onClick={onDeleteTodo} />
    </HStack>
  );
};

export default TodoItem;
