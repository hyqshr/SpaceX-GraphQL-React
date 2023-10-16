import React, { useEffect, useState } from "react";
import { ChevronDoubleDownIcon } from "@heroicons/react/outline";
import backgroundImage from "assets/image/spacex-bg.jpg";
import { LoadingSpinner, ScrollToTop } from "components/util";
import { gql, useLazyQuery } from "@apollo/client";
import SearchBar from "../components/SearchBar";
import DynamicCard from "components/DynamicCard";
import FieldSelectionBar from "components/FieldSelectionBar";
import { Capsule } from "apollo/generated/schema";

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
const PAGE_NUM = 9;

const CapsulePage: React.FC = () => {
    const [offset, setOffset] = useState<number>(0);
    const [selected, setSelected] = useState<string[]>(defaultSelection);
    const [hasMoreData, setHasMoreData] = useState<boolean>(true);
    const [filteredData, setFilteredData] = useState<Capsule[]>([]); 

    const GET_CAPSULES = gql`
      query Capsules($offset: Int, $limit: Int) {
        capsules(offset: $offset, limit: $limit) {
            ${selected.join('\n')}
        }  
      }
    `;
    const [loadList, { data, loading, error, fetchMore }] =
    useLazyQuery(GET_CAPSULES, {
        variables: { 
          limit: offset + PAGE_NUM,
          offset: offset,
        },
      });
  
    const fetchLaunches = async (offset: number) => {
      await fetchMore({
        variables: { 
          limit: offset + PAGE_NUM,
          offset: offset,
         },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (fetchMoreResult.capsules.length === 0) {
            setHasMoreData(false)
            return prev
          };
        return { ...prev, ...fetchMoreResult };
        },
      });
    };
  
    useEffect(() => {
      fetchLaunches(offset);
    }, [offset]);
    
    const onSubmit = (selected: SelectedType) => {
      setHasMoreData(true)
      setOffset(0)
      setSelected(selected.Field)
    }
  
  return (
    <div className="bg-gray-200 dark:bg-[#25282a] min-h-screen">
      <div className="relative pb-32 bg-gray-800">
        <div className="absolute inset-0">
          <img
            className="w-full h-full object-cover"
            src={backgroundImage}
            alt="rocket"
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
          {/* SearchBar and FieldSelection Bar */}
          <SearchBar data={data?.capsules} setFilteredData={setFilteredData} sortableFields={sortableFields}/>
          <FieldSelectionBar onSubmit={onSubmit} fields={fields} />

          {error && (
            <p className="text-xl text-gray-800">
              Uh oh... Something went wrong.
            </p>
          )}
          {/* Display data */}
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

          {/* Load more button */}
          {!loading && hasMoreData && (
            <button
              type="button"
              className="inline-flex items-center px-4 py-3 border border-transparent shadow-sm text-lg leading-4 font-medium rounded-md text-white bg-amber-500 hover:bg-amber-600  focus:ring-4 focus:ring-amber-300 disabled:opacity-80"
              disabled={loading}
              onClick={() => setOffset((prev) => prev + PAGE_NUM)}
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
        </div>
      </section>
      <ScrollToTop />
    </div>
  );
};
export default CapsulePage;
