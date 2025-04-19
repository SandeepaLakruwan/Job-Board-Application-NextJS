import { notFound } from "next/navigation";

export default function JobDetailsPage({ params }: { params: { id: string } }) {
  const jobId = params.id;

  // Fetch job by ID from DB
  const job = {
    id: jobId,
    title: "Frontend Developer",
    company: "TechCorp",
    location: "Remote",
    jobType: "Full-time",
    description: "We are hiring a frontend dev to work on a new product..."
  };

  if (!job) return notFound();

  return (
    <main className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow rounded">
      <h1 className="text-3xl font-bold">{job.title}</h1>
      <p className="text-gray-700">{job.company} - {job.location}</p>
      <p className="mt-4 text-gray-600">{job.description}</p>
      <p className="mt-4 italic text-sm text-gray-500">{job.jobType}</p>
    </main>
  );
}