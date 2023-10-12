import React, { useEffect, useState } from "react";
import {
  LaunchCardFragment,
} from "apollo/generated/schema";
import { ChevronDoubleDownIcon } from "@heroicons/react/outline";
import backgroundImage from "assets/image/spacex-bg.jpg";
import { LoadingSpinner, ScrollToTop, GithubSVG } from "components/util";
import { DocumentNode, gql, useLazyQuery, useQuery } from "@apollo/client";
import { Multiselect } from "multiselect-react-dropdown";
import { Controller, set, useForm } from "react-hook-form";

const fields = [
    "ceo", 
    "coo",
    "cto",
    "cto_propulsion",
    "employees",
    "founded",
    "founder",
    "vehicles",
    "valuation",
    "test_sites",
    "summary",
    "name"
  ];

const defaultSelection = ["ceo", "coo"]; // Default selected values

const getCompanyQuery = (selectedFields: string[]): DocumentNode => {
    // construct query string based on the selected fields
    return gql`
        query Company {
            company {
                ${selectedFields.join('\n')}
            }
        }
    `;
};

const Company: React.FC = () => {
    const [query, setQuery] = useState(getCompanyQuery(defaultSelection));
    const { control, handleSubmit, setValue } = useForm();
    useEffect(() => {
        setValue('Field', defaultSelection); // Set default selections
        search()
      }, [setValue]);

    const onSubmit = async (selected: any) => {
        console.log(selected);
        setQuery(getCompanyQuery(selected.Field));
        await search()
        console.log("data!", data)
    };
    const [search, { loading, error, data }] = useLazyQuery(query);

  
  return (
    <div className="bg-gray-200 dark:bg-[#25282a] min-h-screen">
      <div className="relative pb-32 bg-gray-800">
        <div className="absolute inset-0">
          <img
            className="w-full h-full object-cover"
            src={backgroundImage}
            alt=""
          />
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-white md:text-5xl lg:text-6xl">
            Company
          </h1>
        </div>
      </div>

      <section
        className="max-w-7xl mx-auto relative z-10 pb-32 px-4 sm:px-6 lg:px-8"
        aria-labelledby="contact-heading"
      >
        <div className="mt-5">

            <form onSubmit={handleSubmit(onSubmit)} className="flex justify-between">
                <label htmlFor="Field" className="text-gray-700">Select the field you want to see:</label>
                <Controller
                    control={control}
                    name="Field"
                    render={({ field: { value, onChange } }) => (
                        <Multiselect
                        options={fields}
                        isObject={false}
                        showCheckbox={true}
                        hidePlaceholder={true}
                        closeOnSelect={false}
                        onSelect={onChange}
                        onRemove={onChange}
                        selectedValues={value}
                    />
                )}
                />
                <button
                    type="submit"
                    className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition duration-300"
                >
                    Search
                </button>
            </form>
            {data ? ( 
                <ul className="grid grid-cols-3 gap-4 mt-5">
                {Object.keys(data.company).map((field, index) => {
                    // Filter out the __typename field
                    if (field !== '__typename') {
                    return (
                        <li key={index} className="text-3xl">
                        <div className="bg-gray-200 p-2 rounded">
                            <strong>{field}:</strong> {data.company[field]}
                        </div>
                        </li>
                    );
                    }
                    return null; // Exclude the field
                })}
                </ul>
                ) : (
                    loading ? <p>loading</p> :
                    <p>No company data available.</p>
            )}
            </div>
      </section>
      <ScrollToTop />
    </div>
  );
};
export default Company;
