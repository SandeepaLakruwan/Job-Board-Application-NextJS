'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  jobType: string;
  description: string;
}

export default function HomePage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [searchType, setSearchType] = useState<string>('All');
  const [searchLocation, setSearchLocation] = useState<string>('');

  useEffect(() => {
    const fetchJobs = async () => {
      const res = await fetch('/api/jobs');
      const data = await res.json();
      setJobs(data);
    };
    fetchJobs();
  }, []);

  // Filter jobs based on search
  const filteredJobs = jobs.filter((job) => {
    const matchesType = searchType === 'All' || job.jobType.toLowerCase() === searchType.toLowerCase();
    const matchesLocation = searchLocation ? job.location.toLowerCase().includes(searchLocation.toLowerCase()) : true;
    return matchesType && matchesLocation;
  });

  return (
    <main className="max-w-5xl mx-auto p-6 bg-sky-200 rounded-md">
      
      <h1 className="text-3xl font-bold mb-6 text-center">Job Listings</h1>
      
      <div className="mb-6 flex gap-4">
        <select
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="All">All</option>
          <option value="Full-Time">Full-Time</option>
          <option value="Part-Time">Part-Time</option>
          <option value="Contract">Contract</option>
        </select>

        <input
          type="text"
          placeholder="Search by location"
          value={searchLocation}
          onChange={(e) => setSearchLocation(e.target.value)}
          className="p-2 border rounded"
        />
      </div>

      <div className="space-y-4">
        {filteredJobs.length === 0 ? (
          <p>No job postings found.</p>
        ) : (
          filteredJobs.map((job) => (
            <div key={job.id} className="bg-white shadow-md rounded-lg p-4 border">
              <h2 className="text-xl font-semibold">{job.title}</h2>
              <p className="text-gray-600">{job.company} | {job.location}</p>
              <p className="text-sm">{job.description.substring(0, 100)}...</p>
            </div>
          ))
        )}
      </div>
    </main>
  );
}
