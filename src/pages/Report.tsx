// ReportForm Component (Report.tsx)
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store'; // replace ../store with your store file
import { addReport } from '../store/reportSlice';

interface IFormInput {
  title: string;
  description: string;
}

const Report: React.FC = () => {
  const { register, handleSubmit, control } = useForm<IFormInput>();
  const reports = useSelector((state: RootState) => state.reports.reports);
  const dispatch = useDispatch();

  const onSubmit = (data: IFormInput) => {
    console.log("data!", data)
    dispatch(addReport({ id: reports.length + 1, ...data }));
  };

  const notAllowed = (value: string) => {
    const hasHtml = /(<([^>]+)>)/iu;
    const hasCcNumber = /\b(\d{4}[-. ]?){3}\d{4}\b/g;
    const hasSql = /.*(['"]?.*['"]?.*SELECT['"]?.*['"]?.*FROM|INSERT['"]?.*['"]?.*INTO|UPDATE['"]?.*['"]?.*SET|DELETE['"]?.*['"]?.*FROM).*/i;
    return !hasHtml.test(value) && !hasCcNumber.test(value) && !hasSql.test(value);
  }

  return (
    <div>
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="title">Title</label>
        <Controller
          name="title"
          control={control}
          render={({ field }) => <input {...field} />}
        />
      </div>
      <div>
        <label htmlFor="description">Description</label>
        <Controller
          name="description"
          control={control}
          render={({ field }) => <textarea {...field} />}
        />
      </div>
      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
    <div className="report-grid">
      {reports.map((report) => (
        <div key={report.id} className="report-item">
          <h2>{report.title}</h2>
          <p>{report.description}</p>
        </div>
      ))}
    </div>
    </div>
  );
};

export default Report;