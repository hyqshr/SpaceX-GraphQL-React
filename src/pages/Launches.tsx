import React, { useEffect, useState } from "react";
import {
  Launch,
  LaunchCardFragment,
  useLaunchesListLazyQuery
} from "apollo/generated/schema";
import { ChevronDoubleDownIcon } from "@heroicons/react/outline";
import backgroundImage from "assets/image/spacex-bg.jpg";
import { LoadingSpinner, ScrollToTop, GithubSVG } from "components/util";
import { LaunchCard } from "components";
import SearchBar from "components/SearchBar";

const PAGE_NUM = 9;
const sortableFields = ['launch_date_utc']
const Home: React.FC = () => {
  const [offset, setOffset] = useState<number>(0);
  const [loadMore, setLoadMore] = useState(false);
  const [filteredData, setFilteredData] = useState<Launch[]>([]); 

  const [loadList, { data, loading, error, fetchMore }] =
  useLaunchesListLazyQuery({
      variables: { 
        limit: offset + PAGE_NUM,
        offset: offset,
      },
    });

  const fetchLaunches = async (offset: number) => {
    setLoadMore(true);
    await fetchMore({
      variables: { 
        limit: offset + PAGE_NUM,
        offset: offset,
       },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return { ...prev, ...fetchMoreResult };
      },
    });
    setLoadMore(false);
  };

  useEffect(() => {
    fetchLaunches(offset);
  }, [offset]);

  return (
    <div className="bg-gray-200 dark:bg-[#25282a] min-h-screen">
      <div className="relative pb-32 bg-gray-800">
        <div className="absolute inset-0">
          <img
            className="w-full h-full object-cover"
            src={backgroundImage}
            alt="rocket"
          />
          <div
            className="absolute inset-0 bg-gray-500 mix-blend-multiply"
            aria-hidden="true"
          />
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-white md:text-5xl lg:text-6xl">
            SpaceX Launches
          </h1>
          <p className="mt-6 max-w-3xl text-xl text-gray-400">
            <a
              href=""
              target="_blank"
              rel="noreferrer"
            >
              <GithubSVG className="h-10 w-10 text-gray-200 hover:text-gray-400" />
            </a>
          </p>
        </div>
      </div>

      <section
        className="mt-5 max-w-7xl mx-auto relative z-10 pb-32 px-4 sm:px-6 lg:px-8"
        aria-labelledby="contact-heading"
      >
        <SearchBar data={data?.launches} setFilteredData={setFilteredData} sortableFields={sortableFields}/>
        {/* display data */}
        <div className="grid grid-cols-1 gap-y-20 lg:grid-cols-3 lg:gap-y-400 lg:gap-x-8">
          {filteredData?.map((link, i) => (
            <LaunchCard {...(link as LaunchCardFragment)} />
          ))}
        </div>

        <div className="w-full flex items-center justify-center my-10">
          {error && (
            <p className="text-xl text-gray-800">
              Uh oh... Something went wrong.
            </p>
          )}
          {/* load more button */}
          {!loading && (
            <button
              type="button"
              className="inline-flex items-center px-4 py-3 border border-transparent shadow-sm text-lg leading-4 font-medium rounded-md text-white bg-amber-500 hover:bg-amber-600  focus:ring-4 focus:ring-amber-300 disabled:opacity-80"
              disabled={loadMore}
              onClick={() => setOffset((prev) => prev + PAGE_NUM)}
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
      </section>
      <ScrollToTop />
    </div>
  );
};
export default Home;
