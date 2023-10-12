import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  useGetLaunchpadsListLazyQuery,
} from "apollo/generated/schema";
import { ChevronDoubleDownIcon, ChevronLeftIcon } from "@heroicons/react/outline";
import { LoadingSpinner } from "components/util";

const LaunchDetail: React.FC = () => {
  const [offset, setOffset] = useState(0);
  const [loadMore, setLoadMore] = useState(false);
  const [loadList, { data, loading, error, fetchMore }] =
  useGetLaunchpadsListLazyQuery({
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

        if (!fetchMoreResult) return prev;
        return { ...prev, ...fetchMoreResult };
      },
    });
    setLoadMore(false);
  };

  useEffect(() => {
    fetchLaunches(offset);
    console.log("fetch!!", offset)
  }, [offset]);

  return (
    <div className="bg-gray-200 dark:bg-[#25282a] min-h-screen">
      <div className="max-w-2xl mx-auto py-24 px-4 grid items-center gap-y-8 gap-x-8 sm:px-6 sm:py-20 lg:max-w-7xl lg:px-8 bg-white dark:bg-[#181a1b] min-h-screen">
        <h1 className="text-4xl font-extrabold tracking-tight dark:text-white md:text-5xl lg:text-6xl">
          SpaceX Launchpads
        </h1>
        {data && data?.launchpads?.map((launchpad) => (

        <div>
          <hr className="bg-gray-600 dark:bg-stone-500" />

          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-stone-500 sm:text-4xl">
            Name: {launchpad?.name}
          </h2>
            <p className="mt-4 text-gray-500">{launchpad?.details}</p>
          {/* Launch Information */}
          <h2 className="font-semibold text-2xl dark:text-stone-500">
            Launch location{launchpad?.location?.name}
          </h2>
          <h2 className="font-semibold text-2xl dark:text-stone-500">
            Launch status: {launchpad?.status}
          </h2>
          <h2 className="font-semibold text-2xl dark:text-stone-500">
            Launch attempted_launches: {launchpad?.attempted_launches}
          </h2>
          <a>WiKi: {launchpad?.wikipedia}</a>
          </div>
        ))}
        <div className="w-full flex items-center justify-center my-10">
          {error && (
            <p className="text-xl text-gray-800">
              Uh oh... Something went wrong.
            </p>
          )}
          {!loading && (
            <button
              type="button"
              className="inline-flex items-center px-4 py-3 border border-transparent shadow-sm text-lg leading-4 font-medium rounded-md text-white bg-amber-500 hover:bg-amber-600  focus:ring-4 focus:ring-amber-300 disabled:opacity-80"
              disabled={loadMore}
              onClick={() => setOffset((prev) => prev + 9)}
            >
              {loadMore ? (
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
      </div>
    </div>
  );
};

export default LaunchDetail;
