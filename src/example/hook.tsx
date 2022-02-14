import React, { useState } from 'react';
import { useQuery } from 'react-query';

type State = 'all' | 'open' | 'done'
type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}
type Todos = ReadonlyArray<Todo>

const fetchTodos = async (state: State): Promise<Todos> => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/users/1/todos`);
  const json = await response.json();
  const filteredData = (json as Todos).filter(todo => state === 'done' ? !todo.completed : true);
  return new Promise(resolve => {
    resolve(filteredData);
  });
}

const useTodosQuery = (state: State) =>
  useQuery(['todos', state], () => fetchTodos(state))

function Hook() {
  const [ state, setState ] = useState<State>('all');
  const query = useTodosQuery(state);

  return (
    <div>
      <h1>To Do</h1>
      <div>
        <button onClick={() => setState('open')}>open</button>
        <button onClick={() => setState('done')}>done</button>
      </div>
      <div>
        {query.data?.map(item => <p key={item.id}>{item.id} {item.title}</p>)}
      </div>
    </div>
  );
}

export default Hook;
