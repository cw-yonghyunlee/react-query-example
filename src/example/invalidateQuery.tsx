import React from 'react';
import { useQuery, useQueryClient } from 'react-query';

type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}
type Todos = ReadonlyArray<Todo>

async function fetchTodos(): Promise<Todos> {
  const response = await fetch(`https://jsonplaceholder.typicode.com/users/1/todos`);
  return response.json();
}

function InvalidateQuery() {
  const queryClient = useQueryClient();
  const query = useQuery('todos', fetchTodos, {
    staleTime: Infinity,
    initialData: () => [],
  });

  return (
    <div>
      <h1>To Do (InvalidQuery)</h1>
      <div>
        <button onClick={() => queryClient.invalidateQueries('todos')}>invalid & query</button>
      </div>
      <div>
        {query.data?.map(item => <p key={item.id}>{item.id} {item.title}</p>)}
      </div>
    </div>
  );
}

export default InvalidateQuery;
