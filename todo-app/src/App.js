import react, { useState, useRef, useCallback }from 'react';
import TodoTemplate from './components/TodoTemplate'
import TodoInsert from './components/TodoInsert';
import TodoList from './components/TodoList';

function createBulkTodos() {
  const array = [];
  for(let i = 0; i < 2500; i++) {
    array.push({
      id : i,
      text: `할 일 ${i}`,
      checked: false,
    })
  }
  return array;
}

const App = () => {
  const [todos, setTodos] = useState(
    createBulkTodos
  );

  // primary key => id, ref 사용해 변수 담기
  const nextId = useRef(2501); // 다음 id -> 4

  // Insert 기능 구현
  const onInsert = useCallback(
    text => {
      const todo = {
        id: nextId.current,
        text,
        checked: false,
      };
      setTodos(todos => todos.concat(todo));
      nextId.current += 1;
    }, [todos],
  )
  
  // Remove 기능 구현
  const onRemove = useCallback( 
    id => { 
        setTodos(todos => todos.filter(todo => todo.id !== id));
    }, [todos],
    );

  // 수정 기능 구현
  const onToggle = useCallback(
    id => {
      setTodos( todos =>
        todos.map(todo => 
          // map -> 해당 배열을 전체적으로 변형하여 새로운 배열을 만드는 내장 함수
          // 각 원소(todo)의 해당 id에 도달한 경우 -> checked를 뒤집고 붙이기, 해당 id가 아니면 -> todo 그대로 붙이면서
          todo.id === id ? {...todo, checked: !todo.checked } : todo,
        ),
      );
    }, [todos],
  );

  return(
    <TodoTemplate>
    <TodoInsert onInsert={onInsert}/>
    <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle}/>
    </TodoTemplate>
  );
}

export default App;
// Component들은 반드시 이름 앞이 대문자!