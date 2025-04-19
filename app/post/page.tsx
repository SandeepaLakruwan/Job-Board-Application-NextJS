'use client';

import { useSession } from 'next-auth/react';
import { useState } from 'react';

export default function PostJob() {
  const { data: session, status } = useSession();
  const [form, setForm] = useState({
    title: '',
    company: '',
    location: '',
    jobType: 'Full-Time',
    description: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch('/api/jobs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
      credentials: "include",
    });

    setLoading(false);

    if (res.ok) {
      alert('Successfully Posted New Job.');
      setForm({
        title: '',
        company: '',
        location: '',
        jobType: 'Full-Time',
        description: '',
      });
    } else {
      const errorData = await res.json();
      alert(errorData.message || 'Failed to Add Job.');
    }
  };

  if (status === 'loading') return <p className="text-center mt-10">Loading...</p>;
  if (!session) return <p className="text-center mt-10 text-red-600">Please log in to post a job.</p>;

  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Post a Job</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {['title', 'company', 'location'].map((field) => (
          <input
            key={field}
            type="text"
            name={field}
            placeholder={field}
            value={form[field as keyof typeof form]}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
            required
          />
        ))}
        <textarea
          name="description"
          placeholder="description"
          value={form.description}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded"
          required
        />
        <select
          name="jobType"
          value={form.jobType}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded"
        >
          <option>Full-Time</option>
          <option>Part-Time</option>
          <option>Contract</option>
        </select>
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Posting...' : 'Post'}
        </button>
      </form>
    </div>
  );
}
