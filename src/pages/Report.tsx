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
import { validateInput } from 'utils/fieldValidation';

interface IFormInput {
  title: string;
  description: string;
}

const Report: React.FC = () => {
  const { register, handleSubmit, control, formState: { errors }  } = useForm<IFormInput>();
  const reports = useSelector((state: RootState) => state.reports.reports);
  const dispatch = useDispatch();

  const onSubmit = (data: IFormInput) => {
    console.log("data!", data)
    dispatch(addReport({ 
      id: reports.length + 1, 
      date: Date.now(), 
      status: 0,
      ...data }));
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