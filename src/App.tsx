import { useEffect, useState } from "react";
import Card from "./components/card";

type User = {
  id: number;
  name: string;
  email: string;
};

type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

export default function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [tasks, setTasks] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        setError(null);

        const [userResponse, todoResponse] = await Promise.all([
          fetch("https://jsonplaceholder.typicode.com/users"),
          fetch("https://jsonplaceholder.typicode.com/todos"),
        ]);

        if (!userResponse.ok || !todoResponse.ok) {
          throw new Error("Failed to fetch data");
        }

        const userData: User[] = await userResponse.json();
        const todoData: Todo[] = await todoResponse.json();

        setUsers(userData);
        setTasks(todoData);
      } catch (error) {
        setError("Could not load data. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [count]);

  if (isLoading) {
    return <p>Loading data...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (tasks.length === 0) {
    return <p>No tasks found</p>;
  }

  return (
    <>
      <h2>
        <b>Your TODO</b>
      </h2>

      <h3>Users</h3>

      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} - {user.email}
          </li>
        ))}
      </ul>

      {tasks.map((task) => (
        <Card
          key={task.id}
          entity={{
            id: task.id,
            name: task.title,
            extraproperty: task.userId,
          }}
          boolValue={task.completed}
        />
      ))}

      <button
        className="cursor-pointer"
        onClick={() => setCount(count + 1)}
      >
        Click {count}
      </button>
    </>
  );
}