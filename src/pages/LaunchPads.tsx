import React, { useEffect, useState } from "react";
import backgroundImage from "assets/image/spacex-bg.jpg";
import { ScrollToTop } from "components/util";
import { DocumentNode, gql, useLazyQuery } from "@apollo/client";
import DynamicCard from "components/DynamicCard";
import FieldSelectionBar from "components/FieldSelectionBar";
import SearchBar from "components/SearchBar";
import { Capsule } from "apollo/generated/schema";

const PAGE_NUM = 9;
const fields = [
    "attempted_launches", 
    "details",
    "id",
    "name",
    "status",
    "successful_launches",
    "wikipedia",
  ];

const defaultSelection = ["id", "status","name"]; // Default selected values

const getLaunchpadsQuery = (selectedFields: string[], offset: number): DocumentNode => {
    // construct query string based on the selected fields, and offset
    return gql`
        query LaunchPad {
          launchpads(limit: ${offset + PAGE_NUM}, offset: ${offset}) {
                ${selectedFields.join('\n')}
            }
        }
    `;
};

const LaunchPad: React.FC = () => {
    const [offset, setOffset] = useState<number>(0);
    const [query, setQuery] = useState<DocumentNode>(getLaunchpadsQuery(defaultSelection, offset));
    const [filteredData, setFilteredData] = useState<Capsule[]>([]);
    const fetchLaunches = async (offset: number) => {
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
    };

    useEffect(() => {
      fetchLaunches(offset);
    }, [offset]);

    const onSubmit = async (selected: SelectedType) => {
      console.log(selected)
      setQuery(getLaunchpadsQuery(selected.Field, offset));
      await search()
    };
    const [search, { loading, error, data, fetchMore }] = useLazyQuery(query);

  
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
            LaunchesPads
          </h1>
        </div>
      </div>

      <section
        className="max-w-7xl mx-auto relative z-10 pb-32 px-4 sm:px-6 lg:px-8"
        aria-labelledby="contact-heading"
      >
        <div className="mt-5">
          <SearchBar data={data?.launchpads} setFilteredData={setFilteredData} sortableFields={[]}/>
          <FieldSelectionBar onSubmit={onSubmit} fields={fields} />
          {data ? ( 
            <ul className="grid grid-cols-1 gap-y-20 lg:grid-cols-3 lg:gap-y-400 lg:gap-x-8">
              {filteredData?.map((launchpads: Record<string, any>) => (
                <div className="">
                  <DynamicCard title={launchpads.name} otherProps={launchpads}/>
                </div>
              ))}
            </ul>
              ) : (
                  loading ? <p>loading</p> :
                  <p>No launch pad data available.</p>
            )}
        </div>
      </section>
      <ScrollToTop />
    </div>
  );
};
export default LaunchPad;
