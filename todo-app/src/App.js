import react from 'react';
import TodoTemplate from './components/TodoTemplate'
import TodoInsert from './components/TodoInsert';
import TodoList from './components/TodoList';

const App = () => {
  return(
    <TodoTemplate>
    <TodoInsert />
    <TodoList />
    </TodoTemplate>
  );
}

export default App;
// Component들은 반드시 이름 앞이 대문자!