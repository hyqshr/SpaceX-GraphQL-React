import React from 'react';
import { Report } from 'store/reportSlice';

interface ReportCardProps {
  report: Report;
}

const ReportCard: React.FC<ReportCardProps> = ({ report }) => {
  const formatDate = (date: number) => {
    const d = new Date(date);
    return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
  };

  return (
    <div className='bg-white rounded-lg overflow-hidden shadow-md mb-6'>
      <div className='px-6 py-4'>
        <div className='font-bold text-xl mb-2'>{report.title}</div>
        <p className='text-gray-700 text-base'>{report.description}</p>
      </div>
      <div className='px-6 pt-4 pb-2'>
        <span 
          className={
            report.status === 0
            ? 'inline-block bg-green-200 rounded-full px-3 py-1 text-sm font-semibold text-green-700 mr-2 mb-2'
            : 'inline-block bg-blue-200 rounded-full px-3 py-1 text-sm font-semibold text-blue-700 mr-2 mb-2'
          }
        >
        {report.status === 0 ? 'New' : 'Reviewed'}
        </span>
      </div>
      <div className='px-6 pt-2 pb-4'>
        <span className='inline-block text-gray-700 text-sm'>Submitted on {formatDate(report.date)}</span>
      </div>
    </div>
  );
}

export default ReportCard;
