import React from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import RunnerCard from './RunnerCard';

// Fetch all runners
const fetchRunners = async () => {
  const { data } = await axios.get('http://localhost:5000/api/auth/users/runner');
  return data.data; // Assuming the runners are in the 'data' field
};

const RunnersTable = () => {
  const { data: runners, isLoading, isError, error } = useQuery({
    queryKey: ['runners'],
    queryFn: fetchRunners,
  });

  if (isLoading) {
    return <div>Loading runners...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="text-center p-3">
      <h1 className="text-md md:text-2xl p-1 font-medium">Runners</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {runners.map((runner) => (
          <RunnerCard key={runner._id} runnerId={runner._id} name={runner.name} phone={runner.phone} email={runner.email} />
        ))}
      </div>
    </div>
  );
};

export default RunnersTable;
