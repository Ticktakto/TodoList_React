import react, { useState, useRef, useCallback }from 'react';
import TodoTemplate from './components/TodoTemplate'
import TodoInsert from './components/TodoInsert';
import TodoList from './components/TodoList';

const App = () => {
  const [todos, setTodos] = useState([
    {
      id: 1,
      text: '리액트의 기초 알아보기',
      checked: true,
    },
    {
      id: 2,
      text: '컴포넌트 스타일링 해 보기',
      checked: true,
    },
    {
      id: 3,
      text: '일정 관리 앱 만들어 보기',
      checked: false,
    },
  ]);

  // primary key => id, ref 사용해 변수 담기
  const nextId = useRef(4); // 다음 id -> 4

  // Insert 기능 구현
  const onInsert = useCallback(
    text => {
      const todo = {
        id: nextId.current,
        text,
        checked: false,
      };
      setTodos(todos.concat(todo));
      nextId.current += 1;
    }, [todos],
  )

  const onRemove = useCallback( 
    id => { 
        setTodos(todos.filter(todo => todo.id !== id));
    }, [todos],
    );

  return(
    <TodoTemplate>
    <TodoInsert onInsert={onInsert}/>
    <TodoList todos={todos} onRemove={onRemove}/>
    </TodoTemplate>
  );
}

export default App;
// Component들은 반드시 이름 앞이 대문자!