'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  jobType: string;
  description: string;
  userId: string;
  createdAt: string;
}

export default function Dashboard() {
  const { data: session, status } = useSession();
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    const fetchJobs = async () => {
      const res = await fetch('/api/jobs');
      const data = await res.json();
      setJobs(data);
    };

    fetchJobs();
  }, []);

  const handleDelete = async (id: string) => {
    const confirmed = confirm("Are you sure you want to delete this job?");
    if (!confirmed) return;

    const res = await fetch('/api/jobs', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
      credentials: 'include',
    });

    if (res.ok) {
      setJobs((prevJobs) => prevJobs.filter((job) => job.id !== id));
    } else {
      alert('Failed to delete job.');
    }
  };

  if (status === 'loading') return <div>Loading...</div>;
  if (!session) return <p className="text-center mt-10 text-red-600">Please log in to go dashboard.</p>;

  return (
    <main className="max-w-4xl mx-auto mt-10 p-8 bg-sky-200 rounded-md shadow">
      <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>

      <hr className="my-6" />

      <div className="space-y-2">
        {jobs.length === 0 ? (
          <p>No jobs posted.</p>
        ) : (
          jobs.map((job) => (
            <div key={job.id} className="flex justify-between items-center border p-2 rounded">
              <p>{job.title} @ {job.company}</p>
              <button
                onClick={() => handleDelete(job.id)}
                className="text-red-500 hover:text-red-700"
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </main>
  );
}
