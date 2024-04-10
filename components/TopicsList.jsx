"use client"
import { useEffect, useState } from 'react';
import Link from "next/link";
import RemoveBtn from "./RemoveBtn";
import { HiPencilAlt } from "react-icons/hi";
import { FaGithub } from "react-icons/fa";
import { useSession } from "next-auth/react";

const getTopics = async () => {
  try {
    const res = await fetch(`http://localhost:3000/api/topics`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch topics");
    }

    return res.json();
  } catch (error) {
    console.log("Error loading topics: ", error);
    throw error;
  }
};

const filterTopics = (topics, email) => {
  if (!topics || !Array.isArray(topics)) {
    return [];
  }
  if (email === "admin@gmail.com") {
    return topics;
  }
  return topics.filter((t) => t.email === email);
};

export default function TopicsList() {
  const { data: session, status } = useSession();
  const [filteredTopics, setFilteredTopics] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'authenticated') {
      const fetchData = async () => {
        try {
          const { topics } = await getTopics();
          const email = session?.user?.email;
          const filtered = filterTopics(topics, email);
          setFilteredTopics(filtered);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching or filtering topics: ", error);
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [session, status]);

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {filteredTopics.length > 0 ? (
            filteredTopics.map((t) => (
              <div
              key={t._id}
              className="p-4 border border-slate-300 my-3 flex justify-between items-start rounded-md bg-gray-100 shadow-md"
            >
              <div className="flex-1">
                <h2 className="font-bold text-2xl text-gray-800">{t.title}</h2>
                <div className="text-gray-600">{t.description}</div>
                <div>
                  <a
                    href={t.github}
                    className="flex justify-center items-center text-3xl w-full text-gray-600 hover:text-gray-800"
                  >
                    <FaGithub />
                  </a>
                </div>
              </div>
            
              <div className="flex gap-2 items-center">
                <RemoveBtn id={t._id} />
                <Link href={`/editTopic/${t._id}`}>
                  <HiPencilAlt size={24} className="text-gray-600 hover:text-gray-800 cursor-pointer" />
                </Link>
              </div>
            </div>
            
            ))
          ) : (
            <div className='flex justify-center items-center w-full h-screen text-3xl font-semibold max-sm:text-lg'>No topics found</div>
          )}
        </div>
      )}
    </>
  );
}
