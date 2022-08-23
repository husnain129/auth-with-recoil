import { Button, HStack, Input, Text, VStack } from '@chakra-ui/react';
import type { NextPage } from 'next';
import { useState } from 'react';
import { atom, selector, useRecoilValue, useSetRecoilState } from 'recoil';

const todoListState = atom<string[]>({
  key: 'TodoList',
  default: [],
});

const todoListSelector = selector({
  key: 'TodoListSelector',
  get: ({ get }) => {
    const todoList = get(todoListState);
    return todoList.map((e) => e + '_');
  },
});

const Home: NextPage = () => {
  const setTodoList = useSetRecoilState(todoListState);
  const listSelector = useRecoilValue(todoListSelector);
  const [item, setItem] = useState('');
  const handleTodo = () => {
    setTodoList((pre) => [...pre, item]);
  };
  return (
    <VStack alignItems={'center'} pt="5vh" w="full" h="100vh">
      <HStack>
        <Input
          placeholder="Enter item"
          value={item}
          onChange={(e) => setItem(e.target.value)}
          type={'text'}
        />
        <Button onClick={handleTodo}>Submit</Button>
      </HStack>
      {listSelector.map((item, index) => (
        <Text key={index}>{item}</Text>
      ))}
    </VStack>
  );
};

export default Home;
