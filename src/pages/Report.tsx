// ReportForm Component (Report.tsx)
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store'; // replace ../store with your store file
import { addReport } from '../store/reportSlice';
import Button from 'components/Button';
import { validateInput } from 'utils/fieldValidation';

interface IFormInput {
  title: string;
  description: string;
}

const Report: React.FC = () => {
  const { register, handleSubmit, control, formState: { errors }  } = useForm<IFormInput>();
  const reports = useSelector((state: RootState) => state.reports.reports);
  const dispatch = useDispatch();
  const [submissionSuccess, setSubmissionSuccess] = useState(false);

  const onSubmit = (data: IFormInput) => {
    dispatch(addReport({ 
      id: reports.length + 1, 
      date: Date.now(), 
      status: 0,
      ...data }));
    setSubmissionSuccess(true);
  };

  return (
    <div>
      {/* Sucess Message After Submit Report */}
      {submissionSuccess ? (
        <div className="text-center text-green-500 text-xl font-bold p-5">Report submitted successfully</div>
      ) : <></>}

      <form onSubmit={handleSubmit(onSubmit)} className='w-full max-w-lg m-auto py-10 mt-10 px-10 border'>
        <div >
          <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">Title</label>
          <Controller
            name="title"
            control={control}
            rules={{ 
              required: 'Title is required', 
              validate: (input) => validateInput(input, 'Title') 
            }}
            render={({ field }) => 
              <input 
                {...field} 
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.title ? 'border-red-500' : ''}`}
                placeholder="Enter title"
              />
            }
          />
          {errors.title && <p className="text-red-500 text-xs italic">{errors.title.message}</p>}
        </div>
        <div>
          <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">Description</label>
          <Controller
            name="description"
            control={control}
            rules={{ 
              required: 'Description is required',
              validate: (input) => validateInput(input, 'description') 
            
            }}
            render={({ field }) => 
              <textarea 
                {...field} 
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-20 ${errors.description ? 'border-red-500' : ''}`}
                placeholder="Enter description"
              />
            }
          />
          {errors.description && <p className="text-red-500 text-xs italic">{errors.description.message}</p>}
        </div>
        <div>
          <Button label="Submit"/>
        </div>
      </form>
    </div>
  );
};

export default Report;