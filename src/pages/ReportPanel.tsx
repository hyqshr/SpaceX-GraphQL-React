// ReportForm Component (Report.tsx)
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store'; // replace ../store with your store file
import { addReport, deleteReport, setStatus } from '../store/reportSlice';
import ReportCard from 'components/ReportCard';
import Button from 'components/Button';
import SearchBar from 'components/SearchBar';
import { Link } from 'react-router-dom';
import { ChevronLeftIcon } from '@heroicons/react/outline';

const ReportPanel: React.FC = () => {
  const reports = useSelector((state: RootState) => state.reports.reports);
  const dispatch = useDispatch();
  const handleDelete = (id: number) => {
    dispatch(deleteReport(id));
  };

  const handleSetStatus = (id: number) => {
    dispatch(setStatus({ id, status: 1 }));
  };
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [filterStatus, setFilterStatus] = useState(false);

  const sortedReports = [...reports].sort((a, b) => {
    if(a.date < b.date) return sortOrder === 'asc' ? -1 : 1;
    if(a.date > b.date) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  const filteredReports = filterStatus ? sortedReports.filter(report => report.status === 1) : sortedReports;

  const handleSort = () => {
    setSortOrder(prevOrder => prevOrder === 'asc' ? 'desc' : 'asc');
  };

  const handleFilter = () => {
    setFilterStatus(prevFilterStatus => !prevFilterStatus);
  };

  return (
    <div>
    <Link
      to="/"
      className="text-black inline-flex items-center"
    >
      <ChevronLeftIcon className="w-5 h-5" />
      <span>GO BACK</span>
    </Link>
    <div className='flex justify-around mb-4'>
        <Button onClick={handleSort} label={sortOrder === 'asc' ? "Sort Descending" : "Sort Ascending"} />
        <Button onClick={handleFilter} label={filterStatus ? "Show All" : "Show Only Status Reviewed"} />
    </div>

    <div className="grid grid-cols-3 gap-y-20 lg:grid-cols-4 p-5 space-x-5">
      {filteredReports.map((report) => (
        <div key={report.id} className="">
          <ReportCard report={report}/>
          <div className='flex justify-around'>
            <Button onClick={() => handleDelete(report.id)} label="Delete" />
            <Button onClick={() => handleSetStatus(report.id)} label="Set Status" />
          </div>
        </div>
      ))}
    </div>
    </div>
  );
};

export default ReportPanel;