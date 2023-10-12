import React, { useEffect, useState } from "react";
import {
  LaunchCardFragment,
} from "apollo/generated/schema";
import { ChevronDoubleDownIcon, ChevronLeftIcon } from "@heroicons/react/outline";
import backgroundImage from "assets/image/spacex-bg.jpg";
import { LoadingSpinner, ScrollToTop, GithubSVG } from "components/util";
import { DocumentNode, gql, useLazyQuery, useQuery } from "@apollo/client";
import { Multiselect } from "multiselect-react-dropdown";
import { Controller, set, useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const fields = [
    "landings", 
    "reuse_count",
    "id",
    "status",
    "type",
    "original_launch",
  ];

const defaultSelection = ["id", "status","type","reuse_count"]; // Default selected values

const getCapsuleQuery = (selectedFields: string[]): DocumentNode => {
    // construct query string based on the selected fields
    return gql`
        query Capsule {
          capsules {
                ${selectedFields.join('\n')}
            }
        }
    `;
};

const Capsule: React.FC = () => {
    const [query, setQuery] = useState(getCapsuleQuery(defaultSelection));
    const { control, handleSubmit, setValue } = useForm();
    useEffect(() => {
        setValue('Field', defaultSelection); // Set default selections
        search()
        console.log("data!", data)
      }, [setValue]);

    const onSubmit = async (selected: any) => {
        console.log(selected);
        setQuery(getCapsuleQuery(selected.Field));
        await search()
        console.log("data!", data)
    };
    const [search, { loading, error, data }] = useLazyQuery(query);

  
  return (
    <div className="bg-gray-200 dark:bg-[#25282a] min-h-screen">
      <div className="relative pb-32 bg-gray-800">
      <Link
          to="/spacex-launches"
          className="text-amber-500 font-semibold text-4xl "
        >
          <ChevronLeftIcon className="w-5 h-5" />
          GO BACK
        </Link>
        <div className="absolute inset-0">
          <img
            className="w-full h-full object-cover"
            src={backgroundImage}
            alt=""
          />
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-white md:text-5xl lg:text-6xl">
            Capsules
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
              <ul>
                {data.capsules.map((capsule: Record<string, any>) => (
                  <li className="pt-5">
                    <ul>
                      {Object.keys(capsule).map((key: string) => (
                        <li key={key}>
                          <strong>{key}:</strong> {capsule[key]}
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
                ) : (
                    loading ? <p>loading</p> :
                    <p>No capsules data available.</p>
            )}
            </div>
      </section>
      <ScrollToTop />
    </div>
  );
};
export default Capsule;
