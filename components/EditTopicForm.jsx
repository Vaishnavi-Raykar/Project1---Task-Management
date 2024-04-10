"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EditTopicForm({ id, title, description,github }) {
  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);
  const [newGithub, setNewGithub] = useState(github);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:3000/api/topics/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ newTitle, newDescription, newGithub }),
      });

      if (!res.ok) {
        throw new Error("Failed to update task");
      }

      router.refresh();
      router.push("/seeTasks");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input
        onChange={(e) => setNewTitle(e.target.value)}
        value={newTitle}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Project Title"
      />

      <input
        onChange={(e) => setNewDescription(e.target.value)}
        value={newDescription}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Project Description"
      />

      <input
        onChange={(e) => setNewGithub(e.target.value)}
        value={newGithub}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Project Github Link"
      />

      <button className="bg-blue-800 font-bold text-white py-3 px-6 w-fit">
        Update Task
      </button>
    </form>
  );
}
