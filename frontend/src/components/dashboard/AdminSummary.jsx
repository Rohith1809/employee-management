import React from 'react';
import { FaBuilding, FaCheckCircle, FaFileAlt, FaHourglassHalf, FaMoneyBillWave, FaTimesCircle, FaUsers } from 'react-icons/fa';
import SummaryCard from './SummaryCard';

const AdminSummary = () => {
  return (
    <div className='min-h-screen p-6'> {/* Removed ml-64 */}
      <h3 className='text-2xl font-bold mb-6'>Dashboard Overview</h3>
      
      {/* Dashboard Overview */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        <SummaryCard icon={<FaUsers />} text="Total Employees" number={13} color="bg-teal-600" />
        <SummaryCard icon={<FaBuilding />} text="Total Departments" number={5} color="bg-yellow-600"/>
        <SummaryCard icon={<FaMoneyBillWave />} text="Monthly Salary" number="$654" color="bg-red-600"/>
      </div>

      {/* Leave Details */}
      <div className="mt-12">
        <h4 className='text-center text-2xl font-bold mb-6'>Leave Details</h4> 
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <SummaryCard icon={<FaFileAlt />} text="Leave Applied" number={5} color="bg-teal-600" />
          <SummaryCard icon={<FaCheckCircle />} text="Leave Approved" number={2} color="bg-green-600"/>
          <SummaryCard icon={<FaHourglassHalf />} text="Leave Pending" number={4} color="bg-yellow-600"/>
          <SummaryCard icon={<FaTimesCircle />} text="Leave Rejected" number={1} color="bg-red-600"/>
        </div>
      </div>
    </div>
  );
};

export default AdminSummary;
