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

function Basic() {
  const [ state, setState ] = useState<State>('all');
  const query = useQuery(['todos', state], async () => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/1/todos`);
    const json = await response.json();
    return (json as Todos).filter(todo => state === 'done' ? !todo.completed : true);
  });

  return (
    <div>
      <h1>To Do (Basic)</h1>
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

export default Basic;
