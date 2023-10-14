import React, { useEffect, useState } from "react";
import { ChevronDoubleDownIcon, ChevronLeftIcon } from "@heroicons/react/outline";
import backgroundImage from "assets/image/spacex-bg.jpg";
import { LoadingSpinner, ScrollToTop, GithubSVG } from "components/util";
import { DocumentNode, gql, useLazyQuery, useQuery } from "@apollo/client";
import { Multiselect } from "multiselect-react-dropdown";
import { Controller, set, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import { on } from "events";
import DynamicCard from "components/DynamicCard";

const fields = [
    "landings", 
    "reuse_count",
    "id",
    "status",
    "type",
    "original_launch",
  ];

const defaultSelection = ["id", "status","type","reuse_count"]; // Default selected values
const sortableFields = ['reuse_count']

const getCapsuleQuery = (selectedFields: string[], offset: number): DocumentNode => {
    // construct query string based on the selected fields
    return gql`
        query Capsule {
          capsules(limit: ${offset + 9}, offset: ${offset}) {
                ${selectedFields.join('\n')}
            }
        }
    `;
};

const Capsule: React.FC = () => {
    const { control, handleSubmit, setValue } = useForm();
    const [offset, setOffset] = useState(0);
    // const [query, setQuery] = useState(getCapsuleQuery(defaultSelection, offset));
    const [selected, setSelected] = useState(defaultSelection);
    const [hasMoreData, setHasMoreData] = useState(true);
    const [filteredData, setFilteredData] = useState([]); 

    const GET_CAPSULES = gql`
      query Capsules($offset: Int, $limit: Int) {
        capsules(offset: $offset, limit: $limit) {
            ${selected.join('\n')}
        }  
      }
    `;
    const [loadMore, setLoadMore] = useState(false);
    const [loadList, { data, loading, error, fetchMore }] =
    useLazyQuery(GET_CAPSULES, {
        variables: { 
          limit: offset + 9,
          offset: offset,
        },
      });
      console.log("Data!!!", data)
  
    useEffect(() => {
      loadList();
    }, [loadList]);
  
    const fetchLaunches = async (value: number) => {
      setLoadMore(true);
      console.log("fetch!!!!", value)
      await fetchMore({
        variables: { 
          limit: offset + 9,
          offset: offset,
         },
        updateQuery: (prev, { fetchMoreResult }) => {
        console.log("prev!!!!", prev)
        console.log("fetchMoreResult!!!!", fetchMoreResult)
  
          if (fetchMoreResult.capsules.length === 0) {
            setHasMoreData(false)
            return prev
          };
          return { ...prev, ...fetchMoreResult };
        },
      });
      setLoadMore(false);
    };
  
    useEffect(() => {
      fetchLaunches(offset);
      console.log("fetch!!", offset)
    }, [offset]);
    
    const onSubmit = (selected: any) => {
      setHasMoreData(true)
      setOffset(0)
      setSelected(selected.Field)
    }
  
  return (
    <div className="bg-gray-200 dark:bg-[#25282a] min-h-screen">
      <div className="relative pb-32 bg-gray-800">
      <Link
          to="/"
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
        <SearchBar data={data?.capsules} setFilteredData={setFilteredData} sortableFields={sortableFields}/>

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
              <ul className="grid grid-cols-1 gap-y-20 lg:grid-cols-3 lg:gap-y-400 lg:gap-x-8">
                {filteredData?.map((capsule: Record<string, any>) => (
                  <DynamicCard title={capsule.name} otherProps={capsule}/>
                ))}
              </ul>
                ) : (
                    loading ? <LoadingSpinner classNames="h-6 w-6 text-gray-100" /> :
                    <p>No capsules data available.</p>
              )}

          {!loading && hasMoreData && (
            <button
              type="button"
              className="inline-flex items-center px-4 py-3 border border-transparent shadow-sm text-lg leading-4 font-medium rounded-md text-white bg-amber-500 hover:bg-amber-600  focus:ring-4 focus:ring-amber-300 disabled:opacity-80"
              disabled={loading}
              onClick={() => setOffset((prev) => prev + 9)}
            >
              {loading ? (
                <>
                  Loading...
                  <LoadingSpinner classNames="h-6 w-6 text-gray-100" />
                </>
              ) : (
                <>
                  View More
                  <span className="ml-2">
                    <ChevronDoubleDownIcon className="w-5 h-5 text-white" />
                  </span>
                </>
              )}
            </button>
          )}
          {!hasMoreData? (
            <div>no more!!!</div>
          ) : <div></div>}
            </div>
      </section>
      <ScrollToTop />
    </div>
  );
};
export default Capsule;
