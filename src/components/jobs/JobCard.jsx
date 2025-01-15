const JobCard = ({ job }) => {
  return (
    <div className="border rounded-lg p-6 mb-4 shadow-sm flex">
      <div className="flex-grow">
        <h2 className="text-xl font-bold mb-2">{job.title}</h2>
        <p className="text-gray-600 mb-2">{job.companyName}</p>
        <div className="mb-2">
          <span className="text-gray-500">📍 {job.location}</span>
          <span className="ml-4 text-gray-500">💰 ${job.salary}</span>
        </div>
        <p className="mb-4">{job.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {job.skillsRequired?.map((skill, index) => (
            <span
              key={index}
              className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
            >
              {skill}
            </span>
          ))}
        </div>
        <div className="text-sm text-gray-500">
          <span className="mr-4">📅 {new Date(job.dateOfPosting).toLocaleDateString()}</span>
          <span>{job.employmentType}</span>
        </div>
      </div>
      <div className="flex items-center">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
          Apply Now
        </button>
      </div>
    </div>
  );
};


export default JobCard;
