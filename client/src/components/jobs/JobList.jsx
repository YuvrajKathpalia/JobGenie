import { useState, useEffect } from "react";
import JobCard from "./JobCard";
import SearchBar from "./SearchBar";
import { jobService } from "../../services/jobService";

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [jobsData, categoriesData] = await Promise.all([
          jobService.getAllJobs(),
          jobService.getCategories()
        ]);
        setJobs(jobsData);
        setCategories(categoriesData);
      } catch (err) {
        setError('Failed to fetch jobs. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  const handleSearch = async (filters) => {
    try {
      setLoading(true);
      const filteredJobs = await jobService.getAllJobs(filters);
      setJobs(filteredJobs);
    } catch (err) {
      setError('Failed to fetch jobs. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-10">Loading jobs...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Available Jobs</h1>
      <SearchBar onSearch={handleSearch} categories={categories} />
      <div>
        {jobs.length === 0 ? (
          <p className="text-center py-10 text-gray-500">No jobs found matching your criteria.</p>
        ) : (
          jobs.map((job) => <JobCard key={job._id} job={job} />)
        )}
      </div>
    </div>
  );
};

export default JobList;