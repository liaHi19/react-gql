import { Checkbox, Text, CloseButton, HStack } from "@chakra-ui/react";

const TodoItem = ({ id, title, completed, toggleTodo }) => {
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
      <CloseButton />
    </HStack>
  );
};

export default TodoItem;
