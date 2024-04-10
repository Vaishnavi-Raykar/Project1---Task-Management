// myTasks.js

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const MyTasksPage = () => {
  const { data: session } = useSession();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Fetch tasks associated with the logged-in user
    const fetchTasks = async () => {
      try {
        const response = await fetch(`/api/tasks?userId=${session.user.id}`);
        if (response.ok) {
          const tasksData = await response.json();
          setTasks(tasksData.tasks);
        } else {
          console.error("Failed to fetch tasks");
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    if (session) {
      fetchTasks();
    }
  }, [session]);

  return (
    <div>
      <h1>My Tasks</h1>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            {task.title} - {task.description} {/* Display task details */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyTasksPage;
